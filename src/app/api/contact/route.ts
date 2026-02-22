import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, phone, service, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Save contact submission to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
        status: "new",
      },
    });

    console.log(`✅ New contact submission from: ${name} (${email})`);

    // Optional: Send notification to admin
    await notifyAdmin(submission);

    return NextResponse.json({
      success: true,
      message: "Thanks! We will contact you shortly.",
      submissionId: submission.id,
    });
  } catch (error) {
    console.error("❌ Error saving contact submission:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 },
    );
  }
}

// Function to notify admin about new contact submission
async function notifyAdmin(submission: any) {
  try {
    // Send Slack notification if configured
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📝 New Contact Form Submission!\n\n*Name:* ${submission.name}\n*Email:* ${submission.email}\n*Phone:* ${submission.phone}\n*Service:* ${submission.service}\n*Message:* ${submission.message}\n\n⏰ Time: ${new Date().toLocaleString()}`,
        }),
      });
    }

    console.log(`📧 Admin notified about submission from ${submission.name}`);
  } catch (error) {
    console.error("❌ Failed to notify admin:", error);
  }
}

// GET endpoint for admin to view all contact submissions
export async function GET(request: Request) {
  try {
    // Simple authentication
    const authHeader = request.headers.get("authorization");
    const expectedAuth = `Bearer ${process.env.ADMIN_API_KEY}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all contact submissions
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      total: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error("❌ Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 },
    );
  }
}

// PATCH endpoint to update submission status
export async function PATCH(request: Request) {
  try {
    // Simple authentication
    const authHeader = request.headers.get("authorization");
    const expectedAuth = `Bearer ${process.env.ADMIN_API_KEY}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 },
      );
    }

    // Update submission status
    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      submission: updated,
    });
  } catch (error) {
    console.error("❌ Error updating submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 },
    );
  }
}
