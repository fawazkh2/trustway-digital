"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Alert, Button, Input } from "@/components/ui";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); const form = new FormData(event.currentTarget); const password = String(form.get("password"));
    if (password !== String(form.get("confirmPassword"))) { setError("Die Passwörter stimmen nicht überein."); return; }
    setLoading(true);
    try { const { error: updateError } = await createClient().auth.updateUser({ password }); if (updateError) { setError("Das Passwort konnte nicht aktualisiert werden. Der Link ist möglicherweise abgelaufen."); return; } router.replace("/client"); router.refresh(); } catch { setError("Das Passwort konnte nicht aktualisiert werden."); } finally { setLoading(false); }
  }
  return <main className="auth-page ui-page-enter"><div className="auth-orb" aria-hidden="true" /><section className="auth-card"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><div className="auth-heading"><p>Client Portal</p><h1>Neues Passwort.</h1><span>Wähle ein sicheres Passwort für deinen Zugang.</span></div><form onSubmit={handleSubmit} className="auth-form"><label>Neues Passwort<Input name="password" type="password" autoComplete="new-password" required minLength={8} placeholder="Mindestens 8 Zeichen" /></label><label>Passwort bestätigen<Input name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} placeholder="Passwort wiederholen" /></label>{error && <Alert tone="danger">{error}</Alert>}<Button type="submit" disabled={loading}>{loading ? "Wird gespeichert..." : "Passwort speichern"} <span aria-hidden="true">↗</span></Button></form></section></main>;
}
