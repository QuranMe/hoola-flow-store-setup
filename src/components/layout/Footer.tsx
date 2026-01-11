import { Link } from "react-router-dom";
import logoWhiteBlue from "@/assets/logo-white-blue.png";

export function Footer() {
  const footerLinks = {
    shop: [
      { label: "All Products", href: "/collections/all" },
      { label: "Recovery", href: "/collections/recovery" },
      { label: "Performance", href: "/collections/performance" },
    ],
    support: [
      { label: "Shipping & Returns", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Reviews", href: "#" },
    ],
  };

  return (
    <footer className="bg-black text-white py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src={logoWhiteBlue} alt="Hoola Flow" className="h-8 mb-4" />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Premium compression activewear designed for recovery and peak performance. 
              Flow through your day with confidence.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-5 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © 2024 Hoola Flow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-xs text-background/40 hover:text-background/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
