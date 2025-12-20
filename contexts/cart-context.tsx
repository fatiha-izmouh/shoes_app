"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem, Product, Color, CustomMeasurements } from "@/lib/types"

interface CartContextType {
  cart: CartItem[]
  addToCart: (
    product: Product,
    color: Color,
    size: number,
    quantity: number,
    customMeasurements?: CustomMeasurements,
    isCustomSize?: boolean
  ) => void
  removeFromCart: (productId: string, colorName: string, size: number) => void
  updateQuantity: (productId: string, colorName: string, size: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log("[v0] CartProvider mounted")
    setMounted(true)
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
        console.log("[v0] Cart loaded from localStorage")
      } catch (error) {
        console.error("[v0] Error loading cart:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(cart))
      console.log("[v0] Cart saved to localStorage, items:", cart.length)
    }
  }, [cart, mounted])

  const addToCart = (
    product: Product,
    color: Color,
    size: number,
    quantity: number,
    customMeasurements?: CustomMeasurements,
    isCustomSize?: boolean
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name &&
          item.selectedSize === size &&
          item.isCustomSize === isCustomSize
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id &&
            item.selectedColor.name === color.name &&
            item.selectedSize === size &&
            item.isCustomSize === isCustomSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prevCart, {
        product,
        selectedColor: color,
        selectedSize: size,
        quantity,
        customMeasurements,
        isCustomSize
      }]
    })
  }

  const removeFromCart = (productId: string, colorName: string, size: number) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor.name === colorName && item.selectedSize === size),
      ),
    )
  }

  const updateQuantity = (productId: string, colorName: string, size: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName, size)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedColor.name === colorName && item.selectedSize === size
          ? { ...item, quantity }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
