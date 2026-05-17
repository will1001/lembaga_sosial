import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'donation',
  title: 'Donasi',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Program',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Gambar',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Konten Lengkap',
      type: 'array',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'target_amount',
      title: 'Target Donasi (Rp)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'current_amount',
      title: 'Jumlah Terkumpul (Rp)',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'donors_count',
      title: 'Jumlah Donatur',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Zakat', value: 'zakat'},
          {title: 'Infak', value: 'infak'},
          {title: 'Sedekah', value: 'sedekah'},
          {title: 'Kurban', value: 'kurban'},
          {title: 'Pendidikan', value: 'pendidikan'},
          {title: 'Kesehatan', value: 'kesehatan'},
          {title: 'Bencana', value: 'bencana'},
          {title: 'Lainnya', value: 'lainnya'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'is_active',
      title: 'Aktif?',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'start_date',
      title: 'Tanggal Mulai',
      type: 'date'
    }),
    defineField({
      name: 'end_date',
      title: 'Tanggal Selesai',
      type: 'date'
    }),
    defineField({
      name: 'featured',
      title: 'Unggulan?',
      type: 'boolean',
      initialValue: false
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category'
    }
  }
})