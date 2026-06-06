import type { ProjectDetail } from "@/app/components/shared/types";

export default function Introduction({ project }: { project: ProjectDetail }) {
  if (!project.introduction) return null;

  return (
    <section className="px-5 pb-10 pt-14 sm:px-8 md:px-12 md:pb-14 md:pt-24 lg:px-16">
      <div className="grid max-w-[90rem] grid-cols-1 gap-6 lg:grid-cols-[3fr_9fr] lg:gap-16">
        <div className="flex items-center gap-3 self-start font-display text-custom-italic text-sm text-dark md:text-base">
          <span className="h-px w-8 flex-none bg-rule" />
          Introduction
        </div>

        <p className="m-0 max-w-[70ch] whitespace-pre-line text-lg leading-[1.55] text-dark text-pretty md:text-xl">
          {project.introduction}
        </p>
      </div>
    </section>
  );
}
