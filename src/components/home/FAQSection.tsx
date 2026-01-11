import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is compression wear and how does it work?",
    answer: "Compression wear applies graduated pressure to your muscles, promoting blood flow and reducing muscle oscillation during movement. This helps with faster recovery, reduced soreness, and improved performance during workouts."
  },
  {
    question: "How do I choose the right size?",
    answer: "We recommend measuring your key areas (thigh, calf, waist) and comparing to our detailed size chart. Compression wear should feel snug but not restrictive. If you're between sizes, we suggest sizing up for comfort or down for maximum compression benefits."
  },
  {
    question: "Can I wear compression gear during exercise?",
    answer: "Absolutely! Our Performance line is specifically designed for active use. The moisture-wicking fabric and breathable panels keep you cool during intense workouts while providing the compression benefits you need."
  },
  {
    question: "How long should I wear compression wear for recovery?",
    answer: "For optimal recovery benefits, we recommend wearing compression gear for 1-4 hours post-workout. Our Recovery line is designed for extended wear and can be comfortably worn overnight for maximum recovery benefits."
  },
  {
    question: "How do I care for my compression wear?",
    answer: "Machine wash cold with like colors, using mild detergent. Avoid fabric softeners as they can break down the compression fibers. Air dry or tumble dry on low heat. Never iron or dry clean."
  },
  {
    question: "What's the difference between Recovery and Performance lines?",
    answer: "Our Recovery line features higher compression levels (20-30 mmHg) optimized for post-workout muscle recovery and relaxation. The Performance line offers moderate compression (15-20 mmHg) with enhanced breathability for active use during training."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes! We ship to over 50 countries worldwide. International orders typically arrive within 7-14 business days. Shipping costs and delivery times vary by destination."
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-12 leading-tight">
            <span className="italic">If you like getting into the weeds,</span>
            <br />
            <strong>here's everything behind our gear.</strong>
          </h2>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-t border-border last:border-b py-2"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}