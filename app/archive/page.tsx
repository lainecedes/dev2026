// /archive — index of every project, fetched from Sanity.

import Marquee from "@/app/components/dynamic/Marquee";

import ArchiveHero from "@/app/components/archive/ArchiveHero";
import ArchiveList from "@/app/components/archive/ArchiveList";

import { sanityFetch } from "@/sanity/lib/live";
import { ARCHIVE_QUERY } from "@/sanity/lib/queries";
import {
    type ArchiveItem,
    fgFor,
    parseYear,
    variantFor,
} from "@/app/lib/archive";
import { SiteAccent } from "@/app/components/shared/types";

export const metadata = {
    title: "The Archive — Lainey",
    description: "Everything I've made and kept around.",
};

type ArchiveProject = {
    _id: string;
    slug: string;
    idx?: string;
    year?: string;
    title?: string;
    tag?: string;
    kind?: string;
    col?: string;
    description?: string;
};

function toArchiveItem(p: ArchiveProject): ArchiveItem {
    const bg = p.col ?? "#1A1820";
    return {
        id: p._id,
        idx: p.idx ?? "00",
        title: p.title ?? "Untitled",
        tag: p.tag ?? p.kind,
        year: parseYear(p.year),
        bg,
        fg: fgFor(bg),
        variant: variantFor(p.idx),
        note: p.description,
        href: `/archive/${p.slug}`,
    };
}

export default async function ArchivePage() {
    const { data } = await sanityFetch({ query: ARCHIVE_QUERY });
    const items = (data ?? []).map(toArchiveItem);

    return (
        <div className="relative z-[1]">
            <ArchiveHero />

            <Marquee
                reverse={false}
                accent={SiteAccent}
                items={[
                    "Notes to self",
                    "Things I'm proud of",
                    "Things I learned from",
                    "Long walks, longer commits",
                    "Built in bedrooms",
                    "Still running",
                    "Quietly proud",
                ]}
            />

            <ArchiveList items={items} />
        </div>
    );
}
