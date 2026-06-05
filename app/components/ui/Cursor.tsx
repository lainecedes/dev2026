"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = -50, y = -50, rx = -50, ry = -50;
    let over = false;
    let overHeader = false;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      over = true;

      const header = document.querySelector("header");
      if (header) {
        const rect = header.getBoundingClientRect();
        overHeader = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      }
    };
    const onLeave = () => { over = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
        dot.current.style.opacity = over ? "1" : "0";
        dot.current.style.setProperty("--cursor-color", overHeader ? "var(--color-dark)" : "var(--color-accent)");
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
        ring.current.style.opacity = over ? "1" : "0";
        ring.current.style.setProperty("--cursor-color", overHeader ? "var(--color-dark)" : "var(--color-accent)");
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dot}
           className="fixed top-0 left-0 z-[9999] h-[6px] w-[6px] rounded-full bg-[var(--cursor-color,var(--color-accent))] pointer-events-none [@media(hover:none)]:hidden" />
      <div ref={ring}
           className="fixed top-0 left-0 z-[9999] h-9 w-9 rounded-full border border-[var(--cursor-color,var(--color-accent))] pointer-events-none transition-[opacity,border-color] duration-200 [@media(hover:none)]:hidden" />
    </>
  );
}
