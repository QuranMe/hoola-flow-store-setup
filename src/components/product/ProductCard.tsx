import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
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

  // Mock compare-at price for demo (20% higher)
  const compareAtPrice = parseFloat(price.amount) * 1.2;
  const savePercent = Math.round(((compareAtPrice - parseFloat(price.amount)) / compareAtPrice) * 100);

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
    <div 
      className="group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Product Image */}
      <Link to={`/product/${node.handle}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary/50 mb-4">
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
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${node.handle}`}>
            <h3 className="font-serif text-lg leading-tight hover:underline">
              {node.title}
            </h3>
          </Link>
          <div className="text-right flex-shrink-0">
            <p className="text-sm text-muted-foreground line-through">
              ${compareAtPrice.toFixed(0)}
            </p>
            <p className="font-semibold">
              ${parseFloat(price.amount).toFixed(0)}
            </p>
          </div>
        </div>

        {/* Save Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-foreground text-background text-xs font-medium px-2 py-1 rounded">
            Save {savePercent}%
          </span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {node.description || "Premium compression technology for optimal recovery"}
        </p>

        {/* Color Options Placeholder */}
        <div className="flex items-center gap-2 pt-1">
          <button className="w-5 h-5 rounded-full bg-foreground border-2 border-foreground" />
          <button className="w-5 h-5 rounded-full bg-muted border border-border" />
        </div>

        {/* Shop Now Button */}
        <button 
          onClick={handleAddToCart}
          className="w-full btn-primary mt-3"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}