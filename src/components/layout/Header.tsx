import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useState, useEffect } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import logoBlackBlue from "@/assets/logo-black-blue.png";
import logoWhiteBlue from "@/assets/logo-white-blue.png";
const promoMessages = [
  "Free Shipping",
  "New Performance Collection Available",
  "Save up to $60 on Bundles this Month",
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Promo Bar */}
      <div className="bg-foreground text-background py-2.5 relative">
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
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-foreground/75 backdrop-blur-md" 
          : "bg-background"
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src={scrolled ? logoWhiteBlue : logoBlackBlue} 
                alt="Hoola Flow" 
                className="h-[3.75rem] w-auto transition-opacity duration-300"
              />
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link 
                to="/collections/recovery" 
                className={`text-xs font-medium uppercase tracking-[0.1em] px-5 py-2.5 rounded-full transition-colors ${
                  location.pathname === "/collections/recovery"
                    ? scrolled 
                      ? "bg-background text-foreground" 
                      : "bg-foreground text-background"
                    : scrolled 
                      ? "text-background/70 hover:text-background" 
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                RECOVERY
              </Link>
              <Link 
                to="/collections/performance" 
                className={`text-xs font-medium uppercase tracking-[0.1em] px-5 py-2.5 rounded-full transition-colors ${
                  location.pathname === "/collections/performance"
                    ? scrolled 
                      ? "bg-background text-foreground" 
                      : "bg-foreground text-background"
                    : scrolled 
                      ? "text-background/70 hover:text-background" 
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                PERFORMANCE
              </Link>
              <Link 
                to="/contact" 
                className={`text-xs font-medium uppercase tracking-[0.1em] transition-colors px-4 py-2 ${
                  scrolled 
                    ? "text-background/70 hover:text-background" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                CONTACT
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className={`relative transition-colors ${scrolled ? "text-background hover:bg-background/10" : ""}`}
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center font-medium ${
                    scrolled ? "bg-background text-foreground" : "bg-primary text-primary-foreground"
                  }`}>
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className={`lg:hidden transition-colors ${scrolled ? "text-background hover:bg-background/10" : ""}`}
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
                to="/collections/recovery" 
                className={`text-xs font-medium uppercase tracking-[0.1em] px-5 py-3 rounded-full text-center ${
                  location.pathname === "/collections/recovery"
                    ? "bg-foreground text-background"
                    : "text-foreground border border-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                RECOVERY
              </Link>
              <Link 
                to="/collections/performance" 
                className={`text-xs font-medium uppercase tracking-[0.1em] px-5 py-3 rounded-full text-center ${
                  location.pathname === "/collections/performance"
                    ? "bg-foreground text-background"
                    : "text-foreground border border-foreground"
                }`}
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