import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/require-user";
import { createAdminClient } from "@/lib/supabase/admin";
import { createTask, sendMessage, updateProject, uploadProjectFile } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Projektverwaltung", robots: { index: false, follow: false } };

type Project = { id: string; client_id: string; title: string; description: string; status: string; progress: number; budget: number | null; start_date: string | null; due_date: string | null };
type Profile = { name: string; email: string };
type Task = { id: string; title: string; completed: boolean; position: number };
type Message = { id: string; message: string; created_at: string; sender_id: string };
type FileRecord = { id: string; filename: string; url: string; created_at: string };

function dateInput(value: string | null) { return value ?? ""; }

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser(["admin"]);
  const { id } = await params;
  const supabase = createAdminClient();
  const [{ data: projectData }, { data: tasksData }, { data: messagesData }, { data: filesData }] = await Promise.all([
    supabase.from("projects").select("id,client_id,title,description,status,progress,budget,start_date,due_date").eq("id", id).maybeSingle(),
    supabase.from("project_tasks").select("id,title,completed,position").eq("project_id", id).order("position"),
    supabase.from("project_messages").select("id,message,created_at,sender_id").eq("project_id", id).order("created_at"),
    supabase.from("project_files").select("id,filename,url,created_at").eq("project_id", id).order("created_at", { ascending: false }),
  ]);
  const project = projectData as unknown as Project | null;
  if (!project) notFound();
  const { data: profileData } = await supabase.from("profiles").select("name,email").eq("id", project.client_id).maybeSingle();
  const profile = profileData as unknown as Profile | null;
  const files = (filesData ?? []) as unknown as FileRecord[];
  const signedFiles = await Promise.all(files.map(async (file) => { const { data } = await supabase.storage.from("project-files").createSignedUrl(file.url, 3600); return { ...file, signedUrl: data?.signedUrl ?? "" }; }));
  const tasks = (tasksData ?? []) as unknown as Task[];
  const messages = (messagesData ?? []) as unknown as Message[];

  return <main className="admin-page"><header className="admin-header"><Link href="/admin" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><Link className="nav-cta" href="/admin">← Zum CRM</Link></header><div className="admin-shell"><section className="admin-intro project-detail-intro"><div><p>Projektverwaltung</p><h1>{project.title}</h1><span>{profile?.name || "Unbekannter Kunde"} · {profile?.email || ""}</span></div><span className={`admin-status ${project.status}`}>{project.status === "planning" ? "Planung" : project.status === "development" ? "Entwicklung" : "Fertig"}</span></section><div className="admin-detail-grid"><section className="admin-section"><div className="admin-section-heading"><div><p>Projektinformationen</p><h2>Status und Fortschritt</h2></div></div><form action={updateProject.bind(null, project.id)} className="admin-form-grid"><input name="title" defaultValue={project.title} required /><input name="budget" type="number" min="0" step="0.01" defaultValue={project.budget ?? ""} placeholder="Budget" /><input name="startDate" type="date" defaultValue={dateInput(project.start_date)} /><input name="dueDate" type="date" defaultValue={dateInput(project.due_date)} /><select name="status" defaultValue={project.status}><option value="planning">Planung</option><option value="development">Entwicklung</option><option value="complete">Fertig</option></select><label className="admin-range">Fortschritt <output>{project.progress}%</output><input name="progress" type="range" min="0" max="100" defaultValue={project.progress} /></label><textarea name="description" defaultValue={project.description} placeholder="Projektbeschreibung" /><button type="submit">Änderungen speichern</button></form></section><section className="admin-section"><div className="admin-section-heading"><div><p>Aufgaben</p><h2>Projekt-Checkliste</h2></div></div><ul className="admin-task-list">{tasks.map((task) => <li key={task.id}><span className={task.completed ? "done" : ""}>{task.completed ? "✓" : ""}</span>{task.title}</li>)}{tasks.length === 0 && <li className="admin-empty">Noch keine Aufgaben.</li>}</ul><form action={createTask.bind(null, project.id)} className="admin-inline-form"><input name="title" required placeholder="Neue Aufgabe" /><button type="submit">Aufgabe erstellen</button></form></section><section className="admin-section"><div className="admin-section-heading"><div><p>Dateien</p><h2>Projektdateien</h2></div></div><form action={uploadProjectFile.bind(null, project.id)} encType="multipart/form-data" className="admin-inline-form"><input name="file" type="file" accept="application/pdf,image/jpeg,image/png,image/webp,text/plain,.docx" required /><button type="submit">Datei hochladen</button></form><ul className="admin-file-list">{signedFiles.map((file) => <li key={file.id}><span>{file.filename}</span>{file.signedUrl && <a href={file.signedUrl} target="_blank" rel="noreferrer">Öffnen ↗</a>}</li>)}{signedFiles.length === 0 && <li className="admin-empty">Noch keine Dateien.</li>}</ul></section><section className="admin-section"><div className="admin-section-heading"><div><p>Nachrichten</p><h2>Projektkommunikation</h2></div></div><div className="admin-messages">{messages.map((message) => <article key={message.id}><p>{message.message}</p><span>{new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.created_at))}</span></article>)}{messages.length === 0 && <p className="admin-empty">Noch keine Nachrichten.</p>}</div><form action={sendMessage.bind(null, project.id)} className="admin-message-form"><textarea name="message" required placeholder="Nachricht an den Kunden" /><button type="submit">Nachricht senden ↗</button></form></section></div></div></main>;
}
