import type { Metadata } from "next";
import ClientPortal from "./client-portal";
import { requireUser } from "@/lib/auth/require-user";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Projektstatus, Dateien, Nachrichten und nächste Schritte im Trustway Digital Client Portal.",
  robots: { index: false, follow: false },
};

export default function ClientPage() {
  return <ProtectedClientPortal />;
}

async function ProtectedClientPortal() {
  const { role } = await requireUser(["admin", "client"]);
  return <ClientPortal role={role} />;
}
