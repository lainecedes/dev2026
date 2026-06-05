"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

type GridImage = { src: string; alt?: string }

export default function ImageGrid({ images }: { images: GridImage[] }) {
    const [open, setOpen] = useState<number | null>(null)

    const close = useCallback(() => setOpen(null), [])
    const prev  = useCallback(() => setOpen(i => i !== null ? (i - 1 + images.length) % images.length : null), [images.length])
    const next  = useCallback(() => setOpen(i => i !== null ? (i + 1) % images.length : null), [images.length])

    useEffect(() => {
        if (open === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close()
            if (e.key === "ArrowLeft") prev()
            if (e.key === "ArrowRight") next()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open, close, prev, next])

    const cols = images.length === 3 ? "grid-cols-1 sm:grid-cols-3" : images.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"

    return (
        <>
            <div className={`grid ${cols} gap-3 my-8`}>
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setOpen(i)}
                        className="relative aspect-video overflow-hidden rounded-md cursor-zoom-in group"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt ?? ""}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </button>
                ))}
            </div>

            {open !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={close}
                >
                    <Image
                        src={images[open].src}
                        alt={images[open].alt ?? ""}
                        width={1600}
                        height={1000}
                        onClick={e => e.stopPropagation()}
                        className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                    />

                    <button onClick={close} className="absolute top-4 right-5 text-white/60 hover:text-white text-xl">✕</button>

                    {images.length > 1 && <>
                        <button onClick={e => { e.stopPropagation(); prev() }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl px-2">‹</button>
                        <button onClick={e => { e.stopPropagation(); next() }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl px-2">›</button>
                    </>}
                </div>
            )}
        </>
    )
}
