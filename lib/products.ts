import type { Product } from "./types"

export const products: Product[] = [
  {
    id: "1",
    name: "Medieval Fantasy Leather Boot",
    description:
      "Handcrafted medieval-style leather boot with curved toe design and decorative leather ties. Each pair is uniquely crafted by artisan leatherworkers.",
    price: 180,
    category: "Leather Footwear",
    images: [
      "/images/capture-20d-27-c3-a9cran-202025-12-16-20140210.png",
      "/images/capture-20d-27-c3-a9cran-202025-12-16-20140125.png",
      "/images/capture-20d-27-c3-a9cran-202025-12-16-20140132.png",
    ],
    colors: [
      {
        name: "Dark Brown",
        hex: "#4a2511",
        image: "/images/image.png",
      },
      {
        name: "Rich Mahogany",
        hex: "#6f3625",
        image: "/images/capture-20d-27-c3-a9cran-202025-12-16-20140132.png",
      },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    rating: 4.9,
    reviewCount: 87,
    reviews: [
      {
        id: "r1",
        author: "Elena Rodriguez",
        rating: 5,
        date: "2024-12-10",
        comment: "Absolutely stunning craftsmanship! These boots are incredibly comfortable and unique.",
      },
      {
        id: "r2",
        author: "Marcus Thompson",
        rating: 5,
        date: "2024-12-05",
        comment: "The quality is exceptional. You can tell these are made with care and expertise.",
      },
    ],
  },
  {
    id: "2",
    name: "Wrapped Leather Knee Boot",
    description:
      "Elegant knee-high boot with distinctive leather wrapping and lace-up design. Made from premium full-grain leather.",
    price: 220,
    category: "Leather Footwear",
    images: [
      "/images/capture-20d-27-c3-a9cran-202025-12-16-20140235.png",
      "/images/capture-20d-27-c3-a9cran-202025-12-16-20140157.png",
    ],
    colors: [
      {
        name: "Rich Brown",
        hex: "#654321",
        image: "/images/capture-20d-27-c3-a9cran-202025-12-16-20140235.png",
      },
      {
        name: "Turquoise Accent",
        hex: "#5c4033",
        image: "/images/capture-20d-27-c3-a9cran-202025-12-16-20140157.png",
      },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
    rating: 4.8,
    reviewCount: 64,
    reviews: [
      {
        id: "r3",
        author: "Sarah Chen",
        rating: 5,
        date: "2024-12-08",
        comment: "Love the unique wrapping design. So comfortable for all-day wear!",
      },
    ],
  },
  {
    id: "3",
    name: "Traditional Leather Moccasin",
    description:
      "Handstitched leather moccasin with authentic traditional design. Soft, flexible, and incredibly comfortable.",
    price: 145,
    category: "Leather Footwear",
    images: ["/images/capture-20d-27-c3-a9cran-202025-12-16-20140222.png"],
    colors: [
      {
        name: "Natural Tan",
        hex: "#d2b48c",
        image: "/images/capture-20d-27-c3-a9cran-202025-12-16-20140222.png",
      },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    rating: 4.7,
    reviewCount: 52,
    reviews: [
      {
        id: "r4",
        author: "James Rivera",
        rating: 5,
        date: "2024-12-03",
        comment: "The craftsmanship on these is amazing. Super comfortable and authentic looking.",
      },
    ],
  },
  {
    id: "4",
    name: "Artisan Spiral Boot",
    description:
      "Unique handcrafted boot featuring decorative turquoise spiral design. A true statement piece combining art and function.",
    price: 195,
    category: "Leather Footwear",
    images: ["/images/capture-20d-27-c3-a9cran-202025-12-16-20140157.png"],
    colors: [
      {
        name: "Brown with Turquoise",
        hex: "#6b4423",
        image: "/images/capture-20d-27-c3-a9cran-202025-12-16-20140157.png",
      },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5],
    rating: 5.0,
    reviewCount: 43,
    reviews: [
      {
        id: "r5",
        author: "Isabella Martinez",
        rating: 5,
        date: "2024-12-01",
        comment: "These are works of art! The spiral design is gorgeous and the quality is top-notch.",
      },
    ],
  },
  {
    id: "5",
    name: "Classic Wrapped Boot",
    description:
      "Premium leather boot with elegant wrapping detail and secure lace closure. Versatile design suitable for any occasion.",
    price: 205,
    category: "Leather Footwear",
    images: ["/images/capture-20d-27-c3-a9cran-202025-12-16-20140235.png"],
    colors: [
      {
        name: "Chocolate Brown",
        hex: "#5c4033",
        image: "/images/capture-20d-27-c3-a9cran-202025-12-16-20140235.png",
      },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    rating: 4.9,
    reviewCount: 78,
    reviews: [
      {
        id: "r6",
        author: "David Kim",
        rating: 5,
        date: "2024-11-28",
        comment: "Excellent quality and very comfortable. The wrapping design is unique and stylish.",
      },
    ],
  },
  {
    id: "6",
    name: "Heritage Handstitched Boot",
    description: "Traditional handcrafted leather boot with visible artisan stitching. Each pair tells its own story.",
    price: 165,
    category: "Leather Footwear",
    images: ["/images/capture-20d-27-c3-a9cran-202025-12-16-20140132.png"],
    colors: [
      {
        name: "Rustic Brown",
        hex: "#6f4e37",
        image: "/images/capture-20d-27-c3-a9cran-202025-12-16-20140132.png",
      },
    ],
    sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    rating: 4.8,
    reviewCount: 61,
    reviews: [],
  },
]
