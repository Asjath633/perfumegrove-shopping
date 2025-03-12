
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
}

export const products: Product[] = [
  {
    id: "attar-1",
    name: "Musk Al Madina",
    description: "A rich and deep fragrance with captivating notes of pure musk, ambergris, and sandalwood.",
    price: 85,
    image: "https://images.unsplash.com/photo-1595425964377-5d7f8ac0daeb?q=80&w=800&auto=format&fit=crop",
    category: "classic",
    featured: true,
    notes: ["Musk", "Ambergris", "Sandalwood"],
    size: "10ml",
    stock: 15
  },
  {
    id: "attar-2",
    name: "Rose of Taif",
    description: "Delicate and floral, this attar captures the essence of premium Taif roses with subtle hints of jasmine.",
    price: 95,
    image: "https://images.unsplash.com/photo-1605651531144-51381895e23d?q=80&w=800&auto=format&fit=crop",
    category: "floral",
    featured: true,
    notes: ["Taif Rose", "Jasmine", "Soft Vanilla"],
    size: "10ml",
    stock: 10
  },
  {
    id: "attar-3",
    name: "Oud Royale",
    description: "A majestic blend of premium agarwood, saffron, and amber creating a luxurious and long-lasting fragrance.",
    price: 120,
    image: "https://images.unsplash.com/photo-1617175355199-2e75b9b32e72?q=80&w=800&auto=format&fit=crop",
    category: "premium",
    featured: true,
    notes: ["Agarwood", "Saffron", "Amber"],
    size: "10ml",
    stock: 8
  },
  {
    id: "attar-4",
    name: "Amber Mystique",
    description: "Warm and mysterious amber infused with exotic spices and a touch of vanilla for a comforting experience.",
    price: 78,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop",
    category: "oriental",
    featured: false,
    notes: ["Amber", "Cardamom", "Vanilla"],
    size: "10ml",
    stock: 12
  },
  {
    id: "attar-5",
    name: "Jasmine Dreams",
    description: "Pure jasmine flowers collected at dusk and distilled to capture their intoxicating and dreamy essence.",
    price: 89,
    image: "https://images.unsplash.com/photo-1605651585991-59a7a3cce68d?q=80&w=800&auto=format&fit=crop",
    category: "floral",
    featured: true,
    notes: ["Jasmine", "White Flowers", "Musk"],
    size: "10ml",
    stock: 17
  },
  {
    id: "attar-6",
    name: "Vetiver Earth",
    description: "A grounding blend of vetiver root, patchouli, and cedarwood for a natural and earthy fragrance.",
    price: 76,
    image: "https://images.unsplash.com/photo-1618330834871-dd22c2c23584?q=80&w=800&auto=format&fit=crop",
    category: "woody",
    featured: false,
    notes: ["Vetiver", "Patchouli", "Cedarwood"],
    size: "10ml",
    stock: 9
  },
  {
    id: "attar-7",
    name: "Saffron Bloom",
    description: "Luxurious saffron blended with Damascus rose and subtle oud for an opulent and refined scent.",
    price: 105,
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=800&auto=format&fit=crop",
    category: "premium",
    featured: false,
    notes: ["Saffron", "Damascus Rose", "Oud"],
    size: "10ml",
    stock: 7
  },
  {
    id: "attar-8",
    name: "Musk Noir",
    description: "A dark and sophisticated musk with leather accords and smoky vanilla for a modern interpretation.",
    price: 92,
    image: "https://images.unsplash.com/photo-1608571423901-fb5a1f613229?q=80&w=800&auto=format&fit=crop",
    category: "classic",
    featured: false,
    notes: ["Black Musk", "Leather", "Smoky Vanilla"],
    size: "10ml",
    stock: 11
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
