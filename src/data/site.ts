/**
 * Brand-level content for the Buckaroo Hatters concept site.
 * Anything marked EDITABLE is a placeholder Mike can overwrite — no invented
 * addresses, phone numbers, hours or legal names.
 */

export const BRAND = {
  name: "Buckaroo Hatters",
  full: "Buckaroo Hatters Custom Hats",
  legalLine: "Buckaroo Hatters Custom Hand Made Hats",
  tagline: "Hand-made Western hats, hat bands and leather goods.",
  announcement: "Discover Handmade Western Style",
  links: {
    shop: "https://buckaroo-hatters-custom-hand-made-hats.myshopify.com/",
    instagram: "https://www.instagram.com/buckaroohatterscustom",
    facebook:
      "https://www.facebook.com/p/Buckaroo-Hatters-Custom-Hats-100057499687766/",
  },
  /** EDITABLE — deliberately blank rather than invented. */
  contact: {
    phone: null as string | null,
    email: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },
};

/** Pexels resize helper — keeps remote imagery light and correctly cropped. */
export function px(base: string, width: number, height?: number): string {
  const params = new URLSearchParams({ auto: "compress", cs: "tinysrgb", w: String(width) });
  if (height) {
    params.set("h", String(height));
    params.set("fit", "crop");
  }
  return `${base}?${params.toString()}`;
}

const P = "https://images.pexels.com/photos";

export interface NavItem {
  label: string;
  to: string;
  /** homepage section anchor to scroll to when already on "/" */
  scroll?: string;
}

export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Shop Hats", to: "/shop" },
  { label: "Hat Bands", to: "/collections/hat-bands" },
  { label: "Accessories", to: "/collections/accessories" },
  { label: "Our Craft", to: "/our-craft" },
];

export interface MarqueeItem {
  label: string;
}

export const ANNOUNCEMENTS: MarqueeItem[] = [
  { label: "Discover Handmade Western Style" },
  { label: "Hat Bands · Leather Goods · Custom Enquiries" },
  { label: "Every piece finished by hand in the workshop" },
  { label: "Ask about a hat made to your own shape" },
];

export interface Step {
  index: string;
  title: string;
  body: string;
  image: string;
  alt: string;
}

export const PROCESS_STEPS: Step[] = [
  {
    index: "01",
    title: "Find Your Style",
    body: "Start with the shapes you already like. Browse the collection, save a band that speaks to you, or bring a photograph of a hat you have admired somewhere.",
    image: px(`${P}/38138842/pexels-photo-38138842.jpeg`, 900, 1200),
    alt: "A stack of well worn Western hats showing different crown shapes",
  },
  {
    index: "02",
    title: "Explore The Details",
    body: "Bands, tooling, stitching and hardware are where a hat stops being generic. Each piece in the shop is photographed closely so you can judge the detail yourself.",
    image: px(`${P}/4452610/pexels-photo-4452610.jpeg`, 900, 1200),
    alt: "Hands cutting tooled leather on a workbench",
  },
  {
    index: "03",
    title: "Make It Your Own",
    body: "For a made-to-order hat, this is where the conversation happens: crease, brim, colour, band. Send an enquiry and the work is scoped with you before anything is cut.",
    image: px(`${P}/4173289/pexels-photo-4173289.jpeg`, 900, 1200),
    alt: "Craftsman finishing and polishing a leather edge in a workshop",
  },
  {
    index: "04",
    title: "Wear It Your Way",
    body: "A hat is meant to be lived in — dusty trails, town streets, tailgates, kitchen tables. Keep it on a hat holder when it is resting, and it will keep coming back.",
    image: px(`${P}/33076023/pexels-photo-33076023.jpeg`, 900, 1200),
    alt: "Two riders in Western hats with a horse at sunset",
  },
];

export interface GalleryShot {
  src: string;
  full: string;
  alt: string;
  caption: string;
  span: "tall" | "wide" | "regular";
}

export const GALLERY: GalleryShot[] = [
  {
    src: px(`${P}/38138842/pexels-photo-38138842.jpeg`, 700, 940),
    full: px(`${P}/38138842/pexels-photo-38138842.jpeg`, 1400),
    alt: "A row of stacked Western hats in a shop, showing felt and straw textures",
    caption: "Shapes on the shelf",
    span: "tall",
  },
  {
    src: px(`${P}/35057394/pexels-photo-35057394.jpeg`, 900, 620),
    full: px(`${P}/35057394/pexels-photo-35057394.jpeg`, 1500),
    alt: "Close-up of tooled brown leather with accent stitching on a rustic surface",
    caption: "Stitching and tooling",
    span: "wide",
  },
  {
    src: px(`${P}/33076019/pexels-photo-33076019.jpeg`, 900, 620),
    full: px(`${P}/33076019/pexels-photo-33076019.jpeg`, 1500),
    alt: "Two men in cowboy hats and jackets standing outdoors in low sun",
    caption: "Worn, not stored",
    span: "regular",
  },
  {
    src: px(`${P}/37443512/pexels-photo-37443512.jpeg`, 700, 940),
    full: px(`${P}/37443512/pexels-photo-37443512.jpeg`, 1400),
    alt: "Artisan hands working leather with hand tools under warm light",
    caption: "At the bench",
    span: "tall",
  },
  {
    src: px(`${P}/37924303/pexels-photo-37924303.jpeg`, 700, 940),
    full: px(`${P}/37924303/pexels-photo-37924303.jpeg`, 1400),
    alt: "Western hats displayed on a counter inside a shop",
    caption: "In the shop",
    span: "regular",
  },
  {
    src: px(`${P}/39677937/pexels-photo-39677937.jpeg`, 900, 620),
    full: px(`${P}/39677937/pexels-photo-39677937.jpeg`, 1500),
    alt: "Silver belt buckle with a bull skull design worn with denim",
    caption: "Hardware detail",
    span: "wide",
  },
  {
    src: px(`${P}/16340839/pexels-photo-16340839.jpeg`, 700, 940),
    full: px(`${P}/16340839/pexels-photo-16340839.jpeg`, 1400),
    alt: "Riders on horseback in a sunlit arena wearing Western hats",
    caption: "Where they belong",
    span: "regular",
  },
  {
    src: px(`${P}/40080052/pexels-photo-40080052.jpeg`, 900, 620),
    full: px(`${P}/40080052/pexels-photo-40080052.jpeg`, 1500),
    alt: "Leather crafting materials and coloured waxed thread laid out",
    caption: "Thread and leather",
    span: "regular",
  },
  {
    src: px(`${P}/4164506/pexels-photo-4164506.jpeg`, 900, 620),
    full: px(`${P}/4164506/pexels-photo-4164506.jpeg`, 1500),
    alt: "Brown leather belts hanging in soft light",
    caption: "Leather goods",
    span: "wide",
  },
];

export interface TrustItem {
  icon: "hand" | "compass" | "ruler" | "message";
  title: string;
  body: string;
}

export const TRUST_ITEMS: TrustItem[] = [
  {
    icon: "hand",
    title: "Hand Made",
    body: "Hats, bands and leather goods are made by hand, one piece at a time — not printed in batches.",
  },
  {
    icon: "compass",
    title: "Distinctly Personal",
    body: "The whole point of a Western hat is that it looks like the person wearing it. Styles here lean individual.",
  },
  {
    icon: "ruler",
    title: "Custom Enquiries",
    body: "Want a particular crease, brim or band? Ask, and the hat is discussed and quoted before any work begins.",
  },
  {
    icon: "message",
    title: "Talk To The Maker",
    body: "Enquiries go to the workshop rather than a call centre, so questions get answered by the person doing the work.",
  },
];

export interface CraftPrinciple {
  number: string;
  title: string;
  body: string;
}

export const PRINCIPLES: CraftPrinciple[] = [
  {
    number: "I",
    title: "Shape before ornament",
    body: "A hat lives or dies on its silhouette — crown height, crease run, brim width and curl. Decoration only ever finishes a shape that already works.",
  },
  {
    number: "II",
    title: "The band does the talking",
    body: "Most people change a hat's whole character without touching the felt at all. A tooled leather band with the right buckle is the fastest honest way to do it.",
  },
  {
    number: "III",
    title: "Made to be worn",
    body: "These are not display pieces. Wind, dust, cold mornings and long drives are the conditions a Western hat should keep up with.",
  },
];

export const STORE_STATS = [
  { value: "11", label: "Pieces in the online shop" },
  { value: "9", label: "Leather hat bands" },
  { value: "100%", label: "Hand made" },
];
