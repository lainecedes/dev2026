"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { gsap } from "gsap"
// @ts-ignore
import { Draggable } from "gsap/Draggable"
import { urlFor } from "@/sanity/lib/image"
import { Project } from "@/app/components/shared/types"

type ProjectDraggableProps = {
    projects: Project[]
}

gsap.registerPlugin(Draggable)

export default function ProjectDraggable({ projects }: ProjectDraggableProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const boxesRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        boxesRef.current.forEach((box) => {
            if (!box || !containerRef.current) return

            // draggable inside container bounds
            Draggable.create(box, {
                bounds: containerRef.current,
                inertia: true,
                onPress() {
                    gsap.to(this.target, { zIndex: 10 })
                },
            })

            // hover scale
            const tween = gsap.to(box, { scale: 1.2, duration: 0.2, paused: true })
            box.addEventListener("mouseenter", () => tween.play())
            box.addEventListener("mouseleave", () => tween.reverse())
        })
    }, [])

    if (!projects || projects.length === 0) return null

    return (
        <section ref={containerRef} className="relative w-full h-screen">
            {projects.map((project, i) => (
                <div
                    key={project._id}
                    ref={(el) => (boxesRef.current[i] = el)}
                    className="
            absolute
            top-[10%] left-[10%]
            cursor-grab active:cursor-grabbing
            rounded-md
            w-[clamp(120px,20vw,240px)]
            aspect-3/2
          "
                >
                    <Image
                        src={urlFor(project.cover).width(1200).url()}
                        alt={project.title}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
            ))}
        </section>
    )
}