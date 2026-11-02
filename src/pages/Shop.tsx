import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { PageHeader, headerTexture } from "@/components/PageHeader";
import { ProductExplorer } from "@/components/sections/ProductExplorer";
import { PRODUCTS, formatPrice } from "@/data/products";
import { Reveal } from "@/components/ui";

export function Shop() {
  const priced = PRODUCTS.filter((p) => p.price !== null);
  const lowest = Math.min(...priced.map((p) => p.price as number));
  const highest = Math.max(...priced.map((p) => p.price as number));

  return (
    <>
      <PageHeader
        eyebrow="The full shop"
        title={
          <>
            Everything currently
            <br />
            <span className="italic text-parchment/85">listed in the store.</span>
          </>
        }
        lede="Hand-made hat bands, leather goods and hat accessories, priced exactly as they are listed on the brand's Shopify storefront. Custom hats are handled by enquiry instead."
        image={headerTexture}
        imageAlt=""
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.62rem] font-bold tracking-[0.22em] text-parchment/45 uppercase">
          <span>{PRODUCTS.length} pieces</span>
          <span className="hidden h-3 w-px bg-brass/30 sm:block" aria-hidden />
          <span>
            Priced {formatPrice(lowest)} – {formatPrice(highest)}
          </span>
          <span className="hidden h-3 w-px bg-brass/30 sm:block" aria-hidden />
          <span>Custom hats by enquiry</span>
        </div>
      </PageHeader>

      <ProductExplorer
        pool={PRODUCTS}
        tone="light"
        showSearch
        showFilters
        id="shop-grid"
      />

      <section className="bg-parchment pb-24 sm:pb-28">
        <div className="mx-auto max-w-[104rem] px-5 sm:px-8">
          <Reveal>
            <div className="grid gap-8 border-y border-espresso/15 py-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-tobacco" strokeWidth={1.5} />
                <p className="max-w-2xl text-[0.9rem] leading-relaxed text-charcoal/70">
                  Prices shown match the live listings at the time this concept was built. Nothing here takes payment —
                  this is a design mockup, so the order itself is completed on the connected Shopify storefront.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn btn-dark">
                  Ask about a custom hat <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </Link>
                <Link to="/collections/custom-hats" className="btn btn-ghost-brass">
                  How custom work runs
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
