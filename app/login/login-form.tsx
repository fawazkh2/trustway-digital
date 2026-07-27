"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Alert, Button, Input } from "@/components/ui";
import { safeInternalPath } from "@/lib/auth/safe-redirect";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const origin = typeof window === "undefined" ? "http://localhost" : window.location.origin;
  const next = safeInternalPath(searchParams.get("next"), origin, "/client");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });
      if (signInError) {
        setError("E-Mail-Adresse oder Passwort sind nicht korrekt.");
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError("Die Anmeldung ist momentan nicht verfügbar. Bitte versuche es später erneut.");
    } finally {
      setLoading(false);
    }
  }

  const setupError = searchParams.get("error");
  return <main className="auth-page ui-page-enter"><div className="auth-orb" aria-hidden="true" /><section className="auth-card"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><div className="auth-heading"><p>Client Portal</p><h1>Willkommen zurück.</h1><span>Bitte melde dich an, um dein Projekt zu sehen.</span></div>{setupError === "configuration" && <Alert tone="warning">Supabase ist noch nicht konfiguriert.</Alert>}{setupError === "unauthorized" && <Alert tone="danger">Dein Konto hat keinen Zugriff auf diesen Bereich.</Alert>}<form onSubmit={handleSubmit} className="auth-form"><label>E-Mail-Adresse<Input name="email" type="email" autoComplete="email" required placeholder="name@unternehmen.de" /></label><label>Passwort<div className="auth-label-row"><span>Passwort</span><Link href="/auth/forgot-password">Passwort vergessen?</Link></div><Input name="password" type="password" autoComplete="current-password" required placeholder="Dein Passwort" /></label>{error && <Alert tone="danger">{error}</Alert>}<Button type="submit" disabled={loading}>{loading ? "Anmeldung läuft..." : "Anmelden"} <span aria-hidden="true">↗</span></Button></form><p className="auth-note">Zugangsdaten werden von Trustway Digital bereitgestellt.</p></section></main>;
}
