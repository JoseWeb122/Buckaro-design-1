import { Link } from "react-router-dom";
import { ArrowUp, MapPinOff } from "lucide-react";
import { BRAND } from "@/data/site";
import { CATEGORIES } from "@/data/products";
import { Concho, FacebookMark, HatMark, InstagramMark } from "@/components/icons";
import { scrollToId } from "@/lib/store";
import { useLocation, useNavigate } from "react-router-dom";

const SHOP_LINKS = [
  { label: "All products", to: "/shop" },
  ...CATEGORIES.map((c) => ({ label: c.label, to: `/collections/${c.id}` })),
];

const BRAND_LINKS = [
  { label: "Our craft", to: "/our-craft" },
  { label: "Custom hat enquiry", to: "/contact" },
  { label: "Lifestyle gallery", to: "/" , scroll: "gallery" },
  { label: "How a custom hat works", to: "/", scroll: "process" },
];

export function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const gotoSection = (id: string) => {
    if (pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/");
      window.setTimeout(() => scrollToId(id), 260);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-brass/18 bg-espresso text-parchment grain">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 120%, rgba(183,151,91,0.14), transparent 62%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[104rem] px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <HatMark className="h-8 w-auto text-brass" />
            <p className="mt-6 max-w-sm font-display text-[1.75rem] leading-[1.22] text-ivory">
              Hand-made Western hats, bands and leather goods for people who would rather not match anyone else.
            </p>
            <div className="mt-6 h-px w-28 hairline" aria-hidden />
            <p className="mt-6 max-w-sm text-[0.82rem] leading-relaxed text-parchment/50">
              Browse the shop here, or continue to the brand's own storefront to place an order.
            </p>
            <a href={BRAND.links.shop} target="_blank" rel="noreferrer noopener" className="btn btn-outline mt-7 !py-3 text-[0.58rem]">
              Visit the Shopify store
            </a>
          </div>

          <nav aria-label="Shop">
            <h3 className="flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.3em] text-brass uppercase">
              Shop <Concho className="opacity-50" />
            </h3>
            <ul className="mt-6 space-y-3.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 text-[0.88rem] text-parchment/70 transition-colors hover:text-brass-light"
                  >
                    <span className="h-px w-0 bg-brass transition-all duration-400 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Brand">
            <h3 className="flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.3em] text-brass uppercase">
              The Workshop <Concho className="opacity-50" />
            </h3>
            <ul className="mt-6 space-y-3.5">
              {BRAND_LINKS.map((l) => (
                <li key={l.label}>
                  {"scroll" in l && l.scroll ? (
                    <button
                      onClick={() => gotoSection(l.scroll as string)}
                      className="group inline-flex items-center gap-2 text-left text-[0.88rem] text-parchment/70 transition-colors hover:text-brass-light"
                    >
                      <span className="h-px w-0 bg-brass transition-all duration-400 group-hover:w-4" />
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-2 text-[0.88rem] text-parchment/70 transition-colors hover:text-brass-light"
                    >
                      <span className="h-px w-0 bg-brass transition-all duration-400 group-hover:w-4" />
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.3em] text-brass uppercase">
              Elsewhere <Concho className="opacity-50" />
            </h3>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a
                  href={BRAND.links.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-3 text-[0.88rem] text-parchment/70 transition-colors hover:text-brass-light"
                >
                  <InstagramMark className="h-4 w-4 text-brass/70 transition-colors group-hover:text-brass" />
                  @buckaroohatterscustom
                </a>
              </li>
              <li>
                <a
                  href={BRAND.links.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-3 text-[0.88rem] text-parchment/70 transition-colors hover:text-brass-light"
                >
                  <FacebookMark className="h-4 w-4 text-brass/70 transition-colors group-hover:text-brass" />
                  Buckaroo Hatters Custom Hats
                </a>
              </li>
            </ul>

            <p className="mt-7 flex items-start gap-2.5 border border-brass/18 bg-brass/[0.04] p-3.5 text-[0.7rem] leading-relaxed text-parchment/45">
              <MapPinOff className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass/60" strokeWidth={1.5} />
              Shop address, phone and opening hours are left blank in this concept — they are filled in from the
              business owner before launch.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-brass/15 pt-7 sm:flex-row sm:items-center">
          <p className="text-[0.68rem] text-parchment/40">
            © {new Date().getFullYear()} {BRAND.legalLine}. Concept storefront — a front-end design mockup, not a
            live shop.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-[0.62rem] font-bold tracking-[0.2em] text-parchment/45 uppercase">
            <Link to="/privacy" className="transition-colors hover:text-brass">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-brass">
              Terms
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 transition-colors hover:text-brass"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative select-none overflow-hidden" aria-hidden>
        <p className="-mb-3 translate-y-3 text-center font-display text-[clamp(3.2rem,15vw,13rem)] leading-none font-medium tracking-[0.06em] whitespace-nowrap text-ivory/[0.045]">
          BUCKAROO HATTERS
        </p>
      </div>
    </footer>
  );
}
