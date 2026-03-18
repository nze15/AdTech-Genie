import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted">
            © {currentYear} AdTech Genie. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="#" className="text-sm text-muted hover:text-foreground transition-colors">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
