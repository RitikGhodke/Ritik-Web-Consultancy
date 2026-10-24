import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const COOKIE = "rwc_admin";

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) {
    throw new Error("JWT_SECRET must be set in .env.local (min 32 characters)");
  }
  return new TextEncoder().encode(s);
}

export async function signSession(email) {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: ["HS256"] });
    return payload.role === "admin" ? payload : null;
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return verifySession(store.get(COOKIE)?.value);
}

// server pages ke liye: login nahi hai to /admin/login pe bhej do
export async function requirePageSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

// API routes ke liye: null = allowed, warna response return karo
export async function requireAdmin(req) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!["GET", "HEAD"].includes(req.method)) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin) {
      let originHost = "";
      try {
        originHost = new URL(origin).host;
      } catch {}
      if (originHost !== host) {
        return NextResponse.json({ error: "Bad origin" }, { status: 403 });
      }
    }
  }
  return null;
}

export function verifyPassword(password) {
  const stored = process.env.ADMIN_PASSWORD_HASH || "";
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = crypto.scryptSync(String(password), salt, 64);
  const expected = Buffer.from(hash, "hex");
  return expected.length === derived.length && crypto.timingSafeEqual(derived, expected);
}

export function checkAdminEmail(email) {
  const a = Buffer.from(String(email || "").trim().toLowerCase());
  const b = Buffer.from((process.env.ADMIN_EMAIL || "").trim().toLowerCase());
  return b.length > 0 && a.length === b.length && crypto.timingSafeEqual(a, b);
}