'use server'

import pool from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateOrderStatus(formData: FormData) {
    const orderId = formData.get('order_id')
    const status = formData.get('status')

    try {
        await pool.query(
            'UPDATE commande SET statut = ? WHERE id_commande = ?',
            [status, orderId]
        )
        revalidatePath(`/dashboard/orders/${orderId}`)
        revalidatePath('/dashboard/orders')
        return { success: true }
    } catch (error) {
        console.error('Error updating order status:', error)
        return { error: 'Failed to update order status' }
    }
}
