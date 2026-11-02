import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Eyebrow, Reveal, SmartImage } from "@/components/ui";
import { Concho } from "@/components/icons";
import { PRINCIPLES } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import atelierImg from "@/assets/atelier.jpg";
import customImg from "@/assets/custom.jpg";

const ANATOMY = [
  { n: "1", t: "Crown", d: "The dome above the band. Its height changes the whole stance of a hat." },
  { n: "2", t: "Crease", d: "The pinch run down the centre — cattleman, pinched front, teardrop, open." },
  { n: "3", t: "Brim", d: "Width and curl: shade, style and how it sheds rain off your shoulders." },
  { n: "4", t: "Band", d: "Where personal style actually lives. Tooled leather, braid, conchos, stitching." },
  { n: "5", t: "Sweat band", d: "The inner strip that sets the fit — and what hat accessories clip onto." },
];

export function OurCraft() {
  const inShop = PRODUCTS.filter((p) => !p.enquiryOnly).length;

  return (
    <>
      <PageHeader
        eyebrow="The workshop"
        title={
          <>
            Slow work,
            <span className="italic text-parchment/85"> sharp shapes.</span>
          </>
        }
        lede="How a Western hat is put together, what to look for when you choose one, and where the personal part begins."
        image={customImg}
        imageAlt=""
      />

      {/* Editorial split */}
      <section className="relative overflow-hidden bg-espresso py-24 text-parchment sm:py-28">
        <div className="mx-auto grid max-w-[104rem] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#2b1f18]">
              <SmartImage
                image={{ src: atelierImg, alt: "Hands shaping a wet felt crown over a wooden block", cdn: false }}
                width={1100}
                height={850}
                eager
                sizes="(max-width:1024px) 92vw, 560px"
                className="absolute inset-0"
              />
              <span className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 border-b border-l border-brass/45" aria-hidden />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Why it takes time</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.06] text-ivory">
                A hat is a study in proportions, and no two heads argue the same case.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 text-[0.98rem] leading-[1.85] text-parchment/68 text-pretty">
                That is why hand-made Western hats are worth talking about rather than scrolling past. The felt has to
                be shaped, the crease has to hold, the brim has to sit at the height you actually wear. Everything else
                — the tooling, the buckles, the stitching on a band — is decoration laid over a shape that already
                works.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-5 text-[0.98rem] leading-[1.85] text-parchment/68 text-pretty">
                {inShop} finished pieces are listed in the shop today, and each one is photographed as it is. Beyond
                that, the work starts as a conversation.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/shop" className="btn btn-solid">
                  See the shop <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Ask about a custom hat
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Anatomy */}
      <section className="bg-parchment py-24 text-espresso sm:py-28">
        <div className="mx-auto max-w-[104rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow tone="dark">Reading a hat</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]">
                Five parts worth naming before you buy.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-[0.96rem] leading-relaxed text-charcoal/70">
                Once you can describe a hat instead of pointing at one, shopping and commissioning both get easier.
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-5">
            {ANATOMY.map((a, i) => (
              <li key={a.n}>
                <Reveal delay={i * 0.07} className="h-full">
                  <div className="group relative h-full border-t border-espresso/20 pt-6 transition-colors hover:border-tobacco sm:pr-7">
                    <span className="font-display text-[0.95rem] tracking-[0.2em] text-tobacco uppercase">
                      {a.n}
                    </span>
                    <h3 className="mt-3 font-display text-[1.6rem] leading-tight">{a.t}</h3>
                    <p className="mt-2.5 text-[0.86rem] leading-relaxed text-charcoal/68">{a.d}</p>
                    <span className="mt-5 block h-px w-0 bg-brass transition-all duration-700 group-hover:w-full" aria-hidden />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section className="relative overflow-hidden bg-espresso-950 py-24 text-parchment sm:py-28">
        <div className="pointer-events-none absolute inset-0 grain opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-[104rem] px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <Reveal>
                <Eyebrow>Three things that decide it</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-6 font-display text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.06] text-ivory">
                  What the work keeps coming back to.
                </h2>
              </Reveal>
            </div>
            <ul className="space-y-px">
              {PRINCIPLES.map((p, i) => (
                <li key={p.number}>
                  <Reveal delay={i * 0.08}>
                    <div className="grid gap-5 border-t border-brass/20 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8">
                      <span className="font-display text-[2.4rem] leading-none text-brass/70">{p.number}</span>
                      <div>
                        <h3 className="font-display text-[1.7rem] leading-tight text-ivory">{p.title}</h3>
                        <p className="mt-3 max-w-xl text-[0.92rem] leading-relaxed text-parchment/62">{p.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col items-start gap-5 border border-brass/20 bg-brass/[0.05] p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3 text-[0.86rem] text-parchment/70">
                <Concho className="shrink-0 text-brass" />
                Ready to look at the finished pieces rather than read about them?
              </p>
              <Link to="/collections/hat-bands" className="btn btn-outline shrink-0">
                Shop hat bands <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Process tone="light" />

      <Gallery compact />
    </>
  );
}
