import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    await connectDB();
    const status = new URL(req.url).searchParams.get("status");
    const filter = ["new", "contacted", "closed"].includes(status) ? { status } : {};

    const [leads, grouped] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).limit(200).lean(),
      Lead.aggregate([{ $group: { _id: "$status", n: { $sum: 1 } } }]),
    ]);

    const counts = { new: 0, contacted: 0, closed: 0 };
    for (const g of grouped) counts[g._id] = g.n;

    return NextResponse.json({ leads, counts });
  } catch (err) {
    console.error("Leads list error:", err.message);
    return NextResponse.json({ error: "Could not load leads" }, { status: 500 });
  }
}