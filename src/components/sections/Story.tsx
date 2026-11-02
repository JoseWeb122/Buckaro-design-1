import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import atelierImg from "@/assets/atelier.jpg";
import { Eyebrow, Reveal, SmartImage } from "@/components/ui";
import { Concho } from "@/components/icons";

export function Story() {
  const reduce = useReducedMotion();

  return (
    <section id="story" className="relative overflow-hidden bg-espresso py-24 text-parchment sm:py-32 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "radial-gradient(70% 55% at 12% 0%, rgba(145,101,66,.22), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[104rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:gap-24">
        {/* Plate */}
        <Reveal className="relative">
          <div className="relative">
            <motion.div
              initial={reduce ? {} : { opacity: 0, scale: 1.06 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] overflow-hidden bg-[#2b1f18] sm:aspect-[5/4]"
            >
              <SmartImage
                image={{
                  src: atelierImg,
                  alt: "Hands shaping a felt crown over a wooden block in a hatter's workshop",
                  cdn: false,
                }}
                width={1100}
                height={900}
                eager
                sizes="(max-width:1024px) 92vw, 620px"
                className="absolute inset-0 transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-espresso-950/20" aria-hidden />
            </motion.div>

            {/* offset brass frame */}
            <span className="pointer-events-none absolute -top-4 -left-4 hidden h-28 w-28 border-t border-l border-brass/50 sm:block" aria-hidden />
            <span className="pointer-events-none absolute -right-4 -bottom-4 hidden h-28 w-28 border-r border-b border-brass/50 sm:block" aria-hidden />

            <figcaption className="absolute bottom-4 left-4 flex items-center gap-2.5 border border-brass/25 bg-espresso-950/70 px-3.5 py-2 text-[0.56rem] font-bold tracking-[0.22em] text-parchment/70 uppercase backdrop-blur-sm">
              <Concho className="text-brass/70" />
              Shaping the crown
            </figcaption>
          </div>
        </Reveal>

        {/* Editorial panel */}
        <div className="lg:pb-8">
          <Reveal>
            <Eyebrow>The Art of the West</Eyebrow>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 className="mt-6 font-display text-[clamp(2.3rem,5.4vw,4.1rem)] leading-[1.02] text-ivory">
              More Than a Hat.
              <br />
              <span className="italic font-light text-parchment/85">A Piece of Your Story.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-8 h-px w-40 hairline" aria-hidden />
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-8 max-w-xl text-[1.02rem] leading-[1.85] text-parchment/72 text-pretty">
              A great Western hat is more than something you wear. It reflects your style, your character, and the
              traditions you carry with you. Buckaroo Hatters celebrates the artistry and individuality that make
              Western hats special.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 grid gap-x-10 gap-y-6 border-t border-brass/15 pt-8 sm:grid-cols-2">
              {[
                { k: "Made by hand", v: "Each hat, band and leather piece is finished individually — not batch printed." },
                { k: "Made to be worn", v: "Built for dust, wind and long drives, then styled to look like it belongs to you." },
              ].map((row) => (
                <div key={row.k}>
                  <h3 className="font-display text-[1.3rem] text-brass-light">{row.k}</h3>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-parchment/55">{row.v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <Link to="/our-craft" className="btn btn-outline mt-10 group">
              Explore our craft
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
