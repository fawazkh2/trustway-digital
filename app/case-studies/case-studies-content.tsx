"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";

const technologies = ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "Prisma", "AI"];
const highlights = ["AI Scout", "Player Comparison", "Dashboard", "Club Pages", "Portfolio", "SEO", "Responsive Design"];
const timeline = ["Problem", "Planung", "Entwicklung", "Launch"];
const futureProjects = ["Shopify Store", "Business Website", "AI Automation", "Booking System"];

function ArrowUpRight() { return <span aria-hidden="true">&#8599;</span>; }

export default function CaseStudiesContent() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <main className="case-page">
      <header className="case-nav"><div className="case-shell case-nav-inner"><Link href="/" className="brand" aria-label="Trustway Digital Startseite"><span className="brand-mark">T</span><span>trustway</span></Link><div className="case-nav-actions"><Link href="/portfolio">Portfolio</Link><ThemeToggle darkMode={darkMode} onToggle={toggleTheme} /><Link href="/project-request" className="nav-cta">Projekt anfragen <ArrowUpRight /></Link></div></div></header>
      <section className="case-hero"><div className="case-hero-glow" aria-hidden="true" /><div className="case-shell"><p className="eyebrow">Case Study 01</p><p className="case-category">KI + Fußballplattform</p><h1>TransferIQ<span>.</span></h1><p className="case-lead">Eine intelligente Plattform für Scouting, Spielervergleiche und fundiertere Transferentscheidungen.</p><div className="case-meta"><span>Digital Product</span><span>2026</span><span>In Entwicklung</span></div></div></section>
      <section className="case-cover"><div className="case-shell"><div className="case-image"><Image src="/portfolio-transferiq.svg" alt="Abstrakte Vorschau der TransferIQ Plattform" fill priority sizes="(max-width: 1100px) 100vw, 1020px" /></div></div></section>
      <section className="case-summary"><div className="case-shell summary-grid"><p className="eyebrow">Der Überblick</p><div><h2>Ein System, das<br />Spieler sichtbar macht.</h2><p>TransferIQ bringt Daten, Beobachtungen und Vergleichswerte an einem Ort zusammen. So wird aus komplexen Informationen eine klare Grundlage für bessere Entscheidungen im Fußball.</p></div></div></section>
      <section className="case-story"><div className="case-shell"><article className="story-row"><div className="story-label"><span>01</span><h2>Problem</h2></div><div className="story-copy"><h3>Scouting-Informationen sind oft verteilt, schwer vergleichbar und nicht sofort nutzbar.</h3><p>Die Herausforderung war eine Plattform, die relevante Spielerinformationen strukturiert zusammenführt und sie für Scouts, Clubs und Analysten intuitiv zugänglich macht. Statt isolierter Datenpunkte sollte eine klare, schnelle Entscheidungsgrundlage entstehen.</p></div></article><article className="story-row"><div className="story-label"><span>02</span><h2>Lösung</h2></div><div className="story-copy"><h3>Eine fokussierte Webplattform mit KI als praktischem Werkzeug.</h3><p>TransferIQ wurde als moderne, responsive Anwendung konzipiert. Das Produkt verbindet klare Informationsarchitektur mit einem skalierbaren technischen Fundament - von Spielerprofilen und Club-Seiten bis zu Vergleichsansichten und datenbasierten Analysen.</p></div></article></div></section>
      <section className="case-timeline-section"><div className="case-shell"><div className="section-heading"><div><p className="eyebrow">Der Prozess</p><h2>Von der Frage<br />zum Launch.</h2></div><p className="section-aside">Eine gute Lösung entsteht nicht zufällig. Jeder Schritt schafft Klarheit für den nächsten.</p></div><ol className="case-timeline">{timeline.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true">{index < timeline.length - 1 ? "↓" : "✓"}</i><strong>{item}</strong><p>{index === 0 ? "Ziel und Nutzerbedarf verstehen" : index === 1 ? "Struktur, Funktionen und Prioritäten festlegen" : index === 2 ? "Produkt iterativ entwickeln und testen" : "Polieren, optimieren und bereitstellen"}</p></li>)}</ol></div></section>
      <section className="case-details"><div className="case-shell details-grid"><div><p className="eyebrow">Technologien</p><h2>Ein Stack für<br />Geschwindigkeit.</h2><div className="case-tech-list">{technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div><div><p className="eyebrow">Highlights</p><h2>Was TransferIQ<br />besonders macht.</h2><ul className="case-highlight-list">{highlights.map((highlight, index) => <li key={highlight}><span>{String(index + 1).padStart(2, "0")}</span>{highlight}</li>)}</ul></div></div></section>
      <section className="case-result"><div className="case-shell result-grid"><p className="eyebrow">Ergebnis</p><div><h2>Komplexität, die sich<br />einfach anfühlt.</h2><p>TransferIQ schafft die Grundlage für ein digitales Scouting-Erlebnis, das professionell aussieht, schnell funktioniert und mit den Anforderungen des Produkts wachsen kann.</p><Link href="/project-request" className="button button-primary">Ähnliches Projekt anfragen <ArrowUpRight /></Link></div></div></section>
      <section className="case-future"><div className="case-shell"><p className="eyebrow">Weitere Case Studies</p><h2>Die nächste<br />Geschichte beginnt hier.</h2><div className="future-grid">{futureProjects.map((project, index) => <article key={project}><span>{String(index + 2).padStart(2, "0")}</span><h3>{project}</h3><p>Case Study in Vorbereitung</p><i aria-hidden="true">&#8599;</i></article>)}</div></div></section>
      <footer className="footer"><div className="case-shell footer-row"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><span>Built by Fawaz</span></div></footer>
    </main>
  );
}
