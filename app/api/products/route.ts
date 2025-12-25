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
    const [stockRows] = await pool.query("SELECT * FROM stock") as any

    // Group stock by product_id
    const stockMap: Record<number, any[]> = {}
    stockRows.forEach((s: any) => {
      if (!stockMap[s.id_produit]) stockMap[s.id_produit] = []
      stockMap[s.id_produit].push(s)
    })

    const products: Product[] = (rows as any[]).map((row) => {
      let additionalData = defaultProductData
      try {
        const parsed = JSON.parse(row.description || "{}")
        if (parsed.images || parsed.colors) {
          additionalData = { ...defaultProductData, ...parsed }
        }
      } catch { }

      let productImages: string[] = []
      const imageColumns = ['image', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7']
      imageColumns.forEach(col => {
        if (row[col]) productImages.push(row[col])
      })

      if (productImages.length === 0 && additionalData.images && additionalData.images.length > 0) {
        productImages = additionalData.images
      }

      productImages = productImages.slice(0, 7)

      // Get stock for this product
      const productStock = stockMap[row.id_produit] || []
      const availableSizes = productStock.map(s => Number(s.taille)).sort((a, b) => a - b)
      const stockRecord: Record<string, number> = {}
      productStock.forEach(s => {
        stockRecord[s.taille.toString()] = s.quantite
      })

      return {
        id: row.id_produit.toString(),
        name: row.nom,
        description: typeof row.description === "string" && !row.description.startsWith("{")
          ? row.description
          : "Handcrafted leather footwear with exceptional quality.",
        price: parseFloat(row.prix.toString()),
        shippingCost: row.frais_livraison ? parseFloat(row.frais_livraison.toString()) : 0,
        category: additionalData.category,

        images: productImages,
        colors: additionalData.colors,
        sizes: availableSizes.length > 0 ? availableSizes : additionalData.sizes,
        rating: additionalData.rating,
        reviewCount: additionalData.reviewCount,
        reviews: additionalData.reviews,
        stock: stockRecord
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

