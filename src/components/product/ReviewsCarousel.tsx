import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    id: 1,
    name: "Jennifer K.",
    rating: 5,
    title: "Life changing!",
    text: "I've tried so many knee supports over the years, but this one is different. The compression is perfect - not too tight, not too loose. I can finally garden again without dreading the next day.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 2,
    name: "Michael T.",
    rating: 5,
    title: "Perfect for my runs",
    text: "As a runner with recurring knee issues, this sleeve has been a game-changer. It stays in place, breathes well, and gives me the support I need for long distances.",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 3,
    name: "Patricia H.",
    rating: 5,
    title: "Wish I found this sooner",
    text: "After months of dealing with knee pain from working retail, I finally found relief. I wear it under my pants all day and nobody knows - it's that comfortable.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Robert S.",
    rating: 5,
    title: "Great quality",
    text: "The build quality is excellent. I've had mine for 3 months now and it still looks and feels brand new. Worth every penny.",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 5,
    name: "Linda M.",
    rating: 5,
    title: "Finally, real support",
    text: "I'm a nurse and on my feet 12+ hours a day. This knee sleeve has made such a difference. The compression is therapeutic without being restrictive.",
    date: "2 weeks ago",
    verified: true,
  },
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (reviews.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length - 2) % (reviews.length - 2));
  };

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">Customer Reviews</p>
            <h2 className="font-serif text-3xl lg:text-4xl">
              What Our Customers Say
            </h2>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-medium">4.9 out of 5</span>
              <span className="text-muted-foreground">• Based on 2,847 reviews</span>
            </div>
          </div>

          <div className="hidden lg:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-background rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <h3 className="font-medium mb-2">{review.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                  {review.text}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.name}</span>
                    {review.verified && (
                      <span className="text-primary text-xs flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {[...Array(reviews.length - 2)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
