import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Reveal } from "@/components/ui";
import { HatMark } from "@/components/icons";

export function NotFound() {
  const { pathname } = useLocation();
  const fromHash = pathname.replace(/^\//, "");

  return (
    <section className="relative flex min-h-[76vh] items-center overflow-hidden bg-espresso-950 py-32 text-parchment">
      <div className="pointer-events-none absolute inset-0 grain opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 50% at 50% 20%, rgba(183,151,91,.14), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <HatMark className="mx-auto h-10 w-auto text-brass/70" />
          <p className="mt-8 font-display text-[clamp(4.5rem,16vw,9rem)] leading-none text-ivory/12">404</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] leading-tight text-ivory">
            This trail goes nowhere.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-relaxed text-parchment/60">
            Nothing is listed at{" "}
            <code className="text-brass/80">/{fromHash || "that-address"}</code>. The shop, the craft story and the
            custom-hat enquiry are all still open.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn btn-solid">
              Browse the shop <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </Link>
            <Link to="/" className="btn btn-outline">
              <Compass className="h-4 w-4" strokeWidth={1.6} /> Back to the front page
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
