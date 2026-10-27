// "use client";

// import { motion } from "motion/react";
// import { ArrowUpRight } from "lucide-react";
// import SectionHeading from "@/components/ui/SectionHeading";
// // import { projects } from "@/lib/data";

// function Mock({ p }) {
//   return (
//     <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/40">
//       <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
//         <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
//         <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
//         <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
//         <span className="ml-3 truncate rounded bg-white/5 px-3 py-0.5 font-mono text-[10px] text-muted">
//           {p.domain}
//         </span>
//       </div>

//       {p.image ? (
//         // eslint-disable-next-line @next/next/no-img-element
//         <img
//           src={p.image}
//           alt={p.title}
//           className="absolute inset-0 top-9 h-[calc(100%-2.25rem)] w-full object-cover"
//         />
//       ) : (
//         <div
//           className="absolute inset-0 top-9 flex flex-col items-center justify-center gap-4"
//           style={{ background: p.gradient }}
//         >
//           <span className="font-display text-6xl font-bold text-white/90">
//             {p.initials}
//           </span>
//           <div className="w-1/2 space-y-2">
//             <div className="h-2 w-full rounded bg-white/25" />
//             <div className="h-2 w-4/5 rounded bg-white/20" />
//             <div className="h-2 w-3/5 rounded bg-white/15" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ProjectCard({ p, i }) {
//   return (
//     <div className="sticky mb-10" style={{ top: `${96 + i * 18}px` }}>
//       <motion.article
//         initial={{ opacity: 0, y: 60, scale: 0.97 }}
//         whileInView={{ opacity: 1, y: 0, scale: 1 }}
//         viewport={{ once: true, margin: "-80px" }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className="grid items-center gap-8 rounded-3xl border border-white/10 bg-[#070a14] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:grid-cols-2 md:p-10"
//       >
//         <div>
//           <div className="flex items-center gap-3 font-mono text-xs text-cyan-300">
//             <span>{String(i + 1).padStart(2, "0")}</span>
//             <span className="h-px w-8 bg-cyan-300/40" />
//             <span className="tracking-[0.2em]">{p.category.toUpperCase()}</span>
//           </div>
//           <h3 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
//             {p.title}
//           </h3>
//           <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
//             {p.text}
//           </p>
//           <div className="mt-6 flex flex-wrap gap-2">
//             {p.tech.map((t) => (
//               <span
//                 key={t}
//                 className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-300"
//               >
//                 {t}
//               </span>
//             ))}
//           </div>
//           {p.link && (
//             <a
//               href={p.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-cyan-400/15"
//             >
//               Visit live site <ArrowUpRight size={16} />
//             </a>
//           )}
//         </div>

//         <motion.div
//           whileHover={{ scale: 1.02, rotate: -0.6 }}
//           transition={{ type: "spring", stiffness: 200, damping: 20 }}
//         >
//           <Mock p={p} />
//         </motion.div>
//       </motion.article>
//     </div>
//   );
// }

// export default function Projects({ projects = [] }) {
//    if (!projects.length) return null;
//   return (
//     <section id="projects" className="relative scroll-mt-20 px-6 py-28">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="// SELECTED WORK"
//           title="Projects that"
//           highlight="speak for themselves"
//           sub="Real businesses, real websites. Each one built from scratch around what the business actually needs."
//         />
//         <div className="mt-16">
//           {projects.map((p, i) => (
//             <ProjectCard key={p.id} p={p} i={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }














// "use client";

// import { motion } from "motion/react";
// import { ArrowUpRight } from "lucide-react";
// import SectionHeading from "@/components/ui/SectionHeading";

// function Mock({ p }) {
//   return (
//     <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-black/40">
//       <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
//         <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
//         <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
//         <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
//         <span className="ml-3 truncate rounded bg-white/5 px-3 py-0.5 font-mono text-[10px] text-muted">
//           {p.domain}
//         </span>
//       </div>

//       {p.image ? (
//         // eslint-disable-next-line @next/next/no-img-element
//         <img
//           src={p.image}
//           alt={p.title}
//           className="absolute inset-0 top-9 h-[calc(100%-2.25rem)] w-full object-cover"
//         />
//       ) : (
//         <div
//           className="absolute inset-0 top-9 flex flex-col items-center justify-center gap-4"
//           style={{ background: p.gradient }}
//         >
//           <span className="font-display text-6xl font-bold text-white/90">
//             {p.initials}
//           </span>
//           <div className="w-1/2 space-y-2">
//             <div className="h-2 w-full rounded bg-white/25" />
//             <div className="h-2 w-4/5 rounded bg-white/20" />
//             <div className="h-2 w-3/5 rounded bg-white/15" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function ProjectCard({ p, i }) {
//   return (
//     // sticky stacking sirf md (tablet/desktop) se upar, phone pe normal scroll
//     <div className="mb-8 md:sticky md:mb-10" style={{ top: `${96 + i * 18}px` }}>
//       <motion.article
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-40px" }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className="grid items-center gap-6 rounded-3xl border border-white/10 bg-[#070a14] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:grid-cols-2 md:gap-8 md:p-10"
//       >
//         <div>
//           <div className="flex items-center gap-3 font-mono text-xs text-cyan-300">
//             <span>{String(i + 1).padStart(2, "0")}</span>
//             <span className="h-px w-8 bg-cyan-300/40" />
//             <span className="tracking-[0.2em]">{p.category.toUpperCase()}</span>
//           </div>
//           <h3 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
//             {p.title}
//           </h3>
//           <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
//             {p.text}
//           </p>
//           <div className="mt-6 flex flex-wrap gap-2">
//             {p.tech.map((t) => (
//               <span
//                 key={t}
//                 className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-300"
//               >
//                 {t}
//               </span>
//             ))}
//           </div>
//           {p.link && (
//             <a
//               href={p.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-6 py-3 text-sm font-medium transition-colors hover:bg-cyan-400/15"
//             >
//               Visit live site <ArrowUpRight size={16} />
//             </a>
//           )}
//         </div>

//         {/* phone pe image text ke upar */}
//         <motion.div
//           className="order-first md:order-none"
//           whileHover={{ scale: 1.02, rotate: -0.6 }}
//           transition={{ type: "spring", stiffness: 200, damping: 20 }}
//         >
//           <Mock p={p} />
//         </motion.div>
//       </motion.article>
//     </div>
//   );
// }

// export default function Projects({ projects = [] }) {
//   if (!projects.length) return null;

//   return (
//     <section id="projects" className="relative scroll-mt-20 px-6 py-28">
//       <div className="mx-auto max-w-6xl">
//         <SectionHeading
//           eyebrow="// SELECTED WORK"
//           title="Projects that"
//           highlight="speak for themselves"
//           sub="Real businesses, real websites. Each one built from scratch around what the business actually needs."
//         />
//         <div className="mt-16">
//           {projects.map((p, i) => (
//             <ProjectCard key={p.id} p={p} i={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

function Mock({ p }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-400/70" />
        <span className="ml-3 min-w-0 flex-1 truncate rounded bg-white/5 px-3 py-0.5 font-mono text-[10px] text-muted">
          {p.domain}
        </span>
      </div>

      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 top-9 h-[calc(100%-2.25rem)] w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 top-9 flex flex-col items-center justify-center gap-4"
          style={{ background: p.gradient }}
        >
          <span className="font-display text-5xl font-bold text-white/90 md:text-6xl">
            {p.initials}
          </span>
          <div className="w-1/2 space-y-2">
            <div className="h-2 w-full rounded bg-white/25" />
            <div className="h-2 w-4/5 rounded bg-white/20" />
            <div className="h-2 w-3/5 rounded bg-white/15" />
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ p, i }) {
  return (
    // sticky stacking phone + desktop dono pe, phone pe chhota offset
    <div
      className="sticky top-[var(--tm)] mb-6 md:top-[var(--td)] md:mb-10"
      style={{
        "--tm": `${80 + i * 10}px`,
        "--td": `${96 + i * 18}px`,
      }}
    >
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#070a14] p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:grid-cols-2 md:gap-8 md:p-10"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan-300">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 shrink-0 bg-cyan-300/40" />
            <span className="truncate tracking-[0.2em]">
              {p.category.toUpperCase()}
            </span>
          </div>
          <h3 className="mt-3 break-words font-display text-2xl font-bold tracking-tight sm:text-4xl md:mt-5">
            {p.title}
          </h3>
          <p className="mt-3 line-clamp-3 break-words text-sm leading-relaxed text-muted sm:text-base md:mt-4 md:line-clamp-none">
            {p.text}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 md:mt-6">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-cyan-400/15 md:mt-8 md:px-6 md:py-3"
            >
              Visit live site <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        {/* phone pe image text ke upar */}
        <motion.div
          className="order-first min-w-0 md:order-none"
          whileHover={{ scale: 1.02, rotate: -0.6 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Mock p={p} />
        </motion.div>
      </motion.article>
    </div>
  );
}

export default function Projects({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 px-4 py-20 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="// SELECTED WORK"
          title="Projects that"
          highlight="speak for themselves"
          sub="Real businesses, real websites. Each one built from scratch around what the business actually needs."
        />
        <div className="mt-12 md:mt-16">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}