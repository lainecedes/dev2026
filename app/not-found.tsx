import type { Metadata } from "next";
import Link from "next/link";

import WarpGrid from "@/app/components/dynamic/WarpGrid";

export const metadata: Metadata = {
    title: "404 — Lainey",
};

export default function NotFound() {
    return (
        <div data-hide-footer className="relative h-[100svh] overflow-hidden bg-dark text-bg">
            <WarpGrid
                density={12}
                mobileDensity={6}
                distortion={0}
                className="text-bg"
            />

            <section className="relative z-10 flex h-full flex-col justify-center gap-4 px-5 pb-24 pt-14 md:gap-6 md:px-12 md:pb-28 md:pt-16">
                <div className="flex items-baseline justify-between pb-3 font-mono font-semibold uppercase text-bg/60">
                    <span>Page missing</span>
                    <span>Back on grid</span>
                </div>

                <div className="relative flex min-h-[130px] items-center justify-center md:min-h-[220px]">
                    <div className="absolute left-[8%] top-[10%] h-20 w-20 bg-bg opacity-10 md:h-32 md:w-32" />
                    <div className="absolute right-[8%] top-[10%] h-20 w-20 bg-accent opacity-20 md:h-32 md:w-32" />
                    <div className="absolute bottom-[8%] left-[calc(50%-40px)] h-20 w-20 bg-bg opacity-5 md:left-[calc(50%-64px)] md:h-32 md:w-32" />

                    <p className="relative m-0 font-display text-custom-italic text-9xl text-bg sm:text-[10rem] md:text-[12rem] lg:text-[14rem]" aria-label="404">
                        4<span className="text-accent">0</span>4
                    </p>
                </div>

                <div className="mx-auto flex w-full max-w-[860px] flex-col justify-center gap-5 text-center md:gap-6">
                    <div>
                        <h1 className="m-0 font-display text-custom text-3xl text-bg sm:text-4xl">
                            Order has been <em className="text-custom-italic text-accent">restored</em>.
                        </h1>
                        <p className="m-0 mt-1 font-display text-custom text-3xl text-bg/45 line-through decoration-accent decoration-[3px] sm:text-4xl">
                            Your page has not.
                        </p>
                    </div>

                    <nav aria-label="404 navigation" className="mt-12 flex justify-center pt-5 font-display text-custom text-2xl md:mt-20 md:text-3xl">
                        <Link href="/" className="hover-bracket">
                            Return to known territory.
                        </Link>
                    </nav>
                </div>
            </section>
        </div>
    );
}
