import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  sub,
  center = false,
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-mono text-xs tracking-[0.25em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-cyan-300 to-accent2 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      {sub && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{sub}</p>
      )}
    </Reveal>
  );
}