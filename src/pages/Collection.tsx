import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2, SlidersHorizontal, ChevronDown } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
type FilterOption = "all" | "upper-body" | "lower-body";

export default function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const collection = collectionInfo[slug || ""] || {
    title: "All Products",
    description: "Explore our full range of recovery and performance compression essentials.",
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

  // Helper function to categorize a product
  const categorizeProduct = (product: ShopifyProduct): "upper" | "lower" | "other" => {
    const tags = product.node.handle?.toLowerCase() || "";
    const title = product.node.title?.toLowerCase() || "";
    
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
      return "lower";
    }
    if (
      tags.includes("upper-body") ||
      title.includes("arm") ||
      title.includes("elbow") ||
      title.includes("wrist") ||
      title.includes("glove") ||
      title.includes("hand")
    ) {
      return "upper";
    }
    return "other";
  };

  // Sort function
  const sortProducts = (items: ShopifyProduct[]): ShopifyProduct[] => {
    const sorted = [...items];
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
      case "price-desc":
        return sorted.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
      case "name-asc":
        return sorted.sort((a, b) => a.node.title.localeCompare(b.node.title));
      case "name-desc":
        return sorted.sort((a, b) => b.node.title.localeCompare(a.node.title));
      default:
        return sorted;
    }
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (filterBy === "upper-body") {
      filtered = products.filter(p => categorizeProduct(p) === "upper");
    } else if (filterBy === "lower-body") {
      filtered = products.filter(p => categorizeProduct(p) === "lower");
    }
    
    return sortProducts(filtered);
  }, [products, filterBy, sortBy]);

  // Separate products into Upper Body and Lower Body categories (for subsections)
  const { upperBodyProducts, lowerBodyProducts, otherProducts } = useMemo(() => {
    const upper: ShopifyProduct[] = [];
    const lower: ShopifyProduct[] = [];
    const other: ShopifyProduct[] = [];

    const productsToProcess = sortProducts(products);

    productsToProcess.forEach((product) => {
      const category = categorizeProduct(product);
      if (category === "lower") {
        lower.push(product);
      } else if (category === "upper") {
        upper.push(product);
      } else {
        other.push(product);
      }
    });

    return { upperBodyProducts: upper, lowerBodyProducts: lower, otherProducts: other };
  }, [products, sortBy]);

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
            {/* Filter and Sort Controls */}
            {!loading && products.length > 0 && !collection.hasSubsections && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>{filteredProducts.length} products</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Filter */}
                  <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                    <SelectTrigger className="w-[160px] bg-background">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Products</SelectItem>
                      <SelectItem value="upper-body">Upper Body</SelectItem>
                      <SelectItem value="lower-body">Lower Body</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                    <SelectTrigger className="w-[180px] bg-background">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

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
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-secondary/50 rounded-2xl">
                <p className="text-lg text-muted-foreground mb-2">No products match your filters</p>
                <button 
                  onClick={() => setFilterBy("all")} 
                  className="text-sm text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.map((product, index) => (
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
