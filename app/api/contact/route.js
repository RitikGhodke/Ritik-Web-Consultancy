import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { contactSchema } from "@/lib/validators";
import { rateLimit } from "@/lib/rateLimit";
import { sendLeadEmail } from "@/lib/mail";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // honeypot: bots bharte hain, chupchap ok bol do
    if (body?.website) return NextResponse.json({ ok: true });

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const fields = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0];
        if (k && !fields[k]) fields[k] = issue.message;
      }
      return NextResponse.json(
        { error: "Please check the form", fields },
        { status: 400 }
      );
    }

    const { website, ...data } = parsed.data; // sirf allowed fields
    await connectDB();
    const lead = await Lead.create(data);

    // email fail ho jaye to bhi lead save hai
    try {
      const sent = await sendLeadEmail(lead);
      if (sent) {
        lead.emailSent = true;
        await lead.save();
      }
    } catch (err) {
      console.error("Lead email failed:", err.message);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}