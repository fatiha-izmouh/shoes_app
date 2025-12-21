import { CartProvider } from "@/contexts/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
        </CartProvider>
    )
}
