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

    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      // Insert order
      const orderResult = await client.query(
        `INSERT INTO commande (nom_client, email, telephone, adresse, statut)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id_commande`,
        [body.nom_client, body.email, body.telephone || null, body.adresse || null, "pending"]
      )

      const orderId = orderResult.rows[0].id_commande

      // Insert order lines and update stock
      for (const item of body.items) {
        // Insert order line with size and color
        await client.query(
          `INSERT INTO ligne_commande (id_commande, id_produit, quantite, prix_unitaire, taille, couleur)
           VALUES ($1, $2, $3, $4, $5, $6)`,
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
          await client.query(
            `UPDATE stock 
             SET quantite = quantite - $1
             WHERE id_produit = $2 AND taille = $3 AND quantite >= $1`,
            [item.quantite, item.id_produit, parseFloat(item.taille.toString())]
          )
        }
      }

      // Insert payment
      await client.query(
        `INSERT INTO paiement (id_commande, montant, methode, statut, date_paiement)
         VALUES ($1, $2, $3, $4, CURRENT_DATE)`,
        [orderId, body.payment.montant, body.payment.methode, body.payment.statut]
      )

      await client.query("COMMIT")

      return NextResponse.json({ 
        success: true, 
        orderId,
        message: "Order created successfully" 
      })
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

