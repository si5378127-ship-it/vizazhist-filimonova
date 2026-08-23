import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/data/legalDocuments";
import { pageCanonical } from "@/lib/seo";
import type { Metadata, ResolvingMetadata } from "next";

const doc = legalDocuments.privacy;

export async function generateMetadata(
  _props: PageProps<"/privacy">,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentOg = (await parent).openGraph;

  return {
    title: `${doc.title} — Елена Филимонова`,
    description: doc.description,
    robots: { index: true, follow: true },
    alternates: {
      canonical: pageCanonical.privacy,
    },
    openGraph: {
      ...parentOg,
      url: pageCanonical.privacy,
    },
  };
}

export default function PrivacyPage() {
  return <LegalPage title={doc.title} sections={doc.sections} />;
}
