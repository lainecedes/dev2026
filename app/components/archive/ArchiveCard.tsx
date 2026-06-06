"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { ArchiveItem } from "@/app/lib/archive";
import { urlFor } from "@/sanity/lib/image";
import ArchivePattern from "./ArchivePattern";

export default function ArchiveCard({ item }: { item: ArchiveItem }) {
  const p = item;
  const href = p.href ?? "#";
  const yearShort = `'${String(p.year).slice(2)}`;
  const [isActive, setIsActive] = useState(false);
  const direction = parseInt(p.idx, 10) % 2 === 0 ? 1 : -1;

  return (
    <Link
      href={href}
      className="group flex flex-col text-dark"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={
        {
          // Expose card colours as CSS vars in case anything inside wants to read them.
          ["--card-bg" as string]: p.bg,
          ["--card-fg" as string]: p.fg,
        } as React.CSSProperties
      }
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden border border-dark/15 transition-transform duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          background: p.bg,
          color: p.fg,
          transform: isActive
            ? "skewY(0deg) translate(0, 0) scale(1.015)"
            : `skewY(${direction * 0.6}deg) translate(${direction * 3}px, ${direction * -2}px)`,
        }}
      >
        <ArchivePattern variant={p.variant} />

        {p.cover && (
          <Image
            src={urlFor(p.cover).width(1200).url()}
            alt={`${p.title} cover`}
            fill
            className="object-cover"
          />
        )}

        <span
          className="absolute left-4 top-[14px] z-10 bg-dark/45 px-2 py-1 font-display text-custom text-[12px] text-bg backdrop-blur-sm"
        >
          {p.idx}
        </span>

        {p.pin ? (
          <span className="absolute right-4 top-[14px] z-10 inline-flex items-center gap-[6px]
                           text-[9.5px] font-semibold tracking-[0.1em] px-2 py-[3px]
                           bg-dark/25 text-bg backdrop-blur-[6px]">
            <span className="w-[5px] h-[5px] rounded-full bg-current" />
            {p.pin}
          </span>
        ) : (
          <span
            className="absolute right-4 top-[14px] z-10 bg-dark/45 px-2 py-1 font-display text-custom-italic text-[12px] text-bg backdrop-blur-sm"
          >
            {yearShort}
          </span>
        )}
      </div>

      <div className="mt-10 flex flex-col md:mt-8">
        <div className="flex items-end justify-between gap-4">
          <h3 className="m-0 font-display text-custom-italic text-3xl leading-none text-dark transition-colors duration-200 group-hover:text-accent sm:text-4xl">
            {p.title}
          </h3>
          <span className="hidden shrink-0 text-[11px] tracking-[0.08em] text-mute tabular-nums md:inline">
            {yearShort} ↗
          </span>
        </div>

        {p.tag && (
          <p className="m-0 mt-4 max-w-[44ch] font-display text-[14px] font-medium italic leading-[1.42]
                        text-ink-2 text-pretty
                        before:content-['—_'] before:text-accent md:mt-2 md:text-[15px]">
            {p.tag}
          </p>
        )}

        <span className="mt-3 self-end text-[11px] tracking-[0.08em] text-mute tabular-nums md:hidden">
          {yearShort} ↗
        </span>
      </div>
    </Link>
  );
}
