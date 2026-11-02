import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ProductExplorer } from "@/components/sections/ProductExplorer";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/products";
import { px } from "@/data/site";
import { NotFound } from "@/pages/NotFound";

const TEXTURE: Record<CategoryId, string> = {
  "hat-bands": "https://images.pexels.com/photos/35392698/pexels-photo-35392698.jpeg",
  "leather-accessories": "https://images.pexels.com/photos/4452611/pexels-photo-4452611.jpeg",
  "other-accessories": "https://images.pexels.com/photos/40080052/pexels-photo-40080052.jpeg",
  "custom-hats": "https://images.pexels.com/photos/33365096/pexels-photo-33365096.jpeg",
};

const ALIASES: Record<string, { label: string; blurb: string; ids: CategoryId[] }> = {
  accessories: {
    label: "Accessories",
    blurb: "Everything that lives on and around the hat — leather goods and the small pieces that finish a look.",
    ids: ["leather-accessories", "other-accessories"],
  },
};

export function Collection() {
  const { category } = useParams();
  const matched = CATEGORIES.find((c) => c.id === category);
  const alias = category ? ALIASES[category] : undefined;

  if (!matched && !alias) return <NotFound />;

  const ids = alias ? alias.ids : [matched!.id as CategoryId];
  const heading = alias ? alias.label : matched!.label;
  const blurb = alias ? alias.blurb : matched!.blurb;
  const texture = px(TEXTURE[ids[0]], 1600, 900);
  const pool = PRODUCTS.filter((p) => ids.includes(p.category));
  const others = CATEGORIES.filter((c) => !ids.includes(c.id));

  return (
    <>
      <PageHeader
        eyebrow={`Collection · ${pool.length} ${pool.length === 1 ? "piece" : "pieces"}`}
        title={
          <>
            {heading}
            <span className="italic text-parchment/85">.</span>
          </>
        }
        lede={blurb}
        image={texture}
        imageAlt=""
      >
        <div className="flex flex-wrap gap-2">
          {others.map((c) => (
            <Link
              key={c.id}
              to={`/collections/${c.id}`}
              className="border border-brass/25 px-3.5 py-2 text-[0.58rem] font-bold tracking-[0.2em] text-parchment/60 uppercase transition-colors hover:border-brass hover:bg-brass/10 hover:text-brass-light"
            >
              {c.short} →
            </Link>
          ))}
        </div>
      </PageHeader>

      <ProductExplorer
        pool={pool}
        tone="light"
        showSearch={pool.length > 4}
        showFilters={false}
        id="collection-grid"
      />

      <section className="bg-espresso py-20 text-parchment">
        <div className="mx-auto grid max-w-[104rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="eyebrow text-brass">Not seeing it?</span>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.08] text-ivory">
              If the shape, colour or band you want is not listed, it can still be made.
            </h2>
            <p className="mt-5 max-w-xl text-[0.92rem] leading-relaxed text-parchment/60">
              Send a short note describing what you are after. Custom work is discussed and quoted before anything is
              started, so there is no guesswork at checkout.
            </p>
          </div>
          <Link to="/contact" className="btn btn-solid lg:self-center">
            Start an enquiry <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>
      </section>
    </>
  );
}
