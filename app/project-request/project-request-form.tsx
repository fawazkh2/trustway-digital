"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";

const projectTypes = ["Website", "Shopify", "AI Automation", "Booking System", "Sonstiges"];
const budgets = ["unter 500 €", "500-1000 €", "1000-3000 €", "über 3000 €"];
const timelines = ["so schnell wie möglich", "innerhalb 2 Wochen", "innerhalb 1 Monat", "flexibel"];

function ArrowUpRight() { return <span aria-hidden="true">&#8599;</span>; }

export default function ProjectRequestForm() {
  const { darkMode, toggleTheme } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => { if (submitted) successHeadingRef.current?.focus(); }, [submitted]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/inquiries/project-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.get("name"), company: form.get("company"), email: form.get("email"), phone: form.get("phone"), projectType: form.get("projectType"), budget: form.get("budget"), timeline: form.get("timeline"), description: form.get("description"), privacy: form.get("privacy") === "on", website: form.get("website") }) });
      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Die Anfrage konnte nicht gespeichert werden. Bitte versuche es erneut oder schreibe mir per WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="request-page">
        <header className="request-nav"><div className="request-shell request-nav-inner"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><ThemeToggle darkMode={darkMode} onToggle={toggleTheme} /></div></header>
        <section className="request-success"><div className="success-orb" aria-hidden="true" /><div className="request-shell success-content"><p className="eyebrow">Anfrage erhalten</p><span className="success-check" aria-hidden="true">✓</span><h1 ref={successHeadingRef} tabIndex={-1}>Danke für deine<br />Anfrage.</h1><p>Ich schaue mir dein Projekt persönlich an und melde mich innerhalb eines Werktages bei dir.</p><div className="request-actions"><Link href="/" className="button button-primary">Zur Startseite <ArrowUpRight /></Link><a href="https://wa.me/491717387150" target="_blank" rel="noreferrer" className="button button-secondary">Direkt bei WhatsApp schreiben</a></div></div></section>
      </main>
    );
  }

  return (
    <main className="request-page">
      <header className="request-nav"><div className="request-shell request-nav-inner"><Link href="/" className="brand" aria-label="Trustway Digital Startseite"><span className="brand-mark">T</span><span>trustway</span></Link><div className="request-nav-actions"><span>Projektanfrage</span><ThemeToggle darkMode={darkMode} onToggle={toggleTheme} /></div></div></header>
      <section className="request-hero"><div className="request-shell"><p className="eyebrow">Projektanfrage</p><h1>Erzähl mir von<br /><span>deinem Projekt.</span></h1><p>In ungefähr drei Minuten hast du alle wichtigen Informationen übermittelt. Ich melde mich mit einem klaren nächsten Schritt bei dir.</p><div className="request-trust"><span>✓ Kostenlos &amp; unverbindlich</span><span>✓ Antwort innerhalb eines Werktages</span></div></div></section>
      <section className="request-form-section"><div className="request-shell request-layout"><aside className="request-sidebar"><p>In 3 Minuten zur Anfrage</p><ol><li className="active"><span>01</span> Persönliche Daten</li><li><span>02</span> Dein Projekt</li><li><span>03</span> Budget &amp; Zeit</li><li><span>04</span> Details senden</li></ol><div><strong>Fragen vorab?</strong><a href="https://wa.me/491717387150" target="_blank" rel="noreferrer">WhatsApp schreiben <ArrowUpRight /></a></div></aside>
        <form className="request-form" onSubmit={handleSubmit} noValidate><label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <fieldset><legend><span>01</span> Persönliche Daten</legend><div className="form-grid"><label>Name <em>*</em><input name="name" autoComplete="name" required placeholder="Dein Vor- und Nachname" /></label><label>Firma <small>optional</small><input name="company" autoComplete="organization" placeholder="Name deines Unternehmens" /></label><label>E-Mail <em>*</em><input name="email" type="email" autoComplete="email" required placeholder="name@unternehmen.de" /></label><label>Telefon / WhatsApp <em>*</em><input name="phone" type="tel" autoComplete="tel" required placeholder="+49 ..." /></label></div></fieldset>
          <fieldset><legend><span>02</span> Was möchtest du umsetzen?</legend><div className="choice-grid">{projectTypes.map((type) => <label className="choice-card" key={type}><input name="projectType" type="radio" value={type} required /><span>{type}</span><i aria-hidden="true">+</i></label>)}</div></fieldset>
          <fieldset><legend><span>03</span> Budget &amp; Zeitrahmen</legend><div className="form-choice-section"><div><p>Welcher Budgetrahmen passt für dein Projekt? <em>*</em></p><div className="choice-grid compact">{budgets.map((budget) => <label className="choice-card" key={budget}><input name="budget" type="radio" value={budget} required /><span>{budget}</span></label>)}</div></div><div><p>Wann soll es losgehen? <em>*</em></p><div className="choice-grid compact">{timelines.map((timeline) => <label className="choice-card" key={timeline}><input name="timeline" type="radio" value={timeline} required /><span>{timeline}</span></label>)}</div></div></div></fieldset>
          <fieldset><legend><span>04</span> Erzähl mir mehr</legend><label className="full-field">Beschreibe dein Projekt <em>*</em><textarea name="description" required minLength={20} rows={7} placeholder="Was möchtest du erreichen? Gibt es bereits eine Website oder besondere Anforderungen?" /></label></fieldset>
          <label className="privacy-check"><input name="privacy" type="checkbox" required /><span>Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. <em>*</em></span></label>
          {error && <p className="request-error" role="alert">{error}</p>}<button type="submit" className="request-submit" disabled={submitting}>{submitting ? "Wird gesendet..." : "Projekt anfragen"} <ArrowUpRight /></button><p className="required-note"><em>*</em> Pflichtfelder</p>
        </form>
      </div></section>
      <footer className="footer"><div className="request-shell footer-row"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><span>Built by Fawaz</span></div></footer>
    </main>
  );
}
