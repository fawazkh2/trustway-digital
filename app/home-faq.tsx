type Faq = { question: string; answer: string };

export function HomeFaq({ faqs }: { faqs: Faq[] }) {
  return <section id="faq" className="section faq-section"><div className="shell faq-grid"><div><p className="eyebrow">Häufige Fragen</p><h2>Gut zu<br />wissen.</h2><p className="faq-intro">Noch etwas offen? Im kostenlosen Erstgespräch klären wir alles persönlich.</p></div><div className="faq-list">{faqs.map((faq, index) => <details className="faq-item" key={faq.question} open={index === 0}><summary><span>{faq.question}</span><i aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
