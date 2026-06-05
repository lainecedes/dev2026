"use client";

import { useState, CSSProperties } from "react";
import { WorkProjects, WorkTiles } from "@/app/components/shared/types";

export default function Work({ accent, italic }: { accent: string; italic: boolean }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="relative px-8 pt-[72px] pb-12 border-b border-rule">
      <header className="flex justify-between items-baseline border-b border-rule pb-3 mb-10
                         text-[11px] tracking-[0.06em] text-mute">
        <div className="flex items-baseline gap-[14px]">
          <span className="font-display font-bold italic text-[14px] tracking-tight50 text-ink">§ 02</span>
          <span className="font-display font-bold text-[14px] tracking-tight50 text-ink">Selected work</span>
        </div>
        <div className="flex items-baseline gap-[14px]">
          <span>04 pieces · 2024–25</span>
          <span className="inline-block w-6 h-px bg-rule" />
          <span>Index below — hover to inspect</span>
        </div>
      </header>

      <div className="relative grid gap-5 mb-20"
           style={{ gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "repeat(10, 64px)" }}>
        {WorkProjects.map((p, i) => {
          const t = WorkTiles[i];
          const isActive = active === i;
          const style: CSSProperties = {
            gridColumn: t.col,
            gridRow: t.row,
            transform: isActive
              ? "skewY(0deg) translate(0,0) scale(1.02)"
              : `skewY(${t.skew}deg) translate(${t.drift[0]}px, ${t.drift[1]}px)`,
            transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
            zIndex: isActive ? 3 : 1,
            background: p.col,
            color: p.col === "#F2EEE8" ? "#141318" : "#F2EEE8",
          };
          return (
            <article
              key={p.idx}
              className="relative cursor-pointer"
              style={style}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="relative h-full grid [grid-template-rows:auto_1fr_auto] gap-3 p-4
                              border border-rule overflow-hidden
                              shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <div className="flex justify-between items-baseline font-display font-bold tracking-tight50 text-[13px] opacity-80">
                  <span>{p.idx}</span>
                  <span className="italic">{p.year}</span>
                </div>
                <div className="relative overflow-hidden rounded-sm">
                  <div className="absolute inset-0 opacity-[0.22]"
                       style={{
                         background: "repeating-linear-gradient(-35deg, currentColor 0 1px, transparent 1px 16px)",
                       }} />
                  <div className="absolute left-[10px] bottom-[10px] font-sans text-[9px] tracking-[0.12em] font-semibold
                                  px-[6px] py-[3px] rounded-[3px] backdrop-blur-[6px]"
                       style={{ background: "color-mix(in oklab, currentColor 15%, transparent)" }}>
                    {p.kind.toUpperCase()}
                  </div>
                </div>
                <div className="flex flex-col gap-[3px]">
                  <h3 className={`m-0 font-display font-bold tracking-tight50 text-[22px] leading-none ${italic ? "italic" : ""}`}>
                    {p.title}
                  </h3>
                  <p className="m-0 text-[11px] opacity-70">{p.tag}</p>
                </div>
                <div className={`absolute right-4 top-4 font-sans text-[10px] tracking-[0.1em] font-semibold
                                 transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
                  OPEN CASE →
                </div>
              </div>
            </article>
          );
        })}
        <div
          className={`self-center justify-self-center font-display font-bold italic text-[96px] leading-[0.9]
                      tracking-tight50 text-ink opacity-[0.08] pointer-events-none text-center ${italic ? "italic" : ""}`}
          style={{ gridColumn: "6 / span 2", gridRow: "5 / span 2" }}
        >
          No.<br />{String(WorkProjects.length).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-col border-t border-rule">
        {WorkProjects.map((p) => (
          <a
            key={p.idx}
            href="#"
            className="grid items-baseline gap-[14px] py-[14px] border-b border-rule
                       font-sans transition-[background,padding] duration-200
                       hover:bg-paper2 hover:px-2
                       [grid-template-columns:50px_minmax(120px,auto)_1fr_minmax(140px,auto)_50px_20px]
                       group"
          >
            <span className="font-display font-bold italic text-[13px] tracking-tight50 text-mute">{p.idx}</span>
            <span className={`font-display font-bold tracking-tight50 text-[28px] leading-none ${italic ? "italic" : ""}`}>
              {p.title}
            </span>
            <span className="led-dots" />
            <span className="text-[12px] text-mute">{p.tag}</span>
            <span className="text-[12px] text-mute tabular-nums">{p.year}</span>
            <span className="text-[18px] transition-transform duration-250 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                  style={{ color: accent }}>↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
