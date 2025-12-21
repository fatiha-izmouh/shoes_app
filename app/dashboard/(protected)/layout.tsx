import Link from 'next/link'
import { logout } from '../actions'
import { LayoutDashboard, ShoppingBag, ShoppingCart, LogOut } from 'lucide-react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-950">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
                <div className="p-6">
                    <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
                        VALKY<span className="text-amber-600">LEATHER</span>
                    </Link>
                    <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <LayoutDashboard size={20} />
                        Overview
                    </Link>
                    <Link
                        href="/dashboard/products"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <ShoppingBag size={20} />
                        Products & Stock
                    </Link>
                    <Link
                        href="/dashboard/orders"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <ShoppingCart size={20} />
                        Orders
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <form action={logout}>
                        <button
                            type="submit"
                            className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
