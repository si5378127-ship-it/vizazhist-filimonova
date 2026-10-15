import { createClient } from "@sanity/client";
import { createHash } from "crypto";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const client = createClient({
  projectId: "kactc55z",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,
  perspective: "published",
});

const doc = await client.fetch(`*[_id=="landingContent"][0]{
  heroH1, heroSubtitle, heroExtra, heroPriceLabel, heroPrimaryCta, heroPrimaryNote, heroSecondaryCta,
  heroImage{alt, objectPosition, image{asset->{_id, url, originalFilename, sha1hash}}},
  portfolioTitle, portfolioIntro,
  portfolioImages[]{alt, size, objectPosition, image{asset->{_id, url, originalFilename, sha1hash}}},
  featuredServiceName, featuredServicePrice, featuredServiceNote, featuredServiceCta,
  secondaryServices[]{name, price, note, notes},
  compactServices[]{name, price},
  browsTitle, browsItems[]{name, price},
  extraServiceName, extraServicePrice,
  aboutTitle, aboutParagraphs,
  aboutImages[]{alt, objectPosition, image{asset->{_id, originalFilename, sha1hash}}},
  reviewsTitle, reviewsItems[]{name, rating, text, source}, reviewsYandexCta, reviewsDikidiNote,
  lessonTitle, lessonSubtitle, lessonPrice, lessonDuration, lessonCta,
  lessonImages[]{alt, image{asset->{originalFilename, sha1hash}}},
  additionalTitle, additionalText, additionalPriceLine,
  additionalImages[]{alt, image{asset->{originalFilename, sha1hash}}},
  studioTitle, studioAddressLines, studioMapCta,
  studioImages[]{alt, image{asset->{originalFilename, sha1hash}}},
  footerAddress, footerEmail, footerContactTitle,
  linkDikidi, linkYandex, linkVkPortfolio, linkVkMessage, linkInstagram, linkTelegram, linkMax
}`);

function fileSha1(rel) {
  const p = resolve("public", rel.replace(/^\//, ""));
  if (!existsSync(p)) return null;
  return createHash("sha1").update(readFileSync(p)).digest("hex");
}

const expected = {
  heroH1: "Макияж в Твери",
  heroSubtitle:
    "Образ, в котором вы нравитесь себе и чувствуете себя уверенно.",
  heroExtra: "Макияж для мероприятий, съёмок и особенных дней.",
  heroPriceLabel: "Макияж — 3 000 ₽",
  heroPrimaryCta: "Выбрать время",
  heroPrimaryNote: "Онлайн-запись через Dikidi",
  heroSecondaryCta: "Посмотреть работы",
  portfolioTitle: "Мои работы",
  portfolioIntro:
    "В портфолио — съёмочные работы и образы реальных клиенток.",
  featuredServiceName: "Макияж",
  featuredServicePrice: "3 000 ₽",
  featuredServiceNote: "Пучковые ресницы включены в стоимость.",
  featuredServiceCta: "Записаться на макияж",
  aboutTitle: "Давайте познакомимся",
  reviewsTitle: "Что говорят клиентки",
  lessonTitle: "Макияж для себя",
  lessonPrice: "6 000 ₽",
  lessonDuration: "2,5–3 часа",
  lessonCta: "Записаться на урок",
  additionalTitle: "Дополнить образ",
  additionalText: "К макияжу можно добавить лёгкую укладку в виде локонов.",
  additionalPriceLine: "Макияж + локоны — 5 000 ₽",
  studioTitle: "Где проходят сборы",
  footerAddress: "г. Тверь, пр-т Чайковского, 28/2, офис 420",
  footerEmail: "vizazhist.filimonovaelena@yandex.ru",
  footerContactTitle: "Связаться с мастером",
  linkDikidi: "https://dikidi.net/1144947",
  linkYandex: "https://yandex.ru/profile/89740232272",
  linkVkPortfolio: "https://vk.ru/filimonovamuah",
  linkVkMessage: "https://vk.ru/im?sel=-153322870",
  linkTelegram: "https://t.me/lenafil",
};

const textDiffs = [];
for (const [k, v] of Object.entries(expected)) {
  if (doc[k] !== v) textDiffs.push({ field: k, expected: v, actual: doc[k] });
}

const aboutParas = [
  "Меня зовут Елена Филимонова, я визажист в Твери.",
  "Мне важно не просто выполнить макияж, а подобрать образ, который будет подходить именно вам — внешности, событию и вашим пожеланиям.",
  "Перед началом работы мы обсуждаем желаемый результат. Если вы не знаете, какой макияж выбрать, я помогу определить направление.",
];

const portfolioLocal = [
  "images/portfolio/makeup-01.jpg",
  "images/portfolio/makeup-02.jpg",
  "images/portfolio/makeup-03.jpg",
  "images/portfolio/makeup-04.jpg",
  "images/portfolio/makeup-05.jpg",
  "images/portfolio/makeup-06.jpg",
  "images/portfolio/makeup-07.jpg",
  "images/portfolio/makeup-08.jpg",
];

const portfolioAlts = [
  "Мягкий макияж с сияющей кожей — работа визажиста Елены Филимоновой",
  "Вечерний макияж с дымчатыми глазами — работа визажиста Елены Филимоновой",
  "Праздничный макияж с сияющими тенями — работа визажиста Елены Филимоновой",
  "Естественный макияж — работа визажиста Елены Филимоновой",
  "Макияж с нюдовыми губами — работа визажиста Елены Филимоновой",
  "Яркий макияж с красной помадой — работа визажиста Елены Филимоновой",
  "Вечерний макияж с акцентом на глаза — работа визажиста Елены Филимоновой",
  "Макияж с тёплыми медными тенями — работа визажиста Елены Филимоновой",
];

const portfolioCheck = portfolioLocal.map((rel, i) => {
  const local = fileSha1(rel);
  const remote = doc.portfolioImages?.[i]?.image?.asset;
  return {
    index: i + 1,
    localFile: rel,
    sanityFile: remote?.originalFilename ?? null,
    match: Boolean(local && remote?.sha1hash && local === remote.sha1hash),
    altMatch: doc.portfolioImages?.[i]?.alt === portfolioAlts[i],
    size: doc.portfolioImages?.[i]?.size ?? null,
  };
});

const heroLocal = fileSha1("images/hero/makeup-hero.jpg");
const heroRemote = doc.heroImage?.image?.asset;

const aboutLocal = [
  "images/elena/elena.jpg",
  "images/elena/process.jpg",
].map((rel, i) => {
  const local = fileSha1(rel);
  const remote = doc.aboutImages?.[i]?.image?.asset;
  return {
    localFile: rel,
    sanityFile: remote?.originalFilename ?? null,
    match: Boolean(local && remote?.sha1hash && local === remote.sha1hash),
  };
});

console.log(
  JSON.stringify(
    {
      textDiffs,
      aboutParagraphsMatch:
        JSON.stringify(doc.aboutParagraphs) === JSON.stringify(aboutParas),
      reviewsOk:
        doc.reviewsItems?.length === 3 &&
        doc.reviewsItems[0].name === "Виктория" &&
        doc.reviewsItems[1].name === "Мария Б." &&
        doc.reviewsItems[2].name === "Ксения" &&
        doc.reviewsYandexCta === "Посмотреть отзывы на Яндексе",
      secondaryOk:
        doc.secondaryServices?.[0]?.price === "5 000 ₽" &&
        doc.secondaryServices?.[1]?.price === "1 500–2 000 ₽",
      browsOk: doc.browsItems?.length === 7 && doc.browsItems[0].price === "800 ₽",
      compactOk:
        doc.compactServices?.length === 2 &&
        doc.compactServices[0].price === "от 3 500 ₽",
      extraOk:
        doc.extraServiceName === "Выезд / ранние сборы" &&
        doc.extraServicePrice === "до 9:00 — от 1 000 ₽",
      studioLinesMatch:
        JSON.stringify(doc.studioAddressLines) ===
        JSON.stringify([
          "г. Тверь",
          "пр-т Чайковского, 28/2, офис 420",
          "БЦ «Тверь Геофизика», центральный вход, 4 этаж",
        ]),
      portfolioCount: doc.portfolioImages?.length,
      hero: {
        sanityFile: heroRemote?.originalFilename ?? null,
        match: heroLocal === heroRemote?.sha1hash,
        altMatch:
          doc.heroImage?.alt ===
          "Портрет с макияжем работы визажиста Елены Филимоновой",
      },
      portfolioCheck,
      portfolioMismatchCount: portfolioCheck.filter((p) => !p.match).length,
      aboutLocal,
      lessonFiles: doc.lessonImages?.map((x) => x.image?.asset?.originalFilename),
      additionalFiles: doc.additionalImages?.map(
        (x) => x.image?.asset?.originalFilename,
      ),
      studioFiles: doc.studioImages?.map((x) => x.image?.asset?.originalFilename),
      linksOk: {
        dikidi: doc.linkDikidi === expected.linkDikidi,
        instagram: Boolean(
          doc.linkInstagram?.startsWith(
            "https://www.instagram.com/filimonovamuah",
          ),
        ),
        max: Boolean(doc.linkMax?.startsWith("https://max.ru/")),
        telegram: doc.linkTelegram === expected.linkTelegram,
      },
    },
    null,
    2,
  ),
);
