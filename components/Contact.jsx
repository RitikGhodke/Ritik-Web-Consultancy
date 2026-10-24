"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MapPin, MessageCircle, Send, Check, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { site } from "@/lib/config";
import { services, budgets } from "@/lib/data";

// Backend (Phase 2) ready hone ke baad true kar dena.
// Tab tak form WhatsApp pe details bhej deta hai.
const USE_API = true;

const initial = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  website: "", // honeypot: bots bharte hain, insaan nahi
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.05]";

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-muted">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-rose-400">{error}</span>}
    </label>
  );
}

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name";

  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim());
  const okPhone = v.phone.replace(/\D/g, "").length >= 10;

  if (!okEmail && !okPhone) e.email = "Add a valid email or phone number";
  if (v.email.trim() && !okEmail) e.email = "That email doesn't look right";
  if (v.phone.trim() && !okPhone) e.phone = "Enter a valid phone number";

  if (v.message.trim().length < 10)
    e.message = "Tell me a little more (at least 10 characters)";
  return e;
}

export default function Contact() {
  const [v, setV] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (k) => (e) => {
    setV((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const openWhatsApp = () => {
    const text =
      `Hi, I'm ${v.name.trim()}.\n` +
      (v.service ? `Service: ${v.service}\n` : "") +
      (v.budget ? `Budget: ${v.budget}\n` : "") +
      (v.email.trim() ? `Email: ${v.email.trim()}\n` : "") +
      (v.phone.trim() ? `Phone: ${v.phone.trim()}\n` : "") +
      `\n${v.message.trim()}`;
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (v.website) {
      setStatus("success"); // bot hai, chupchap ignore
      return;
    }

    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (!USE_API) {
      openWhatsApp();
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setV(initial);
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setV(initial);
    setErrors({});
    setStatus("idle");
  };

  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi, I want to discuss a website project."
  )}`;

  const info = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with me directly",
      href: waHref,
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    ...(site.location
      ? [{ icon: MapPin, label: "Location", value: site.location }]
      : []),
    { icon: Clock, label: "Reply time", value: site.replyTime },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden px-6 py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="// CONTACT"
          title="Let's build something"
          highlight="great together"
          sub="Tell me about your business and what you need. I will get back to you with ideas and a clear plan."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left: contact info */}
          <div className="space-y-4 lg:col-span-2">
            {info.map((it) => {
              const Icon = it.icon;
              const body = (
                <SpotlightCard className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      <Icon size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] tracking-[0.15em] text-muted">
                        {it.label.toUpperCase()}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-medium">
                        {it.value}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              );
              return it.href ? (
                <a
                  key={it.label}
                  href={it.href}
                  {...(it.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="block"
                >
                  {body}
                </a>
              ) : (
                <div key={it.label}>{body}</div>
              );
            })}
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                    >
                      <Check size={30} />
                    </motion.div>
                    <h3 className="mt-6 font-display text-2xl font-semibold">
                      {USE_API ? "Message sent!" : "Almost there!"}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      {USE_API
                        ? "Thanks for reaching out. I will reply soon."
                        : "WhatsApp should have opened with your details. Just press send and I will reply soon."}
                    </p>
                    <button
                      onClick={reset}
                      className="mt-8 rounded-full border border-white/10 px-6 py-2.5 text-sm transition-colors hover:bg-white/5"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="YOUR NAME" error={errors.name}>
                        <input
                          className={inputCls}
                          name="name"
                          autoComplete="name"
                          placeholder="Ritik Sharma"
                          value={v.name}
                          onChange={set("name")}
                        />
                      </Field>
                      <Field label="EMAIL" error={errors.email}>
                        <input
                          className={inputCls}
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={v.email}
                          onChange={set("email")}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="PHONE / WHATSAPP" error={errors.phone}>
                        <input
                          className={inputCls}
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          value={v.phone}
                          onChange={set("phone")}
                        />
                      </Field>
                      <Field label="SERVICE">
                        <select
                          className={`${inputCls} [&>option]:bg-[#070a14]`}
                          value={v.service}
                          onChange={set("service")}
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </Field>
                    </div>

                    <Field label="BUDGET">
                      <select
                        className={`${inputCls} [&>option]:bg-[#070a14]`}
                        value={v.budget}
                        onChange={set("budget")}
                      >
                        <option value="">Select a range</option>
                        {budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="PROJECT DETAILS" error={errors.message}>
                      <textarea
                        className={`${inputCls} resize-none`}
                        name="message"
                        rows={5}
                        placeholder="Tell me about your business and what you want to build..."
                        value={v.message}
                        onChange={set("message")}
                      />
                    </Field>

                    {/* honeypot */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={v.website}
                      onChange={set("website")}
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    {status === "error" && (
                      <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
                        Something went wrong. Please try WhatsApp or email instead.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-8px_var(--accent)] transition-shadow hover:shadow-[0_0_60px_-4px_var(--accent)] disabled:opacity-60 sm:w-auto"
                    >
                      {status === "sending" ? "Sending..." : "Send message"}
                      <Send
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}