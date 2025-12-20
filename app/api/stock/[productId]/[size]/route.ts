import { NextResponse } from "next/server"
import pool from "@/lib/db"

// Get stock for a specific product and size
export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string; size: string }> }
) {
  try {
    const { productId, size } = await params
    const productIdNum = parseInt(productId)
    const sizeNum = parseFloat(size)

    if (isNaN(productIdNum) || isNaN(sizeNum)) {
      return NextResponse.json({ error: "Invalid product ID or size" }, { status: 400 })
    }

    const [rows] = await pool.query(
      "SELECT quantite FROM stock WHERE id_produit = ? AND taille = ?",
      [productIdNum, sizeNum]
    )

    const stock = Array.isArray(rows) && rows.length > 0 ? (rows[0] as any).quantite : 0

    return NextResponse.json({ 
      productId: productIdNum,
      size: sizeNum,
      stock,
      available: stock > 0
    })
  } catch (error) {
    console.error("Error fetching stock:", error)
    return NextResponse.json({ error: "Failed to fetch stock" }, { status: 500 })
  }
}

