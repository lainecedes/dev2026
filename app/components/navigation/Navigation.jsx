"use client"

import Link from "next/link";
import Logo from "@/app/components/ui/Logo";
import { useState } from "react";

export default function Navigation() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="flex max-w-6xl mx-auto px-6 py-12 w-full justify-between">
            <Logo />
            <ul className='hidden md:flex flex-row gap-2'>
                <li className=""><Link href='/'>About</Link></li>
                <li><Link href='/'>Projects</Link></li>
                <li><Link href='/'>Contact</Link></li>
            </ul>

            {/* button voor openen hamburger menu */}
            <button
                onClick={() => setOpen(!open)}
                className="md:hidden"
            >
                ☰
            </button>

            <ul
                className={`md:hidden flex flex-col gap-4 mt-4 ${ open ? "block" : "hidden" }`}
            >
                <li className=""><Link href='/'>About</Link></li>
                <li><Link href='/'>Projects</Link></li>
                <li><Link href='/'>Contact</Link></li>
            </ul>
        </nav>
    )
}
