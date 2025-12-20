"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound, useRouter } from "next/navigation"
import { Star, Check, ShoppingBag, ChevronLeft, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { getProduct } from "@/lib/products-service"
import type { Product, Color } from "@/lib/types"
import { FootMeasurementGuide } from "@/components/foot-measurement-guide"

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
  const [isCustomizeMode, setIsCustomizeMode] = useState(false)

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

  // Get available stock for a size (from stock table)
  const getStockForSize = (size: number): number => {
    return stock[size.toString()] || 0
  }

  // Check if size is available (quantity > 0)
  const isSizeAvailable = (size: number): boolean => {
    return getStockForSize(size) > 0
  }

  // Derive sizes from stock table (preferred), fallback to product.sizes for display
  const stockSizes = Object.entries(stock)
    .filter(([, qty]) => qty > 0)
    .map(([size]) => parseFloat(size))
    .sort((a, b) => a - b)

  const hasAnyStockRows = Object.keys(stock).length > 0
  const hasAvailableSizes = stockSizes.length > 0
  const sizesToDisplay = stockSizes

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
            {/* Thumbnails - Show all three images */}
            {/* Clicking a thumbnail changes the main image */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.slice(0, 3).map((image, index) => {
                  const isPlaceholder = !image || image === "/placeholder.svg" || image.trim() === ""

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        if (!isPlaceholder) {
                          // When clicking thumbnail, show it in main image
                          console.log("Thumbnail clicked, switching to image index:", index)
                          setSelectedImage(index)
                        }
                      }}
                      disabled={isPlaceholder}
                      className={`relative h-32 overflow-hidden bg-muted border-2 rounded-lg transition-all ${isPlaceholder
                          ? "border-dashed border-muted-foreground/30 cursor-not-allowed opacity-50"
                          : "hover:border-primary cursor-pointer"
                        } ${selectedImage === index && !isPlaceholder ? "border-primary scale-105" : "border-transparent"
                        }`}
                    >
                      {isPlaceholder ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                          No image {index + 1}
                        </div>
                      ) : (
                        <Image
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 33vw, 16vw"
                          className="object-cover"
                          onLoad={() => console.log("✅ Thumbnail loaded:", image)}
                          onError={(e) => {
                            console.error("❌ Thumbnail failed to load:", image)
                            console.error("Full path attempted:", e.currentTarget.src)
                          }}
                        />
                      )}
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
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current text-yellow-500" : "text-muted"
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
                    className={`relative w-12 h-12 rounded-full border-2 transition-all ${selectedColor.name === color.name ? "border-primary scale-110" : "border-muted"
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
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium block">Size (US)</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={!isCustomizeMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsCustomizeMode(false)}
                    className="text-xs"
                  >
                    Standard
                  </Button>
                  <FootMeasurementGuide
                    onSizeSelect={(size) => {
                      setSelectedSize(size)
                      setIsCustomizeMode(true)
                      toast({
                        title: "Custom size calculated",
                        description: `Recommended size: ${size} (US)`,
                      })
                    }}
                  />
                </div>
              </div>

              {!isCustomizeMode ? (
                hasAvailableSizes ? (
                  <div className="grid grid-cols-6 gap-2">
                    {sizesToDisplay.map((size) => {
                      const sizeStock = getStockForSize(size)
                      const available = isSizeAvailable(size)
                      return (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          onClick={() => {
                            setSelectedSize(size)
                          }}
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
                ) : (
                  <p className="text-sm text-destructive mt-2">
                    Currently out of stock for all sizes.
                  </p>
                )
              ) : (
                <div className="border-2 border-dashed border-primary/50 rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Custom Size Selected</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Size: {selectedSize ? `${selectedSize} (US)` : "Not selected"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCustomizeMode(false)}
                    >
                      Change
                    </Button>
                  </div>
                </div>
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
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!hasAvailableSizes}
              >
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


      </div>
    </div>
  )
}
