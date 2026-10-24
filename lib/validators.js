import { z } from "zod";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name").max(100),
    email: z.string().trim().max(200).default(""),
    phone: z.string().trim().max(30).default(""),
    service: z.string().trim().max(100).default(""),
    budget: z.string().trim().max(100).default(""),
    message: z.string().trim().min(10, "Message is too short").max(3000),
    website: z.string().max(200).default(""), // honeypot
  })
  .superRefine((v, ctx) => {
    const okEmail = emailRe.test(v.email);
    const okPhone = v.phone.replace(/\D/g, "").length >= 10;

    if (!okEmail && !okPhone) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Add a valid email or phone number",
      });
    }
    if (v.email && !okEmail) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Invalid email" });
    }
    if (v.phone && !okPhone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Invalid phone" });
    }
  });



  // ---------- Projects (admin) ----------
const httpUrl = z
  .string()
  .trim()
  .max(300)
  .refine(
    (v) => v === "" || /^https?:\/\/[^\s]+$/i.test(v),
    "Must start with http:// or https://"
  );

const cloudImage = z
  .string()
  .trim()
  .max(500)
  .refine(
    (v) => v === "" || /^https:\/\/res\.cloudinary\.com\//i.test(v),
    "Invalid image URL"
  );

export const projectSchema = z.object({
  title: z.string().trim().min(2, "Title is too short").max(120),
  category: z.string().trim().max(80).default(""),
  text: z.string().trim().max(1000).default(""),
  tech: z.array(z.string().trim().min(1).max(40)).max(12).default([]),
  domain: z.string().trim().max(120).default(""),
  link: httpUrl.default(""),
  image: cloudImage.default(""),
  imagePublicId: z.string().trim().max(300).default(""),
  order: z.coerce.number().int().min(0).max(9999).default(0),
  published: z.boolean().default(true),
});

export const togglePublishSchema = z.object({ published: z.boolean() });

export function fieldErrors(error) {
  const fields = {};
  for (const issue of error.issues) {
    const k = issue.path[0];
    if (k && !fields[k]) fields[k] = issue.message;
  }
  return fields;
}