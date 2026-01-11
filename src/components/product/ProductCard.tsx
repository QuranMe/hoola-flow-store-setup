import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const firstImage = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Added to bag", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary mb-4">
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
        
        <Button
          variant="secondary"
          size="icon"
          className="absolute bottom-3 right-3 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 h-10 w-10 rounded-full shadow-lg"
          onClick={handleAddToCart}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          ${parseFloat(price.amount).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
