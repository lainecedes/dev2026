import WarpGrid from "@/app/components/dynamic/WarpGrid";

export default function ArchiveHero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-20 md:pb-0 md:pt-24 lg:pt-28">
      <WarpGrid density={13} distortion={18} />
      <div className="relative z-10 flex min-h-[52svh] flex-col justify-center gap-7 px-5 py-10 sm:px-8 md:gap-8 md:px-12 md:py-14 lg:min-h-[58svh] lg:px-16">

        <h1 className="m-0 font-display text-custom text-7xl text-dark text-balance sm:text-8xl md:text-8xl lg:text-9xl xl:text-[10rem]">
          The <em className="text-custom-italic text-accent">Archive.</em>
        </h1>

        <div className="max-w-280 font-display text-custom text-lg text-dark text-pretty sm:text-2xl md:text-3xl lg:text-4xl">
          <p className="m-0 mb-3">
            Everything I've made and kept around, in roughly the order I made it.
            Some I'm still proud of, some I keep because they taught me something,
            a couple I keep because they make me laugh.
          </p>
          <p className="m-0">No filters, no categories. Just scroll.</p>
        </div>
      </div>
    </section>
  );
}
