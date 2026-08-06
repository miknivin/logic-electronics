import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { QuoteModalProvider } from "@/components/quote-modal-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { branches, contact, FOUNDED_YEAR, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Office Equipment & IT Solutions in Abu Dhabi`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "printer repair Abu Dhabi",
    "copier sales UAE",
    "printer rental Abu Dhabi",
    "printer AMC UAE",
    "IT support Abu Dhabi",
    "CCTV installation Abu Dhabi",
    "office stationery Abu Dhabi",
    "toner cartridges UAE",
  ],
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Office Equipment & IT Solutions in Abu Dhabi`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.png" },
};

/** Organisation schema so search engines pick up branches and contact details. */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  alternateName: site.name,
  description: site.description,
  url: site.url,
  telephone: contact.primaryPhone,
  email: contact.email,
  foundingDate: String(FOUNDED_YEAR),
  address: branches.map((branch) => ({
    "@type": "PostalAddress",
    streetAddress: branch.address,
    addressLocality: branch.city,
    addressCountry: branch.country,
  })),
  areaServed: "United Arab Emirates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema),
          }}
        />
        <QuoteModalProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </QuoteModalProvider>
      </body>
    </html>
  );
}
