// app/archive/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { ProjectDetail } from "@/app/components/shared/types";

import Marquee from "@/app/components/dynamic/Marquee";
import DetailHero from "@/app/components/project/DetailHero";
import KeyVisual from "@/app/components/project/KeyVisual";
import Introduction from "@/app/components/project/Introduction";
import Disclaimer from "@/app/components/project/Disclaimer";
import Sections from "@/app/components/project/Sections";
import Conclusion from "@/app/components/project/Conclusion";
import NextUp from "@/app/components/project/NextUp";
import { SiteAccent } from "@/app/components/shared/types";

export async function generateStaticParams() {
    const slugs = await client.fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY);
    return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
    const { slug } = await params;
    const { data: project } = await sanityFetch({ query: PROJECT_QUERY, params: { slug } });
    if (!project) return { title: "Not found — Lainey" };
    return {
        title: `${project.title} — Lainey`,
        description: project.tag ?? undefined,
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data } = await sanityFetch({ query: PROJECT_QUERY, params: { slug } });
    if (!data) notFound();

    const project = data as ProjectDetail;

    return (
        <div className="relative z-[1]">
            <DetailHero project={project} accent={SiteAccent} />
            <KeyVisual project={project} />

            <Marquee
                reverse={false}
                accent={SiteAccent}
                items={[
                    project.title,
                    project.kind,
                    project.client,
                    project.role?.join(" + "),
                    "A note to self",
                    project.year,
                ].filter((x): x is string => Boolean(x))}
            />

            <Introduction project={project} />
            <Disclaimer project={project} />
            <Sections project={project} />
            <Conclusion project={project} />
            <NextUp prev={project.prev} next={project.next} />
        </div>
    );
}
