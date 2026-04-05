export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  featured: boolean;
  notes: string[];
  size: string;
  stock: number;
  warranty?: string;
  department?: "perfume" | "accessory";
  sizes?: {
    size: string;
    price: number;
    originalPrice?: number;
    stock: number;
    image?: string;
  }[];
}

export const products: Product[] = [
  {
    id: "attar-1",
    name: "Amber",
    description: "A rich and deep fragrance with captivating notes of pure musk, ambergris, and sandalwood.",
    price: 200,
    image: "/products/Attar/Amber.png",
    category: "Medium",
    featured: true,
    notes: ["Oud, Musk, Dark Vanilla"],
    size: "6ml",
    stock: 15,
    sizes: [
      { size: "3ml", price: 100, stock: 20, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 15, image: "/products/Attar/6ml bottle.png" }
    ]
  },
  {
    id: "attar-2",
    name: "Ameerul oud",
    description: "Delicate and floral, this attar captures the essence of premium Taif roses with subtle hints of jasmine.",
    price: 200,
    image: "/products/Attar/Ameerul oud.png",
    category: "Premium",
    featured: true,
    notes: ["Simple, cozy, warm, floral"],
    size: "6ml",
    stock: 10,
    sizes: [
      { size: "3ml", price: 100, stock: 18, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 10, image: "/products/Attar/6ml bottle.png" }
    ]
  },
  {
    id: "attar-3",
    name: "Jannatul Firdaus",
    description: "A majestic blend of premium agarwood, saffron, and amber creating a luxurious and long-lasting fragrance.",
    price: 200,
    image: "/products/Attar/Jannatul Firdous.png",
    category: "Premium",
    featured: true,
    notes: ["Creamy, woody backbone,Clean, soapy,Marine sweetness + fixative power of amber"],
    size: "6ml",
    stock: 8,
    sizes: [
      { size: "3ml", price: 100, stock: 15, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 8, image: "/products/Attar/6ml bottle.png" }
    ]
  },
  {
    id: "attar-4",
    name: "juwan Musk",
    description: "Warm and mysterious amber infused with exotic spices and a touch of vanilla for a comforting experience.",
    price: 200,
    image: "/products/Attar/Juwan Musk.png",
    category: "Medium",
    featured: false,
    notes: ["clean, skin-scent,Earthy,Warm, slightly sweet, musky"],
    size: "6ml",
    stock: 12,
    sizes: [
      { size: "3ml", price: 100, stock: 22, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 12, image: "/products/Attar/6ml bottle.png" }
    ]
  },
  {
    id: "attar-5",
    name: "Midnight oud",
    description: "Pure jasmine flowers collected at dusk and distilled to capture their intoxicating and dreamy essence.",
    price: 200,
    image: "/products/Attar/Midnight oud.png",
    category: "Mild",
    featured: true,
    notes: ["Classic Middle Eastern floral,Smoky-sweet, creamy drydown,warm"],

    size: "6ml",
    stock: 17,
    sizes: [
      { size: "3ml", price: 100, stock: 25, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 17, image: "/products/Attar/6ml bottle.png" }
    ]
  },
  {
    id: "attar-6",
    name: "Mukallat Dubai",
    description: "A grounding blend of vetiver root, patchouli, and cedarwood for a natural and earthy fragrance.",
    price: 200,
    image: "/products/Attar/Mukallat Dubai.png",
    category: "Medium",
    featured: false,
    notes: ["Warm", "Resinous", "Golden Sweetness", "Creamy", "Smooth", "Woody", "Earthy"],
    size: "6ml",
    stock: 9,
    sizes: [
      { size: "3ml", price: 100, stock: 16, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 9, image: "/products/Attar/6ml bottle.png" }
    ]
  },
  {
    id: "attar-7",
    name: "Musk rijali",
    description: "Luxurious saffron blended with Damascus rose and subtle oud for an opulent and refined scent.",
    price: 200,
    image: "/products/Attar/Musk rijali.png",
    category: "Premium",
    featured: false,
    notes: ["Creamy", "woody", "resinous sweetness", "Floral", "rosy", "slightly fruity", "warm", "musky"],
    size: "6ml",
    stock: 7,
    sizes: [
      { size: "3ml", price: 100, stock: 14, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 7, image: "/products/Attar/6ml bottle.png" }
    ]
  },
  {
    id: "attar-8",
    name: "Musk",
    description: "A dark and sophisticated musk with leather accords and smoky vanilla for a modern interpretation.",
    price: 200,
    image: "/products/Attar/Musk.png",
    category: "Mild",
    featured: false,
    notes: ["Smoky vanilla"],
    size: "6ml",
    stock: 11,
    sizes: [
      { size: "3ml", price: 100, stock: 19, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 11, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "acc-1",
    name: "boAt Airdopes 313",
    description: "Immersive sound and ergonomic design with long-lasting battery life. Includes all 3 signature colors.",
    price: 700,
    image: "/products/313.jpeg",
    category: "Airpods",
    department: "accessory",
    featured: true,
    notes: ["Glide Shell", "13mm Drivers", "Total Playtime: 75 Hours"],
    size: "All Colors",
    stock: 80,
    sizes: [
      { size: "Forest Green", price: 700, stock: 30 },
      { size: "Midnight Black", price: 700, stock: 30 },
      { size: "Desert Beige", price: 700, stock: 20 }
    ]
  },
  {
    id: "acc-2",
    name: "boAt Power Bank 10000mAh",
    description: "Compact and powerful 4-in-1 charging solution with built-in cables for both iPhone and Android.",
    price: 1500,
    image: "/products/powerbank.jpeg",
    category: "Android Accessories",
    department: "accessory",
    featured: true,
    notes: ["4-in-1 Cables", "10000mAh", "Fast Charging"],
    size: "Vibrant Red",
    stock: 120,
    sizes: [
      { size: "Vibrant Red", price: 1500, stock: 60 },
      { size: "Midnight Black", price: 1500, stock: 60 }
    ]
  },
  {
    id: "acc-3",
    name: "boAt Tarjan Pro Neckband",
    description: "Dual battery neckband for extended listening with crystal clear sound and Dolby Audio support.",
    price: 900,
    image: "/products/tarjan-pro.png",
    category: "Airpods",
    department: "accessory",
    featured: false,
    notes: ["Dual Battery", "Dolby Audio", "Playtime: 500hrs"],
    size: "Navy Blue",
    stock: 60
  },
  {
    id: "acc-4",
    name: "boAt Airdopes Prime 131-GEN",
    description: "Premium earbuds with Hybrid Active Noise Cancellation and a sophisticated metallic finish.",
    price: 700,
    image: "/products/131 GEN.jpeg",
    category: "Airpods",
    department: "accessory",
    featured: true,
    notes: ["Hybrid ANC", "Prime Build", "Touch Controls"],
    size: "Rose Gold",
    stock: 45,
    sizes: [
      { size: "Rose Gold", price: 700, stock: 15 },
      { size: "Midnight Black", price: 700, stock: 20 },
      { size: "Deep Blue", price: 700, stock: 10 }
    ]
  },
  {
    id: "acc-5",
    name: "JTP 15W Fast Charger",
    description: "Reliable and fast charging for all your mobile devices. Includes a high-grade Micro-USB cable.",
    price: 200,
    image: "/products/charger-15w.png",
    category: "Android Accessories",
    department: "accessory",
    featured: false,
    notes: ["15W Output", "Micro-USB Included", "Universal Compatibility"],
    size: "Pure White",
    stock: 150
  },
  
  {
    id: "acc-6",
    name: "MZ Portable Soundbar with Mic",
    description: "Compact and powerful portable soundbar with a dedicated karaoke microphone for double the fun.",
    price: 900,
    image: "/products/M2z Speaker image.png",
    category: "Speakers",
    department: "accessory",
    featured: true,
    notes: ["Compact Soundbar", "Single Karaoke Mic", "TF Card Support"],
    size: "One Size",
    stock: 40
  },    
  {
    id: "acc-7",
    name: "Mobile battery",
    description: "High-capacity portable battery for keeping your devices powered on the go.",
    price: 250,
    image: "/products/Battery/WhatsApp Image 2026-04-04 at 12.55.51 PM (1).jpeg",
    category: "Android Accessories",
    department: "accessory",
    featured: true,
    notes: ["High Capacity", "Fast Charging", "Universal Compatibility"], 
    size: "",
    warranty: "One Year",
    stock: 40
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

export const getSizeImage = (product: Product, size: string): string => {
  // If no size selected, return default product image
  if (!size) {
    return product.image;
  }
  
  if (product.sizes) {
    const sizeObj = product.sizes.find(s => s.size === size);
    if (sizeObj && sizeObj.image) {
      return sizeObj.image;
    }
  }
  return product.image;
};
