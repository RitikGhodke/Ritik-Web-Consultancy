"use client";

import { motion, useReducedMotion } from "motion/react";
import { techRow1, techRow2 } from "@/lib/data";

function Row({ items, reverse = false, duration = 40 }) {
  const reduce = useReducedMotion();
  const list = [...items, ...items];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max"
        animate={
          reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {list.map((t, i) => (
          <span
            key={i}
            className="mr-4 flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-slate-300 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Tech stack"
      className="relative border-y border-white/5 py-10"
    >
      <p className="mb-6 text-center font-mono text-xs tracking-[0.25em] text-muted">
        {"// TECH I BUILD WITH"}
      </p>
      <div className="flex flex-col gap-4">
        <Row items={techRow1} duration={38} />
        <Row items={techRow2} reverse duration={44} />
      </div>
    </section>
  );
}