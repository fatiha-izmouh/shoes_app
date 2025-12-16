"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { Star, Check, ShoppingBag, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { getProduct } from "@/lib/products-service"
import type { Product, Color } from "@/lib/types"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [stock, setStock] = useState<Record<string, number>>({})
  
  // All hooks must be called before any conditional returns
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProduct(id)
      if (!fetchedProduct) {
        notFound()
        return
      }
      
      // Debug: Log the product images
      console.log("Fetched product images:", fetchedProduct.images)
      console.log("Product ID:", id)
      console.log("Full product data:", fetchedProduct)
      
      setProduct(fetchedProduct)
      setSelectedColor(fetchedProduct.colors[0])
      
      // Reset selectedImage to 0 when product changes
      setSelectedImage(0)
      
      // Fetch stock information
      try {
        const stockResponse = await fetch(`/api/stock/${id}`)
        if (stockResponse.ok) {
          const stockData = await stockResponse.json()
          setStock(stockData.stock || {})
        }
      } catch (error) {
        console.error("Error fetching stock:", error)
      }
      
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    )
  }

  if (!product || !selectedColor) {
    notFound()
    return null
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart",
        variant: "destructive",
      })
      return
    }

    // Check stock availability
    const sizeKey = selectedSize.toString()
    const availableStock = stock[sizeKey] || 0
    
    if (availableStock === 0) {
      toast({
        title: "Out of stock",
        description: `Size ${selectedSize} is currently out of stock`,
        variant: "destructive",
      })
      return
    }

    if (quantity > availableStock) {
      toast({
        title: "Insufficient stock",
        description: `Only ${availableStock} available in size ${selectedSize}`,
        variant: "destructive",
      })
      return
    }

    addToCart(product, selectedColor, selectedSize, quantity)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  // Get available stock for a size
  const getStockForSize = (size: number): number => {
    return stock[size.toString()] || 0
  }

  // Check if size is available
  const isSizeAvailable = (size: number): boolean => {
    return getStockForSize(size) > 0
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image - Shows selected image (defaults to product.images[0]) */}
            <div className="relative aspect-square overflow-hidden bg-muted rounded-lg border border-border">
              {product.images && product.images.length > 0 ? (
                <>
                  {/* Debug: Show image path (only in dev, positioned to not cover image) */}
                  {process.env.NODE_ENV === 'development' && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs p-1 rounded z-10">
                      {product.images[selectedImage] || product.images[0]}
                    </div>
                  )}
                  <Image
                    src={product.images[selectedImage] || product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                    onLoad={() => {
                      const imgSrc = product.images[selectedImage] || product.images[0]
                      console.log("✅ Main image loaded successfully:", imgSrc)
                    }}
                    onError={(e) => {
                      console.error("❌ Main image failed to load:", e.currentTarget.src)
                      console.error("Available images:", product.images)
                      console.error("Selected image index:", selectedImage)
                    }}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <p>No image available</p>
                    <p className="text-xs mt-2">Images array: {product.images?.length || 0}</p>
                  </div>
                </div>
              )}
            </div>
            {/* Thumbnails - Only show image2 and image3 (indices 1 and 2) */}
            {/* Clicking a thumbnail changes the main image */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {product.images.slice(1, 3).map((image, index) => {
                  const thumbnailIndex = index + 1 // index 1 and 2 (image2 and image3)
                  // Skip if image is placeholder or empty
                  if (!image || image === "/placeholder.svg" || image.trim() === "") {
                    return null
                  }
                  return (
                    <button
                      key={thumbnailIndex}
                      type="button"
                      onClick={() => {
                        // When clicking thumbnail, show it in main image
                        console.log("Thumbnail clicked, switching to image index:", thumbnailIndex)
                        setSelectedImage(thumbnailIndex)
                      }}
                      className={`relative h-24 overflow-hidden bg-muted border-2 rounded-lg transition-all hover:border-primary cursor-pointer ${
                        selectedImage === thumbnailIndex ? "border-primary scale-105" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 2}`}
                        fill
                        sizes="(max-width: 768px) 25vw, 12vw"
                        className="object-cover"
                        onLoad={() => console.log("✅ Thumbnail loaded:", image)}
                        onError={(e) => {
                          console.error("❌ Thumbnail failed to load:", image)
                          console.error("Full path attempted:", e.currentTarget.src)
                        }}
                      />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-serif font-light mb-4 text-balance">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-current text-yellow-500" : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-3xl font-serif mb-6">${product.price}</p>

            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="text-sm font-medium mb-3 block">Color: {selectedColor.name}</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name ? "border-primary scale-110" : "border-muted"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow-lg" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="text-sm font-medium mb-3 block">Size (US)</label>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => {
                  const sizeStock = getStockForSize(size)
                  const available = isSizeAvailable(size)
                  return (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      disabled={!available}
                      className={`h-12 ${!available ? "opacity-50 cursor-not-allowed" : ""}`}
                      title={available ? `${sizeStock} available` : "Out of stock"}
                    >
                      {size}
                      {available && sizeStock < 5 && (
                        <span className="ml-1 text-xs">({sizeStock})</span>
                      )}
                    </Button>
                  )
                })}
              </div>
              {selectedSize && !isSizeAvailable(selectedSize) && (
                <p className="text-sm text-destructive mt-2">This size is out of stock</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => {
                    const maxQty = selectedSize ? getStockForSize(selectedSize) : 999
                    setQuantity(Math.min(quantity + 1, maxQty))
                  }}
                  disabled={selectedSize ? quantity >= getStockForSize(selectedSize) : false}
                >
                  +
                </Button>
              </div>
              {selectedSize && (
                <p className="text-sm text-muted-foreground mt-2">
                  {getStockForSize(selectedSize)} available in this size
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Sizes</span>
                  <span className="font-medium">{product.sizes.length} sizes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Colors</span>
                  <span className="font-medium">{product.colors.length} options</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-serif font-light mb-8">Customer Reviews</h2>
            <div className="grid gap-6">
              {product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium mb-1">{review.author}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-current text-yellow-500" : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
