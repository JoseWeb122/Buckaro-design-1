import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Clock, Mail, MapPin, Phone, Search, Store } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { InquiryForm } from "@/components/InquiryForm";
import { Reveal, Eyebrow } from "@/components/ui";
import { FacebookMark, InstagramMark, Concho } from "@/components/icons";
import { BRAND } from "@/data/site";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { useStore } from "@/lib/store";

export function Contact() {
  const [params] = useSearchParams();
  const about = params.get("about") ?? undefined;
  const { setSearchOpen } = useStore();
  const [copied, setCopied] = useState(false);

  const interests = [
    "A custom felt Western hat",
    "A custom straw hat",
    "Restyling a hat I already own",
    ...PRODUCTS.filter((p) => !p.enquiryOnly).map((p) => p.name),
  ];

  const copyStore = async () => {
    try {
      await navigator.clipboard.writeText(BRAND.links.shop);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Custom hats & enquiries"
        title={
          <>
            Your Style. Your Hat.
            <br />
            <span className="italic text-parchment/85">Your Story.</span>
          </>
        }
        lede="Looking for a particular shape or style? Tell us what you have in mind and we can start a conversation about your custom hat — or about a band, a holder, anything that finishes the look."
      />

      <section id="contact-form" className="relative overflow-hidden bg-espresso-950 py-20 text-parchment sm:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(65% 55% at 20% 0%, rgba(145,101,66,.22), transparent 70%)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-[104rem] gap-14 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Send an enquiry</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-xl text-[0.94rem] leading-relaxed text-parchment/62">
                Six short fields. Add a reference photo description if you have one — a crease you like, a colour you
                wear often, a hat you inherited.
              </p>
            </Reveal>
            {about && (
              <Reveal delay={0.1}>
                <p className="mt-6 inline-flex items-center gap-2.5 border border-brass/30 bg-brass/[0.07] px-3.5 py-2 text-[0.7rem] text-brass-light">
                  <Concho className="text-brass" /> Preparing an enquiry about{" "}
                  <span className="font-semibold text-ivory">{about}</span>
                </p>
              </Reveal>
            )}
            <Reveal delay={0.14} className="mt-9">
              <InquiryForm initialInterest={about} idPrefix="contact" interestOptions={interests} />
            </Reveal>
          </div>

          <aside className="lg:pt-14">
            <Reveal delay={0.18}>
              <div className="border border-brass/22 bg-espresso/60 p-7">
                <h2 className="font-display text-2xl text-ivory">What happens next</h2>
                <ol className="mt-6 space-y-5">
                  {[
                    { t: "You describe it", d: "Shape, colours, band, budget if you have one in mind." },
                    { t: "We come back with questions", d: "Anything needed to scope the work — usually one or two replies." },
                    { t: "Price and timing confirmed", d: "Before any cutting or shaping starts, so there are no surprises." },
                  ].map((s, i) => (
                    <li key={s.t} className="flex gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-brass/40 text-[0.62rem] font-bold text-brass">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block text-[0.9rem] font-semibold text-ivory">{s.t}</span>
                        <span className="mt-1 block text-[0.8rem] leading-relaxed text-parchment/55">{s.d}</span>
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 h-px w-full hairline" aria-hidden />

                <h3 className="mt-7 text-[0.58rem] font-bold tracking-[0.28em] text-brass uppercase">
                  Direct routes
                </h3>
                <ul className="mt-4 space-y-3 text-[0.84rem]">
                  <ContactRow
                    icon={InstagramMark}
                    label="Instagram"
                    value="@buckaroohatterscustom"
                    href={BRAND.links.instagram}
                  />
                  <ContactRow icon={FacebookMark} label="Facebook" value="Buckaroo Hatters Custom Hats" href={BRAND.links.facebook} />
                  <ContactRow icon={Store} label="Shopify store" value="Order the listed pieces here" href={BRAND.links.shop} lucide />
                </ul>

                <div className="mt-6 space-y-2.5 border-t border-brass/15 pt-5 text-[0.78rem] text-parchment/50">
                  <p className="flex items-center gap-2.5">
                    <Phone className="h-3.5 w-3.5 text-brass/70" strokeWidth={1.5} />
                    Phone — <span className="text-parchment/35">to be added by the owner</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Mail className="h-3.5 w-3.5 text-brass/70" strokeWidth={1.5} />
                    Email — <span className="text-parchment/35">to be added by the owner</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass/70" strokeWidth={1.5} />
                    <span>
                      Workshop address &amp; opening hours —{" "}
                      <span className="text-parchment/35">left blank in this concept rather than invented</span>
                    </span>
                  </p>
                </div>

                <button onClick={copyStore} className="btn btn-outline mt-7 w-full !py-3 text-[0.58rem]">
                  {copied ? "Store link copied" : "Copy store link"}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-5 flex flex-wrap items-center gap-3 border border-brass/18 px-4 py-3.5 text-[0.7rem] text-parchment/50">
                <Clock className="h-3.5 w-3.5 text-brass/70" strokeWidth={1.5} />
                Replies follow the workshop's own rhythm — this form does not send anything yet.
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-parchment py-20 text-espresso sm:py-24">
        <div className="mx-auto max-w-[104rem] px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col gap-8 border-y border-espresso/15 py-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="eyebrow text-tobacco">Rather just pick one up?</span>
                <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight">
                  The shop has {PRODUCTS.filter((p) => !p.enquiryOnly).length} finished pieces listed right now.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop" className="btn btn-dark">
                  Browse the shop <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                </Link>
                <button onClick={() => setSearchOpen(true)} className="btn btn-ghost-brass">
                  <Search className="h-4 w-4" strokeWidth={1.6} /> Search by name
                </button>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={`/collections/${c.id}`}
                className="group flex items-center justify-between gap-4 border border-espresso/15 px-4 py-4 transition-colors hover:border-espresso hover:bg-espresso hover:text-parchment"
              >
                <span>
                  <span className="block font-display text-[1.35rem]">{c.label}</span>
                  <span className="mt-1 block text-[0.72rem] opacity-70">
                    {c.id === "custom-hats" ? "By enquiry" : `${PRODUCTS.filter((p) => p.category === c.id).length} listed`}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  lucide = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href: string;
  lucide?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="group flex items-center gap-3 transition-colors hover:text-brass-light"
      >
        <Icon className={lucide ? "h-4 w-4 shrink-0 text-brass/70" : "h-4 w-4 shrink-0 text-brass/70"} />
        <span className="min-w-0 flex-1">
          <span className="block text-[0.6rem] font-bold tracking-[0.2em] text-parchment/40 uppercase">{label}</span>
          <span className="block truncate text-parchment/80">{value}</span>
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" strokeWidth={1.6} />
      </a>
    </li>
  );
}
