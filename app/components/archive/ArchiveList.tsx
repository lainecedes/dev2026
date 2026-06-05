import type { ArchiveItem } from "@/app/lib/archive";
import { groupByYear, YearMood } from "@/app/lib/archive";
import ArchiveCard from "./ArchiveCard";
import ArchiveYearBand from "./ArchiveYearBand";

export default function ArchiveList({ items }: { items: ArchiveItem[] }) {
  const groups = groupByYear(items);

  if (groups.length === 0) {
    return (
      <section className="px-8 py-24 text-center font-display italic text-[22px] text-mute">
        Nothing in the shelf yet.
      </section>
    );
  }

  return (
    <section className="px-5 pb-16 pt-9 sm:px-8 md:px-12 md:pb-24 md:pt-14 lg:px-16">
      {groups.map(([year, list]) => (
        <div key={year} className="mb-12 last:mb-0 md:mb-16">
          <ArchiveYearBand year={year} mood={YearMood[year]} />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-14 xl:grid-cols-3 xl:gap-x-10 2xl:gap-x-12">
            {list.map((p) => (
              <ArchiveCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
