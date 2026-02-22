import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const prisma = new PrismaClient();

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  try {
    const { countryCode, mobile } = await request.json();

    // Validate mobile number
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    const fullPhone = `${countryCode}${mobile}`;

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP to database
    await prisma.otpAttempt.create({
      data: {
        countryCode,
        mobile,
        otp,
        expiresAt,
        attempts: 0,
        verified: false,
      },
    });

    // Send SMS via Twilio
    try {
      await twilioClient.messages.create({
        body: `Your AURA Securities verification code is: ${otp}. Valid for 5 minutes. Do not share this code with anyone.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: fullPhone,
      });

      console.log(`✅ OTP sent to ${fullPhone}`);

      return NextResponse.json({
        success: true,
        message: "OTP sent to your phone successfully!",
      });
    } catch (smsError: any) {
      console.error("❌ Twilio SMS Error:", smsError);

      // For development: still show OTP in console if SMS fails
      console.log(`\n═══════════════════════════════`);
      console.log(`🔐 OTP CODE (SMS failed): ${otp}`);
      console.log(`📱 Phone: ${fullPhone}`);
      console.log(`⏰ Valid for: 5 minutes`);
      console.log(`═══════════════════════════════\n`);

      // Still return success for development
      return NextResponse.json({
        success: true,
        message: "OTP generated (check console for testing)",
      });
    }
  } catch (error) {
    console.error("❌ Error in send OTP:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
