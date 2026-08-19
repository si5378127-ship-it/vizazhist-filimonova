import { FadeIn } from "@/components/FadeIn";
import { MediaFigure } from "@/components/MediaFigure";
import { additional } from "@/data/siteContent";

export function AdditionalServices() {
  return (
    <section
      id={additional.id}
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <FadeIn className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-12">
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
          {additional.images.map((image) => (
            <MediaFigure
              key={image.src}
              image={image}
              sizes="(max-width: 479px) 100vw, (max-width: 767px) 45vw, 22vw"
              objectPosition={image.objectPosition}
              imgClassName="block h-full w-full object-cover"
              className="group"
            />
          ))}
        </div>
        <div>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">
            {additional.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {additional.text}
          </p>
          <p className="mt-5 font-serif text-xl text-ink sm:text-2xl">
            {additional.priceLine}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
