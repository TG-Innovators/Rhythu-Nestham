import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Wrench, Droplets, FlaskConical, Shovel, ArrowRight, ShieldCheck, Star, MapPin } from 'lucide-react';
import { SUPPLIERS_DATA } from '../../lib/mockData';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

interface SupplierSectionProps {
  onJoinSupplier: () => void;
}

export const SupplierSection: React.FC<SupplierSectionProps> = ({ onJoinSupplier }) => {
  const supplierCategories = [
    {
      title: 'Certified Seeds & Saplings',
      desc: 'Indigenous non-GMO seeds, high-yield grain cultivars, and tested vegetable seed kits.',
      icon: <Sprout className="w-5 h-5 text-[#65A30D]" />,
    },
    {
      title: 'Micro-Irrigation & Solar Pumps',
      desc: 'Gravity-fed drip kits, misting nozzles, solar pump setups, and filtration assemblies.',
      icon: <Droplets className="w-5 h-5 text-[#2E7D32]" />,
    },
    {
      title: 'Bio-Fertilizers & Soil Boosters',
      desc: 'Fortified vermicompost, mycorrhizae fungi, neem cake, and bio-pesticides.',
      icon: <FlaskConical className="w-5 h-5 text-[#E5A83B]" />,
    },
    {
      title: 'Modern Farm Implements',
      desc: 'Ergonomic weeders, portable sprayers, seeders, and solar insect traps.',
      icon: <Wrench className="w-5 h-5 text-[#8B6F47]" />,
    },
  ];

  return (
    <section id="suppliers" className="py-20 sm:py-28 bg-[#12372A] text-[#F8F5EC] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#65A30D]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#E5A83B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Agricultural Suppliers"
          title="A Marketplace for Suppliers Too."
          subtitle="Suppliers can list agricultural equipment, certified seeds, organic inputs, and precision tools while creating sustainable business relationships across the Rythu Nestham ecosystem."
          align="center"
          dark
        />

        {/* Categories Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
          {supplierCategories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E5A83B]/40 transition-colors backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                {cat.icon}
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-[#F8F5EC]">
                {cat.title}
              </h4>
              <p className="mt-1.5 text-xs text-[#F8F5EC]/70 leading-relaxed">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Verified Suppliers Directory Preview with text entering from right */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 will-change-transform"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E5A83B]">
                Partner Directory
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F8F5EC] mt-1">
                Approved Agricultural Suppliers
              </h3>
            </div>
            <Button
              variant="gold"
              size="sm"
              onClick={onJoinSupplier}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Become a Supplier
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPLIERS_DATA.map((sup, idx) => (
              <motion.div
                key={sup.id}
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#172019] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#65A30D]/50 transition-all duration-300 hover:-translate-y-1 will-change-transform"
              >
                <div className="h-36 relative overflow-hidden bg-black/20">
                  <img
                    src={sup.image}
                    alt={sup.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 will-change-transform"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#12372A]/90 text-[#65A30D] border border-[#65A30D]/30 backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3" /> Verified Partner
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-[#E5A83B] block">
                      {sup.category}
                    </span>
                    <h4 className="font-heading font-bold text-base text-[#F8F5EC] mt-0.5">
                      {sup.name}
                    </h4>
                    <p className="text-xs text-[#F8F5EC]/65 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-[#65A30D]" />
                      {sup.location}, {sup.state}
                    </p>
                    <p className="text-xs text-[#F8F5EC]/70 mt-2 line-clamp-2 leading-relaxed">
                      {sup.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[#F8F5EC]/60">
                      {sup.productsCount} catalog items
                    </span>
                    <div className="flex items-center gap-1 text-[#E5A83B] font-bold">
                      <Star className="w-3 h-3 fill-[#E5A83B]" />
                      <span>{sup.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
