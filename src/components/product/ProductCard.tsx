import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingBag, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  // Check if product has size options
  const sizeOption = node.options?.find(opt => 
    opt.name.toLowerCase() === 'size' || 
    opt.name.toLowerCase() === 'taille'
  );
  const hasOptions = node.options && node.options.length > 0;

  // Mock compare-at price for demo (20% higher)
  const compareAtPrice = parseFloat(price.amount) * 1.2;
  const savePercent = Math.round(((compareAtPrice - parseFloat(price.amount)) / compareAtPrice) * 100);

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const findMatchingVariant = () => {
    if (!hasOptions) return firstVariant;
    
    return node.variants.edges.find(({ node: variant }) => {
      return variant.selectedOptions.every(opt => 
        selectedOptions[opt.name] === opt.value
      );
    })?.node;
  };

  const allOptionsSelected = () => {
    if (!hasOptions) return true;
    return node.options?.every(opt => selectedOptions[opt.name]) ?? false;
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasOptions) {
      setIsOpen(true);
    } else {
      addToCart(firstVariant);
    }
  };

  const handleAddWithOptions = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variant = findMatchingVariant();
    if (variant) {
      addToCart(variant);
      setIsOpen(false);
      setSelectedOptions({});
    }
  };

  const addToCart = (variant: typeof firstVariant) => {
    if (!variant) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    toast.success("Added to bag", {
      description: node.title,
      position: "top-center",
    });
  };

  const handleAddToCartButton = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (hasOptions) {
      setIsOpen(true);
    } else {
      addToCart(firstVariant);
    }
  };

  return (
    <div 
      className="group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image */}
      <Link to={`/product/${node.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary mb-4 shadow-soft group-hover:shadow-elevated transition-all duration-300">
          {firstImage ? (
            <img
              src={firstImage.url}
              alt={firstImage.altText || node.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
          
          {/* Save Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-promo text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-full">
              Save {savePercent}%
            </span>
          </div>

          {/* Quick Add Button with Popover */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                onClick={handleQuickAddClick}
                className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-sm text-foreground p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground shadow-soft"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-64 p-4" 
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Select Options</h4>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {node.options?.map((option) => (
                  <div key={option.name}>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOptionSelect(option.name, value);
                          }}
                          className={`px-3 py-1.5 text-xs border rounded-md transition-all ${
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

                <button
                  onClick={handleAddWithOptions}
                  disabled={!allOptionsSelected()}
                  className="w-full btn-primary text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Bag
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${node.handle}`}>
            <h3 className="font-serif text-lg leading-tight hover:text-primary transition-colors">
              {node.title}
            </h3>
          </Link>
          <div className="text-right flex-shrink-0">
            <p className="text-xs text-muted-foreground line-through">
              ${compareAtPrice.toFixed(0)}
            </p>
            <p className="font-semibold">
              ${parseFloat(price.amount).toFixed(0)}
            </p>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {node.description || "Premium compression technology for optimal recovery"}
        </p>

        {/* Color Options Placeholder */}
        <div className="flex items-center gap-2 pt-1">
          <button className="w-5 h-5 rounded-full bg-foreground border-2 border-foreground ring-2 ring-transparent hover:ring-primary/30 transition-all" />
          <button className="w-5 h-5 rounded-full bg-muted border border-border ring-2 ring-transparent hover:ring-primary/30 transition-all" />
        </div>

        {/* Shop Now Button */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button 
              onClick={handleAddToCartButton}
              className="w-full btn-primary mt-3 text-[11px]"
            >
              Add to Bag
            </button>
          </PopoverTrigger>
        </Popover>
      </div>
    </div>
  );
}
