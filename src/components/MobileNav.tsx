import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, ShoppingBag, X } from "lucide-react";
import { BRAND } from "@/data/site";
import { CATEGORIES } from "@/data/products";
import { useStore } from "@/lib/store";
import { FacebookMark, InstagramMark, Wordmark } from "@/components/icons";
import { cn } from "@/utils/cn";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const { setSearchOpen, openCart, itemCount } = useStore();
  const location = useLocation();

  const links = [
    { label: "Home", to: "/" },
    { label: "Shop All", to: "/shop" },
    { label: "Our Craft", to: "/our-craft" },
    { label: "Custom Enquiry", to: "/contact" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <div className="absolute inset-0 bg-espresso-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.nav
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: reduce ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reduce ? 0 : "100%" }}
            transition={{ duration: reduce ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative ml-auto flex h-full w-full max-w-[23rem] flex-col overflow-y-auto border-l border-brass/20 bg-espresso px-6 pt-5 pb-8"
          >
            <div className="flex items-center justify-between">
              <Wordmark compact />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 text-parchment/60 transition-colors hover:text-brass"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <ul className="mt-9 space-y-px">
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={reduce ? {} : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.08 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between border-b border-brass/12 py-4 font-display text-3xl transition-colors",
                      location.pathname === l.to ? "text-brass-light" : "text-ivory hover:text-brass-light",
                    )}
                  >
                    {l.label}
                    <ArrowUpRight className="h-5 w-5 text-brass/45" strokeWidth={1.4} />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 text-[0.58rem] font-bold tracking-[0.28em] text-parchment/40 uppercase">Collections</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  to={`/collections/${c.id}`}
                  onClick={onClose}
                  className="border border-brass/20 px-3 py-3 text-center text-[0.62rem] font-bold tracking-[0.14em] text-parchment/75 uppercase transition-colors hover:border-brass hover:bg-brass/10 hover:text-brass-light"
                >
                  {c.short}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-9">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    setSearchOpen(true);
                  }}
                  className="btn btn-outline flex-1 !py-3 text-[0.58rem]"
                >
                  <Search className="h-3.5 w-3.5" strokeWidth={1.8} /> Search
                </button>
                <button
                  onClick={() => {
                    onClose();
                    openCart();
                  }}
                  className="btn btn-outline flex-1 !py-3 text-[0.58rem]"
                >
                  <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.8} /> Bag ({itemCount})
                </button>
              </div>

              <div className="mt-6 flex items-center gap-4 border-t border-brass/15 pt-5 text-[0.62rem] tracking-[0.2em] text-parchment/45 uppercase">
                <a
                  href={BRAND.links.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 transition-colors hover:text-brass"
                >
                  <InstagramMark className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={BRAND.links.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 transition-colors hover:text-brass"
                >
                  <FacebookMark className="h-4 w-4" /> Facebook
                </a>
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
