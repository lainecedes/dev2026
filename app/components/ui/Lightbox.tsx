"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type LightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
};

export default function Lightbox({ src, alt, width, height, sizes = "100vw" }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const close = () => {
    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false),
      defaults: { ease: "power2.inOut" },
    });

    tl.to(controlsRef.current, { autoAlpha: 0, y: 10, duration: 0.15 })
      .to(imageRef.current, { autoAlpha: 0, scale: 0.94, duration: 0.28 }, 0)
      .to(overlayRef.current, { autoAlpha: 0, duration: 0.25 }, 0.08);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 })
      .fromTo(imageRef.current, { autoAlpha: 0, scale: 0.9, y: 24 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.48 }, "-=0.12")
      .fromTo(controlsRef.current, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.2");

    return () => {
      tl.kill();
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open full-screen image: ${alt}`}
        className="group relative block w-full overflow-hidden border border-rule text-left"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.015]"
          sizes={sizes}
        />
        <span className="absolute bottom-3 right-3 bg-dark px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-bg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View full
        </span>
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-dark/95 p-4 opacity-0 md:p-8"
        >
          <div ref={imageRef} className="relative flex max-h-full max-w-full items-center justify-center opacity-0">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="max-h-[calc(100svh-7rem)] max-w-[calc(100vw-2rem)] object-contain md:max-w-[calc(100vw-4rem)]"
              sizes="100vw"
              priority
            />
          </div>

          <div ref={controlsRef} className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-6 opacity-0 md:inset-x-8 md:bottom-6">
            <p className="m-0 max-w-[70ch] font-mono text-[11px] leading-[1.5] text-bg/70">
              {alt}
            </p>
            <button
              type="button"
              onClick={close}
              className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center border border-bg/40 font-display text-custom text-xl text-bg transition-colors hover:border-accent hover:text-accent"
              aria-label="Close full-screen image"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
