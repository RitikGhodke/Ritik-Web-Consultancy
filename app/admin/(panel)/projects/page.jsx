"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, ImagePlus, X } from "lucide-react";
import { api } from "@/lib/adminFetch";

const empty = {
  title: "",
  category: "",
  text: "",
  techText: "",
  domain: "",
  link: "",
  image: "",
  imagePublicId: "",
  order: 0,
  published: true,
};

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/[0.05]";

const errMsg = (e) =>
  e.fields
    ? Object.entries(e.fields)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" · ")
    : e.message;

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-muted">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export default function ProjectsAdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); // null | "new" | project id
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const formRef = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api("/api/admin/projects");
      setItems(data.projects);
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (editingId) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [editingId]);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const startNew = () => {
    setForm({ ...empty, order: items.length });
    setEditingId("new");
    setError("");
  };

  const startEdit = (p) => {
    setForm({
      title: p.title || "",
      category: p.category || "",
      text: p.text || "",
      techText: (p.tech || []).join(", "),
      domain: p.domain || "",
      link: p.link || "",
      image: p.image || "",
      imagePublicId: p.imagePublicId || "",
      order: p.order ?? 0,
      published: p.published,
    });
    setEditingId(p._id);
    setError("");
  };

  const cancel = () => {
    setEditingId(null);
    setError("");
  };

  const onFile = async (e) => {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await api("/api/admin/upload", { method: "POST", body: fd });
      setForm((f) => ({ ...f, image: r.url, imagePublicId: r.publicId }));
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let link = form.link.trim();
    if (link && !/^https?:\/\//i.test(link)) link = `https://${link}`;

    const payload = {
      title: form.title,
      category: form.category,
      text: form.text,
      tech: form.techText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      domain: form.domain,
      link,
      image: form.image,
      imagePublicId: form.imagePublicId,
      order: Number(form.order) || 0,
      published: form.published,
    };

    try {
      if (editingId === "new") {
        await api("/api/admin/projects", { method: "POST", body: JSON.stringify(payload) });
      } else {
        await api(`/api/admin/projects/${editingId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      }
      setEditingId(null);
      await load();
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (p) => {
    try {
      await api(`/api/admin/projects/${p._id}`, {
        method: "PATCH",
        body: JSON.stringify({ published: !p.published }),
      });
      await load();
    } catch (e) {
      setError(errMsg(e));
    }
  };

  const remove = async (p) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try {
      await api(`/api/admin/projects/${p._id}`, { method: "DELETE" });
      if (editingId === p._id) setEditingId(null);
      await load();
    } catch (e) {
      setError(errMsg(e));
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-muted">
            These appear in the Projects section of your website.
          </p>
        </div>
        {!editingId && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_-8px_var(--accent)]"
          >
            <Plus size={16} /> Add project
          </button>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}

      {editingId && (
        <form
          ref={formRef}
          onSubmit={save}
          className="mt-8 space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          <h2 className="font-display text-xl font-semibold">
            {editingId === "new" ? "New project" : "Edit project"}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="TITLE">
              <input
                className={inputCls}
                value={form.title}
                onChange={setField("title")}
                placeholder="Akhil Kala Film's"
                required
              />
            </Field>
            <Field label="CATEGORY">
              <input
                className={inputCls}
                value={form.category}
                onChange={setField("category")}
                placeholder="Photography Portfolio"
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="DOMAIN (shown in browser bar)">
              <input
                className={inputCls}
                value={form.domain}
                onChange={setField("domain")}
                placeholder="example.com"
              />
            </Field>
            <Field label="LIVE LINK" hint="Leave empty to hide the 'Visit live site' button.">
              <input
                className={inputCls}
                value={form.link}
                onChange={setField("link")}
                placeholder="https://example.com"
              />
            </Field>
          </div>

          <Field label="DESCRIPTION">
            <textarea
              className={`${inputCls} resize-none`}
              rows={4}
              value={form.text}
              onChange={setField("text")}
              placeholder="What the project is, and what problem it solves..."
            />
          </Field>

          <Field label="TECH USED" hint="Separate with commas, e.g. Next.js, MongoDB, Razorpay">
            <input
              className={inputCls}
              value={form.techText}
              onChange={setField("techText")}
              placeholder="Next.js, Tailwind, Cloudinary"
            />
          </Field>

          <div>
            <span className="mb-2 block font-mono text-[11px] tracking-[0.15em] text-muted">
              SCREENSHOT
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-24 w-40 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/30">
                {form.image ? (
                  <img src={form.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-muted">No image</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-400/15">
                  <ImagePlus size={16} />
                  {uploading ? "Uploading..." : form.image ? "Replace image" : "Upload image"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={onFile}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {form.image && (
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, image: "", imagePublicId: "" }))}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:underline"
                  >
                    <X size={13} /> Remove image
                  </button>
                )}
                <span className="text-xs text-muted">
                  JPG, PNG or WebP, max 4 MB. A homepage screenshot (16:10) looks best.
                </span>
              </div>
            </div>
          </div>

          <div className="grid items-end gap-5 sm:grid-cols-2">
            <Field label="ORDER" hint="Smaller number shows first.">
              <input
                className={inputCls}
                type="number"
                min="0"
                value={form.order}
                onChange={setField("order")}
              />
            </Field>
            <label className="flex items-center gap-3 pb-3 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="h-4 w-4 accent-cyan-400"
              />
              Published (visible on the website)
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save project"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="rounded-full border border-white/10 px-6 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 space-y-3">
        {loading && <p className="text-sm text-muted">Loading...</p>}
        {!loading && items.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-muted">
            No projects yet. Until you add one, the website shows sample projects. Click
            &quot;Add project&quot; to add your first real one.
          </p>
        )}

        {items.map((p) => (
          <div
            key={p._id}
            className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-accent to-accent2 font-display text-lg font-bold">
              {p.image ? (
                <img src={p.image} alt="" className="h-full w-full object-cover" />
              ) : (
                (p.title || "?").slice(0, 2).toUpperCase()
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.title}</p>
              <p className="truncate text-xs text-muted">
                {[p.category, p.domain].filter(Boolean).join(" · ") || "No details"}
              </p>
            </div>

            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase ${
                p.published
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                  : "border-slate-400/30 bg-slate-400/10 text-slate-300"
              }`}
            >
              {p.published ? "Published" : "Hidden"}
            </span>
            <span className="font-mono text-xs text-muted">#{p.order}</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => togglePublish(p)}
                title={p.published ? "Hide from website" : "Show on website"}
                className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5"
              >
                {p.published ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              <button
                onClick={() => startEdit(p)}
                title="Edit"
                className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5"
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => remove(p)}
                title="Delete"
                className="rounded-lg border border-rose-400/30 p-2 text-rose-300 hover:bg-rose-400/10"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}