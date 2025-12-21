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

import { uploadImage } from "@/lib/upload"

export async function createProduct(prevState: any, formData: FormData) {
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')

    const imageFile = formData.get('image') as File
    const image2File = formData.get('image2') as File
    const image3File = formData.get('image3') as File

    const image = await uploadImage(imageFile)
    const image2 = await uploadImage(image2File)
    const image3 = await uploadImage(image3File)

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

    // Get existing product to keep images if not updated
    // Ideally we pass existing images as hidden fields or fetch them here.
    // Fetching is safer.
    const [existing] = await pool.query('SELECT image, image2, image3 FROM produit WHERE id_produit = ?', [id]) as any
    const current = existing[0]

    const imageFile = formData.get('image') as File
    const image2File = formData.get('image2') as File
    const image3File = formData.get('image3') as File

    const image = (imageFile && imageFile.size > 0) ? await uploadImage(imageFile) : current.image
    const image2 = (image2File && image2File.size > 0) ? await uploadImage(image2File) : current.image2
    const image3 = (image3File && image3File.size > 0) ? await uploadImage(image3File) : current.image3

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
        await pool.query(
            'UPDATE stock SET quantite = ? WHERE id_produit = ? AND taille = ?',
            [quantity, productId, size]
        )
        revalidatePath(`/dashboard/products/${productId}`)
        return { success: true }
    } catch (error) {
        console.error('Error updating stock:', error)
        return { error: 'Failed to update stock' }
    }
}

export async function addStock(prevState: any, formData: FormData) {
    const productId = formData.get('product_id')
    const size = formData.get('size')
    const quantity = formData.get('quantity')

    try {
        // Check if exists
        const [rows] = await pool.query(
            'SELECT * FROM stock WHERE id_produit = ? AND taille = ?',
            [productId, size]
        ) as any

        if (rows.length > 0) {
            return { error: 'Size already exists for this product' }
        }

        await pool.query(
            'INSERT INTO stock (id_produit, taille, quantite) VALUES (?, ?, ?)',
            [productId, size, quantity]
        )
        revalidatePath(`/dashboard/products/${productId}`)
        return { success: true }
    } catch (error) {
        console.error('Error adding stock:', error)
        return { error: 'Failed to add stock' }
    }
}

export async function deleteStock(formData: FormData) {
    const productId = formData.get('product_id')
    const size = formData.get('size')

    try {
        await pool.query(
            'DELETE FROM stock WHERE id_produit = ? AND taille = ?',
            [productId, size]
        )
        revalidatePath(`/dashboard/products/${productId}`)
        return { success: true }
    } catch (error) {
        console.error('Error deleting stock:', error)
        return { error: 'Failed to delete stock' }
    }
}
