import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Handshake, Leaf, Scale, MessageCircle } from 'lucide-react';
import { TRUST_PILLARS } from '../../lib/constants';
import { EASINGS } from '../../lib/animations';

const iconsMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#65A30D]" />,
  Handshake: <Handshake className="w-5 h-5 text-[#E5A83B]" />,
  Leaf: <Leaf className="w-5 h-5 text-[#2E7D32]" />,
  Scale: <Scale className="w-5 h-5 text-[#8B6F47]" />,
  MessageCircle: <MessageCircle className="w-5 h-5 text-[#25D366]" />,
};

export const TrustStrip: React.FC = () => {
  return (
    <section className="relative z-20 -mt-7 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASINGS.cinematic }}
        className="bg-[#F8F5EC] rounded-2xl sm:rounded-3xl border border-[#12372A]/15 shadow-2xl shadow-[#12372A]/8 p-4 sm:p-6 lg:p-8 backdrop-blur-md"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#12372A]/10">
          {TRUST_PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: index * 0.09,
                ease: EASINGS.smooth,
              }}
              className={`flex items-start gap-3.5 p-2 sm:p-3 transition-all duration-300 hover:-translate-y-1 group ${
                index > 0 ? 'pt-4 sm:pt-2' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-[#12372A]/10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                {iconsMap[pillar.icon]}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#12372A] leading-snug group-hover:text-[#2E7D32] transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-[#66736A] leading-relaxed line-clamp-2">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
