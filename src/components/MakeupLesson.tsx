import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/FadeIn";
import { MediaFigure } from "@/components/MediaFigure";
import { links, makeupLesson } from "@/data/siteContent";

export function MakeupLesson() {
  const [featured, closeup, brushes] = makeupLesson.images;

  return (
    <section
      id={makeupLesson.id}
      className="border-y border-line/70 bg-sand px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <FadeIn className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div className="order-1">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
            {makeupLesson.title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {makeupLesson.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            <p>
              <span className="block text-sm text-muted">Стоимость</span>
              <span className="font-serif text-2xl text-ink">
                {makeupLesson.price}
              </span>
            </p>
            <p>
              <span className="block text-sm text-muted">Длительность</span>
              <span className="font-serif text-2xl text-ink">
                {makeupLesson.duration}
              </span>
            </p>
          </div>
        </div>

        <div className="order-2 grid grid-cols-2 gap-3 lg:col-start-2 lg:row-span-2 lg:grid-cols-5 lg:gap-4">
          {featured ? (
            <MediaFigure
              image={featured}
              objectPosition={featured.objectPosition}
              imgClassName="block h-full w-full object-cover"
              className="group col-span-2 lg:col-span-3 lg:row-span-2"
              sizes="(max-width: 1023px) 100vw, 28vw"
            />
          ) : null}
          {closeup ? (
            <MediaFigure
              image={closeup}
              objectPosition={closeup.objectPosition}
              imgClassName="block h-full w-full object-cover"
              className="group lg:col-span-2 lg:col-start-4"
              sizes="(max-width: 1023px) 48vw, 18vw"
            />
          ) : null}
          {brushes ? (
            <MediaFigure
              image={brushes}
              objectPosition={brushes.objectPosition}
              imgClassName="block h-full w-full object-cover"
              className="group lg:col-span-2 lg:col-start-4 lg:mt-4 lg:w-[108%] lg:max-w-[108%] lg:justify-self-end"
              sizes="(max-width: 1023px) 48vw, 14vw"
            />
          ) : null}
        </div>

        <div className="order-3 lg:col-start-1">
          <h3 className="text-lg text-ink">{makeupLesson.includesTitle}</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {makeupLesson.includes.map((item) => (
              <li key={item} className="text-base leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 rounded-md bg-cream px-5 py-5">
            {makeupLesson.highlights.map((item) => (
              <p key={item} className="text-base leading-relaxed text-ink">
                {item}
              </p>
            ))}
          </div>

          <CtaLink
            href={links.dikidi}
            outbound="dikidi"
            className="mt-8"
            goal="dikidi_click"
            placement="makeup_lesson"
          >
            {makeupLesson.cta}
          </CtaLink>
        </div>
      </FadeIn>
    </section>
  );
}
