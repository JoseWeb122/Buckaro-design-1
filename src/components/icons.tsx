import { cn } from "@/utils/cn";

/** Custom hat silhouette mark — drawn, not a stock glyph. */
export function HatMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 34"
      fill="none"
      aria-hidden="true"
      className={cn("h-6 w-auto", className)}
    >
      <path
        d="M22.5 5.2c0-1.6 1.1-2.6 2.6-2.6h13.8c1.5 0 2.6 1 2.6 2.6l1.4 12.2c.2 1.9-.2 3.1-1.6 3.9-2.5 1.4-8.2 2-10.4 2s-8-.6-10.4-2c-1.4-.8-1.8-2-1.6-3.9L22.5 5.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M20.6 20.4c8.6 2 14.2 2 22.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M27 21.6c-2.6 1-6.4 2-10.6 3.4C9.4 26.6 5.5 29 6.6 31c1 1.9 5.6 1.9 10.6.9C24.6 30.5 30.4 29.6 32 29.6s7.4.9 14.8 2.3c5 1 9.6 1 10.6-.9 1.1-2-2.8-4.4-9.8-6-4.2-1.4-8-2.4-10.6-3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small diamond concho used between nav / footer items. */
export function Concho({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className={cn("h-1.5 w-1.5", className)}>
      <path d="M5 0l5 5-5 5L0 5 5 0Z" fill="currentColor" />
    </svg>
  );
}

export function InstagramMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.6 21v-7.4h2.5l.4-2.9h-2.9V8.9c0-.84.24-1.42 1.46-1.42h1.54V4.9c-.27-.04-1.2-.11-2.28-.11-2.26 0-3.8 1.38-3.8 3.9v2.1H8.9v2.9h2.18V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-3">
      <HatMark className={cn("shrink-0 transition-colors", tone === "light" ? "text-brass" : "text-saddle")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.12rem] font-semibold tracking-[0.3em] uppercase transition-colors sm:text-[1.22rem]",
            tone === "light" ? "text-ivory" : "text-espresso",
          )}
        >
          Buckaroo
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 flex items-center gap-1.5 text-[0.5rem] font-semibold tracking-[0.42em] uppercase transition-colors",
              tone === "light" ? "text-brass/80" : "text-tobacco",
            )}
          >
            Hatters
            <Concho className="opacity-60" />
            Custom
          </span>
        )}
      </span>
    </span>
  );
}
