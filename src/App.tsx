import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchOverlay } from "@/components/SearchOverlay";
import { QuickView } from "@/components/QuickView";
import { Toasts } from "@/components/Toasts";
import { Home } from "@/pages/Home";
import { Shop } from "@/pages/Shop";
import { Collection } from "@/pages/Collection";
import { ProductPage } from "@/pages/Product";
import { OurCraft } from "@/pages/OurCraft";
import { Contact } from "@/pages/Contact";
import { LegalPage } from "@/pages/Legal";
import { NotFound } from "@/pages/NotFound";

function RoutesWithTransition() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        initial={reduce ? {} : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections/:category" element={<Collection />} />
          <Route path="/products/:handle" element={<ProductPage />} />
          <Route path="/our-craft" element={<OurCraft />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <div className="flex min-h-screen flex-col bg-espresso-950">
          <Header />
          <main id="main" className="flex-1">
            <RoutesWithTransition />
          </main>
          <Footer />
        </div>
        <CartDrawer />
        <SearchOverlay />
        <QuickView />
        <Toasts />
      </HashRouter>
    </StoreProvider>
  );
}
