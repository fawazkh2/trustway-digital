import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeControl } from "@/components/ui";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Shopify-Konzeptstudien von Trustway Digital für Marken aus Fashion, Beauty, Interior und Lifestyle.",
  alternates: { canonical: "/portfolio" },
};

const projects = [
  {
    title: "Atelier Noir", category: "Fashion", description: "Ein reduzierter Fashion Store, der Editorial-Ästhetik mit klarer Conversion verbindet.", image: "/shopify-concepts/atelier-noir.svg", imageAlt: "Atelier Noir Shopify Concept", technologies: ["Shopify", "UX Design", "Editorial"],
  },
  {
    title: "Solenne", category: "Jewelry", description: "Eine hochwertige Schmuckwelt mit ruhigem Luxus und fokussierter Produktinszenierung.", image: "/shopify-concepts/solenne.svg", imageAlt: "Solenne Shopify Concept", technologies: ["Shopify", "Art Direction", "Luxury"],
  },
  {
    title: "Aura Skin", category: "Beauty", description: "Ein klarer Beauty Store für ruhige Routinen, bewusste Inhaltsstoffe und wiederkehrende Käufe.", image: "/shopify-concepts/aura-skin.svg", imageAlt: "Aura Skin Shopify Concept", technologies: ["Shopify", "Brand Design", "DTC"],
  },
  {
    title: "Forma Living", category: "Furniture", description: "Ein Interior Concept, das Möbel mit räumlicher Klarheit und warmer Materialität zeigt.", image: "/shopify-concepts/forma-living.svg", imageAlt: "Forma Living Shopify Concept", technologies: ["Shopify", "Interior", "UX Design"],
  },
  {
    title: "Morning Works", category: "Coffee", description: "Eine einladende Coffee Brand für Subscriptions, Herkunft und langsamere Morgen.", image: "/shopify-concepts/morning-works.svg", imageAlt: "Morning Works Shopify Concept", technologies: ["Shopify", "Subscription", "Branding"],
  },
  {
    title: "Stride Studio", category: "Sport", description: "Ein Performance Store für technische Essentials und einen klaren Weg zum nächsten Lauf.", image: "/shopify-concepts/stride-studio.svg", imageAlt: "Stride Studio Shopify Concept", technologies: ["Shopify", "Performance", "DTC"],
  },
  {
    title: "Field Notes", category: "Home goods", description: "Ein zurückhaltender Store für Objekte, die den Alltag bewusster begleiten.", image: "/shopify-concepts/field-notes.svg", imageAlt: "Field Notes Shopify Concept", technologies: ["Shopify", "Lifestyle", "Art Direction"],
  },
  {
    title: "Casa Oro", category: "Tableware", description: "Eine warme Tableware-Welt für Gastgeber, Rituale und großzügige Momente.", image: "/shopify-concepts/casa-oro.svg", imageAlt: "Casa Oro Shopify Concept", technologies: ["Shopify", "Homeware", "Storytelling"],
  },
];

function ArrowUpRight() { return <span aria-hidden="true">&#8599;</span>; }

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-nav"><div className="shell portfolio-nav-inner"><Link href="/" className="brand" aria-label="Trustway Digital Startseite"><span className="brand-mark">T</span><span>trustway</span></Link><div className="portfolio-nav-actions"><ThemeControl /><Link href="/project-request" className="nav-cta">Projekt anfragen <ArrowUpRight /></Link></div></div></header>
      <section className="portfolio-hero"><div className="shell"><p className="eyebrow">Shopify Concepts</p><h1>Commerce-Welten,<br /><span>die im Kopf bleiben.</span></h1><p>Unabhängige Konzeptstudien für Marken aus Fashion, Beauty, Interior und Lifestyle. Jede Arbeit zeigt eine mögliche Richtung für einen hochwertigen Shopify Store.</p></div></section>
      <section className="portfolio-projects"><div className="shell"><div className="portfolio-projects-heading"><p>Shopify Concepts</p><p>08 ausgewählt</p></div><div className="project-grid">{projects.map((project) => <article className="project-card" key={project.title}><div className="project-image"><Image src={project.image} alt={project.imageAlt} fill unoptimized loading="eager" sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="project-content"><div className="project-title-row"><div><p className="project-category">{project.category}</p><h2>{project.title}</h2></div><span className="project-status">Shopify Concept</span></div><p className="project-copy">{project.description}</p><div className="project-footer"><div className="technology-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><Link className="project-link" href="/case-studies">Case Study <ArrowUpRight /></Link></div></div></article>)}</div></div></section>
      <section className="portfolio-cta"><div className="shell"><p className="eyebrow">Dein Projekt</p><h2>Hier könnte<br />deine Idee stehen.</h2><Link href="/project-request" className="button button-primary">Kostenloses Erstgespräch <ArrowUpRight /></Link></div></section>
      <footer className="footer"><div className="shell footer-row"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><span>Built by Fawaz</span></div></footer>
    </main>
  );
}
