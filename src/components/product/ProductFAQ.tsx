import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I choose the right size?",
    answer:
      "Measure around the center of your knee while standing. Size S fits 12-14\", M fits 14-16\", L fits 16-18\", and XL fits 18-20\". If you're between sizes, we recommend sizing up for comfort or down for firmer compression.",
  },
  {
    question: "How long can I wear the knee sleeve?",
    answer:
      "You can wear our knee sleeve all day! It's designed for extended wear with breathable, moisture-wicking fabric. Many of our customers wear it during 8-12 hour work shifts. We recommend removing it at night to let your skin breathe.",
  },
  {
    question: "Will it help with my specific condition?",
    answer:
      "Our compression sleeves are designed to provide general support and comfort for everyday activities. They may help reduce discomfort associated with minor aches and strains. For specific medical conditions, we always recommend consulting with your healthcare provider.",
  },
  {
    question: "How do I wash and care for my sleeve?",
    answer:
      "Hand wash in cold water with mild detergent and air dry. Avoid machine washing, bleach, or high heat as these can damage the compression fibers. With proper care, your sleeve will maintain its compression for 6-12 months of regular use.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, simply return it for a full refund. The product must be in original condition. Return shipping is free for customers in the US.",
  },
  {
    question: "How quickly will I receive my order?",
    answer:
      "We offer free standard shipping (5-7 business days) on all orders. Express shipping (2-3 business days) is available for $9.99. All orders are processed within 24 hours and you'll receive tracking information via email.",
  },
];

export function ProductFAQ() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="font-serif text-3xl lg:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
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
