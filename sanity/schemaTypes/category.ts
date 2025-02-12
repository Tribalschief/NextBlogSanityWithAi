import { defineType } from "sanity";

export const categories = defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: Rule => Rule.required().max(120)
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        
        validation: Rule => Rule.required()
      }
    ]
})