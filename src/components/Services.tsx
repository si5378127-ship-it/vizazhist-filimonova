import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/FadeIn";
import { links, services } from "@/data/siteContent";

export function Services() {
  return (
    <section
      id={services.id}
      className="bg-sand/70 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <FadeIn className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
          {services.title}
        </h2>

        <article className="mt-10 rounded-lg border border-line bg-cream px-5 py-8 sm:px-10 sm:py-10">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">
            Главная услуга
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="font-serif text-3xl text-ink sm:text-4xl">
              {services.featured.name}
            </h3>
            <p className="font-serif text-2xl text-ink sm:text-3xl">
              {services.featured.price}
            </p>
          </div>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {services.featured.note}
          </p>
          <CtaLink href={links.dikidi} outbound="dikidi" className="mt-7">
            {services.featured.cta}
          </CtaLink>
        </article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {services.secondary.map((item) => (
            <article
              key={item.name}
              className="rounded-lg border border-line/80 bg-cream/70 px-5 py-6 sm:px-7"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-2xl text-ink">{item.name}</h3>
                <p className="font-serif text-xl text-ink">{item.price}</p>
              </div>
              {"note" in item && item.note ? (
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {item.note}
                </p>
              ) : null}
              {"notes" in item && item.notes
                ? item.notes.map((note) => (
                    <p
                      key={note}
                      className="mt-3 text-base leading-relaxed text-muted"
                    >
                      {note}
                    </p>
                  ))
                : null}
            </article>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {services.compact.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-1 border-t border-line pt-5 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <h3 className="text-lg text-ink">{item.name}</h3>
              <p className="text-base text-ink/80">{item.price}</p>
            </div>
          ))}

          <div className="border-t border-line pt-5">
            <h3 className="text-lg text-ink">{services.brows.name}</h3>
            <ul className="mt-4 space-y-2.5">
              {services.brows.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-col gap-0.5 text-base text-muted sm:flex-row sm:justify-between sm:gap-6"
                >
                  <span>{item.name}</span>
                  <span className="shrink-0 text-ink/80">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-1 border-t border-line pt-5 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg text-ink">{services.extra.name}</h3>
            <p className="text-base text-ink/80">{services.extra.price}</p>
          </div>
        </div>

        <div className="mt-12">
          <CtaLink href={links.dikidi} outbound="dikidi">{services.afterCta}</CtaLink>
        </div>
      </FadeIn>
    </section>
  );
}
