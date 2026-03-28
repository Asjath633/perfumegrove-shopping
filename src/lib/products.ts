
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
  department?: "perfume" | "accessory";
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
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1592155539161-c93f2f67754c?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1586452027707-b2de7d420f43?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1547887538-cc10eca1a747?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1546797140-c375893770ab?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1592968682222-add6bdc733c4?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1594033579777-5c3cc8189e0d?q=80&w=800&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1543422655-ac1c6ca993f1?q=80&w=800&auto=format&fit=crop",
    category: "classic",
    featured: false,
    notes: ["Black Musk", "Leather", "Smoky Vanilla"],
    size: "6ml",
    stock: 11,
    sizes: [
      { size: "3ml", price: 100, stock: 19 },
      { size: "6ml", price: 200, stock: 11 }
    ]
  },
  {
    id: "acc-1",
    name: "Ultra-Clear Temper for Android",
    description: "Anti-scratch and full coverage tempered glass for top Android models.",
    price: 15,
    image: "https://images.unsplash.com/photo-1601043346985-0556f8fba3d5?q=80&w=800&auto=format&fit=crop",
    category: "temper for Android",
    department: "accessory",
    featured: true,
    notes: ["Anti-scratch", "9H Hardness", "Oleo-phobic"],
    size: "Universal",
    stock: 200
  },
  {
    id: "acc-2",
    name: "Privacy Temper for IOS",
    description: "Protect your screen and your privacy with our premium iOS tempered glass.",
    price: 18,
    image: "https://images.unsplash.com/photo-1627993049071-8bc6b2c2c9d4?q=80&w=800&auto=format&fit=crop",
    category: "Temper for IOS",
    department: "accessory",
    featured: true,
    notes: ["Privacy Filter", "9H Hardness"],
    size: "Universal",
    stock: 150
  },
  {
    id: "acc-3",
    name: "Luxury Leather iPhone case",
    description: "Elegant, durable, and shock-resistant premium leather case.",
    price: 35,
    image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?q=80&w=800&auto=format&fit=crop",
    category: "iPhone case",
    department: "accessory",
    featured: true,
    notes: ["Genuine Leather", "Shockproof"],
    size: "Standard",
    stock: 50
  },
  {
    id: "acc-4",
    name: "Rugged Armor Android case",
    description: "Heavy-duty protection for your Android device.",
    price: 25,
    image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=800&auto=format&fit=crop",
    category: "Android phone case",
    department: "accessory",
    featured: false,
    notes: ["Drop Protection", "Kickstand"],
    size: "Standard",
    stock: 100
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

export const getProductsByDepartment = (department: "perfume" | "accessory"): Product[] => {
  return products.filter(product => (product.department || "perfume") === department);
};
