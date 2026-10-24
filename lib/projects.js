import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { projects as fallback } from "@/lib/data";

const gradients = [
  "linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)",
  "linear-gradient(135deg, #0e7490 0%, #1d4ed8 100%)",
  "linear-gradient(135deg, #be185d 0%, #4f46e5 100%)",
  "linear-gradient(135deg, #047857 0%, #0e7490 100%)",
];

const initialsOf = (title = "") =>
  title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export async function getPublicProjects() {
  try {
    await connectDB();
    const docs = await Project.find({ published: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    if (!docs.length) return fallback;

    return docs.map((d, i) => ({
      id: String(d._id),
      category: d.category || "Project",
      title: d.title,
      initials: initialsOf(d.title),
      domain: d.domain || "",
      text: d.text || "",
      tech: d.tech || [],
      gradient: gradients[i % gradients.length],
      image: d.image || null,
      link: d.link || "",
    }));
  } catch (err) {
    console.error("getPublicProjects failed:", err.message);
    return fallback;
  }
}