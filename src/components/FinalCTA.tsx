import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/FadeIn";
import { MediaFigure } from "@/components/MediaFigure";
import { finalCta, links } from "@/data/siteContent";

export function FinalCTA() {
  const [mainPhoto, closeupPhoto] = finalCta.images;

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <FadeIn className="mx-auto grid max-w-[1400px] overflow-hidden rounded-lg bg-sand lg:grid-cols-2 lg:items-center">
        <div className="order-1 px-6 pt-10 sm:px-10 lg:col-start-2 lg:row-start-1 lg:px-14 lg:pt-12 lg:pb-0">
          <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-[2.5rem]">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {finalCta.text}
          </p>
        </div>

        <div className="order-2 flex items-center justify-center px-6 py-6 sm:px-10 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:px-10 lg:py-10">
          {mainPhoto && closeupPhoto ? (
            <div className="relative w-full max-w-[22.5rem] lg:max-w-[26rem]">
              <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start gap-3 lg:block">
                <MediaFigure
                  image={mainPhoto}
                  objectPosition={mainPhoto.objectPosition}
                  imgClassName="block h-full w-full object-cover"
                  className="group lg:w-[63%]"
                  sizes="(max-width: 1023px) 48vw, 18vw"
                />
                <MediaFigure
                  image={closeupPhoto}
                  objectPosition={closeupPhoto.objectPosition}
                  imgClassName="block h-full w-full object-cover"
                  className="group mt-7 lg:absolute lg:right-0 lg:top-[16%] lg:z-10 lg:mt-0 lg:w-[47%]"
                  sizes="(max-width: 1023px) 40vw, 14vw"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="order-3 flex flex-col items-start px-6 pb-10 sm:px-10 lg:col-start-2 lg:row-start-2 lg:px-14 lg:pt-8 lg:pb-12">
          <CtaLink href={links.dikidi} outbound="dikidi" className="mt-2 min-h-14 px-8 text-lg lg:mt-0">
            {finalCta.cta}
          </CtaLink>
          <CtaLink href={links.contact} variant="ghost" className="mt-4">
            {finalCta.contactPrompt}
          </CtaLink>
        </div>
      </FadeIn>
    </section>
  );
}
