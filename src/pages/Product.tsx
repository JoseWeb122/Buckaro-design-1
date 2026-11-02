import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, ExternalLink, Minus, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import {
  CATEGORIES,
  PRODUCT_BY_HANDLE,
  formatPrice,
  relatedProducts,
} from "@/data/products";
import { BRAND } from "@/data/site";
import { useStore } from "@/lib/store";
import { Reveal, SmartImage } from "@/components/ui";
import { Concho } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { InquiryForm } from "@/components/InquiryForm";
import { NotFound } from "@/pages/NotFound";
import { cn } from "@/utils/cn";

export function ProductPage() {
  const { handle } = useParams();
  const product = handle ? PRODUCT_BY_HANDLE.get(handle) : undefined;
  const { addToCart } = useStore();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setActive(0);
    setQty(1);
  }, [handle]);

  const related = useMemo(() => (product ? relatedProducts(product, 4) : []), [product]);

  if (!product) return <NotFound />;

  const category = CATEGORIES.find((c) => c.id === product.category);
  const onSale = product.compareAtPrice !== null && product.price !== null && product.price < product.compareAtPrice;

  return (
    <>
      <div className="bg-espresso-950 pt-32 pb-10 sm:pt-36">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[104rem] px-5 sm:px-8">
          <ol className="flex flex-wrap items-center gap-2 text-[0.58rem] font-bold tracking-[0.2em] text-parchment/40 uppercase">
            <li>
              <Link to="/" className="transition-colors hover:text-brass">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
            <li>
              <Link to="/shop" className="transition-colors hover:text-brass">
                Shop
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
            <li>
              <Link to={`/collections/${product.category}`} className="transition-colors hover:text-brass">
                {category?.label}
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 opacity-50" aria-hidden />
            <li className="text-brass/80">{product.name}</li>
          </ol>
        </nav>
      </div>

      <section className="relative overflow-hidden bg-espresso-950 pb-20 text-parchment sm:pb-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 45% at 80% 0%, rgba(145,101,66,.22), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[104rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            {product.images.length > 1 && (
              <div className="flex gap-3 sm:flex-col" role="group" aria-label="Product image thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setActive(i)}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={i === active}
                    className={cn(
                      "relative h-20 w-16 shrink-0 overflow-hidden border transition-all duration-300 sm:h-24 sm:w-20",
                      i === active ? "border-brass" : "border-brass/15 opacity-60 hover:opacity-100",
                    )}
                  >
                    <SmartImage image={img} width={200} height={250} sizes="80px" className="absolute inset-0" />
                  </button>
                ))}
              </div>
            )}

            <div className="relative min-h-[24rem] flex-1 overflow-hidden bg-[#2b1f18]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={reduce ? {} : { opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    image={product.images[active]}
                    width={1100}
                    height={1300}
                    eager
                    sizes="(max-width:1024px) 92vw, 620px"
                    className="absolute inset-0"
                  />
                </motion.div>
              </AnimatePresence>
              <span className="pointer-events-none absolute inset-0 border border-brass/12" aria-hidden />
            </div>
          </div>

          {/* Details */}
          <div className="lg:pt-2">
            <span className="flex items-center gap-2.5 text-[0.58rem] font-bold tracking-[0.28em] text-brass uppercase">
              {category?.label} <Concho className="opacity-50" />
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] text-ivory">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-baseline gap-4">
              <span className="font-display text-[2.1rem] text-brass-light">{formatPrice(product.price)}</span>
              {onSale && (
                <>
                  <span className="text-base text-parchment/35 line-through">{formatPrice(product.compareAtPrice)}</span>
                  <span className="bg-brass px-2 py-1 text-[0.55rem] font-bold tracking-[0.2em] text-espresso uppercase">
                    Sale
                  </span>
                </>
              )}
              {product.enquiryOnly && (
                <span className="border border-brass/40 px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.2em] text-brass uppercase">
                  Quoted per commission
                </span>
              )}
            </div>

            <div className="mt-7 h-px w-full hairline" aria-hidden />

            <p className="mt-7 text-[1rem] leading-[1.8] text-parchment/75 text-pretty">{product.description}</p>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-2.5 border-b border-brass/12 pb-3 text-[0.84rem] text-parchment/60">
                  <Concho className="mt-[0.45rem] shrink-0 text-brass/60" />
                  {d}
                </li>
              ))}
            </ul>

            {product.note && (
              <p className="mt-7 border-l-2 border-brass/50 bg-brass/[0.06] px-4 py-3.5 text-[0.76rem] leading-relaxed text-parchment/55">
                {product.note}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-stretch gap-3">
              {product.enquiryOnly ? (
                <a href="#enquire" className="btn btn-solid">
                  Ask about this piece <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </a>
              ) : (
                <>
                  <div className="flex items-center border border-brass/25">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="px-3.5 py-3.5 text-parchment/70 transition-colors hover:bg-brass/10 hover:text-brass"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold tabular-nums text-ivory" aria-live="polite">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="Increase quantity"
                      className="px-3.5 py-3.5 text-parchment/70 transition-colors hover:bg-brass/10 hover:text-brass"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                  </div>
                  <button onClick={() => addToCart(product, qty)} className="btn btn-solid flex-1 min-w-56">
                    <ShoppingBag className="h-4 w-4" strokeWidth={1.7} />
                    Add to bag — {formatPrice((product.price ?? 0) * qty)}
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 grid gap-3 text-[0.76rem] leading-relaxed text-parchment/55 sm:grid-cols-2">
              <p className="flex gap-2.5 border border-brass/15 bg-brass/[0.04] px-3.5 py-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brass/70" strokeWidth={1.4} />
                Demo storefront: this concept page does not take payment. Orders run through the brand's Shopify
                store.
              </p>
              <a
                href={BRAND.links.shop}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-2.5 border border-brass/15 px-3.5 py-3 transition-colors hover:border-brass/45 hover:text-brass-light"
              >
                <ExternalLink className="h-4 w-4 shrink-0 text-brass/70" strokeWidth={1.5} />
                Open this listing on the Shopify store
                <ArrowRight className="ml-auto h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
              </a>
            </div>

            <p className="mt-6 text-[0.7rem] leading-relaxed text-parchment/40">
              Shipping, returns and pickup terms are not restated here — the live listing on the storefront is the
              source of truth for fulfilment.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-parchment py-20 text-espresso sm:py-24">
        <div className="mx-auto max-w-[104rem] px-5 sm:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-tobacco">Also on the bench</span>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.7rem)] leading-tight">
                Pieces that sit well with this one
              </h2>
            </div>
            <Link to="/shop" className="btn btn-ghost-brass hidden shrink-0 sm:inline-flex">
              All products
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} compact={i > 3} />
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      {product.enquiryOnly && (
        <section id="enquire" className="bg-espresso py-20 text-parchment sm:py-24">
          <div className="mx-auto grid max-w-[104rem] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <span className="eyebrow text-brass">Start here</span>
              <h2 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-tight text-ivory">
                Tell us what you want this one to become.
              </h2>
              <p className="mt-5 max-w-md text-[0.94rem] leading-relaxed text-parchment/60">
                Send the shape, colours and details you have in mind. Once there is enough to work with, the pieces
                are discussed and quoted individually.
              </p>
              <ul className="mt-8 space-y-3">
                {["Photos or references welcome", "No obligation to order", "Quoted before any work begins"].map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[0.86rem] text-parchment/70">
                    <Concho className="text-brass/70" /> {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <InquiryForm initialInterest={product.name} idPrefix="product-enquiry" />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
