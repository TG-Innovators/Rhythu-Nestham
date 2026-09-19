import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, MapPin, CheckCircle2, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { Product } from '../../lib/types';
import { formatRupee } from '../../lib/utils';
import { EASINGS } from '../../lib/animations';

export interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isInCart = false,
  index = 0,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  // Short row-by-row stagger interval (Row 1: 0, 0.08, 0.16; Row 2: 0.05, 0.13, 0.21)
  const staggerDelay = (index % 3) * 0.08 + Math.floor(index / 3) * 0.05;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.48,
        delay: staggerDelay,
        ease: EASINGS.cinematic,
      }}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-[#12372A]/10 shadow-sm hover:shadow-xl hover:border-[#2E7D32]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden relative will-change-transform"
    >
      {/* Produce Image with Freshness & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#12372A]/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.verified && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#2E7D32] border border-[#2E7D32]/30 shadow-sm backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
              Verified Produce
            </span>
          )}
          {product.organic && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-700 text-white shadow-sm">
              <Sparkles className="w-3 h-3 text-[#E5A83B]" />
              Organic
            </span>
          )}
        </div>

        {/* Freshness pill */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-[#12372A]/85 text-[#F8F5EC] backdrop-blur-sm shadow-sm">
            <Clock className="w-3 h-3 text-[#65A30D]" />
            {product.freshness}
          </span>
        </div>

        {/* Quick View Hover Button */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-4 bottom-12 py-2 rounded-xl bg-white/95 text-[#12372A] font-semibold text-xs shadow-lg backdrop-blur-sm flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-[#12372A] hover:text-white cursor-pointer"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5" />
          Quick View Details
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Farmer Origin */}
          <div className="flex items-center justify-between text-xs text-[#66736A] mb-1.5">
            <span className="font-medium text-[#12372A] hover:underline cursor-pointer truncate max-w-[150px]">
              {product.farmerName}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3 text-[#8B6F47]" />
              {product.location}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-heading font-bold text-base sm:text-lg text-[#12372A] group-hover:text-[#2E7D32] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-[#66736A] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Cart Row */}
        <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-[#12372A]">
                {formatRupee(product.price)}
              </span>
              <span className="text-xs text-[#66736A] font-medium">
                / {product.unit}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-[11px] text-[#66736A] line-through block">
                {formatRupee(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart CTA with Micro-Interaction */}
          <button
            type="button"
            onClick={handleAdd}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200 active:scale-95 cursor-pointer select-none ${
              justAdded
                ? 'bg-[#2E7D32] text-white'
                : isInCart
                ? 'bg-[#12372A]/10 text-[#12372A] hover:bg-[#12372A]/20'
                : 'bg-[#12372A] text-[#F8F5EC] hover:bg-[#2E7D32] shadow-sm'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{justAdded ? 'Added!' : isInCart ? 'In Cart' : 'Add'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
