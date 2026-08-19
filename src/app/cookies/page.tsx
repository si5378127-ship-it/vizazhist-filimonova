import { LegalPage } from "@/components/LegalPage";
import { legalDocuments } from "@/data/legalDocuments";
import type { Metadata } from "next";

const doc = legalDocuments.cookies;

export const metadata: Metadata = {
  title: `${doc.title} — Елена Филимонова`,
  description: doc.description,
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage title={doc.title} intro={doc.intro} sections={doc.sections} />
  );
}
