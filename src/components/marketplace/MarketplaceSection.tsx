import React, { useState, useMemo } from 'react';
import { Product } from '../../lib/types';
import { SectionHeading } from '../common/SectionHeading';
import { FilterPanel } from './FilterPanel';
import { ProductCard } from './ProductCard';
import { ProductQuickView } from './ProductQuickView';
import { ShoppingBag, Sparkles, RefreshCw, Sprout, ShieldCheck, AlertCircle, Plus, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { AuthUser, isVerifiedProducer } from '../../lib/api';

interface MarketplaceSectionProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  cartProductIds: Set<string>;
  currentUser?: AuthUser | null;
  onOpenAddProduct?: () => void;
  onOpenJoinModal?: () => void;
}

export const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({
  products,
  isLoading = false,
  error = null,
  onRetry,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  cartProductIds,
  currentUser,
  onOpenAddProduct,
  onOpenJoinModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const isAuthorizedProducer = isVerifiedProducer(currentUser);

  const categories = [
    'All',
    'Vegetables',
    'Fruits',
    'Grains & Millets',
    'Pulses & Lentils',
    'Organic Specials',
    'Farm Supplies',
  ];

  const locations = ['all', 'Telangana', 'Andhra Pradesh'];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Price filter
        if (item.price > maxPrice) {
          return false;
        }
        // Category filter
        if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
          if (!item.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
            return false;
          }
        }
        // Location filter
        if (selectedLocation !== 'all' && item.location !== selectedLocation) {
          return false;
        }
        // Verified filter
        if (verifiedOnly && !item.verified) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchFarmer = item.farmerName.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchCategory = item.category.toLowerCase().includes(q);
          if (!matchName && !matchFarmer && !matchDesc && !matchCategory) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedLocation, verifiedOnly, searchQuery, sortBy, maxPrice]);

  const handleResetFilters = () => {
    setSearchQuery('');
    onSelectCategory('all');
    setSelectedLocation('all');
    setVerifiedOnly(false);
    setSortBy('featured');
    setMaxPrice(500);
  };

  const isFiltered = searchQuery || selectedCategory.toLowerCase() !== 'all' || selectedLocation !== 'all' || verifiedOnly || maxPrice < 500;

  return (
    <section id="marketplace" className="py-20 sm:py-28 bg-[#F8F5EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Direct Farm Marketplace"
          title="Fresh Products, Closer to You."
          subtitle="Explore field-verified produce, heirloom pulses, and agricultural gear with authentic origin records. Filter by harvest status, price, location, and certification."
          align="center"
        />

        {/* Dynamic Interactive Filter Panel (only shown when not in error or empty catalog) */}
        {products.length > 0 && (
          <FilterPanel
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={onSelectCategory}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            verifiedOnly={verifiedOnly}
            onVerifiedToggle={() => setVerifiedOnly(!verifiedOnly)}
            sortBy={sortBy}
            onSortChange={setSortBy}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            categories={categories}
            locations={locations}
          />
        )}

        {/* Results Counter & Active Filter Indicators */}
        {products.length > 0 && (
          <div className="flex items-center justify-between text-xs text-[#66736A] mb-6 px-1">
            <span>
              Showing <strong className="text-[#12372A]">{filteredProducts.length}</strong> of{' '}
              {products.length} verified listings
              {maxPrice < 500 && (
                <span className="ml-2 font-semibold text-[#2E7D32]">
                  (Capped at ₹{maxPrice})
                </span>
              )}
            </span>
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#2E7D32] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* State 1: Loading Skeleton */}
        {isLoading && products.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-white border border-[#12372A]/10 p-5 space-y-4 animate-pulse shadow-sm"
              >
                <div className="w-full h-48 bg-[#12372A]/5 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-[#12372A]/10 rounded w-2/3" />
                  <div className="h-3 bg-[#12372A]/5 rounded w-1/2" />
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <div className="h-6 bg-[#12372A]/10 rounded w-1/4" />
                  <div className="h-9 bg-[#2E7D32]/20 rounded-xl w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* State 2: Error State */}
        {!isLoading && error && products.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center border border-red-200 shadow-sm max-w-lg mx-auto my-12 space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg text-[#12372A]">
                Unable to Load Fresh Listings
              </h3>
              <p className="text-xs text-[#66736A] leading-relaxed max-w-sm mx-auto">
                {error || 'We encountered a momentary issue retrieving inventory from the database. Please try refreshing.'}
              </p>
            </div>
            {onRetry && (
              <Button
                variant="primary"
                size="sm"
                onClick={onRetry}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Retry Loading
              </Button>
            )}
          </div>
        )}

        {/* State 3: Genuine Empty State (Catalog has 0 products in Supabase) */}
        {!isLoading && !error && products.length === 0 && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-[#12372A]/10 shadow-sm max-w-2xl mx-auto my-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto ring-8 ring-[#2E7D32]/5">
              <Sprout className="w-10 h-10 text-[#2E7D32]" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#E5A83B]/15 text-[#8F6112] border border-[#E5A83B]/30">
                Fresh Farmgate Catalog
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[#12372A] tracking-tight">
                Fresh Products Coming Soon
              </h3>
              <p className="text-xs sm:text-sm text-[#66736A] leading-relaxed">
                Verified producers will begin listing fresh harvests, heirloom pulses, and agricultural gear directly. Check back soon or join our verified producer network to add the first listing.
              </p>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pb-2 border-y border-[#12372A]/5 text-left text-xs text-[#12372A]">
              <div className="flex items-center gap-2 p-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span className="font-medium">100% Verified Origins</span>
              </div>
              <div className="flex items-center gap-2 p-2">
                <Sparkles className="w-4 h-4 text-[#E5A83B] shrink-0" />
                <span className="font-medium">Direct Harvest to Door</span>
              </div>
              <div className="flex items-center gap-2 p-2">
                <Sprout className="w-4 h-4 text-[#65A30D] shrink-0" />
                <span className="font-medium">Fair Soil Value</span>
              </div>
            </div>

            {/* Role-Sensitive CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              {isAuthorizedProducer ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onOpenAddProduct}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  List First Harvest
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onOpenJoinModal}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Register as a Verified Producer
                </Button>
              )}
            </div>
          </div>
        )}

        {/* State 4: Filter Empty State (Products exist, but 0 match current filter/search) */}
        {!isLoading && !error && products.length > 0 && filteredProducts.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#12372A]/10 max-w-lg mx-auto my-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto mb-2">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#12372A]">
              No listings matched your criteria
            </h3>
            <p className="text-xs text-[#66736A] leading-relaxed">
              Try adjusting your price range (currently max ₹{maxPrice}), changing location, or clearing your search filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="mt-4"
            >
              Reset Filters & Show All
            </Button>
          </div>
        )}

        {/* State 5: Populated Grid */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onAddToCart={(p) => onAddToCart(p, 1)}
                onQuickView={(p) => setQuickViewProduct(p)}
                isInCart={cartProductIds.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};
