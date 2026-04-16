export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  featured: boolean;
  isBestSeller?: boolean;
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
    price: 300,
    image: "/products/Attar/Amber.png",
    category: "Oud",
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
    price: 250,
    image: "/products/Attar/Ameerul oud.png",
    category: "Oud",
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
    price: 280,
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
    price: 280,
    image: "/products/Attar/Juwan Musk.png",
    category: "Musk",
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
    category: "Oud",
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
    price: 260,
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
    price: 300,
    image: "/products/Attar/Musk rijali.png",
    category: "Musk",
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
    category: "Musk",
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
    id: "attar-9",
    name: "White Oud",
    description: "A pristine and luminous oud with soft floral undertones and a clean, powdery finish — elegant and timeless.",
    price: 280,
    image: "/products/Attar/White oud.png",
    category: "Oud",
    featured: true,
    isBestSeller: true,
    notes: ["Clean", "Powdery", "Soft Floral", "Warm Oud"],
    size: "6ml",
    stock: 14,
    sizes: [
      { size: "3ml", price: 100, stock: 20, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 14, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-10",
    name: "CR7",
    description: "A bold and energetic fragrance inspired by the legendary champion — fresh citrus top notes with a powerful woody base.",
    price: 350,
    image: "/products/Attar/CR7.png",
    category: "Medium",
    featured: true,
    isBestSeller: true,
    notes: ["Citrus", "Woody", "Fresh", "Sporty"],
    size: "6ml",
    stock: 15,
    sizes: [
      { size: "3ml", price: 100, stock: 20, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 15, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-11",
    name: "Dunhill",
    description: "A classic and refined masculine scent — sophisticated spices and warm woods for the discerning gentleman.",
    price: 250,
    image: "/products/Attar/Dunhill.png",
    category: "Premium",
    featured: false,
    isBestSeller: true,
    notes: ["Spicy", "Warm Wood", "Leather", "Refined"],
    size: "6ml",
    stock: 12,
    sizes: [
      { size: "3ml", price: 100, stock: 18, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 12, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-12",
    name: "Blue Moon",
    description: "A cool and ethereal fragrance with aquatic freshness and a soft musky heart — as calming as moonlight.",
    price: 280,
    image: "/products/Attar/Blue Moon.png",
    category: "Mild",
    featured: true,
    notes: ["Aquatic", "Fresh", "Soft Musk", "Cool"],
    size: "6ml",
    stock: 14,
    sizes: [
      { size: "3ml", price: 100, stock: 20, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 14, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-13",
    name: "Fantasia",
    description: "A dreamy and enchanting floral blend with hints of vanilla and sweet berries — a magical feminine scent.",
    price: 200,
    image: "/products/Attar/Fantasia.png",
    category: "Mild",
    featured: false,
    notes: ["Floral", "Vanilla", "Sweet Berry", "Dreamy"],
    size: "6ml",
    stock: 13,
    sizes: [
      { size: "3ml", price: 100, stock: 22, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 13, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-14",
    name: "Majmua 96",
    description: "A timeless traditional Indian attar blend — earthy florals, rich roots, and warm resins in perfect harmony.",
    price: 300,
    image: "/products/Attar/Majmua 96.png",
    category: "Premium",
    featured: true,
    notes: ["Earthy Floral", "Resinous", "Traditional", "Warm"],
    size: "6ml",
    stock: 10,
    sizes: [
      { size: "3ml", price: 100, stock: 18, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 10, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-15",
    name: "Kasturi",
    description: "Pure and natural kasturi musk — a soft, warm, and deeply personal scent that lingers close to the skin.",
    price: 320,
    image: "/products/Attar/Kasturi.png",
    category: "Mild",
    featured: false,
    notes: ["Natural Musk", "Soft", "Warm", "Skin Scent"],
    size: "6ml",
    stock: 11,
    sizes: [
      { size: "3ml", price: 100, stock: 19, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 11, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-16",
    name: "Fogg",
    description: "A popular and long-lasting everyday fragrance — fresh, clean, and uplifting for all-day confidence.",
    price: 200,
    image: "/products/Attar/Fogg.png",
    category: "Medium",
    featured: false,
    notes: ["Fresh", "Clean", "Light Woody", "Uplifting"],
    size: "6ml",
    stock: 16,
    sizes: [
      { size: "3ml", price: 100, stock: 25, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 16, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-17",
    name: "Mody Oud",
    description: "A rich and smoky oud with modern character — deep resinous notes meet a smooth, contemporary finish.",
    price: 350,
    image: "/products/Attar/Mody Oud.png",
    category: "Oud",
    featured: true,
    notes: ["Smoky Oud", "Resinous", "Deep", "Modern"],
    size: "6ml",
    stock: 9,
    sizes: [
      { size: "3ml", price: 100, stock: 15, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 9, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-18",
    name: "Dove",
    description: "A gentle and soothing fragrance — soft powdery notes with a clean, comforting warmth reminiscent of pure serenity.",
    price: 200,
    image: "/products/Attar/Dove.png",
    category: "Mild",
    featured: false,
    notes: ["Powdery", "Clean", "Soft", "Comforting"],
    size: "6ml",
    stock: 14,
    sizes: [
      { size: "3ml", price: 100, stock: 22, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 14, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-19",
    name: "Cobra",
    description: "A bold and daring scent — sharp green spices, dark woods, and an intense base for the fearless.",
    price: 200,
    image: "/products/Attar/Cobra.png",
    category: "Medium",
    featured: false,
    notes: ["Spicy Green", "Dark Wood", "Bold", "Intense"],
    size: "6ml",
    stock: 12,
    sizes: [
      { size: "3ml", price: 100, stock: 20, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 12, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-20",
    name: "Fancy Bouquet",
    description: "A luxurious floral bouquet — a vibrant mix of rose, jasmine, and lily with a soft musky drydown.",
    price: 200,
    image: "/products/Attar/Fancy Bouquet.png",
    category: "Mild",
    featured: true,
    notes: ["Rose", "Jasmine", "Lily", "Soft Musk"],
    size: "6ml",
    stock: 13,
    sizes: [
      { size: "3ml", price: 100, stock: 20, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 13, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-21",
    name: "Arabian Night",
    description: "A mysterious and opulent oriental blend — dark oud, exotic spices, and amber evoking starlit desert nights.",
    price: 250,
    image: "/products/Attar/Arabian Night.png",
    category: "Premium",
    featured: true,
    notes: ["Dark Oud", "Exotic Spice", "Amber", "Oriental"],
    size: "6ml",
    stock: 8,
    sizes: [
      { size: "3ml", price: 100, stock: 15, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 8, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-22",
    name: "Chocolate Musk",
    description: "A sweet and seductive gourmand fragrance — rich dark chocolate wrapped in a warm, skin-hugging musk.",
    price: 200,
    image: "/products/Attar/Chocolate Musk.png",
    category: "Mild",
    featured: false,
    notes: ["Dark Chocolate", "Sweet Musk", "Warm", "Gourmand"],
    size: "6ml",
    stock: 15,
    sizes: [
      { size: "3ml", price: 100, stock: 22, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 15, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-23",
    name: "Mukhalat Seeka",
    description: "A complex and layered oriental blend — precious oud, rose, and exotic resins creating a majestic signature.",
    price: 300,
    image: "/products/Attar/Mukhalat Seeka.png",
    category: "Premium",
    featured: false,
    notes: ["Oud", "Rose", "Exotic Resin", "Layered"],
    size: "6ml",
    stock: 7,
    sizes: [
      { size: "3ml", price: 100, stock: 14, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 7, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-24",
    name: "Sandalwood",
    description: "Pure and creamy Indian sandalwood attar — smooth, milky warmth with a deep earthy sweetness that never fades.",
    price: 250,
    image: "/products/Attar/Sandalwood.png",
    category: "Medium",
    featured: true,
    notes: ["Creamy Sandalwood", "Earthy", "Warm", "Smooth"],
    size: "6ml",
    stock: 16,
    sizes: [
      { size: "3ml", price: 100, stock: 24, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 16, image: "/products/Attar/6ml bottle.png" }
    ]
  },

  {
    id: "attar-25",
    name: "Jasmine",
    description: "Fresh and intoxicating jasmine attar — pure white florals with a honeyed softness, radiant and captivating.",
    price: 200,
    image: "/products/Attar/Jasmine.png",
    category: "Mild",
    featured: true,
    notes: ["White Jasmine", "Honey", "Fresh Floral", "Radiant"],
    size: "6ml",
    stock: 18,
    sizes: [
      { size: "3ml", price: 100, stock: 25, image: "/products/Attar/3ml bottle.png" },
      { size: "6ml", price: 200, stock: 18, image: "/products/Attar/6ml bottle.png" }
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

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isBestSeller);
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
