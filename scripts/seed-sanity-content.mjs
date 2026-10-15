/**
 * Однократный перенос текстов и фото из текущего лендинга в Sanity.
 * Без дублей: фиксированный _id документа и поиск ассетов по originalFilename.
 *
 * Безопасность:
 * - если документ landingContent уже есть — скрипт ОСТАНАВЛИВАЕТСЯ;
 * - перезапись только с флагом --force.
 *
 * Предпочтительный запуск (после npx sanity login):
 *   npm run sanity:seed
 *
 * Принудительная перезапись (только осознанно):
 *   npm run sanity:seed:force
 */

import { createClient } from "@sanity/client";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kactc55z";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const DOCUMENT_ID = "landingContent";

async function createWriteClient() {
  // 1) Клиент CLI после `sanity exec ... --with-user-token`
  try {
    const { getCliClient } = await import("sanity/cli");
    const cliClient = getCliClient({ apiVersion });
    if (cliClient?.config()?.token || cliClient?.config()?.projectId) {
      return cliClient.withConfig({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      });
    }
  } catch {
    // CLI-контекст недоступен — ниже запасной вариант.
  }

  // 2) Локальный write-токен (если пользователь добавил сам; в чат не выводим)
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    console.error(`
Нужна авторизация Sanity.

Выполните один раз в терминале проекта:
  npx sanity login

Затем снова:
  npm run sanity:seed

Токены и пароли в чат присылать не нужно.
`);
    process.exit(1);
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

const client = await createWriteClient();

async function findAssetByFilename(filename) {
  return client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{ _id }`,
    { filename },
  );
}

function filenameKey(src) {
  return src
    .replace(/^\/images\//, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

async function uploadImageOnce(src) {
  const relative = src.replace(/^\//, "");
  const absolute = path.join(root, "public", relative);
  const filename = path.basename(absolute);

  if (!existsSync(absolute)) {
    throw new Error(`Файл не найден: ${absolute}`);
  }

  const existing = await findAssetByFilename(filename);
  if (existing?._id) {
    console.log(`  · уже есть в Sanity: ${filename}`);
    return { _type: "reference", _ref: existing._id };
  }

  console.log(`  ↑ загружаю: ${filename}`);
  const asset = await client.assets.upload("image", createReadStream(absolute), {
    filename,
  });
  return { _type: "reference", _ref: asset._id };
}

async function toSiteImage(image) {
  const asset = await uploadImageOnce(image.src);
  return {
    _type: "siteImage",
    _key: filenameKey(image.src),
    alt: image.alt,
    objectPosition: image.objectPosition || undefined,
    size: image.size || undefined,
    image: {
      _type: "image",
      asset,
    },
  };
}

/** Контент зеркалит src/data/siteContent.ts — эталон без выдуманных данных. */
const content = {
  hero: {
    h1: "Макияж в Твери",
    subtitle: "Образ, в котором вы нравитесь себе и чувствуете себя уверенно.",
    extra: "Макияж для мероприятий, съёмок и особенных дней.",
    priceLabel: "Макияж — 3 000 ₽",
    primaryCta: "Выбрать время",
    primaryNote: "Онлайн-запись через Dikidi",
    secondaryCta: "Посмотреть работы",
    image: {
      src: "/images/hero/makeup-hero.jpg",
      alt: "Портрет с макияжем работы визажиста Елены Филимоновой",
    },
  },
  portfolio: {
    title: "Мои работы",
    intro: "В портфолио — съёмочные работы и образы реальных клиенток.",
    images: [
      {
        src: "/images/portfolio/makeup-01.jpg",
        alt: "Мягкий макияж с сияющей кожей — работа визажиста Елены Филимоновой",
        size: "tall",
        objectPosition: "center 20%",
      },
      {
        src: "/images/portfolio/makeup-02.jpg",
        alt: "Вечерний макияж с дымчатыми глазами — работа визажиста Елены Филимоновой",
        size: "portrait",
        objectPosition: "center 28%",
      },
      {
        src: "/images/portfolio/makeup-03.jpg",
        alt: "Праздничный макияж с сияющими тенями — работа визажиста Елены Филимоновой",
        size: "square",
        objectPosition: "center 18%",
      },
      {
        src: "/images/portfolio/makeup-04.jpg",
        alt: "Естественный макияж — работа визажиста Елены Филимоновой",
        size: "tall",
        objectPosition: "center 30%",
      },
      {
        src: "/images/portfolio/makeup-05.jpg",
        alt: "Макияж с нюдовыми губами — работа визажиста Елены Филимоновой",
        size: "wide",
        objectPosition: "center 22%",
      },
      {
        src: "/images/portfolio/makeup-06.jpg",
        alt: "Яркий макияж с красной помадой — работа визажиста Елены Филимоновой",
        size: "portrait",
        objectPosition: "center 24%",
      },
      {
        src: "/images/portfolio/makeup-07.jpg",
        alt: "Вечерний макияж с акцентом на глаза — работа визажиста Елены Филимоновой",
        size: "portrait",
        objectPosition: "center 25%",
      },
      {
        src: "/images/portfolio/makeup-08.jpg",
        alt: "Макияж с тёплыми медными тенями — работа визажиста Елены Филимоновой",
        size: "tall",
        objectPosition: "center 12%",
      },
    ],
  },
  services: {
    title: "Услуги и цены",
    featured: {
      name: "Макияж",
      price: "3 000 ₽",
      note: "Пучковые ресницы включены в стоимость.",
      cta: "Записаться на макияж",
    },
    secondary: [
      {
        name: "Макияж + локоны",
        price: "5 000 ₽",
        note: "Полный образ для события или съёмки.",
      },
      {
        name: "Локоны",
        price: "1 500–2 000 ₽",
        notes: [
          "Волны / сёрф-локоны / объёмные локоны.",
          "Итоговая цена зависит от длины и густоты волос.",
        ],
      },
    ],
    compact: [
      { name: "Свадебный макияж", price: "от 3 500 ₽" },
      { name: "Репетиция свадебного макияжа", price: "3 000 ₽" },
    ],
    brows: {
      name: "Брови",
      items: [
        { name: "окрашивание бровей", price: "800 ₽" },
        { name: "коррекция бровей", price: "500 ₽" },
        { name: "коррекция + окрашивание", price: "1 000 ₽" },
        { name: "ламинирование", price: "1 500 ₽" },
        {
          name: "ламинирование + окрашивание + коррекция",
          price: "2 000 ₽",
        },
        { name: "окрашивание ресниц", price: "500 ₽" },
        {
          name: "уходовая процедура «Счастье для бровей»",
          price: "500 ₽",
        },
      ],
    },
    extra: {
      name: "Выезд / ранние сборы",
      price: "до 9:00 — от 1 000 ₽",
    },
    afterCta: "Посмотреть свободное время",
  },
  about: {
    title: "Давайте познакомимся",
    paragraphs: [
      "Меня зовут Елена Филимонова, я визажист в Твери.",
      "Мне важно не просто выполнить макияж, а подобрать образ, который будет подходить именно вам — внешности, событию и вашим пожеланиям.",
      "Перед началом работы мы обсуждаем желаемый результат. Если вы не знаете, какой макияж выбрать, я помогу определить направление.",
    ],
    images: [
      {
        src: "/images/elena/elena.jpg",
        alt: "Елена Филимонова — визажист в Твери",
        objectPosition: "center 22%",
      },
      {
        src: "/images/elena/process.jpg",
        alt: "Работа визажиста с профессиональной косметикой",
        objectPosition: "center 52%",
      },
    ],
  },
  reviews: {
    title: "Что говорят клиентки",
    items: [
      {
        name: "Виктория",
        rating: 5,
        text: "«Огромное спасибо за подготовку к мероприятию. Все прошло в соответствии с нашими договоренностями, макияж был сделан профессионально и держался целый день. Надежный, профессиональный мастер!»",
        source: "Dikidi",
      },
      {
        name: "Мария Б.",
        rating: 5,
        text: "«Обратилась к Елене Филимоновой по совету подруги и не пожалела! Великолепный специалист! Спросила пожелания по макияжу. Наносила макияж очень аккуратно, чтобы мне было максимально комфортно! Я очень довольна! Получилась невероятная красота! Однозначно рекомендую!»",
        source: "Яндекс",
      },
      {
        name: "Ксения",
        rating: 5,
        text: "«Уже много лет хожу к Лене. Все очень нравится ❤️ Всегда чувствует, что нужно, делает красиво, аккуратно и очень естественно. Макияж держится отлично и всегда радует результатом.»",
        source: "Яндекс",
      },
    ],
    yandexCta: "Посмотреть отзывы на Яндексе",
    dikidiNote: "Отзывы также можно посмотреть при записи в Dikidi",
  },
  lesson: {
    title: "Макияж для себя",
    subtitle:
      "Индивидуальный урок, на котором вы учитесь краситься самостоятельно.",
    price: "6 000 ₽",
    duration: "2,5–3 часа",
    includesTitle: "Что входит",
    includes: [
      "текстуры и инструменты в макияже",
      "подготовка кожи",
      "создание ровного тона",
      "скульптурирование",
      "румяна, бронзер, хайлайтер",
      "макияж глаз",
      "макияж губ",
      "оформление бровей",
      "фиксация макияжа",
      "трансформация дневного макияжа в вечерний",
      "демакияж",
      "очищение кистей",
      "разбор косметички",
    ],
    highlights: [
      "Косметика и кисти на время обучения предоставляются.",
      "После занятия — электронная методичка с материалами урока.",
    ],
    cta: "Записаться на урок",
    images: [
      {
        src: "/images/lesson/lesson-02.jpg",
        alt: "Урок макияжа у зеркала — работа визажиста Елены Филимоновой",
        objectPosition: "60% 40%",
      },
      {
        src: "/images/lesson/lesson-01.jpg",
        alt: "Нанесение макияжа кистью на индивидуальном уроке",
        objectPosition: "40% 45%",
      },
      {
        src: "/images/lesson/lesson-03.jpg",
        alt: "Кисти для макияжа в руке",
        objectPosition: "58% 48%",
      },
    ],
  },
  additional: {
    title: "Дополнить образ",
    text: "К макияжу можно добавить лёгкую укладку в виде локонов.",
    priceLine: "Макияж + локоны — 5 000 ₽",
    images: [
      {
        src: "/images/curls/curls-01.jpg",
        alt: "Локоны — работа Елены Филимоновой",
        objectPosition: "center 42%",
      },
      {
        src: "/images/curls/curls-02.jpg",
        alt: "Макияж и локоны — работа Елены Филимоновой",
        objectPosition: "center 28%",
      },
    ],
  },
  studio: {
    title: "Где проходят сборы",
    addressLines: [
      "г. Тверь",
      "пр-т Чайковского, 28/2, офис 420",
      "БЦ «Тверь Геофизика», центральный вход, 4 этаж",
    ],
    mapCta: "Посмотреть на Яндексе",
    images: [
      {
        src: "/images/studio/studio-01.jpg",
        alt: "Студия визажиста Елены Филимоновой в Твери",
        objectPosition: "54% 48%",
      },
      {
        src: "/images/studio/studio-02.jpg",
        alt: "Рабочее место визажиста Елены Филимоновой",
        objectPosition: "58% 46%",
      },
    ],
  },
  contacts: {
    footerAddress: "г. Тверь, пр-т Чайковского, 28/2, офис 420",
    footerEmail: "vizazhist.filimonovaelena@yandex.ru",
    footerContactTitle: "Связаться с мастером",
    linkDikidi: "https://dikidi.net/1144947",
    linkYandex: "https://yandex.ru/profile/89740232272",
    linkVkPortfolio: "https://vk.ru/filimonovamuah",
    linkVkMessage: "https://vk.ru/im?sel=-153322870",
    linkInstagram:
      "https://www.instagram.com/filimonovamuah?igsh=cXY0Nzl4bTNwZWE2",
    linkTelegram: "https://t.me/lenafil",
    linkMax:
      "https://max.ru/u/f9LHodD0cOI4bt1GIdtlv3W2zVHNtqVsXupO3FAU_YZEJH-Q85ysLmS4E8s",
  },
};

function namedPrice(item, key) {
  return {
    _type: "namedPrice",
    _key: key,
    name: item.name,
    price: item.price,
    note: item.note || undefined,
    notes: item.notes || undefined,
  };
}

function reviewItem(item, index) {
  return {
    _type: "reviewItem",
    _key: `review-${index + 1}`,
    name: item.name,
    rating: item.rating,
    text: item.text,
    source: item.source,
  };
}

async function mapImages(images) {
  const result = [];
  for (const image of images) {
    result.push(await toSiteImage(image));
  }
  return result;
}

async function main() {
  console.log(`Sanity project: ${projectId} / ${dataset}`);
  if (dryRun) console.log("Режим --dry-run: запись в Sanity не выполняется.");

  const existing = await client.getDocument(DOCUMENT_ID);
  if (existing && !force) {
    console.error(`
Стоп: документ «${DOCUMENT_ID}» уже существует в dataset «${dataset}».

Перенос НЕ выполнен — существующие данные не тронуты.

Если нужно осознанно заменить содержимое тем же эталоном из сайта:
  npm run sanity:seed:force
`);
    process.exit(1);
  }

  if (existing && force) {
    console.warn(
      `Внимание: --force включён. Документ «${DOCUMENT_ID}» будет перезаписан.`,
    );
  } else {
    console.log("Документ ещё не создан — будет создан с id landingContent.");
  }

  if (dryRun) {
    console.log("Dry-run OK: проверки пройдены, запись пропущена.");
    return;
  }

  console.log("\nФотографии:");
  const heroImage = await toSiteImage(content.hero.image);
  const portfolioImages = await mapImages(content.portfolio.images);
  const aboutImages = await mapImages(content.about.images);
  const lessonImages = await mapImages(content.lesson.images);
  const additionalImages = await mapImages(content.additional.images);
  const studioImages = await mapImages(content.studio.images);

  const doc = {
    _id: DOCUMENT_ID,
    _type: "landingContent",
    title: "Контент сайта Елены Филимоновой",
    heroH1: content.hero.h1,
    heroSubtitle: content.hero.subtitle,
    heroExtra: content.hero.extra,
    heroPriceLabel: content.hero.priceLabel,
    heroPrimaryCta: content.hero.primaryCta,
    heroPrimaryNote: content.hero.primaryNote,
    heroSecondaryCta: content.hero.secondaryCta,
    heroImage,
    portfolioTitle: content.portfolio.title,
    portfolioIntro: content.portfolio.intro,
    portfolioImages,
    servicesTitle: content.services.title,
    featuredServiceName: content.services.featured.name,
    featuredServicePrice: content.services.featured.price,
    featuredServiceNote: content.services.featured.note,
    featuredServiceCta: content.services.featured.cta,
    secondaryServices: content.services.secondary.map((item, i) =>
      namedPrice(item, `secondary-${i + 1}`),
    ),
    compactServices: content.services.compact.map((item, i) =>
      namedPrice(item, `compact-${i + 1}`),
    ),
    browsTitle: content.services.brows.name,
    browsItems: content.services.brows.items.map((item, i) =>
      namedPrice(item, `brows-${i + 1}`),
    ),
    extraServiceName: content.services.extra.name,
    extraServicePrice: content.services.extra.price,
    servicesAfterCta: content.services.afterCta,
    aboutTitle: content.about.title,
    aboutParagraphs: content.about.paragraphs,
    aboutImages,
    reviewsTitle: content.reviews.title,
    reviewsItems: content.reviews.items.map(reviewItem),
    reviewsYandexCta: content.reviews.yandexCta,
    reviewsDikidiNote: content.reviews.dikidiNote,
    lessonTitle: content.lesson.title,
    lessonSubtitle: content.lesson.subtitle,
    lessonPrice: content.lesson.price,
    lessonDuration: content.lesson.duration,
    lessonIncludesTitle: content.lesson.includesTitle,
    lessonIncludes: content.lesson.includes,
    lessonHighlights: content.lesson.highlights,
    lessonCta: content.lesson.cta,
    lessonImages,
    additionalTitle: content.additional.title,
    additionalText: content.additional.text,
    additionalPriceLine: content.additional.priceLine,
    additionalImages,
    studioTitle: content.studio.title,
    studioAddressLines: content.studio.addressLines,
    studioMapCta: content.studio.mapCta,
    studioImages,
    footerAddress: content.contacts.footerAddress,
    footerEmail: content.contacts.footerEmail,
    footerContactTitle: content.contacts.footerContactTitle,
    linkDikidi: content.contacts.linkDikidi,
    linkYandex: content.contacts.linkYandex,
    linkVkPortfolio: content.contacts.linkVkPortfolio,
    linkVkMessage: content.contacts.linkVkMessage,
    linkInstagram: content.contacts.linkInstagram,
    linkTelegram: content.contacts.linkTelegram,
    linkMax: content.contacts.linkMax,
  };

  console.log("\nСохраняю документ landingContent…");
  await client.createOrReplace(doc);
  console.log("Готово. Откройте Studio: npm run sanity:dev");
  console.log("Сайт пока по-прежнему берёт тексты из siteContent.ts.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
