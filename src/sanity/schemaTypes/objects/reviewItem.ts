import { defineField, defineType } from "sanity";

export const reviewItem = defineType({
  name: "reviewItem",
  title: "Отзыв",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Имя клиентки",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Оценка",
      type: "number",
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "text",
      title: "Текст отзыва",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Источник",
      type: "string",
      description: "Например: Яндекс или Dikidi",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "source",
      rating: "rating",
    },
    prepare({ title, subtitle, rating }) {
      return {
        title: title || "Отзыв",
        subtitle: [subtitle, rating ? `${rating}★` : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
