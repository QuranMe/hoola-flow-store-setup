import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Recovery",
    slug: "recovery",
    description: "Designed for post-workout recovery and rest days. Gentle compression promotes circulation and muscle recovery.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Performance",
    slug: "performance",
    description: "Engineered for peak athletic performance. Targeted compression supports muscles during intense activity.",
    image: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=1200&auto=format&fit=crop",
  },
];

export function CollectionsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl lg:text-5xl mb-4">Collections</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Two distinct lines, one purpose: to help you move and recover better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <Link 
              key={collection.slug}
              to={`/collections/${collection.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary"
              style={{ 
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 text-primary-foreground">
                <h3 className="font-serif text-3xl lg:text-4xl mb-3">{collection.name}</h3>
                <p className="text-sm text-primary-foreground/80 max-w-sm mb-4 leading-relaxed">
                  {collection.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                  Explore Collection
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
