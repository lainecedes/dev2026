"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import Logo from "@/app/components/ui/Logo";
import WarpGrid from "@/app/components/dynamic/WarpGrid";
import { DesktopNavLinks, MobileNavLinks } from "@/app/components/shared/types";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const metaRef = useRef(null);
    const emailRef = useRef(null);
    const linkRefs = useRef([]);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [isOpen]);

    useEffect(() => {
        gsap.set(menuRef.current, { autoAlpha: 0, xPercent: 100 });
        gsap.set([metaRef.current, ...linkRefs.current, emailRef.current], { autoAlpha: 0, y: 24 });
    }, []);

    useEffect(() => {
        const items = [metaRef.current, ...linkRefs.current, emailRef.current].filter(Boolean);

        if (isOpen) {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.set(menuRef.current, { autoAlpha: 1, xPercent: 100 })
                .to(menuRef.current, { xPercent: 0, duration: 0.45 })
                .fromTo(
                    items,
                    { autoAlpha: 0, y: 28 },
                    { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07 },
                    "-=0.18"
                );

            return () => tl.kill();
        }

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

        tl.to(items, { autoAlpha: 0, y: 18, duration: 0.16, stagger: 0.025 })
            .to(menuRef.current, { autoAlpha: 0, xPercent: 100, duration: 0.3 }, "-=0.04");

        return () => tl.kill();
    }, [isOpen]);

    return (
        <>
            <nav className="flex z-100 h-12 max-w-8xl mx-auto px-4 w-full justify-between items-center">
                <Logo />

                <ul className="hidden md:flex gap-6 text-sm font-mono text-dark">
                    {DesktopNavLinks.map(({ label, href }) => (
                        <li key={label}>
                            <Link href={href} className="hover-bracket">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((open) => !open)}
                    className="md:hidden relative z-70 flex h-7 w-7 items-center justify-center text-dark"
                >
                    <span className={`absolute h-[2px] w-6 bg-current transition-transform duration-200 ${isOpen ? "rotate-45" : "-translate-y-1.5"}`} />
                    <span className={`absolute h-[2px] w-6 bg-current transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <span className={`absolute h-[2px] w-6 bg-current transition-transform duration-200 ${isOpen ? "-rotate-45" : "translate-y-1.5"}`} />
                </button>
            </nav>

            <div
                ref={menuRef}
                aria-hidden={!isOpen}
                className={`invisible fixed inset-x-0 top-12 z-60 h-[calc(100svh-3rem)] overflow-hidden overscroll-contain bg-dark text-bg will-change-transform md:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
            >
                {isOpen && (
                    <WarpGrid density={8} mobileDensity={5} distortion={18} animate={false} className="text-bg opacity-35" />
                )}

                <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-8 pt-12">
                    <div ref={metaRef} className="flex items-baseline justify-between border-b border-bg/15 pb-3 font-mono text-xs font-semibold uppercase text-bg/60">
                        <span>Menu</span>
                        <span>Off grid</span>
                    </div>

                    <ul className="flex flex-col gap-1">
                        {MobileNavLinks.map(({ label, href }, index) => (
                            <li
                                key={label}
                                ref={(el) => { linkRefs.current[index] = el }}
                                className="border-b border-bg/15"
                            >
                                <Link
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className="group flex items-baseline justify-between py-3 font-display text-custom text-5xl text-bg transition-colors hover:text-accent"
                                >
                                    <span>{label}</span>
                                    <span className="font-mono text-xs font-semibold text-bg/45 transition-colors group-hover:text-accent">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Link
                        ref={emailRef}
                        href="mailto:hi@laineyforce.com"
                        onClick={() => setIsOpen(false)}
                        className="font-display text-custom-italic text-3xl text-accent"
                    >
                        hi@laineyforce.com
                    </Link>
                </div>
            </div>
        </>
    )
}
