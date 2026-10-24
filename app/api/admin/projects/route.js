import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { requireAdmin } from "@/lib/auth";
import { projectSchema, fieldErrors } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    await connectDB();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Projects list error:", err.message);
    return NextResponse.json({ error: "Could not load projects" }, { status: 500 });
  }
}

export async function POST(req) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the fields", fields: fieldErrors(parsed.error) },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const project = await Project.create(parsed.data);
    revalidatePath("/");
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("Project create error:", err.message);
    return NextResponse.json({ error: "Could not save project" }, { status: 500 });
  }
}