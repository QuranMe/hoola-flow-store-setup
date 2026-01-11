import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import compressionDiagram from "@/assets/compression-diagram.png";
import { AnimatedSection } from "@/hooks/useScrollAnimation";

export function FeaturesSection() {
  const benefits = [
    "Targeted compression for joints & muscles",
    "Improves blood flow & recovery",
    "All-day comfort — breathable & flexible",
    "Designed for real life, not just athletes",
  ];

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-6">
        <div className="section-bg rounded-[2rem] p-8 lg:p-16 xl:p-20">
          {/* Header */}
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-14">
              <p className="section-label mb-4">
                Instant Relief You Can Feel
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic">
                why it works
              </h2>
            </div>
          </AnimatedSection>

          {/* Divider */}
          <div className="border-t border-border mb-14" />

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Left - Product Diagram */}
            <AnimatedSection animation="slide-right">
              <div className="relative">
                <div className="aspect-square bg-background rounded-2xl flex items-center justify-center overflow-hidden p-10 shadow-soft">
                  <img 
                    src={compressionDiagram} 
                    alt="Compression technology diagram showing graduated pressure zones" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Feature Callouts */}
                <div className="absolute top-8 left-8 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Improves</p>
                  <p className="text-sm font-medium">Blood Flow</p>
                </div>
                <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">All-Day</p>
                  <p className="text-sm font-medium">Comfort</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Feature Card */}
            <AnimatedSection animation="slide-left" delay={150}>
              <div className="bg-primary rounded-2xl p-8 lg:p-12 text-primary-foreground flex flex-col justify-center shadow-elevated h-full">
                <p className="section-label mb-4 !text-primary-foreground/70">
                  Targeted Compression Technology
                </p>
                
                <h3 className="font-serif text-3xl md:text-4xl mb-8">
                  Helps Reduce Pain & Supports Recovery
                </h3>

                <ul className="space-y-4 text-primary-foreground/90 leading-relaxed mb-10">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg 
                        className="w-5 h-5 mt-0.5 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/collections/all"
                  className="btn-secondary !bg-background !text-foreground inline-flex items-center gap-2 self-start"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-xs text-primary-foreground/50 italic mt-8">
                  *Helps reduce discomfort. Not intended to treat or cure any medical condition.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
