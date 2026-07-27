import Link from "next/link";
import Image from "next/image";
import { HomeContactForm } from "./home-contact-form";
import { HomeFaq } from "./home-faq";
import { HomeHeader } from "./home-header";

const services = [
  { number: "01", title: "Shopify Development", text: "Individuelle Shops, die Produkte klar zeigen und Kunden selbstverständlich zum Kauf führen." },
  { number: "02", title: "Website Development", text: "Schnelle Websites, die Vertrauen schaffen, Positionierung schärfen und Anfragen auslösen." },
  { number: "03", title: "AI Automation", text: "Smarte Workflows, die wiederkehrende Arbeit abnehmen und dir spürbar Zeit zurückgeben." },
  { number: "04", title: "Booking Systems", text: "Buchungserlebnisse, die sich für dein Team ebenso einfach anfühlen wie für deine Kunden." },
];
const steps = [
  { number: "01", title: "Anfrage", text: "Du erklärst, wo du heute stehst und wohin du willst.", icon: "✦" },
  { number: "02", title: "Planung", text: "Wir machen aus der Idee einen klaren, realistischen Fahrplan.", icon: "⌘" },
  { number: "03", title: "Entwicklung", text: "Du bekommst sichtbaren Fortschritt statt stiller Übergaben.", icon: "◌" },
  { number: "04", title: "Fertigstellung", text: "Nach Feinschliff und Qualitätssicherung geht dein Projekt live.", icon: "↗" },
];
const reasons = [
  { number: "01", title: "Direkter Kontakt", text: "Du arbeitest mit mir, nicht mit einer Kette aus Projektmanagern und Übergaben." },
  { number: "02", title: "Klare Entscheidungen", text: "Ich halte Komplexität klein, erkläre Optionen verständlich und priorisiere das, was Wirkung hat." },
  { number: "03", title: "Sorgfältig gebaut", text: "Design, Geschwindigkeit und Wartbarkeit gehören für mich zum selben Qualitätsanspruch." },
];
const faqs = [
  { question: "Wie lange dauert ein Projekt?", answer: "Das hängt vom Umfang ab. Eine fokussierte Website ist oft innerhalb von zwei bis vier Wochen fertig. Nach unserem Erstgespräch erhältst du eine realistische Einschätzung." },
  { question: "Was kostet eine Website?", answer: "Jedes Projekt wird individuell kalkuliert. Im kostenlosen Erstgespräch klären wir Ziele und Umfang, damit du ein transparentes, passendes Angebot bekommst." },
  { question: "Kann ich später Änderungen machen?", answer: "Ja. Deine Website wird so geplant, dass Inhalte einfach gepflegt werden können. Auf Wunsch unterstütze ich dich auch nach dem Launch bei Änderungen." },
  { question: "Erstellst du auch Shopify-Shops?", answer: "Ja. Ich entwickle Shopify-Shops vom ersten Konzept über das Design bis zum fertigen, optimierten Store." },
  { question: "Bietest du Support an?", answer: "Ja. Auch nach der Fertigstellung bin ich für Optimierungen, Erweiterungen und technische Fragen da." },
];
const shopifyConcepts = [
  { name: "Atelier Noir", category: "Fashion", image: "/shopify-concepts/atelier-noir.svg" },
  { name: "Solenne", category: "Jewelry", image: "/shopify-concepts/solenne.svg" },
  { name: "Aura Skin", category: "Beauty", image: "/shopify-concepts/aura-skin.svg" },
  { name: "Forma Living", category: "Furniture", image: "/shopify-concepts/forma-living.svg" },
  { name: "Morning Works", category: "Coffee", image: "/shopify-concepts/morning-works.svg" },
  { name: "Stride Studio", category: "Sport", image: "/shopify-concepts/stride-studio.svg" },
  { name: "Field Notes", category: "Home goods", image: "/shopify-concepts/field-notes.svg" },
  { name: "Casa Oro", category: "Tableware", image: "/shopify-concepts/casa-oro.svg" },
];

export default function Home() {
  return <main className="home-page"><HomeHeader />
    <section id="home" className="hero"><div className="hero-grid" aria-hidden="true" /><div className="hero-glow hero-glow-one" aria-hidden="true" /><div className="hero-glow hero-glow-two" aria-hidden="true" /><div className="shell hero-content"><p className="eyebrow fade-up">Independent digital studio · Bielefeld &amp; remote</p><h1 className="hero-title fade-up">Digital, das sich<br /><span>nach dir anfühlt.</span></h1><div className="hero-bottom fade-up"><p>Websites, Shopify Stores und KI-Automationen, die dein Unternehmen klarer präsentieren, einfacher machen und bereit für den nächsten Schritt sind.</p><div className="button-row"><Link href="/project-request" className="button button-primary">Kostenloses Erstgespräch <span aria-hidden="true">↗</span></Link><Link href="/portfolio" className="button button-secondary">Ausgewählte Arbeit <span aria-hidden="true">↓</span></Link></div></div></div><div className="shell hero-caption"><span>Direkt. Durchdacht. Persönlich.</span><span>Für Unternehmen, die weiter wollen.</span></div></section>
    <section id="services" className="section services-section"><div className="shell"><div className="section-intro"><p className="eyebrow">Leistungen</p><h2>Was heute gut<br />funktioniert, wächst mit.</h2><p>Keine Standardpakete. Wir bauen den digitalen Teil deines Unternehmens so, dass er Menschen überzeugt und im Alltag wirklich hilft.</p></div><div className="services-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><a href="#contact" className="circle-link" aria-label={`Mehr über ${service.title} erfahren`}><span aria-hidden="true">↗</span></a></article>)}</div></div></section>
    <section id="process" className="section process-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Zusammenarbeit</p><h2>Wenig Reibung.<br />Viel Klarheit.</h2></div><p className="section-aside">Ein fokussierter Prozess, damit gute Entscheidungen schnell entstehen und dein Projekt nicht im Alltag untergeht.</p></div><div className="process-grid">{steps.map((step) => <article className="process-card" key={step.number}><div className="process-card-top"><span>{step.number}</span><i aria-hidden="true">{step.icon}</i></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>
    <section id="portfolio" className="section portfolio-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Shopify Concepts</p><h2>Stores, die man<br />gern entdecken will.</h2></div><p className="portfolio-note">Unabhängige Konzeptstudien für Marken mit Anspruch.</p></div><div className="shopify-concept-grid">{shopifyConcepts.map((concept) => <article className="shopify-concept-card" key={concept.name}><div className="shopify-concept-preview"><Image src={concept.image} alt="" fill unoptimized sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="shopify-concept-meta"><div><p>{concept.category}</p><h3>{concept.name}</h3><span>Shopify Concept</span></div><Link href="/portfolio" className="shopify-concept-link">Case Study <span aria-hidden="true">↗</span></Link></div></article>)}</div></div></section>
    <section className="section trust-section"><div className="shell"><div className="trust-intro"><p className="eyebrow">Warum Trustway Digital</p><h2>Gute digitale Arbeit<br />braucht kein Theater.</h2><p>Sie braucht einen Partner, der zuhört, Verantwortung übernimmt und mit dir eine Lösung baut, die im echten Alltag besteht.</p></div><div className="trust-grid">{reasons.map((reason) => <article key={reason.number}><span>{reason.number}</span><h3>{reason.title}</h3><p>{reason.text}</p></article>)}</div></div></section>
    <section id="about" className="section about-section"><div className="shell about-grid"><p className="eyebrow">Über mich</p><div><h2>Hallo, ich bin<br />Fawaz.</h2><p className="about-copy">Ich habe Trustway Digital gegründet, weil gute digitale Arbeit persönlicher sein sollte. Bei mir gibt es keinen Pitch, der später an ein unbekanntes Team übergeben wird. Ich denke mit, baue selbst und bleibe bis zum Launch an deiner Seite.</p><a href="#contact" className="text-link">Lass uns kennenlernen <span aria-hidden="true">↗</span></a></div><div className="founder-note"><span>F</span><p>„Am Ende soll sich dein digitales Produkt nicht nach Technik anfühlen, sondern nach einem guten nächsten Schritt.“</p></div></div></section>
    <HomeFaq faqs={faqs} />
    <section id="contact" className="contact-section"><div className="shell"><div className="contact-grid"><div><p className="eyebrow">Kostenloses Erstgespräch</p><h2>Eine gute Idee<br />verdient einen<br />starken Anfang.</h2><div className="contact-options"><a href="https://wa.me/491717387150" target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a><a href="mailto:hello@trustway.digital">E-Mail <span aria-hidden="true">↗</span></a></div></div><HomeContactForm /></div></div></section>
    <footer className="footer"><div className="shell footer-row"><a href="#home" className="brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>trustway</span></a><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><span>Built by Fawaz</span></div></footer>
  </main>;
}
