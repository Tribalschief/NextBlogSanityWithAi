import { type SchemaTypeDefinition } from 'sanity'
import { authors } from './author'
import { posts } from './post'
import { categories } from './category'
import { comments } from './comments'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authors,posts,categories,comments],
}
