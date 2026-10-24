"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { posts } from "@/lib/data";

// Blog pages (/blog/[slug]) admin panel ke saath banenge. Tab tak false rakho.
const BLOG_PAGES_READY = false;

function PostCard({ p }) {
  const card = (
    <SpotlightCard className="h-full">
      <div
        className="relative aspect-[16/9] overflow-hidden"
        style={{ background: p.gradient }}
      >
        <div className="grid-bg absolute inset-0 opacity-40" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[11px] backdrop-blur">
          {p.category}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
          <span>{p.dateLabel}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span className="inline-flex items-center gap-1">
            <Clock size={12} />
            {p.readTime}
          </span>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
          {p.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>

        {BLOG_PAGES_READY ? (
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-cyan-300">
            Read article
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        ) : (
          <span className="mt-6 inline-block font-mono text-[11px] tracking-[0.15em] text-muted">
            COMING SOON
          </span>
        )}
      </div>
    </SpotlightCard>
  );

  return BLOG_PAGES_READY ? (
    <Link href={`/blog/${p.slug}`} className="block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}

export default function Blog() {
  return (
    <section id="blog" className="relative scroll-mt-20 px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="// INSIGHTS"
          title="Ideas to help your business"
          highlight="grow online"
          sub="Short, practical reads on websites, speed, SEO and getting more customers from the web."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <PostCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}