import { Droplets, Shield, Wind, Zap } from "lucide-react";
import heroImage from "@/assets/product-hero-lifestyle.jpg";

const benefits = [
  {
    icon: Zap,
    title: "Instant Relief",
    description: "Feel the difference from the moment you put it on",
  },
  {
    icon: Droplets,
    title: "Improved Circulation",
    description: "Graduated compression promotes healthy blood flow",
  },
  {
    icon: Shield,
    title: "Joint Support",
    description: "Stabilizes and protects during any activity",
  },
  {
    icon: Wind,
    title: "Breathable Comfort",
    description: "All-day wearability with moisture-wicking fabric",
  },
];

export function ProductBenefitsHero() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Why It Works</p>
          <h2 className="font-serif text-3xl lg:text-4xl">
            Science-Backed Compression Technology
          </h2>
        </div>

        <div className="relative">
          {/* Benefits Grid - Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-8 items-center">
            {/* Left Benefits */}
            <div className="space-y-12">
              {benefits.slice(0, 2).map((benefit) => (
                <div key={benefit.title} className="text-right">
                  <div className="flex items-center justify-end gap-4 mb-2">
                    <h3 className="font-serif text-xl">{benefit.title}</h3>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Knee sleeve in action"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Benefits */}
            <div className="space-y-12">
              {benefits.slice(2, 4).map((benefit) => (
                <div key={benefit.title} className="text-left">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid - Mobile */}
          <div className="lg:hidden">
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={heroImage}
                alt="Knee sleeve in action"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
