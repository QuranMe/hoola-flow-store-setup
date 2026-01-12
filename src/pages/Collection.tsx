import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import collectionHeroImage from "@/assets/collection-hero-couple.jpg";
import collectionHeroPerformance from "@/assets/collection-hero-performance.png";
import collectionHeroAll from "@/assets/collection-hero-all.png";

const collectionHeroImages: Record<string, string> = {
  performance: collectionHeroPerformance,
  all: collectionHeroAll,
};

const collectionInfo: Record<string, { title: string; description: string; query: string; hasSubsections?: boolean }> = {
  recovery: {
    title: "Recovery",
    description: "Designed for post-workout recovery and rest days. Gentle compression promotes circulation and muscle recovery.",
    query: "tag:recovery",
    hasSubsections: true,
  },
  performance: {
    title: "Performance",
    description: "Engineered for peak athletic performance. Targeted compression supports muscles during intense activity.",
    query: "tag:performance",
    hasSubsections: true,
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

  // Separate products into Upper Body and Lower Body categories
  const { upperBodyProducts, lowerBodyProducts, otherProducts } = useMemo(() => {
    const upper: ShopifyProduct[] = [];
    const lower: ShopifyProduct[] = [];
    const other: ShopifyProduct[] = [];

    products.forEach((product) => {
      const tags = product.node.handle?.toLowerCase() || "";
      const title = product.node.title?.toLowerCase() || "";
      
      // Check for lower body keywords
      if (
        tags.includes("lower-body") ||
        title.includes("leg") ||
        title.includes("legging") ||
        title.includes("short") ||
        title.includes("calf") ||
        title.includes("ankle") ||
        title.includes("foot") ||
        title.includes("sock") ||
        title.includes("knee")
      ) {
        lower.push(product);
      }
      // Check for upper body keywords
      else if (
        tags.includes("upper-body") ||
        title.includes("arm") ||
        title.includes("elbow") ||
        title.includes("wrist") ||
        title.includes("glove") ||
        title.includes("hand")
      ) {
        upper.push(product);
      }
      // Everything else
      else {
        other.push(product);
      }
    });

    return { upperBodyProducts: upper, lowerBodyProducts: lower, otherProducts: other };
  }, [products]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Collection Header */}
        <section className="gradient-hero-blue section-padding relative pb-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <p className="section-label mb-4">Shop Collection</p>
                <h1 className="font-serif text-5xl lg:text-6xl mb-6">{collection.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {collection.description}
                </p>
              </div>
              <div className="lg:w-1/2 flex-shrink-0">
                <img 
                  src={collectionHeroImages[slug || ""] || collectionHeroImage} 
                  alt={`${collection.title} collection`}
                  className="w-full h-auto rounded-2xl shadow-lg object-cover max-h-80 lg:max-h-96"
                />
              </div>
            </div>
          </div>
          
          {/* Trust Ticker */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#007a91] via-[#0097b2] to-[#007a91] py-4 overflow-hidden">
            <div className="flex animate-ticker whitespace-nowrap">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-20 px-10">
                  <span className="font-serif text-xl text-white">60 DAY MONEY-BACK GUARANTEE</span>
                  <span className="text-white/60">•</span>
                  <span className="font-serif text-xl text-white">UP TO 60% OFF BUNDLES</span>
                  <span className="text-white/60">•</span>
                  <span className="font-serif text-xl text-white">FREE SHIPPING</span>
                  <span className="text-white/60">•</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-padding gradient-subtle">
          <div className="container mx-auto px-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-secondary/50 rounded-2xl">
                <p className="text-lg text-muted-foreground mb-2">No products found in this collection</p>
                <p className="text-sm text-muted-foreground">
                  Tell me what products you'd like to add!
                </p>
              </div>
            ) : collection.hasSubsections ? (
              <div className="space-y-16">
                {/* Lower Body Section */}
                {lowerBodyProducts.length > 0 && (
                  <AnimatedSection animation="fade-up">
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
                      {lowerBodyProducts.map((product, index) => (
                        <ProductCard 
                          key={product.node.id} 
                          product={product}
                          index={index}
                        />
                      ))}
                    </div>
                  </AnimatedSection>
                )}

                {/* Upper Body Section */}
                {upperBodyProducts.length > 0 && (
                  <AnimatedSection animation="fade-up" delay={200}>
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="section-label">Upper Body</span>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                      <p className="text-muted-foreground">
                        Compression sleeves and supports for arms, elbows, wrists, and hands
                      </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {upperBodyProducts.map((product, index) => (
                        <ProductCard 
                          key={product.node.id} 
                          product={product}
                          index={index}
                        />
                      ))}
                    </div>
                  </AnimatedSection>
                )}

                {/* Other Products */}
                {otherProducts.length > 0 && (
                  <AnimatedSection animation="fade-up" delay={400}>
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="section-label">Other Products</span>
                        <div className="flex-1 h-px bg-border"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                      {otherProducts.map((product, index) => (
                        <ProductCard 
                          key={product.node.id} 
                          product={product}
                          index={index}
                        />
                      ))}
                    </div>
                  </AnimatedSection>
                )}
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
