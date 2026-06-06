import type { ReactNode } from "react"

export type Project = {
    _id: string
    slug: string
    title: string
    cover: object | string
    tags?: string[]
}

export type MainProps = {
    children: ReactNode
}

export type NavLink = {
    label: string
    href: string
}

export type FooterLinkGroup = {
    title: string
    links: NavLink[]
}

export type HeroRect = {
    size: string
    color: string
    opacity: string
    rotate: string
    floatY: number
    duration: number
    delay: number
    top?: string
    right?: string
    bottom?: string
    left?: string
}

export type ProjectTile = {
    col: string
    row: string
    skew: number
    dx: number
    dy: number
}

export type WorkProject = {
    idx: string
    title: string
    tag: string
    year: string
    kind: string
    col: string
}

export type WorkTile = {
    col: string
    row: string
    skew: number
    drift: readonly [number, number]
}

export type ProofItem = {
    year: string
    title: string
    tag: string
    highlight?: boolean
}

export type AboutSectionProps = {
    accent?: string
    meta?: string
    photoSrc?: string
    photoAlt?: string
    photoCaption?: string
    proof?: ProofItem[]
    className?: string
}

export const SiteAccent = "var(--color-accent)"

export const HomeGrid = {
    density: 14,
    mobileDensity: 6,
    distortion: 24,
}

export const DesktopNavLinks: NavLink[] = [
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/#contact" },
]

export const MobileNavLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/#work" },
    { label: "Archive", href: "/archive" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
]

export const FooterLinkGroups: FooterLinkGroup[] = [
    {
        title: "Internal",
        links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/#about" },
            { label: "Projects", href: "/#work" },
            { label: "Archive", href: "/archive" },
        ],
    },
    {
        title: "External",
        links: [
            { label: "Github", href: "https://github.com/lainecedes" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/elainewilberforce/" },
        ],
    },
]

export const FooterEmail = "hi@laineyforce.com"

export const HeroRects: HeroRect[] = [
    { size: "w-32 h-48 md:w-48 md:h-72", color: "bg-card", opacity: "opacity-60", top: "10%", left: "8%", rotate: "-12deg", floatY: 15, duration: 2.5, delay: 0 },
    { size: "w-20 h-32 md:w-32 md:h-48", color: "bg-accent", opacity: "opacity-20", top: "25%", right: "12%", rotate: "8deg", floatY: 20, duration: 3.0, delay: 0.4 },
    { size: "w-40 h-24 md:w-64 md:h-40", color: "bg-card", opacity: "opacity-40", bottom: "30%", right: "6%", rotate: "-5deg", floatY: 12, duration: 2.0, delay: 0.2 },
    { size: "w-24 h-36 md:w-40 md:h-56", color: "bg-accent", opacity: "opacity-15", bottom: "15%", left: "15%", rotate: "6deg", floatY: 18, duration: 3.5, delay: 0.6 },
]

export const ProjectTiles: ProjectTile[] = [
    { col: "2 / span 4", row: "1 / span 3", skew: -1.2, dx: -6, dy: 4 },
    { col: "7 / span 5", row: "2 / span 4", skew: 0.8, dx: 8, dy: -10 },
    { col: "1 / span 5", row: "5 / span 4", skew: -0.4, dx: -2, dy: 12 },
    { col: "8 / span 4", row: "7 / span 3", skew: 1.4, dx: 10, dy: 6 },
]

export const ProjectTileFallbacks = [
    "bg-dark text-bg",
    "bg-accent text-bg",
    "bg-accent text-bg",
    "bg-dark text-bg",
]

export const DefaultProof: ProofItem[] = [
    { year: "2025-2026", title: "Cybersoek", tag: "An organization dedicated to digital independence for all, the perfect place for my grad project.", highlight: true },
    { year: "2025", title: "Clappform", tag: "Front-end internship at a platform serving the public sector." },
    { year: "2024–2025", title: "Go2People", tag: "Front-end internship. One of few agencies where sustainability includes the digital footprint." },
    { year: "2021–2026", title: "AUAS — Communication and Multimedia Design", tag: "The place where I learned to disagree with my own designs." },
    { year: "2017–2021", title: "ROCvA - Technicus Engineering niv 4", tag: "Practical before digital." },
]

export const WorkProjects: WorkProject[] = [
    { idx: "01", title: "Tenderpoint", tag: "Record label microsite", year: "'25", kind: "Site + identity", col: "#1A1820" },
    { idx: "02", title: "Offbeat OS", tag: "Experimental interface system", year: "'25", kind: "Product / R&D", col: "#B794FF" },
    { idx: "03", title: "Halfstep FM", tag: "Live broadcast player", year: "'24", kind: "Audio / web", col: "#F2EEE8" },
    { idx: "04", title: "Gridwarp", tag: "Type specimen + motion toy", year: "'24", kind: "Creative coding", col: "#141318" },
]

export const WorkTiles: WorkTile[] = [
    { col: "2 / span 4", row: "1 / span 3", skew: -1.2, drift: [-6, 4] },
    { col: "7 / span 5", row: "2 / span 4", skew: 0.8, drift: [8, -10] },
    { col: "1 / span 5", row: "5 / span 4", skew: -0.4, drift: [-2, 12] },
    { col: "8 / span 4", row: "7 / span 3", skew: 1.4, drift: [10, 6] },
]

export type ProjectCard = {
    slug: string
    idx?: string
    kind?: string
    title: string
    year?: string
    col?: string
    cover?: ProjectImage | null
}

export type ProjectImage = {
    asset?: { _ref: string; _type: string }
    dimensions?: {
        width: number
        height: number
        aspectRatio: number
    }
    alt?: string
}

export type ProjectSection = {
    heading: string
    body: string
    images?: ProjectImage[]
}

export type ProjectDetail = {
    _id: string
    slug: string
    title: string
    idx?: string
    year?: string
    tag?: string
    kind?: string
    client?: string
    role?: string[]
    stack?: string[]
    duration?: string
    live?: string
    col?: string
    keyVisual?: ProjectImage | null
    keyVisualBackground?: string
    introduction?: string
    disclaimer?: string
    sections?: ProjectSection[]
    conclusion?: string
    prev?: ProjectCard | null
    next?: ProjectCard | null
}
