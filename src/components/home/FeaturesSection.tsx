import { Zap, Heart, Leaf, Sparkles } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Circulation Support",
    description: "Graduated compression technology promotes healthy blood flow and faster recovery.",
  },
  {
    icon: Zap,
    title: "Performance Ready",
    description: "Targeted muscle support reduces fatigue and enhances athletic performance.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description: "Eco-conscious fabrics that are gentle on your skin and the planet.",
  },
  {
    icon: Sparkles,
    title: "All-Day Comfort",
    description: "Breathable, moisture-wicking technology keeps you comfortable from dawn to dusk.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl mb-4">Why Hoola Flow</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Engineered with precision, designed for your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-6">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-lg mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
