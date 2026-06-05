"use client"

import Link from "next/link"
import { FooterEmail, FooterLinkGroups } from "@/app/components/shared/types"

export default function Footer() {
    return (
        <footer id="contact" className="bg-dark text-bg px-8 pt-18 pb-8">
            <div className="grid grid-cols-3 gap-8 pb-12 max-md:grid-cols-1">

                <div className="col-span-2 max-md:col-span-1">
                    <h2 className="m-0 font-display text-custom font-bold
                            text-[clamp(40px,8vw,120px)] leading-[0.86]">
                        Line's open.<br />
                        <span className="text-custom-italic text-accent"> Send it through.</span>
                    </h2>
                </div>

                <div className="flex flex-col justify-between gap-4 max-md:items-start">

                    <div className="flex gap-12">
                        {FooterLinkGroups.map((group) => (
                            <nav key={group.title} className="flex flex-col items-center gap-4 mb-auto pt-8">
                                <h3 className="font-display text-custom uppercase">{group.title}</h3>
                                <ul className="mr-auto font-mono font-bold flex flex-col gap-2 text-sm text-footer-text uppercase">
                                    {group.links.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="hover:text-accent transition-colors">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>

                    <div className="pt-6">
                        <Link href={`mailto:${FooterEmail}`}
                           className="font-display font-bold italic tracking-tight50 text-3xl
                          pb-3 border-b border-white/30 transition-colors hover:text-accent
                          max-md:text-[22px]">
                            {FooterEmail}<span> ↗</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
