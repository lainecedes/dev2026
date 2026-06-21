import Image from "next/image";
import type { ProjectDetail } from "@/app/components/shared/types";
import { urlFor } from "@/sanity/lib/image";

function isLightHexColor(color?: string) {
  const hex = color?.trim().replace("#", "");
  if (!hex || !/^[0-9a-f]{3}([0-9a-f]{3})?$/i.test(hex)) return false;

  const normalized = hex.length === 3
    ? hex.split("").map((char) => char + char).join("")
    : hex;

  const red = parseInt(normalized.slice(0, 2), 16) / 255;
  const green = parseInt(normalized.slice(2, 4), 16) / 255;
  const blue = parseInt(normalized.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  return luminance > 0.68;
}

export default function KeyVisual({ project }: { project: ProjectDetail }) {
  const p = project;
  const background = p.keyVisualBackground ?? p.col ?? "var(--color-dark)";
  const foreground = isLightHexColor(background) ? "var(--color-dark)" : "var(--color-bg)";
  const badgeBackground = `color-mix(in oklab, ${foreground} 12%, transparent)`;

  return (
    <section className="border-b border-rule px-5 py-8 sm:px-8 md:px-12 md:py-12 lg:px-16">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[16/9]
                   border border-rule shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        style={{ background, color: foreground }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "repeating-linear-gradient(-35deg, currentColor 0 1px, transparent 1px 24px)" }}
        />

        {p.keyVisual?.asset ? (
          <div className="absolute inset-5 md:inset-10 lg:inset-14">
            <Image
              src={urlFor(p.keyVisual).width(2000).url()}
              alt={p.keyVisual.alt ?? p.title}
              fill
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-display text-custom-italic text-5xl leading-none opacity-[0.22] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem]">
              {p.title}
            </span>
          </div>
        )}

        <div className="absolute left-4 top-4 z-10 font-display text-custom text-[12px] opacity-80 md:left-6 md:top-6 md:text-[13px]">
          {p.idx} <span className="italic">{p.year}</span>
        </div>
        <div className="absolute bottom-4 left-4 z-10 font-sans text-[9px] font-semibold tracking-[0.12em] md:bottom-6 md:left-6 md:text-[10px]
                        px-2 py-1 rounded-[3px] backdrop-blur-[6px]"
             style={{ background: badgeBackground }}>
          {p.kind?.toUpperCase() ?? "CASE"} — VISUALS
        </div>
      </div>
    </section>
  );
}
