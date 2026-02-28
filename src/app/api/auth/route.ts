import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { apiKey } = await request.json();

    // Validate API key
    const validApiKey = process.env.ADMIN_API_KEY;

    if (!apiKey || apiKey !== validApiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Create session token
    const sessionToken = Buffer.from(
      `${apiKey}:${Date.now()}:${Math.random()}`,
    ).toString("base64");

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: "Authenticated successfully",
    });

    // Next.js 15: await cookies()
    const cookieStore = await cookies();

    cookieStore.set("admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}

// Verify session
export async function GET(request: Request) {
  try {
    // Next.js 15: await cookies()
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

// Logout
export async function DELETE(request: Request) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Next.js 15: await cookies()
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");

  return response;
}
