export default function Marquee({
  items,
  reverse,
  accent,
  className = "bg-dark text-bg border-y border-white/10",
}: {
  items: string[];
  reverse?: boolean;
  accent: string;
  className?: string;
}) {
  const stream = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex items-center gap-6 md:gap-9 py-3 md:py-[18px] whitespace-nowrap
                    font-display font-bold tracking-tight50 text-3xl md:text-5xl
                    ${reverse ? "animate-scrollx-rev" : "italic animate-scrollx"}`}
      >
        {stream.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-9">
            <span>{t}</span>
            <span
              className={`w-3 h-3 flex-shrink-0 ${reverse ? "rotate-45" : "rounded-full"}`}
              style={{ background: accent }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
