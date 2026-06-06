import type { ProjectDetail } from "@/app/components/shared/types";

// 3×2 colophon: Year · Role · Stack / Client · Duration · Live
// Collapses to 2×3 below md.
export default function Colophon({ project }: { project: ProjectDetail }) {
  const p = project;
  const liveValue = p.live?.trim();
  const liveHref = liveValue && liveValue !== "—"
    ? /^https?:\/\//i.test(liveValue)
      ? liveValue
      : `https://${liveValue}`
    : null;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Year", value: p.year ?? "—" },
    { label: "Role", value: p.role?.join(" · ") ?? "—" },
    { label: "Stack", value: p.stack?.join(" · ") ?? "—" },
    { label: "Client", value: p.client ?? "—" },
    { label: "Duration", value: p.duration ?? "—" },
    {
      label: "Live",
      value: liveHref ? (
        <a
          href={liveHref}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-current transition-colors hover:text-accent"
        >
          {liveValue?.replace(/^https?:\/\//i, "")} ↗
        </a>
      ) : (
        <span className="text-mute">—</span>
      ),
    },
  ];

  return (
    <ul
      className="m-0 grid list-none grid-cols-1 gap-5 p-0 text-dark sm:grid-cols-2 md:grid-cols-3 md:gap-6"
    >
      {rows.map((r) => (
        <li key={r.label} className="flex min-w-0 flex-col gap-2">
          <span className="font-display italic font-medium text-mute text-[12px] tracking-[0.01em]">
            {r.label}
          </span>
          <span className="break-words text-[14px] font-medium leading-[1.35]">{r.value}</span>
        </li>
      ))}
    </ul>
  );
}
