import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'donation_record',
  title: 'Riwayat Donasi',
  type: 'document',
  fields: [
    defineField({
      name: 'donation_program',
      title: 'Program Donasi',
      type: 'reference',
      to: [{type: 'donation'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'donor_name',
      title: 'Nama Donatur',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'donor_email',
      title: 'Email Donatur',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'donor_phone',
      title: 'Telepon Donatur',
      type: 'string'
    }),
    defineField({
      name: 'amount',
      title: 'Jumlah Donasi (Rp)',
      type: 'number',
      validation: Rule => Rule.required().min(1000)
    }),
    defineField({
      name: 'message',
      title: 'Pesan',
      type: 'text'
    }),
    defineField({
      name: 'payment_method',
      title: 'Metode Pembayaran',
      type: 'string',
      options: {
        list: [
          {title: 'Transfer Bank', value: 'transfer'},
          {title: 'E-Wallet', value: 'ewallet'},
          {title: 'Kartu Kredit', value: 'credit_card'},
          {title: 'QRIS', value: 'qris'}
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'payment_status',
      title: 'Status Pembayaran',
      type: 'string',
      options: {
        list: [
          {title: 'Menunggu Pembayaran', value: 'pending'},
          {title: 'Berhasil', value: 'success'},
          {title: 'Gagal', value: 'failed'},
          {title: 'Dibatalkan', value: 'cancelled'}
        ]
      },
      initialValue: 'pending'
    }),
    defineField({
      name: 'is_anonymous',
      title: 'Donasi Anonymous?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'created_at',
      title: 'Tanggal Donasi',
      type: 'datetime',
      initialValue: new Date().toISOString()
    })
  ],
  preview: {
    select: {
      title: 'donor_name',
      subtitle: 'amount'
    }
  }
})