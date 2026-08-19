import type { SiteImage } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import Image from "next/image";

type MediaFigureProps = {
  image: SiteImage;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  preload?: boolean;
  objectPosition?: string;
  caption?: string;
  hoverZoom?: boolean;
};

export function MediaFigure({
  image,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  preload = false,
  objectPosition,
  caption,
  hoverZoom = true,
}: MediaFigureProps) {
  const ratio = image.width / image.height;

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-md bg-sand",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {image.ready ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn(
            "object-cover",
            hoverZoom &&
              "transition-transform duration-500 ease-out group-hover:scale-[1.03]",
            !objectPosition && !imgClassName && "object-[center_18%]",
            imgClassName,
          )}
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
          aria-label={image.alt}
        >
          <span className="font-serif text-lg text-ink/70 sm:text-xl">
            Фото появится здесь
          </span>
          <span className="max-w-[16rem] text-xs leading-relaxed text-muted sm:text-sm">
            {caption ?? image.alt}
          </span>
          {/* TODO: добавить фото работы Елены — файл: {image.src} */}
        </div>
      )}
    </figure>
  );
}
