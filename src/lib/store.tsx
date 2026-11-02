import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/data/products";

const CART_KEY = "buckaroo.cart.v1";

export interface CartLine {
  productId: string;
  qty: number;
}

export interface Toast {
  id: number;
  title: string;
  body?: string;
  tone: "success" | "info";
}

interface StoreValue {
  products: Product[];
  byId: (id: string) => Product | undefined;

  lines: CartLine[];
  itemCount: number;
  subtotal: number | null;
  hasUnpriced: boolean;
  addToCart: (product: Product, qty?: number, opts?: { silent?: boolean }) => void;
  setQty: (productId: string, qty: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;

  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;

  quickView: Product | null;
  setQuickView: (p: Product | null) => void;

  toasts: Toast[];
  pushToast: (title: string, body?: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartLine[];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((l) => l && typeof l.productId === "string" && PRODUCTS.some((p) => p.id === l.productId))
        .map((l) => ({ productId: l.productId, qty: Math.max(1, Math.min(99, Number(l.qty) || 1)) }));
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart simply stays in memory */
    }
  }, [lines]);

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const pushToast = useCallback(
    (title: string, body?: string, tone: Toast["tone"] = "success") => {
      toastId.current += 1;
      const id = toastId.current;
      setToasts((t) => [...t.slice(-2), { id, title, body, tone }]);
      const handle = window.setTimeout(() => dismissToast(id), 4200);
      timers.current.push(handle);
    },
    [dismissToast],
  );

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const byId = useCallback((id: string) => PRODUCTS.find((p) => p.id === id), []);

  const addToCart = useCallback(
    (product: Product, qty = 1, opts?: { silent?: boolean }) => {
      if (product.enquiryOnly) {
        pushToast("This one needs a conversation", "Custom hats are quoted before they can be ordered.", "info");
        return;
      }
      setLines((prev) => {
        const existing = prev.find((l) => l.productId === product.id);
        if (existing) {
          return prev.map((l) =>
            l.productId === product.id ? { ...l, qty: Math.min(99, l.qty + qty) } : l,
          );
        }
        return [...prev, { productId: product.id, qty }];
      });
      if (!opts?.silent) pushToast("Added to your bag", `${product.name} · ${qty > 1 ? `${qty} × ` : ""}held locally in this demo`);
    },
    [pushToast],
  );

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.productId !== productId)
        : prev.map((l) => (l.productId === productId ? { ...l, qty: Math.min(99, qty) } : l)),
    );
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const { itemCount, subtotal, hasUnpriced } = useMemo(() => {
    let count = 0;
    let sum = 0;
    let unpriced = false;
    for (const l of lines) {
      const p = PRODUCTS.find((x) => x.id === l.productId);
      if (!p) continue;
      count += l.qty;
      if (p.price === null) unpriced = true;
      else sum += p.price * l.qty;
    }
    return { itemCount: count, subtotal: unpriced ? null : sum, hasUnpriced: unpriced };
  }, [lines]);

  const overlayOpen = cartOpen || searchOpen || quickView !== null;

  useEffect(() => {
    if (!overlayOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [overlayOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (quickView) setQuickView(null);
      else if (searchOpen) setSearchOpen(false);
      else if (cartOpen) setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, searchOpen, quickView]);

  const value: StoreValue = {
    products: PRODUCTS,
    byId,
    lines,
    itemCount,
    subtotal,
    hasUnpriced,
    addToCart,
    setQty,
    removeLine,
    clearCart,
    cartOpen,
    openCart,
    closeCart,
    searchOpen,
    setSearchOpen,
    quickView,
    setQuickView,
    toasts,
    pushToast,
    dismissToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

/** Scroll to an element id on the current page, respecting reduced motion. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 92;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
