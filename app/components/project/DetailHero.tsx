import Link from "next/link";
import type { ProjectDetail } from "@/app/components/shared/types";
import WarpGrid from "@/app/components/dynamic/WarpGrid";
import Colophon from "./Colophon";

export default function DetailHero({ project, accent }: { project: ProjectDetail; accent: string }) {
  const p = project;
  return (
      <section className="relative overflow-hidden border-b border-rule">
          <WarpGrid density={13} distortion={18} accent={accent}/>
          <div className="relative z-[1] grid min-h-[58svh] grid-rows-[auto_1fr_auto] gap-6 px-5 pb-8 pt-20 sm:px-8 md:min-h-[64svh] md:gap-7 md:px-12 md:pb-10 md:pt-24 lg:px-16">
              <div className="flex justify-between text-[12px]">
                  <Link href="/archive" className="border-b border-rule text-dark transition-colors hover:text-accent">
                      ← Back
                  </Link>
              </div>

              <div className="flex flex-col justify-center gap-3">
                  <h1 className="m-0 max-w-[11ch] font-display text-custom-italic text-6xl text-dark text-balance sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
                      {p.title}
                  </h1>
                  {p.tag && (
                      <span className="font-display text-custom-italic text-xl text-mute md:text-2xl">
                          {p.tag}
                      </span>
                  )}
              </div>

              <Colophon project={p}/>
          </div>
      </section>
  );
}
