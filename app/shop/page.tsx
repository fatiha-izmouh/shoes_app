import { ProductCard } from "@/components/product-card"
import { getProducts } from "@/lib/products-service"

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4 text-balance">Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our handcrafted leather footwear collection. Each piece is uniquely made by skilled artisans.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
