import type { ProjectDetail } from "@/app/components/shared/types";

// "The short version" — preface that introduces the longer sections below.
export default function Overview({ project }: { project: ProjectDetail }) {
  return (
      <section className="px-5 pb-10 pt-14 sm:px-8 md:px-12 md:pb-12 md:pt-24 lg:px-16">
          <div className="flex max-w-[76rem] flex-col items-start gap-8">
              <div className="flex flex-col gap-6">

                  <div className="flex items-center gap-3 font-display text-custom-italic text-sm text-dark md:text-base">
                      <span className="flex-none w-8 h-px bg-rule"/>
                      The short version
                  </div>

                  <p className="m-0 font-display text-custom text-dark text-3xl leading-[1.12] text-pretty sm:text-4xl md:text-5xl">
                      {project.overview}
                  </p>

                  <div className="flex items-baseline gap-[10px] mt-1 font-display italic text-mute text-[12.5px]">
                      <span className="text-dark">↓</span>
                      What it is, how I made it, what I learned
                  </div>
              </div>
          </div>
      </section>
  );
}
