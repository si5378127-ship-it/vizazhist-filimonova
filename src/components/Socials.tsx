import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/FadeIn";
import { links, socials } from "@/data/siteContent";

export function Socials() {
  return (
    <section
      id={socials.id}
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
    >
      <FadeIn className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl">
          {socials.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {socials.text}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaLink href={links.instagram} outbound="instagram" variant="secondary" className="min-w-36">
            {socials.instagramLabel}
          </CtaLink>
          <CtaLink href={links.vkPortfolio} outbound="vk" variant="secondary" className="min-w-36">
            {socials.vkLabel}
          </CtaLink>
        </div>
      </FadeIn>
    </section>
  );
}
