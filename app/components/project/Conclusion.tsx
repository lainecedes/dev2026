import type { ProjectDetail } from "@/app/components/shared/types";

export default function Conclusion({ project }: { project: ProjectDetail }) {
  if (!project.conclusion) return null;

  return (
    <section className="border-b border-rule px-5 py-14 sm:px-8 md:px-12 md:py-20 lg:px-16">
      <div className="grid max-w-[90rem] grid-cols-1 gap-6 lg:grid-cols-[3fr_9fr] lg:gap-16">
        <div className="flex items-center gap-3 self-start font-display text-custom-italic text-sm text-dark md:text-base">
          <span className="h-px w-8 flex-none bg-rule" />
          Conclusion
        </div>

        <p className="m-0 max-w-[70ch] whitespace-pre-line text-lg leading-[1.65] text-dark text-pretty md:text-xl">
          {project.conclusion}
        </p>
      </div>
    </section>
  );
}
