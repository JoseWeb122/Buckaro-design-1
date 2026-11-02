import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Search, Sparkles, X } from "lucide-react";
import { CATEGORIES, PRODUCTS, formatPrice, searchProducts } from "@/data/products";
import { useStore } from "@/lib/store";
import { SmartImage } from "@/components/ui";
import { Concho } from "@/components/icons";

const SUGGESTED = ["Hat band", "Leather", "Ear warmers", "Custom", "Buckle", "Basket weave"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, addToCart } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of CATEGORIES) map.set(c.id, PRODUCTS.filter((p) => p.category === c.id).length);
    return map;
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 90);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [searchOpen]);

  const go = (handle: string) => {
    setSearchOpen(false);
    navigate(`/products/${handle}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[95] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search products"
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-espresso-950/92 backdrop-blur-md" onClick={() => setSearchOpen(false)} />

          <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col overflow-y-auto px-5 pt-6 pb-12 sm:px-8 sm:pt-10">
            <div className="flex items-start justify-between gap-6">
              <span className="flex items-center gap-2 pt-2 text-[0.56rem] font-bold tracking-[0.3em] text-brass uppercase">
                <Concho /> Search the shop <Concho />
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex items-center gap-2 text-[0.6rem] font-bold tracking-[0.2em] text-parchment/50 uppercase transition-colors hover:text-brass"
              >
                Esc <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            <div className="mt-5 flex items-center gap-4 border-b border-brass/30 pb-4">
              <Search className="h-6 w-6 shrink-0 text-brass" strokeWidth={1.3} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) go(results[0].handle);
                }}
                type="search"
                placeholder="Search hat bands, leather goods, custom hats…"
                aria-label="Search products by name, category or description"
                className="w-full bg-transparent font-display text-[clamp(1.5rem,4.4vw,2.6rem)] text-ivory outline-none placeholder:text-parchment/25 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="shrink-0 text-[0.6rem] font-bold tracking-[0.2em] text-parchment/45 uppercase hover:text-brass"
                >
                  Clear
                </button>
              )}
            </div>

            {!query && (
              <div className="mt-9 grid gap-9 sm:grid-cols-[1fr_1.1fr]">
                <div>
                  <h3 className="text-[0.6rem] font-bold tracking-[0.28em] text-parchment/45 uppercase">
                    Popular searches
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setQuery(s);
                          inputRef.current?.focus();
                        }}
                        className="border border-brass/25 px-3.5 py-2 text-[0.72rem] text-parchment/70 transition-colors hover:border-brass hover:bg-brass/10 hover:text-brass-light"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[0.6rem] font-bold tracking-[0.28em] text-parchment/45 uppercase">
                    Browse a category
                  </h3>
                  <ul className="mt-4 space-y-px">
                    {CATEGORIES.map((c) => (
                      <li key={c.id}>
                        <button
                          onClick={() => {
                            setSearchOpen(false);
                            navigate(`/collections/${c.id}`);
                          }}
                          className="group flex w-full items-center justify-between gap-4 border-b border-brass/12 py-3 text-left"
                        >
                          <span className="flex items-center gap-3">
                            <Sparkles className="h-3.5 w-3.5 text-brass/60 transition-colors group-hover:text-brass" strokeWidth={1.6} />
                            <span className="font-display text-xl text-ivory transition-colors group-hover:text-brass-light">
                              {c.label}
                            </span>
                          </span>
                          <span className="flex items-center gap-3">
                            <span className="text-[0.62rem] tracking-[0.2em] text-parchment/35">
                              {counts.get(c.id)} {c.id === "custom-hats" ? "enquiry styles" : "in shop"}
                            </span>
                            <ArrowRight className="h-4 w-4 text-parchment/30 transition-transform group-hover:translate-x-1 group-hover:text-brass" strokeWidth={1.5} />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {query && (
              <div className="mt-8">
                <p className="text-[0.62rem] tracking-[0.22em] text-parchment/40 uppercase">
                  {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
                </p>

                {results.length === 0 ? (
                  <div className="mt-8 border border-brass/20 bg-brass/[0.04] p-8 text-center">
                    <p className="font-display text-2xl text-ivory">No pieces match that yet</p>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-parchment/55">
                      Try “band”, “leather” or “ear warmers” — or ask about a hat made to your own specification.
                    </p>
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        navigate("/contact");
                      }}
                      className="btn btn-outline mt-6"
                    >
                      Ask about a custom hat
                    </button>
                  </div>
                ) : (
                  <ul className="mt-5 divide-y divide-brass/12">
                    {results.map((p, i) => (
                      <li key={p.id}>
                        <div className="group flex items-center gap-4 py-3.5">
                          <button
                            onClick={() => go(p.handle)}
                            className="flex min-w-0 flex-1 items-center gap-4 text-left"
                            style={{ animationDelay: `${i * 45}ms` }}
                          >
                            <span className="relative block h-16 w-13 shrink-0 overflow-hidden bg-[#2b1f18]">
                              <SmartImage image={p.images[0]} width={140} height={180} eager sizes="64px" className="absolute inset-0" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[0.53rem] font-bold tracking-[0.24em] text-tobacco uppercase">
                                {CATEGORIES.find((c) => c.id === p.category)?.label}
                              </span>
                              <span className="mt-0.5 block truncate font-display text-lg text-ivory transition-colors group-hover:text-brass-light">
                                {p.name}
                              </span>
                              <span className="mt-0.5 block truncate text-[0.74rem] text-parchment/45">{p.summary}</span>
                            </span>
                          </button>
                          <span className="hidden shrink-0 text-sm font-semibold text-brass sm:block">
                            {formatPrice(p.price)}
                          </span>
                          {!p.enquiryOnly ? (
                            <button
                              onClick={() => addToCart(p)}
                              className="btn btn-outline hidden shrink-0 !px-4 !py-2 text-[0.55rem] lg:inline-flex"
                            >
                              Add
                            </button>
                          ) : (
                            <button onClick={() => go(p.handle)} className="btn btn-outline hidden shrink-0 !px-4 !py-2 text-[0.55rem] lg:inline-flex">
                              View
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
