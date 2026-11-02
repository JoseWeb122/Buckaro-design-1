import { Link } from "react-router-dom";
import { ArrowUpRight, Eye, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { CATEGORIES } from "@/data/products";
import { useStore } from "@/lib/store";
import { SmartImage } from "@/components/ui";
import { cn } from "@/utils/cn";

export function ProductCard({
  product,
  index = 0,
  tone = "light",
  compact = false,
}: {
  product: Product;
  index?: number;
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  const { addToCart, setQuickView } = useStore();
  const category = CATEGORIES.find((c) => c.id === product.category);
  const onSale = product.compareAtPrice !== null && product.price !== null && product.price < product.compareAtPrice;
  const dark = tone === "dark";

  return (
    <article
      className={cn(
        "group relative flex flex-col",
        "animate-fade-up",
        dark ? "text-parchment" : "text-espresso",
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      <Link
        to={`/products/${product.handle}`}
        className="relative block overflow-hidden bg-[#2b1f18]"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[4/5] w-full">
          <SmartImage
            image={product.images[0]}
            width={760}
            height={950}
            sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,(max-width:1400px) 25vw,340px"
            className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
            zoom
          />
          {product.images[1] && (
            <SmartImage
              image={product.images[1]}
              width={760}
              height={950}
              sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,340px"
              className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </div>

        <span
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
            "bg-gradient-to-t from-espresso/45 via-transparent to-transparent group-hover:opacity-100",
          )}
          aria-hidden
        />

        {onSale && (
          <span className="absolute top-3 left-3 bg-brass px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.22em] text-espresso uppercase">
            Sale
          </span>
        )}
        {product.enquiryOnly && (
          <span className="absolute top-3 left-3 border border-brass/50 bg-espresso/85 px-2.5 py-1 text-[0.55rem] font-bold tracking-[0.22em] text-brass uppercase backdrop-blur-sm">
            Made to order
          </span>
        )}

        {!compact && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickView(product);
            }}
            className={cn(
              "absolute right-3 bottom-3 flex translate-y-2 items-center gap-1.5 border px-3 py-2 text-[0.58rem] font-bold tracking-[0.2em] uppercase opacity-0",
              "transition-all duration-400 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100",
              "border-parchment/35 bg-espresso/85 text-parchment backdrop-blur-sm hover:border-brass hover:text-brass",
            )}
          >
            <Eye className="h-3 w-3" strokeWidth={1.8} />
            Quick view
          </button>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <span
          className={cn(
            "text-[0.56rem] font-bold tracking-[0.28em] uppercase",
            dark ? "text-brass/70" : "text-tobacco",
          )}
        >
          {category?.label}
        </span>
        <h3 className="mt-2 font-display text-[1.28rem] leading-snug">
          <Link
            to={`/products/${product.handle}`}
            className="inline-block bg-gradient-to-r from-current to-current bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_1px]"
          >
            {product.name}
          </Link>
        </h3>

        {!compact && (
          <p className={cn("mt-2 text-[0.82rem] leading-relaxed", dark ? "text-parchment/55" : "text-charcoal/65")}>
            {product.summary}
          </p>
        )}

        <div className="mt-3 flex items-end justify-between gap-3">
          <span className="flex items-baseline gap-2">
            <span className={cn("text-sm font-bold tracking-wide", dark ? "text-brass-light" : "text-saddle")}>
              {formatPrice(product.price)}
            </span>
            {onSale && (
              <span className={cn("text-xs line-through", dark ? "text-parchment/35" : "text-charcoal/35")}>
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </span>
          <ArrowUpRight
            className={cn(
              "h-4 w-4 -translate-x-1 opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100",
              dark ? "text-brass" : "text-tobacco",
            )}
            strokeWidth={1.6}
          />
        </div>

        <div className="mt-4">
          {product.enquiryOnly ? (
            <Link to={`/contact?about=${encodeURIComponent(product.name)}`} className="btn btn-ghost-brass w-full !py-3 text-[0.6rem]">
              Ask about this <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className={cn(
                "btn w-full !gap-2 !px-2.5 !py-3 text-[0.55rem] sm:text-[0.6rem]",
                dark ? "btn-outline" : "btn-dark",
              )}
            >
              <ShoppingBag className="hidden h-3.5 w-3.5 sm:block" strokeWidth={1.8} />
              Add to bag
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
