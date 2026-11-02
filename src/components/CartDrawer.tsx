import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShieldAlert, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStore } from "@/lib/store";
import { Modal, SmartImage } from "@/components/ui";
import { Concho } from "@/components/icons";

export function CartDrawer() {
  const { cartOpen, closeCart, lines, byId, setQty, removeLine, itemCount, subtotal, hasUnpriced, clearCart, pushToast } =
    useStore();
  const [demoShown, setDemoShown] = useState(false);

  const items = lines
    .map((l) => ({ line: l, product: byId(l.productId) }))
    .filter((x): x is { line: typeof x.line; product: NonNullable<typeof x.product> } => Boolean(x.product));

  return (
    <AnimatePresence>
      {cartOpen && (
        <Modal key="cart" open variant="right" labelledBy="cart-title" onClose={closeCart}>
          <header className="flex items-center justify-between border-b border-brass/20 bg-[#251a13] px-5 py-4">
            <div>
              <span className="flex items-center gap-2 text-[0.56rem] font-bold tracking-[0.3em] text-brass uppercase">
                Buckaroo Hatters <Concho className="opacity-50" />
              </span>
              <h2 id="cart-title" className="mt-1 font-display text-2xl text-ivory">
                Your bag <span className="text-brass">({itemCount})</span>
              </h2>
            </div>
            <button
              onClick={closeCart}
              aria-label="Close cart"
              className="p-2 text-parchment/55 transition-colors hover:text-brass"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {items.length === 0 ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-brass/25 text-brass/70">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.2} />
                </span>
                <h3 className="mt-6 font-display text-2xl text-ivory">Nothing in the bag yet</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-parchment/55">
                  Hat bands, leather goods and made-to-order hats — start with the collection.
                </p>
                <Link to="/shop" onClick={closeCart} className="btn btn-solid mt-7">
                  Continue shopping <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-brass/12">
                <AnimatePresence initial={false}>
                  {items.map(({ line, product }) => (
                    <motion.li
                      key={product.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 py-4">
                        <Link
                          to={`/products/${product.handle}`}
                          onClick={closeCart}
                          className="relative block h-28 w-20 shrink-0 overflow-hidden bg-[#2b1f18]"
                        >
                          <SmartImage image={product.images[0]} width={220} height={280} sizes="80px" className="absolute inset-0" />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <span className="text-[0.53rem] font-bold tracking-[0.24em] text-tobacco uppercase">
                            {product.enquiryOnly ? "Enquiry" : "In stock piece"}
                          </span>
                          <h3 className="mt-1 truncate font-display text-lg leading-snug text-ivory">
                            <Link to={`/products/${product.handle}`} onClick={closeCart} className="hover:text-brass">
                              {product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-[0.78rem] text-parchment/50">
                            {formatPrice(product.price)} {product.price !== null && line.qty > 1 && (
                              <span className="text-parchment/35">each</span>
                            )}
                          </p>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex items-center border border-brass/22">
                              <button
                                onClick={() => setQty(product.id, line.qty - 1)}
                                aria-label={`Decrease quantity of ${product.name}`}
                                className="px-2 py-1.5 text-parchment/65 transition-colors hover:bg-brass/10 hover:text-brass"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-7 text-center text-[0.8rem] font-semibold tabular-nums text-ivory">
                                {line.qty}
                              </span>
                              <button
                                onClick={() => setQty(product.id, line.qty + 1)}
                                aria-label={`Increase quantity of ${product.name}`}
                                className="px-2 py-1.5 text-parchment/65 transition-colors hover:bg-brass/10 hover:text-brass"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeLine(product.id)}
                              aria-label={`Remove ${product.name} from cart`}
                              className="flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.18em] text-parchment/40 uppercase transition-colors hover:text-[#c2703f]"
                            >
                              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <footer className="border-t border-brass/20 bg-[#1f1610] px-5 py-5">
              {hasUnpriced && (
                <p className="mb-4 flex gap-2.5 border border-tobacco/40 bg-tobacco/10 px-3 py-2.5 text-[0.72rem] leading-relaxed text-parchment/70">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
                  One or more items in this bag are priced per enquiry, so a total cannot be shown. Confirm the
                  finished price before ordering.
                </p>
              )}

              <div className="flex items-baseline justify-between">
                <span className="text-[0.62rem] font-bold tracking-[0.26em] text-parchment/55 uppercase">Subtotal</span>
                <span className="font-display text-2xl text-brass-light">
                  {subtotal === null ? "To be confirmed" : formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1.5 text-[0.66rem] text-parchment/40">
                Taxes and shipping calculated at checkout · not enabled in this mockup
              </p>

              <AnimatePresence>
                {demoShown && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden text-[0.72rem] leading-relaxed text-brass/80"
                  >
                    <span className="mt-4 block border border-brass/30 bg-brass/[0.07] px-3 py-2.5">
                      This is a front-end concept. No payment details are collected and no order has been created —
                      live Shopify checkout is connected during production.
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                onClick={() => {
                  setDemoShown(true);
                  pushToast("Demo checkout", "No payment is taken — Shopify checkout connects in production.", "info");
                }}
                className="btn btn-solid mt-4 w-full"
              >
                Checkout · demo mode
              </button>

              <div className="mt-3 flex items-center justify-between gap-3 text-[0.62rem] font-bold tracking-[0.18em] uppercase">
                <button onClick={clearCart} className="text-parchment/40 transition-colors hover:text-[#c2703f]">
                  Empty bag
                </button>
                <Link to="/shop" onClick={closeCart} className="text-brass transition-colors hover:text-brass-light">
                  Continue shopping →
                </Link>
              </div>
            </footer>
          )}
        </Modal>
      )}
    </AnimatePresence>
  );
}
