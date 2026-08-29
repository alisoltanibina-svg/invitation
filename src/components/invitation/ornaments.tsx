import { cn } from "@/lib/utils";

export function FloralDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 36"
      className={cn("mx-auto h-8 w-56 text-gold", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 18 H112"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M168 18 H270"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity="0.7"
      />
      <path
        d="M140 6 C146 12 146 24 140 30 C134 24 134 12 140 6 Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <circle cx="140" cy="18" r="2.2" fill="currentColor" />
      <path
        d="M118 18 C124 10 132 10 140 18 C148 10 156 10 162 18"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M118 18 C124 26 132 26 140 18 C148 26 156 26 162 18"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export function CornerFlourish({
  className,
  flipX,
  flipY,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-14 text-gold", className)}
      style={{
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 8 C8 28 12 40 32 48 C20 36 18 22 22 8"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.85"
      />
      <path
        d="M8 8 C28 8 40 12 48 32 C36 20 22 18 8 22"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.85"
      />
      <path
        d="M12 28 C18 22 28 22 32 28 C26 26 18 30 12 28 Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
    </svg>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-16 items-center justify-center rounded-full border border-gold/50 font-display text-lg tracking-wide text-gold",
        className,
      )}
      aria-hidden="true"
    >
      ا‌م
    </div>
  );
}
