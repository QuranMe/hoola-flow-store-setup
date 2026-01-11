import beforeAfterImage from "@/assets/before-after-knee.jpg";

export function BeforeAfterSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">The Difference</p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-4">
            From Pain to Performance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our targeted compression technology helps reduce discomfort so you can get back to doing what you love.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={beforeAfterImage}
              alt="Before and after comparison showing pain relief"
              className="w-full h-auto"
            />
            
            {/* Labels */}
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Before</span>
            </div>
            <div className="absolute bottom-6 right-6 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-primary-foreground">After</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 text-center">
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-primary mb-2">94%</p>
              <p className="text-sm text-muted-foreground">Report reduced pain within 7 days</p>
            </div>
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-primary mb-2">89%</p>
              <p className="text-sm text-muted-foreground">Feel more mobile and flexible</p>
            </div>
            <div>
              <p className="font-serif text-4xl lg:text-5xl text-primary mb-2">97%</p>
              <p className="text-sm text-muted-foreground">Would recommend to a friend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
