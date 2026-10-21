import type { ProjectDetail } from "@/app/components/shared/types";

// "The short version" — preface that introduces the longer sections below.
export default function Overview({ project }: { project: ProjectDetail }) {
  if (!project.introduction) return null;

  return (
      <section className="px-8 pt-24 pb-12">
          <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-6">

                  <div className="flex items-center font-display text-custom-italic text-md">
                      <span className="flex-none w-8 h-px bg-rule"/>
                      The short version
                  </div>

                  <p className="m-0 font-display text-custom text-ink text-[clamp(28px,3vw,44px)] leading-[1.2] text-pretty">
                      {project.introduction}
                  </p>

                  <div className="flex items-baseline gap-[10px] mt-1 font-display italic text-mute text-[12.5px]">
                      <span className="text-ink">↓</span>
                      What it is, how I made it, what I learned
                  </div>
              </div>
          </div>
      </section>
  );
}
