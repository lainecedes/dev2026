"use client"
import Link from "next/link";

export default function Logo() {

    return (
        <Link href="/" className="font-display font-bold text-dark text-xl tracking-[-.050em]">
            <span className="italic">L</span><span>ainey</span>
        </Link>
    )
}