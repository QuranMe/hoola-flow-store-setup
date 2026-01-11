import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/product/ProductCard";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/hooks/useScrollAnimation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export function ProductsSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  if (loading) {
    return (
      <section className="py-20">
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">bestsellers</h2>
          <div className="py-16 text-center">
            <p className="text-muted-foreground text-lg">No products found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add your first product by telling us what you'd like to sell!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <AnimatedSection animation="fade-up">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-4xl md:text-5xl">bestsellers</h2>
            
            {/* Carousel Controls - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={scrollPrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={scrollNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel setApi={setApi} opts={{ align: "start" }}>
            <CarouselContent className="-ml-4">
              {displayProducts.map((product, index) => (
                <CarouselItem key={product.node.id} className="pl-4 basis-[85%]">
                  <ProductCard product={product} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Mobile Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {displayProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product, index) => (
            <AnimatedSection key={product.node.id} animation="fade-up" delay={index * 100}>
              <ProductCard product={product} index={index} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}