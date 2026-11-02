import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PROCESS_STEPS } from "@/data/site";
import { Reveal, SectionHeading, SmartImage } from "@/components/ui";

export function Process({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <section
      id="process"
      className={`relative overflow-hidden py-24 sm:py-28 ${light ? "bg-parchment text-espresso" : "bg-espresso-950 text-parchment"}`}
    >
      {light && (
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "radial-gradient(80% 50% at 50% 0%, rgba(183,151,91,.22), transparent 70%)" }}
          aria-hidden
        />
      )}

      <div className="relative mx-auto max-w-[104rem] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="How it comes together"
            tone={light ? "dark" : "light"}
            title={
              <>
                Four steps between you
                <br className="hidden sm:block" /> and the hat on your head.
              </>
            }
            lede="A general guide to shopping and commissioning here — from picking a shape to wearing it out."
            className="lg:max-w-2xl"
          />
          <Reveal delay={0.2} className="shrink-0">
            <Link to="/contact" className={`btn ${light ? "btn-dark" : "btn-outline"}`}>
              Start a custom enquiry
              <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </Link>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.index}>
              <Reveal delay={i * 0.09} className="group h-full">
                <article className={`flex h-full flex-col ${i > 0 ? "lg:border-l" : ""} ${light ? "lg:border-espresso/12" : "lg:border-brass/15"}`}>
                  <div className={`relative ${light ? "lg:pl-8" : "lg:pl-8"}`}>
                    <div className="relative aspect-[5/4] overflow-hidden bg-[#2b1f18]">
                      <SmartImage
                        image={{ src: step.image, alt: step.alt, cdn: false }}
                        width={760}
                        height={600}
                        sizes="(max-width:640px) 92vw,(max-width:1024px) 46vw,340px"
                        className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                      />
                      <div className={`absolute inset-0 ${light ? "bg-espresso/10" : "bg-espresso-950/25"}`} aria-hidden />
                      <span
                        className={`absolute top-3 left-3 font-display text-[2.6rem] leading-none ${
                          light ? "text-ivory/90" : "text-brass/85"
                        }`}
                      >
                        {step.index}
                      </span>
                    </div>
                  </div>

                  <div className={`flex flex-1 flex-col pt-6 ${i > 0 ? "lg:pl-8" : ""} ${i < PROCESS_STEPS.length - 1 ? "lg:pr-8" : ""}`}>
                    <h3 className={`font-display text-[1.55rem] ${light ? "text-espresso" : "text-ivory"}`}>
                      {step.title}
                    </h3>
                    <div className={`mt-3 h-px w-10 ${light ? "bg-tobacco/40" : "bg-brass/45"}`} aria-hidden />
                    <p className={`mt-4 text-[0.88rem] leading-relaxed ${light ? "text-charcoal/70" : "text-parchment/58"}`}>
                      {step.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
