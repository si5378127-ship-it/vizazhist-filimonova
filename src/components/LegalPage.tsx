import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { footer, operator } from "@/data/siteContent";
import type { LegalSection } from "@/data/legalDocuments";
import Link from "next/link";

type LegalPageProps = {
  title: string;
  sections: LegalSection[];
};

const siteUrl = "https://vizazhist-filimonova.ru";

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <>
      <Header stuckInitially />
      <main id="main" className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-ink">
              ← На главную
            </Link>
          </p>
          <h1 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {title}
          </h1>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl text-ink">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-base leading-relaxed text-ink/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 space-y-3 text-base leading-relaxed text-ink/80">
            <p>Оператор: {operator.fullName}</p>
            <p>Сайт: {siteUrl}</p>
            <p>Электронная почта: {footer.email}</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
