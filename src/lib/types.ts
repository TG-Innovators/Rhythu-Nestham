export type UserRole = 'consumer' | 'farmer' | 'supplier';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  unit: string;
  farmerName: string;
  farmerId: string;
  location: string;
  rating: number;
  reviewsCount: number;
  image: string;
  freshness: string;
  verified: boolean;
  certified: boolean;
  inStock: boolean;
  organic: boolean;
  description: string;
  harvestDate: string;
  minimumOrder?: string;
  nutritionalHighlight?: string;
}

export interface Farmer {
  id: string;
  name: string;
  specialty: string;
  location: string;
  state: string;
  rating: number;
  reviewsCount: number;
  productsSoldCount: number;
  image: string;
  verified: boolean;
  bio: string;
  experienceYears: number;
  acresCultivated: number;
  primaryCrops: string[];
  whatsappPhone: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  state: string;
  rating: number;
  productsCount: number;
  image: string;
  verified: boolean;
  description: string;
  specialties: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: 'Farmer' | 'Consumer' | 'Supplier';
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  tag: string;
  verified: boolean;
}

export interface Story {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface VerificationStep {
  id: number;
  stage: string;
  title: string;
  description: string;
  proofType: string;
  iconName: string;
}
