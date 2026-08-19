/**
 * Единый источник контента лендинга.
 * Меняйте тексты, цены, ссылки и пути к фотографиям здесь — без правки JSX.
 */

export type SiteImage = {
  /** Путь относительно /public, например /images/hero/makeup-portrait.jpg */
  src: string;
  alt: string;
  width: number;
  height: number;
  /**
   * false — файл ещё не добавлен, на сайте показывается плейсхолдер.
   * TODO: после добавления реального файла поставьте ready: true
   */
  ready: boolean;
  objectPosition?: string;
};

export type NavItem = {
  href: string;
  label: string;
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  source: string;
};

export type CompactService = {
  name: string;
  price: string;
};

export type BrowService = {
  name: string;
  price: string;
};

/**
 * Внешние ссылки лендинга.
 * vkPortfolio — публичная страница с работами.
 * vkMessage — личные сообщения сообщества.
 */
export const externalLinks = {
  dikidi: "https://dikidi.net/1144947",
  yandex: "https://yandex.ru/profile/89740232272",
  vkPortfolio: "https://vk.ru/filimonovamuah",
  vkMessage: "https://vk.ru/im?sel=-153322870",
  instagram:
    "https://www.instagram.com/filimonovamuah?igsh=cXY0Nzl4bTNwZWE2",
  telegram: "https://t.me/lenafil",
  max: "https://max.ru/u/f9LHodD0cOI4bt1GIdtlv3W2zVHNtqVsXupO3FAU_YZEJH-Q85ysLmS4E8s",
  email: "mailto:vizazhist.filimonovaelena@yandex.ru",
};

export const links = {
  ...externalLinks,
  /** Публичная страница VK — для блока «больше работ». */
  vk: externalLinks.vkPortfolio,
  contact: externalLinks.email,
  privacy: "/privacy",
  cookies: "/cookies",
};

export const site = {
  name: "Елена Филимонова",
  role: "визажист",
  city: "Тверь",
  roleLine: "визажист · Тверь",
  title: "Визажист Елена Филимонова в Твери — макияж и укладки",
  description:
    "Макияж в Твери, макияж с локонами, укладки и индивидуальный урок «Макияж для себя». Онлайн-запись к визажисту Елене Филимоновой.",
  // TODO: добавить реальный домен сайта для Open Graph
  siteUrl: "",
};

export const nav: NavItem[] = [
  { href: "/#works", label: "Работы" },
  { href: "/#services", label: "Услуги" },
  { href: "/#about", label: "Обо мне" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#contacts", label: "Контакты" },
];

export const footer = {
  address: "г. Тверь, пр-т Чайковского, 28/2, офис 420",
  email: "vizazhist.filimonovaelena@yandex.ru",
  contactTitle: "Связаться с мастером",
};

/**
 * TODO: не указывать юридический или предпринимательский статус
 * и ИНН без предоставленных данных.
 */
export const operator = {
  fullName: "Филимонова Елена Валерьевна",
  email: "[email для обращений по вопросам персональных данных]",
  address: "[адрес]",
  domain: "[домен сайта]",
};

export const legal = {
  rights: "Все права защищены.",
  metrikaNote: "На сайте используется сервис веб-аналитики Яндекс Метрика.",
  thirdPartyNote:
    "Запись на услуги осуществляется на сторонних интернет-площадках. При переходе по внешним ссылкам обработка персональных данных, предоставляемых пользователем, осуществляется соответствующей интернет-площадкой в соответствии с её условиями.",
  links: [
    {
      label: "Политика обработки персональных данных",
      href: "/privacy",
    },
    {
      label: "Политика использования cookie",
      href: "/cookies",
    },
  ],
};

export const hero = {
  h1: "Макияж в Твери",
  subtitle: "Образ, в котором вы нравитесь себе и чувствуете себя уверенно.",
  extra: "Макияж для мероприятий, съёмок и особенных дней.",
  priceLabel: "Макияж — 3 000 ₽",
  primaryCta: "Выбрать время",
  primaryNote: "Онлайн-запись через Dikidi",
  secondaryCta: "Посмотреть работы",
  secondaryHref: "#works",
  image: {
    src: "/images/hero/makeup-hero.jpg",
    alt: "Портрет с макияжем работы визажиста Елены Филимоновой",
    width: 900,
    height: 1200,
    ready: true,
  } satisfies SiteImage,
};

export const portfolio = {
  id: "works",
  title: "Мои работы",
  intro: "В портфолио — съёмочные работы и образы реальных клиенток.",
  images: [
    {
      src: "/images/portfolio/makeup-01.jpg",
      alt: "Мягкий макияж с сияющей кожей — работа визажиста Елены Филимоновой",
      width: 800,
      height: 1066,
      ready: true,
      size: "tall",
      objectPosition: "center 20%",
    },
    {
      src: "/images/portfolio/makeup-02.jpg",
      alt: "Вечерний макияж с дымчатыми глазами — работа визажиста Елены Филимоновой",
      width: 800,
      height: 960,
      ready: true,
      size: "portrait",
      objectPosition: "center 28%",
    },
    {
      src: "/images/portfolio/makeup-03.jpg",
      alt: "Праздничный макияж с сияющими тенями — работа визажиста Елены Филимоновой",
      width: 800,
      height: 800,
      ready: true,
      size: "square",
      objectPosition: "center 18%",
    },
    {
      src: "/images/portfolio/makeup-04.jpg",
      alt: "Естественный макияж — работа визажиста Елены Филимоновой",
      width: 800,
      height: 1100,
      ready: true,
      size: "tall",
      objectPosition: "center 30%",
    },
    {
      src: "/images/portfolio/makeup-05.jpg",
      alt: "Макияж с нюдовыми губами — работа визажиста Елены Филимоновой",
      width: 900,
      height: 720,
      ready: true,
      size: "wide",
      objectPosition: "center 22%",
    },
    {
      src: "/images/portfolio/makeup-06.jpg",
      alt: "Яркий макияж с красной помадой — работа визажиста Елены Филимоновой",
      width: 800,
      height: 1000,
      ready: true,
      size: "portrait",
      objectPosition: "center 24%",
    },
    {
      src: "/images/portfolio/makeup-07.jpg",
      alt: "Вечерний макияж с акцентом на глаза — работа визажиста Елены Филимоновой",
      width: 800,
      height: 900,
      ready: true,
      size: "portrait",
      objectPosition: "center 25%",
    },
    {
      src: "/images/portfolio/makeup-08.jpg",
      alt: "Макияж с тёплыми медными тенями — работа визажиста Елены Филимоновой",
      width: 800,
      height: 1040,
      ready: true,
      size: "tall",
      objectPosition: "center 12%",
    },
  ] as Array<SiteImage & { size: "tall" | "portrait" | "square" | "wide" }>,
};

export const services = {
  id: "services",
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
  ] satisfies CompactService[],
  brows: {
    name: "Брови",
    items: [
      { name: "окрашивание бровей", price: "800 ₽" },
      { name: "коррекция бровей", price: "500 ₽" },
      { name: "коррекция + окрашивание", price: "1 000 ₽" },
      { name: "ламинирование", price: "1 500 ₽" },
      { name: "ламинирование + окрашивание + коррекция", price: "2 000 ₽" },
      { name: "окрашивание ресниц", price: "500 ₽" },
      { name: "уходовая процедура «Счастье для бровей»", price: "500 ₽" },
    ] satisfies BrowService[],
  },
  extra: {
    name: "Выезд / ранние сборы",
    price: "до 9:00 — от 1 000 ₽",
  },
  afterCta: "Посмотреть свободное время",
};

export const about = {
  id: "about",
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
      width: 800,
      height: 1000,
      ready: true,
      objectPosition: "center 22%",
    },
    {
      src: "/images/elena/process.jpg",
      alt: "Работа визажиста с профессиональной косметикой",
      width: 800,
      height: 1000,
      ready: true,
      objectPosition: "center 52%",
    },
  ] satisfies SiteImage[],
};

export const reviews = {
  id: "reviews",
  title: "Что говорят клиентки",
  items: [
    {
      id: "1",
      name: "Виктория",
      rating: 5,
      text: "«Огромное спасибо за подготовку к мероприятию. Все прошло в соответствии с нашими договоренностями, макияж был сделан профессионально и держался целый день. Надежный, профессиональный мастер!»",
      source: "Dikidi",
    },
    {
      id: "2",
      name: "Мария Б.",
      rating: 5,
      text: "«Обратилась к Елене Филимоновой по совету подруги и не пожалела! Великолепный специалист! Спросила пожелания по макияжу. Наносила макияж очень аккуратно, чтобы мне было максимально комфортно! Я очень довольна! Получилась невероятная красота! Однозначно рекомендую!»",
      source: "Яндекс",
    },
    {
      id: "3",
      name: "Ксения",
      rating: 5,
      text: "«Уже много лет хожу к Лене. Все очень нравится ❤️ Всегда чувствует, что нужно, делает красиво, аккуратно и очень естественно. Макияж держится отлично и всегда радует результатом.»",
      source: "Яндекс",
    },
  ] satisfies Review[],
  yandexCta: "Посмотреть отзывы на Яндексе",
  dikidiNote: "Отзывы также можно посмотреть при записи в Dikidi",
};

export const makeupLesson = {
  id: "lesson",
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
      width: 800,
      height: 1000,
      ready: true,
      objectPosition: "60% 40%",
    },
    {
      src: "/images/lesson/lesson-01.jpg",
      alt: "Нанесение макияжа кистью на индивидуальном уроке",
      width: 800,
      height: 600,
      ready: true,
      objectPosition: "40% 45%",
    },
    {
      src: "/images/lesson/lesson-03.jpg",
      alt: "Кисти для макияжа в руке",
      width: 640,
      height: 860,
      ready: true,
      objectPosition: "58% 48%",
    },
  ] satisfies SiteImage[],
};

export const additional = {
  id: "hair",
  title: "Дополнить образ",
  text: "К макияжу можно добавить лёгкую укладку в виде локонов.",
  priceLine: "Макияж + локоны — 5 000 ₽",
  images: [
    {
      src: "/images/curls/curls-01.jpg",
      alt: "Локоны — работа Елены Филимоновой",
      width: 800,
      height: 1000,
      ready: true,
      objectPosition: "center 42%",
    },
    {
      src: "/images/curls/curls-02.jpg",
      alt: "Макияж и локоны — работа Елены Филимоновой",
      width: 800,
      height: 1000,
      ready: true,
      objectPosition: "center 28%",
    },
  ] satisfies SiteImage[],
};

export const studio = {
  id: "contacts",
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
      width: 1021,
      height: 1024,
      ready: true,
      objectPosition: "54% 48%",
    },
    {
      src: "/images/studio/studio-02.jpg",
      alt: "Рабочее место визажиста Елены Филимоновой",
      width: 797,
      height: 910,
      ready: true,
      objectPosition: "58% 46%",
    },
  ] satisfies SiteImage[],
};

export const socials = {
  id: "socials",
  title: "Больше работ",
  text: "Новые образы, процесс работы и больше примеров — в социальных сетях.",
  instagramLabel: "Посмотреть работы в Instagram",
  vkLabel: "Посмотреть работы в VK",
};

export const finalCta = {
  title: "Выберите удобное время для макияжа",
  text: "Посмотрите свободные окна и запишитесь онлайн.",
  cta: "Записаться в Dikidi",
  contactPrompt: "Есть вопрос перед записью? Связаться с Еленой",
  images: [
    {
      src: "/images/final/final-01.jpg",
      alt: "Макияж Елены Филимоновой",
      width: 853,
      height: 1280,
      ready: true,
      objectPosition: "center 40%",
    },
    {
      src: "/images/final/final-02.jpg",
      alt: "Естественный макияж крупным планом",
      width: 853,
      height: 1280,
      ready: true,
      objectPosition: "center 28%",
    },
  ] satisfies SiteImage[],
};

export const cta = {
  book: "Записаться",
  bookShort: "Записаться",
};

export const imagesGuide = {
  hero: "public/images/hero/",
  portfolio: "public/images/portfolio/",
  elena: "public/images/elena/",
  studio: "public/images/studio/",
  lesson: "public/images/lesson/",
  hair: "public/images/hair/",
};
