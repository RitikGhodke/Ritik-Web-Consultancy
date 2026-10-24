"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { stats } from "@/lib/data";

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const dur = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative px-6 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur">
              <div className="bg-gradient-to-r from-cyan-300 to-accent2 bg-clip-text font-display text-4xl font-bold text-transparent sm:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}