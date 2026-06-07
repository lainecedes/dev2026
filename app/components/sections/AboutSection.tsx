import Image from "next/image"
import { DefaultProof, type AboutSectionProps } from "@/app/components/shared/types"

export default function AboutSection({
    photoSrc,
    photoAlt = "Portrait",
    photoCaption = "this is me, allegedly",
    proof = DefaultProof,
    className = "",
}: AboutSectionProps) {
    return (
        <div className={`bg-bg font-body text-sm leading-relaxed text-dark antialiased ${className}`}>
            <section
                id="about"
                className="grid grid-cols-1 items-start gap-10 border-b border-dark/15 px-5 py-14 md:grid-cols-[5fr_7fr] md:gap-14 md:px-12 md:py-20"
            >
                <div className="flex flex-col md:min-h-130">
                    <h2 className="font-display text-custom text-5xl text-dark sm:text-6xl lg:text-8xl">
                        Builds things<br />with <span className="text-accent">grit.</span>
                    </h2>

                    <div className="relative mx-auto mt-10 w-56 -rotate-3 bg-white px-4 pb-14 pt-4 shadow-xl transition duration-300 ease-out hover:-translate-y-2 hover:-rotate-1 hover:scale-[1.02] hover:shadow-2xl motion-reduce:transition-none md:mb-4 md:mr-[-1.5rem] md:mt-auto md:w-64">
                        <span
                            aria-hidden
                            className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 border-x border-dashed border-dark/15 bg-accent/50 mix-blend-multiply"
                        />
                        <div className="relative aspect-square w-full overflow-hidden bg-accent">
                            <span
                                aria-hidden
                                className="absolute inset-0 opacity-25"
                                style={{ background: "repeating-linear-gradient(-35deg, currentColor 0 1px, transparent 1px 16px)" }}
                            />
                            {photoSrc ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={photoSrc}
                                    alt={photoAlt}
                                    className="relative z-10 block h-full w-full origin-bottom translate-y-2 scale-[1.8] object-contain object-bottom"
                                />
                            ) : (
                                <Image
                                    src="/polaroid.png"
                                    alt={photoAlt}
                                    fill
                                    className="z-10 origin-bottom translate-y-10 scale-[1.8] object-contain object-bottom"
                                    sizes="220px"
                                />
                            )}
                        </div>
                        <div className="absolute bottom-3 left-4 z-20 max-w-32 font-display text-xs font-medium italic leading-tight text-dark">
                            {photoCaption}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 md:pt-16">
                    <p className="text-lg text-dark text-pretty">
                        I'm Elaine Wilberforce, also known as Lainey, a creative developer from Amsterdam.
                        I studied Communication and Multimedia Design at the Amsterdam University of Applied Sciences,
                        which is where I got into building things for the web and decided it was worth sticking with.
                        I like making stuff that's interactive, fun, and actually usable. </p>

                    <p className="text-lg text-dark text-pretty"> Good design shouldn't be dull or boring
                        so I try to make sure<span className="font-display text-custom text-dark"> it's neither</span>.
                        When I'm not at my desk, I'm probably in the kitchen cooking my way around the world,
                        perfecting the art of makeup, or looking for noise with bass that gets a bit out of hand.
                    </p>

                </div>
            </section>

            <section className="relative overflow-hidden border-b border-dark/15 px-5 py-14 md:px-12 md:py-20">
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-12 top-16 z-0 select-none font-display text-custom-italic text-7xl leading-none text-transparent opacity-10 [-webkit-text-stroke:1px_var(--color-dark)] md:text-8xl lg:text-9xl"
                >
                    Proof.
                </span>

                <div className="relative">
                    <div className="mb-7 flex items-baseline justify-between pb-3 text-mute">
                        <span className="font-display text-custom text-sm text-dark">PROOF</span>
                    </div>

                    <div className="flex flex-col">
                        {proof.map((e) => (
                            <div
                                key={e.year + e.title}
                                className="group relative grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-6 border-b border-dark/15 py-6 transition duration-200 hover:bg-card hover:px-2 md:grid-cols-[9rem_1fr_auto]"
                            >
                                <span className="font-display text-custom-italic text-xl text-mute tabular-nums transition duration-200 group-hover:translate-x-0.5 group-hover:text-dark md:text-2xl">
                                    {e.year}
                                </span>
                                <span className="flex flex-col gap-2">
                                    <span className="font-display text-custom text-2xl">
                                        {e.title}
                                    </span>
                                    <span className="max-w-[68ch] text-xs leading-relaxed text-dark">{e.tag}</span>
                                </span>
                                <span className="size-2 self-center justify-self-end rounded-full bg-accent transition duration-300 group-hover:scale-150 group-hover:ring-4 group-hover:ring-accent/20" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
