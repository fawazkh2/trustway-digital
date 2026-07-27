import type { Metadata } from "next";
import CaseStudiesContent from "./case-studies-content";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Erfahre, wie Trustway Digital digitale Produkte plant und umsetzt - vom ersten Problem bis zum erfolgreichen Launch.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
