import { NextResponse } from "next/server"
import pool from "@/lib/db"

// Get all stock entries for a product (all sizes)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const productIdNum = parseInt(productId)

    if (isNaN(productIdNum)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const [rows] = await pool.query(
      "SELECT taille, quantite FROM stock WHERE id_produit = ? ORDER BY taille",
      [productIdNum]
    )

    // Convert to object for easier lookup: { "8": 5, "8.5": 3, ... }
    // Normalize keys so "38.0" becomes "38" and matches UI lookups.
    const stockBySize: Record<string, number> = {}
    ;(rows as any[]).forEach((row) => {
      const sizeNumber = parseFloat(row.taille as unknown as string)
      const sizeKey = Number.isNaN(sizeNumber) ? String(row.taille) : sizeNumber.toString()
      stockBySize[sizeKey] = row.quantite
    })

    return NextResponse.json({ 
      productId: productIdNum,
      stock: stockBySize
    })
  } catch (error) {
    console.error("Error fetching stock:", error)
    return NextResponse.json({ error: "Failed to fetch stock" }, { status: 500 })
  }
}

