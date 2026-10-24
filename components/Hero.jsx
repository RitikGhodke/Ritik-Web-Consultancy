"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SmokeBackground from "@/components/SmokeBackground";
import ScrambleText from "@/components/ui/ScrambleText";
import MagneticButton from "@/components/ui/MagneticButton";
import { site } from "@/lib/config";

const INTRO = 3; // seconds, shader ke 3.0 se match

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // scroll karne par text blur hoke gayab
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.45], [0, -90]);
  const blur = useTransform(scrollYProgress, [0, 0.45], [0, 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to discuss a website project."
  )}`;

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      <SmokeBackground />

      {/* neeche aur left me halka dark, taaki text saaf padhe */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg/50 via-transparent to-transparent" />

      <motion.div
        style={{ opacity, y, filter }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-28"
      >
        <div className="mb-5 font-mono text-xs tracking-[0.25em] text-cyan-300 sm:text-sm">
          <ScrambleText
            text="// WEB DEVELOPMENT SOLUTIONS"
            delay={INTRO * 1000}
            duration={1000}
          />
        </div>

        <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <ScrambleText
            text={`${site.heroLine1} ${site.heroLine2}.`}
            delay={INTRO * 1000 + 200}
            duration={1800}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: INTRO + 1.3 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {site.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: INTRO + 1.6 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-8px_var(--accent)] transition-shadow hover:shadow-[0_0_60px_-4px_var(--accent)]"
          >
            Start a Project
          </MagneticButton>
          <MagneticButton
            href="#projects"
            className="inline-block rounded-full border border-cyan-400/30 bg-cyan-400/5 px-8 py-4 text-sm font-semibold backdrop-blur transition-colors hover:bg-cyan-400/10"
          >
            View Work
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}