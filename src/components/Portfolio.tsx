"use client";

import { FadeIn } from "@/components/FadeIn";
import { MediaFigure } from "@/components/MediaFigure";
import { portfolio } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Portfolio() {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? portfolio.images[active] : null;

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((value) =>
          value === null ? 0 : (value + 1) % portfolio.images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActive((value) =>
          value === null
            ? 0
            : (value - 1 + portfolio.images.length) % portfolio.images.length,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id={portfolio.id} className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
      <FadeIn className="mx-auto max-w-[1400px]">
        <h2 className="font-serif text-3xl text-ink sm:text-4xl lg:text-[2.75rem]">
          {portfolio.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {portfolio.intro}
        </p>

        <div className="mt-10 columns-1 gap-3 min-[480px]:columns-2 min-[480px]:gap-4 lg:columns-3">
          {portfolio.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "group mb-3 block w-full break-inside-avoid sm:mb-4",
                "rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              )}
              aria-label={`Открыть фото: ${image.alt}`}
            >
              <MediaFigure
                image={image}
                sizes="(max-width: 479px) 100vw, (max-width: 1023px) 50vw, 33vw"
                objectPosition={image.objectPosition}
                imgClassName="block h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </FadeIn>

      {current && active !== null ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 min-h-11 min-w-11 text-2xl text-cream"
            aria-label="Закрыть"
            onClick={() => setActive(null)}
          >
            ×
          </button>
          <div
            className="relative max-h-[88vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            {current.ready ? (
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className="mx-auto max-h-[88vh] w-auto rounded-md object-contain"
              />
            ) : (
              <div className="flex min-h-[50vh] items-center justify-center rounded-md bg-sand px-6 text-center">
                <p className="font-serif text-xl text-ink/80">{current.alt}</p>
              </div>
            )}
            <p className="mt-4 text-center text-sm text-cream/80">{current.alt}</p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                className="min-h-11 rounded-md px-4 text-cream"
                onClick={() =>
                  setActive(
                    (value) =>
                      ((value ?? 0) - 1 + portfolio.images.length) %
                      portfolio.images.length,
                  )
                }
              >
                ← Назад
              </button>
              <button
                type="button"
                className="min-h-11 rounded-md px-4 text-cream"
                onClick={() =>
                  setActive(
                    (value) => ((value ?? 0) + 1) % portfolio.images.length,
                  )
                }
              >
                Дальше →
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
