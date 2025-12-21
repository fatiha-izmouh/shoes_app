import pool from "@/lib/db"
import Link from "next/link"
import { ArrowLeft, Package, User, CreditCard, ChevronDown } from "lucide-react"
import { updateOrderStatus } from "../actions"

async function getOrder(id: string) {
    const [rows] = await pool.query('SELECT * FROM commande WHERE id_commande = ?', [id]) as any
    return rows[0]
}

async function getOrderItems(id: string) {
    const query = `
    SELECT lc.*, p.nom as product_name, p.image as product_image,
           cm.foot_length, cm.foot_width, cm.arch_height, cm.heel_to_ball, 
           cm.instep_circumference, cm.calculated_size, cm.is_custom
    FROM ligne_commande lc
    JOIN produit p ON lc.id_produit = p.id_produit
    LEFT JOIN custom_measurements cm ON lc.id_measurement = cm.id_measurement
    WHERE lc.id_commande = ?
  `
    const [rows] = await pool.query(query, [id]) as any
    return rows
}

async function getPayment(id: string) {
    const [rows] = await pool.query('SELECT * FROM paiement WHERE id_commande = ?', [id]) as any
    return rows[0]
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const order = await getOrder(id)
    const items = await getOrderItems(id)
    const payment = await getPayment(id)

    if (!order) {
        return <div>Order not found</div>
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/orders"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Order #{order.id_commande}</h1>
                    <p className="text-gray-400 text-sm">{new Date(order.date_commande).toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Items */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 bg-gray-950 flex items-center gap-2">
                            <Package size={18} className="text-amber-500" />
                            <h2 className="font-semibold text-white">Order Items</h2>
                        </div>
                        <div className="divide-y divide-gray-800">
                            {items.map((item: any) => (
                                <div key={item.id_ligne} className="p-6">
                                    <div className="flex items-start gap-4">
                                        {item.product_image && (
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="text-white font-medium">{item.product_name}</h3>
                                            <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-400">
                                                <span>Quantity: <span className="text-white">{item.quantite}</span></span>
                                                <span>Size: <span className="text-white">{item.taille || 'N/A'}</span></span>
                                                {item.couleur && <span>Color: <span className="text-white">{item.couleur}</span></span>}
                                                <span>Price: <span className="text-white">${Number(item.prix_unitaire).toFixed(2)}</span></span>
                                            </div>

                                            {item.is_custom && (
                                                <div className="mt-3 text-xs bg-gray-950 border border-gray-800 rounded p-3">
                                                    <p className="font-semibold text-amber-500 mb-1">Custom Measurements</p>
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-400">
                                                        <span>Foot Length: {item.foot_length}mm</span>
                                                        <span>Foot Width: {item.foot_width}mm</span>
                                                        <span>Arch Height: {item.arch_height}mm</span>
                                                        <span>Heel to Ball: {item.heel_to_ball}mm</span>
                                                        <span>Instep: {item.instep_circumference}mm</span>
                                                        <span>Calc. Size: {item.calculated_size}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Status Update */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h2 className="font-semibold text-white mb-4">Update Status</h2>
                        <form action={async (formData) => {
                            'use server'
                            await updateOrderStatus(formData)
                        }} className="flex gap-2">
                            <input type="hidden" name="order_id" value={order.id_commande} />
                            <div className="relative flex-1">
                                <select
                                    name="status"
                                    defaultValue={order.statut || 'pending'}
                                    className="w-full appearance-none bg-gray-800 text-white px-4 py-2 pr-8 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
                            </div>
                            <button
                                type="submit"
                                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Save
                            </button>
                        </form>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 bg-gray-950 flex items-center gap-2">
                            <User size={18} className="text-blue-500" />
                            <h2 className="font-semibold text-white">Customer</h2>
                        </div>
                        <div className="p-6 space-y-3 text-sm">
                            <div>
                                <p className="text-gray-500">Name</p>
                                <p className="text-white">{order.nom_client}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Email</p>
                                <p className="text-white hover:text-amber-500 transition-colors">
                                    <a href={`mailto:${order.email}`}>{order.email}</a>
                                </p>
                            </div>
                            {order.telephone && (
                                <div>
                                    <p className="text-gray-500">Phone</p>
                                    <p className="text-white">{order.telephone}</p>
                                </div>
                            )}
                            {order.adresse && (
                                <div>
                                    <p className="text-gray-500">Shipping Address</p>
                                    <p className="text-white whitespace-pre-wrap">{order.adresse}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Info */}
                    {payment && (
                        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-800 bg-gray-950 flex items-center gap-2">
                                <CreditCard size={18} className="text-green-500" />
                                <h2 className="font-semibold text-white">Payment</h2>
                            </div>
                            <div className="p-6 space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-500">Amount</p>
                                    <p className="text-xl font-bold text-white">${Number(payment.montant).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-gray-500">Method</p>
                                        <p className="text-white uppercase">{payment.methode}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500">Status</p>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium uppercase
                       ${payment.statut === 'completed' ? 'bg-green-900/40 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                                            {payment.statut}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
