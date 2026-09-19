import React, { useState } from 'react';
import { Product } from '../../lib/types';
import { Modal } from '../common/Modal';
import { formatRupee } from '../../lib/utils';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  CheckCircle2,
  MapPin,
  Clock,
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  Info,
} from 'lucide-react';
import { BRAND } from '../../lib/constants';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name} maxWidth="2xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product Image & Freshness Tag */}
        <div className="md:col-span-6">
          <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#12372A]/10 bg-[#12372A]/5">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white text-[#2E7D32] shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Farm Listing
                </span>
              )}
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#12372A]/90 text-[#F8F5EC] backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 text-[#65A30D]" />
                {product.freshness}
              </span>
            </div>
          </div>

          {/* Traceability Guarantee Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-[#2E7D32]/5 border border-[#2E7D32]/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-bold text-[#12372A]">Rythu Nestham Quality Seal</p>
              <p className="text-[#66736A] mt-0.5 leading-relaxed">
                Inspected for harvest freshness, farm GPS coordinate authenticity, and chemical residue compliance.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Ordering */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            {/* Category & Origin */}
            <div className="flex items-center justify-between text-xs text-[#66736A]">
              <span className="uppercase tracking-wider font-semibold text-[#2E7D32]">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-[#8B6F47] font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {product.location}, India
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-2xl text-[#12372A] mt-1">
              {product.name}
            </h3>

            {/* Farmer Citation */}
            <div className="mt-2 text-xs text-[#66736A] flex items-center gap-2">
              <span>Cultivated by:</span>
              <span className="font-bold text-[#12372A] underline decoration-[#2E7D32]/30">
                {product.farmerName}
              </span>
            </div>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-heading font-extrabold text-3xl text-[#12372A]">
                {formatRupee(product.price * quantity)}
              </span>
              <span className="text-sm text-[#66736A]">
                ({formatRupee(product.price)} / {product.unit})
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-[#66736A] leading-relaxed">
              {product.description}
            </p>

            {/* Produce metadata bullets */}
            <div className="mt-4 space-y-2 text-xs border-y border-gray-100 py-3 text-[#172019]">
              <div className="flex items-center justify-between">
                <span className="text-[#66736A]">Harvested:</span>
                <span className="font-semibold">{product.harvestDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#66736A]">Minimum Order:</span>
                <span className="font-semibold">{product.minimumOrder || '1 unit'}</span>
              </div>
              {product.nutritionalHighlight && (
                <div className="flex items-center justify-between">
                  <span className="text-[#66736A]">Highlight:</span>
                  <span className="font-semibold text-[#2E7D32]">
                    {product.nutritionalHighlight}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#12372A]">
                Quantity ({product.unit}):
              </span>
              <div className="flex items-center border border-[#12372A]/20 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-[#12372A] hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-[#12372A] min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-[#12372A] hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleAddToCart}
              leftIcon={<ShoppingCart className="w-4 h-4" />}
            >
              {added ? 'Added to Cart!' : `Add to Cart • ${formatRupee(product.price * quantity)}`}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
