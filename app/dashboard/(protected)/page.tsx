import pool from "@/lib/db"
import { Users, ShoppingBag, ShoppingCart, DollarSign } from 'lucide-react'

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

async function getStats() {
    try {
        const [productRows] = await pool.query('SELECT COUNT(*) as count FROM produit') as any
        const [orderRows] = await pool.query('SELECT COUNT(*) as count FROM commande') as any
        // Simple sum of all successful payments if possible, else just 0 for now
        // Assuming payment table exists as seen in db-types.ts, but let's be safe and just count products/orders for now

        return {
            products: productRows[0].count,
            orders: orderRows[0].count,
            revenue: 0 // Placeholder until we confirm payment data
        }
    } catch (error) {
        console.error("Error fetching stats:", error)
        return { products: 0, orders: 0, revenue: 0 }
    }
}

export default async function DashboardPage() {
    const stats = await getStats()

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-2">Welcome back, verified admin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Products</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stats.products}</h3>
                        </div>
                        <div className="p-3 bg-blue-900/20 rounded-lg">
                            <ShoppingBag className="text-blue-500" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Orders</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stats.orders}</h3>
                        </div>
                        <div className="p-3 bg-purple-900/20 rounded-lg">
                            <ShoppingCart className="text-purple-500" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{formatCurrency(stats.revenue)}</h3>
                        </div>
                        <div className="p-3 bg-green-900/20 rounded-lg">
                            <DollarSign className="text-green-500" size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
