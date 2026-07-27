import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeControl } from "@/components/ui";
import { concepts } from "@/lib/concepts";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Shopify-Konzeptstudien von Trustway Digital für Marken aus Fashion, Beauty, Interior und Lifestyle.",
  alternates: { canonical: "/portfolio" },
};

function ArrowUpRight() { return <span aria-hidden="true">&#8599;</span>; }

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-nav"><div className="shell portfolio-nav-inner"><Link href="/" className="brand" aria-label="Trustway Digital Startseite"><span className="brand-mark">T</span><span>trustway</span></Link><div className="portfolio-nav-actions"><ThemeControl /><Link href="/project-request" className="nav-cta">Projekt anfragen <ArrowUpRight /></Link></div></div></header>
      <section className="portfolio-hero"><div className="shell"><p className="eyebrow">Ausgewählte Konzeptprojekte</p><h1>Digitale Produkte,<br /><span>klar gedacht.</span></h1><p>Unabhängige Konzeptstudien für Commerce, Websites, Automatisierung und interne Produkte. Sie zeigen mögliche Richtungen, keine Kundenarbeiten.</p></div></section>
      <section className="portfolio-projects"><div className="shell"><div className="portfolio-projects-heading"><p>Konzeptprojekte</p><p>{String(concepts.length).padStart(2, "0")} ausgewählt</p></div><div className="project-grid">{concepts.map((project) => <article className="project-card" key={project.slug}><div className="project-image"><Image src={project.image} alt={`${project.title} Konzeptprojekt`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="project-content"><div className="project-title-row"><div><p className="project-category">{project.category}</p><h2>{project.title}</h2></div><span className="project-status">Konzeptprojekt</span></div><p className="project-copy">{project.description}</p><div className="project-footer"><div className="technology-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><Link className="project-link" href={`/portfolio/${project.slug}`}>Details <ArrowUpRight /></Link></div></div></article>)}</div></div></section>
      <section className="portfolio-cta"><div className="shell"><p className="eyebrow">Dein Projekt</p><h2>Hier könnte<br />deine Idee stehen.</h2><Link href="/project-request" className="button button-primary">Kostenloses Erstgespräch <ArrowUpRight /></Link></div></section>
      <footer className="footer"><div className="shell footer-row"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><span>Built by Fawaz</span></div></footer>
    </main>
  );
}
