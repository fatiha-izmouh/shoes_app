'use server'

import pool from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteProduct(formData: FormData) {
    const id = formData.get('id')

    if (!id) return

    try {
        await pool.query('DELETE FROM produit WHERE id_produit = ?', [id])
        revalidatePath('/dashboard/products')
    } catch (error) {
        console.error('Error deleting product:', error)
        throw new Error('Failed to delete product')
    }
}

export async function createProduct(prevState: any, formData: FormData) {
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')
    const image = formData.get('image')
    const image2 = formData.get('image2')
    const image3 = formData.get('image3')

    try {
        await pool.query(
            'INSERT INTO produit (nom, description, prix, image, image2, image3) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, image, image2, image3]
        )
        revalidatePath('/dashboard/products')
        return { success: true }
    } catch (error) {
        console.error('Error creating product:', error)
        return { error: 'Failed to create product' }
    }
}

export async function updateProduct(id: number, prevState: any, formData: FormData) {
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')
    const image = formData.get('image')
    const image2 = formData.get('image2')
    const image3 = formData.get('image3')

    try {
        await pool.query(
            'UPDATE produit SET nom = ?, description = ?, prix = ?, image = ?, image2 = ?, image3 = ? WHERE id_produit = ?',
            [name, description, price, image, image2, image3, id]
        )
        revalidatePath('/dashboard/products')
        revalidatePath(`/dashboard/products/${id}`)
        return { success: true }
    } catch (error) {
        console.error('Error updating product:', error)
        return { error: 'Failed to update product' }
    }
}

export async function updateStock(formData: FormData) {
    const productId = formData.get('product_id')
    const size = formData.get('size')
    const quantity = formData.get('quantity')

    try {
        // Check if stock exists
        const [rows] = await pool.query(
            'SELECT * FROM stock WHERE id_produit = ? AND taille = ?',
            [productId, size]
        ) as any

        if (rows.length > 0) {
            // Update
            await pool.query(
                'UPDATE stock SET quantite = ? WHERE id_produit = ? AND taille = ?',
                [quantity, productId, size]
            )
        } else {
            // Insert
            await pool.query(
                'INSERT INTO stock (id_produit, taille, quantite) VALUES (?, ?, ?)',
                [productId, size, quantity]
            )
        }

        revalidatePath(`/dashboard/products/${productId}`)
        return { success: true }
    } catch (error) {
        console.error('Error updating stock:', error)
        return { error: 'Failed to update stock' }
    }
}
