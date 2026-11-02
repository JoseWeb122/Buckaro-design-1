import { useNavigate } from "react-router-dom";
import { Hand, MessageSquareQuote, Ruler, Waypoints } from "lucide-react";
import { TRUST_ITEMS } from "@/data/site";
import { scrollToId, useStore } from "@/lib/store";
import { Eyebrow, Reveal } from "@/components/ui";
import { Concho } from "@/components/icons";

const ICONS = {
  hand: Hand,
  compass: Waypoints,
  ruler: Ruler,
  message: MessageSquareQuote,
} as const;

export function Trust() {
  const navigate = useNavigate();
  const { pushToast } = useStore();

  const askAboutCustom = () => {
    if (window.location.hash.includes("contact")) {
      scrollToId("contact-form");
      return;
    }
    if (window.location.hash === "" || window.location.hash === "#/") {
      const el = document.getElementById("custom");
      if (el) {
        scrollToId("custom");
        return;
      }
    }
    navigate("/contact");
    pushToast("Enquiry form ready", "It sits at the bottom of this page — the demo notes are inside the form.", "info");
  };

  return (
    <section className="relative overflow-hidden bg-parchment-dark py-24 text-espresso sm:py-28" id="trust">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 15% 15%, rgba(255,249,239,.7), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[104rem] px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <div>
            <Reveal>
              <Eyebrow tone="dark">What you get here</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 max-w-xl font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.06]">
                Honest Western goods, made one at a time.
              </h2>
            </Reveal>

            <ul className="mt-12 grid gap-x-12 sm:grid-cols-2">
              {TRUST_ITEMS.map((item, i) => {
                const Icon = ICONS[item.icon];
                return (
                  <li key={item.title}>
                    <Reveal delay={i * 0.08}>
                      <div className="group flex gap-5 border-t border-espresso/15 py-6 transition-colors hover:border-tobacco">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-tobacco/35 text-tobacco transition-colors group-hover:border-espresso group-hover:bg-espresso group-hover:text-brass">
                          <Icon className="h-4.5 w-4.5" strokeWidth={1.4} />
                        </span>
                        <div>
                          <h3 className="font-display text-[1.4rem] leading-tight">{item.title}</h3>
                          <p className="mt-2 text-[0.86rem] leading-relaxed text-charcoal/70">{item.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            <Reveal delay={0.1}>
              <p className="mt-8 flex items-start gap-2.5 text-[0.72rem] leading-relaxed text-charcoal/50">
                <Concho className="mt-1 shrink-0 text-tobacco/60" />
                Customer reviews are not reproduced in this concept. Once the storefront connection is live, real
                product reviews can be pulled straight from it rather than written here.
              </p>
            </Reveal>
          </div>

          {/* CTA panel */}
          <Reveal delay={0.16} className="lg:pt-6">
            <div className="relative flex h-full flex-col justify-between overflow-hidden bg-espresso p-8 text-parchment sm:p-10">
              <div className="pointer-events-none absolute inset-0 grain opacity-70" aria-hidden />
              <div
                className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rotate-45 border border-brass/20"
                aria-hidden
              />
              <div className="relative">
                <span className="text-[0.58rem] font-bold tracking-[0.3em] text-brass uppercase">
                  The one-off route
                </span>
                <h3 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.08] text-ivory">
                  Looking for Something
                  <br />
                  <span className="italic text-parchment/85">Distinctly Yours?</span>
                </h3>
                <div className="mt-6 h-px w-28 hairline" aria-hidden />
                <p className="mt-6 max-w-sm text-[0.9rem] leading-relaxed text-parchment/60">
                  Describe the crease, the brim, the colours and the band you keep picturing. Custom work starts with a
                  conversation, not a checkout button.
                </p>
              </div>

              <div className="relative mt-9 flex flex-col gap-3">
                <button onClick={askAboutCustom} className="btn btn-solid w-full">
                  Ask about a custom hat
                </button>
                  <button onClick={() => navigate("/shop")} className="btn btn-outline w-full">
                  Browse finished pieces
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
