"use client"

import Link from "next/link"
import { ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useState, useEffect } from "react"

export function Header() {
  console.log("[v0] Header rendering")

  const { getCartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    console.log("[v0] Cart count:", getCartCount())
  }, [getCartCount])

  return (
    <header className="sticky top-0 z-50 bg-[var(--logo-bg)] backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logo.jpeg"
            alt=""
            className="h-14 w-14 object-contain"
          />
          <span className="text-xl font-serif tracking-tight hidden sm:inline">ValkyLeather</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-foreground/70 transition-colors">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium hover:text-foreground/70 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-foreground/70 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-foreground/70 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex gap-4 pt-4 border-t border-border/40">
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Cart ({getCartCount()})
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
