import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ArrowLeft } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
const collectionInfo: Record<string, {
  title: string;
  description: string;
  query: string;
  hasSubsections?: boolean;
}> = {
  recovery: {
    title: "Recovery",
    description: "Designed for post-workout recovery and rest days. Gentle compression promotes circulation and muscle recovery.",
    query: "tag:recovery",
    hasSubsections: true
  },
  performance: {
    title: "Performance",
    description: "Engineered for peak athletic performance. Targeted compression supports muscles during intense activity.",
    query: "tag:performance"
  }
};
export default function Collection() {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const collection = collectionInfo[slug || ""] || {
    title: "All Products",
    description: "Browse our complete collection of compression activewear.",
    query: undefined
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

  // Separate products into Upper Body and Lower Body categories
  const {
    upperBodyProducts,
    lowerBodyProducts,
    otherProducts
  } = useMemo(() => {
    const upper: ShopifyProduct[] = [];
    const lower: ShopifyProduct[] = [];
    const other: ShopifyProduct[] = [];
    products.forEach(product => {
      const tags = product.node.handle?.toLowerCase() || "";
      const title = product.node.title?.toLowerCase() || "";

      // Check for lower body keywords
      if (tags.includes("lower-body") || title.includes("leg") || title.includes("calf") || title.includes("ankle") || title.includes("foot") || title.includes("sock") || title.includes("knee")) {
        lower.push(product);
      }
      // Check for upper body keywords
      else if (tags.includes("upper-body") || title.includes("arm") || title.includes("elbow") || title.includes("wrist") || title.includes("glove") || title.includes("hand")) {
        upper.push(product);
      }
      // Everything else
      else {
        other.push(product);
      }
    });
    return {
      upperBodyProducts: upper,
      lowerBodyProducts: lower,
      otherProducts: other
    };
  }, [products]);
  return <div className="min-h-screen">
      <Header />
      <main>
        {/* Collection Header */}
        <section className="gradient-hero section-padding">
          <div className="container mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="max-w-2xl">
              <p className="section-label mb-4">Shop Collection</p>
              <h1 className="font-serif text-5xl lg:text-6xl mb-6">{collection.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding gradient-subtle">
          <div className="container mx-auto px-6">
            {loading ? <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div> : products.length === 0 ? <div className="text-center py-20 bg-secondary/50 rounded-2xl">
                <p className="text-lg text-muted-foreground mb-2">No products found in this collection</p>
                <p className="text-sm text-muted-foreground">
                  Tell me what products you'd like to add!
                </p>
              </div> : collection.hasSubsections ? <div className="space-y-16">
                {/* Lower Body Section */}
                {lowerBodyProducts.length > 0 && <AnimatedSection animation="fade-up">
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="section-label">Lower Body</span>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                      <p className="text-muted-foreground">
                        Compression sleeves and supports for legs, calves, ankles, feet, and knees
                      </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {lowerBodyProducts.map((product, index) => <ProductCard key={product.node.id} product={product} index={index} />)}
                    </div>
                  </AnimatedSection>}

                {/* Upper Body Section */}
                {upperBodyProducts.length > 0 && <AnimatedSection animation="fade-up" delay={200}>
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="section-label">Upper Body</span>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                      <p className="text-muted-foreground">LOWER BODY (PERFORMANCE)</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {upperBodyProducts.map((product, index) => <ProductCard key={product.node.id} product={product} index={index} />)}
                    </div>
                  </AnimatedSection>}

                {/* Other Products */}
                {otherProducts.length > 0 && <AnimatedSection animation="fade-up" delay={400}>
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="section-label">Other Products</span>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {otherProducts.map((product, index) => <ProductCard key={product.node.id} product={product} index={index} />)}
                    </div>
                  </AnimatedSection>}
              </div> : <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product, index) => <ProductCard key={product.node.id} product={product} index={index} />)}
              </div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}