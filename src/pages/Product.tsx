import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { Loader2, ArrowLeft } from "lucide-react";

// Product page sections
import { ProductHero } from "@/components/product/ProductHero";
import { FeaturedInSlider } from "@/components/product/FeaturedInSlider";
import { ProductBenefitsHero } from "@/components/product/ProductBenefitsHero";
import { UGCVideosSection } from "@/components/product/UGCVideosSection";
import { BeforeAfterSection } from "@/components/product/BeforeAfterSection";
import { ReviewsCarousel } from "@/components/product/ReviewsCarousel";
import { ProductFAQ } from "@/components/product/ProductFAQ";

export default function Product() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!handle) return;
      setLoading(true);
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-20 lg:pt-24">
          <div className="container mx-auto px-6 py-32 text-center">
            <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
            <Button asChild variant="outline">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Back Link */}
        <div className="container mx-auto px-6 pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>
        </div>

        {/* 1. Product Hero with images, trust, options, cart */}
        <ProductHero product={product} />

        {/* 2. Featured In Slider */}
        <FeaturedInSlider />

        {/* 3. Hero image with 4 benefits */}
        <ProductBenefitsHero />

        {/* 4. UGC Videos Section */}
        <UGCVideosSection />

        {/* 5. Before/After Section */}
        <BeforeAfterSection />

        {/* 6. Reviews Carousel */}
        <ReviewsCarousel />

        {/* 7. FAQ */}
        <ProductFAQ />
      </main>
      <Footer />
    </div>
  );
}
