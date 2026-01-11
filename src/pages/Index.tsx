import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CollectionsSection />
        <ProductsSection />
        <FeaturesSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
