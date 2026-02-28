import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import twilio from "twilio";

const prisma = new PrismaClient();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export async function POST(request: Request) {
  try {
    const { countryCode, mobile } = await request.json();

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number" },
        { status: 400 },
      );
    }

    const phoneKey = `${countryCode}${mobile}`;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Clean up expired OTPs
    await prisma.otpAttempt.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    // Delete any existing OTP for this phone
    await prisma.otpAttempt.deleteMany({
      where: {
        countryCode,
        mobile,
      },
    });

    // Store OTP in DATABASE (not memory!)
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

    console.log(`📱 OTP generated for ${phoneKey}: ${otp}`);

    // Send SMS via Twilio
    try {
      await twilioClient.messages.create({
        body: `Your AURA Securities verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneKey,
      });

      console.log(`✅ OTP sent successfully to ${phoneKey}`);

      return NextResponse.json({
        success: true,
        message: "OTP sent to your phone successfully!",
      });
    } catch (smsError: any) {
      console.error("❌ Twilio SMS Error:", smsError);

      // For development: log OTP to console
      if (process.env.NODE_ENV === "development") {
        console.log(`\n🔐 DEV MODE - OTP: ${otp}\n📱 Phone: ${phoneKey}\n`);
      }

      return NextResponse.json(
        { error: "Failed to send SMS. Please try again." },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("❌ Error in send OTP:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
