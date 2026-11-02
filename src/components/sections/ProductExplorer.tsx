import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Grid2x2, Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, type CategoryId, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

type FilterId = "all" | CategoryId;
type SortId = "featured" | "price-asc" | "name";

export function ProductExplorer({
  pool,
  eyebrow,
  title,
  lede,
  tone = "light",
  showSearch = false,
  showFilters = true,
  initialCategory = "all",
  limit,
  headingAlign = "left",
  footer,
  id,
}: {
  pool: Product[];
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "light" | "dark";
  showSearch?: boolean;
  showFilters?: boolean;
  initialCategory?: FilterId;
  limit?: number;
  headingAlign?: "left" | "center";
  footer?: React.ReactNode;
  id?: string;
}) {
  const [category, setCategory] = useState<FilterId>(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");
  const light = tone === "light";

  const available = useMemo(() => {
    const ids = new Set(pool.map((p) => p.category));
    return CATEGORIES.filter((c) => ids.has(c.id));
  }, [pool]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = pool.filter((p) => (category === "all" ? true : p.category === category));
    if (q) {
      list = list.filter((p) =>
        `${p.name} ${p.summary} ${p.description} ${CATEGORIES.find((c) => c.id === p.category)?.label ?? ""}`
          .toLowerCase()
          .includes(q),
      );
    }
    const sorted = [...list];
    if (sort === "price-asc") {
      sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    return limit ? sorted.slice(0, limit) : sorted;
  }, [pool, category, query, sort, limit]);

  const countFor = (c: FilterId) => (c === "all" ? pool.length : pool.filter((p) => p.category === c).length);

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 sm:py-28 lg:py-32",
        light ? "bg-parchment text-espresso" : "bg-espresso text-parchment",
      )}
    >
      {light && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(65% 45% at 85% 0%, rgba(183,151,91,.26), transparent 65%), radial-gradient(50% 40% at 0% 100%, rgba(101,67,45,.14), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px stitch-y opacity-50" aria-hidden />
        </>
      )}

      <div className="relative mx-auto max-w-[104rem] px-5 sm:px-8">
        {(eyebrow || title) && (
          <SectionHeading
            eyebrow={eyebrow ?? ""}
            tone={light ? "dark" : "light"}
            align={headingAlign}
            title={title ?? ""}
            lede={lede}
          />
        )}

        {(showFilters || showSearch) && (
          <div
            className={cn(
              "mt-10 flex flex-col gap-5 border-y py-5 lg:flex-row lg:items-center lg:justify-between",
              light ? "border-espresso/12" : "border-brass/20",
            )}
          >
            {showFilters ? (
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter products by category">
                <span
                  className={cn(
                    "mr-1 hidden items-center gap-2 text-[0.58rem] font-bold tracking-[0.24em] uppercase sm:flex",
                    light ? "text-tobacco" : "text-brass",
                  )}
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.6} /> Filter
                </span>
                {(["all", ...available.map((c) => c.id)] as FilterId[]).map((fid) => {
                  const label = fid === "all" ? "All products" : CATEGORIES.find((c) => c.id === fid)?.label ?? fid;
                  const active = category === fid;
                  return (
                    <button
                      key={fid}
                      onClick={() => setCategory(fid)}
                      aria-pressed={active}
                      className={cn(
                        "group relative flex items-center gap-2 border px-3.5 py-2 text-[0.6rem] font-bold tracking-[0.16em] uppercase transition-all duration-300",
                        active
                          ? light
                            ? "border-espresso bg-espresso text-parchment"
                            : "border-brass bg-brass text-espresso"
                          : light
                            ? "border-espresso/18 text-charcoal/70 hover:border-espresso/50 hover:bg-espresso/[0.05]"
                            : "border-brass/25 text-parchment/65 hover:border-brass/70 hover:text-brass-light",
                      )}
                    >
                      {label}
                      <span className={cn("text-[0.55rem] tabular-nums", active ? "opacity-70" : "opacity-45")}>
                        {countFor(fid)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <span className="flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.24em] uppercase opacity-60">
                <Grid2x2 className="h-3.5 w-3.5" strokeWidth={1.5} /> {results.length} pieces
              </span>
            )}

            <div className="flex items-center gap-3">
              {showSearch && (
                <div
                  className={cn(
                    "flex flex-1 items-center gap-2 border px-3 py-2 lg:w-64 lg:flex-none",
                    light ? "border-espresso/18 bg-ivory/60" : "border-brass/25 bg-ivory/[0.04]",
                  )}
                >
                  <Search className={cn("h-3.5 w-3.5 shrink-0", light ? "text-tobacco" : "text-brass")} strokeWidth={1.7} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    placeholder="Search this collection"
                    aria-label="Search products by name or description"
                    className={cn(
                      "w-full bg-transparent text-[0.8rem] outline-none placeholder:opacity-45 [&::-webkit-search-cancel-button]:hidden",
                      light ? "text-espresso" : "text-ivory",
                    )}
                  />
                  {query && (
                    <button onClick={() => setQuery("")} aria-label="Clear search" className="opacity-50 hover:opacity-100">
                      <X className="h-3.5 w-3.5" strokeWidth={1.8} />
                    </button>
                  )}
                </div>
              )}

              <label className="sr-only" htmlFor="sortby">
                Sort products
              </label>
              <div
                className={cn(
                  "flex items-center gap-2 border px-3 py-2",
                  light ? "border-espresso/18 bg-ivory/60" : "border-brass/25 bg-ivory/[0.04]",
                )}
              >
                <span className={cn("text-[0.55rem] font-bold tracking-[0.2em] uppercase", light ? "text-tobacco" : "text-brass")}>
                  Sort
                </span>
                <select
                  id="sortby"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortId)}
                  className={cn(
                    "cursor-pointer appearance-none bg-transparent text-[0.75rem] outline-none",
                    light ? "text-espresso" : "text-ivory [&>option]:text-espresso",
                  )}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {results.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl">Nothing matches that search</p>
            <p className={cn("mx-auto mt-3 max-w-md text-sm", light ? "text-charcoal/65" : "text-parchment/55")}>
              Try a different word, or clear the filters to see everything currently listed in the shop.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className={cn("btn mt-7", light ? "btn-dark" : "btn-outline")}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-7 lg:grid-cols-3 lg:gap-x-9 xl:grid-cols-4">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} tone={light ? "light" : "dark"} />
            ))}
          </div>
        )}

        {footer && (
          <Reveal className={cn("mt-16 flex flex-col items-center gap-5 border-t pt-12 text-center", light ? "border-espresso/12" : "border-brass/18")}>
            {footer}
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function ViewAllLink({ to = "/shop", children = "View everything in the shop" }: { to?: string; children?: React.ReactNode }) {
  return (
    <Link to={to} className="btn btn-dark group">
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
    </Link>
  );
}
