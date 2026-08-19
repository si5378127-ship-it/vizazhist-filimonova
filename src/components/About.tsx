import { FadeIn } from "@/components/FadeIn";
import { MediaFigure } from "@/components/MediaFigure";
import { about } from "@/data/siteContent";

export function About() {
  return (
    <section
      id={about.id}
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <FadeIn className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-16">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {about.images.map((image, index) => (
            <MediaFigure
              key={image.src}
              image={image}
              sizes="(max-width: 1023px) 45vw, 28vw"
              objectPosition={image.objectPosition}
              imgClassName="block h-full w-full object-cover"
              className={index === 0 ? "group mt-8" : "group"}
            />
          ))}
        </div>

        <div>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-xl text-base leading-relaxed text-ink/90 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
