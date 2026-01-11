import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";
import { Loader2 } from "lucide-react";

export function ProductsSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts(8);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl mb-4">Our Products</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Curated compression wear for every moment of your day.
            </p>
          </div>

          <div className="text-center py-20 bg-secondary/50 rounded-sm">
            <p className="text-muted-foreground mb-2">No products found</p>
            <p className="text-sm text-muted-foreground">
              Tell me what products you'd like to add to your store!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl mb-4">Our Products</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Curated compression wear for every moment of your day.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={product.node.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
