import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, ShoppingCart, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { EASINGS } from '../../lib/animations';

interface RegistrationCTAProps {
  onSelectRole: (role: 'farmer' | 'consumer' | 'supplier') => void;
}

export const RegistrationCTA: React.FC<RegistrationCTAProps> = ({ onSelectRole }) => {
  const roles = [
    {
      role: 'farmer' as const,
      icon: <Sprout className="w-8 h-8 text-[#2E7D32]" />,
      title: 'I’m a Farmer',
      subtitle: 'Grower & Producer',
      desc: 'Sell directly to consumers and bulk buyers. Eliminate commission leakages, establish your brand, and receive payments quickly.',
      cta: 'Register as Farmer',
      variant: 'secondary' as const,
      badge: 'Zero Platform Listing Fee',
    },
    {
      role: 'consumer' as const,
      icon: <ShoppingCart className="w-8 h-8 text-[#E5A83B]" />,
      title: 'I’m a Consumer',
      subtitle: 'Household & Conscious Buyer',
      desc: 'Order chemical-free vegetables, native rice, and seasonal fruits picked at peak harvest with verifiable farm origin.',
      cta: 'Start Buying Fresh',
      variant: 'gold' as const,
      badge: 'Verified Harvest Delivery',
    },
    {
      role: 'supplier' as const,
      icon: <Wrench className="w-8 h-8 text-[#65A30D]" />,
      title: 'I’m a Supplier',
      subtitle: 'Equipment & Bio-Inputs',
      desc: 'List irrigation equipment, heirloom seed cultivars, organic vermicompost, and precision tools for thousands of progressive farmers.',
      cta: 'Register as Supplier',
      variant: 'primary' as const,
      badge: 'Direct Agritech Reach',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#12372A] text-[#F8F5EC] relative overflow-hidden">
      {/* Dramatic background light bursts */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(248,245,236,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: EASINGS.cinematic }}
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-[#2E7D32]/25 blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, delay: 0.2, ease: EASINGS.cinematic }}
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full bg-[#E5A83B]/15 blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Join the Movement"
          title="Your Place in the Farming Community Starts Here."
          subtitle="Whether you cultivate the soil, supply vital inputs, or nourish your family, Rythu Nestham connects you with trust and transparency."
          align="center"
          dark
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {roles.map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.62,
                delay: 0.15 + idx * 0.14,
                ease: EASINGS.cinematic,
              }}
              className="bg-[#172019] rounded-3xl p-8 border border-white/10 hover:border-[#E5A83B]/50 transition-all duration-300 flex flex-col justify-between group shadow-2xl hover:-translate-y-1.5 will-change-transform"
            >
              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#65A30D] bg-[#65A30D]/15 px-2.5 py-1 rounded-full border border-[#65A30D]/30">
                    {item.badge}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#E5A83B] uppercase tracking-wider">
                  {item.subtitle}
                </span>

                <h3 className="font-heading font-extrabold text-2xl text-[#F8F5EC] mt-1">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-[#F8F5EC]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <Button
                  variant={item.variant}
                  fullWidth
                  size="md"
                  onClick={() => onSelectRole(item.role)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {item.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
