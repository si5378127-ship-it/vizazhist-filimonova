import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { operatorFields, type LegalSection } from "@/data/legalDocuments";
import Link from "next/link";

type LegalPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
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
          <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>

          {/* TODO: заполнить реквизиты владельца сайта перед публикацией */}
          <section className="mt-10 rounded-md border border-dashed border-line bg-sand/50 px-5 py-6">
            <h2 className="text-base font-medium text-ink">
              Данные оператора
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Недостающие реквизиты отмечены как placeholders и не являются
              вымышленными данными.
            </p>
            <dl className="mt-5 space-y-3">
              {operatorFields.map((field) => (
                <div
                  key={field.label}
                  className="grid gap-1 sm:grid-cols-[12rem_minmax(0,1fr)]"
                >
                  <dt className="text-sm text-muted">{field.label}</dt>
                  <dd className="text-sm text-ink">{field.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="mt-12 space-y-8">
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
        </article>
      </main>
      <Footer />
    </>
  );
}
