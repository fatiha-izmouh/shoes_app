import pool from "@/lib/db"
import Link from "next/link"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { deleteProduct } from "./actions"

async function getProducts() {
    const [rows] = await pool.query('SELECT * FROM produit ORDER BY id_produit DESC') as any
    return rows
}

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Products</h1>
                <Link
                    href="/dashboard/products/new"
                    className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    <Plus size={20} />
                    Add Product
                </Link>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-950 text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {products.map((product: any) => {
                                let category = 'N/A';
                                try {
                                    const desc = JSON.parse(product.description || '{}');
                                    category = desc.category || 'N/A';
                                } catch (e) { }

                                return (
                                    <tr key={product.id_produit} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            {product.image && (
                                                <img
                                                    src={product.image}
                                                    alt={product.nom}
                                                    className="h-12 w-12 object-cover rounded-md border border-gray-700 bg-gray-800"
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">{product.nom}</td>
                                        <td className="px-6 py-4">${Number(product.prix).toFixed(2)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/products/${product.id_produit}`}
                                                    className="p-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                                                >
                                                    <Pencil size={18} />
                                                </Link>
                                                <form action={deleteProduct}>
                                                    <input type="hidden" name="id" value={product.id_produit} />
                                                    <button
                                                        type="submit"
                                                        className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No products found. Start by adding one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
