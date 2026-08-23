import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/FadeIn";
import { MediaFigure } from "@/components/MediaFigure";
import { links, studio } from "@/data/siteContent";

export function Studio() {
  return (
    <section
      id={studio.id}
      className="bg-sand/70 px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <FadeIn className="mx-auto max-w-5xl">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
          {studio.title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] sm:items-start">
          {studio.images.map((image, index) => (
            <MediaFigure
              key={image.src}
              image={image}
              sizes={
                index === 0
                  ? "(max-width: 639px) 100vw, 55vw"
                  : "(max-width: 639px) 100vw, 45vw"
              }
              objectPosition={image.objectPosition}
              imgClassName="block h-full w-full object-cover"
              className="group"
            />
          ))}
        </div>

        <address className="mt-8 not-italic">
          {studio.addressLines.map((line) => (
            <p key={line} className="text-base leading-relaxed text-ink sm:text-lg">
              {line}
            </p>
          ))}
        </address>

        <CtaLink
          href={links.yandex}
          outbound="yandex"
          variant="secondary"
          className="mt-7"
          goal="yandex_click"
          placement="studio"
        >
          {studio.mapCta}
        </CtaLink>

        {/*
          TODO: при необходимости вставить Яндекс.Карту по ссылке из links.yandex.
          По умолчанию интерактивная карта не загружается, чтобы не ухудшать Core Web Vitals.
        */}
      </FadeIn>
    </section>
  );
}
