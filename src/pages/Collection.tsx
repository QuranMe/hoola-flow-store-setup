import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

const collectionInfo: Record<string, { title: string; description: string; query: string }> = {
  recovery: {
    title: "Recovery",
    description: "Designed for post-workout recovery and rest days. Gentle compression promotes circulation and muscle recovery.",
    query: "tag:recovery",
  },
  performance: {
    title: "Performance",
    description: "Engineered for peak athletic performance. Targeted compression supports muscles during intense activity.",
    query: "tag:performance",
  },
};

export default function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const collection = collectionInfo[slug || ""] || {
    title: "All Products",
    description: "Browse our complete collection of compression activewear.",
    query: undefined,
  };

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await fetchProducts(20, collection.query);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [slug, collection.query]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Collection Header */}
        <section className="py-16 lg:py-24 hero-gradient">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl lg:text-6xl mb-4">{collection.title}</h1>
              <p className="text-lg text-muted-foreground">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-secondary/50 rounded-sm">
                <p className="text-muted-foreground mb-2">No products found in this collection</p>
                <p className="text-sm text-muted-foreground">
                  Tell me what products you'd like to add!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product, index) => (
                  <ProductCard 
                    key={product.node.id} 
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
