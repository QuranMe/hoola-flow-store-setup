import { Star } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-8 w-8 fill-primary text-primary" />
          ))}
        </div>

        {/* Label */}
        <p className="section-label text-center mb-4">
          Real Athletes, Real Results
        </p>

        {/* Main Headline */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center leading-tight max-w-4xl mx-auto">
          trusted by over
          <br />
          <span className="underline-accent">50,000</span> athletes
        </h2>
      </div>
    </section>
  );
}