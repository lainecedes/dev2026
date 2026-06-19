"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type LightboxProps = {
  src: string;
  fullSrc?: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
};

const minZoom = 1;
const maxZoom = 5;
const zoomStep = 0.5;

export default function Lightbox({ src, fullSrc, alt, width, height, sizes = "100vw" }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(minZoom);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerId: 0, startX: 0, startY: 0, x: 0, y: 0, active: false });

  const zoomIn = () => setZoom((current) => Math.min(maxZoom, current + zoomStep));
  const zoomOut = () => setZoom((current) => Math.max(minZoom, current - zoomStep));

  const resetZoom = () => {
    setZoom(minZoom);
    setPosition({ x: 0, y: 0 });
  };

  const close = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        resetZoom();
      },
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
      if (event.key === "+" || event.key === "=") zoomIn();
      if (event.key === "-") zoomOut();
      if (event.key === "0") resetZoom();
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

  useEffect(() => {
    if (zoom === minZoom) setPosition({ x: 0, y: 0 });
  }, [zoom]);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom === minZoom) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: position.x,
      y: position.y,
      active: true,
    };
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    if (!state.active || state.pointerId !== event.pointerId) return;

    setPosition({
      x: state.x + event.clientX - state.startX,
      y: state.y + event.clientY - state.startY,
    });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId === event.pointerId) {
      dragRef.current.active = false;
    }
  };

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
          <div
            ref={imageRef}
            className="relative flex max-h-full max-w-full touch-none items-center justify-center overflow-hidden opacity-0"
            onPointerDown={startDrag}
            onPointerMove={drag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={fullSrc ?? src}
              alt={alt}
              width={width}
              height={height}
              draggable={false}
              className={`max-h-[calc(100svh-7rem)] max-w-[calc(100vw-2rem)] select-none object-contain transition-transform duration-150 md:max-w-[calc(100vw-4rem)] ${
                zoom > minZoom ? "cursor-grab active:cursor-grabbing" : ""
              }`}
              style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${zoom})`,
                transformOrigin: "center",
              }}
            />
          </div>

          <div ref={controlsRef} className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-6 opacity-0 md:inset-x-8 md:bottom-6">
            <p className="m-0 max-w-[70ch] font-mono text-[11px] leading-[1.5] text-bg/70">
              {alt}
            </p>
            <div className="pointer-events-auto flex shrink-0 items-center border border-bg/30 bg-dark/80 text-bg">
              <button
                type="button"
                onClick={zoomOut}
                disabled={zoom === minZoom}
                className="flex h-10 w-10 items-center justify-center border-r border-bg/30 font-mono text-sm transition-colors hover:text-accent disabled:text-bg/30"
                aria-label="Zoom out"
              >
                -
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="flex h-10 min-w-16 items-center justify-center border-r border-bg/30 px-3 font-mono text-[11px] transition-colors hover:text-accent"
                aria-label="Reset zoom"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                disabled={zoom === maxZoom}
                className="flex h-10 w-10 items-center justify-center border-r border-bg/30 font-mono text-sm transition-colors hover:text-accent disabled:text-bg/30"
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center font-display text-custom text-xl transition-colors hover:text-accent"
                aria-label="Close full-screen image"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
