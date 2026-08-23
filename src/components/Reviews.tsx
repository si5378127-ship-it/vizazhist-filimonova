import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/FadeIn";
import { links, reviews } from "@/data/siteContent";

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="text-[13px] tracking-[0.14em] text-accent"
      aria-label={`Оценка ${rating} из 5`}
    >
      {"★".repeat(rating)}
    </span>
  );
}

export function Reviews() {
  return (
    <section
      id={reviews.id}
      className="bg-sand/70 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <FadeIn className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
          {reviews.title}
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:items-stretch">
          {reviews.items.map((item) => (
            <article
              key={item.id}
              className="flex h-full flex-col rounded-lg border border-line bg-cream px-5 py-8 transition-[transform,border-color] duration-300 hover:-translate-y-[3px] hover:border-accent/35"
            >
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <p className="text-base font-medium text-ink">{item.name}</p>
                <Stars rating={item.rating} />
              </div>
              <p className="mt-4 flex-1 text-base leading-relaxed text-ink/90">
                {item.text}
              </p>
              <p className="mt-6 text-sm text-muted">{item.source}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3">
          <CtaLink
            href={links.yandex}
            outbound="yandex"
            variant="secondary"
            goal="yandex_click"
            placement="reviews"
          >
            {reviews.yandexCta}
          </CtaLink>
          <CtaLink
            href={links.dikidi}
            outbound="dikidi"
            variant="ghost"
            goal="dikidi_click"
            placement="reviews"
          >
            {reviews.dikidiNote}
          </CtaLink>
        </div>
      </FadeIn>
    </section>
  );
}
