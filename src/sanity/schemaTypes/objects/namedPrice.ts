import { defineField, defineType } from "sanity";

export const namedPrice = defineType({
  name: "namedPrice",
  title: "Услуга и цена",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Название",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Цена",
      type: "string",
      description: "Как на сайте, например: 3 000 ₽ или от 3 500 ₽",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Краткое описание",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Дополнительные пояснения",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
