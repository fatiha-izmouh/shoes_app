import pool from "@/lib/db"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProductEditForm from "./product-edit-form"
import StockManager from "./stock-manager"

async function getProduct(id: string) {
    const [rows] = await pool.query('SELECT * FROM produit WHERE id_produit = ?', [id]) as any
    return rows[0]
}

async function getStock(id: string) {
    const [rows] = await pool.query('SELECT * FROM stock WHERE id_produit = ? ORDER BY taille', [id]) as any
    return rows
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProduct(id)
    const stock = await getStock(id)

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/products"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Product</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Product Details</h2>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <ProductEditForm product={product} />
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Stock Management</h2>
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <StockManager productId={product.id_produit} initialStock={stock} />
                    </div>
                </div>
            </div>
        </div>
    )
}
