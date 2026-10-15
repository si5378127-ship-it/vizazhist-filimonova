import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteContentProvider } from "@/components/SiteContentProvider";
import { site as fallbackSite } from "@/data/siteContent";
import { getResolvedSiteContent } from "@/sanity/lib/getResolvedSiteContent";
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
  title: fallbackSite.title,
  description: fallbackSite.description,
  applicationName: fallbackSite.name,
  authors: [{ name: fallbackSite.name }],
  keywords: [
    "визажист Тверь",
    "макияж Тверь",
    "Елена Филимонова",
    "макияж с локонами",
    "урок макияжа",
  ],
  openGraph: {
    title: fallbackSite.title,
    description: fallbackSite.description,
    locale: "ru_RU",
    type: "website",
    siteName: `${fallbackSite.name} — визажист`,
  },
  twitter: {
    card: "summary_large_image",
    title: fallbackSite.title,
    description: fallbackSite.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    yandex: "88d2291861ea2378",
  },
  metadataBase: new URL("https://vizazhist-filimonova.ru"),
};

export const viewport: Viewport = {
  themeColor: "#F7F2EC",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getResolvedSiteContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: `${content.site.name} — визажист`,
    description: content.site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.site.city,
      streetAddress: content.studio.addressLines[1],
      addressCountry: "RU",
    },
    areaServed: content.site.city,
  };

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
        <SiteContentProvider value={content}>
          {children}
          <CookieConsent />
        </SiteContentProvider>
      </body>
    </html>
  );
}
