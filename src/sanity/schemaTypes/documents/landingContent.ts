import { defineField, defineType } from "sanity";

/**
 * Единый документ контента лендинга.
 * Елена редактирует один раздел за раз через группы полей.
 */
export const landingContent = defineType({
  name: "landingContent",
  title: "Контент сайта",
  type: "document",
  groups: [
    { name: "hero", title: "Первый экран" },
    { name: "portfolio", title: "Портфолио" },
    { name: "quiz", title: "Квиз" },
    { name: "services", title: "Услуги и цены" },
    { name: "about", title: "Обо мне" },
    { name: "reviews", title: "Отзывы" },
    { name: "lesson", title: "Урок «Макияж для себя»" },
    { name: "additional", title: "Дополнить образ" },
    { name: "studio", title: "Студия" },
    { name: "contacts", title: "Контакты" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Служебное название",
      type: "string",
      initialValue: "Контент сайта Елены Филимоновой",
      readOnly: true,
      hidden: true,
    }),

    // ——— Первый экран ———
    defineField({
      name: "heroH1",
      title: "Заголовок H1",
      type: "string",
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Подзаголовок",
      type: "text",
      rows: 2,
      group: "hero",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroExtra",
      title: "Дополнительная строка",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroPriceLabel",
      title: "Цена на первом экране",
      type: "string",
      group: "hero",
      description: "Например: Макияж — 3 000 ₽",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Текст главной кнопки",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryNote",
      title: "Подпись под кнопкой",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Текст ссылки «Посмотреть работы»",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Главное фото",
      type: "siteImage",
      group: "hero",
    }),
    defineField({
      name: "quizHeroCta",
      title: "Кнопка квиза на первом экране",
      type: "string",
      group: "hero",
      description: "Вторичная кнопка под записью. Например: Подобрать свой образ",
    }),

    // ——— Портфолио ———
    defineField({
      name: "portfolioTitle",
      title: "Заголовок раздела",
      type: "string",
      group: "portfolio",
    }),
    defineField({
      name: "portfolioIntro",
      title: "Вводный текст",
      type: "text",
      rows: 3,
      group: "portfolio",
    }),
    defineField({
      name: "portfolioImages",
      title: "Фотографии портфолио",
      type: "array",
      group: "portfolio",
      of: [{ type: "siteImage" }],
      description:
        "Порядок в списке = порядок на сайте. Перетаскивайте карточки, чтобы менять порядок.",
    }),

    // ——— Услуги ———
    defineField({
      name: "servicesTitle",
      title: "Заголовок раздела",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "featuredServiceName",
      title: "Главная услуга — название",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "featuredServicePrice",
      title: "Главная услуга — цена",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "featuredServiceNote",
      title: "Главная услуга — описание",
      type: "text",
      rows: 2,
      group: "services",
    }),
    defineField({
      name: "featuredServiceCta",
      title: "Главная услуга — текст кнопки",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "secondaryServices",
      title: "Дополнительные услуги (карточки)",
      type: "array",
      group: "services",
      of: [{ type: "namedPrice" }],
    }),
    defineField({
      name: "compactServices",
      title: "Краткий список услуг",
      type: "array",
      group: "services",
      of: [{ type: "namedPrice" }],
      description: "Например, свадебный макияж и репетиция.",
    }),
    defineField({
      name: "browsTitle",
      title: "Блок бровей — заголовок",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "browsItems",
      title: "Услуги для бровей",
      type: "array",
      group: "services",
      of: [{ type: "namedPrice" }],
    }),
    defineField({
      name: "extraServiceName",
      title: "Выезд / ранние сборы — название",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "extraServicePrice",
      title: "Выезд / ранние сборы — цена",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesAfterCta",
      title: "Текст кнопки внизу блока услуг",
      type: "string",
      group: "services",
    }),

    // ——— Обо мне ———
    defineField({
      name: "aboutTitle",
      title: "Заголовок",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutParagraphs",
      title: "Текст «Обо мне»",
      type: "array",
      group: "about",
      of: [{ type: "text" }],
      description: "Каждый пункт — отдельный абзац на сайте.",
    }),
    defineField({
      name: "aboutImages",
      title: "Фотографии в блоке «Обо мне»",
      type: "array",
      group: "about",
      of: [{ type: "siteImage" }],
      validation: (rule) => rule.max(2),
    }),

    // ——— Отзывы ———
    defineField({
      name: "reviewsTitle",
      title: "Заголовок",
      type: "string",
      group: "reviews",
    }),
    defineField({
      name: "reviewsItems",
      title: "Отзывы",
      type: "array",
      group: "reviews",
      of: [{ type: "reviewItem" }],
    }),
    defineField({
      name: "reviewsYandexCta",
      title: "Текст кнопки Яндекс",
      type: "string",
      group: "reviews",
    }),
    defineField({
      name: "reviewsDikidiNote",
      title: "Текст ссылки Dikidi",
      type: "string",
      group: "reviews",
    }),

    // ——— Урок ———
    defineField({
      name: "lessonTitle",
      title: "Заголовок",
      type: "string",
      group: "lesson",
    }),
    defineField({
      name: "lessonSubtitle",
      title: "Описание",
      type: "text",
      rows: 3,
      group: "lesson",
    }),
    defineField({
      name: "lessonPrice",
      title: "Стоимость",
      type: "string",
      group: "lesson",
    }),
    defineField({
      name: "lessonDuration",
      title: "Длительность",
      type: "string",
      group: "lesson",
    }),
    defineField({
      name: "lessonIncludesTitle",
      title: "Заголовок списка «Что входит»",
      type: "string",
      group: "lesson",
    }),
    defineField({
      name: "lessonIncludes",
      title: "Что входит в урок",
      type: "array",
      group: "lesson",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lessonHighlights",
      title: "Важные примечания",
      type: "array",
      group: "lesson",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "lessonCta",
      title: "Текст кнопки записи",
      type: "string",
      group: "lesson",
    }),
    defineField({
      name: "lessonImages",
      title: "Фотографии урока",
      type: "array",
      group: "lesson",
      of: [{ type: "siteImage" }],
      validation: (rule) => rule.max(3),
    }),

    // ——— Дополнить образ ———
    defineField({
      name: "additionalTitle",
      title: "Заголовок",
      type: "string",
      group: "additional",
    }),
    defineField({
      name: "additionalText",
      title: "Описание",
      type: "text",
      rows: 3,
      group: "additional",
    }),
    defineField({
      name: "additionalPriceLine",
      title: "Строка с ценой",
      type: "string",
      group: "additional",
      description: "Например: Макияж + локоны — 5 000 ₽",
    }),
    defineField({
      name: "additionalImages",
      title: "Фотографии",
      type: "array",
      group: "additional",
      of: [{ type: "siteImage" }],
      validation: (rule) => rule.max(2),
    }),

    // ——— Студия ———
    defineField({
      name: "studioTitle",
      title: "Заголовок",
      type: "string",
      group: "studio",
    }),
    defineField({
      name: "studioAddressLines",
      title: "Адрес (по строкам)",
      type: "array",
      group: "studio",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "studioMapCta",
      title: "Текст кнопки карты",
      type: "string",
      group: "studio",
    }),
    defineField({
      name: "studioImages",
      title: "Фотографии студии",
      type: "array",
      group: "studio",
      of: [{ type: "siteImage" }],
      validation: (rule) => rule.max(2),
    }),

    // ——— Контакты ———
    defineField({
      name: "footerAddress",
      title: "Адрес в подвале",
      type: "string",
      group: "contacts",
    }),
    defineField({
      name: "footerEmail",
      title: "Email",
      type: "string",
      group: "contacts",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "footerContactTitle",
      title: "Заголовок блока связи",
      type: "string",
      group: "contacts",
    }),
    // ——— Квиз ———
    defineField({
      name: "quizEnabled",
      title: "Показывать квиз на сайте",
      type: "boolean",
      group: "quiz",
      initialValue: true,
      description:
        "Если выключено — кнопки квиза скрыты, даже когда URL заполнен.",
    }),
    defineField({
      name: "quizUrl",
      title: "Ссылка на квиз",
      type: "url",
      group: "quiz",
      description:
        "Единый адрес квиза. При переносе на свой поддомен меняйте только это поле.",
    }),
    defineField({
      name: "quizTitle",
      title: "Заголовок блока после портфолио",
      type: "string",
      group: "quiz",
    }),
    defineField({
      name: "quizDescription",
      title: "Описание блока после портфолио",
      type: "text",
      rows: 3,
      group: "quiz",
    }),
    defineField({
      name: "quizCta",
      title: "Текст кнопки после портфолио",
      type: "string",
      group: "quiz",
    }),
    defineField({
      name: "quizEyebrow",
      title: "Метка над заголовком",
      type: "string",
      group: "quiz",
      description: "Например: Мини-тест · 1 минута",
    }),

    defineField({
      name: "linkDikidi",
      title: "Ссылка Dikidi",
      type: "url",
      group: "contacts",
    }),
    defineField({
      name: "linkYandex",
      title: "Ссылка на Яндекс.Профиль",
      type: "url",
      group: "contacts",
    }),
    defineField({
      name: "linkVkPortfolio",
      title: "VK — страница с работами",
      type: "url",
      group: "contacts",
    }),
    defineField({
      name: "linkVkMessage",
      title: "VK — написать сообщение",
      type: "url",
      group: "contacts",
    }),
    defineField({
      name: "linkInstagram",
      title: "Instagram",
      type: "url",
      group: "contacts",
    }),
    defineField({
      name: "linkTelegram",
      title: "Telegram",
      type: "url",
      group: "contacts",
    }),
    defineField({
      name: "linkMax",
      title: "MAX",
      type: "url",
      group: "contacts",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Контент сайта",
        subtitle: "Елена Филимонова — визажист",
      };
    },
  },
});
