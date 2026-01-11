import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    name: "Sarah M.",
    title: "Nurse, 42",
    quote: "Finally, I can get through a 12-hour shift pain-free!",
  },
  {
    id: 2,
    name: "John D.",
    title: "Runner, 38",
    quote: "My knee hasn't felt this good in years.",
  },
  {
    id: 3,
    name: "Maria L.",
    title: "Yoga Instructor, 35",
    quote: "Perfect support without limiting my flexibility.",
  },
  {
    id: 4,
    name: "David R.",
    title: "Construction Worker, 48",
    quote: "I wear it every day. Game changer.",
  },
];

export function UGCVideosSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Real Stories</p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-4">
            See What Our Customers Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thousands of people have transformed their daily lives with Hoola Flow compression gear.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted cursor-pointer"
            >
              {/* Placeholder gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-foreground/30" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-foreground fill-foreground ml-1" />
                </div>
              </div>

              {/* Bottom overlay with info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
                <p className="text-background font-medium text-sm">{video.name}</p>
                <p className="text-background/70 text-xs mb-2">{video.title}</p>
                <p className="text-background text-xs italic">"{video.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
