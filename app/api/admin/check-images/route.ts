import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET() {
    try {
        const [rows] = await pool.query(`
      SELECT 
        id_produit,
        nom,
        prix,
        image,
        image2,
        image3,
        CASE 
          WHEN image IS NULL OR image = '' THEN 'Missing'
          ELSE 'OK'
        END as image_status,
        CASE 
          WHEN image2 IS NULL OR image2 = '' THEN 'Missing'
          ELSE 'OK'
        END as image2_status,
        CASE 
          WHEN image3 IS NULL OR image3 = '' THEN 'Missing'
          ELSE 'OK'
        END as image3_status
      FROM produit
      ORDER BY id_produit DESC
    `)

        return NextResponse.json({ products: rows })
    } catch (error) {
        console.error("Error fetching product images:", error)
        return NextResponse.json({ error: "Failed to fetch product images" }, { status: 500 })
    }
}
