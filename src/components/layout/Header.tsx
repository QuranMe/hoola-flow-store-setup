import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setCartOpen = useCartStore((state) => state.setOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/collections/recovery" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Recovery
            </Link>
            <Link 
              to="/collections/performance" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Performance
            </Link>
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-xl lg:text-2xl tracking-wide">Hoola Flow</h1>
          </Link>

          {/* Cart */}
          <div className="flex items-center gap-4">
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
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link 
              to="/collections/recovery" 
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recovery
            </Link>
            <Link 
              to="/collections/performance" 
              className="text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Performance
            </Link>
          </nav>
        </div>
      )}

      <CartDrawer />
    </header>
  );
}
