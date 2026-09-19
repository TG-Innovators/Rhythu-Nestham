import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, AlertCircle, Bell, CheckCircle2, MapPin, ArrowLeft } from 'lucide-react';
import { CartItem } from '../../lib/types';
import { formatRupee } from '../../lib/utils';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { deliveryAPI } from '../../lib/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [view, setView] = useState<'cart' | 'regional_notice'>('cart');
  const [pincode, setPincode] = useState('500001');
  const [phone, setPhone] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistRef, setWaitlistRef] = useState('');
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);


  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsSubmittingWaitlist(true);
    try {
      const res = await deliveryAPI.joinWaitlist(pincode, phone);
      setWaitlistRef(res.refId);
      setWaitlistSubmitted(true);
    } finally {
      setIsSubmittingWaitlist(false);
    }
  };

  const handleClose = () => {
    setView('cart');
    setWaitlistSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#12372A]/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-[#F8F5EC] border-l border-[#12372A]/15 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-5 sm:p-6 border-b border-[#12372A]/10 bg-white/80 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {view === 'regional_notice' && (
                    <button
                      type="button"
                      onClick={() => setView('cart')}
                      className="p-1.5 -ml-2 rounded-lg text-[#12372A] hover:bg-gray-100"
                      aria-label="Back to cart"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div className="w-9 h-9 rounded-xl bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-[#12372A]">
                      {view === 'cart' ? 'Your Harvest Cart' : 'Regional Delivery Check'}
                    </h3>
                    <p className="text-xs text-[#66736A]">
                      {totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''} directly from farm
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-xl text-[#66736A] hover:text-[#12372A] hover:bg-[#12372A]/5 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* View 1: Cart Items */}
              {view === 'cart' ? (
                <>
                  <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                    {items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-[#12372A]/5 flex items-center justify-center text-[#66736A] mb-4">
                          <ShoppingBag className="w-8 h-8 opacity-40" />
                        </div>
                        <h4 className="font-heading font-bold text-base text-[#12372A]">
                          Your Cart is Empty
                        </h4>
                        <p className="mt-1 text-xs text-[#66736A] max-w-xs">
                          Explore our verified farm marketplace to discover freshly harvested seasonal produce and supplies.
                        </p>
                        <Button
                          variant="primary"
                          size="sm"
                          className="mt-6"
                          onClick={handleClose}
                        >
                          Browse Fresh Produce
                        </Button>
                      </div>
                    ) : (
                      items.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="p-3.5 bg-white rounded-2xl border border-[#12372A]/10 shadow-sm flex items-center gap-3.5"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-[#12372A] truncate">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-[#66736A] truncate">
                              From {product.farmerName} • {product.location}
                            </p>
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-xs font-extrabold text-[#12372A]">
                                {formatRupee(product.price * quantity)}
                              </span>
                              <span className="text-[10px] text-[#66736A]">
                                ({formatRupee(product.price)} / {product.unit})
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls & Delete */}
                          <div className="flex flex-col items-end gap-2">
                            <button
                              type="button"
                              onClick={() => onRemoveItem(product.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-[#F8F5EC]">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(product.id, -1)}
                                className="px-2 py-0.5 text-xs font-bold hover:bg-gray-200 cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 text-xs font-semibold">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(product.id, 1)}
                                className="px-2 py-0.5 text-xs font-bold hover:bg-gray-200 cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Drawer Footer Summary */}
                  {items.length > 0 && (
                    <div className="p-5 sm:p-6 border-t border-[#12372A]/10 bg-white space-y-4">
                      <div className="flex items-center justify-between text-xs text-[#66736A]">
                        <span>Subtotal ({totalItemsCount} units)</span>
                        <span className="font-bold text-[#12372A] text-sm">
                          {formatRupee(subtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#66736A]">
                        <span>Direct Farm Freight</span>
                        <span className="text-[#2E7D32] font-semibold">Calculated at Hub</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm font-bold text-[#12372A]">
                        <span>Estimated Total</span>
                        <span className="font-heading font-extrabold text-xl text-[#2E7D32]">
                          {formatRupee(subtotal)}
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        <Button
                          variant="gold"
                          fullWidth
                          size="lg"
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                          onClick={() => setView('regional_notice')}
                        >
                          Proceed to Delivery Check
                        </Button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[11px] text-[#66736A]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                        <span>Protected by Rythu Nestham Verification Guarantee</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* View 2: Regional Delivery Unavailable Notice */
                <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-amber-900">
                          Delivery is currently not available in your region
                        </h4>
                        <p className="mt-1 text-xs text-amber-800/90 leading-relaxed">
                          Rythu Nestham is currently in active farm-pilot mode across select agricultural clusters in Telangana & Andhra Pradesh. Direct doorstep courier delivery is expanding to new localities.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Priority Option: Notify When Available in Pincode */}
                  <div className="p-4 bg-white rounded-2xl border border-[#12372A]/10 shadow-sm space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-[#12372A]">
                        Option 2: Get Notified When Delivery Launches
                      </h4>
                    </div>
                    <p className="text-xs text-[#66736A]">
                      Enter your delivery pincode and mobile number. We will send you an alert as soon as our direct refrigerated farm route opens in your locality:
                    </p>

                    {waitlistSubmitted ? (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-green-700">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Pincode Priority Registered!</span>
                        </div>
                        <p className="text-[11px] text-green-700/80">
                          Reference <strong>{waitlistRef}</strong>. We will alert {phone} once dispatch routes go live in pincode {pincode}.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleJoinWaitlist} className="space-y-3 pt-1">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            label="Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            placeholder="500001"
                            maxLength={6}
                            required
                          />
                          <Input
                            label="Mobile Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            type="tel"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="secondary"
                          fullWidth
                          size="sm"
                          isLoading={isSubmittingWaitlist}
                        >
                          Join Pincode Priority Waitlist
                        </Button>
                      </form>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setView('cart')}
                      className="text-xs text-[#2E7D32] hover:underline font-semibold flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart Items
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
