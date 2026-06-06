export type ArchiveVariant = "stripes" | "grid" | "dots" | "flat" | "blocks" | "rule";

export type ArchiveItem = {
    id: string;
    idx: string;
    title: string;
    tag?: string;
    year: number;
    bg: string;
    fg: string;
    variant: ArchiveVariant;
    pin?: string;
    href?: string;
    cover?: object;
};

const Variants: ArchiveVariant[] = ["stripes", "grid", "dots", "flat", "blocks", "rule"];

export function variantFor(idx?: string): ArchiveVariant {
    const n = idx ? parseInt(idx, 10) || 0 : 0;
    return Variants[n % Variants.length];
}

const LightBg = new Set(["#F2EEE8", "#FFFFFF", "#FFF", "#FAFAFA"]);

export function fgFor(bg?: string): string {
    if (!bg) return "#F2EEE8";
    return LightBg.has(bg.toUpperCase()) ? "#141318" : "#F2EEE8";
}

// "'25" → 2025, "2025" → 2025, "25" → 2025
export function parseYear(raw?: string): number {
    if (!raw) return new Date().getFullYear();
    const stripped = raw.replace(/[^\d]/g, "");
    if (stripped.length === 2) return 2000 + parseInt(stripped, 10);
    if (stripped.length === 4) return parseInt(stripped, 10);
    return new Date().getFullYear();
}

export function groupByYear(items: ArchiveItem[]): [number, ArchiveItem[]][] {
    const map = new Map<number, ArchiveItem[]>();
    for (const item of items) {
        const list = map.get(item.year) ?? [];
        list.push(item);
        map.set(item.year, list);
    }
    return Array.from(map.entries())
        .sort(([a], [b]) => b - a)
        .map(([y, list]) => [y, list.sort((a, b) => a.idx.localeCompare(b.idx))] as [number, ArchiveItem[]]);
}

// Optional decorative caption shown next to the year band.
export const YearMood: Record<number, string> = {};
