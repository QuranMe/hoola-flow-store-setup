import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct, CartItem } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CartUpsellsProps {
  cartItems: CartItem[];
}

export function CartUpsells({ cartItems }: CartUpsellsProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Record<string, string>>>({});
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

  const handleOptionSelect = (productId: string, optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [optionName]: value,
      },
    }));
  };

  const findMatchingVariant = (product: ShopifyProduct) => {
    const productOptions = selectedOptions[product.node.id] || {};
    return product.node.variants.edges.find(({ node: variant }) => {
      return variant.selectedOptions.every(
        (opt) => productOptions[opt.name] === opt.value
      );
    })?.node;
  };

  const allOptionsSelected = (product: ShopifyProduct) => {
    const productOptions = selectedOptions[product.node.id] || {};
    return product.node.options?.every((opt) => productOptions[opt.name]) ?? false;
  };

  const hasOptions = (product: ShopifyProduct) => {
    return product.node.options && product.node.options.length > 0;
  };

  const handleQuickAdd = (product: ShopifyProduct) => {
    if (hasOptions(product)) {
      setOpenPopoverId(product.node.id);
    } else {
      addToCart(product, product.node.variants.edges[0]?.node);
    }
  };

  const handleAddWithOptions = (product: ShopifyProduct) => {
    const variant = findMatchingVariant(product);
    if (variant) {
      addToCart(product, variant);
      setOpenPopoverId(null);
      setSelectedOptions((prev) => {
        const updated = { ...prev };
        delete updated[product.node.id];
        return updated;
      });
    }
  };

  const addToCart = (product: ShopifyProduct, variant: ShopifyProduct["node"]["variants"]["edges"][0]["node"] | undefined) => {
    if (!variant) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
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
          const productHasOptions = hasOptions(product);

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

              {/* Quick Add Button with Popover */}
              <Popover
                open={openPopoverId === product.node.id}
                onOpenChange={(open) => setOpenPopoverId(open ? product.node.id : null)}
              >
                <PopoverTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 flex-shrink-0"
                    onClick={() => handleQuickAdd(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                {productHasOptions && (
                  <PopoverContent
                    className="w-56 p-3 bg-background border border-border shadow-lg z-50"
                    align="end"
                    side="top"
                    sideOffset={8}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-xs">Select Size</h4>
                        <button
                          onClick={() => setOpenPopoverId(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      {product.node.options?.map((option) => (
                        <div key={option.name}>
                          <label className="block text-[10px] font-medium text-muted-foreground mb-1.5">
                            {option.name}
                          </label>
                          <div className="flex flex-wrap gap-1">
                            {option.values.map((value) => (
                              <button
                                key={value}
                                onClick={() => handleOptionSelect(product.node.id, option.name, value)}
                                className={`px-2 py-1 text-[10px] border rounded transition-all ${
                                  selectedOptions[product.node.id]?.[option.name] === value
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

                      <Button
                        size="sm"
                        onClick={() => handleAddWithOptions(product)}
                        disabled={!allOptionsSelected(product)}
                        className="w-full text-xs h-8"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            </div>
          );
        })}
      </div>
    </div>
  );
}
