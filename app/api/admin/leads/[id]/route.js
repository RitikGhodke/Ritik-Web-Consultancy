import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const statusSchema = z.object({ status: z.enum(["new", "contacted", "closed"]) });

export async function PATCH(req, { params }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    await connectDB();
    const lead = await Lead.findByIdAndUpdate(
      id,
      { status: parsed.data.status },
      { new: true }
    ).lean();
    if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ lead });
  } catch (err) {
    console.error("Lead update error:", err.message);
    return NextResponse.json({ error: "Could not update lead" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await connectDB();
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead delete error:", err.message);
    return NextResponse.json({ error: "Could not delete lead" }, { status: 500 });
  }
}