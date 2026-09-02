import { cn } from "@/lib/utils";

export function Fleuron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 18"
      className={cn("text-sage", className)}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M8 9H62M98 9H152"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M80 2.5L84.5 9L80 15.5L75.5 9Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <circle cx="80" cy="9" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function CornerMarks({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-3 text-ink/20", className)}
      aria-hidden="true"
    >
      <span className="absolute top-0 left-0 block size-3 border-t border-l border-current" />
      <span className="absolute top-0 right-0 block size-3 border-t border-r border-current" />
      <span className="absolute bottom-0 left-0 block size-3 border-b border-l border-current" />
      <span className="absolute right-0 bottom-0 block size-3 border-r border-b border-current" />
    </div>
  );
}
