"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeControl } from "@/components/ui";

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <header className="site-header"><div className="shell nav-wrap"><a href="#home" className="brand" onClick={closeMenu} aria-label="Trustway Digital Startseite"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>trustway</span></a><nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Hauptnavigation"><a href="#home" className="nav-active" onClick={closeMenu}>Home</a><a href="#services" onClick={closeMenu}>Leistungen</a><Link href="/portfolio" onClick={closeMenu}>Portfolio</Link><a href="#about" onClick={closeMenu}>Über mich</a><a href="#contact" onClick={closeMenu}>Kontakt</a></nav><div className="nav-actions"><ThemeControl /><Link href="/project-request" className="nav-cta">Projekt besprechen <span aria-hidden="true">↗</span></Link><button type="button" className="menu-button" onClick={() => setMenuOpen((current) => !current)} aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"} aria-expanded={menuOpen}><span /><span /></button></div></div>{menuOpen && <button type="button" className="nav-backdrop" aria-label="Menü schließen" onClick={closeMenu} />}</header>;
}
