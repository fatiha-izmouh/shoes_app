import { NextResponse } from "next/server"
import pool from "@/lib/db"
import type { Product } from "@/lib/types"

const defaultProductData = {
  category: "Leather Footwear",
  images: ["/images/placeholder.svg"],
  colors: [{ name: "Default", hex: "#000000", image: "/images/placeholder.svg" }],
  sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
  rating: 4.5,
  reviewCount: 0,
  reviews: [],
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const productId = parseInt(id)

    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const [rows] = await pool.query("SELECT * FROM produit WHERE id_produit = ?", [productId])

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const row = rows[0] as any

    // Try to parse additional data from description if it's JSON
    let additionalData = defaultProductData
    try {
      const parsed = JSON.parse(row.description || "{}")
      if (parsed.images || parsed.colors) {
        additionalData = { ...defaultProductData, ...parsed }
      }
    } catch {
      // If description is not JSON, use default data
    }

    // Priority: Use images from database columns (image, image2, image3)
    // Database stores paths like: /images/products/nike-air.png
    // Next.js serves files from public/ folder automatically
    let productImages: string[] = []
    
    // Collect all images from database columns (image, image2, image3)
    // Filter out null, undefined, or empty strings
    if (row.image && row.image.trim() !== "") {
      productImages.push(row.image.trim())
    }
    if (row.image2 && row.image2.trim() !== "") {
      productImages.push(row.image2.trim())
    }
    if (row.image3 && row.image3.trim() !== "") {
      productImages.push(row.image3.trim())
    }
    
    // Fallback to JSON description images if database columns are empty
    if (productImages.length === 0 && additionalData.images && additionalData.images.length > 0) {
      productImages = additionalData.images.filter((img: string) => img && img.trim() !== "")
    }
    
    // Log for debugging
    console.log(`Product ${productId} images from DB:`, {
      image: row.image,
      image2: row.image2,
      image3: row.image3,
      productImagesBeforePadding: productImages,
    })
    
    // Ensure we always have exactly 3 images (pad with placeholder if needed)
    // Only pad if columns are actually empty - don't replace existing values
    while (productImages.length < 3) {
      productImages.push("/placeholder.svg")
    }
    
    // Take only first 3 images (image, image2, image3)
    productImages = productImages.slice(0, 3)
    
    console.log(`Product ${productId} final images array:`, productImages)

    const product: Product = {
      id: row.id_produit.toString(),
      name: row.nom,
      description: typeof row.description === "string" && !row.description.startsWith("{") 
        ? row.description 
        : "Handcrafted leather footwear with exceptional quality.",
      price: parseFloat(row.prix.toString()),
      category: additionalData.category,
      images: productImages,
      colors: additionalData.colors,
      sizes: additionalData.sizes,
      rating: additionalData.rating,
      reviewCount: additionalData.reviewCount,
      reviews: additionalData.reviews,
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

