import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import { IMAGES } from '../../lib/images';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { EASINGS } from '../../lib/animations';

interface AboutSectionProps {
  onLearnMoreClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMoreClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle selective parallax on the editorial farm photography
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-20, 25]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.98]);
  const insetParallaxY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 sm:py-28 bg-[#F8F5EC] relative overflow-hidden"
    >
      {/* Decorative background accents */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#2E7D32]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#E5A83B]/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Scroll Reveal Sequence */}
        <SectionHeading
          eyebrow="Our Mission & Ecosystem"
          title="A Better Connection Between Farms and Families."
          subtitle="Rythu Nestham is a trusted digital platform bridging farmers, consumers, and suppliers. By validating quality at the farm level, we create dignified livelihoods for growers and transparent, fresh nourishment for homes."
          align="center"
        />

        {/* Editorial Multi-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-12">
          {/* Left Column: Authentic Farm Image Collage with Parallax */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: EASINGS.cinematic }}
              className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11] will-change-transform"
            >
              <motion.img
                style={{ y: imageParallaxY, scale: imageScale }}
                src={IMAGES.farmLandscape.url}
                alt={IMAGES.farmLandscape.alt}
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-[#F8F5EC] z-10">
                <p className="text-xs uppercase tracking-wider text-[#E5A83B] font-bold">
                  Verified Soil & Community
                </p>
                <h4 className="text-base sm:text-lg font-bold">
                  Cultivated with Respect for Earth and Tradition
                </h4>
              </div>
            </motion.div>

            {/* Inset Secondary Image Card with Opposing Parallax */}
            <motion.div
              style={{ y: insetParallaxY }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: 0.25, ease: EASINGS.cinematic }}
              className="absolute -bottom-8 -right-4 sm:-right-6 w-48 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20 hidden sm:block aspect-square will-change-transform"
            >
              <img
                src={IMAGES.harvestHands.url}
                alt={IMAGES.harvestHands.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#12372A]/20" />
            </motion.div>
          </div>

          {/* Right Column: Three Value Cards with Staggered Arrivals */}
          <div className="lg:col-span-6 space-y-5">
            {/* Card 1: Direct Selling */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASINGS.smooth }}
              className="p-6 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center shrink-0 group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-300">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#12372A] group-hover:text-[#2E7D32] transition-colors">
                    Direct Farmer-to-Consumer Fair Trade
                  </h3>
                  <p className="mt-1.5 text-sm text-[#66736A] leading-relaxed">
                    By eliminating non-essential wholesale brokers, farmers receive fair market compensation while families obtain freshly picked vegetables and grains within hours of harvest.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Independent Verification */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.22, ease: EASINGS.smooth }}
              className="p-6 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#12372A]/10 text-[#12372A] flex items-center justify-center shrink-0 group-hover:bg-[#12372A] group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#12372A] group-hover:text-[#2E7D32] transition-colors">
                    Rigorous Listing & Produce Verification
                  </h3>
                  <p className="mt-1.5 text-sm text-[#66736A] leading-relaxed">
                    Every harvest lot undergoes origin verification, pesticide-residue screening, and grower authenticity checks prior to marketplace activation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Supplier Enablement */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.34, ease: EASINGS.smooth }}
              className="p-6 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E5A83B]/15 text-[#916212] flex items-center justify-center shrink-0 group-hover:bg-[#E5A83B] group-hover:text-[#172019] transition-colors duration-300">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#12372A] group-hover:text-[#2E7D32] transition-colors">
                    Agricultural Suppliers & Equipment Ecosystem
                  </h3>
                  <p className="mt-1.5 text-sm text-[#66736A] leading-relaxed">
                    Verified seed producers, drip irrigation companies, and bio-fertilizer innovators directly equip rural growers with modern resources to boost crop yield.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Action link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-2"
            >
              <Button
                variant="outline"
                onClick={onLearnMoreClick}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Learn More About Our Verification Standards
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
