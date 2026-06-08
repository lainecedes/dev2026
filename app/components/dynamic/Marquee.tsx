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
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center whitespace-nowrap py-3 will-change-transform md:py-[18px]
                    font-display font-bold tracking-tight50 text-3xl md:text-5xl
                    ${reverse ? "animate-scrollx-rev" : "italic animate-scrollx"}`}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            aria-hidden={group === 1}
            className="flex shrink-0 items-center gap-6 pr-6 md:gap-9 md:pr-9"
          >
            {items.map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-9">
                <span>{item}</span>
                <span
                  className={`h-3 w-3 shrink-0 ${reverse ? "rotate-45" : "rounded-full"}`}
                  style={{ background: accent }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
