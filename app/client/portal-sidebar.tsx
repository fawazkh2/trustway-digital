import Link from "next/link";

const navItems = [
  { label: "Dashboard", icon: "▦", active: true },
  { label: "Dateien", icon: "□" },
  { label: "Nachrichten", icon: "◌" },
  { label: "Projektstatus", icon: "◔" },
];

type PortalSidebarProps = { mobileOpen: boolean; onNavigate: () => void };

export default function PortalSidebar({ mobileOpen, onNavigate }: PortalSidebarProps) {
  return (
    <aside className={mobileOpen ? "portal-sidebar portal-sidebar-open" : "portal-sidebar"}>
      <div className="portal-brand"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><span>Client Portal</span></div>
      <nav className="portal-nav" aria-label="Portal navigation">{navItems.map((item) => <a href={`#${item.label.toLowerCase().replace("ä", "a")}`} onClick={onNavigate} className={item.active ? "portal-nav-active" : ""} key={item.label}><i aria-hidden="true">{item.icon}</i>{item.label}</a>)}</nav>
      <div className="portal-sidebar-footer"><div className="portal-avatar">TW</div><div><strong>Trustway Digital</strong><span>Projektteam</span></div></div>
    </aside>
  );
}
