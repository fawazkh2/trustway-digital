import type { Metadata } from "next";
import ProjectRequestForm from "./project-request-form";

export const metadata: Metadata = {
  title: "Projekt anfragen",
  description: "Frage dein Website-, Shopify-, KI- oder Buchungsprojekt in wenigen Minuten bei Trustway Digital an.",
  alternates: { canonical: "/project-request" },
};

export default function ProjectRequestPage() {
  return <ProjectRequestForm />;
}
