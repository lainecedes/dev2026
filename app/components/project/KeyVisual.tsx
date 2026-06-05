import type { ProjectDetail } from "@/app/components/shared/types";

export default function KeyVisual({ project }: { project: ProjectDetail }) {
  const p = project;
  return (
    <section className="border-b border-rule px-5 py-8 sm:px-8 md:px-12 md:py-12 lg:px-16">
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[16/9]
                   border border-rule shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]
                   text-bg"
        style={{ background: p.col ?? "#1A1820" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "repeating-linear-gradient(-35deg, currentColor 0 1px, transparent 1px 24px)" }}
        />
        <div className="absolute left-4 top-4 font-display text-custom text-[12px] opacity-80 md:left-6 md:top-6 md:text-[13px]">
          {p.idx} <span className="italic">{p.year}</span>
        </div>
        <div className="absolute bottom-4 left-4 font-sans text-[9px] font-semibold tracking-[0.12em] md:bottom-6 md:left-6 md:text-[10px]
                        px-2 py-1 rounded-[3px] backdrop-blur-[6px]
                        bg-[rgba(242,238,232,0.15)]">
          {p.kind?.toUpperCase() ?? "CASE"} — VISUALS
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-custom-italic text-5xl leading-none opacity-[0.22] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem]">
            {p.title}
          </span>
        </div>
      </div>
    </section>
  );
}
