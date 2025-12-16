import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">LUXE</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting exceptional footwear since 1985. Each pair is a testament to our commitment to quality and
              design.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop?category=Sneakers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sneakers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Loafers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Loafers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Boots"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Boots
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Dress Shoes"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dress Shoes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 LUXE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
