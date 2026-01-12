import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CartUpsellsProps {
  cartItems: CartItem[];
}

export function CartUpsells({ cartItems }: CartUpsellsProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  // Get IDs of products already in cart
  const cartProductIds = cartItems.map((item) => item.product.node.id);

  useEffect(() => {
    async function loadUpsells() {
      setLoading(true);
      try {
        const allProducts = await fetchProducts(8);
        // Filter out products already in cart
        const filtered = allProducts.filter(
          (product) => !cartProductIds.includes(product.node.id)
        );
        setProducts(filtered.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch upsell products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadUpsells();
  }, [cartProductIds.join(",")]);

  const handleQuickAdd = (product: ShopifyProduct) => {
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) return;

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="py-4">
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="py-4 border-t">
      <h4 className="text-sm font-medium mb-3">Complete Your Order</h4>
      <div className="space-y-3">
        {products.map((product) => {
          const firstImage = product.node.images.edges[0]?.node;
          const price = product.node.priceRange.minVariantPrice;
          const compareAtPrice = parseFloat(price.amount) * 1.2;

          return (
            <div
              key={product.node.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              {/* Product Image */}
              <div className="w-14 h-14 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                {firstImage ? (
                  <img
                    src={firstImage.url}
                    alt={firstImage.altText || product.node.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                    No img
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h5 className="text-xs font-medium truncate">{product.node.title}</h5>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-semibold">
                    ${parseFloat(price.amount).toFixed(0)}
                  </span>
                  <span className="text-[10px] text-muted-foreground line-through">
                    ${compareAtPrice.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Quick Add Button */}
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 flex-shrink-0"
                onClick={() => handleQuickAdd(product)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
