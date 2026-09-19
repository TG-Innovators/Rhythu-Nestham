import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Product } from '../../lib/types';
import { productsAPI, AuthUser, isVerifiedProducer } from '../../lib/api';
import { Sprout, CheckCircle2, Image as ImageIcon, Sparkles, ShieldCheck, Tag, MapPin, Calendar, Lock } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (newProduct: Product) => void;
  currentUser?: AuthUser | null;
  onOpenJoinModal?: () => void;
  defaultFarmerName?: string;
  defaultLocation?: string;
}

const PRESET_IMAGES = [
  { label: 'Fresh Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
  { label: 'Organic Carrots', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80' },
  { label: 'Sona Masoori Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
  { label: 'Foxtail Millet', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80' },
  { label: 'Natural Turmeric', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80' },
  { label: 'Farm Drip Kit', url: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80' },
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onProductAdded,
  currentUser,
  onOpenJoinModal,
  defaultFarmerName = 'Ramesh Kumar',
  defaultLocation = 'Medak, Telangana',
}) => {
  const isAuthorized = isVerifiedProducer(currentUser);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [price, setPrice] = useState('60');
  const [unit, setUnit] = useState('kg');
  const [farmerName, setFarmerName] = useState(currentUser?.name || defaultFarmerName);
  const [location, setLocation] = useState(currentUser?.district || defaultLocation);
  const [freshness, setFreshness] = useState('Harvested Today');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [isOrganic, setIsOrganic] = useState(true);
  const [isCertified, setIsCertified] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      setError('Only verified producers can publish harvest listings.');
      return;
    }
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const newProd = await productsAPI.addProduct({
        name: name.trim(),
        category,
        price: numPrice,
        unit,
        farmerName: (currentUser?.name || farmerName).trim() || 'Verified Producer',
        farmerId: currentUser?.id || ('producer_' + Math.random().toString(36).substr(2, 6)),
        location: (currentUser?.district || location).trim() || 'Telangana',
        rating: 5.0,
        reviewsCount: 1,
        image: imageUrl,
        freshness,
        verified: true,
        certified: isCertified,
        inStock: true,
        organic: isOrganic,
        description: description.trim() || `Authentic field-grown ${name} directly harvested with zero cold-storage holding.`,
        harvestDate: new Date().toISOString().split('T')[0],
      });

      onProductAdded(newProd);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to add listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setName('');
    setPrice('60');
    setDescription('');
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={isAuthorized ? "List New Agricultural Produce" : "Producer Access Required"}
      maxWidth="md"
    >
      {!isAuthorized ? (
        <div className="text-center py-6 px-2 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#E5A83B]/15 text-[#E5A83B] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-[#E5A83B]" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-lg text-[#12372A]">
              Producer Verification Required
            </h3>
            <p className="text-xs text-[#66736A] max-w-md mx-auto leading-relaxed">
              Listing harvest lots on the Rythu Nestham marketplace is reserved exclusively for verified agricultural producers, certified farmers, and approved farm input suppliers.
            </p>
          </div>

          <div className="p-4 bg-[#F8F5EC] border border-[#12372A]/10 rounded-xl max-w-md mx-auto text-left text-xs text-[#12372A]/80 space-y-2">
            <p className="font-bold text-[#12372A] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
              How to become a verified producer:
            </p>
            <ul className="space-y-1 list-disc list-inside text-[#66736A]">
              <li>Register your farm acreage or agricultural business.</li>
              <li>Undergo our field & quality assurance review.</li>
              <li>Unlock your verified producer dashboard to list fresh harvests.</li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onOpenJoinModal?.();
              }}
            >
              Apply for Producer Verification
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      ) : isSuccess ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="font-heading font-extrabold text-xl text-[#12372A]">
            Harvest Listing Published!
          </h3>
          <p className="text-xs text-[#66736A] max-w-sm mx-auto">
            <strong>{name}</strong> is now live in the Rythu Nestham marketplace with your verified farm audit seal.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button variant="primary" onClick={handleReset}>
              View in Marketplace
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false);
                setName('');
                setPrice('60');
              }}
            >
              List Another Crop
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Row 1: Produce Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Produce Name"
              placeholder="e.g. Country Heirloom Tomatoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<Sprout className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <label htmlFor="prod-category" className="block text-xs font-semibold text-[#12372A] tracking-wide uppercase">
                Category
              </label>
              <select
                id="prod-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white text-[#172019] text-sm rounded-xl border border-[#12372A]/15 py-2.5 px-3 h-11 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains & Millets">Grains & Millets</option>
                <option value="Pulses & Lentils">Pulses & Lentils</option>
                <option value="Organic Specials">Organic Specials</option>
                <option value="Farm Supplies">Farm Supplies & Equipment</option>
              </select>
            </div>
          </div>

          {/* Row 2: Price & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price (in ₹ INR)"
              type="number"
              min="1"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              leftIcon={<Tag className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <label htmlFor="prod-unit" className="block text-xs font-semibold text-[#12372A] tracking-wide uppercase">
                Unit of Sale
              </label>
              <select
                id="prod-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-white text-[#172019] text-sm rounded-xl border border-[#12372A]/15 py-2.5 px-3 h-11 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
              >
                <option value="kg">Per kg</option>
                <option value="500g">Per 500g</option>
                <option value="bunch">Per bunch / kattu</option>
                <option value="quintal">Per quintal (100 kg)</option>
                <option value="liter">Per liter</option>
                <option value="unit">Per unit / piece</option>
              </select>
            </div>
          </div>

          {/* Row 3: Farm Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Farmer / Grower Name"
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              required
            />

            <Input
              label="Farm Location / District"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              leftIcon={<MapPin className="w-4 h-4" />}
              placeholder="e.g. Medak, Telangana"
              required
            />
          </div>

          {/* Row 4: Freshness Status */}
          <div className="space-y-1.5">
            <label htmlFor="prod-freshness" className="block text-xs font-semibold text-[#12372A] tracking-wide uppercase">
              Harvest Freshness Timeline
            </label>
            <select
              id="prod-freshness"
              value={freshness}
              onChange={(e) => setFreshness(e.target.value)}
              className="w-full bg-white text-[#172019] text-sm rounded-xl border border-[#12372A]/15 py-2.5 px-3 h-11 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
            >
              <option value="Harvested Today">Harvested Today (Direct from field)</option>
              <option value="Harvested 4 hrs ago">Harvested 4 hours ago (Peak vitality)</option>
              <option value="Morning Harvest">Morning Harvest (Same-day dispatch)</option>
              <option value="Fresh Single-Origin Crop">Fresh Single-Origin Crop (Season Batch)</option>
            </select>
          </div>

          {/* Image Selector Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#12372A] tracking-wide uppercase">
              Select Produce Photo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`group relative rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-pointer ${
                    imageUrl === preset.url
                      ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/30 scale-95'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white truncate px-1 py-0.5 text-center">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Verification Badges Checklist */}
          <div className="p-3 bg-[#F8F5EC] rounded-xl border border-[#12372A]/10 space-y-2 text-xs">
            <span className="font-bold text-[#12372A] block text-[11px] uppercase tracking-wider">
              Verification Declarations
            </span>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOrganic}
                  onChange={(e) => setIsOrganic(e.target.checked)}
                  className="rounded text-[#2E7D32] focus:ring-[#2E7D32]"
                />
                <span className="text-[#12372A] font-medium">Naturally Grown / Organic</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCertified}
                  onChange={(e) => setIsCertified(e.target.checked)}
                  className="rounded text-[#2E7D32] focus:ring-[#2E7D32]"
                />
                <span className="text-[#12372A] font-medium">Quality Inspected Batch</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              leftIcon={<Sparkles className="w-4 h-4 text-[#E5A83B]" />}
            >
              Publish Harvest Listing
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
