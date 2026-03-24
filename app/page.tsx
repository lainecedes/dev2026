import { client } from "@/sanity/lib/client"
import Canvas from "@/app/components/sections/Canvas"
import { PROJECTS_QUERY } from "@/sanity/lib/queries"
import { Project } from "@/app/components/shared/types"

const options = { next: { revalidate: 60 } }

export default async function Index() {
    const projects: Project[] = await client.fetch(PROJECTS_QUERY, {}, options)
    return <Canvas projects={projects} />
}