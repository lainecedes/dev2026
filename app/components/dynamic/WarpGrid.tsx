"use client";

import { useEffect, useId, useState } from "react";

// CRT-warped grid backdrop. SVG feDisplacementMap on real grid lines,
// plus triplicate RGB ghosting. Animation runs via SMIL <animate>.
export default function WarpGrid({
  density,
  mobileDensity,
  distortion,
  accent = "var(--color-accent)",
  lineColor = "currentColor",
  glitchColor = "currentColor",
  className = "text-dark",
  animate = true,
}: {
  density: number;
  mobileDensity?: number;
  distortion: number;
  accent?: string;
  lineColor?: string;
  glitchColor?: string;
  className?: string;
  animate?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const effectiveDensity = isMobile
    ? (mobileDensity ?? Math.max(4, Math.round(density / 2)))
    : density;
  const cols = effectiveDensity;
  const rows = Math.round(effectiveDensity * 0.6);
  const amp = distortion;
  const id = `crt-warp-${useId().replace(/:/g, "")}`;
  const shouldAnimate = animate && !isMobile;

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`} aria-hidden>
      <svg className="block w-full h-full">
        <defs>
          <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${0.004 + amp * 0.00008} ${0.02 + amp * 0.0003}`}
              numOctaves={2}
              seed={3}
            >
              {shouldAnimate && (
                <animate
                  attributeName="baseFrequency"
                  dur="24s"
                  repeatCount="indefinite"
                  values={`${0.004 + amp * 0.00008} ${0.02 + amp * 0.0003};${0.006 + amp * 0.00012} ${0.024 + amp * 0.0004};${0.004 + amp * 0.00008} ${0.02 + amp * 0.0003}`}
                />
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale={amp * 0.9} />
          </filter>
        </defs>
        <g filter={`url(#${id})`}>
          {Array.from({ length: cols + 1 }).map((_, i) => {
            const x = (i / cols) * 100;
            return (
              <g key={`v${i}`}>
                <line x1={`${x}%`} x2={`${x}%`} y1="0" y2="100%" stroke={accent}
                      strokeOpacity={0.18 + amp * 0.004} strokeWidth="0.5"
                      transform={`translate(${-amp * 0.04},0)`} />
                <line x1={`${x}%`} x2={`${x}%`} y1="0" y2="100%" stroke={lineColor}
                      strokeOpacity={0.28} strokeWidth="0.5" />
                <line x1={`${x}%`} x2={`${x}%`} y1="0" y2="100%" stroke={glitchColor}
                      strokeOpacity={0.10 + amp * 0.003} strokeWidth="0.5"
                      transform={`translate(${amp * 0.04},0)`} />
              </g>
            );
          })}
          {Array.from({ length: rows + 1 }).map((_, i) => {
            const y = (i / rows) * 100;
            return (
              <g key={`h${i}`}>
                <line y1={`${y}%`} y2={`${y}%`} x1="0" x2="100%" stroke={accent}
                      strokeOpacity={0.14 + amp * 0.003} strokeWidth="0.5" />
                <line y1={`${y}%`} y2={`${y}%`} x1="0" x2="100%" stroke={lineColor}
                      strokeOpacity={0.22} strokeWidth="0.5" />
              </g>
            );
          })}
        </g>
      </svg>
      <div className="scanlines absolute inset-0 pointer-events-none"
           style={{ opacity: 0.04 + amp * 0.002 }} />
    </div>
  );
}
