"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/config";

export default function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi, I found your website and want to discuss a project."
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 4, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_40px_-8px_rgba(16,185,129,0.8)]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40" />
      <MessageCircle className="relative" size={26} />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg border border-white/10 bg-[#070a14] px-3 py-1.5 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}