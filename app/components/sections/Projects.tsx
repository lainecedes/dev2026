"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { urlFor } from "@/sanity/lib/image"
import { ProjectTileFallbacks, ProjectTiles, SiteAccent, type Project } from "@/app/components/shared/types"
const pad = (n: number) => String(n).padStart(2, "0")

export default function Projects({
    projects,
    accent = SiteAccent,
    italic = false,
}: {
    projects: Project[]
    accent?: string
    italic?: boolean
}) {
    const [active, setActive] = useState<number | null>(null)
    const count = pad(projects.length)
    const title = italic ? "text-custom-italic" : "text-custom"

    return (
        <section id="work" className="flex flex-col gap-8 relative px-8 pt-20 border-b border-dark/15">

            <div className="flex flex-col md:flex-row text-custom justify-between md:items-baseline gap-4 md:gap-0">
                <h2 className="font-display text-custom-italic text-5xl">Projects</h2>
                <div className="flex items-baseline gap-[14px]">
                    <span>{count} pieces · 2024–25</span>
                </div>
            </div>

            <div
                className="relative flex flex-col gap-10 md:grid md:gap-5"
                style={{ gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "repeat(10, 64px)" }}
            >
                {projects.slice(0, 4).map((p, i) => {
                    const t        = ProjectTiles[i]
                    const isActive = active === i
                    const kind     = p.tags?.[1] ?? p.tags?.[0] ?? "Work"

                    return (
                        <Link
                            key={p._id}
                            href={`/archive/${p.slug}`}
                            className={`relative block h-72 md:h-auto cursor-pointer transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${ProjectTileFallbacks[i]}`}
                            style={{
                                gridColumn: t.col,
                                gridRow:    t.row,
                                transform:  isActive
                                    ? "skewY(0deg) translate(0,0) scale(1.02)"
                                    : `skewY(${t.skew}deg) translate(${t.dx}px, ${t.dy}px)`,
                                zIndex:     isActive ? 3 : 1,
                            }}
                            onMouseEnter={() => setActive(i)}
                            onMouseLeave={() => setActive(null)}
                        >
                            <article className="relative h-full grid [grid-template-rows:auto_1fr_auto] gap-3 p-4
                                                border border-white/10 overflow-hidden
                                                shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                                <div className="flex justify-between items-baseline font-display text-custom text-[13px] opacity-80">
                                    <span>{p.idx ?? pad(i + 1)}</span>
                                    <span className="italic">{p.year ?? "'25"}</span>
                                </div>
                                <div className="relative overflow-hidden rounded-sm">
                                    {p.cover ? (
                                        <Image src={urlFor(p.cover).width(900).url()} alt={p.title} fill className="object-cover" />
                                    ) : (
                                        <div
                                            className="absolute inset-0 opacity-[0.22]"
                                            style={{ background: "repeating-linear-gradient(-35deg, currentColor 0 1px, transparent 1px 16px)" }}
                                        />
                                    )}
                                    <div className="absolute left-[10px] bottom-[10px] z-10 font-mono text-[9px] tracking-[0.12em] font-semibold
                                                   px-[6px] py-[3px] rounded-[3px] backdrop-blur-[6px]"
                                        style={{ background: "color-mix(in oklab, currentColor 15%, transparent)" }}
                                    >
                                        {kind.toUpperCase()}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className={`m-0 font-display ${title} text-2xl`}>{p.title}</h3>
                                    {p.tags?.[0] && <p className="m-0 text-[11px] opacity-70">{p.tags[0]}</p>}
                                </div>
                            </article>
                        </Link>
                    )
                })}
            </div>

            <div className="mb-20 flex flex-col items-center gap-3 text-center">
                <p className="m-0 max-w-full whitespace-nowrap text-sm leading-[1.45] text-mute md:text-base">
                    If you&rsquo;ve made it this far, you might as well keep going.
                </p>
                <Link
                    href="/archive"
                    className="group flex items-baseline gap-3 font-display text-custom-italic text-3xl text-dark transition-colors hover:text-accent md:text-5xl"
                >
                    <span>Browse the archive</span>
                    <span className="text-[0.72em] transition-transform group-hover:translate-x-1"> ↗</span>
                </Link>
            </div>

        </section>
    )
}
