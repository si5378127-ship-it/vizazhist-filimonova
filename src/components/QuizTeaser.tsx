import { CtaLink } from "@/components/CtaLink";
import { FadeIn } from "@/components/FadeIn";
import { getResolvedSiteContent } from "@/sanity/lib/getResolvedSiteContent";
import Image from "next/image";

/**
 * Компактный баннер-приглашение в квиз сразу после портфолио.
 * Размер фото фиксирован — пропорции исходного портрета не растягивают блок.
 */
export async function QuizTeaser() {
  const { quiz, portfolio } = await getResolvedSiteContent();

  if (!quiz.enabled) {
    return null;
  }

  const image = portfolio.images.find((item) => item.ready) ?? null;
  const objectPosition = image?.objectPosition?.trim() || "center 22%";

  return (
    <section
      id="quiz"
      aria-labelledby="quiz-heading"
      className="px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
    >
      <FadeIn className="mx-auto max-w-[1400px]">
        <div className="flex flex-row items-center gap-3.5 rounded-lg border border-line/70 bg-sand/60 p-3.5 sm:gap-6 sm:p-5 lg:gap-7 lg:px-6 lg:py-5">
          {image ? (
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md sm:h-40 sm:w-40 lg:h-[11.5rem] lg:w-[11.5rem]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 112px, (max-width: 1023px) 160px, 184px"
                className="object-cover"
                style={{ objectPosition }}
              />
            </div>
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col items-start text-left">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:text-xs sm:tracking-[0.18em]">
              {quiz.eyebrow}
            </p>
            <h2
              id="quiz-heading"
              className="mt-1 font-serif text-xl leading-tight text-ink sm:mt-1.5 sm:text-[1.75rem] lg:text-3xl"
            >
              {quiz.title}
            </h2>
            <p className="mt-1.5 max-w-xl text-sm leading-snug text-muted sm:mt-2 sm:text-base">
              {quiz.description}
            </p>
            <CtaLink
              href={quiz.url}
              outbound="quiz"
              variant="secondary"
              className="mt-2.5 min-h-10 px-4 py-2 text-sm sm:mt-3.5 sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-[15px]"
              goal="quiz_click"
              placement="after_portfolio"
            >
              {quiz.cta}
            </CtaLink>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
