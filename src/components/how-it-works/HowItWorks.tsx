import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sprout, Wrench, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

interface HowItWorksProps {
  onJoinClick: (role: 'consumer' | 'farmer' | 'supplier') => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onJoinClick }) => {
  const [activeTab, setActiveTab] = useState<'consumer' | 'farmer' | 'supplier'>('consumer');

  const workflows = {
    consumer: {
      title: 'For Consumers & Families',
      subtitle: 'Nourish your household with inspected, chemical-free produce delivered directly from verified growers.',
      cta: 'Start Buying Fresh Farm Produce',
      steps: [
        {
          step: '1',
          name: 'Discover',
          desc: 'Browse by seasonal category, location, or farmer profile. View real photos and harvest dates.',
        },
        {
          step: '2',
          name: 'Verify',
          desc: 'Review the digital verification badge, grower background, and chemical safety check results.',
        },
        {
          step: '3',
          name: 'Connect',
          desc: 'Coordinate batch quantities and delivery specifics directly with verified regional growers.',
        },
        {
          step: '4',
          name: 'Buy & Enjoy',
          desc: 'Complete secure transparent checkout and receive fresh, unadulterated produce right at your door.',
        },
      ],
    },
    farmer: {
      title: 'For Farmers & Collectives',
      subtitle: 'Eliminate middlemen fees, build digital trust, and connect directly with thousands of conscious consumers.',
      cta: 'Register as a Verified Farmer',
      steps: [
        {
          step: '1',
          name: 'Register',
          desc: 'Create your digital farm profile in minutes. Add your location, land acreage, and crop details.',
        },
        {
          step: '2',
          name: 'List Harvest',
          desc: 'Submit photos of your harvest lot, set your fair price, and specify harvest timings.',
        },
        {
          step: '3',
          name: 'Get Verified',
          desc: 'Undergo our fast verification check to earn trust badges that make your listings stand out.',
        },
        {
          step: '4',
          name: 'Sell & Earn',
          desc: 'Receive direct orders, coordinate verified buyer inquiries, and receive payments promptly.',
        },
      ],
    },
    supplier: {
      title: 'For Agricultural Suppliers',
      subtitle: 'Market certified seeds, modern irrigation equipment, and organic farm inputs to active growers.',
      cta: 'Register as an Approved Supplier',
      steps: [
        {
          step: '1',
          name: 'Register',
          desc: 'Submit your agricultural enterprise credentials, product catalogs, and quality guarantees.',
        },
        {
          step: '2',
          name: 'Add Products',
          desc: 'List irrigation kits, seeds, tools, and organic bio-inputs with clear technical specifications.',
        },
        {
          step: '3',
          name: 'Connect',
          desc: 'Engage with progressive farmers looking for modern inputs to increase crop yield sustainably.',
        },
        {
          step: '4',
          name: 'Earn & Scale',
          desc: 'Fulfill bulk orders, provide verified technical guidance, and expand rural market reach.',
        },
      ],
    },
  };

  const currentWorkflow = workflows[activeTab];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#F8F5EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Ecosystem Pathways"
          title="How Rythu Nestham Works."
          subtitle="Designed for all three stakeholders of the agricultural ecosystem: consumers seeking pure food, farmers building independence, and suppliers equipping the land."
          align="center"
        />

        {/* Segmented Audience Tab Bar with layoutId animated pill */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#12372A]/15 shadow-sm relative">
            <button
              type="button"
              onClick={() => setActiveTab('consumer')}
              className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'consumer' ? 'text-[#F8F5EC]' : 'text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              {activeTab === 'consumer' && (
                <motion.div
                  layoutId="how-it-works-active-tab"
                  className="absolute inset-0 bg-[#12372A] rounded-xl shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <User className="w-4 h-4" />
              <span>For Consumers</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('farmer')}
              className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'farmer' ? 'text-white' : 'text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              {activeTab === 'farmer' && (
                <motion.div
                  layoutId="how-it-works-active-tab"
                  className="absolute inset-0 bg-[#2E7D32] rounded-xl shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Sprout className="w-4 h-4" />
              <span>For Farmers</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('supplier')}
              className={`relative z-10 flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'supplier' ? 'text-[#172019]' : 'text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              {activeTab === 'supplier' && (
                <motion.div
                  layoutId="how-it-works-active-tab"
                  className="absolute inset-0 bg-[#E5A83B] rounded-xl shadow-md -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Wrench className="w-4 h-4" />
              <span>For Suppliers</span>
            </button>
          </div>
        </div>

        {/* Animated Workflow Body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 bg-white rounded-3xl border border-[#12372A]/10 p-6 sm:p-10 shadow-sm"
          >
            <div className="text-center max-w-xl mx-auto mb-10">
              <h3 className="font-heading font-extrabold text-2xl text-[#12372A]">
                {currentWorkflow.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#66736A] leading-relaxed">
                {currentWorkflow.subtitle}
              </p>
            </div>

            {/* 4 Connected Step Cards with staggered entrance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {currentWorkflow.steps.map((s, idx) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5 rounded-2xl bg-[#F8F5EC]/60 border border-[#12372A]/10 flex flex-col justify-between hover:border-[#2E7D32]/40 transition-colors"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#12372A] text-[#F8F5EC] flex items-center justify-center font-heading font-bold text-xs mb-4">
                      {s.step}
                    </div>
                    <h4 className="font-heading font-bold text-base text-[#12372A]">
                      {s.name}
                    </h4>
                    <p className="mt-2 text-xs text-[#66736A] leading-relaxed">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-[11px] font-semibold text-[#2E7D32]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Flow</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="mt-10 text-center">
              <Button
                variant={activeTab === 'farmer' ? 'secondary' : activeTab === 'supplier' ? 'gold' : 'primary'}
                size="lg"
                onClick={() => onJoinClick(activeTab)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {currentWorkflow.cta}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
