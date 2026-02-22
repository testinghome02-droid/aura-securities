import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { countryCode, mobile, otp } = await request.json();

    // Validate OTP format
    if (!otp || !/^\d{4}$/.test(otp)) {
      return NextResponse.json(
        { error: "Please enter a valid 4-digit OTP" },
        { status: 400 }
      );
    }

    // Find the most recent OTP for this phone number
    const otpRecord = await prisma.otpAttempt.findFirst({
      where: {
        countryCode,
        mobile,
        verified: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Check if OTP exists
    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP not found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check if OTP expired
    if (otpRecord.expiresAt < new Date()) {
      await prisma.otpAttempt.delete({
        where: { id: otpRecord.id },
      });
      return NextResponse.json(
        { error: "OTP expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check attempts
    if (otpRecord.attempts >= 3) {
      await prisma.otpAttempt.delete({
        where: { id: otpRecord.id },
      });
      return NextResponse.json(
        { error: "Too many wrong attempts. Please request a new OTP." },
        { status: 400 }
      );
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      // Increment attempts
      await prisma.otpAttempt.update({
        where: { id: otpRecord.id },
        data: {
          attempts: otpRecord.attempts + 1,
        },
      });

      const remaining = 3 - (otpRecord.attempts + 1);
      return NextResponse.json(
        { error: `Wrong OTP! You have ${remaining} attempt(s) left.` },
        { status: 400 }
      );
    }

    // ✅ OTP is correct!
    // Mark OTP as verified
    await prisma.otpAttempt.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    // Save verified contact to database (upsert to avoid duplicates)
    const contact = await prisma.contact.upsert({
      where: {
        countryCode_mobile: {
          countryCode,
          mobile,
        },
      },
      update: {
        verifiedAt: new Date(),
      },
      create: {
        countryCode,
        mobile,
        verifiedAt: new Date(),
      },
    });

    console.log(`✅ Contact verified and saved: ${countryCode}${mobile}`);

    // Optional: Send notification to admin
    await notifyAdmin(countryCode, mobile);

    return NextResponse.json({
      success: true,
      message: "Phone verified successfully!",
      contactId: contact.id,
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// Function to notify admin about new verified contact
async function notifyAdmin(countryCode: string, mobile: string) {
  try {
    // Send Slack notification if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎉 New Contact Verified!\n📱 Phone: ${countryCode}${mobile}\n⏰ Time: ${new Date().toLocaleString()}`,
        }),
      });
    }

    console.log(`📧 Admin notified about ${countryCode}${mobile}`);
  } catch (error) {
    console.error("❌ Failed to notify admin:", error);
  }
}

// GET endpoint for admin to view all contacts
export async function GET(request: Request) {
  try {
    // Simple authentication
    const authHeader = request.headers.get("authorization");
    const expectedAuth = `Bearer ${process.env.ADMIN_API_KEY}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all verified contacts
    const contacts = await prisma.contact.findMany({
      orderBy: {
        verifiedAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      total: contacts.length,
      contacts,
    });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
