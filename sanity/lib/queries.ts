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
  tags
}`)

// Archive -> all projects, newest first
export const ARCHIVE_QUERY = defineQuery(`*[ _type == "project" && defined(slug.current)] | order(year desc, idx asc){
  _id,
  "slug": slug.current,
  idx,
  year,
  title,
  tag,
  kind,
  col,
  cover
}`)

// project -> return one project only
export const PROJECT_QUERY = defineQuery(`*[ _type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  idx,
  year,
  tag,
  kind,
  client,
  role,
  stack,
  duration,
  live,
  col,
  keyVisual{ ..., "alt": alt },
  keyVisualBackground,
  "introduction": overview,
  disclaimer,
  sections[]{
    heading,
    body,
    images[]{
      ...,
      "alt": alt,
      "dimensions": asset->metadata.dimensions
    }
  },
  conclusion,
  "prev": *[_type == "project" && defined(idx) && idx < ^.idx] | order(idx desc)[0]{
    "slug": slug.current, idx, kind, title, year, col, cover
  },
  "next": *[_type == "project" && defined(idx) && idx > ^.idx] | order(idx asc)[0]{
    "slug": slug.current, idx, kind, title, year, col, cover
  }
}`)

// All slugs for generateStaticParams
export const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}`)
