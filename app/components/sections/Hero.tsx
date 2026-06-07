"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
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
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

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
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

        const radius   = 220
        const strength = 35
        let frame = 0
        let pointerX = 0
        let pointerY = 0

        const updateRects = () => {
            frame = 0
            wrapperRefs.current.forEach((wrapper) => {
                if (!wrapper) return
                const { left, top, width, height } = wrapper.getBoundingClientRect()
                const cx   = left + width / 2
                const cy   = top  + height / 2
                const dx   = cx - pointerX
                const dy   = cy - pointerY
                const dist = Math.sqrt(dx * dx + dy * dy)

                if (dist > 0 && dist < radius) {
                    const force = (1 - dist / radius) * strength
                    gsap.to(wrapper, { x: (dx / dist) * force, y: (dy / dist) * force, duration: 0.4, ease: "power2.out", overwrite: "auto" })
                } else {
                    gsap.to(wrapper, { x: 0, y: 0, duration: 0.8, ease: "power2.out", overwrite: "auto" })
                }
            })
        }

        const onMouseMove = (e: MouseEvent) => {
            pointerX = e.clientX
            pointerY = e.clientY
            if (!frame) frame = requestAnimationFrame(updateRects)
        }

        window.addEventListener("mousemove", onMouseMove)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener("mousemove", onMouseMove)
        }
    }, [])

    return (
        <section className="relative flex min-h-screen flex-col items-center overflow-visible px-6 pb-0 pt-24 md:min-h-screen md:justify-end md:pb-28 md:pt-24">

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

            <div className="relative z-10 -mb-24 flex w-full flex-col-reverse gap-3 md:mb-0 md:w-auto md:flex-col md:gap-2">
                <p ref={subtitleRef} className="w-full font-body text-lg leading-snug md:w-2/6 md:text-base">
                    A 25-year old creative designer with a strong background in front-end development.
                </p>
                <p className="font-display text-custom-italic text-5xl md:text-7xl text-accent">
                    <span ref={(el) => { linesRef.current[0] = el }} className="block">
                        A creative<br className="md:hidden" /> developer that
                    </span>
                    <span ref={(el) => { linesRef.current[1] = el }} className="block">doesn't fit the grid.</span>
                </p>
            </div>

            <div
                className="relative z-[1] h-[100vh] w-[230vw] max-w-none shrink-0 self-center md:absolute md:left-1/2 md:top-[62%] md:h-[min(145vh,1500px)] md:w-[min(140vw,1400px)] md:-translate-x-1/2 md:-translate-y-1/2"
            >
                <Image
                    src="/portrait-sticker.png"
                    alt="Portrait of Elaine Wilberforce"
                    fill
                    priority
                    className="object-contain object-bottom"
                    sizes="(max-width: 767px) 230vw, 1400px"
                />
            </div>
        </section>
    )
}
