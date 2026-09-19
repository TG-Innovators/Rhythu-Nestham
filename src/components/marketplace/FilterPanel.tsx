import React from 'react';
import { Search, Filter, Check, SlidersHorizontal, Tag } from 'lucide-react';
import { Input } from '../common/Input';

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  verifiedOnly: boolean;
  onVerifiedToggle: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  categories: string[];
  locations: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLocation,
  onLocationChange,
  verifiedOnly,
  onVerifiedToggle,
  sortBy,
  onSortChange,
  maxPrice,
  onMaxPriceChange,
  categories,
  locations,
}) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#12372A]/10 p-4 sm:p-6 shadow-sm mb-8 space-y-4">
      {/* Top Search and Sorter Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1 max-w-lg">
          <Input
            placeholder="Search farm produce, grains, seeds, or farmer name..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="bg-[#F8F5EC]/50"
            aria-label="Search products"
          />
        </div>

        {/* Secondary Controls: Location, Verified Toggle, Price Slider & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Price Range Slider */}
          <div className="flex items-center gap-2 bg-[#F8F5EC]/60 border border-[#12372A]/15 px-3 py-1.5 rounded-xl text-xs">
            <Tag className="w-3.5 h-3.5 text-[#2E7D32]" />
            <div className="flex flex-col">
              <span className="text-[10px] text-[#66736A] font-semibold">Max Price: ₹{maxPrice}</span>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(Number(e.target.value))}
                className="w-24 sm:w-28 accent-[#2E7D32] h-1.5 cursor-pointer"
                aria-label="Filter by maximum price"
              />
            </div>
          </div>

          {/* Location Selector */}
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="h-11 px-3 py-2 rounded-xl text-xs font-medium bg-[#F8F5EC]/50 border border-[#12372A]/15 text-[#12372A] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            aria-label="Filter by location"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === 'all' ? '📍 All Locations' : `📍 ${loc}`}
              </option>
            ))}
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-11 px-3 py-2 rounded-xl text-xs font-medium bg-[#F8F5EC]/50 border border-[#12372A]/15 text-[#12372A] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            aria-label="Sort products"
          >
            <option value="featured">✨ Featured Listings</option>
            <option value="price-asc">₹ Price: Low to High</option>
            <option value="price-desc">₹ Price: High to Low</option>
            <option value="rating">⭐ Highest Rated</option>
          </select>

          {/* Verified Only Toggle */}
          <button
            type="button"
            onClick={onVerifiedToggle}
            className={`h-11 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border cursor-pointer ${
              verifiedOnly
                ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-sm'
                : 'bg-white text-[#12372A] border-[#12372A]/20 hover:border-[#2E7D32]'
            }`}
            aria-pressed={verifiedOnly}
          >
            <div
              className={`w-4 h-4 rounded flex items-center justify-center ${
                verifiedOnly ? 'bg-white text-[#2E7D32]' : 'border border-gray-300'
              }`}
            >
              {verifiedOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>Verified Only</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="pt-2 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#66736A] shrink-0 mr-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Categories:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#12372A] text-[#F8F5EC] shadow-sm font-semibold'
                  : 'bg-[#F8F5EC] text-[#12372A] hover:bg-[#12372A]/10 border border-transparent'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
