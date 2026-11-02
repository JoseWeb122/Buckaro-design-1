import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Compass } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { scrollToId, useStore } from "@/lib/store";
import { STORE_STATS } from "@/data/site";
import { formatPrice, PRODUCTS } from "@/data/products";

function useIsDesktop(min = 1024) {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${min}px)`);
    const on = () => setIs(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [min]);
  return is;
}

const HEADLINE_ONE = "A Hat as Unique";
const HEADLINE_TWO = "as the Man Who Wears It.";

export function Hero() {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { setSearchOpen } = useStore();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, isDesktop && !reduce ? 110 : 0]);
  const scale = useTransform(scrollY, [0, 800], [1, isDesktop && !reduce ? 1.06 : 1]);
  const fade = useTransform(scrollY, [0, 520], [1, 0.25]);

  const cheapest = Math.min(...PRODUCTS.filter((p) => p.price !== null).map((p) => p.price as number));

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-espresso-950 pt-24 pb-0 sm:pt-28"
      aria-label="Buckaroo Hatters introduction"
    >
      {/* Cinematic plate */}
      <motion.div style={{ y, scale }} className="absolute inset-0 -z-20 overflow-hidden">
        <motion.img
          src={heroImg}
          alt="A hand-shaped felt Western hat resting on an oak workbench in warm workshop light"
          initial={{ clipPath: reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: reduce ? 0 : 1.5, ease: [0.76, 0, 0.24, 1] }}
          className={`h-full w-full object-cover object-center ${reduce ? "" : "animate-kenburns"}`}
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      {/* Directional light + vignette */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(23,15,11,.94) 0%, rgba(23,15,11,.74) 34%, rgba(23,15,11,.28) 62%, rgba(23,15,11,.55) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-espresso-950 via-espresso-950/70 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 grain opacity-70" aria-hidden />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto w-full max-w-[104rem] px-5 sm:px-8"
      >
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="pb-4">
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-12 bg-brass/70 sm:w-16" aria-hidden />
              <span className="eyebrow text-brass">Handcrafted Western Heritage</span>
            </motion.div>

            <h1 className="mt-7 font-display text-ivory">
              <span className="block overflow-hidden">
                <motion.span
                  initial={reduce ? {} : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[clamp(2.6rem,8.4vw,7rem)] leading-[0.95] font-light tracking-[-0.02em]"
                >
                  {HEADLINE_ONE}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={reduce ? {} : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.47, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[clamp(2.6rem,8.4vw,7rem)] leading-[1.02] italic font-light tracking-[-0.02em] text-parchment"
                >
                  {HEADLINE_TWO}
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.72, duration: 0.9 }}
              className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-parchment/70 text-pretty sm:text-[1.05rem]"
            >
              Discover distinctive Western hats and handcrafted accessories shaped by tradition, individuality and a
              passion for authentic Western style.
            </motion.p>

            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.84, duration: 0.9 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <button onClick={() => scrollToId("collection")} className="btn btn-solid group">
                Explore the collection
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" strokeWidth={1.7} />
              </button>
              <button onClick={() => scrollToId("custom")} className="btn btn-outline">
                <Compass className="h-4 w-4" strokeWidth={1.6} />
                Discover custom hats
              </button>
            </motion.div>

            <motion.div
              initial={reduce ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 1, duration: 1 }}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.6rem] font-bold tracking-[0.26em] text-parchment/45 uppercase"
            >
              <span>Authentic Western Style</span>
              <span className="h-1 w-1 rotate-45 bg-brass/70" aria-hidden />
              <span>Artisan Craftsmanship</span>
              <span className="hidden h-1 w-1 rotate-45 bg-brass/70 sm:block" aria-hidden />
              <button onClick={() => setSearchOpen(true)} className="hidden underline decoration-brass/40 underline-offset-4 transition-colors hover:text-brass sm:inline">
                Search the shop
              </button>
            </motion.div>
          </div>

          {/* Shop index plate */}
          <motion.aside
            initial={reduce ? {} : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduce ? 0 : 0.95, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 hidden border border-brass/25 bg-espresso-950/55 p-6 backdrop-blur-sm lg:block"
          >
            <p className="text-[0.56rem] font-bold tracking-[0.3em] text-brass uppercase">In the shop now</p>
            <ul className="mt-5 space-y-4">
              {[
                { label: "Leather hat bands", note: "from", price: 45 },
                { label: "Herman Oak hat holder", note: "each", price: 50 },
                { label: "Custom hat ear warmers", note: "sale", price: 40 },
              ].map((row) => (
                <li key={row.label} className="border-b border-brass/12 pb-3.5 last:border-0 last:pb-0">
                  <Link to="/shop" className="group flex items-baseline justify-between gap-4">
                    <span className="font-display text-[1.06rem] text-parchment transition-colors group-hover:text-brass-light">
                      {row.label}
                    </span>
                    <span className="shrink-0 text-[0.72rem] text-parchment/50">
                      <span className="mr-1 text-[0.55rem] tracking-[0.18em] text-tobacco uppercase">{row.note}</span>
                      {formatPrice(row.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.68rem] leading-relaxed text-parchment/40">
              Custom hats are quoted per commission — nothing here is mass produced. Prices start at{" "}
              <span className="text-brass/80">{formatPrice(cheapest)}</span> for a band.
            </p>
          </motion.aside>
        </div>
      </motion.div>

      {/* Footer rail */}
      <div className="relative mt-10 border-t border-brass/18 bg-espresso-950/45 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-[104rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-7 sm:gap-10">
            {STORE_STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2.5">
                <span className="font-display text-xl text-brass-light sm:text-2xl">{s.value}</span>
                <span className="hidden text-[0.58rem] tracking-[0.2em] text-parchment/45 uppercase sm:block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToId("story")}
            className="group flex items-center gap-3 text-[0.58rem] font-bold tracking-[0.26em] text-parchment/55 uppercase transition-colors hover:text-brass"
            aria-label="Scroll to the brand story"
          >
            <span className="hidden sm:inline">Scroll</span>
            <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-brass/40 p-1">
              <span className={`h-1.5 w-px bg-brass ${reduce ? "" : "animate-scrollcue"}`} aria-hidden />
            </span>
            <ArrowRight className="h-3.5 w-3.5 rotate-90 transition-transform group-hover:translate-y-0.5" strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </section>
  );
}
