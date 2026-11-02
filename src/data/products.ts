/**
 * Buckaroo Hatters — product catalogue (front-end mockup data).
 *
 * Every listed product, title, price and description below is taken from the
 * brand's live Shopify storefront:
 * https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/
 *
 * Product photography is served straight from the brand's own Shopify CDN
 * (it content-negotiates to webp/avif for any browser, including the HEIC
 * originals, so no image is converted or re-hosted for this mockup).
 *
 * Custom hats are NOT listed for sale on the storefront — they are enquiry
 * based, so they carry `price: null` and `enquiryOnly: true`. Never price them.
 */

export type CategoryId =
  | "custom-hats"
  | "hat-bands"
  | "leather-accessories"
  | "other-accessories";

export interface Category {
  id: CategoryId;
  label: string;
  short: string;
  blurb: string;
}

export interface ProductImage {
  /** Full URL, or CDN key (files/IMG-9714.heic?v=123) for Shopify assets. */
  src: string;
  alt: string;
  /** true when the source is the brand's Shopify CDN and can be resized. */
  cdn?: boolean;
}

export interface Product {
  id: string;
  handle: string;
  name: string;
  category: CategoryId;
  price: number | null;
  compareAtPrice: number | null;
  currency: "USD";
  summary: string;
  description: string;
  images: ProductImage[];
  enquiryOnly: boolean;
  note?: string;
  sourceUrl?: string;
  featured?: boolean;
  details: string[];
}

const CDN = "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/cdn/shop/files";

/** Resize helper for the brand's Shopify CDN (handles HEIC -> webp itself). */
export function shopifyImage(key: string, width: number): string {
  const sep = key.includes("?") ? "&" : "?";
  return `${CDN}/${key}${sep}width=${width}`;
}

function photo(key: string, alt: string): ProductImage {
  return { src: key, alt, cdn: true };
}

function external(src: string, alt: string): ProductImage {
  return { src, alt, cdn: false };
}

export const CATEGORIES: Category[] = [
  {
    id: "hat-bands",
    label: "Hat Bands",
    short: "Bands",
    blurb: "Hand-cut, tooled and embossed leather bands with solid buckle closures.",
  },
  {
    id: "leather-accessories",
    label: "Leather Accessories",
    short: "Leather Goods",
    blurb: "Practical leather goods made to keep a favourite hat in good company.",
  },
  {
    id: "other-accessories",
    label: "Other Accessories",
    short: "Accessories",
    blurb: "Finishing pieces that live on the hat itself.",
  },
  {
    id: "custom-hats",
    label: "Custom Hats",
    short: "Custom Hats",
    blurb: "One-off hats shaped around your head, your style and your story.",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "bandera-hat-band",
    handle: "the-bandera-hat-band",
    name: "The Bandera Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Chocolate brown embossed leather band with silver buckle closure.",
    description:
      "Chocolate brown leather embossed hat band with silver buckle closure.",
    images: [
      photo("IMG-9714.heic?v=1772815940", "The Bandera hat band — chocolate brown embossed leather band with a silver buckle"),
      photo("IMG-9735.heic?v=1772815991", "Detail view of the Bandera hat band embossing and buckle"),
    ],
    enquiryOnly: false,
    featured: true,
    sourceUrl: "/products/the-bandera-hat-band",
    details: [
      "Tooled and embossed leather",
      "Silver-tone buckle closure",
      "Fits standard Western hat crests",
    ],
  },
  {
    id: "covington-hat-band",
    handle: "the-covington-hat-band",
    name: "The Covington Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Camel brown band with paisley detailing and a silver buckle.",
    description:
      "Camel brown hat band with paisley details and silver buckle closure.",
    images: [
      photo("IMG-9716.heic?v=1772816734", "The Covington hat band — camel brown leather with paisley detail"),
      photo("FullSizeRender_8588171f-659b-4f82-8a2c-1a4b1ce3339e.heic?v=1772816734", "Close view of the Covington hat band paisley tooling"),
    ],
    enquiryOnly: false,
    featured: true,
    sourceUrl: "/products/the-covington-hat-band",
    details: [
      "Paisley tooled detail",
      "Camel brown leather",
      "Silver-tone buckle closure",
    ],
  },
  {
    id: "cristo-hat-band",
    handle: "the-cristo-hat-band",
    name: "The Cristo Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Brown leather band with a leaf accent embossing.",
    description:
      "Brown leather hat band with leaf accent embossing and silver buckle closure.",
    images: [
      photo("IMG-9717.heic?v=1772816985", "The Cristo hat band — brown leather with leaf accent embossing"),
      photo("FullSizeRender_e46e94e3-56c8-46a0-922f-2e397c279fc3.heic?v=1772816985", "The Cristo hat band embossed leaf detail"),
    ],
    enquiryOnly: false,
    sourceUrl: "/products/the-cristo-hat-band",
    details: [
      "Leaf accent embossing",
      "Brown leather body",
      "Silver-tone buckle closure",
    ],
  },
  {
    id: "denver-hat-band",
    handle: "the-denver-hat-band",
    name: "The Denver Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Dark brown and black basket weave leather, silver buckle.",
    description:
      "Dark Brown and Black basket weave leather hat band with silver buckle closure.",
    images: [
      photo("IMG-9719.jpg?v=1772816125", "The Denver hat band — dark brown and black basket weave leather"),
      photo("IMG-9733.heic?v=1772815940", "Detail of the Denver hat band basket weave pattern"),
    ],
    enquiryOnly: false,
    featured: true,
    sourceUrl: "/products/the-denver-hat-band",
    details: [
      "Basket weave pattern",
      "Dark brown and black tones",
      "Silver-tone buckle closure",
    ],
  },
  {
    id: "marfa-hat-band",
    handle: "the-marfa-hat-band",
    name: "The Marfa Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Floral embossed leather with yellow centre and green leaves.",
    description:
      "Leather hat band featuring a floral embossed design, yellow center and green leaves, silver buckle closure.",
    images: [
      photo("IMG-9712.heic?v=1772815336", "The Marfa hat band — floral embossed leather with yellow and green detail"),
      photo("FullSizeRender_74995c3c-10d5-495a-a5b7-114b481b8160.heic?v=1772815336", "Close up of the Marfa hat band floral embossing"),
    ],
    enquiryOnly: false,
    sourceUrl: "/products/the-marfa-hat-band",
    details: [
      "Hand embossed floral design",
      "Yellow and green colouring",
      "Silver-tone buckle closure",
    ],
  },
  {
    id: "midland-hat-band",
    handle: "the-midland-hat-band",
    name: "The Midland Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Leather band with a large basket weave detail.",
    description:
      "Leather hat band with large basket weave detail and Silver buckle closure.",
    images: [
      photo("FullSizeRender_dd47e253-9fe2-42f6-9485-d111e9b8ce13.heic?v=1772814533", "The Midland hat band — large basket weave leather detail"),
      photo("IMG-9715.heic?v=1772814694", "The Midland hat band shown on a hat crown"),
    ],
    enquiryOnly: false,
    sourceUrl: "/products/the-midland-hat-band",
    details: [
      "Oversized basket weave tooling",
      "Full leather body",
      "Silver-tone buckle closure",
    ],
  },
  {
    id: "oatman-hat-band",
    handle: "the-oatman-hat-band",
    name: "The Oatman Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Black embossed leather with a clean silver buckle.",
    description: "Black leather embossed hat band with silver buckle closure.",
    images: [
      photo("IMG-9713.heic?v=1772815753", "The Oatman hat band — black embossed leather"),
      photo("FullSizeRender_a323cc94-531e-4b18-9218-ba275d60cb34.heic?v=1772815754", "Detail of the Oatman hat band embossing"),
    ],
    enquiryOnly: false,
    featured: true,
    sourceUrl: "/products/the-oatman-hat-band",
    details: [
      "Black embossed leather",
      "Silver-tone buckle closure",
      "A quietly dressy option",
    ],
  },
  {
    id: "sedona-hat-band",
    handle: "the-sedona-hat-band",
    name: "The Sedona Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Camel leather, basket weave and off-white accent stitching.",
    description:
      "Camel leather hat band with basket weave and off white accent stitching, silver buckle closure.",
    images: [
      photo("IMG-9718.heic?v=1772816449", "The Sedona hat band — camel leather with accent stitching"),
      photo("FullSizeRender_d80dfb15-5af9-4cf3-8f3c-8847a0ab274f.heic?v=1772816448", "Close view of the Sedona hat band stitching"),
    ],
    enquiryOnly: false,
    sourceUrl: "/products/the-sedona-hat-band",
    details: [
      "Camel tone leather",
      "Off-white accent stitching",
      "Silver-tone buckle closure",
    ],
  },
  {
    id: "silverton-hat-band",
    handle: "the-silverton-hat-band",
    name: "The Silverton Hat Band",
    category: "hat-bands",
    price: 45,
    compareAtPrice: null,
    currency: "USD",
    summary: "Black leather dressed with silver accents.",
    description: "Black leather hat band with silver accents and silver buckle closure.",
    images: [
      photo("IMG-9709.heic?v=1772816289", "The Silverton hat band — black leather with silver accents"),
      photo("FullSizeRender_27f26c14-ca3a-4644-86d3-ef340340a6e6.heic?v=1772816289", "Detail of the Silverton hat band silver accents"),
    ],
    enquiryOnly: false,
    sourceUrl: "/products/the-silverton-hat-band",
    details: [
      "Silver accent hardware",
      "Black leather body",
      "Silver-tone buckle closure",
    ],
  },
  {
    id: "herman-oak-hat-holder",
    handle: "handmade-premium-herman-oak-leather-hat-holder",
    name: "Handmade Premium Herman Oak Leather Hat Holder",
    category: "leather-accessories",
    price: 50,
    compareAtPrice: null,
    currency: "USD",
    summary: "Premium Herman Oak leather holder for a vehicle headrest.",
    description:
      "Premium Herman Oak leather handmade hat holder for vehicle headrest.",
    images: [
      photo("FullSizeRender_130ef988-6f08-4356-9916-289561272637.heic?v=1772912607", "Handmade premium Herman Oak leather hat holder fitted to a vehicle headrest"),
      photo("IMG-9769.heic?v=1772912607", "Detail of the Herman Oak leather hat holder stitching"),
    ],
    enquiryOnly: false,
    featured: true,
    sourceUrl: "/products/handmade-premium-herman-oak-leather-hat-holder",
    details: [
      "Herman Oak leather",
      "Fits a vehicle headrest",
      "Hand made and hand finished",
    ],
  },
  {
    id: "custom-hat-ear-warmers",
    handle: "custom-hat-ear-warmers",
    name: "Custom Hat Ear Warmers",
    category: "other-accessories",
    price: 40,
    compareAtPrice: 55,
    currency: "USD",
    summary: "Low-bulk ear warmers secured inside a hat's sweat band.",
    description:
      "Ear warmers made specifically for hats with a sweat band and minimal bulk. Secured into sweat band with soft closure under chin. These can with stand high winds and very cold temperatures. Works well with western style hats, fedoras, flat brims, and any hat with a sweatband.",
    images: [
      photo("C990CD54-674B-4506-BF3C-76243EBEBDDC.jpg?v=1770314703", "Custom hat ear warmers fitted inside a hat sweat band"),
      photo("FullSizeRender.heic?v=1770316013", "Custom hat ear warmers shown worn under a Western hat"),
    ],
    enquiryOnly: false,
    featured: true,
    note: "The storefront lists a colour selection for this item. Confirm the available colours when ordering — live variant data connects during production.",
    sourceUrl: "/products/custom-hat-ear-warmers",
    details: [
      "Made for hats with a sweat band",
      "Soft closure under the chin",
      "Suits Western hats, fedoras and flat brims",
    ],
  },

  /* ---------------------------------------------------------------------
   * Custom hats. The storefront sells these by conversation rather than by
   * click, so they are enquiry-only: no price, no add-to-cart.
   * Photography here is representative styling imagery, NOT a photograph of
   * a specific finished hat for sale. That is stated on the product page too.
   * ------------------------------------------------------------------ */
  {
    id: "custom-felt-western-hat",
    handle: "custom-felt-western-hat",
    name: "Custom Felt Western Hat",
    category: "custom-hats",
    price: null,
    compareAtPrice: null,
    currency: "USD",
    summary: "A shaped felt hat built around your crease, brim and band.",
    description:
      "A made-to-order Western hat shaped to your head and your style. Bring a reference photo, a crease you like, or nothing at all — the hat starts as a conversation about how you want to look in it.",
    images: [
      external(
        "https://images.pexels.com/photos/33365096/pexels-photo-33365096.jpeg",
        "Man wearing a dark Western hat — representative styling imagery",
      ),
      external(
        "https://images.pexels.com/photos/38138842/pexels-photo-38138842.jpeg",
        "Stack of Western hats showing a range of crown shapes — representative imagery",
      ),
    ],
    enquiryOnly: true,
    note: "Representative styling imagery — not a photograph of a specific finished hat. Custom hats are quoted individually because the shape, materials and detailing change the work involved.",
    details: [
      "Crown, brim and crease chosen with you",
      "Hat band selected or made for the hat",
      "Sizing and styling discussed before anything begins",
    ],
  },
  {
    id: "custom-straw-hat",
    handle: "custom-straw-hat",
    name: "Custom Straw Summer Hat",
    category: "custom-hats",
    price: null,
    compareAtPrice: null,
    currency: "USD",
    summary: "A lighter hat for hot months, finished with a leather band.",
    description:
      "A warm-weather hat with the same thinking behind it: brim width for your sun, crown height for your face, and a band that finishes it off.",
    images: [
      external(
        "https://images.pexels.com/photos/16340836/pexels-photo-16340836.jpeg",
        "Riders wearing Western hats in bright sunlight — representative imagery",
      ),
      external(
        "https://images.pexels.com/photos/32350297/pexels-photo-32350297.jpeg",
        "Woman wearing a Western hat outdoors — representative styling imagery",
      ),
    ],
    enquiryOnly: true,
    note: "Representative styling imagery — not a photograph of a specific finished hat. Custom hats are quoted individually.",
    details: [
      "Brim width shaped to your sun",
      "Band chosen to match your leathers",
      "Quoted after a short conversation",
    ],
  },
  {
    id: "custom-hat-restoration",
    handle: "custom-hat-refresh-and-restyle",
    name: "Hat Restyle & Band Refresh",
    category: "custom-hats",
    price: null,
    compareAtPrice: null,
    currency: "USD",
    summary: "Give a well-worn hat a new band, a new shape, a second run.",
    description:
      "An existing hat that deserves a second life. Send a few photos and describe what you would like changed — a new band, a sharper crease, a brim that sits differently.",
    images: [
      external(
        "https://images.pexels.com/photos/37924303/pexels-photo-37924303.jpeg",
        "Western hats on a shop shelf — representative imagery",
      ),
      external(
        "https://images.pexels.com/photos/4452603/pexels-photo-4452603.jpeg",
        "Leather working tools and materials on a bench — representative imagery",
      ),
    ],
    enquiryOnly: true,
    note: "Representative imagery. Work on a customer's own hat is scoped from photographs before any price is quoted.",
    details: [
      "Send photos of the hat you own",
      "Describe what you want changed",
      "Scope and price confirmed before work starts",
    ],
  },
];

export const PRODUCT_BY_HANDLE = new Map(PRODUCTS.map((p) => [p.handle, p]));

export function relatedProducts(product: Product, count = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const others = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function formatPrice(value: number | null, currency: "USD" = "USD"): string {
  if (value === null) return "Price on request";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

export function searchProducts(query: string, pool: Product[] = PRODUCTS): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return pool
    .map((p) => {
      const haystack = `${p.name} ${p.summary} ${p.description} ${
        CATEGORIES.find((c) => c.id === p.category)?.label ?? ""
      }`.toLowerCase();
      const score = words.reduce((acc, w) => acc + (haystack.includes(w) ? 1 : 0), 0);
      return { p, score };
    })
    .filter((r) => r.score === words.length)
    .sort((a, b) => b.p.name.localeCompare(a.p.name))
    .map((r) => r.p);
}
