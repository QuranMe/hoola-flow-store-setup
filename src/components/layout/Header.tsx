import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useState, useEffect } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";

const promoMessages = [
  "✨ Free shipping on orders over $150 ✨",
  "✨ Save up to $50 on bundles ✨",
  "✨ New Recovery Collection Available ✨",
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setCartOpen = useCartStore((state) => state.setOpen);

  const nextPromo = () => {
    setPromoIndex((prev) => (prev + 1) % promoMessages.length);
  };

  const prevPromo = () => {
    setPromoIndex((prev) => (prev - 1 + promoMessages.length) % promoMessages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextPromo, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Promo Bar */}
      <div className="bg-dark-charcoal text-dark-charcoal-foreground py-2.5 relative">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <button 
            onClick={prevPromo}
            className="absolute left-4 p-1 hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="text-xs font-medium tracking-wide">
            {promoMessages[promoIndex]}
          </p>
          <button 
            onClick={nextPromo}
            className="absolute right-4 p-1 hover:opacity-70 transition-opacity"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-serif text-2xl lg:text-3xl tracking-tight">hoola flow</h1>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link 
                to="/collections/all"
                className="bg-foreground text-background text-xs font-medium uppercase tracking-[0.1em] px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-colors"
              >
                SHOP
              </Link>
              <Link 
                to="/collections/recovery" 
                className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                RECOVERY
              </Link>
              <Link 
                to="/collections/performance" 
                className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                PERFORMANCE
              </Link>
              <Link 
                to="/contact" 
                className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
              >
                CONTACT
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              <Link 
                to="/collections/all"
                className="bg-foreground text-background text-xs font-medium uppercase tracking-[0.1em] px-5 py-3 rounded-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                SHOP
              </Link>
              <Link 
                to="/collections/recovery" 
                className="text-xs font-medium uppercase tracking-[0.1em] py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                RECOVERY
              </Link>
              <Link 
                to="/collections/performance" 
                className="text-xs font-medium uppercase tracking-[0.1em] py-2 border-b border-border"
                onClick={() => setMobileMenuOpen(false)}
              >
                PERFORMANCE
              </Link>
              <Link 
                to="/contact" 
                className="text-xs font-medium uppercase tracking-[0.1em] py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
            </nav>
          </div>
        )}

        <CartDrawer />
      </header>
    </>
  );
}