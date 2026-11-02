import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { px } from "@/data/site";
import { Eyebrow } from "@/components/ui";
import { cn } from "@/utils/cn";

export function PageHeader({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-espresso-950 pt-40 pb-16 text-parchment sm:pt-44 sm:pb-20 lg:pt-48",
        align === "center" && "text-center",
      )}
    >
      {image && (
        <>
          <motion.img
            src={image}
            alt={imageAlt ?? ""}
            aria-hidden
            initial={reduce ? {} : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "linear-gradient(180deg, rgba(23,15,11,.86), rgba(23,15,11,.94))" }}
            aria-hidden
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 grain opacity-50" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px stitch-y opacity-60" aria-hidden />

      <div className={cn("relative mx-auto max-w-[104rem] px-5 sm:px-8", align === "center" && "text-center")}>
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6.6vw,5rem)] leading-[1.02] text-ivory">
            {title}
          </h1>
          {lede && (
            <p className={cn("mt-6 max-w-xl text-[1rem] leading-relaxed text-parchment/65 text-pretty", align === "center" && "mx-auto")}>
              {lede}
            </p>
          )}
        </motion.div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

export const headerTexture = px("https://images.pexels.com/photos/4452603/pexels-photo-4452603.jpeg", 1600, 900);
