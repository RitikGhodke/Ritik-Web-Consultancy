import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, trim: true, lowercase: true, maxlength: 200, default: "" },
    phone: { type: String, trim: true, maxlength: 30, default: "" },
    service: { type: String, trim: true, maxlength: 100, default: "" },
    budget: { type: String, trim: true, maxlength: 100, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);