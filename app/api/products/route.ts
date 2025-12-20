import { NextResponse } from "next/server"
import pool from "@/lib/db"
import type { Product } from "@/lib/types"

// Extended product data stored as JSON in description
// For now, we'll use a fallback approach
const defaultProductData = {
  category: "Leather Footwear",
  images: ["/images/placeholder.svg"],
  colors: [{ name: "Default", hex: "#000000", image: "/images/placeholder.svg" }],
  sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
  rating: 4.5,
  reviewCount: 0,
  reviews: [],
}

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM produit ORDER BY id_produit")
    
    const products: Product[] = (rows as any[]).map((row) => {
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
      if (row.image) {
        productImages.push(row.image)
      }
      if (row.image2) {
        productImages.push(row.image2)
      }
      if (row.image3) {
        productImages.push(row.image3)
      }
      
      // Fallback to JSON description images if database columns are empty
      if (productImages.length === 0 && additionalData.images && additionalData.images.length > 0) {
        productImages = additionalData.images
      }
      
      // Ensure we always have exactly 3 images (pad with placeholder if needed)
      // Only pad if columns are actually empty - don't replace existing values
      while (productImages.length < 3) {
        productImages.push("/placeholder.svg")
      }
      
      // Take only first 3 images (image, image2, image3)
      productImages = productImages.slice(0, 3)

      return {
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
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

