import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";

interface Values {
  name: string;
  email: string;
  phone: string;
  interest: string;
  details: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", phone: "", interest: "", details: "", message: "" };

const INTERESTS = [
  "A custom felt Western hat",
  "A custom straw hat",
  "Restyling a hat I already own",
  "A hat band",
  "A leather accessory",
  "Something else",
];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please add your name.";
  if (!v.email.trim()) e.email = "An email address is needed for a reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim())) e.email = "That email address looks incomplete.";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 7) e.phone = "Add a full number, or leave it blank.";
  if (!v.interest.trim()) e.interest = "Choose what the enquiry is about.";
  if (!v.message.trim()) e.message = "Tell us a little about what you are after.";
  else if (v.message.trim().length < 12) e.message = "A few more words helps us point you the right way.";
  return e;
}

function Label({
  htmlFor,
  children,
  required,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3">
      <span className="text-[0.58rem] font-bold tracking-[0.24em] text-parchment/70 uppercase">
        {children}
        {required && <span className="ml-1 text-brass">*</span>}
      </span>
      {hint && <span className="text-[0.6rem] text-parchment/35">{hint}</span>}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[0.72rem] text-[#e0a173]">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
      {message}
    </p>
  );
}

export function InquiryForm({
  initialInterest,
  idPrefix = "inquiry",
  interestOptions = INTERESTS,
}: {
  initialInterest?: string;
  idPrefix?: string;
  interestOptions?: string[];
}) {
  const [values, setValues] = useState<Values>(() => ({
    ...EMPTY,
    interest: initialInterest && interestOptions.includes(initialInterest) ? initialInterest : "",
    message: initialInterest ? `I would like to ask about ${initialInterest}.` : "",
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const options = useMemo(() => Array.from(new Set([...interestOptions, ...INTERESTS])), [interestOptions]);

  useEffect(() => {
    if (!initialInterest) return;
    setValues((v) => ({
      ...v,
      interest: options.includes(initialInterest) ? initialInterest : v.interest,
    }));
  }, [initialInterest, options]);

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      formRef.current?.querySelector<HTMLElement>("[data-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    // Front-end demo only — nothing leaves the browser.
    window.setTimeout(() => setStatus("done"), 1100);
  };

  const inputCls = (key: keyof Values) => cn("field mt-2.5", errors[key] && "field-error");
  const ariaProps = (key: keyof Values) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${idPrefix}-${key}-error` : undefined,
    "data-invalid": Boolean(errors[key]) ? ("true" as const) : undefined,
  });

  if (status === "done") {
    const summary: [string, string][] = [
      ["About", values.interest],
      ["Reply to", values.email],
      ...(values.phone ? ([["Phone", values.phone]] as [string, string][]) : []),
      ...(values.details ? ([["Style notes", values.details]] as [string, string][]) : []),
    ];
    return (
      <Reveal className="border border-brass/35 bg-brass/[0.07] p-8 sm:p-10">
        <span className="inline-flex items-center gap-2 text-[0.58rem] font-bold tracking-[0.26em] text-brass uppercase">
          <CheckCircle2 className="h-4 w-4" strokeWidth={1.6} /> Demo confirmation
        </span>
        <h3 className="mt-5 font-display text-[2rem] leading-tight text-ivory">
          Saved in this browser — not sent anywhere.
        </h3>
        <p className="mt-4 text-[0.92rem] leading-relaxed text-parchment/65">
          This is a design concept, so {values.name.split(" ")[0] || "your"} enquiry stays on the page. Wiring the
          form to a real inbox or a form service is a small step during production.
        </p>
        <dl className="mt-7 space-y-2.5 border-t border-brass/20 pt-6 text-[0.82rem]">
          {summary.map(([k, v]) => (
            <div key={k} className="flex gap-4">
              <dt className="w-24 shrink-0 text-[0.6rem] font-bold tracking-[0.2em] text-parchment/40 uppercase">{k}</dt>
              <dd className="flex-1 text-parchment/75">{v}</dd>
            </div>
          ))}
        </dl>
        <button
          onClick={() => {
            setValues({ ...EMPTY });
            setErrors({});
            setStatus("idle");
          }}
          className="btn btn-outline mt-8"
        >
          Write another enquiry
        </button>
      </Reveal>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-name`} required>
            Full name
          </Label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your name"
            className={inputCls("name")}
            {...ariaProps("name")}
          />
          <ErrorText id={`${idPrefix}-name-error`} message={errors.name} />
        </div>

        <div>
          <Label htmlFor={`${idPrefix}-email`} required>
            Email
          </Label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="you@example.com"
            className={inputCls("email")}
            {...ariaProps("email")}
          />
          <ErrorText id={`${idPrefix}-email-error`} message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${idPrefix}-phone`} hint="optional">
            Phone number
          </Label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="+1 (000) 000-0000"
            className={inputCls("phone")}
            {...ariaProps("phone")}
          />
          <ErrorText id={`${idPrefix}-phone-error`} message={errors.phone} />
        </div>

        <div>
          <Label htmlFor={`${idPrefix}-interest`} required>
            Hat style or product
          </Label>
          <select
            id={`${idPrefix}-interest`}
            name="interest"
            value={values.interest}
            onChange={(e) => set("interest")(e.target.value)}
            className={cn(inputCls("interest"), "appearance-none [&>option]:text-espresso")}
            {...ariaProps("interest")}
          >
            <option value="">Choose one…</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ErrorText id={`${idPrefix}-interest-error`} message={errors.interest} />
        </div>
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-details`} hint="optional">
          Preferred colours or style details
        </Label>
        <input
          id={`${idPrefix}-details`}
          name="details"
          value={values.details}
          onChange={(e) => set("details")(e.target.value)}
          placeholder="Chocolate felt, 4in brim, tooled leather band…"
          className={inputCls("details")}
          {...ariaProps("details")}
        />
        <ErrorText id={`${idPrefix}-details-error`} message={errors.details} />
      </div>

      <div>
        <Label htmlFor={`${idPrefix}-message`} required>
          Additional message
        </Label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="Tell us what you have in mind — a shape you like, a hat you already own, or an event you are dressing for."
          className={cn(inputCls("message"), "resize-y")}
          {...ariaProps("message")}
        />
        <ErrorText id={`${idPrefix}-message-error`} message={errors.message} />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn btn-solid min-w-52 disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" strokeWidth={1.6} />}
          {status === "sending" ? "Saving…" : "Send enquiry"}
        </button>
        <p className="max-w-xs text-[0.66rem] leading-relaxed text-parchment/40">
          Demo form: submissions stay in your browser. Live enquiry delivery requires backend or form-service
          integration.
        </p>
      </div>
    </form>
  );
}
