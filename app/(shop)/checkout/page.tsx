"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

declare global {
  interface Window {
    paypal?: any
  }
}

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaypalReady, setIsPaypalReady] = useState(false)
  const paypalRef = useRef<HTMLDivElement | null>(null)

  // Redirect to cart page if cart is empty (must be done in an effect, not during render)
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart")
    }
  }, [cart.length, router])

  if (cart.length === 0) {
    // While redirecting, render nothing (or you could show a small loading indicator)
    return null
  }

  // Initialize PayPal buttons when SDK is loaded
  useEffect(() => {
    if (!isPaypalReady || !window.paypal || !paypalRef.current) return

    const paypalButtons = window.paypal
      .Buttons({
        onClick: (_data: any, actions: any) => {
          const form = document.getElementById("checkout-form") as HTMLFormElement | null

          if (!form) {
            return actions.reject()
          }

          // Use native browser validation for each required input
          if (!form.checkValidity()) {
            form.reportValidity()
            return actions.reject()
          }

          return actions.resolve()
        },
        createOrder: (_data: any, actions: any) => {
          const totalWithTax = (getCartTotal() * 1.1).toFixed(2)
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalWithTax,
                  currency_code: "EUR", // Change to your preferred currency
                },
              },
            ],
          })
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            setIsProcessing(true)
            // Capture the payment with PayPal
            await actions.order.capture()

            // Read shipping information from the form
            const form = document.getElementById("checkout-form") as HTMLFormElement | null
            const formData = form ? new FormData(form) : null

            const firstName = (formData?.get("firstName") as string) || ""
            const lastName = (formData?.get("lastName") as string) || ""
            const email = (formData?.get("email") as string) || ""
            const address = (formData?.get("address") as string) || ""
            const city = (formData?.get("city") as string) || ""
            const zip = (formData?.get("zip") as string) || ""
            const fullAddress = `${address}, ${city}, ${zip}`

            if (!firstName || !lastName || !email || !address || !city || !zip) {
              throw new Error("Please fill in all shipping fields before paying.")
            }

            // Calculate total with tax (same calculation as in createOrder)
            const totalWithTax: number = getCartTotal() * 1.1

            // Prepare order data to save in your database
            const orderData = {
              nom_client: `${firstName} ${lastName}`,
              email,
              adresse: fullAddress,
              items: cart.map((item) => ({
                id_produit: parseInt(item.product.id),
                quantite: item.quantity,
                prix_unitaire: item.product.price,
                taille: item.selectedSize,
                couleur: item.selectedColor.name,
                customMeasurements: item.customMeasurements,
                isCustomSize: item.isCustomSize
              })),
              payment: {
                montant: parseFloat(totalWithTax.toFixed(2)),
                methode: "paypal",
                statut: "completed",
              },
            }

            const response = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            })

            if (!response.ok) {
              throw new Error("Failed to create order")
            }

            clearCart()
            setIsProcessing(false)

            toast({
              title: "Order placed successfully!",
              description: "Thank you for your purchase. You will receive a confirmation email shortly.",
            })

            router.push("/")
          } catch (error) {
            console.error("Error during PayPal payment:", error)
            setIsProcessing(false)
            toast({
              title: "Payment error",
              description: "There was a problem processing your PayPal payment. Please try again.",
              variant: "destructive",
            })
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err)
          toast({
            title: "Payment error",
            description: "There was a problem initializing PayPal. Please try again.",
            variant: "destructive",
          })
        },
      })

    paypalButtons.render(paypalRef.current)

    return () => {
      if (paypalButtons && paypalButtons.close) {
        paypalButtons.close()
      }
    }
  }, [isPaypalReady, cart, getCartTotal, clearCart, toast, router])

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-12">Checkout</h1>

        {/* PayPal SDK script */}
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR`}
          strategy="afterInteractive"
          onLoad={() => setIsPaypalReady(true)}
        />

        {/* Shipping form (used by PayPal on approval) */}
        <form id="checkout-form">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" name="zip" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    You will be redirected to PayPal to securely complete your payment.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border space-y-2">
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
                    <div className="pt-2 border-t border-border flex justify-between">
                      <span className="font-medium text-lg">Total</span>
                      <span className="font-serif text-2xl">${(getCartTotal() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* PayPal Button container */}
                  <div className="mt-4">
                    <div ref={paypalRef} />
                    {isProcessing && (
                      <Button disabled className="w-full mt-4">
                        Processing...
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
