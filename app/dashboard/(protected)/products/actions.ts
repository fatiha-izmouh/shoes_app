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
    const shipping = formData.get('shipping') || 0


    const imageFile = formData.get('image') as File
    const image2File = formData.get('image2') as File
    const image3File = formData.get('image3') as File
    const image4File = formData.get('image4') as File
    const image5File = formData.get('image5') as File
    const image6File = formData.get('image6') as File
    const image7File = formData.get('image7') as File

    // Validate that main image is provided
    if (!imageFile || imageFile.size === 0) {
        return { error: 'Main product image is required. Please upload at least one image.' }
    }

    try {
        const [image, image2, image3, image4, image5, image6, image7] = await Promise.all([
            uploadImage(imageFile),
            uploadImage(image2File),
            uploadImage(image3File),
            uploadImage(image4File),
            uploadImage(image5File),
            uploadImage(image6File),
            uploadImage(image7File)
        ])

        // Double-check that main image was uploaded successfully
        if (!image) {
            return { error: 'Failed to upload main image. Please try again.' }
        }

        await pool.query(
            'INSERT INTO produit (nom, description, prix, frais_livraison, image, image2, image3, image4, image5, image6, image7) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, description, price, shipping, image, image2, image3, image4, image5, image6, image7]
        )

        revalidatePath('/dashboard/products')
        return { success: true }
    } catch (error: any) {
        console.error('Error creating product:', error)
        return { error: `Failed to create product: ${error.message || 'Unknown error'}` }
    }
}

export async function updateProduct(id: number, prevState: any, formData: FormData) {
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')
    const shipping = formData.get('shipping') || 0




    try {
        // Get existing product to keep images if not updated
        // Ideally we pass existing images as hidden fields or fetch them here.
        // Fetching is safer.
        const [existing] = await pool.query('SELECT image, image2, image3, image4, image5, image6, image7, frais_livraison FROM produit WHERE id_produit = ?', [id]) as any
        if (!existing || existing.length === 0) {

            return { error: 'Product not found' }
        }
        const current = existing[0]

        const imageFile = formData.get('image') as File
        const image2File = formData.get('image2') as File
        const image3File = formData.get('image3') as File
        const image4File = formData.get('image4') as File
        const image5File = formData.get('image5') as File
        const image6File = formData.get('image6') as File
        const image7File = formData.get('image7') as File

        const [image, image2, image3, image4, image5, image6, image7] = await Promise.all([
            (imageFile && imageFile.size > 0) ? uploadImage(imageFile) : current.image,
            (image2File && image2File.size > 0) ? uploadImage(image2File) : current.image2,
            (image3File && image3File.size > 0) ? uploadImage(image3File) : current.image3,
            (image4File && image4File.size > 0) ? uploadImage(image4File) : current.image4,
            (image5File && image5File.size > 0) ? uploadImage(image5File) : current.image5,
            (image6File && image6File.size > 0) ? uploadImage(image6File) : current.image6,
            (image7File && image7File.size > 0) ? uploadImage(image7File) : current.image7
        ])

        await pool.query(
            'UPDATE produit SET nom = ?, description = ?, prix = ?, frais_livraison = ?, image = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ?, image6 = ?, image7 = ? WHERE id_produit = ?',
            [name, description, price, shipping, image, image2, image3, image4, image5, image6, image7, id]
        )

        revalidatePath('/dashboard/products')
        revalidatePath(`/dashboard/products/${id}`)
        return { success: true }
    } catch (error: any) {
        console.error('Error updating product:', error)
        return { error: `Failed to update product: ${error.message || 'Unknown error'}` }
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
