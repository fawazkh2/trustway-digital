import Link from "next/link";
import Image from "next/image";
import { concepts } from "@/lib/concepts";
import { HomeContactFormLoader } from "./home-contact-form-loader";
import { HomeFaq } from "./home-faq";
import { HomeHeader } from "./home-header";

const services = [
  { number: "01", title: "Website Entwicklung", text: "Schnelle, professionelle Websites für Unternehmen." },
  { number: "02", title: "Shopify Stores", text: "Shops, die Produkte klar zeigen und verkaufen." },
  { number: "03", title: "KI-Automationen", text: "Weniger Routine. Mehr Zeit für dein Unternehmen." },
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
  { question: "Was gehört zu einer professionellen Website?", answer: "Eine klare Positionierung, schnelle Ladezeiten, gute Inhalte, saubere technische Grundlagen und eine Nutzerführung, die Menschen ohne Umwege zum Ziel bringt." },
  { question: "Für wen eignet sich Shopify?", answer: "Shopify ist ideal für Marken, die Produkte klar verkaufen, Inhalte eigenständig pflegen und ihren Shop langfristig weiterentwickeln möchten." },
  { question: "Wie kann KI im Unternehmen helfen?", answer: "KI eignet sich besonders für wiederkehrende Aufgaben, die Struktur, Vorarbeit oder schnelle Zusammenfassungen brauchen. Gemeinsam prüfen wir, wo sie wirklich entlastet." },
  { question: "Wie läuft die Zusammenarbeit ab?", answer: "Wir starten mit einem klaren Gespräch, definieren Prioritäten und arbeiten in sichtbaren Etappen. Du weißt jederzeit, was gerade passiert und was als Nächstes ansteht." },
  { question: "Gibt es feste Preise?", answer: "Für wiederkehrende Leistungen gibt es klare Orientierungswerte. Den finalen Rahmen definieren wir nach Zielen, Umfang und notwendiger Tiefe gemeinsam." },
];
const expectations = ["Schnelle Kommunikation", "Sauberer Code", "Professionelles Design", "Klare Projektstruktur"];
const shopifyConcepts = concepts.slice(0, 8);

export default function Home() {
  return <main className="home-page"><HomeHeader />
    <section id="home" className="hero hero-direct"><div className="hero-grid" aria-hidden="true" /><div className="hero-glow hero-glow-one" aria-hidden="true" /><div className="hero-glow hero-glow-two" aria-hidden="true" /><div className="shell hero-content"><p className="eyebrow fade-up">Bielefeld &amp; Remote</p><h1 className="hero-title fade-up">Websites, Shopify &amp; KI<br /><span>– alles aus einer Hand.</span></h1><div className="hero-bottom fade-up"><p>Wir entwickeln digitale Lösungen für Unternehmen.</p><div className="button-row"><Link href="/kontakt" className="button button-primary">Kostenloses Erstgespräch <span aria-hidden="true">↗</span></Link><Link href="/portfolio" className="button button-secondary">Portfolio ansehen <span aria-hidden="true">↓</span></Link></div><ul className="hero-benefits"><li><span aria-hidden="true">✓</span> Websites</li><li><span aria-hidden="true">✓</span> Shopify</li><li><span aria-hidden="true">✓</span> KI</li><li><span aria-hidden="true">✓</span> Bielefeld &amp; Remote</li></ul></div></div></section>
    <section id="services" className="section services-section"><div className="shell"><div className="services-direct-heading"><p className="eyebrow">Unsere Leistungen</p><h2>Was wir für<br />Unternehmen bauen.</h2></div><div className="services-direct-grid">{services.map((service) => <article className="service-direct-card" key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Mehr über ${service.title} erfahren`}><span aria-hidden="true">↗</span></a></article>)}</div></div></section>
    <section id="process" className="section process-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Zusammenarbeit</p><h2>Wenig Reibung.<br />Viel Klarheit.</h2></div><p className="section-aside">Ein fokussierter Prozess, damit gute Entscheidungen schnell entstehen und dein Projekt nicht im Alltag untergeht.</p></div><div className="process-grid">{steps.map((step) => <article className="process-card" key={step.number}><div className="process-card-top"><span>{step.number}</span><i aria-hidden="true">{step.icon}</i></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>
    <section id="portfolio" className="section portfolio-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Shopify Concepts</p><h2>Stores, die man<br />gern entdecken will.</h2></div><p className="portfolio-note">Unabhängige Konzeptstudien für Marken mit Anspruch.</p></div><div className="shopify-concept-grid">{shopifyConcepts.map((concept) => <article className="shopify-concept-card" key={concept.slug}><div className="shopify-concept-preview"><Image src={concept.image} alt={`${concept.title} Konzeptprojekt`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="shopify-concept-meta"><div><p>{concept.category.replace("Shopify · ", "")}</p><h3>{concept.title}</h3><span>Konzeptprojekt</span></div><Link href={`/portfolio/${concept.slug}`} className="shopify-concept-link">Details <span aria-hidden="true">↗</span></Link></div></article>)}</div></div></section>
    <section className="section trust-section"><div className="shell"><div className="trust-intro"><p className="eyebrow">Warum Trustway Digital</p><h2>Gute digitale Arbeit<br />braucht kein Theater.</h2><p>Sie braucht einen Partner, der zuhört, Verantwortung übernimmt und mit dir eine Lösung baut, die im echten Alltag besteht.</p></div><div className="trust-grid">{reasons.map((reason) => <article key={reason.number}><span>{reason.number}</span><h3>{reason.title}</h3><p>{reason.text}</p></article>)}</div></div></section>
    <section className="section expectations-section"><div className="shell"><div className="section-heading"><div><p className="eyebrow">Was Kunden erwarten können</p><h2>Klarheit in jedem<br />Projektmoment.</h2></div><p className="section-aside">Keine Versprechen um ihrer selbst willen. Sondern ein Arbeitsstil, der Projekte ruhig, nachvollziehbar und hochwertig macht.</p></div><div className="expectations-grid">{expectations.map((expectation, index) => <article key={expectation}><span>{String(index + 1).padStart(2, "0")}</span><h3>{expectation}</h3><p>{index === 0 ? "Direkte Antworten und verlässliche Abstimmung." : index === 1 ? "Durchdachte Umsetzung, die langfristig wartbar bleibt." : index === 2 ? "Gestaltung mit Haltung, nicht mit Dekoration." : "Klare Schritte, sichtbarer Fortschritt und saubere Übergaben."}</p></article>)}</div></div></section>
    <section id="about" className="section about-section"><div className="shell about-grid"><p className="eyebrow">Über mich</p><div><h2>Hallo, ich bin<br />Fawaz.</h2><p className="about-copy">Ich habe Trustway Digital gegründet, weil gute digitale Arbeit persönlicher sein sollte. Bei mir gibt es keinen Pitch, der später an ein unbekanntes Team übergeben wird. Ich denke mit, baue selbst und bleibe bis zum Launch an deiner Seite.</p><a href="#contact" className="text-link">Lass uns kennenlernen <span aria-hidden="true">↗</span></a></div><div className="founder-note"><span>F</span><p>„Am Ende soll sich dein digitales Produkt nicht nach Technik anfühlen, sondern nach einem guten nächsten Schritt.“</p></div></div></section>
    <HomeFaq faqs={faqs} />
    <section id="contact" className="contact-section"><div className="shell"><div className="contact-grid"><div><p className="eyebrow">Kostenloses Erstgespräch</p><h2>Eine gute Idee<br />verdient einen<br />starken Anfang.</h2><div className="contact-options"><a href="https://wa.me/491717387150" target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a><a href="mailto:fawazkhairi234@gmail.com">E-Mail <span aria-hidden="true">↗</span></a></div></div><HomeContactFormLoader /></div></div></section>
    <footer className="footer"><div className="shell footer-row"><a href="#home" className="brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>trustway</span></a><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><a href="mailto:fawazkhairi234@gmail.com">fawazkhairi234@gmail.com</a><span>Built by Fawaz</span></div></footer>
  </main>;
}
