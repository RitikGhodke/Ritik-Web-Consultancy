// import Link from "next/link";
// import connectDB from "@/lib/mongodb";
// import Lead from "@/models/Lead";
// import { requirePageSession } from "@/lib/auth";

// export const dynamic = "force-dynamic";

// const badge = {
//   new: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
//   contacted: "border-amber-400/40 bg-amber-400/10 text-amber-300",
//   closed: "border-slate-400/30 bg-slate-400/10 text-slate-300",
// };

// export default async function AdminHome() {
//   await requirePageSession();
//   await connectDB();

//   const [newLeads, totalLeads, recent] = await Promise.all([
//     Lead.countDocuments({ status: "new" }),
//     Lead.countDocuments(),
//     Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
//   ]);

//   const cards = [
//     { label: "New leads", value: newLeads, accent: true },
//     { label: "Total leads", value: totalLeads },
//   ];

//   return (
//     <div>
//       <h1 className="font-display text-3xl font-bold">Dashboard</h1>
//       <p className="mt-1 text-sm text-muted">Welcome back.</p>

//       <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {cards.map((c) => (
//           <div
//             key={c.label}
//             className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
//           >
//             <p className="text-sm text-muted">{c.label}</p>
//             <p
//               className={`mt-2 font-display text-4xl font-bold ${
//                 c.accent ? "text-cyan-300" : ""
//               }`}
//             >
//               {c.value}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="mt-10 flex items-center justify-between">
//         <h2 className="font-display text-xl font-semibold">Recent leads</h2>
//         <Link href="/admin/leads" className="text-sm text-cyan-300 hover:underline">
//           View all
//         </Link>
//       </div>

//       <div className="mt-4 space-y-3">
//         {recent.length === 0 && (
//           <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-muted">
//             No leads yet. They will appear here when someone uses the contact form.
//           </p>
//         )}
//         {recent.map((l) => (
//           <Link
//             key={String(l._id)}
//             href="/admin/leads"
//             className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-cyan-400/30"
//           >
//             <div className="min-w-0">
//               <p className="truncate text-sm font-medium">{l.name}</p>
//               <p className="truncate text-xs text-muted">{l.message}</p>
//             </div>
//             <div className="flex shrink-0 flex-col items-end gap-1.5">
//               <span
//                 className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase ${badge[l.status]}`}
//               >
//                 {l.status}
//               </span>
//               <span className="text-[11px] text-muted">
//                 {new Date(l.createdAt).toLocaleDateString("en-IN", {
//                   day: "numeric",
//                   month: "short",
//                   timeZone: "Asia/Kolkata",
//                 })}
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }













import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Lead from "@/models/Lead";
import Project from "@/models/Project";
import { requirePageSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const badge = {
  new: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
  contacted: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  closed: "border-slate-400/30 bg-slate-400/10 text-slate-300",
};

export default async function AdminHome() {
  await requirePageSession();
  await connectDB();

  const [newLeads, totalLeads, liveProjects, totalProjects, recent] = await Promise.all([
    Lead.countDocuments({ status: "new" }),
    Lead.countDocuments(),
    Project.countDocuments({ published: true }),
    Project.countDocuments(),
    Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const cards = [
    { label: "New leads", value: newLeads, accent: true },
    { label: "Total leads", value: totalLeads },
    { label: "Projects live", value: `${liveProjects} / ${totalProjects}` },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Welcome back.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <p className="text-sm text-muted">{c.label}</p>
            <p
              className={`mt-2 font-display text-4xl font-bold ${
                c.accent ? "text-cyan-300" : ""
              }`}
            >
              {c.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Recent leads</h2>
        <Link href="/admin/leads" className="text-sm text-cyan-300 hover:underline">
          View all
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {recent.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-muted">
            No leads yet. They will appear here when someone uses the contact form.
          </p>
        )}
        {recent.map((l) => (
          <Link
            key={String(l._id)}
            href="/admin/leads"
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-cyan-400/30"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{l.name}</p>
              <p className="truncate text-xs text-muted">{l.message}</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span
                className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase ${badge[l.status]}`}
              >
                {l.status}
              </span>
              <span className="text-[11px] text-muted">
                {new Date(l.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  timeZone: "Asia/Kolkata",
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}