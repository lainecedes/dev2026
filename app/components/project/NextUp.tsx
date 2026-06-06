import Link from "next/link";
import Image from "next/image";
import type { ProjectCard } from "@/app/components/shared/types";
import { urlFor } from "@/sanity/lib/image";

export default function NextUp({ prev, next }: { prev?: ProjectCard | null; next?: ProjectCard | null }) {
  const cards = (
    [
      { role: "prev" as const, p: prev },
      { role: "next" as const, p: next },
    ]
  ).filter((c): c is { role: "prev" | "next"; p: ProjectCard } => Boolean(c.p));

  if (cards.length === 0) return null;

  return (
    <section className="border-b border-rule px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-16">
      <div className="mb-8 flex items-baseline justify-between gap-6 text-[11px] tracking-[0.06em] text-mute">
        <span className="font-display italic font-medium text-dark text-[14px] tracking-normal">
          Keep poking around
        </span>
        <Link href="/archive" className="shrink-0 text-mute transition-colors hover:text-dark">
          See everything ↗
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {cards.map(({ role, p: q }) => {
          const bg = q.col ?? "#141318";
          const fg = bg === "#F2EEE8" ? "#141318" : "#F2EEE8";
          return (
            <Link
              key={role}
              href={`/archive/${q.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-rule"
              style={{ background: bg, color: fg }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: "repeating-linear-gradient(-35deg, currentColor 0 1px, transparent 1px 18px)" }}
              />

              {q.cover?.asset && (
                <>
                  <Image
                    src={urlFor(q.cover).width(1200).url()}
                    alt={`${q.title} cover`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/65 via-transparent to-dark/20" />
                </>
              )}

              <div className={`absolute left-4 top-4 z-10 text-[10px] font-semibold tracking-[0.12em] md:left-5 md:top-5 ${q.cover?.asset ? "text-bg" : ""}`}>
                {role === "prev" ? "← PREVIOUS" : "NEXT →"}
              </div>
              <div className={`absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 md:bottom-5 md:left-5 md:right-5 ${q.cover?.asset ? "text-bg" : ""}`}>
                <div className="min-w-0">
                  <div className="font-display font-bold tracking-tight50 text-[13px] opacity-70">
                    {q.idx} · {q.kind}
                  </div>
                  <div className="font-display text-custom text-3xl leading-[0.95]
                                  transition-transform duration-300 group-hover:-translate-y-[2px] sm:text-4xl lg:text-5xl">
                    {q.title}
                  </div>
                </div>
                <div className="shrink-0 font-display text-custom-italic text-[13px] opacity-70">
                  {q.year}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
