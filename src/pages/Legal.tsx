import { Link } from "react-router-dom";
import { ArrowRight, PenLine } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui";
import { Concho } from "@/components/icons";

interface Block {
  h: string;
  p: string[];
}

const PRIVACY: Block[] = [
  {
    h: "This page is a design mockup",
    p: [
      "No personal data is collected, transmitted or stored by this concept site. It is a front-end build used to review a visual direction for Buckaroo Hatters Custom Hats.",
      "There is no analytics script, no advertising pixel and no third-party form service attached to it.",
    ],
  },
  {
    h: "What the demo cart does",
    p: [
      "Items you add are kept in your own browser's local storage so the cart survives a refresh during a review session. Clearing your browser storage removes it. Nothing is sent to a server.",
    ],
  },
  {
    h: "The enquiry form",
    p: [
      "The custom-hat enquiry form validates what you type and then shows a confirmation on screen only. It does not email anyone. Before launch it will be pointed at a real inbox or form service, at which point a genuine policy needs to be written for that flow.",
    ],
  },
  {
    h: "Imagery and credits",
    p: [
      "Product photographs are the business's own images, served from the Shopify content delivery network. Lifestyle and workshop photography outside the product shots is licensed stock imagery used for styling, plus generated imagery for the opening scenes — these do not depict specific products for sale.",
    ],
  },
];

const TERMS: Block[] = [
  {
    h: "Not a trading store",
    p: [
      "Nothing on this site forms a contract, an offer for sale or an order confirmation. It exists to review a shop and brand experience. Actual orders are placed through the brand's own storefront.",
    ],
  },
  {
    h: "Prices and availability",
    p: [
      "Listed prices mirror the brand's live Shopify listings at the time this concept was assembled. They can change at the shop's discretion. Custom hats carry no listed price anywhere on this site because they are quoted per commission.",
    ],
  },
  {
    h: "Product descriptions",
    p: [
      "Descriptions for listed items are reproduced from the shop's own copy. Where a detail is unknown — variant colours, materials, sizing, fulfilment terms — it is left unstated rather than guessed. Read the live listing for the authoritative version.",
    ],
  },
  {
    h: "Editing this build",
    p: [
      "Products, prices, images, links and contact details all live in two typed data files so the owner can update the shop without touching the design.",
    ],
  },
];

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const blocks = kind === "privacy" ? PRIVACY : TERMS;
  const title = kind === "privacy" ? "Privacy — in plain language" : "Terms of this concept";

  return (
    <>
      <PageHeader
        eyebrow={`Mockup ${kind === "privacy" ? "privacy" : "terms"} page`}
        title={title}
        lede="Editable placeholder copy for the concept build. Replace with the business's own published policy before launch."
      />

      <section className="bg-espresso py-20 text-parchment sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="flex items-start gap-3 border border-brass/25 bg-brass/[0.06] px-4 py-3.5 text-[0.78rem] leading-relaxed text-parchment/60">
              <PenLine className="mt-0.5 h-4 w-4 shrink-0 text-brass/70" strokeWidth={1.5} />
              Written for this design review only. This is not a legal document and should not be published as one.
            </p>
          </Reveal>

          <div className="mt-14 space-y-12">
            {blocks.map((b, i) => (
              <Reveal key={b.h} delay={i * 0.05}>
                <article>
                  <h2 className="flex items-baseline gap-3 font-display text-[1.85rem] leading-tight text-ivory">
                    <span className="text-[0.75rem] tracking-[0.2em] text-brass/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {b.h}
                  </h2>
                  <div className="mt-3 h-px w-16 hairline" aria-hidden />
                  {b.p.map((para) => (
                    <p key={para.slice(0, 20)} className="mt-4 text-[0.95rem] leading-[1.85] text-parchment/65 text-pretty">
                      {para}
                    </p>
                  ))}
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-brass/15 pt-8">
            <Concho className="text-brass/60" />
            <Link to="/shop" className="btn btn-outline">
              Back to the shop <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
            </Link>
            <Link to="/contact" className="btn btn-solid">
              Ask about a custom hat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
