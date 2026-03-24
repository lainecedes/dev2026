import { defineQuery } from 'next-sanity'

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug
}`)

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage
}`)


// Projects op index.ts -> return array of up to 4 projects
export const PROJECTS_QUERY = defineQuery(`*[ _type == "project" && defined(slug.current)][0...4]{
  _id,
  title,
  "slug": slug.current,
  cover,
  description,
  expertise,
  tags
}`)

// project -> return one project only
export const PROJECT_QUERY = defineQuery(`*[ _type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  "slug": slug.current,
  cover,
  expertise,
  tags,
  body,
  date
}`)