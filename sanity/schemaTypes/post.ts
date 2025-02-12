import { defineType } from 'sanity';
import TagsWithAI from '../TagsWithAi';
export const posts = defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required().max(120)
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { 
          source: 'title',
          maxLength: 96 
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
        validation: Rule => Rule.required()
      },
      {
        name: 'featuredImage',
        title: 'Featured Image',
        type: 'image',
        options: {
          hotspot: true
        },
        fields: [
          {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Important for SEO and accessibility',
            validation: Rule => Rule.required()
          }
        ]
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        rows: 3,
        validation: Rule => Rule.max(200)
      },
      {
        name: 'aiSummary',
        title: 'AI Summary',
        type: 'text',
        rows: 4,
        description: 'Automatically generated summary using AI'
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          { type: 'block' },
          { 
            type: 'image',
            fields: [
              {
                name: 'caption',
                type: 'string',
                title: 'Caption'
              }
            ] 
          },
        ]
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'category' }] }]
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        components: { input: TagsWithAI },
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'updatedAt',
        title: 'Updated At',
        type: 'datetime'
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            { title: 'Draft', value: 'draft' },
            { title: 'Published', value: 'published' },
            { title: 'Archived', value: 'archived' }
          ],
          layout: 'radio'
        }
      },
      {
        name: 'seo',
        title: 'SEO Settings',
        type: 'object',
        fields: [
          {
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string'
          },
          {
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 2
          },
          {
            name: 'keywords',
            title: 'Keywords',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      },
      {
        name: 'relatedPosts',
        title: 'Related Posts',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'post' }] }]
      },
      {
        name: 'readingTime',
        title: 'Reading Time',
        type: 'number',
        description: 'Automatically calculated reading time in minutes'
      },
      {
        name: 'featured',
        title: 'Featured Post',
        type: 'boolean',
        initialValue: false
      },
      {
        name: 'socialSharing',
        title: 'Social Sharing Settings',
        type: 'object',
        fields: [
          {
            name: 'twitterTitle',
            title: 'Twitter Title',
            type: 'string'
          },
          {
            name: 'linkedInTitle',
            title: 'LinkedIn Title',
            type: 'string'
          },
          {
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image'
          }
        ]
      },
      {
        name: 'comments',
        title: 'Comments',
        type: 'array',
        of: [{ type: 'comment' }]
      }
    ],
    initialValue: {
      status: 'draft'
    },
    preview: {
      select: {
        title: 'title',
        author: 'author.name',
        media: 'featuredImage'
      },
      prepare(selection) {
        const { author } = selection
        return Object.assign({}, selection, {
          subtitle: author && `by ${author}`
        })
      }
    }
  })
// export const posts = defineType({
// name: 'post',
//   title: 'Post',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Title',
//       type: 'string',
//     },
//     {
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: { source: 'title' },
//     },
//     {
//       name: 'aiSummary',
//       title: 'AI Summary',
//       type: 'text',
//     },
//     {
//       name: 'content',
//       title: 'Content',
//       type: 'array',
//       of: [{ type: 'block' }],
//     },
//     // Add more fields as needed
//   ],

// })