import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Geist_Mono } from "next/font/google"


import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VALKYLEATHER - Premium Designer Footwear",
  description:
    "Discover exceptional footwear where Italian craftsmanship meets timeless elegance. Handcrafted luxury shoes.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  console.log("[v0] RootLayout rendering")

  return (
    <html lang="en">
      <body className={`font-sans antialiased ${cormorant.variable}`}>
        {children}
        <Toaster />

      </body>
    </html>
  )
}
