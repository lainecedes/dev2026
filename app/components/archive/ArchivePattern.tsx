import type { ArchiveVariant } from "@/app/lib/archive";

// Background pattern recipes per visual variant. Returned as a style object so
// the card can layer them on top of its bg colour.
const Patterns: Record<ArchiveVariant, React.CSSProperties | null> = {
  stripes: {
    background: "repeating-linear-gradient(-35deg, currentColor 0 1px, transparent 1px 22px)",
    opacity: 0.18,
  },
  grid: {
    background:
      "repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 28px), " +
      "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 28px)",
    opacity: 0.18,
  },
  dots: {
    background: "radial-gradient(currentColor 1.2px, transparent 1.6px)",
    backgroundSize: "14px 14px",
    opacity: 0.32,
  },
  flat: null,
  blocks: {
    background:
      "linear-gradient(currentColor 0 0) left top / 38% 62% no-repeat, " +
      "linear-gradient(currentColor 0 0) right bottom / 48% 32% no-repeat",
    opacity: 0.16,
  },
  rule: {
    background: "repeating-linear-gradient(to bottom, currentColor 0 1px, transparent 1px 9px)",
    opacity: 0.22,
  },
};

export default function ArchivePattern({ variant }: { variant: ArchiveVariant }) {
  const style = Patterns[variant];
  if (!style) return null;
  return <div aria-hidden className="absolute inset-0 pointer-events-none" style={style} />;
}
