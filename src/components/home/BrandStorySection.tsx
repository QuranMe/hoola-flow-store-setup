import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import brandStoryImage from "@/assets/brand-story-1.jpg";

export function BrandStorySection() {
  return (
    <section id="why-hoola" className="py-8 lg:py-12">
      <div className="container mx-auto px-6">
        <div className="relative rounded-[2rem] overflow-hidden bg-secondary min-h-[550px] lg:min-h-[650px]">
          <div className="grid lg:grid-cols-2 h-full">
            {/* Image Side */}
            <div className="relative h-72 lg:h-full overflow-hidden">
              <img 
                src={brandStoryImage} 
                alt="Woman relaxing in compression wear after workout" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent lg:hidden" />
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-16 xl:p-20 flex flex-col justify-center">
              <span className="section-label mb-6">Why Hoola Flow</span>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-8">
                designed for
                <br />
                <span className="italic font-normal">real life</span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-10">
                Whether you're hitting the gym, on your feet all day at work, 
                or simply want to stay active without pain — Hoola Flow helps 
                you move better and recover faster. Not just for athletes.
              </p>

              <Link 
                to="/collections/all"
                className="btn-primary inline-flex items-center gap-2 self-start"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
