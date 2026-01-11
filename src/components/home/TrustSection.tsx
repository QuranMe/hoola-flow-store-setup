import { Star } from "lucide-react";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

export function TrustSection() {
  const stats = [
    { value: "50,000+", label: "Happy Customers" },
    { value: "4.9", label: "Average Rating" },
    { value: "30-Day", label: "Money Back Guarantee" },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stars */}
          <AnimatedSection animation="scale-in">
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-7 w-7 fill-primary text-primary" />
              ))}
            </div>
          </AnimatedSection>

          {/* Label */}
          <AnimatedSection animation="fade-up" delay={100}>
            <p className="section-label mb-6">
              Active Everyday People Trust Us
            </p>
          </AnimatedSection>

          {/* Main Headline */}
          <AnimatedSection animation="fade-up" delay={200}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-12">
              helping over
              <br />
              <span className="underline-accent">50,000</span> people move better
            </h2>
          </AnimatedSection>

          {/* Stats Grid */}
          <AnimatedSection animation="fade-up" delay={300}>
            <div className="grid grid-cols-3 gap-6 lg:gap-12 pt-8 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-3xl lg:text-4xl mb-2">{stat.value}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
