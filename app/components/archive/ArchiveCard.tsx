import Link from "next/link";
import type { ArchiveItem } from "@/app/lib/archive";
import ArchivePattern from "./ArchivePattern";

export default function ArchiveCard({ item }: { item: ArchiveItem }) {
  const p = item;
  const href = p.href ?? "#";
  const yearShort = `'${String(p.year).slice(2)}`;

  return (
    <Link
      href={href}
      className="group flex flex-col gap-[14px] text-dark transition-transform duration-250 hover:-translate-y-[3px]"
      style={
        {
          // Expose card colours as CSS vars in case anything inside wants to read them.
          ["--card-bg" as string]: p.bg,
          ["--card-fg" as string]: p.fg,
        } as React.CSSProperties
      }
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-dark/15
                   shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
        style={{ background: p.bg, color: p.fg }}
      >
        <ArchivePattern variant={p.variant} />

        <span className="absolute left-4 top-[14px] font-display text-custom text-[12px] opacity-[0.78]">
          {p.idx}
        </span>

        {p.pin ? (
          <span className="absolute right-4 top-[14px] inline-flex items-center gap-[6px]
                           text-[9.5px] font-semibold tracking-[0.1em] px-2 py-[3px] rounded-full
                           bg-[rgba(242,238,232,0.16)] backdrop-blur-[6px]">
            <span className="w-[5px] h-[5px] rounded-full bg-current" />
            {p.pin}
          </span>
        ) : (
          <span className="absolute right-4 top-[14px] font-display text-custom-italic text-[12px] opacity-[0.78]">
            {yearShort}
          </span>
        )}

        <span className="absolute left-[18px] right-[18px] bottom-[18px] font-display font-bold italic
                         leading-[0.92] text-balance
                         text-3xl sm:text-4xl lg:text-5xl xl:text-4xl 2xl:text-5xl">
          {p.title}
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-4 text-[11px] tracking-[0.08em] text-mute">
        <span className="font-sans text-[13px] font-medium tracking-[0.02em] text-dark">{p.tag}</span>
        <span className="tabular-nums">{yearShort} ↗</span>
      </div>

      {p.note && (
        <p className="m-0 font-display font-medium italic text-[15px] leading-[1.42]
                      text-ink-2 text-pretty max-w-[44ch]
                      before:content-['—_'] before:text-accent">
          {p.note}
        </p>
      )}
    </Link>
  );
}
