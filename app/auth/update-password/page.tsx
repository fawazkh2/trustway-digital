import type { Metadata } from "next";
import UpdatePasswordForm from "./update-password-form";

export const metadata: Metadata = { title: "Neues Passwort", robots: { index: false, follow: false } };

export default function UpdatePasswordPage() { return <UpdatePasswordForm />; }
