import { requirePageSession } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  const session = await requirePageSession();

  return (
    <div data-lenis-prevent className="fixed inset-0 z-[100] overflow-y-auto bg-bg">
      <AdminNav email={session.sub} />
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}