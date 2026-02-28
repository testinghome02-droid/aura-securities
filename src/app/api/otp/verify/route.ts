import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { countryCode, mobile, otp } = await request.json();

    if (!otp || !/^\d{4}$/.test(otp)) {
      return NextResponse.json(
        { error: "Please enter a valid 4-digit OTP" },
        { status: 400 },
      );
    }

    // Get OTP from DATABASE (not memory!)
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

    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP not found. Please request a new one." },
        { status: 400 },
      );
    }

    // Check expiration
    if (otpRecord.expiresAt < new Date()) {
      await prisma.otpAttempt.delete({
        where: { id: otpRecord.id },
      });
      return NextResponse.json(
        { error: "OTP expired. Please request a new one." },
        { status: 400 },
      );
    }

    // Check attempts
    if (otpRecord.attempts >= 3) {
      await prisma.otpAttempt.delete({
        where: { id: otpRecord.id },
      });
      return NextResponse.json(
        { error: "Too many wrong attempts. Please request a new OTP." },
        { status: 400 },
      );
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      await prisma.otpAttempt.update({
        where: { id: otpRecord.id },
        data: {
          attempts: otpRecord.attempts + 1,
        },
      });

      const remaining = 3 - (otpRecord.attempts + 1);
      return NextResponse.json(
        { error: `Wrong OTP! You have ${remaining} attempt(s) left.` },
        { status: 400 },
      );
    }

    // ✅ OTP is correct!
    await prisma.otpAttempt.update({
      where: { id: otpRecord.id },
      data: { verified: true },
    });

    // Save verified contact
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

    console.log(`✅ Contact verified: ${countryCode}${mobile}`);

    // Optional: Notify admin
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
      { status: 500 },
    );
  }
}

async function notifyAdmin(countryCode: string, mobile: string) {
  try {
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎉 New Verified Contact!\n📱 ${countryCode}${mobile}\n⏰ ${new Date().toLocaleString()}`,
        }),
      });
    }
  } catch (error) {
    console.error("Failed to notify admin:", error);
  }
}

// GET endpoint for admin
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const expectedAuth = `Bearer ${process.env.ADMIN_API_KEY}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      { status: 500 },
    );
  }
}
