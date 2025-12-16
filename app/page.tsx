import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image src="/images/image.png" alt="Handcrafted Leather Market" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-light mb-6 text-white text-balance">
            Handcrafted Leather Excellence
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
            Discover authentic handmade leather footwear where traditional craftsmanship meets timeless design
          </p>
          <Link href="/shop">
            <Button size="lg" className="group">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-light mb-4">Featured Collection</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each piece is handcrafted by skilled artisans using traditional leatherworking techniques
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/capture-20d-27-c3-a9cran-202025-12-16-20140210.png"
                alt="Handcrafted Leatherwork"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif font-light mb-6">Our Craft</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At ValkyLeather, every pair of shoes is a testament to the ancient art of leatherworking. Our artisans
                use time-honored techniques passed down through generations to create unique, durable footwear.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We source only the finest quality leather and materials, ensuring each piece is not just footwear, but
                wearable art that tells a story.
              </p>
              <Link href="/about">
                <Button variant="outline">Learn More About Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
