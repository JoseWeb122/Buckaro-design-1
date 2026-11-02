# Buckaroo Hatters Custom Hats — Concept Storefront

A cinematic, front-end-only e-commerce concept for **Buckaroo Hatters Custom Hand Made Hats**: hand-made Western
hat bands, leather goods, hat accessories and a custom-hat enquiry flow.

Built with **React 19 + TypeScript + Vite + Tailwind CSS v4**, Framer Motion and React Router.
No backend, no payment processing, no external API calls at runtime beyond the brand's own image CDN and licensed
stock photography.

---

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # preview the production build
```

Type-check with `npx tsc --noEmit`.

## Deploy to Vercel

1. Push this repository to Git.
2. Import it in Vercel — the `vercel.json` already sets framework **Vite**, build command `npm run build`,
   output directory `dist`.
3. No environment variables are required; every feature works in the demo.

Routing uses `HashRouter` so that any route (`/#/shop`, `/#/products/the-bandera-hat-band`) survives a hard refresh
on any static host, including single-file hosting. To switch to clean URLs, replace `HashRouter` with
`BrowserRouter` in `src/App.tsx` — the included `vercel.json` rewrite already handles deep links.

---

## Where the content lives

Everything the shop owner may want to change is in two typed data files — no component edits needed.

| File | Contains |
| --- | --- |
| `src/data/products.ts` | Every product: name, handle, price, compare-at price, category, description, details, Shopify CDN image keys, enquiry-only flag. Categories live here too. |
| `src/data/site.ts` | Brand name and links (Shopify, Instagram, Facebook), announcement-bar messages, navigation, craft-process steps, gallery imagery, trust points, editorial principles, contact placeholders. |

**Prices and copy are transcribed from the live Shopify storefront**
(`buckaroo-hatters-custom-hand-made-hats.myshopify.com`) at the time of design. Custom hats carry `price: null` and
`enquiryOnly: true` on purpose — they are quoted per commission, so the UI offers an enquiry instead of an
add-to-cart button and the cart refuses to show a misleading subtotal.

Contact details (phone, email, address, opening hours) are deliberately `null` in `BRAND.contact` rather than
invented. Fill them in there and they can be surfaced anywhere in the UI.

### Image handling

* Product imagery is hot-linked from the brand's Shopify CDN, which content-negotiates HEIC originals to
  webp/avif, so no conversion or re-hosting is required. `shopifyImage(key, width)` builds `src`/`srcSet` values.
* Lifestyle and workshop photography is licensed stock (Pexels) loaded at the correct size; the opening plate and two
  editorial scenes are generated imagery and are labelled as styling/editorial rather than product photography.
* Every image has a skeleton while loading and a graceful "photography unavailable" plate on error
  (`SmartImage`).

---

## What is wired up

* **Cart** — add / quantity / remove / clear, live badge, drawer, `localStorage` persistence under
  `buckaroo.cart.v1`, subtotal computed only from priced items, explicit warning state when an enquiry-only item is
  in the bag, demo checkout that says so plainly.
* **Search overlay** — `Esc` closes, autofocus, live filtering across name/summary/description/category, suggested
  terms, category shortcuts, per-result add-to-bag, empty state.
* **Quick View modal** — focus trap, gallery switching, quantity, add to bag, jump to the full product page.
* **Filters and sorting** — category chips with live counts, in-collection search, sort by featured/price/name.
* **Product pages** — breadcrumbs, thumbnail gallery, verified description, detail list, related pieces, Shopify
  listing link, enquiry block for custom work.
* **Gallery lightbox** — prev/next, keyboard arrows, `Esc`, click-outside, captions, counter.
* **Custom-hat enquiry form** — required-field and email validation, optional phone check, inline errors wired with
  `aria-describedby`, loading state, on-page summary, and a visible note that live delivery needs a form service.
* **Motion** — hero image reveal + parallax, staggered product-card entrances, hover image zoom, header transition,
  drawer/modal/overlay transitions, toasts. All of it short-circuits under `prefers-reduced-motion`.

## Hooking up real commerce later

The data layer is the only thing standing between this mockup and a live shop:

1. Replace `PRODUCTS` with a Shopify Storefront API query (`products(first: 250)`), mapping `handle`,
   `priceV2`, `compareAtPriceV2`, `images` and `descriptionHtml` into the existing `Product` interface — no component
   changes required.
2. Swap the local cart state in `src/lib/store.tsx` for cart mutations, and the demo checkout button for a
   `cartUrl` redirect.
3. Point `InquiryForm` at a form service or a Shopify contact form; the validation and success states already exist.
4. Drop the `Demo storefront` / `demo mode` labels once real checkout is live.

## Notes for review

* Privacy and Terms pages are clearly labelled editable placeholders, not legal documents.
* No reviews, ratings, guarantees, awards, history or production claims were invented.
* Announcement bar carries a neutral brand message only — no shipping or discount claims.
