// ./src/lib/sanity.client.ts

import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion : process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN
}

export const client = createClient(config)
export const urlFor = (source) => imageUrlBuilder(client).image(source)