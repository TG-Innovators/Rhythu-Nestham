/**
 * Centralized Image Catalog for Rythu Nestham
 * All agricultural, farmer, produce, and supplier imagery is managed here.
 * Provides fallback URLs and descriptive, accessible alt text.
 * Images can easily be replaced with official Rythu Nestham media assets.
 */

export const IMAGES = {
  // Hero section - High-end organic farm landscape with healthy green crops
  heroOrganicFarm: {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80",
    fallback: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80",
    alt: "Lush green organic agricultural farm landscape with sustainable crop rows under morning sunlight",
    credit: "Photo courtesy of Unsplash",
  },
  heroFarmer: {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80",
    fallback: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80",
    alt: "Lush green organic agricultural farm landscape with sustainable crop rows under morning sunlight",
    credit: "Photo courtesy of Unsplash",
  },

  // Agricultural landscapes and farm life
  farmLandscape: {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80",
    alt: "Lush green agricultural fields with morning sunlight",
  },
  terraceFarm: {
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
    alt: "Healthy fertile crop rows under sunny blue sky",
  },
  harvestHands: {
    url: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=1000&q=80",
    alt: "Farmer hands gently holding freshly harvested organic produce",
  },

  // Categories
  categories: {
    vegetables: {
      url: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=800&q=80",
      alt: "Freshly harvested organic seasonal vegetables crate",
    },
    fruits: {
      url: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80",
      alt: "Ripe orchard fruits freshly picked from the tree",
    },
    grains: {
      url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      alt: "Golden wheat stalks and harvested Indian paddy grains",
    },
    pulses: {
      url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      alt: "Assorted nutritious Indian pulses, lentils, and chickpeas",
    },
    organic: {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      alt: "Certified pesticide-free farm produce basket",
    },
    seeds: {
      url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      alt: "High-germination native agricultural seeds and saplings",
    },
    dairy: {
      url: "https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80",
      alt: "Pure traditional farm-fresh milk and ghee",
    },
    supplies: {
      url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
      alt: "Modern precision farm equipment and tools",
    },
  },

  // Featured Products
  products: {
    tomatoes: {
      url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      alt: "Vine-ripened organic red tomatoes with natural dew",
    },
    carrots: {
      url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
      alt: "Crisp organic mountain carrots with green stems",
    },
    rice: {
      url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
      alt: "Single-origin aromatic Sona Masoori raw rice",
    },
    spinach: {
      url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
      alt: "Fresh green palak and local country greens",
    },
    mangoes: {
      url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
      alt: "Naturally tree-ripened Banganapalle sweet mangoes",
    },
    honey: {
      url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      alt: "Raw unfiltered wild forest honey jar",
    },
    chili: {
      url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80",
      alt: "Sun-dried Guntur red chili with deep crimson color",
    },
    turmeric: {
      url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
      alt: "High-curcumin Lakadong organic turmeric rhizomes",
    },
    dripKit: {
      url: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
      alt: "Micro-irrigation drip kit for smallholder acreage",
    },
  },

  // Farmers and community members
  farmers: {
    ramesh: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      alt: "Ramesh Kumar smiling in rural farm landscape",
    },
    lakshmi: {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      alt: "Lakshmi Devi, organic horticulture grower",
    },
    venkat: {
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      alt: "Venkat Rao, native millet cultivator",
    },
    ananya: {
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      alt: "Ananya Sharma, conscious consumer and nutritionist",
    },
    kiran: {
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      alt: "Kiran Patel, solar agricultural implement supplier",
    },
  },

  // Supplier cards
  suppliers: {
    seeds: {
      url: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
      alt: "Certified non-GMO drought-resistant crop seeds",
    },
    irrigation: {
      url: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
      alt: "Solar-powered micro drip irrigation systems",
    },
    equipment: {
      url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
      alt: "Compact multi-purpose tillers and seeders",
    },
    bioFertilizer: {
      url: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80",
      alt: "Organic vermicompost and microbial soil inoculants",
    },
  },

  // Editorial journal
  editorial: {
    soilHealth: {
      url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80",
      alt: "Rich fertile dark soil ready for organic sowing",
    },
    millets: {
      url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      alt: "Field of indigenous drought-resilient pearl millets",
    },
    waterWisdom: {
      url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      alt: "Rainwater percolation pond on sustainable farm",
    },
  },
};
