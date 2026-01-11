import { useState, useRef } from "react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Star, ShoppingBag, Play } from "lucide-react";
import { toast } from "sonner";
import { StickyAddToCart } from "./StickyAddToCart";

// Fallback images for when Shopify images aren't available
import productImg1 from "@/assets/product-knee-sleeve-1.jpg";
import productImg2 from "@/assets/product-knee-sleeve-2.jpg";
import productImg3 from "@/assets/product-knee-sleeve-benefits.jpg";
import productImg4 from "@/assets/product-knee-sleeve-detail.jpg";

const fallbackImages = [productImg1, productImg2, productImg3, productImg4];

interface ProductHeroProps {
  product: ShopifyProduct["node"];
}

export function ProductHero({ product }: ProductHeroProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants.edges[0]?.node.id || ""
  );
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const options: Record<string, string> = {};
    product.variants.edges[0]?.node.selectedOptions.forEach((opt) => {
      options[opt.name] = opt.value;
    });
    return options;
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newOptions);

    const matchingVariant = product.variants.edges.find(({ node }) => {
      return node.selectedOptions.every((opt) => newOptions[opt.name] === opt.value);
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node.id);
    }
  };

  const currentVariant = product.variants.edges.find(
    ({ node }) => node.id === selectedVariant
  )?.node;

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

  // Use Shopify images or fallback to local images
  const images = product.images.edges.length > 0 
    ? product.images.edges.map(e => e.node.url)
    : fallbackImages;

  const price = currentVariant
    ? parseFloat(currentVariant.price.amount).toFixed(2)
    : parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2);

  // Mock UGC video thumbnails (placeholder circles)
  const ugcVideos = [
    { id: 1, name: "Sarah M." },
    { id: 2, name: "John D." },
    { id: 3, name: "Maria L." },
    { id: 4, name: "David R." },
  ];

  return (
    <section className="py-8 lg:py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
              <img
                src={images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-muted-foreground/30"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:pl-4">
            {/* Trustpilot Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
              <img
                src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg"
                alt="Trustpilot"
                className="h-4 ml-2 opacity-60"
              />
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl lg:text-4xl mb-3">{product.title}</h1>

            {/* Main Benefit */}
            <p className="text-lg text-muted-foreground mb-6">
              Instant relief you can feel. Targeted compression for pain-free movement.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-semibold">${price}</span>
              <span className="text-lg text-muted-foreground line-through">$69.99</span>
              <span className="bg-promo text-white text-sm font-medium px-2 py-1 rounded">
                Save 29%
              </span>
            </div>

            {/* Size Options */}
            {product.options.map((option) => (
              <div key={option.name} className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  {option.name}: <span className="text-muted-foreground">{selectedOptions[option.name]}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`min-w-[48px] px-4 py-2.5 text-sm border rounded-lg transition-all ${
                        selectedOptions[option.name] === value
                          ? "border-primary bg-primary text-primary-foreground font-medium"
                          : "border-border hover:border-primary bg-background"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Bundle Offer */}
            <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Bundle & Save</p>
                  <p className="text-sm text-muted-foreground">Buy 2, Get 1 Free</p>
                </div>
                <Button variant="outline" size="sm">
                  View Bundle
                </Button>
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div ref={ctaRef} className="flex gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-none rounded-l-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 rounded-none rounded-r-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1 h-12 text-base font-medium gap-2"
                onClick={handleAddToCart}
                disabled={!currentVariant?.availableForSale}
              >
                <ShoppingBag className="h-5 w-5" />
                {currentVariant?.availableForSale
                  ? `Add to Bag - $${(parseFloat(price) * quantity).toFixed(2)}`
                  : "Out of Stock"}
              </Button>
            </div>

            {/* UGC Video Bubbles */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Real customers, real results</p>
              <div className="flex gap-3">
                {ugcVideos.map((video) => (
                  <button
                    key={video.id}
                    className="relative group"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
                      <Play className="w-5 h-5 text-primary fill-primary" />
                    </div>
                    <span className="block text-xs text-center mt-1 text-muted-foreground">
                      {video.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free Shipping
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                30-Day Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                50,000+ Happy Customers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar */}
      <StickyAddToCart
        product={product}
        selectedVariant={selectedVariant}
        selectedOptions={selectedOptions}
        ctaRef={ctaRef}
      />
    </section>
  );
}
