"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { HeroRects } from "@/app/components/shared/types"

export default function Hero() {
    const linesRef    = useRef<(HTMLSpanElement | null)[]>([])
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])
    const floatRefs   = useRef<(HTMLDivElement | null)[]>([])

    // Text fade-in
    useEffect(() => {
        const lines    = linesRef.current.filter(Boolean)
        const subtitle = subtitleRef.current
        if (!lines.length || !subtitle) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 })
            lines.forEach((line) => {
                tl.from(line, { opacity: 0, y: 40, duration: 0.5, ease: "power2.out" }, "-=0.2")
            })
            tl.from(subtitle, { opacity: 0, duration: 0.3, ease: "power2.out" }, "+=0.1")
        })

        return () => ctx.revert()
    }, [])

    // Float animation on inner divs
    useEffect(() => {
        const tl = gsap.timeline()
        floatRefs.current.forEach((el, i) => {
            if (!el) return
            tl.to(el, {
                y: HeroRects[i].floatY,
                repeat: -1,
                yoyo: true,
                duration: HeroRects[i].duration,
                ease: "sine.inOut",
            }, HeroRects[i].delay)
        })
        return () => { tl.kill() }
    }, [])

    // Mouse repulsion on wrapper divs
    useEffect(() => {
        const radius   = 220
        const strength = 35

        const onMouseMove = (e: MouseEvent) => {
            wrapperRefs.current.forEach((wrapper) => {
                if (!wrapper) return
                const { left, top, width, height } = wrapper.getBoundingClientRect()
                const cx   = left + width / 2
                const cy   = top  + height / 2
                const dx   = cx - e.clientX
                const dy   = cy - e.clientY
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist < radius) {
                    const force = (1 - dist / radius) * strength
                    gsap.to(wrapper, { x: (dx / dist) * force, y: (dy / dist) * force, duration: 0.4, ease: "power2.out", overwrite: "auto" })
                } else {
                    gsap.to(wrapper, { x: 0, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" })
                }
            })
        }

        window.addEventListener("mousemove", onMouseMove)
        return () => window.removeEventListener("mousemove", onMouseMove)
    }, [])

    return (
        <section className="relative md:min-h-screen flex flex-col justify-center items-center px-6 py-24 overflow-hidden">

            {HeroRects.map((rect, i) => (
                <div
                    key={i}
                    ref={(el) => { wrapperRefs.current[i] = el }}
                    className={`absolute ${rect.size}`}
                    style={{ top: rect.top, bottom: (rect as any).bottom, left: rect.left, right: (rect as any).right }}
                >
                    <div
                        ref={(el) => { floatRefs.current[i] = el }}
                        className={`w-full h-full ${rect.color} ${rect.opacity}`}
                        style={{ rotate: rect.rotate }}
                    />
                </div>
            ))}

            <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 z-[1] h-[min(66vh,620px)] w-[min(72vw,430px)] -translate-x-1/2 -translate-y-1/2 border border-dark/10 bg-card/45 opacity-60 shadow-[0_24px_70px_rgba(20,19,24,0.12)]"
            />

            <div className="flex flex-col gap-3 md:gap-2 relative z-10">
                <p className="font-display text-custom-italic text-5xl md:text-7xl text-accent">
                    <span ref={(el) => { linesRef.current[0] = el }} className="block">
                        A creative<br className="md:hidden" /> developer that
                    </span>
                    <span ref={(el) => { linesRef.current[1] = el }} className="block">doesn't fit the grid.</span>
                </p>
                <p ref={subtitleRef} className="font-body text-lg md:text-base leading-snug w-full sm:w-2/4">
                    A 24-year old creative designer with a strong background in front-end development
                </p>
            </div>
        </section>
    )
}
