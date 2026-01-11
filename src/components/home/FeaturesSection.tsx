import compressionDiagram from "@/assets/compression-diagram.png";

export function FeaturesSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        <div className="section-bg rounded-3xl p-8 lg:p-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-4">
              why it works
            </h2>
            <p className="section-label">
              Instant Relief You Can Feel
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-12" />

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left - Product Diagram */}
            <div className="relative">
              <div className="aspect-square bg-background rounded-2xl flex items-center justify-center overflow-hidden p-8">
                <img 
                  src={compressionDiagram} 
                  alt="Compression technology diagram showing graduated pressure zones" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Feature Callouts */}
              <div className="absolute top-8 left-8">
                <p className="section-label">Improves</p>
                <p className="section-label">Blood Flow</p>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="section-label">All-Day</p>
                <p className="section-label">Comfort</p>
              </div>
            </div>

            {/* Right - Feature Card */}
            <div className="bg-primary rounded-2xl p-8 lg:p-12 text-primary-foreground flex flex-col justify-center">
              <p className="section-label mb-4 text-primary-foreground/80">
                Targeted Compression Technology
              </p>
              
              <h3 className="font-serif text-3xl md:text-4xl mb-6">
                Helps Reduce Pain & Supports Recovery
              </h3>

              <ul className="space-y-4 text-primary-foreground/90 leading-relaxed mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>Targeted compression for joints & muscles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>Improves blood flow & recovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>All-day comfort — breathable & flexible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">✓</span>
                  <span>Designed for real life, not just athletes</span>
                </li>
              </ul>

              <p className="text-sm text-primary-foreground/60 italic">
                *Helps reduce discomfort. Not intended to treat or cure any medical condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
