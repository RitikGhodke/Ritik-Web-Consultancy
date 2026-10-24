import { NextResponse } from "next/server";
import { COOKIE, signSession, verifyPassword, checkAdminEmail } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!rateLimit(`login:${ip}`, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many attempts. Try again in a few minutes." },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const email = String(body?.email || "");
    const password = String(body?.password || "");

    // dono check hamesha chalte hain (timing se andaza na lage)
    const okEmail = checkAdminEmail(email);
    const okPass = verifyPassword(password);
    if (!okEmail || !okPass) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await signSession(email.trim().toLowerCase());
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (err) {
    console.error("Login error:", err.message);
    return NextResponse.json(
      { error: "Server is not configured correctly" },
      { status: 500 }
    );
  }
}