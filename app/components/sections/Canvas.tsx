"use client"

import ProjectDraggable from "@/app/components/dynamic/ProjectDraggable"
import { Project } from "@/app/types"

type CanvasProps = {
    projects: Project[]
}

export default function Canvas({ projects }: CanvasProps) {
    return (
        <main className="w-screen h-screen overflow-hidden bg-foreground">
            <ProjectDraggable projects={projects} />
        </main>
    )
}