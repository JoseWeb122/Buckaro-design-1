import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { ANNOUNCEMENTS, NAV } from "@/data/site";
import { useStore } from "@/lib/store";
import { Concho, Wordmark } from "@/components/icons";
import { MobileNav } from "@/components/MobileNav";
import { cn } from "@/utils/cn";

export function AnnouncementBar({ solid }: { solid: boolean }) {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b transition-colors duration-500",
        solid ? "border-brass/15 bg-espresso-950" : "border-brass/20 bg-espresso-950/70 backdrop-blur-[2px]",
      )}
    >
      <div className="flex h-9 items-center">
        <div className="flex w-max min-w-full animate-marquee items-center gap-10 pl-10 hover:[animation-play-state:paused]">
          {items.map((a, i) => (
            <span
              key={`${a.label}-${i}`}
              className="flex shrink-0 items-center gap-3 text-[0.58rem] font-semibold tracking-[0.3em] whitespace-nowrap text-parchment/55 uppercase"
            >
              <Concho className="text-brass/70" />
              {a.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { itemCount, setSearchOpen, openCart } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const solid = scrolled || !isHome || menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (itemCount === 0) return;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 420);
    return () => window.clearTimeout(t);
  }, [itemCount]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[130] focus:bg-brass focus:px-4 focus:py-2 focus:text-[0.6rem] focus:font-bold focus:tracking-[0.2em] focus:text-espresso focus:uppercase"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-[80]">
        <AnimatePresence initial={false}>
          {!(solid && isHome) && (
            <motion.div
              key="announce"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 36, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <AnnouncementBar solid={solid} />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "relative transition-all duration-500",
            solid
              ? "border-b border-brass/15 bg-espresso/95 backdrop-blur-md shadow-[0_14px_40px_-30px_rgba(0,0,0,.9)]"
              : "bg-gradient-to-b from-espresso-950/72 via-espresso-950/25 to-transparent",
          )}
        >
          <div className="mx-auto flex h-16 max-w-[104rem] items-center justify-between gap-6 px-5 sm:h-[4.5rem] sm:px-8">
            <Link to="/" className="shrink-0" aria-label="Buckaroo Hatters — home">
              <Wordmark tone="light" />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
              {NAV.map((item) => {
                const active =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to) || (item.to === "/shop" && pathname.startsWith("/products"));
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={cn(
                      "group relative py-2 text-[0.62rem] font-bold tracking-[0.24em] uppercase transition-colors",
                      active ? "text-brass-light" : "text-parchment/72 hover:text-ivory",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-brass transition-transform duration-500",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search products"
                className="flex h-10 w-10 items-center justify-center text-parchment/75 transition-colors hover:text-brass"
              >
                <Search className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
              </button>

              <button
                onClick={openCart}
                aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center text-parchment/85 transition-all hover:text-brass",
                  bump && !reduce && "scale-110",
                )}
              >
                <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
                <span
                  className={cn(
                    "absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center px-1 text-[0.55rem] font-bold tabular-nums transition-all duration-300",
                    itemCount > 0 ? "bg-brass text-espresso" : "bg-transparent text-transparent",
                  )}
                >
                  {itemCount}
                </span>
              </button>

              <Link to="/shop" className="btn btn-solid hidden !px-5 !py-2.5 text-[0.56rem] xl:inline-flex">
                Explore the shop
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-10 w-10 items-center justify-center text-parchment/85 transition-colors hover:text-brass lg:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <motion.div
            className="h-px origin-left bg-gradient-to-r from-brass via-brass-light to-tobacco"
            style={{ scaleX: solid ? progress : 0 }}
            aria-hidden
          />
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
