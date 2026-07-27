"use client";

import { useState } from "react";

type Faq = { question: string; answer: string };

export function HomeFaq({ faqs }: { faqs: Faq[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <section id="faq" className="section faq-section"><div className="shell faq-grid"><div><p className="eyebrow">Häufige Fragen</p><h2>Gut zu<br />wissen.</h2><p className="faq-intro">Noch etwas offen? Im kostenlosen Erstgespräch klären wir alles persönlich.</p></div><div className="faq-list">{faqs.map((faq, index) => { const isOpen = openFaq === index; return <article className="faq-item" key={faq.question}><button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}><span>{faq.question}</span><i aria-hidden="true">{isOpen ? "−" : "+"}</i></button><div className={isOpen ? "faq-answer faq-open" : "faq-answer"}><p>{faq.answer}</p></div></article>; })}</div></div></section>;
}
