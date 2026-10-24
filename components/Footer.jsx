import { ArrowUp } from "lucide-react";
import { site } from "@/lib/config";
import { services } from "@/lib/data";

export default function Footer() {
  const socials = site.social.filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 pt-16">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <a href="#top" className="font-display text-xl font-bold tracking-tight">
            {site.name}
            <span className="text-cyan-400">.</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}. Custom websites and web apps built with Next.js, Node
            and MongoDB.
          </p>
          {socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-slate-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] text-muted">EXPLORE</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {site.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-slate-300 transition-colors hover:text-cyan-300">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] text-muted">SERVICES</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.id}>
                <a href="#services" className="text-slate-300 transition-colors hover:text-cyan-300">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-[0.2em] text-muted">CONTACT</h4>
          <ul className="mt-5 space-y-3 text-sm text-slate-300">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-cyan-300">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cyan-300"
              >
                WhatsApp
              </a>
            </li>
            {site.location && <li className="text-muted">{site.location}</li>}
          </ul>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
        >
          Back to top <ArrowUp size={14} />
        </a>
      </div>

      {/* bada halka wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[4vw] select-none text-center font-display text-[28vw] font-bold leading-none tracking-tighter text-transparent sm:text-[20vw]"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent 80%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {site.short}
      </div>
    </footer>
  );
}