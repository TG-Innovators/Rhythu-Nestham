import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Carrot, Apple, Wheat, Bean, Sparkles, Sprout, Milk, Wrench } from 'lucide-react';
import { CATEGORIES_DATA } from '../../lib/mockData';
import { SectionHeading } from '../common/SectionHeading';
import { Category } from '../../lib/types';
import { EASINGS } from '../../lib/animations';

interface CategoryGridProps {
  onSelectCategory: (categorySlug: string) => void;
  selectedCategory: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Carrot: <Carrot className="w-5 h-5" />,
  Apple: <Apple className="w-5 h-5" />,
  Wheat: <Wheat className="w-5 h-5" />,
  Bean: <Bean className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Sprout: <Sprout className="w-5 h-5" />,
  Milk: <Milk className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8F5EC] border-t border-[#12372A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Marketplace Categories"
          title="Discover What’s Fresh."
          subtitle="Explore seasonal harvest crops, unadulterated staple grains, and verified agricultural equipment sourced directly from certified rural producers."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-10">
          {CATEGORIES_DATA.map((cat: Category, index: number) => {
            const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();

            return (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: EASINGS.cinematic,
                }}
                className={`group relative text-left rounded-2xl sm:rounded-3xl overflow-hidden bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/30 shadow-md'
                    : 'border-[#12372A]/10 hover:border-[#2E7D32]/40'
                }`}
              >
                {/* Image Container with Controlled Zoom Effect (1 -> 1.04) */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-[#12372A]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] opacity-90 will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-[#F8F5EC]/95 backdrop-blur-sm text-[#12372A] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                    {categoryIcons[cat.icon] || <Sprout className="w-5 h-5" />}
                  </div>

                  {/* Listing count indicator */}
                  <div className="absolute bottom-3 left-4 text-[11px] font-semibold text-[#E5A83B] uppercase tracking-wider">
                    {cat.itemCount} Verified Listings
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading font-bold text-base sm:text-lg text-[#12372A] group-hover:text-[#2E7D32] transition-colors">
                        {cat.name}
                      </h3>
                      <div className="w-7 h-7 rounded-full bg-[#12372A]/5 group-hover:bg-[#2E7D32] group-hover:text-white flex items-center justify-center text-[#12372A] transition-colors duration-200">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-[#66736A] leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-[#2E7D32] group-hover:underline">
                    <span>Browse Category</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
