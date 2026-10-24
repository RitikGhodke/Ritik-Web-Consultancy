"use client";

import { motion } from "motion/react";
import {
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Rocket,
  Gauge,
  LifeBuoy,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { services } from "@/lib/data";

const icons = {
  globe: Globe,
  cart: ShoppingCart,
  layout: LayoutDashboard,
  rocket: Rocket,
  gauge: Gauge,
  support: LifeBuoy,
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-hidden px-6 py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="// SERVICES"
          title="Everything your business needs"
          highlight="to grow online"
          sub="From a simple business website to a full web app with payments and an admin panel. Built custom, not from templates."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SpotlightCard className="h-full p-7">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}