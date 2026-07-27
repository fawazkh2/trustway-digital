"use client";

import { useState } from "react";
import PortalDashboard from "./portal-dashboard";
import PortalSidebar from "./portal-sidebar";
import { signOut } from "@/app/auth/actions";
import type { AppRole } from "@/lib/auth/roles";
import { ThemeToggle } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";

export default function ClientPortal({ role }: { role: AppRole }) {
  const { darkMode, toggleTheme } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <main className="portal-page">
      <PortalSidebar mobileOpen={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />
      {mobileNavOpen && <button type="button" className="portal-nav-backdrop" aria-label="Navigation schließen" onClick={() => setMobileNavOpen(false)} />}
      <div className="portal-main">
        <header className="portal-header"><div><p>Client Portal · {role}</p><strong>Dein Projekt</strong></div><div className="portal-header-actions"><ThemeToggle darkMode={darkMode} onToggle={toggleTheme} /><form action={signOut}><button type="submit" className="portal-signout">Abmelden</button></form><button type="button" className="portal-menu-button" onClick={() => setMobileNavOpen((current) => !current)} aria-label={mobileNavOpen ? "Navigation schließen" : "Navigation öffnen"} aria-expanded={mobileNavOpen}><span /><span /></button></div></header>
        <PortalDashboard />
      </div>
    </main>
  );
}
