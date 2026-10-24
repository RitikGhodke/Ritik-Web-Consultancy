"use client";

import { motion } from "motion/react";

export default function SplitText({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.07,
}) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
        >
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}