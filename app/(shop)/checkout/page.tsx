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
  const { cart, getCartTotal, getShippingTotal, clearCart } = useCart()
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

  // Stabilize dependencies to prevent PayPal buttons from re-rendering
  const cartTotal = getCartTotal()
  const shippingTotal = getShippingTotal()
  const cartItems = JSON.stringify(cart) // Stable string representation for deep comparison if needed, or just use cart length

  // Initialize PayPal buttons when SDK is loaded
  useEffect(() => {
    if (!isPaypalReady || !window.paypal || !paypalRef.current) return

    // Create a local reference to clear on cleanup
    let paypalButtons: any = null

    try {
      paypalButtons = window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay',
        },
        onClick: (_data: any, actions: any) => {
          const form = document.getElementById("checkout-form") as HTMLFormElement | null

          if (!form) {
            return actions.reject()
          }

          if (!form.checkValidity()) {
            form.reportValidity()
            return actions.reject()
          }

          return actions.resolve()
        },
        createOrder: (_data: any, actions: any) => {
          const totalAmount = (cartTotal + shippingTotal).toFixed(2)
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalAmount,
                  currency_code: "EUR",
                },
              },
            ],
          })
        },
        onApprove: async (_data: any, actions: any) => {
          try {
            setIsProcessing(true)

            // 1. Validate form data again before capture
            const form = document.getElementById("checkout-form") as HTMLFormElement | null
            if (!form || !form.checkValidity()) {
              form?.reportValidity()
              throw new Error("Form validation failed")
            }

            const formData = new FormData(form)
            const firstName = (formData.get("firstName") as string) || ""
            const lastName = (formData.get("lastName") as string) || ""
            const email = (formData.get("email") as string) || ""
            const address = (formData.get("address") as string) || ""
            const city = (formData.get("city") as string) || ""
            const zip = (formData.get("zip") as string) || ""
            const fullAddress = `${address}, ${city}, ${zip}`

            // 2. Capture the payment with PayPal
            const captureDetails = await actions.order.capture()

            if (captureDetails.status !== 'COMPLETED') {
              throw new Error(`Payment status: ${captureDetails.status}`)
            }

            // 3. Prepare order data
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
                montant: parseFloat((cartTotal + shippingTotal).toFixed(2)),
                methode: "paypal",
                statut: "completed",
              },
            }

            // 4. Save to database
            const response = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            })

            if (!response.ok) {
              // Note: At this point payment is captured but order creation failed in our DB
              // This should be handled with a support message or retry logic
              throw new Error("Payment successful but failed to save order details. Please contact support.")
            }

            // 5. Success flow
            toast({
              title: "Order placed successfully!",
              description: "Thank you for your purchase. You will receive a confirmation email shortly.",
            })

            clearCart()
            router.push("/")
          } catch (error: any) {
            console.error("Error during PayPal payment:", error)
            toast({
              title: "Payment error",
              description: error.message || "There was a problem processing your payment. Please try again.",
              variant: "destructive",
            })
          } finally {
            setIsProcessing(false)
          }
        },
        onError: (err: any) => {
          console.error("PayPal error:", err)
          toast({
            title: "Payment error",
            description: "There was a problem with the payment window. Please try again.",
            variant: "destructive",
          })
        },
      })

      if (paypalButtons) {
        paypalButtons.render(paypalRef.current)
      }
    } catch (error) {
      console.error("Failed to initialize PayPal buttons:", error)
    }

    return () => {
      if (paypalButtons && paypalButtons.close) {
        paypalButtons.close()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaypalReady, cartTotal, shippingTotal, toast, router]) // Removed 'cart' to prevent re-renders on every cart change, using totals instead

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-light mb-12">Checkout</h1>

        {/* PayPal SDK script */}
        {process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? (
          <Script
            src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR`}
            strategy="afterInteractive"
            onLoad={() => {
              console.log("PayPal SDK Loaded")
              setIsPaypalReady(true)
            }}
            onError={(e) => {
              console.error("PayPal SDK failed to load", e)
              toast({
                title: "PayPal Error",
                description: "Failed to load PayPal secure checkout.",
                variant: "destructive"
              })
            }}
          />
        ) : (
          <div className="p-4 bg-amber-900/20 border border-amber-900/50 text-amber-500 rounded-lg mb-8">
            <p className="font-medium">Payment Error: PayPal Client ID not configured.</p>
            <p className="text-sm">Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in your environment.</p>
          </div>
        )}

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
                      <span className="font-medium">${getShippingTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="pt-2 border-t border-border flex justify-between">
                      <span className="font-medium text-lg">Total</span>
                      <span className="font-serif text-2xl">${(getCartTotal() + getShippingTotal()).toFixed(2)}</span>
                    </div>

                  </div>

                  {/* PayPal Button container */}
                  <div className="mt-4">
                    {!isPaypalReady && process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && (
                      <div className="h-10 w-full bg-gray-800 animate-pulse rounded-md flex items-center justify-center text-xs text-gray-500">
                        Initializing PayPal...
                      </div>
                    )}
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
