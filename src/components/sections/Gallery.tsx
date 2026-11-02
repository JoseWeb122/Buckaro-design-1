import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { GALLERY, BRAND, px } from "@/data/site";
import { Eyebrow, Reveal, SmartImage, useFocusTrap } from "@/components/ui";
import { FacebookMark, InstagramMark, Concho } from "@/components/icons";
import { cn } from "@/utils/cn";

export function Lightbox({
  index,
  onClose,
  onStep,
}: {
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const reduce = useReducedMotion();
  const { ref, onKeyDown } = useFocusTrap(true, onClose);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  const shot = GALLERY[index];

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex flex-col bg-espresso-950/96 backdrop-blur-sm"
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image ${index + 1} of ${GALLERY.length}: ${shot.alt}`}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8" ref={ref}>
        <span className="flex items-center gap-2.5 text-[0.58rem] font-bold tracking-[0.28em] text-brass uppercase">
          <Concho /> Buckaroo Hatters · Gallery
        </span>
        <button onClick={onClose} aria-label="Close gallery" className="flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.2em] text-parchment/55 uppercase transition-colors hover:text-brass">
          Close <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-10" onClick={onClose}>
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={reduce ? {} : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.005 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-5xl flex-col items-center"
          >
            <img
              src={shot.full}
              alt={shot.alt}
              className="max-h-[70vh] w-auto max-w-full object-contain shadow-lift"
              decoding="async"
            />
            <figcaption className="mt-4 flex items-center gap-3 text-[0.62rem] tracking-[0.22em] text-parchment/55 uppercase">
              <span className="text-brass">{String(index + 1).padStart(2, "0")}</span>
              / {String(GALLERY.length).padStart(2, "0")}
              <span className="h-px w-8 bg-brass/40" aria-hidden />
              {shot.caption}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onStep(-1);
          }}
          aria-label="Previous image"
          className="absolute left-1 flex h-12 w-12 items-center justify-center border border-brass/25 bg-espresso/70 text-parchment/75 transition-colors hover:border-brass hover:text-brass sm:left-3"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.4} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStep(1);
          }}
          aria-label="Next image"
          className="absolute right-1 flex h-12 w-12 items-center justify-center border border-brass/25 bg-espresso/70 text-parchment/75 transition-colors hover:border-brass hover:text-brass sm:right-3"
        >
          <ArrowRight className="h-5 w-5" strokeWidth={1.4} />
        </button>
      </div>
    </motion.div>
  );
}

export function Gallery({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const shots = compact ? GALLERY.slice(0, 6) : GALLERY;

  const step = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-espresso py-24 text-parchment sm:py-28">
      <div className="relative mx-auto max-w-[104rem] px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Out where it is worn</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 font-display text-[clamp(2.1rem,4.8vw,3.5rem)] leading-[1.05] text-ivory">
                A Western look,
                <br />
                <span className="italic text-parchment/80">shot in the field.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-parchment/60">
                Styling, texture and the places a hat ends up. Imagery here is licensed stock and editorial, used to
                show the world these pieces live in — the shop photographs themselves are the product shots.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="flex shrink-0 items-center gap-3">
            <a
              href={BRAND.links.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline !py-3 text-[0.58rem]"
            >
              <InstagramMark className="h-4 w-4" /> Instagram
            </a>
            <a
              href={BRAND.links.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-outline !py-3 text-[0.58rem]"
            >
              <FacebookMark className="h-4 w-4" /> Facebook
            </a>
          </Reveal>
        </div>

        <div
          className={cn(
            "mt-12 auto-rows-[10rem] grid-flow-dense grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4",
          )}
        >
          {shots.map((shot, i) => (
            <Reveal
              key={shot.src}
              delay={(i % 4) * 0.07}
              className={cn(
                "group relative overflow-hidden bg-[#2b1f18]",
                shot.span === "tall" && "row-span-2",
                shot.span === "wide" && "sm:col-span-2",
              )}
            >
              <button
                onClick={() => setOpen(i)}
                className="absolute inset-0 h-full w-full cursor-zoom-in text-left"
                aria-label={`Open image: ${shot.alt}`}
              >
                <SmartImage
                  image={{ src: px(shot.src.split("?")[0], 900), alt: shot.alt, cdn: false }}
                  width={900}
                  sizes="(max-width:640px) 50vw, 24vw"
                  className="absolute inset-0 transition-transform duration-[1500ms] ease-out group-hover:scale-[1.08]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" aria-hidden />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 sm:p-4">
                  <span className="translate-y-1.5 text-[0.6rem] font-bold tracking-[0.2em] text-parchment/90 uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {shot.caption}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 translate-y-2 items-center justify-center border border-brass/40 bg-espresso/60 text-brass opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onStep={step} />}</AnimatePresence>
    </section>
  );
}


