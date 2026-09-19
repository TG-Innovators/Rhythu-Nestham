import { Product, UserRole } from './types';
import { supabase, isSupabaseConfigured } from './supabase';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: UserRole;
  farmOrBusinessName?: string;
  district?: string;
  isVerified?: boolean;
}

/**
 * Verification & Role-Based Access Guard
 * Only verified farmers and suppliers can create/manage products.
 */
export const isVerifiedProducer = (user: AuthUser | null | undefined): boolean => {
  if (!user) return false;
  return (user.role === 'farmer' || user.role === 'supplier') && Boolean(user.isVerified);
};

const STORAGE_KEYS = {
  USER: 'rythu_auth_user',
  WAITLIST: 'rythu_delivery_waitlist',
  ORDERS: 'rythu_orders',
};


// ----------------------------------------------------------------------------
// 1. Authentication API
// ----------------------------------------------------------------------------
export const authAPI = {
  getCurrentUser(): AuthUser | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  async login(phoneOrEmail: string, passwordOrOtp: string, role: UserRole = 'consumer'): Promise<AuthUser> {
    // If Supabase is connected, we can use Supabase Auth
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: phoneOrEmail.includes('@') ? phoneOrEmail : `${phoneOrEmail.replace(/\D/g, '')}@rythunestham.ag`,
          password: passwordOrOtp,
        });
        if (!error && data.user) {
          let isVerified = false;
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('is_verified')
              .eq('id', data.user.id)
              .single();
            if (profile) {
              isVerified = profile.is_verified;
            }
          } catch (e) {
            console.warn('Could not fetch profile verification status', e);
          }

          const user: AuthUser = {
            id: data.user.id,
            name: data.user.user_metadata.full_name || 'Rythu Member',
            email: data.user.email,
            phone: data.user.phone || phoneOrEmail,
            role: (data.user.user_metadata.role as UserRole) || role,
            district: data.user.user_metadata.district || 'Telangana',
            isVerified,
          };
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
          return user;
        }
      } catch (err) {
        console.warn('Supabase auth error, falling back to local session:', err);
      }
    }

    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo user profiles
    let name = 'Rythu Member';
    let farmName: string | undefined;

    if (role === 'farmer') {
      name = 'Ramesh Kumar';
      farmName = 'Deccan Organic Farms';
    } else if (role === 'supplier') {
      name = 'Srinivas Rao';
      farmName = 'Kisan Drip Tech';
    } else {
      name = 'Priya Sharma';
    }

    const user: AuthUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name,
      phone: phoneOrEmail,
      email: phoneOrEmail.includes('@') ? phoneOrEmail : undefined,
      role,
      farmOrBusinessName: farmName,
      district: 'Medak, Telangana',
      isVerified: true,
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  async register(params: {
    name: string;
    phone: string;
    email?: string;
    password?: string;
    role: UserRole;
    farmOrBusinessName?: string;
    district?: string;
  }): Promise<AuthUser> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: params.email || `${params.phone.replace(/\D/g, '')}@rythunestham.ag`,
          password: params.password || 'RythuNestham@2026',
          options: {
            data: {
              full_name: params.name,
              role: params.role,
              phone: params.phone,
              farm_name: params.farmOrBusinessName,
              district: params.district,
            },
          },
        });
        if (!error && data.user) {
          let isVerified = false;
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('is_verified')
              .eq('id', data.user.id)
              .single();
            if (profile) {
              isVerified = profile.is_verified;
            }
          } catch (e) {
            console.warn('Could not fetch profile verification status', e);
          }

          const user: AuthUser = {
            id: data.user.id,
            name: params.name,
            email: params.email,
            phone: params.phone,
            role: params.role,
            farmOrBusinessName: params.farmOrBusinessName,
            district: params.district || 'Telangana',
            isVerified,
          };
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
          return user;
        }
      } catch (err) {
        console.warn('Supabase signup error, using local storage:', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 750));

    const user: AuthUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: params.name,
      phone: params.phone,
      email: params.email,
      role: params.role,
      farmOrBusinessName: params.farmOrBusinessName,
      district: params.district || 'Telangana',
      isVerified: true,
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  logout(): void {
    if (isSupabaseConfigured) {
      supabase.auth.signOut().catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

// ----------------------------------------------------------------------------
// 2. Products API (Supabase as Single Source of Truth)
// ----------------------------------------------------------------------------
export const productsAPI = {
  /**
   * Initial synchronous state — genuine empty array. Zero mock or hardcoded products.
   */
  getInitialProducts(): Product[] {
    return [];
  },

  /**
   * Fetch active harvest products directly from Supabase public.products
   */
  async fetchProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[Rythu Nestham Products] Error fetching from Supabase:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        category: row.category,
        price: Number(row.price),
        originalPrice: row.original_price ? Number(row.original_price) : undefined,
        unit: row.unit || 'kg',
        farmerName: row.location || 'Verified Producer',
        farmerId: row.farmer_id || 'producer',
        location: row.location || 'Telangana',
        rating: Number(row.rating || 5.0),
        reviewsCount: Number(row.reviews_count || 0),
        image: row.image_url,
        freshness: row.freshness_tag || 'Harvested Today',
        verified: Boolean(row.is_verified ?? true),
        certified: Boolean(row.is_certified ?? true),
        inStock: Boolean(row.in_stock ?? true),
        organic: Boolean(row.is_organic ?? true),
        description: row.description || '',
        harvestDate: row.harvest_date || new Date().toISOString().split('T')[0],
        minimumOrder: row.minimum_order,
        nutritionalHighlight: row.nutritional_highlight,
      }));
    } catch (err) {
      console.error('[Rythu Nestham Products] Failed to retrieve products:', err);
      throw err;
    }
  },

  /**
   * Only verified producers (farmer / supplier) can add products.
   */
  async addProduct(newProductData: Omit<Product, 'id'>): Promise<Product> {
    const user = authAPI.getCurrentUser();
    if (!isVerifiedProducer(user)) {
      throw new Error('Access Denied: Only verified producers can list agricultural products.');
    }

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: newProductData.name,
            category: newProductData.category,
            price: newProductData.price,
            original_price: newProductData.originalPrice || null,
            unit: newProductData.unit,
            farmer_id: user?.id,
            location: newProductData.location,
            freshness_tag: newProductData.freshness,
            description: newProductData.description,
            image_url: newProductData.image,
            is_verified: true,
            is_certified: newProductData.certified,
            is_organic: newProductData.organic,
            in_stock: true,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('[Rythu Nestham Products] Supabase product insert error:', error);
        throw error;
      }

      return {
        ...newProductData,
        id: data.id,
      };
    }

    // Fallback if local offline development
    return {
      ...newProductData,
      id: 'prod_' + Math.random().toString(36).substr(2, 9),
    };
  },
};

// ----------------------------------------------------------------------------
// 3. Regional Delivery & Waitlist API
// ----------------------------------------------------------------------------
export const deliveryAPI = {
  checkAvailability(pincode: string): { isServiceable: boolean; message: string; hubDistance?: string } {
    // Current pilot farm corridors
    const activePilotPincodes = ['502110', '500081', '500032', '500084'];
    const cleanPin = pincode.trim();

    if (activePilotPincodes.includes(cleanPin)) {
      return {
        isServiceable: true,
        message: 'Direct Farm Express Delivery is available in your cluster!',
        hubDistance: 'Dispatches within 18 hours from Medak Rural Hub',
      };
    }

    return {
      isServiceable: false,
      message: 'Direct doorstep delivery is currently not available in your region yet.',
    };
  },

  async joinWaitlist(pincode: string, phone: string, email?: string): Promise<{ success: boolean; refId: string }> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('delivery_waitlist')
          .insert([{ pincode, phone, email }])
          .select('id')
          .single();
        if (!error && data) {
          return { success: true, refId: data.id };
        }
      } catch (err) {
        console.warn('Failed to insert waitlist to supabase', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const entry = {
      id: 'WTL-' + Math.floor(10000 + Math.random() * 90000),
      pincode,
      phone,
      email,
      timestamp: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WAITLIST);
      const list = stored ? JSON.parse(stored) : [];
      list.push(entry);
      localStorage.setItem(STORAGE_KEYS.WAITLIST, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save waitlist entry', e);
    }

    return { success: true, refId: entry.id };
  },
};

// ----------------------------------------------------------------------------
// 4. Cart API
// ----------------------------------------------------------------------------
export const cartAPI = {
  async getCartItems() {
    if (!isSupabaseConfigured) return [];
    const user = authAPI.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('cart_items')
      .select('*, product:products(*)')
      .eq('user_id', user.id);

    if (error) {
      console.error('Failed to get cart items', error);
      throw error;
    }
    return data;
  },

  async addToCart(productId: string, quantity: number) {
    if (!isSupabaseConfigured) return;
    const user = authAPI.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('cart_items')
      .upsert({ user_id: user.id, product_id: productId, quantity }, { onConflict: 'user_id,product_id' });

    if (error) {
      console.error('Failed to add to cart', error);
      throw error;
    }
  },

  async removeFromCart(productId: string) {
    if (!isSupabaseConfigured) return;
    const user = authAPI.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) {
      console.error('Failed to remove from cart', error);
      throw error;
    }
  },

  async updateQuantity(productId: string, quantity: number) {
    if (!isSupabaseConfigured) return;
    const user = authAPI.getCurrentUser();
    if (!user) throw new Error('Must be logged in');

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) {
      console.error('Failed to update cart quantity', error);
      throw error;
    }
  },
};

// ----------------------------------------------------------------------------
// 5. Orders API
// ----------------------------------------------------------------------------
export const ordersAPI = {
  async getMyOrders() {
    if (!isSupabaseConfigured) return [];
    const user = authAPI.getCurrentUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to get orders', error);
      throw error;
    }
    return data;
  },

  async getFarmerOrders() {
    if (!isSupabaseConfigured) return [];
    const user = authAPI.getCurrentUser();
    if (!user || user.role !== 'farmer') return [];

    const { data, error } = await supabase
      .from('order_items')
      .select('*, order:orders(*)')
      .eq('farmer_id', user.id)
      .order('id', { ascending: false });

    if (error) {
      console.error('Failed to get farmer orders', error);
      throw error;
    }
    return data;
  },

  async checkout(params: {
    customerName: string;
    customerPhone: string;
    deliveryAddress: string;
    district: string;
    pincode: string;
    deliverySlot: string;
    paymentMethod: string;
    orderNotes?: string;
  }) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.rpc('checkout_cart', {
      p_customer_name: params.customerName,
      p_customer_phone: params.customerPhone,
      p_delivery_address: params.deliveryAddress,
      p_district: params.district,
      p_pincode: params.pincode,
      p_delivery_slot: params.deliverySlot,
      p_payment_method: params.paymentMethod,
      p_order_notes: params.orderNotes || '',
    });

    if (error) {
      console.error('Checkout failed', error);
      throw error;
    }

    return data; // Returns order ID
  }
};
