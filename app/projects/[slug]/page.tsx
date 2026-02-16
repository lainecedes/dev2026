import { PortableText, type SanityDocument } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'

type Project = {
    title: string
    excerpt?: string
    slug: string
    cover?: never
    expertise: string[]
    tags: string[]
    body?: never[]
    date?: string
}

const PROJECT_QUERY = `*[
  _type == "project" &&
  slug.current == $slug &&
  !(_id in path("drafts.**"))
][0]{
  _id,
  title,
  excerpt,
  "slug": slug.current,
  cover,
  expertise,
  tags,
  body,
  date
}`

const options = { next: { revalidate: 30 } }

export default async function PostPage({ params, }: { params: { slug: string }
}) {
    const project = await client.fetch<Project>(PROJECT_QUERY, { slug: params.slug },
        { next: { revalidate: 30 } }
    )

    if (!project) return null

    const projectImageUrl = project.cover
        ? urlFor(project.cover).width(550).height(310).url()
        : null

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
            <Link href="/">← Back to posts</Link>

            {projectImageUrl && (
                <Image
                    src={projectImageUrl}
                    alt={project.title}
                    width={550}
                    height={310}
                    className="aspect-video rounded-xl"
                />
            )}

            <h1 className="text-4xl font-bold">{project.title}</h1>

            {Array.isArray(project.body) && (
                <PortableText value={project.body} />
            )}
        </main>
    )
}