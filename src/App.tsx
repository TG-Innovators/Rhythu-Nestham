import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { TrustStrip } from './components/trust/TrustStrip';
import { AboutSection } from './components/about/AboutSection';
import { CategoryGrid } from './components/marketplace/CategoryGrid';
import { MarketplaceSection } from './components/marketplace/MarketplaceSection';
import { VerificationTimeline } from './components/verification/VerificationTimeline';
import { FarmerSection } from './components/farmer/FarmerSection';
import { SupplierSection } from './components/supplier/SupplierSection';
import { StickyStorytelling } from './components/storytelling/StickyStorytelling';
import { ConsumerJourney } from './components/consumer/ConsumerJourney';
import { HowItWorks } from './components/how-it-works/HowItWorks';
import { ImpactStats } from './components/impact/ImpactStats';
import { StoriesSection } from './components/stories/StoriesSection';
import { TestimonialCarousel } from './components/testimonials/TestimonialCarousel';
import { RegistrationCTA } from './components/cta/RegistrationCTA';
import { JoinModal } from './components/cta/JoinModal';
import { AuthModal } from './components/auth/AuthModal';
import { AddProductModal } from './components/marketplace/AddProductModal';
import { Newsletter } from './components/newsletter/Newsletter';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';

import { Product, CartItem } from './lib/types';
import { authAPI, AuthUser, productsAPI, isVerifiedProducer } from './lib/api';

export function App() {
  // Authentication user state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => authAPI.getCurrentUser());

  // Products state (starts with 0 demo/mock products; Supabase is single source of truth)
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  // Global cart state (starts empty)
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinModalRole, setJoinModalRole] = useState<'farmer' | 'consumer' | 'supplier'>('farmer');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Selected category state shared between CategoryGrid and MarketplaceSection
  const [selectedCategory, setSelectedCategory] = useState('All');

  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setProductsError(null);
    try {
      const data = await productsAPI.fetchProducts();
      setProducts(data);
    } catch (err: any) {
      console.error('Failed to load marketplace products:', err);
      setProductsError('Unable to load fresh marketplace products. Please check your connection and retry.');
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open modals with pre-set configurations
  const handleOpenJoinModal = (role: 'farmer' | 'consumer' | 'supplier' = 'farmer') => {
    setJoinModalRole(role);
    setIsJoinModalOpen(true);
  };

  const handleOpenAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    authAPI.logout();
    setCurrentUser(null);
  };

  const handleProductAdded = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    scrollToSection('marketplace');
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartProductIds = new Set(cartItems.map((item) => item.product.id));

  return (
    <div className="min-h-screen bg-[#F8F5EC] text-[#172019] flex flex-col selection:bg-[#2E7D32]/20 selection:text-[#12372A]">
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenJoinModal={handleOpenJoinModal}
        onOpenAuthModal={handleOpenAuthModal}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* 2. Cinematic Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('marketplace')}
          onJoinClick={(role) => handleOpenJoinModal(role || 'consumer')}
        />

        {/* 3. Trust Strip */}
        <TrustStrip />

        {/* 4. About Rythu Nestham */}
        <AboutSection onLearnMoreClick={() => scrollToSection('verification')} />

        {/* 5. Marketplace Categories */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(slug) => {
            const match = products.find(
              (p) => p.category.toLowerCase() === slug.toLowerCase()
            );
            setSelectedCategory(match ? match.category : slug);
            scrollToSection('marketplace');
          }}
        />

        {/* 6. Featured Marketplace with Working Price Filter */}
        <MarketplaceSection
          products={products}
          isLoading={isLoadingProducts}
          error={productsError}
          onRetry={loadProducts}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          cartProductIds={cartProductIds}
          currentUser={currentUser}
          onOpenAddProduct={() => setIsAddProductOpen(true)}
          onOpenJoinModal={() => handleOpenJoinModal('farmer')}
        />

        {/* 7. Product Verification System */}
        <VerificationTimeline />

        {/* 8. Farmer Section */}
        <FarmerSection
          onJoinFarmer={
            isVerifiedProducer(currentUser)
              ? () => setIsAddProductOpen(true)
              : () => handleOpenJoinModal('farmer')
          }
        />

        {/* 9. Supplier Section */}
        <SupplierSection onJoinSupplier={() => handleOpenJoinModal('supplier')} />

        {/* 10. Sticky Storytelling (Grow → Verify → Connect → Sell) */}
        <StickyStorytelling />

        {/* 11. Consumer Journey (6 Steps) */}
        <ConsumerJourney />

        {/* 12. How It Works (Tri-Audience Switcher) */}
        <HowItWorks onJoinClick={(role) => handleOpenJoinModal(role)} />

        {/* 13. Impact Statistics Dashboard */}
        <ImpactStats />

        {/* 14. Stories From the Soil */}
        <StoriesSection />

        {/* 15. Testimonial Carousel */}
        <TestimonialCarousel />

        {/* 16. Multi-Role Registration CTA */}
        <RegistrationCTA onSelectRole={(role) => handleOpenJoinModal(role)} />

        {/* 17. Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* 18. Master Footer */}
      <Footer
        onOpenAddProduct={() => setIsAddProductOpen(true)}
      />

      {/* Cart Drawer with Regional Delivery Notice */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Join / Registration Modal */}
      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        initialRole={joinModalRole}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
      />

      {/* Internal Add Product Modal (Access-controlled for verified producers) */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductAdded={handleProductAdded}
        currentUser={currentUser}
        onOpenJoinModal={() => handleOpenJoinModal('farmer')}
        defaultFarmerName={currentUser?.name || 'Ramesh Kumar'}
        defaultLocation={currentUser?.district || 'Medak, Telangana'}
      />
    </div>
  );
}

export default App;
