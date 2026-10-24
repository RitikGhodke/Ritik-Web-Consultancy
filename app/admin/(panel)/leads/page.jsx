"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, MessageCircle, Trash2, ChevronDown } from "lucide-react";
import { api } from "@/lib/adminFetch";

const TABS = [
  { key: "", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "closed", label: "Closed" },
];

const badge = {
  new: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  contacted: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  closed: "border-slate-400/30 bg-slate-400/10 text-slate-300",
};

// 10 digit number ho to India (+91) maan lete hain
const waNumber = (phone) => {
  const d = (phone || "").replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
};

export default function LeadsPage() {
  const [tab, setTab] = useState("");
  const [leads, setLeads] = useState([]);
  const [counts, setCounts] = useState({ new: 0, contacted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api(`/api/admin/leads${tab ? `?status=${tab}` : ""}`);
      setLeads(data.leads);
      setCounts(data.counts);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id, status) => {
    try {
      await api(`/api/admin/leads/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      await api(`/api/admin/leads/${id}`, { method: "DELETE" });
      setOpen(null);
      await load();
    } catch (e) {
      setError(e.message);
    }
  };

  const total = counts.new + counts.contacted + counts.closed;
  const tabCount = (k) => (k === "" ? total : counts[k]);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Leads</h1>
      <p className="mt-1 text-sm text-muted">Messages from your contact form.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              tab === t.key
                ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                : "border-white/10 text-muted hover:text-fg"
            }`}
          >
            {t.label}{" "}
            <span className="font-mono text-xs opacity-70">{tabCount(t.key)}</span>
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-muted">Loading...</p>}
        {!loading && leads.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-muted">
            No leads here yet.
          </p>
        )}

        {leads.map((l) => {
          const isOpen = open === l._id;
          const wa = waNumber(l.phone);
          return (
            <div
              key={l._id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <button
                onClick={() => setOpen(isOpen ? null : l._id)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{l.name}</p>
                  <p className="truncate text-xs text-muted">
                    {[l.service, l.budget].filter(Boolean).join(" · ") || "No service selected"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-[11px] text-muted sm:inline">
                    {new Date(l.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase ${badge[l.status]}`}
                  >
                    {l.status}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="space-y-4 border-t border-white/10 p-4">
                  <div className="grid gap-3 text-sm sm:grid-cols-2">
                    <p>
                      <span className="text-muted">Email: </span>
                      {l.email || "-"}
                    </p>
                    <p>
                      <span className="text-muted">Phone: </span>
                      {l.phone || "-"}
                    </p>
                    <p>
                      <span className="text-muted">Service: </span>
                      {l.service || "-"}
                    </p>
                    <p>
                      <span className="text-muted">Budget: </span>
                      {l.budget || "-"}
                    </p>
                  </div>

                  <div className="whitespace-pre-wrap rounded-xl bg-black/30 p-4 text-sm leading-relaxed">
                    {l.message}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={l.status}
                      onChange={(e) => setStatus(l._id, e.target.value)}
                      className="rounded-lg border border-white/10 bg-[#070a14] px-3 py-2 text-sm outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>

                    {wa && (
                      <a
                        href={`https://wa.me/${wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300"
                      >
                        <MessageCircle size={15} /> WhatsApp
                      </a>
                    )}
                    {l.email && (
                      <a
                        href={`mailto:${l.email}`}
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 hover:bg-white/5"
                      >
                        <Mail size={15} /> Email
                      </a>
                    )}
                    <button
                      onClick={() => remove(l._id)}
                      className="ml-auto flex items-center gap-1.5 rounded-lg border border-rose-400/30 px-3 py-2 text-sm text-rose-300 hover:bg-rose-400/10"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}