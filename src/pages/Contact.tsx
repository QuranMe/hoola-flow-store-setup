import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl lg:text-5xl mb-4">Contact Us</h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Have a question or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl mb-6">Send us a message</h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="bg-background" />
                    <Input placeholder="Last Name" className="bg-background" />
                  </div>
                  <Input type="email" placeholder="Email Address" className="bg-background" />
                  <Input placeholder="Subject" className="bg-background" />
                  <Textarea 
                    placeholder="Your message..." 
                    className="bg-background min-h-[150px] resize-none" 
                  />
                  <Button className="w-full">Send Message</Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="font-serif text-2xl mb-6">Get in touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">support@hoolaflow.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">1-800-HOOLA-FLOW</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        123 Flow Street<br />
                        Los Angeles, CA 90001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-medium mb-2">Business Hours</h3>
                  <p className="text-muted-foreground text-sm">
                    Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
