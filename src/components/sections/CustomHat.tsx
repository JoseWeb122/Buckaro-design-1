import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Ruler, PencilRuler, Sparkles } from "lucide-react";
import customImg from "@/assets/custom.jpg";
import { InquiryForm } from "@/components/InquiryForm";
import { Eyebrow, Reveal, SmartImage } from "@/components/ui";
import { PRODUCTS } from "@/data/products";

export function CustomHat({ withForm = true }: { withForm?: boolean }) {
  const reduce = useReducedMotion();
  const hatProducts = PRODUCTS.filter((p) => !p.enquiryOnly).map((p) => p.name);
  const interests = [
    "A custom felt Western hat",
    "A custom straw hat",
    "Restyling a hat I already own",
    ...hatProducts,
  ];

  return (
    <section id="custom" className="relative overflow-hidden bg-espresso-950 py-24 text-parchment sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grain opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 78% 10%, rgba(183,151,91,.15), transparent 65%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[104rem] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* Plate */}
          <div className="relative">
            <motion.div
              initial={reduce ? {} : { opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] overflow-hidden bg-[#241a13] sm:aspect-[3/2] lg:aspect-[4/5]"
            >
              <SmartImage
                image={{ src: customImg, alt: "Three hand-made Western hats with decorative bands laid on tooled saddle leather", cdn: false }}
                width={1000}
                height={1200}
                sizes="(max-width:1024px) 92vw, 46vw"
                className="absolute inset-0 transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/25 to-transparent" aria-hidden />
            </motion.div>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { icon: Ruler, k: "Your measurements", v: "Head size and fit come first." },
                { icon: PencilRuler, k: "Your shape", v: "Crease, brim width, brim curl." },
                { icon: Sparkles, k: "Your band", v: "Tooled leather, braided, silver-toned." },
              ].map((row) => (
                <Reveal key={row.k}>
                  <div className="flex gap-3">
                    <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.4} />
                    <div>
                      <p className="text-[0.62rem] font-bold tracking-[0.18em] text-ivory uppercase">{row.k}</p>
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-parchment/50">{row.v}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-8 border-l-2 border-brass/40 pl-4 text-[0.72rem] leading-relaxed text-parchment/45">
              Custom hats are not priced in the shop because the shape, materials and detailing change the work
              involved. Send the form and the hat is discussed before anything is quoted.
            </p>
          </div>

          {/* Form / copy */}
          <div>
            <Reveal>
              <Eyebrow>Made for you</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.7rem)] leading-[1.04] text-ivory">
                Your Style. Your Hat.
                <br />
                <span className="italic text-parchment/80">Your Story.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-parchment/65">
                Looking for a particular shape or style? Tell us what you have in mind, and we can start a
                conversation about your custom hat.
              </p>
            </Reveal>

            {withForm ? (
              <Reveal delay={0.18} className="mt-9">
                <InquiryForm interestOptions={interests} />
              </Reveal>
            ) : (
              <Reveal delay={0.18} className="mt-9">
                <Link to="/contact" className="btn btn-solid">
                  Open the enquiry form <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
