import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner-active.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-transparent w-1/3" />
      </div>
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center min-h-[90vh] py-20 lg:py-0">
          {/* Text Content */}
          <div className="max-w-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <p className="section-label mb-6 text-white/80">
              Compression Recovery Activewear
            </p>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.02] mb-8 text-white">
              Move Freely.
              <br />
              <span className="italic font-normal">Recover</span> Faster.
            </h1>
            
            <p className="text-lg text-white/80 max-w-md mb-10 leading-relaxed">
              Targeted compression that helps reduce pain, improve circulation, 
              and support your body — whether you're active, recovering, or on your feet all day.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/collections/recovery"
                className="btn-primary inline-flex items-center gap-2"
              >
                Shop Recovery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://randomuser.me/api/portraits/women/56.jpg" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                </div>
                <span className="text-sm text-white/80">
                  <strong className="text-white">50,000+</strong> Happy Customers
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-white text-white"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-white/80 ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Press Logos Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#007a91] via-[#0097b2] to-[#007a91] py-4 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-20 px-10">
              <span className="font-serif text-xl text-foreground">Vogue</span>
              <span className="font-serif text-xl text-foreground italic">Forbes</span>
              <span className="font-serif text-xl text-foreground">GQ</span>
              <span className="font-serif text-xl text-foreground italic">Elle</span>
              <span className="font-serif text-xl text-foreground">Men's Health</span>
              <span className="font-serif text-xl text-foreground italic">WSJ</span>
              <span className="font-serif text-xl text-foreground">Hypebeast</span>
              <span className="font-serif text-xl text-foreground italic">Runner's World</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
