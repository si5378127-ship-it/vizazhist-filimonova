export type SanityImageAsset = {
  _id?: string;
  url?: string | null;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
    } | null;
  } | null;
} | null;

export type SanitySiteImage = {
  alt?: string | null;
  objectPosition?: string | null;
  size?: "tall" | "portrait" | "square" | "wide" | string | null;
  image?: {
    asset?: SanityImageAsset;
  } | null;
} | null;

export type SanityNamedPrice = {
  name?: string | null;
  price?: string | null;
  note?: string | null;
  notes?: string[] | null;
} | null;

export type SanityReview = {
  name?: string | null;
  rating?: number | null;
  text?: string | null;
  source?: string | null;
} | null;

/** Сырой документ landingContent из GROQ. */
export type SanityLandingContent = {
  heroH1?: string | null;
  heroSubtitle?: string | null;
  heroExtra?: string | null;
  heroPriceLabel?: string | null;
  heroPrimaryCta?: string | null;
  heroPrimaryNote?: string | null;
  heroSecondaryCta?: string | null;
  heroImage?: SanitySiteImage;
  portfolioTitle?: string | null;
  portfolioIntro?: string | null;
  portfolioImages?: SanitySiteImage[] | null;
  servicesTitle?: string | null;
  featuredServiceName?: string | null;
  featuredServicePrice?: string | null;
  featuredServiceNote?: string | null;
  featuredServiceCta?: string | null;
  secondaryServices?: SanityNamedPrice[] | null;
  compactServices?: SanityNamedPrice[] | null;
  browsTitle?: string | null;
  browsItems?: SanityNamedPrice[] | null;
  extraServiceName?: string | null;
  extraServicePrice?: string | null;
  servicesAfterCta?: string | null;
  aboutTitle?: string | null;
  aboutParagraphs?: string[] | null;
  aboutImages?: SanitySiteImage[] | null;
  reviewsTitle?: string | null;
  reviewsItems?: SanityReview[] | null;
  reviewsYandexCta?: string | null;
  reviewsDikidiNote?: string | null;
  lessonTitle?: string | null;
  lessonSubtitle?: string | null;
  lessonPrice?: string | null;
  lessonDuration?: string | null;
  lessonIncludesTitle?: string | null;
  lessonIncludes?: string[] | null;
  lessonHighlights?: string[] | null;
  lessonCta?: string | null;
  lessonImages?: SanitySiteImage[] | null;
  additionalTitle?: string | null;
  additionalText?: string | null;
  additionalPriceLine?: string | null;
  additionalImages?: SanitySiteImage[] | null;
  studioTitle?: string | null;
  studioAddressLines?: string[] | null;
  studioMapCta?: string | null;
  studioImages?: SanitySiteImage[] | null;
  footerAddress?: string | null;
  footerEmail?: string | null;
  footerContactTitle?: string | null;
  linkDikidi?: string | null;
  linkYandex?: string | null;
  linkVkPortfolio?: string | null;
  linkVkMessage?: string | null;
  linkInstagram?: string | null;
  linkTelegram?: string | null;
  linkMax?: string | null;
  quizEnabled?: boolean | null;
  quizUrl?: string | null;
  quizHeroCta?: string | null;
  quizTitle?: string | null;
  quizDescription?: string | null;
  quizCta?: string | null;
  quizEyebrow?: string | null;
} | null;
