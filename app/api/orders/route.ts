import { NextResponse } from "next/server"
import pool from "@/lib/db"

interface OrderRequest {
  nom_client: string
  email: string
  telephone?: string
  adresse?: string
  items: Array<{
    id_produit: number
    quantite: number
    prix_unitaire: number
    taille?: number | string
    couleur?: string
  }>
  payment: {
    montant: number
    methode: string
    statut: string
  }
}

export async function POST(request: Request) {
  try {
    const body: OrderRequest = await request.json()

    // Validate required fields
    if (!body.nom_client || !body.email || !body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const connection = await pool.getConnection()

    try {
      await connection.beginTransaction()

      // Insert order
      const [orderResult] = await connection.query(
        `INSERT INTO commande (nom_client, email, telephone, adresse, statut)
         VALUES (?, ?, ?, ?, ?)`,
        [body.nom_client, body.email, body.telephone || null, body.adresse || null, "pending"]
      ) as any

      const orderId = orderResult.insertId

      // Insert order lines and update stock
      for (const item of body.items) {
        // Insert order line with size and color
        await connection.query(
          `INSERT INTO ligne_commande (id_commande, id_produit, quantite, prix_unitaire, taille, couleur)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            orderId,
            item.id_produit,
            item.quantite,
            item.prix_unitaire,
            item.taille ? item.taille.toString() : null,
            item.couleur || null,
          ]
        )

        // Update stock if size is provided
        if (item.taille !== undefined) {
          await connection.query(
            `UPDATE stock 
             SET quantite = quantite - ?
             WHERE id_produit = ? AND taille = ? AND quantite >= ?`,
            [item.quantite, item.id_produit, parseFloat(item.taille.toString()), item.quantite]
          )
        }
      }

      // Insert payment
      await connection.query(
        `INSERT INTO paiement (id_commande, montant, methode, statut, date_paiement)
         VALUES (?, ?, ?, ?, CURDATE())`,
        [orderId, body.payment.montant, body.payment.methode, body.payment.statut]
      )

      await connection.commit()

      return NextResponse.json({ 
        success: true, 
        orderId,
        message: "Order created successfully" 
      })
    } catch (error) {
      await connection.rollback()
      throw error
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

