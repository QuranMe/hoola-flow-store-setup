import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] hero-bg overflow-hidden">
      <div className="container mx-auto px-6 h-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 lg:py-0">
          {/* Text Content */}
          <div className="max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="section-label mb-6">
              Premium Compression Wear
            </p>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
              Your Best
              <br />
              <span className="italic">Recovery</span> Yet
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md mb-10">
              Engineered compression wear for athletes who demand more. 
              Feel the flow, embrace recovery.
            </p>
            
            <Link 
              to="/collections/recovery"
              className="btn-primary inline-block"
            >
              Shop Recovery
            </Link>
          </div>

          {/* Hero Image Placeholder - Will show product imagery */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[600px] bg-gradient-to-br from-secondary/50 to-muted/30 rounded-3xl flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Product imagery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Press Logos Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary py-4 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-16 px-8">
              <span className="font-serif text-xl text-primary-foreground/90">Vogue</span>
              <span className="font-serif text-xl text-primary-foreground/90 italic">Forbes</span>
              <span className="font-serif text-xl text-primary-foreground/90">GQ</span>
              <span className="font-serif text-xl text-primary-foreground/90 italic">Elle</span>
              <span className="font-serif text-xl text-primary-foreground/90">Men's Health</span>
              <span className="font-serif text-xl text-primary-foreground/90 italic">WSJ</span>
              <span className="font-serif text-xl text-primary-foreground/90">Hypebeast</span>
              <span className="font-serif text-xl text-primary-foreground/90 italic">Runner's World</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}