import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeControl } from "@/components/ui";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Ausgewählte digitale Projekte von Trustway Digital: KI-Plattformen, Shopify-Stores, Business-Websites und Automatisierungen.",
  alternates: { canonical: "/portfolio" },
};

const projects = [
  {
    title: "TransferIQ",
    category: "KI + Fußball + Webplattform",
    description: "TransferIQ ist eine moderne Fußballplattform mit KI-gestütztem Scouting, Spielervergleichen und Transferanalysen.",
    image: "/portfolio-transferiq.svg",
    imageAlt: "Abstrakte Vorschau der TransferIQ KI-Plattform",
    technologies: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
    status: "In Entwicklung",
    href: "/#contact",
    featured: true,
  },
  {
    title: "Shopify Store",
    category: "E-Commerce",
    description: "Platz für einen individuellen Shop, der Produkte klar inszeniert und den Kaufprozess einfach macht.",
    image: "/portfolio-shopify.svg",
    imageAlt: "Abstrakte Vorschau eines Shopify Stores",
    technologies: ["Shopify", "Liquid", "JavaScript"],
    status: "Demnächst",
    href: "/#contact",
  },
  {
    title: "Business Website",
    category: "Corporate Website",
    description: "Platz für eine fokussierte Unternehmenswebsite mit klarer Botschaft und starker digitaler Präsenz.",
    image: "/portfolio-business.svg",
    imageAlt: "Abstrakte Vorschau einer Business Website",
    technologies: ["Next.js", "TypeScript", "TailwindCSS"],
    status: "Demnächst",
    href: "/#contact",
  },
  {
    title: "AI Automation",
    category: "Intelligente Workflows",
    description: "Platz für eine Automatisierung, die Teams wiederkehrende Arbeit abnimmt und Prozesse verbindet.",
    image: "/portfolio-automation.svg",
    imageAlt: "Abstrakte Vorschau einer KI-Automatisierung",
    technologies: ["OpenAI", "API", "Automation"],
    status: "Demnächst",
    href: "/#contact",
  },
  {
    title: "Booking System",
    category: "Digitale Terminbuchung",
    description: "Platz für ein intuitives Buchungssystem, das Termine zuverlässig organisiert und Anfragen reduziert.",
    image: "/portfolio-booking.svg",
    imageAlt: "Abstrakte Vorschau eines Buchungssystems",
    technologies: ["Next.js", "Supabase", "TailwindCSS"],
    status: "Demnächst",
    href: "/#contact",
  },
];

function ArrowUpRight() { return <span aria-hidden="true">&#8599;</span>; }

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-nav"><div className="shell portfolio-nav-inner"><Link href="/" className="brand" aria-label="Trustway Digital Startseite"><span className="brand-mark">T</span><span>trustway</span></Link><div className="portfolio-nav-actions"><ThemeControl /><Link href="/project-request" className="nav-cta">Projekt anfragen <ArrowUpRight /></Link></div></div></header>
      <section className="portfolio-hero"><div className="shell"><p className="eyebrow">Ausgewählte Projekte</p><h1>Digitale Produkte,<br /><span>die etwas bewegen.</span></h1><p>Von KI-Plattformen bis zu durchdachten Commerce-Erlebnissen: Hier entsteht Platz für Arbeit, die klar aussieht und echten Nutzen schafft.</p></div></section>
      <section className="portfolio-projects"><div className="shell"><div className="portfolio-projects-heading"><p>Projekte</p><p>05 ausgewählt</p></div><div className="project-grid">{projects.map((project) => <article className={project.featured ? "project-card project-featured" : "project-card"} key={project.title}><div className="project-image"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="project-content"><div className="project-title-row"><div><p className="project-category">{project.category}</p><h2>{project.title}</h2></div><span className={project.status === "In Entwicklung" ? "project-status status-live" : "project-status"}>{project.status}</span></div><p className="project-copy">{project.description}</p><div className="project-footer"><div className="technology-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><Link className="project-link" href={project.href}>{project.status === "In Entwicklung" ? "Details anfragen" : "Projekt vormerken"} <ArrowUpRight /></Link></div></div></article>)}</div></div></section>
      <section className="portfolio-cta"><div className="shell"><p className="eyebrow">Dein Projekt</p><h2>Hier könnte<br />deine Idee stehen.</h2><Link href="/project-request" className="button button-primary">Kostenloses Erstgespräch <ArrowUpRight /></Link></div></section>
      <footer className="footer"><div className="shell footer-row"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><span>Built by Fawaz</span></div></footer>
    </main>
  );
}
