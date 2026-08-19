import { CtaLink } from "@/components/CtaLink";
import { MediaFigure } from "@/components/MediaFigure";
import { hero, links } from "@/data/siteContent";

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto grid max-w-[1400px] items-center gap-8 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-10"
    >
      <div className="order-2 lg:order-1">
        <h1 className="font-serif text-[2.35rem] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
          {hero.h1}
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink sm:text-xl">
          {hero.subtitle}
        </p>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          {hero.extra}
        </p>
        <p className="mt-8 font-serif text-2xl text-ink sm:text-[1.75rem]">
          {hero.priceLabel}
        </p>
        <div className="mt-7 flex flex-col items-start gap-3">
          <CtaLink href={links.dikidi} outbound="dikidi">{hero.primaryCta}</CtaLink>
          <p className="text-sm text-muted">{hero.primaryNote}</p>
          <a
            href={hero.secondaryHref}
            className="mt-1 text-[15px] text-muted transition-colors hover:text-ink"
          >
            {hero.secondaryCta} ↓
          </a>
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <MediaFigure
          image={hero.image}
          preload
          hoverZoom={false}
          className="mx-auto w-full max-w-md lg:max-w-none"
          sizes="(max-width: 1023px) 92vw, 46vw"
          imgClassName="hero-photo"
        />
      </div>
    </section>
  );
}
