import { defineType } from 'sanity';

export const authors = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string'
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text'
      },
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image'
      }
    ]
  })