
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  notes: string[];
  size: string;
  stock: number;
  sizes?: {
    size: string;
    price: number;
    stock: number;
  }[];
}

export const products: Product[] = [
  {
    id: "attar-1",
    name: "Musk Al Madina",
    description: "A rich and deep fragrance with captivating notes of pure musk, ambergris, and sandalwood.",
    price: 200,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800&auto=format&fit=crop",
    category: "classic",
    featured: true,
    notes: ["Musk", "Ambergris", "Sandalwood"],
    size: "6ml",
    stock: 15,
    sizes: [
      { size: "3ml", price: 100, stock: 20 },
      { size: "6ml", price: 200, stock: 15 }
    ]
  },
  {
    id: "attar-2",
    name: "Rose of Taif",
    description: "Delicate and floral, this attar captures the essence of premium Taif roses with subtle hints of jasmine.",
    price: 200,
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=800&auto=format&fit=crop",
    category: "floral",
    featured: true,
    notes: ["Taif Rose", "Jasmine", "Soft Vanilla"],
    size: "6ml",
    stock: 10,
    sizes: [
      { size: "3ml", price: 100, stock: 18 },
      { size: "6ml", price: 200, stock: 10 }
    ]
  },
  {
    id: "attar-3",
    name: "Oud Royale",
    description: "A majestic blend of premium agarwood, saffron, and amber creating a luxurious and long-lasting fragrance.",
    price: 200,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
    category: "premium",
    featured: true,
    notes: ["Agarwood", "Saffron", "Amber"],
    size: "6ml",
    stock: 8,
    sizes: [
      { size: "3ml", price: 100, stock: 15 },
      { size: "6ml", price: 200, stock: 8 }
    ]
  },
  {
    id: "attar-4",
    name: "Amber Mystique",
    description: "Warm and mysterious amber infused with exotic spices and a touch of vanilla for a comforting experience.",
    price: 200,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800&auto=format&fit=crop",
    category: "oriental",
    featured: false,
    notes: ["Amber", "Cardamom", "Vanilla"],
    size: "6ml",
    stock: 12,
    sizes: [
      { size: "3ml", price: 100, stock: 22 },
      { size: "6ml", price: 200, stock: 12 }
    ]
  },
  {
    id: "attar-5",
    name: "Jasmine Dreams",
    description: "Pure jasmine flowers collected at dusk and distilled to capture their intoxicating and dreamy essence.",
    price: 200,
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=800&auto=format&fit=crop",
    category: "floral",
    featured: true,
    notes: ["Jasmine", "White Flowers", "Musk"],
    size: "6ml",
    stock: 17,
    sizes: [
      { size: "3ml", price: 100, stock: 25 },
      { size: "6ml", price: 200, stock: 17 }
    ]
  },
  {
    id: "attar-6",
    name: "Vetiver Earth",
    description: "A grounding blend of vetiver root, patchouli, and cedarwood for a natural and earthy fragrance.",
    price: 200,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=800&auto=format&fit=crop",
    category: "woody",
    featured: false,
    notes: ["Vetiver", "Patchouli", "Cedarwood"],
    size: "6ml",
    stock: 9,
    sizes: [
      { size: "3ml", price: 100, stock: 16 },
      { size: "6ml", price: 200, stock: 9 }
    ]
  },
  {
    id: "attar-7",
    name: "Saffron Bloom",
    description: "Luxurious saffron blended with Damascus rose and subtle oud for an opulent and refined scent.",
    price: 200,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=800&auto=format&fit=crop",
    category: "premium",
    featured: false,
    notes: ["Saffron", "Damascus Rose", "Oud"],
    size: "6ml",
    stock: 7,
    sizes: [
      { size: "3ml", price: 100, stock: 14 },
      { size: "6ml", price: 200, stock: 7 }
    ]
  },
  {
    id: "attar-8",
    name: "Musk Noir",
    description: "A dark and sophisticated musk with leather accords and smoky vanilla for a modern interpretation.",
    price: 200,
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?q=80&w=800&auto=format&fit=crop",
    category: "classic",
    featured: false,
    notes: ["Black Musk", "Leather", "Smoky Vanilla"],
    size: "6ml",
    stock: 11,
    sizes: [
      { size: "3ml", price: 100, stock: 19 },
      { size: "6ml", price: 200, stock: 11 }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};
