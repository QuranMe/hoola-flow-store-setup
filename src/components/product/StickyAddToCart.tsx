import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";

interface StickyAddToCartProps {
  product: ShopifyProduct["node"];
  selectedVariant: string;
  selectedOptions: Record<string, string>;
  ctaRef: React.RefObject<HTMLDivElement>;
}

export function StickyAddToCart({ 
  product, 
  selectedVariant, 
  selectedOptions,
  ctaRef 
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const currentVariant = product.variants.edges.find(
    ({ node }) => node.id === selectedVariant
  )?.node;

  const price = currentVariant
    ? parseFloat(currentVariant.price.amount).toFixed(2)
    : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when CTA button is NOT visible
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, [ctaRef]);

  const handleAddToCart = () => {
    if (!currentVariant) return;

    addItem({
      product: { node: product },
      variantId: currentVariant.id,
      variantTitle: currentVariant.title,
      price: currentVariant.price,
      quantity,
      selectedOptions: currentVariant.selectedOptions,
    });

    toast.success("Added to bag", {
      description: `${product.title} x ${quantity}`,
      position: "top-center",
    });
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-elevated transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Product Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
              {product.images.edges[0] && (
                <img
                  src={product.images.edges[0].node.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-medium text-sm truncate">{product.title}</h4>
              <p className="text-sm text-muted-foreground">
                {Object.values(selectedOptions).join(" / ")}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="hidden sm:block text-lg font-semibold">
            ${price}
          </div>

          {/* Quantity */}
          <div className="hidden md:flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none rounded-l-lg"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center font-medium text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none rounded-r-lg"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="h-11 px-6 font-medium gap-2 flex-shrink-0"
            onClick={handleAddToCart}
            disabled={!currentVariant?.availableForSale}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Bag</span>
            <span className="sm:hidden">${(parseFloat(price) * quantity).toFixed(2)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
