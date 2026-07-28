import Link from "next/link";
import { ThemeControl } from "@/components/ui";

const concepts = ["Atelier Noir", "Solenne", "Aura Skin", "Forma Living", "Morning Works", "Stride Studio", "Field Notes", "Casa Oro"];

function ArrowUpRight() { return <span aria-hidden="true">&#8599;</span>; }

export default function CaseStudiesContent() {
  return (
    <main className="case-page">
      <header className="case-nav"><div className="case-shell case-nav-inner"><Link href="/" className="brand" aria-label="Trustway Digital Startseite"><span className="brand-mark">T</span><span>trustway</span></Link><div className="case-nav-actions"><Link href="/portfolio">Portfolio</Link><ThemeControl /><Link href="/project-request" className="nav-cta">Projekt anfragen <ArrowUpRight /></Link></div></div></header>
      <section className="case-hero"><div className="case-hero-glow" aria-hidden="true" /><div className="case-shell"><p className="eyebrow">Shopify Concepts</p><p className="case-category">E-Commerce Design Studies</p><h1>Marken, die<br /><span>man spürt.</span></h1><p className="case-lead">Acht unabhängige Shopify-Konzeptstudien zeigen, wie eine klare Markenwelt, starke Produkte und ein einfacher Kaufprozess zusammenwirken können.</p><div className="case-meta"><span>Shopify</span><span>Concept Work</span><span>2026</span></div></div></section>
      <section className="case-summary"><div className="case-shell summary-grid"><p className="eyebrow">Der Ansatz</p><div><h2>Commerce mit<br />eigener Haltung.</h2><p>Jede Studie beginnt mit einer eigenen visuellen Richtung und übersetzt sie in ein konzentriertes Store-Erlebnis. So entstehen Konzepte, die Markenpositionierung und Conversion nicht getrennt denken.</p></div></div></section>
      <section className="case-details"><div className="case-shell details-grid"><div><p className="eyebrow">Bausteine</p><h2>Was einen guten<br />Store ausmacht.</h2><div className="case-tech-list"><span>Shopify</span><span>UX Design</span><span>Brand Direction</span><span>Product Storytelling</span></div></div><div><p className="eyebrow">Concepts</p><h2>Acht Richtungen<br />für Commerce.</h2><ul className="case-highlight-list">{concepts.map((concept, index) => <li key={concept}><span>{String(index + 1).padStart(2, "0")}</span>{concept}</li>)}</ul></div></div></section>
      <section className="case-result"><div className="case-shell result-grid"><p className="eyebrow">Dein Projekt</p><div><h2>Deine Marke<br />hat mehr vor.</h2><p>Du möchtest eine eigene Commerce-Welt entwickeln? Gemeinsam finden wir die Richtung, die zu deinem Produkt und deinen Kundinnen und Kunden passt.</p><Link href="/project-request" className="button button-primary">Projekt anfragen <ArrowUpRight /></Link></div></div></section>
      <footer className="footer"><div className="case-shell footer-row"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><a href="mailto:fawazkhairi234@gmail.com">fawazkhairi234@gmail.com</a><span>Built by Fawaz</span></div></footer>
    </main>
  );
}
