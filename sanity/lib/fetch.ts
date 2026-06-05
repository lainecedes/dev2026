import { cache } from 'react'
import { client } from './client'
import { PROJECTS_QUERY, PROJECT_QUERY } from './queries'
import type { Project } from '@/app/components/shared/types'

export const getProjects = cache(async (): Promise<Project[]> => {
    return client.fetch(PROJECTS_QUERY, {}, { next: { revalidate: 60 } })
})

export const getProject = cache(async (slug: string) => {
    return client.fetch(PROJECT_QUERY, { slug }, { next: { revalidate: 60 } })
})
