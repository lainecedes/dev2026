"use client";

import Image from "next/image";
import type { ProjectDetail } from "@/app/components/shared/types";
import { urlFor } from "@/sanity/lib/image";

export default function Sections({ project }: { project: ProjectDetail }) {
  const sections = project.sections ?? [];

  return (
    <section className="border-b border-rule px-5 pb-16 sm:px-8 md:px-12 md:pb-24 lg:px-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <nav className="sticky top-16 z-10 -mx-5 flex gap-4 overflow-x-auto border-y border-rule bg-bg px-5 py-3 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:top-24 lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0">
          {sections.map((s, i) => (
            <a
              key={s.heading}
              href={`#s${i}`}
              className="flex shrink-0 items-baseline gap-3 text-[12px] tracking-[0.06em] text-mute
                         transition-colors hover:text-dark"
            >
              <span className="font-display text-custom-italic text-[13px]">
                0{i + 1}
              </span>
              <span>{s.heading}</span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-12 md:gap-16">
          {sections.map((s, i) => (
            <article key={s.heading} id={`s${i}`} className="flex flex-col gap-4 scroll-mt-24">
              <h2 className="m-0 font-display text-custom text-3xl leading-none md:text-4xl">
                <span className="text-mute italic mr-2">0{i + 1} /</span>
                {s.heading}
              </h2>
              <p className="m-0 max-w-[62ch] text-base leading-[1.55] text-ink-2 text-pretty md:text-[17px]">
                {s.body}
              </p>
              {s.image?.asset && (
                <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden rounded-sm border border-rule sm:aspect-[16/9]">
                  <Image
                    src={urlFor(s.image).width(1400).url()}
                    alt={s.image.alt ?? s.heading}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
