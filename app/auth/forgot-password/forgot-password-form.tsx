"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Alert, Button, Input } from "@/components/ui";

export default function ForgotPasswordForm() {
  const [state, setState] = useState<"idle" | "sent">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const { error: resetError } = await createClient().auth.resetPasswordForEmail(String(form.get("email")), { redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password` });
      if (resetError) { setError("Die E-Mail konnte nicht versendet werden. Bitte versuche es erneut."); return; }
      setState("sent");
    } catch { setError("Die Passwortzurücksetzung ist momentan nicht verfügbar."); }
  }

  return <main className="auth-page ui-page-enter"><div className="auth-orb" aria-hidden="true" /><section className="auth-card"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><div className="auth-heading"><p>Client Portal</p><h1>Passwort zurücksetzen.</h1><span>Wir senden dir einen sicheren Link per E-Mail.</span></div>{state === "sent" ? <div className="auth-success"><span>✓</span><p>Wenn ein Konto mit dieser E-Mail existiert, erhältst du in Kürze einen Link zum Zurücksetzen.</p><Link href="/login">Zur Anmeldung</Link></div> : <form onSubmit={handleSubmit} className="auth-form"><label>E-Mail-Adresse<Input name="email" type="email" autoComplete="email" required placeholder="name@unternehmen.de" /></label>{error && <Alert tone="danger">{error}</Alert>}<Button type="submit">Link senden <span aria-hidden="true">↗</span></Button><Link className="auth-back" href="/login">Zurück zur Anmeldung</Link></form>}</section></main>;
}
