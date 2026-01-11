import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!", {
        description: "You'll be the first to know about new releases.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto px-6">
        <div className="bg-primary rounded-[2rem] p-10 lg:p-16 xl:p-20 text-center">
          <p className="section-label !text-primary-foreground/70 mb-4">
            Join the Flow
          </p>
          <h2 className="font-serif text-3xl lg:text-5xl mb-4 text-primary-foreground">
            Stay in the Loop
          </h2>
          <p className="text-primary-foreground/80 mb-10 max-w-md mx-auto">
            Subscribe for early access to new collections, exclusive offers, and wellness tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 bg-background border-0 rounded-full px-6 text-foreground placeholder:text-muted-foreground"
              required
            />
            <Button 
              type="submit" 
              size="lg" 
              className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold uppercase tracking-wider text-xs gap-2"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-primary-foreground/50 mt-6">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
