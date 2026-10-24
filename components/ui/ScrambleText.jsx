"use client";

import { useEffect, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#0123456789";

export default function ScrambleText({
  text,
  delay = 0,
  duration = 1500,
  className = "",
  style,
}) {
  const words = text.split(" ");
  const total = text.replace(/ /g, "").length;
  const [progress, setProgress] = useState(-1); // -1 = abhi hidden
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      setDone(true);
      return;
    }

    let raf = 0;
    let last = 0;
    const timer = setTimeout(() => {
      const startAt = performance.now();
      const loop = (now) => {
        if (now - last > 45) {
          last = now;
          const p = Math.min(1, (now - startAt) / duration);
          setProgress(p);
          if (p >= 1) {
            setDone(true);
            return;
          }
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [delay, duration]);

  const eased = progress < 0 ? 0 : 1 - Math.pow(1 - progress, 2);
  const revealed = Math.floor(eased * total);
  const active = progress >= 0 && !done;
  let idx = 0;

  return (
    <span
      className={className}
      aria-label={text}
      style={{
        textShadow: active
          ? "2px 0 rgba(34,211,238,.55), -2px 0 rgba(255,70,120,.4)"
          : "none",
        ...style,
      }}
    >
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="relative inline-block whitespace-nowrap" aria-hidden="true">
            {/* invisible word layout fix rakhta hai, upar scrambled letters aate hain */}
            <span className="invisible">{word}</span>
            <span className="absolute left-0 top-0">
              {word.split("").map((ch, ci) => {
                const i = idx++;
                if (progress < 0) return null;
                if (i < revealed) return <span key={ci}>{ch}</span>;
                return (
                  <span key={ci} className="text-cyan-300/70">
                    {GLYPHS[Math.floor(Math.random() * GLYPHS.length)]}
                  </span>
                );
              })}
            </span>
          </span>
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}