import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { CATEGORIES, formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";
import { Modal, SmartImage } from "@/components/ui";
import { Concho } from "@/components/icons";
import { cn } from "@/utils/cn";

export function QuickView() {
  const { quickView, setQuickView, addToCart } = useStore();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setActive(0);
    setQty(1);
  }, [quickView?.id]);

  const product = quickView;

  return (
    <AnimatePresence mode="wait">
      {product && (
        <Modal
          key={product.id}
          open
          variant="center"
          labelledBy="quickview-title"
          onClose={() => setQuickView(null)}
          className="max-w-4xl"
        >
          <div className="grid h-full max-h-[92dvh] grid-cols-1 overflow-y-auto md:grid-cols-[1.05fr_1fr] md:overflow-hidden">
            {/* Gallery */}
            <div className="relative flex flex-col bg-[#2a1e17] p-4 md:p-6">
              <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden md:aspect-auto md:h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <SmartImage
                      image={product.images[active]}
                      width={900}
                      height={1100}
                      eager
                      sizes="(max-width:768px) 100vw, 460px"
                      className="absolute inset-0"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {product.images.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={img.src}
                      onClick={() => setActive(i)}
                      aria-label={`Show image ${i + 1} of ${product.name}`}
                      aria-pressed={i === active}
                      className={cn(
                        "relative h-16 w-14 shrink-0 overflow-hidden border transition-colors",
                        i === active ? "border-brass" : "border-parchment/15 hover:border-parchment/40",
                      )}
                    >
                      <SmartImage image={img} width={160} height={200} sizes="60px" className="absolute inset-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col overflow-y-auto p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.28em] text-brass uppercase">
                  {CATEGORIES.find((c) => c.id === product.category)?.label}
                  <Concho className="opacity-50" />
                </span>
                <button
                  onClick={() => setQuickView(null)}
                  aria-label="Close quick view"
                  className="-mt-1 -mr-1 p-2 text-parchment/50 transition-colors hover:text-brass"
                >
                  <X className="h-5 w-5" strokeWidth={1.4} />
                </button>
              </div>

              <h2 id="quickview-title" className="mt-4 font-display text-[2rem] leading-tight text-ivory">
                {product.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-2xl text-brass-light">{formatPrice(product.price)}</span>
                {product.compareAtPrice !== null && product.price !== null && product.price < product.compareAtPrice && (
                  <span className="text-sm text-parchment/40 line-through">{formatPrice(product.compareAtPrice)}</span>
                )}
                {product.enquiryOnly && (
                  <span className="text-[0.58rem] font-bold tracking-[0.2em] text-tobacco uppercase">Enquiry</span>
                )}
              </div>

              <div className="mt-5 h-px w-full hairline" aria-hidden />

              <p className="mt-5 text-[0.92rem] leading-relaxed text-parchment/72">{product.description}</p>

              <ul className="mt-5 space-y-1.5">
                {product.details.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[0.8rem] text-parchment/55">
                    <Concho className="mt-[0.42rem] shrink-0 text-brass/60" />
                    {d}
                  </li>
                ))}
              </ul>

              {product.note && (
                <p className="mt-5 border-l-2 border-brass/40 bg-brass/[0.06] px-4 py-3 text-[0.72rem] leading-relaxed text-parchment/50">
                  {product.note}
                </p>
              )}

              <div className="mt-auto pt-7">
                {product.enquiryOnly ? (
                  <Link
                    to={`/contact?about=${encodeURIComponent(product.name)}`}
                    onClick={() => setQuickView(null)}
                    className="btn btn-solid w-full"
                  >
                    Start a custom enquiry <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                  </Link>
                ) : (
                  <div className="flex items-stretch gap-3">
                    <div className="flex items-center border border-brass/25">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="px-3 py-3 text-parchment/70 transition-colors hover:bg-brass/10 hover:text-brass"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-9 text-center text-sm font-semibold tabular-nums text-ivory" aria-live="polite">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                        aria-label="Increase quantity"
                        className="px-3 py-3 text-parchment/70 transition-colors hover:bg-brass/10 hover:text-brass"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(product, qty);
                        setQuickView(null);
                      }}
                      className="btn btn-solid flex-1"
                    >
                      <ShoppingBag className="h-4 w-4" strokeWidth={1.7} />
                      Add — {formatPrice((product.price ?? 0) * qty)}
                    </button>
                  </div>
                )}

                <Link
                  to={`/products/${product.handle}`}
                  onClick={() => setQuickView(null)}
                  className="mt-4 inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.24em] text-parchment/60 uppercase transition-colors hover:text-brass"
                >
                  Full product details <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
