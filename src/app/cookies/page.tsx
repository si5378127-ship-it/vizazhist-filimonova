import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/data/legalDocuments";
import { pageCanonical } from "@/lib/seo";
import type { Metadata, ResolvingMetadata } from "next";

const doc = legalDocuments.cookies;

export async function generateMetadata(
  _props: PageProps<"/cookies">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentOg = (await parent).openGraph;

  return {
    title: `${doc.title} — Елена Филимонова`,
    description: doc.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: pageCanonical.cookies,
    },
    openGraph: {
      ...parentOg,
      url: pageCanonical.cookies,
    },
  };
}

export default function CookiesPage() {
  return <LegalPage title={doc.title} sections={doc.sections} />;
}
