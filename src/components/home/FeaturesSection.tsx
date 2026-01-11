export function FeaturesSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        <div className="section-bg rounded-3xl p-8 lg:p-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-4">
              why it's better
            </h2>
            <p className="section-label">
              Medical-Grade, Athlete Tested, Performance Proven
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-12" />

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left - Product Diagram Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-background rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-2">Product diagram</p>
                  <p className="text-xs text-muted-foreground">Compression technology visualization</p>
                </div>
              </div>
              
              {/* Feature Callouts */}
              <div className="absolute top-8 left-8">
                <p className="section-label">Targeted</p>
                <p className="section-label">Compression</p>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="section-label">Moisture</p>
                <p className="section-label">Wicking</p>
              </div>
            </div>

            {/* Right - Feature Card */}
            <div className="bg-primary rounded-2xl p-8 lg:p-12 text-primary-foreground flex flex-col justify-center">
              <p className="section-label mb-4 text-primary-foreground/80">
                Scientifically Engineered
              </p>
              
              <h3 className="font-serif text-3xl md:text-4xl mb-6">
                GradientFlow™ Compression
              </h3>

              <p className="text-primary-foreground/90 leading-relaxed mb-8">
                "GradientFlow™ compression applies graduated pressure from 
                extremities toward the heart, which is up to <strong>3x more effective</strong> 
                than standard compression.* This promotes better blood flow 
                and faster muscle recovery for peak athletic performance."
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <span className="text-xs">DR</span>
                </div>
                <div>
                  <p className="font-medium">Dr. Sarah Mitchell, MD</p>
                  <p className="text-sm text-primary-foreground/70 uppercase tracking-wide">
                    Sports Medicine Specialist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}