"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-light mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some exceptional footwear to get started</p>
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-12">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative w-32 h-32 flex-shrink-0 bg-muted overflow-hidden">
                      <Image
                        src={item.product.images?.[0] || item.selectedColor.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="font-serif text-lg">${item.product.price}</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Color: {item.selectedColor.name} | Size: {item.selectedSize}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor.name,
                                item.selectedSize,
                                item.quantity - 1,
                              )
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor.name,
                                item.selectedSize,
                                item.quantity + 1,
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.product.id, item.selectedColor.name, item.selectedSize)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-serif font-light mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-border flex justify-between">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-serif text-2xl">${(getCartTotal() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" size="lg" className="w-full mt-4 bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
