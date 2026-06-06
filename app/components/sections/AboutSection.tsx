import { DefaultProof, SiteAccent, type AboutSectionProps } from "@/app/components/shared/types"

export default function AboutSection({
    accent = SiteAccent,
    photoSrc,
    photoAlt = "Portrait",
    photoCaption = "this is me, allegedly",
    proof = DefaultProof,
    className = "",
}: AboutSectionProps) {
    return (
        <div
            className={`bg-bg text-dark font-body text-[15px] leading-[1.45] antialiased ${className}`}
            style={{ ["--accent" as string]: accent }} >

            {/* 1 · Intro card */}
            <section
                id="about"
                className="grid grid-cols-1 md:grid-cols-[5fr_7fr] items-start gap-10 md:gap-14 px-5 md:px-12 py-14 md:py-20 border-b border-dark/15"
            >
                {/* left column — heading + polaroid */}
                <div className="flex flex-col md:min-h-[520px]">
                    <h2 className="font-display text-custom text-[clamp(52px,6.5vw,104px)] text-dark">
                        Builds things<br />with <span className="text-accent">grit.</span>
                    </h2>

                    {/* polaroid */}
                    <div className="relative mx-auto mt-10 w-[clamp(180px,18vw,220px)] -rotate-[2.5deg] bg-[#fffbf3] px-4 pb-14 pt-4 shadow-[0_18px_30px_rgba(20,19,24,0.16),0_3px_6px_rgba(20,19,24,0.1),inset_0_0_0_0.5px_rgba(20,19,24,0.06)] transition-[transform,box-shadow] duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-rotate-1 hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_26px_44px_rgba(20,19,24,0.2),0_5px_10px_rgba(20,19,24,0.12)] motion-reduce:transition-none md:mb-4 md:mr-[-1.5rem] md:mt-auto">
                        <span
                            aria-hidden
                            className="absolute -top-3 left-1/2 w-24 h-6 -translate-x-1/2 -rotate-3 mix-blend-multiply border-l border-r border-dashed border-dark/15"
                            style={{ background: "rgba(183,148,255,0.5)" }}
                        />
                        <div className="relative w-full aspect-square overflow-hidden bg-card">
                            {photoSrc ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={photoSrc} alt={photoAlt} className="block w-full h-full object-cover" />
                            ) : (
                                <span className="flex items-center justify-center w-full h-full text-[11px] uppercase tracking-widest text-mute">
                                    your photo
                                </span>
                            )}
                        </div>
                        <div className="absolute bottom-3 left-4 max-w-[130px] text-left font-display italic font-medium text-[13px] leading-[1.15] text-dark">
                            {photoCaption}
                        </div>
                    </div>
                </div>

                {/* right column — lead text + chips */}
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

            {/* 2 · Proof timeline */}
            <section className="relative px-5 md:px-12 py-14 md:py-20 border-b border-dark/15 overflow-hidden">
                <span
                    aria-hidden="true"
                    className="absolute top-16 right-12 z-0 pointer-events-none select-none font-display text-custom-italic leading-none text-[clamp(64px,8vw,120px)] text-transparent opacity-[0.07] [-webkit-text-stroke:1px_var(--color-dark)]"
                >
                    Proof.
                </span>

                <div className="relative">
                    <div className="flex justify-between items-baseline pb-3 mb-7 text-mute">
                        <span className="flex items-baseline gap-4">
                            <span className="font-display text-custom text-[14px] text-dark">PROOF</span>
                        </span>

                    </div>

                    <div className="flex flex-col">
                        {proof.map((e) => (
                            <div
                                key={e.year + e.title}
                                className="group relative grid items-baseline gap-6 py-6 border-b border-dark/15 grid-cols-[88px_1fr_24px] md:grid-cols-[140px_1fr_24px] transition-[background,padding] duration-200 hover:bg-card hover:px-2.5"
                            >
                                <span className="font-display text-custom-italic text-[20px] text-mute tabular-nums transition-[color,transform] duration-200 group-hover:text-dark group-hover:translate-x-0.5 md:text-[24px]">
                                    {e.year}
                                </span>
                                <span className="flex flex-col gap-2">
                                    <span className="font-display text-custom text-[26px] leading-[1.08]!">
                                        {e.title}
                                    </span>
                                    <span className="max-w-[68ch] text-[12.5px] leading-[1.45] text-dark">{e.tag}</span>
                                </span>
                                <span className="w-2.25 h-2.25 self-center justify-self-end rounded-full bg-accent transition-all duration-250 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[2] group-hover:shadow-[0_0_0_6px_rgba(183,148,255,0.18)]" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
