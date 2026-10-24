import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { requireAdmin } from "@/lib/auth";
import { destroyImage } from "@/lib/cloudinary";
import { projectSchema, togglePublishSchema, fieldErrors } from "@/lib/validators";

export const runtime = "nodejs";

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

  try {
    await connectDB();
    const project = await Project.findById(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const keys = Object.keys(body || {});
    if (keys.length === 1 && keys[0] === "published") {
      // sirf publish/hide toggle
      const parsed = togglePublishSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Invalid value" }, { status: 400 });
      }
      project.published = parsed.data.published;
      await project.save();
    } else {
      const parsed = projectSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Please check the fields", fields: fieldErrors(parsed.error) },
          { status: 400 }
        );
      }
      const oldImageId = project.imagePublicId;
      project.set(parsed.data);
      await project.save();
      // image badli ho to purani Cloudinary se hata do
      if (oldImageId && oldImageId !== parsed.data.imagePublicId) {
        await destroyImage(oldImageId);
      }
    }

    revalidatePath("/");
    return NextResponse.json({ project });
  } catch (err) {
    console.error("Project update error:", err.message);
    return NextResponse.json({ error: "Could not update project" }, { status: 500 });
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
    const project = await Project.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await destroyImage(project.imagePublicId);
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Project delete error:", err.message);
    return NextResponse.json({ error: "Could not delete project" }, { status: 500 });
  }
}