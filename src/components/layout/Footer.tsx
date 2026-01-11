import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary py-16 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl mb-4">Hoola Flow</h3>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Premium compression activewear designed for recovery and peak performance. 
              Flow through your day with confidence.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-medium text-sm mb-4 uppercase tracking-wider">Collections</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/collections/recovery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Recovery
                </Link>
              </li>
              <li>
                <Link to="/collections/performance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-muted-foreground">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Size Guide</span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">Contact Us</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Hoola Flow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Privacy Policy</span>
            <span className="text-xs text-muted-foreground">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
