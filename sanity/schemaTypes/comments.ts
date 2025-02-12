import { defineType } from "sanity";

export const comments = defineType({
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
        {
            name: 'author',
            title: 'Author',
            type: 'string'
          },
          {
            name: 'content',
            title: 'Content',
            type: 'text'
          },
          {
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            initialValue: false
          }
    ]
})