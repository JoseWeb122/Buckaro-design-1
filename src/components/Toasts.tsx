import { AnimatePresence, motion } from "framer-motion";
import { Check, CircleAlert, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useReducedMotion } from "framer-motion";
import { Concho } from "@/components/icons";

export function Toasts() {
  const { toasts, dismissToast } = useStore();
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[120] flex flex-col items-center gap-2 px-4 pb-5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end sm:px-0"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout={!reduce}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 border border-brass/25 bg-[#251a13]/95 px-4 py-3 text-left shadow-lift backdrop-blur-md"
          >
            <span
              className={
                t.tone === "success"
                  ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-brass/40 text-brass"
                  : "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center border border-tobacco/60 text-parchment/70"
              }
            >
              {t.tone === "success" ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
              ) : (
                <CircleAlert className="h-3.5 w-3.5" strokeWidth={1.8} />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.24em] text-brass uppercase">
                {t.tone === "success" ? "Added" : "Note"}
                <Concho className="opacity-40" />
              </span>
              <span className="mt-1 block text-sm font-semibold text-ivory">{t.title}</span>
              {t.body && <span className="mt-0.5 block text-xs leading-relaxed text-parchment/55">{t.body}</span>}
            </span>
            <button
              onClick={() => dismissToast(t.id)}
              aria-label="Dismiss notification"
              className="-mr-1 mt-0.5 text-parchment/40 transition-colors hover:text-brass"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
