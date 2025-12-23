import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Leaf } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-6 text-balance">Our Story</h1>
        <p className="text-xl text-muted-foreground mb-12 text-balance">Crafting exceptional footwear </p>

        <div className="relative aspect-[16/9] mb-12 overflow-hidden rounded-lg">
          <Image src="/images/home_pic.jpg" alt="Our Workshop" fill className="object-cover" />
        </div>

        <div className="space-y-8 mb-16">
          <p className="text-muted-foreground leading-relaxed">
            ValkyLeather is a small family workshop dedicated to handmade leather craftsmanship.
            Each pair of shoes is carefully made by hand using natural leather, including cow, goat, and sheep leather, selected for comfort, durability, and flexibility.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We do not mass-produce. Every order is made individually, based on the customer’s foot measurements, to ensure a proper fit and everyday comfort. Our designs are inspired by traditional leatherworking, adapted for modern use such as LARP, festivals, and outdoor wear. </p>
          <p className="text-muted-foreground leading-relaxed">
            From cutting and stitching to finishing, every step is done by hand in our workshop, with close attention to detail and honest materials.
            We offer worldwide shipping and direct communication with our customers, because handmade work should always remain personal.          </p>
        </div>

        <h2 className="text-3xl font-serif font-light mb-8">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6">
              <Award className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-medium mb-3 text-lg">Quality</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We never compromise on materials or construction. Each pair is built to last generations, becoming more
                beautiful with time.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6">
              <Users className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-medium mb-3 text-lg">Craftsmanship</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Traditional techniques passed down through generations ensure unmatched quality. Our artisans bring
                decades of expertise to every piece.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6">
              <Leaf className="h-8 w-8 mb-4 text-primary" />
              <h3 className="font-medium mb-3 text-lg">Sustainability</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We source responsibly and create footwear designed for longevity, not landfills. Timeless design means
                less waste.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-serif font-light mb-8 text-center">The ValkyLeather Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-serif">1</span>
              </div>
              <h4 className="font-medium mb-2">Design</h4>
              <p className="text-sm text-muted-foreground">Sketching timeless silhouettes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-serif">2</span>
              </div>
              <h4 className="font-medium mb-2">Selection</h4>
              <p className="text-sm text-muted-foreground">Sourcing premium materials</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-serif">3</span>
              </div>
              <h4 className="font-medium mb-2">Crafting</h4>
              <p className="text-sm text-muted-foreground">Hand-stitching each pair</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-serif">4</span>
              </div>
              <h4 className="font-medium mb-2">Finishing</h4>
              <p className="text-sm text-muted-foreground">Perfecting every detail</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
