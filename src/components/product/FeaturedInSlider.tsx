export function FeaturedInSlider() {
  const logos = [
    { name: "Forbes", text: "Forbes" },
    { name: "Men's Health", text: "Men's Health" },
    { name: "Women's Health", text: "Women's Health" },
    { name: "GQ", text: "GQ" },
    { name: "Healthline", text: "Healthline" },
    { name: "Runner's World", text: "Runner's World" },
  ];

  return (
    <section className="py-8 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-6">
        <p className="section-label text-center mb-6">As Featured In</p>
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {logos.map((logo) => (
              <span
                key={logo.name}
                className="text-xl font-serif text-muted-foreground/60 hover:text-muted-foreground transition-colors"
              >
                {logo.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
