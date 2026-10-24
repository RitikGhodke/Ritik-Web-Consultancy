"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { process } from "@/lib/data";

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });

  return (
    <section
      id="process"
      className="relative scroll-mt-20 overflow-hidden px-6 py-28"
    >
      <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-accent2/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="// PROCESS"
          title="A simple process,"
          highlight="no surprises"
          sub="You always know what is happening and what comes next."
        />

        <div ref={ref} className="relative mt-16 pl-10 md:pl-16">
          <div className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 md:left-[19px]" />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-cyan-300 to-accent2 md:left-[19px]"
          />

          {process.map((s, i) => (
            <Reveal key={s.title} className="relative pb-14 last:pb-0">
              <div className="absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/50 bg-bg font-mono text-[9px] text-cyan-300 md:-left-16 md:h-10 md:w-10 md:text-xs">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-2xl font-semibold md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                {s.text}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}