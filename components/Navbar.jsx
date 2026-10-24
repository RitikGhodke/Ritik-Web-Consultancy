// "use client";

// import { useEffect, useState } from "react";
// import { motion, useScroll, useMotionValueEvent } from "motion/react";
// import { site } from "@/lib/config";

// export default function Navbar() {
//   const { scrollY } = useScroll();
//   const [hidden, setHidden] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [ready, setReady] = useState(false);

//   // intro (3 sec) ke baad navbar aata hai
//   useEffect(() => {
//     const t = setTimeout(() => setReady(true), 3000);
//     return () => clearTimeout(t);
//   }, []);

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     const prev = scrollY.getPrevious() ?? 0;
//     setHidden(latest > prev && latest > 120);
//     setScrolled(latest > 40);
//   });

//   return (
//     <motion.header
//       initial={{ y: "-100%" }}
//       animate={{ y: !ready || hidden ? "-100%" : 0 }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//       className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
//         scrolled ? "border-b border-border bg-bg/70 backdrop-blur-xl" : ""
//       }`}
//     >
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         <a href="#top" className="font-display text-lg font-bold tracking-tight">
//           {site.short}
//           <span className="text-cyan-400">.</span>
//         </a>

//         <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
//           {site.nav.map((item) => (
//             <li key={item.href}>
//               <a href={item.href} className="transition-colors hover:text-fg">
//                 {item.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <a
//           href="#contact"
//           className="rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-2 text-sm font-medium transition-colors hover:bg-cyan-400/20"
//         >
//           Let&apos;s talk
//         </a>
//       </nav>
//     </motion.header>
//   );
// }















// "use client";

// import { useEffect, useState } from "react";
// import {
//   AnimatePresence,
//   motion,
//   useScroll,
//   useMotionValueEvent,
// } from "motion/react";
// import { Menu, X } from "lucide-react";
// import { site } from "@/lib/config";

// export default function Navbar() {
//   const { scrollY } = useScroll();
//   const [hidden, setHidden] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [ready, setReady] = useState(false);
//   const [open, setOpen] = useState(false);

//   // intro (3 sec) ke baad navbar aata hai
//   useEffect(() => {
//     const t = setTimeout(() => setReady(true), 3000);
//     return () => clearTimeout(t);
//   }, []);

//   // menu khula ho to page scroll band
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [open]);

//   useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && setOpen(false);
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     const prev = scrollY.getPrevious() ?? 0;
//     setHidden(latest > prev && latest > 120);
//     setScrolled(latest > 40);
//   });

//   return (
//     <>
//       <motion.header
//         initial={{ y: "-100%" }}
//         animate={{ y: !ready || (hidden && !open) ? "-100%" : 0 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
//           scrolled || open ? "border-b border-border bg-bg/70 backdrop-blur-xl" : ""
//         }`}
//       >
//         <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//           <a
//             href="#top"
//             onClick={() => setOpen(false)}
//             className="font-display text-lg font-bold tracking-tight"
//           >
//             {site.short}
//             <span className="text-cyan-400">.</span>
//           </a>

//           <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
//             {site.nav.map((item) => (
//               <li key={item.href}>
//                 <a href={item.href} className="transition-colors hover:text-fg">
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <a
//             href="#contact"
//             className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-2 text-sm font-medium transition-colors hover:bg-cyan-400/20 md:inline-block"
//           >
//             Let&apos;s talk
//           </a>

//           <button
//             type="button"
//             onClick={() => setOpen((o) => !o)}
//             aria-label={open ? "Close menu" : "Open menu"}
//             aria-expanded={open}
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
//           >
//             {open ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </nav>
//       </motion.header>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.25 }}
//             className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden"
//           >
//             <ul className="space-y-2">
//               {site.nav.map((item, i) => (
//                 <motion.li
//                   key={item.href}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.05 + i * 0.06 }}
//                 >
//                   <a
//                     href={item.href}
//                     onClick={() => setOpen(false)}
//                     className="block py-3 font-display text-4xl font-bold tracking-tight"
//                   >
//                     {item.label}
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//             <motion.a
//               href="#contact"
//               onClick={() => setOpen(false)}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.45 }}
//               className="mt-10 inline-block w-fit rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white"
//             >
//               Start a project
//             </motion.a>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
















"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/config";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  // intro (3 sec) ke baad navbar aata hai
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // menu khula ho to page scroll band
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120);
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: !ready || (hidden && !open) ? "-100%" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? "border-b border-border bg-bg/70 backdrop-blur-xl" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="font-display text-lg font-bold tracking-tight"
          >
            {site.short}
            <span className="text-cyan-400">.</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/5 px-5 py-2 text-sm font-medium transition-colors hover:bg-cyan-400/20 md:inline-block"
          >
            Let&apos;s talk
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-2">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-4xl font-bold tracking-tight"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-10 inline-block w-fit rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white"
            >
              Start a project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}