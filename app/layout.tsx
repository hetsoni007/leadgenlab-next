import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif", axes: ["opsz"] });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "LeadGenLab: practical AI workflows for growing teams", template: "%s | LeadGenLab" },
  description: "Clear explainers on Claude and ChatGPT releases, plus hands-on AI workflow audits for sales, marketing and operations teams.",
  openGraph: { type: "website", siteName: "LeadGenLab", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <JsonLd
          data={[
            { "@context": "https://schema.org", "@type": "Organization", name: "LeadGenLab", url: SITE.url, email: SITE.email,
              parentOrganization: { "@type": "Organization", name: "Soni Consultancy Services", url: "https://soniconsultancyservices.com/" } },
            { "@context": "https://schema.org", "@type": "WebSite", name: "LeadGenLab", url: SITE.url },
          ]}
        />
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
