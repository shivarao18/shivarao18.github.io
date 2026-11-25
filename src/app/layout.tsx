import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, person, SITE_URL } from "@/content/site";
import "./globals.css";

const description = `${person.name} is an AI/ML engineer for US roles in RAG retrieval, LLM evaluation, fine-tuning, and inference. SmartSpend retrieval is 95% Hit@5 and 0.94 MRR.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${person.name} — AI/ML Engineer`,
    template: `%s — ${person.name}`,
  },
  description,
  applicationName: person.name,
  authors: [{ name: person.name, url: SITE_URL }],
  keywords: [
    "Shiva Kumar Thummanapalli",
    "AI/ML engineer",
    "RAG",
    "LLM evaluation",
    "fine-tuning",
    "inference",
    "vLLM",
    "QLoRA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${person.name} — AI/ML Engineer`,
    description,
    siteName: person.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${person.name}, AI/ML engineer. RAG retrieval, LLM evals, fine-tuning and inference.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — AI/ML Engineer`,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var theme=t==="light"||t==="dark"?t:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "AI/ML Engineer",
  description: person.pitch,
  email: `mailto:${EMAIL}`,
  url: `${SITE_URL}/`,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Florida" },
    { "@type": "CollegeOrUniversity", name: "Guru Ghasidas Vishwavidyalaya" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
