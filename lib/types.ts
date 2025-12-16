export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  images: string[]
  colors: Color[]
  sizes: number[]
  rating: number
  reviewCount: number
  reviews?: Review[]
  stock?: Record<string, number> // Stock by size: { "8": 5, "8.5": 3, ... }
}

export interface Color {
  name: string
  hex: string
  image: string
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  comment: string
}

export interface CartItem {
  product: Product
  selectedColor: Color
  selectedSize: number
  quantity: number
}
