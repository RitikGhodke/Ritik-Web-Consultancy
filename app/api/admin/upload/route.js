import { NextResponse } from "next/server";
import cloudinary, { cloudinaryReady } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB (Vercel ki request limit ke andar)
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

// file ke asli bytes check (sirf naam/type par bharosa nahi)
function looksLikeImage(buf) {
  const jpg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const webp =
    buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP";
  return jpg || png || webp;
}

export async function POST(req) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  if (!cloudinaryReady()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured in .env.local" },
      { status: 500 }
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Only JPG, PNG or WebP allowed" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image is larger than 4 MB" }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!looksLikeImage(buffer)) {
      return NextResponse.json({ error: "That file is not a valid image" }, { status: 400 });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "ritik-web-consultancy/projects",
            resource_type: "image",
            // bahut bade image ko 1600px tak chhota karke save karta hai
            transformation: [{ width: 1600, crop: "limit", quality: "auto" }],
          },
          (err, res) => (err ? reject(err) : resolve(res))
        )
        .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error("Upload error:", err.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}