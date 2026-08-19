import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site, studio } from "@/data/siteContent";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  keywords: [
    "визажист Тверь",
    "макияж Тверь",
    "Елена Филимонова",
    "макияж с локонами",
    "урок макияжа",
  ],
  openGraph: {
    title: site.title,
    description: site.description,
    locale: "ru_RU",
    type: "website",
    siteName: `${site.name} — визажист`,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  // TODO: добавить metadataBase с реальным доменом сайта
};

export const viewport: Viewport = {
  themeColor: "#F7F2EC",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: `${site.name} — визажист`,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    streetAddress: studio.addressLines[1],
    addressCountry: "RU",
  },
  areaServed: site.city,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
