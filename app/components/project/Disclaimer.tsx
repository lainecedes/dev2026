import type { ProjectDetail } from "@/app/components/shared/types";

export default function Disclaimer({ project }: { project: ProjectDetail }) {
  if (!project.disclaimer) return null;

  return (
    <aside className="px-5 pb-12 sm:px-8 md:px-12 md:pb-16 lg:px-16">
      <div className="relative overflow-hidden bg-dark px-5 py-7 text-bg sm:px-7 md:px-10 md:py-10">
        <span
          aria-hidden="true"
          className="absolute -bottom-8 -right-2 select-none font-display text-custom-italic text-[10rem] leading-none text-accent opacity-25 sm:text-[13rem] md:-bottom-12 md:text-[18rem]"
        >
          !
        </span>

        <div className="relative z-10 grid gap-5 md:grid-cols-[180px_1fr] md:gap-10">
          <div className="flex items-center gap-3 self-start">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent font-display text-custom-italic text-2xl text-dark">
              !
            </span>
            <span className="font-display text-custom-italic text-xl text-accent">
              Disclaimer
            </span>
          </div>

          <p className="m-0 max-w-[70ch] whitespace-pre-line text-base leading-[1.65] text-bg md:text-lg">
            {project.disclaimer}
          </p>
        </div>
      </div>
    </aside>
  );
}
