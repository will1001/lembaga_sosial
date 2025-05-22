
// src/sanityClient.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'yhzk3e66',     // ganti dengan ID project kamu
  dataset: 'production',
  apiVersion: '2023-12-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanity)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
