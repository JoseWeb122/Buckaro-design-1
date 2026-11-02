import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { cn } from "@/utils/cn";
import { shopifyImage, type ProductImage } from "@/data/products";
import { px } from "@/data/site";

/* ------------------------------------------------------------------ Reveal */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[As as keyof typeof motion] as typeof motion.div;
  return (
    <MotionTag
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px 0px -60px 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* --------------------------------------------------------------- SmartImage */

function resolveUrl(image: ProductImage, width: number, height?: number): { src: string; set?: string } {
  if (image.cdn) {
    return {
      src: shopifyImage(image.src, width),
      set: `${shopifyImage(image.src, Math.round(width / 2))} ${Math.round(width / 2)}w, ${shopifyImage(image.src, width)} ${width}w`,
    };
  }
  if (image.src.includes("images.pexels.com")) {
    const half = height ? px(image.src, Math.round(width / 2), Math.round(height / 2)) : undefined;
    return {
      src: px(image.src, width, height),
      set: half ? `${half} ${Math.round(width / 2)}w, ${px(image.src, width, height)} ${width}w` : undefined,
    };
  }
  // bundled asset (data URI / same-origin) — used exactly as imported
  return { src: image.src };
}

export function SmartImage({
  image,
  className,
  width = 900,
  height,
  sizes,
  eager = false,
  zoom = false,
}: {
  image: ProductImage;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  eager?: boolean;
  zoom?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const { src, set: srcSet } = resolveUrl(image, width, height);

  if (failed) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 bg-[#2b1e16] text-brass/60",
          className,
        )}
        role="img"
        aria-label={image.alt}
      >
        <ImageOff className="h-6 w-6" strokeWidth={1.4} />
        <span className="px-3 text-center text-[0.6rem] tracking-[0.2em] uppercase">
          Photography unavailable
        </span>
      </div>
    );
  }

  return (
    <>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={image.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn(
          "h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]",
          loaded ? "opacity-100" : "opacity-0",
          zoom && "group-hover:scale-[1.055]",
          className,
        )}
      />
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-br from-[#2c1f17] via-[#3a2a1e] to-[#241a13]" />
      )}
    </>
  );
}

/* ------------------------------------------------------------ Small styling */

export function Eyebrow({
  children,
  className,
  tone = "brass",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brass" | "dark";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        tone === "brass" ? "text-brass" : "text-saddle",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          tone === "brass" ? "bg-brass/60" : "bg-saddle/40",
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <Eyebrow tone={tone === "light" ? "brass" : "dark"} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-5 text-[clamp(2.1rem,5.2vw,3.8rem)] leading-[1.03]",
            tone === "light" ? "text-ivory" : "text-espresso",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-xl text-[0.98rem] leading-relaxed",
              align === "center" && "mx-auto",
              tone === "light" ? "text-parchment/65" : "text-charcoal/72",
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function BrassRule({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-px w-full max-w-md overflow-hidden hairline", className)}>
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-brass" />
    </div>
  );
}

/* --------------------------------------------------------- Accessible modal */

export function useFocusTrap(active: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const first = node?.querySelector<HTMLElement>(
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])',
    );
    window.setTimeout(() => (first ?? node)?.focus({ preventScroll: true }), 40);
    return () => previous?.focus?.({ preventScroll: true });
  }, [active]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !active) return;
    const node = ref.current;
    if (!node) return;
    const items = Array.from(
      node.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
    void onClose;
  };

  return { ref, onKeyDown };
}

export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  className,
  variant = "center",
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
  variant?: "center" | "right" | "full";
}) {
  const reduce = useReducedMotion();
  const { ref, onKeyDown } = useFocusTrap(open, onClose);

  const sizeClass =
    variant === "right"
      ? "sm:ml-auto h-full w-full max-w-[27rem]"
      : variant === "full"
        ? "h-full w-full"
        : "w-full max-w-5xl";
  const maxHeight = variant === "full" ? "max-h-full" : "max-h-[92dvh]";

  return (
    <div
      className="fixed inset-0 z-[90] flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onKeyDown={onKeyDown}
    >
      <motion.button
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-espresso-950/85 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        ref={ref}
        tabIndex={-1}
        initial={
          variant === "right"
            ? { x: reduce ? 0 : "100%" }
            : { opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.985 }
        }
        animate={variant === "right" ? { x: 0 } : { opacity: 1, y: 0, scale: 1 }}
        exit={
          variant === "right"
            ? { x: reduce ? 0 : "100%" }
            : { opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.99 }
        }
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative m-auto flex flex-col overflow-hidden bg-espresso text-parchment shadow-lift",
          "border border-brass/18",
          sizeClass,
          maxHeight,
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
}
