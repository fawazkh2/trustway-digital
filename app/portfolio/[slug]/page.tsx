import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeControl } from "@/components/ui";
import { concepts, conceptBySlug } from "@/lib/concepts";

export function generateStaticParams() { return concepts.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = conceptBySlug((await params).slug);
  if (!project) return {};
  return { title: `${project.title} Konzeptprojekt`, description: project.description, alternates: { canonical: `/portfolio/${project.slug}` }, openGraph: { title: `${project.title} | Konzeptprojekt`, description: project.description, images: [{ url: project.image, alt: `${project.title} Konzeptprojekt` }] } };
}

export default async function ConceptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = conceptBySlug((await params).slug);
  if (!project) notFound();
  return <main className="portfolio-page concept-detail-page"><header className="portfolio-nav"><div className="shell portfolio-nav-inner"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><div className="portfolio-nav-actions"><ThemeControl /><Link href="/kontakt" className="nav-cta">Projekt besprechen <span aria-hidden="true">↗</span></Link></div></div></header><section className="concept-detail-hero"><div className="shell"><Link className="detail-back" href="/portfolio">← Alle Konzeptprojekte</Link><p className="eyebrow">{project.category}</p><p className="concept-label">Konzeptprojekt</p><h1>{project.title}</h1><p>{project.description}</p></div></section><section className="concept-cover"><div className="shell"><div><Image src={project.image} alt={`${project.title} Konzeptprojekt Cover`} fill priority sizes="(max-width: 1180px) 100vw, 1100px" /></div></div></section><section className="concept-detail-content"><div className="shell concept-detail-grid"><div><p className="eyebrow">Die Aufgabe</p><h2>{project.challenge}</h2></div><div><p className="eyebrow">Die Richtung</p><p>{project.approach}</p><p className="eyebrow">Technologien</p><div className="technology-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div><Link href="/kontakt" className="button button-primary">Ähnliches Projekt anfragen <span aria-hidden="true">↗</span></Link></div></div></section><footer className="footer"><div className="shell footer-row"><Link href="/" className="brand"><span className="brand-mark">T</span><span>trustway</span></Link><p>© {new Date().getFullYear()} Trustway Digital. Alle Rechte vorbehalten.</p><span>Built by Fawaz</span></div></footer></main>;
}
