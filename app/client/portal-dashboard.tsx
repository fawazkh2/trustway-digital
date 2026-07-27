const files = [
  { name: "Logo", info: "Markenmaterial & Varianten", icon: "L" },
  { name: "Bilder", info: "Fotos und visuelle Assets", icon: "B" },
  { name: "Texte", info: "Inhalte für die Plattform", icon: "T" },
  { name: "Dokumente", info: "Briefings & Unterlagen", icon: "D" },
];

const milestones = ["Projekt gestartet", "Design", "Entwicklung", "Tests", "Live"];
const todos = [
  { label: "Logo erhalten", complete: true },
  { label: "Inhalte erhalten", complete: false },
  { label: "Design bestätigt", complete: false },
  { label: "Entwicklung", complete: false },
  { label: "Live", complete: false },
];

export default function PortalDashboard() {
  return (
    <div className="portal-content">
      <section id="dashboard" className="portal-welcome"><div><p>Montag, 27. Juli</p><h1>Willkommen zurück!</h1><span>Hier ist der aktuelle Stand deines Projekts.</span></div><div className="portal-project-badge"><span className="portal-status-dot" /> <div><small>Aktives Projekt</small><strong>Dein Projekt</strong></div></div></section>
      <section className="portal-overview-grid"><article className="portal-card progress-card"><div className="portal-card-heading"><div><p>Projektfortschritt</p><h2>Planung</h2></div><span className="portal-status planning">Planung</span></div><div className="progress-visual"><div className="progress-ring"><strong>24<span>%</span></strong></div><div><h3>Auf dem richtigen Weg.</h3><p>Die Strategie und Grundstruktur sind definiert. Als Nächstes geht es in die Designphase.</p></div></div><div className="progress-track" aria-label="Projektfortschritt 24 Prozent"><span /></div><div className="progress-labels"><span>Projektbeginn</span><span>Launch</span></div></article><article className="portal-card project-info"><div className="portal-card-heading"><div><p>Projektinformationen</p><h2>Auf einen Blick</h2></div><span aria-hidden="true">•••</span></div><dl><div><dt>Projektname</dt><dd>Dein Projekt</dd></div><div><dt>Startdatum</dt><dd>14. Juli 2026</dd></div><div><dt>Geplantes Enddatum</dt><dd>30. September 2026</dd></div><div><dt>Aktuelle Phase</dt><dd><span className="portal-status planning">Planung</span></dd></div></dl></article></section>
      <section id="dateien" className="portal-section"><div className="portal-section-heading"><div><p>Projektmaterial</p><h2>Dateien</h2></div><span className="portal-readonly">Wird vom Projektteam geteilt</span></div><div className="portal-files">{files.map((file) => <article className="portal-file" key={file.name}><span className="file-icon">{file.icon}</span><div><h3>{file.name}</h3><p>{file.info}</p></div></article>)}</div></section>
      <section className="portal-lower-grid"><article id="nachrichten" className="portal-card messages-card"><div className="portal-card-heading"><div><p>Direkter Austausch</p><h2>Nachrichten</h2></div><span className="portal-readonly">Projektkommunikation folgt</span></div><div className="message-thread"><div className="message message-team"><div className="message-avatar">F</div><div><p>Hallo! Die erste Struktur steht. Ich bereite nun die Designrichtung vor.</p><span>Fawaz · Heute, 10:42</span></div></div><div className="message message-client"><div><p>Klingt super, danke für das Update!</p><span>Du · Heute, 11:05</span></div></div></div><p className="message-readonly">Nachrichten können nach Aktivierung der Projektkommunikation gesendet werden.</p></article><article className="portal-card todo-card"><div className="portal-card-heading"><div><p>Nächste Schritte</p><h2>To-do Liste</h2></div><span>1 / 5</span></div><ul>{todos.map((todo) => <li className={todo.complete ? "todo-complete" : ""} key={todo.label}><span aria-hidden="true">{todo.complete ? "✓" : ""}</span>{todo.label}</li>)}</ul></article></section>
      <section id="projektstatus" className="portal-section timeline-section"><div className="portal-section-heading"><div><p>Projektverlauf</p><h2>Timeline</h2></div><span className="portal-status planning">Aktuelle Phase: Planung</span></div><ol className="portal-timeline">{milestones.map((milestone, index) => <li className={index === 0 ? "timeline-complete" : index === 1 ? "timeline-current" : ""} key={milestone}><span>{index === 0 ? "✓" : String(index + 1).padStart(2, "0")}</span><strong>{milestone}</strong><p>{index === 0 ? "14. Juli 2026" : index === 1 ? "Als Nächstes" : "Geplant"}</p></li>)}</ol></section>
    </div>
  );
}
