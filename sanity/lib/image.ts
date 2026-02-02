import imageUrlBuilder from '@sanity/image-url'
import { SanityImage } from '@/lib/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImage) {
  return builder.image(source)
}
