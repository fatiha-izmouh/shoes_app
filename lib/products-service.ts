import type { Product } from "./types"

// Helper to get base URL for API calls
function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side: use relative URL
    return ""
  }
  // Server-side: use absolute URL or default to localhost
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
}

// Service to fetch products from API
export async function getProducts(): Promise<Product[]> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/products`, {
      cache: "no-store", // Always fetch fresh data
    })
    
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return empty array on error
    return []
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
      cache: "no-store",
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("Failed to fetch product")
    }
    
    return await response.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

