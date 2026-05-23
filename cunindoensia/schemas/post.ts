import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      options: {
        dateFormat: 'DD MMMM YYYY',
      }
    }),
    defineField({
      name: 'author_ref',
      title: 'Author',
      type: 'reference',
      to: [{type: 'postAuthor'}],
    }),
    defineField({
      name: 'category_ref',
      title: 'Category',
      type: 'reference',
      to: [{type: 'postCategory'}],
    }),
    defineField({
      name: 'author',
      title: 'Legacy Author',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'category',
      title: 'Legacy Category',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured?',
      type: 'boolean',
    }),
  ]
})
