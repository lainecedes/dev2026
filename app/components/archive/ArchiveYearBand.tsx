export default function ArchiveYearBand({ year, mood }: { year: number; mood?: string }) {
  return (
    <div className="grid grid-cols-[50px_1fr] gap-4 items-baseline pt-7 pb-2 mb-8
                    border-b border-rule font-display font-bold italic text-mute
                    max-md:grid-cols-[40px_1fr] md:mb-10">
      <span className="text-[22px] text-dark md:text-[28px]">'{String(year).slice(2)}</span>
      {mood && (
        <span className="font-sans font-medium not-italic text-[11px] tracking-[0.08em] text-mute">
          {mood}
        </span>
      )}
    </div>
  );
}
