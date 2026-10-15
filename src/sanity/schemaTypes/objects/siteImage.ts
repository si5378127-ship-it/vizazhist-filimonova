import { defineField, defineType } from "sanity";

export const siteImage = defineType({
  name: "siteImage",
  title: "Фотография",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Файл фотографии",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Описание для слабовидящих (alt)",
      type: "string",
      description: "Кратко опишите, что на фото. Нужно для доступности и SEO.",
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: "objectPosition",
      title: "Кадрирование (CSS object-position)",
      type: "string",
      description:
        "Например: center 20%. Можно оставить пустым — тогда будет центр.",
    }),
    defineField({
      name: "size",
      title: "Формат в сетке портфолио",
      type: "string",
      options: {
        list: [
          { title: "Высокое", value: "tall" },
          { title: "Портрет", value: "portrait" },
          { title: "Квадрат", value: "square" },
          { title: "Широкое", value: "wide" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
      size: "size",
    },
    prepare({ title, media, size }) {
      return {
        title: title || "Фотография без описания",
        subtitle: size ? `Формат: ${size}` : undefined,
        media,
      };
    },
  },
});
