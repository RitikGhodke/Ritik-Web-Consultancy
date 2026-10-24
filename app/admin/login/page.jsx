"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.05]";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-bg p-6"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur"
      >
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <Lock size={20} />
        </div>
        <h1 className="font-display text-2xl font-bold">Admin login</h1>
        <p className="mt-1 text-sm text-muted">Ritik Web Consultancy</p>

        <div className="mt-8 space-y-4">
          <input
            className={inputCls}
            type="email"
            autoComplete="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={inputCls}
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-8px_var(--accent)] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}