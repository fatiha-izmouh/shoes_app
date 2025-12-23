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
    customMeasurements?: {
      footLength: number              // A
      footWidth: number               // B
      ballCircumference: number       // C
      instepCircumference: number     // D
      ankleCircumference: number      // E
      lowerCalfCircumference: number  // F
      upperCalfCircumference: number  // G
      calculatedSize: number
    }
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
        const lineId = (await connection.query('SELECT LAST_INSERT_ID() as id') as any)[0][0].id

        // Insert custom measurements if present
        if (item.customMeasurements) {
          const [measureResult] = await connection.query(
            `INSERT INTO custom_measurements 
             (id_produit, foot_length, foot_width, ball_circumference, instep_circumference, 
              ankle_circumference, lower_calf_circumference, upper_calf_circumference, calculated_size, is_custom)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              item.id_produit,
              item.customMeasurements.footLength,
              item.customMeasurements.footWidth,
              item.customMeasurements.ballCircumference || 0,
              item.customMeasurements.instepCircumference || 0,
              item.customMeasurements.ankleCircumference || 0,
              item.customMeasurements.lowerCalfCircumference || 0,
              item.customMeasurements.upperCalfCircumference || 0,
              item.customMeasurements.calculatedSize,
              true
            ]
          ) as any

          const measureId = measureResult.insertId

          // Link measurement to order line
          await connection.query(
            `UPDATE ligne_commande SET id_measurement = ? WHERE id_ligne = ?`,
            [measureId, lineId]
          )
        }

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

