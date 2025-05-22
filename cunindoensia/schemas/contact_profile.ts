import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contact_profile',
  title: 'Contact Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.regex(/^\+?[0-9\s\-()]{7,}$/).error('Format nomor tidak valid'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email().error('Format email tidak valid'),
    }),
  ],
})
