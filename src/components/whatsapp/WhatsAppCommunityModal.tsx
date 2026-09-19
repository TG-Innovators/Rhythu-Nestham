import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MessageCircle, Users, Sprout, ShoppingBag, Wrench, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { BRAND } from '../../lib/constants';

interface WhatsAppCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'consumer' | 'farmer' | 'supplier';
}

export const WhatsAppCommunityModal: React.FC<WhatsAppCommunityModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'consumer',
}) => {
  const [selectedCircle, setSelectedCircle] = useState<'consumer' | 'farmer' | 'supplier'>(defaultRole);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const circles = [
    {
      id: 'farmer' as const,
      title: 'Farmers & Growers Circle',
      members: '2,400+ Farmers',
      description: 'Daily mandi rate benchmarks, weather advisory, soil treatment advice, and bulk buyer leads.',
      icon: Sprout,
      whatsappUrl: `https://wa.me/919876543210?text=${encodeURIComponent('Hello Rythu Nestham! I am a Farmer and would like to join the Farmers WhatsApp Circle.')}`,
    },
    {
      id: 'consumer' as const,
      title: 'Fresh Harvest Consumers Club',
      members: '5,800+ Families',
      description: 'Daily harvest alerts, farm-origin photos, seasonal fruit drops, and direct farm cluster group discounts.',
      icon: ShoppingBag,
      whatsappUrl: `https://wa.me/919876543210?text=${encodeURIComponent('Hello Rythu Nestham! I am a Consumer and would like to receive daily fresh farm harvest notifications.')}`,
    },
    {
      id: 'supplier' as const,
      title: 'Agri Machinery & Equipment Hub',
      members: '680+ Partners',
      description: 'Drip irrigation inventory, certified non-GMO seed lots, bio-fertilizer distribution, and tractor pooling.',
      icon: Wrench,
      whatsappUrl: `https://wa.me/919876543210?text=${encodeURIComponent('Hello Rythu Nestham! I am an Agri Supplier and would like to join the Equipment & Inputs WhatsApp group.')}`,
    },
  ];

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setPhone('');
    onClose();
  };

  const currentCircle = circles.find((c) => c.id === selectedCircle) || circles[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Join Rythu Nestham WhatsApp Community"
      maxWidth="md"
    >
      <div className="space-y-5">
        <p className="text-xs text-[#66736A] leading-relaxed">
          Connect directly with thousands of verified farmers, rural aggregators, and conscientious consumers across Telangana and Andhra Pradesh.
        </p>

        {/* Circle Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {circles.map((circle) => {
            const Icon = circle.icon;
            const isSelected = selectedCircle === circle.id;
            return (
              <button
                key={circle.id}
                type="button"
                onClick={() => setSelectedCircle(circle.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#2E7D32] bg-[#2E7D32]/10 shadow-sm ring-1 ring-[#2E7D32]'
                    : 'border-[#12372A]/15 bg-white hover:border-[#12372A]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#2E7D32] text-white' : 'bg-gray-100 text-[#12372A]'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#65A30D] bg-[#65A30D]/10 px-2 py-0.5 rounded-full">
                    {circle.members}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-xs text-[#12372A]">
                  {circle.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Circle Card */}
        <div className="p-4 rounded-2xl bg-[#F8F5EC] border border-[#12372A]/10 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5A83B]">
                Active Channel
              </span>
              <h4 className="font-heading font-extrabold text-base text-[#12372A]">
                {currentCircle.title}
              </h4>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#2E7D32] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Spam Guarantee</span>
            </div>
          </div>

          <p className="text-xs text-[#66736A] leading-relaxed">
            {currentCircle.description}
          </p>

          <div className="pt-2">
            <a
              href={currentCircle.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Launch & Join in WhatsApp Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Secondary: Request SMS/WhatsApp Invite Link */}
        <div className="border-t border-gray-200 pt-4">
          <span className="text-xs font-semibold text-[#12372A] block mb-2">
            Or receive the private invitation link on your phone:
          </span>

          {submitted ? (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Invitation dispatched! Check your WhatsApp/SMS on {phone}.</span>
            </div>
          ) : (
            <form onSubmit={handlePhoneSubmit} className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="+91 98765 43210"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                Send Invite
              </Button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};
