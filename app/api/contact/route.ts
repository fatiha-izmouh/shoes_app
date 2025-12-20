import { NextResponse } from "next/server"
import pool from "@/lib/db"

interface ContactRequest {
  nom: string
  email: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json()

    // Validate required fields
    if (!body.nom || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const [result] = await pool.query(
      `INSERT INTO contact_message (nom, email, message)
       VALUES (?, ?, ?)`,
      [body.nom, body.email, body.message]
    ) as any

    return NextResponse.json({ 
      success: true, 
      messageId: result.insertId,
      message: "Contact message saved successfully" 
    })
  } catch (error) {
    console.error("Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to save contact message" }, { status: 500 })
  }
}

