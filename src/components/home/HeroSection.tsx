import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient">
      <div className="container mx-auto px-6 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Compression Active Wear
          </p>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            Move with
            <br />
            <span className="italic">intention</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            Premium compression wear engineered for recovery and performance. 
            Feel the flow, embrace the movement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
            <Button asChild size="lg" className="gap-2">
              <Link to="/collections/recovery">
                Shop Recovery
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/collections/performance">
                Shop Performance
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
