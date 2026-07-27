import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./premium.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trustway.digital"),
  title: {
    default: "Trustway Digital | Websites, Shopify & AI Automation",
    template: "%s | Trustway Digital",
  },
  description:
    "Individuelle Websites, Shopify-Shops und KI-Automatisierungen von Fawaz. Modern, professionell und auf dein Unternehmen zugeschnitten.",
  keywords: ["Webdesign", "Shopify Entwicklung", "KI Automatisierung", "Buchungssysteme", "Fawaz", "Trustway Digital"],
  openGraph: {
    title: "Trustway Digital",
    description:
      "Individuelle Websites, Shopify-Shops und KI-Automatisierungen für dein Unternehmen.",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/trustway-bg.jpg", width: 1200, height: 630, alt: "Trustway Digital" }],
  },
  twitter: { card: "summary_large_image", images: ["/trustway-bg.jpg"] },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><Script id="theme-preference" strategy="beforeInteractive">{`try { const saved = localStorage.getItem('trustway-theme'); const dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.classList.toggle('dark', dark); } catch {}`}</Script>{children}</body>
    </html>
  );
}
