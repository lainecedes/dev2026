"use client"

import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrambleTextPlugin,ScrollTrigger,TextPlugin);
}

export default function Hero() {
    const el = useRef<HTMLHeadingElement>(null)

    useLayoutEffect(() => {
        if (!el.current) return

        const tl = gsap.timeline();

        tl.to(el.current, { text: "Lainey", duration: 0.8, ease: "none" })
            .to(el.current,  { text: "Lay", duration: 0.4, ease: "none", delay: 0.3 })
            .to(el.current,  { text: "Elaine Wilberforce", duration: 1, ease: "none" });
    }, [])

    return (
        <section className="h-screen max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col gap-4 h-full">
                <h2 ref={el} className="order-2 font-heading-extended text-[#ff0299] align-bottom mt-auto text-xl"></h2>
                <p className="order-1 font-body text-right text-lg/5 w-3/4 sm:w-2/4 ml-auto">A 24-year old creative designer with a strong background in front-end development. I focus on making and coding daring designs that are strong in interaction and accessibility.</p>
                <p className="order-3 font-heading-extended text-4xl md:text-6xl align-bottom pb-20 w-full sm:w-3/4">
                    A <span className="text-[#6ee7b1]">creative developer</span> that doesn't fit the grid.
                </p>
            </div>
        </section>
    )
}