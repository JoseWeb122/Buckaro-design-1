import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/sections/Story";
import { Process } from "@/components/sections/Process";
import { CustomHat } from "@/components/sections/CustomHat";
import { Gallery } from "@/components/sections/Gallery";
import { Trust } from "@/components/sections/Trust";
import { ProductExplorer, ViewAllLink } from "@/components/sections/ProductExplorer";
import { PRODUCTS } from "@/data/products";
import { Reveal } from "@/components/ui";

export function Home() {
  return (
    <>
      <Hero />

      <Story />

      <ProductExplorer
        id="collection"
        pool={PRODUCTS}
        eyebrow="The shop, in full"
        title={
          <>
            Find Your Western
            <br className="hidden sm:block" /> <span className="italic">Signature.</span>
          </>
        }
        lede="Explore distinctive hats and handcrafted accessories that bring character to your Western style. Every price below is taken from the live listings."
        tone="light"
        showSearch
        limit={8}
        footer={
          <div className="flex flex-col items-center gap-4">
            <p className="max-w-md text-[0.88rem] leading-relaxed text-charcoal/65">
              Nine tooled hat bands, a Herman Oak leather hat holder, made-to-fit ear warmers and the custom hat
              route — the full shop is one click away.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ViewAllLink />
              <Link to="/collections/hat-bands" className="btn btn-ghost-brass">
                Shop hat bands <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        }
      />

      <CustomHat />

      <Process tone="light" />

      <Gallery compact />

      <Reveal>
        <div className="bg-espresso px-5 py-14 text-center sm:px-8">
          <p className="mx-auto max-w-2xl font-display text-[clamp(1.5rem,3vw,2.2rem)] leading-snug text-parchment/85">
            Want the full lookbook? The gallery keeps growing as new hats and bands leave the workshop.
          </p>
          <Link
            to="/our-craft"
            className="btn btn-outline mt-7 group"
          >
            Read how the work happens
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
          </Link>
        </div>
      </Reveal>

      <Trust />
    </>
  );
}
