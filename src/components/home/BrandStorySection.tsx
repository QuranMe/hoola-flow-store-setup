import { Link } from "react-router-dom";
import brandStoryImage from "@/assets/brand-story-1.jpg";

export function BrandStorySection() {
  return (
    <section id="why-hoola" className="py-8">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-secondary min-h-[500px] lg:min-h-[600px]">
          <div className="grid lg:grid-cols-2 h-full">
            {/* Image Side */}
            <div className="relative h-64 lg:h-full overflow-hidden">
              <img 
                src={brandStoryImage} 
                alt="Woman relaxing in compression wear after workout" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <Link 
                to="#why-hoola"
                className="inline-flex items-center gap-2 border border-foreground rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em] font-medium w-fit mb-8 hover:bg-foreground hover:text-background transition-colors"
              >
                Why Hoola Flow
              </Link>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
                we know
                <br />
                <span className="italic">compression</span>
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                With scientifically-engineered compression technology and 
                athlete-backed designs, we're here to make recovery less 
                of a chore—so you can feel more confident in your performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
