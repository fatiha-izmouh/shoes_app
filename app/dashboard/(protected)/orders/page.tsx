import Search from "@/components/dashboard/search"
import pool from "@/lib/db"
import Link from "next/link"
import { Eye } from "lucide-react"

async function getOrders(query?: string) {
    let sql = 'SELECT * FROM commande'
    const params = []

    if (query) {
        sql += ' WHERE nom_client LIKE ? OR email LIKE ? OR id_commande LIKE ?'
        params.push(`%${query}%`, `%${query}%`, `%${query}%`)
    }

    sql += ' ORDER BY date_commande DESC'

    const [rows] = await pool.query(sql, params) as any
    return rows
}

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>
}) {
    const { search } = await searchParams
    const orders = await getOrders(search)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-white whitespace-nowrap">Orders</h1>
                <Search placeholder="Search orders by name, email or ID..." />
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-gray-950 text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {orders.map((order: any) => (
                                <tr key={order.id_commande} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">#{order.id_commande}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-white">{order.nom_client}</div>
                                        <div className="text-xs text-gray-500">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(order.date_commande).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${order.statut === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                                                order.statut === 'shipped' ? 'bg-blue-900/30 text-blue-400' :
                                                    order.statut === 'delivered' ? 'bg-green-900/30 text-green-400' :
                                                        'bg-gray-800 text-gray-400'}`}>
                                            {order.statut || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/dashboard/orders/${order.id_commande}`}
                                            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <Eye size={16} />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No orders found.
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
