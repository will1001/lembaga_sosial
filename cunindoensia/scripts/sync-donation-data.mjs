import {createClient} from '@sanity/client'

const token = process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN. Create a Sanity token with Editor/Write permission, then run this script again.')
  process.exit(1)
}

const client = createClient({
  projectId: 'yhzk3e66',
  dataset: 'production',
  apiVersion: '2023-12-01',
  token,
  useCdn: false,
})

const donationSeed = [
  {
    _id: 'donation-bantu-pendidikan-anak-negeri',
    title: 'Bantu Pendidikan Anak Negeri',
    slug: 'bantu-pendidikan-anak-negeri',
    programCategory: 'Beasiswa Pendidikan',
    category: 'pendidikan',
    description:
      'Dukung biaya sekolah, buku, seragam, dan perlengkapan belajar untuk anak-anak dari keluarga prasejahtera.',
    target_amount: 50000000,
    current_amount: 18000000,
    donors_count: 42,
  },
  {
    _id: 'donation-layanan-kesehatan-gratis',
    title: 'Layanan Kesehatan Gratis',
    slug: 'layanan-kesehatan-gratis',
    programCategory: 'Pemberdayaan Masyarakat',
    category: 'kesehatan',
    description:
      'Dukung pemeriksaan kesehatan dasar dan edukasi hidup sehat untuk masyarakat yang membutuhkan.',
    target_amount: 40000000,
    current_amount: 21000000,
    donors_count: 56,
  },
  {
    _id: 'donation-paket-sembako-keluarga',
    title: 'Paket Sembako Keluarga Prasejahtera',
    slug: 'paket-sembako-keluarga-prasejahtera',
    programCategory: 'Pemberdayaan Masyarakat',
    category: 'sedekah',
    description: 'Bantu keluarga prasejahtera mendapatkan kebutuhan pokok yang layak dan cukup.',
    target_amount: 30000000,
    current_amount: 12500000,
    donors_count: 31,
  },
]

const fallbackImageRef = 'image-8b6db2ce4fbb2dbb806dc9143a384a4bc487d3ce-6526x4351-jpg'

const programs = await client.fetch(
  '*[_type == "program"]{category, image{asset}}'
)

const imageRefByProgramCategory = new Map(
  programs
    .filter((program) => program.category && program.image?.asset?._ref)
    .map((program) => [program.category, program.image.asset._ref])
)

const transaction = client.transaction()

for (const donation of donationSeed) {
  const imageRef = imageRefByProgramCategory.get(donation.programCategory) || fallbackImageRef

  transaction.createOrReplace({
    _id: donation._id,
    _type: 'donation',
    title: donation.title,
    slug: {
      _type: 'slug',
      current: donation.slug,
    },
    description: donation.description,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageRef,
      },
    },
    content: [
      {
        _key: `${donation.slug}-intro`,
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: `${donation.slug}-intro-text`,
            _type: 'span',
            marks: [],
            text: donation.description,
          },
        ],
      },
    ],
    target_amount: donation.target_amount,
    current_amount: donation.current_amount,
    donors_count: donation.donors_count,
    category: donation.category,
    is_active: true,
    featured: true,
  })
}

const result = await transaction.commit()
console.log(`Synced ${result.results.length} donation documents.`)
