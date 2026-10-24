import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, trim: true, maxlength: 80, default: "" },
    text: { type: String, trim: true, maxlength: 1000, default: "" },
    tech: { type: [String], default: [] },
    domain: { type: String, trim: true, maxlength: 120, default: "" },
    link: { type: String, trim: true, maxlength: 300, default: "" },
    image: { type: String, trim: true, maxlength: 500, default: "" },
    imagePublicId: { type: String, trim: true, maxlength: 300, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);