import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dashboard',
  title: 'Dashboard',
  type: 'document',
  fields: [
    defineField({
      name: 'home_image',
      title: 'Home Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'home_title',
      title: 'Home Title',
      type: 'string',
    }),
    defineField({
      name: 'home_desc',
      title: 'Home Description',
      type: 'text',
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'array',
      of: [{ type: 'block' }],
    }),
      defineField({
      name: 'about_image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
