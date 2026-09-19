import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, Sparkles, MapPin, Sprout, ShoppingCart } from 'lucide-react';
import { IMAGES } from '../../lib/images';
import { Button } from '../common/Button';
import { EASINGS } from '../../lib/animations';

interface HeroSectionProps {
  onExploreClick: () => void;
  onJoinClick: (role?: 'consumer' | 'farmer' | 'supplier') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onJoinClick,
}) => {
  const [imgSrc, setImgSrc] = useState(IMAGES.heroOrganicFarm.url);
  const { scrollY } = useScroll();

  // Cinematic scroll-linked parallax transforms
  const imageScale = useTransform(scrollY, [0, 700], [1, 1.08]);
  const imageY = useTransform(scrollY, [0, 700], [0, -35]);
  const heroContentY = useTransform(scrollY, [0, 600], [0, -45]);
  const heroOpacity = useTransform(scrollY, [0, 450, 750], [1, 0.85, 0.15]);

  // Differentiated speeds for floating UI cards
  const floatingCard1Y = useTransform(scrollY, [0, 600], [0, -55]);
  const floatingCard2Y = useTransform(scrollY, [0, 600], [0, -25]);
  const floatingCard3Y = useTransform(scrollY, [0, 600], [0, -40]);

  // Ambient lighting subtle parallax
  const bgGlow1Y = useTransform(scrollY, [0, 600], [0, -60]);
  const bgGlow2Y = useTransform(scrollY, [0, 600], [0, 50]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen bg-[#12372A] text-[#F8F5EC] overflow-hidden flex items-center pt-28 pb-20 lg:py-28"
    >
      {/* Ambient background lighting and organic gradients with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: bgGlow1Y }}
          className="absolute -top-[20%] -left-[10%] w-[650px] h-[650px] rounded-full bg-[#2E7D32]/25 blur-[130px]"
        />
        <motion.div
          style={{ y: bgGlow2Y }}
          className="absolute top-[35%] right-[-5%] w-[550px] h-[550px] rounded-full bg-[#E5A83B]/15 blur-[140px]"
        />
        <div className="absolute bottom-[-10%] left-[30%] w-[450px] h-[450px] rounded-full bg-[#65A30D]/15 blur-[110px]" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(248,245,236,0.04)_1px,transparent_1px)] [background-size:32px_32px] opacity-70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Narrative & Direct Actions with Scroll Fade */}
          <motion.div
            style={{ y: heroContentY, opacity: heroOpacity }}
            className="lg:col-span-7 flex flex-col items-start z-10 will-change-transform"
          >
            {/* Trust badge header */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASINGS.cinematic }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-sm"
            >
              <Sprout className="w-4 h-4 text-[#E5A83B]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F8F5EC]">
                From the Farm. With Trust.
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] animate-ping" />
            </motion.div>

            {/* Primary Headline — Fast & Cinematic */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASINGS.cinematic }}
              className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.08] tracking-tight text-[#F8F5EC]"
            >
              Fresh From the Farm.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E5A83B] via-[#F8F5EC] to-[#65A30D] mt-1">
                Trusted by You.
              </span>
            </motion.h1>

            {/* Supporting Copy — Follows at 0.75s */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: EASINGS.cinematic }}
              className="mt-6 text-base sm:text-lg lg:text-xl text-[#F8F5EC]/85 leading-relaxed max-w-2xl font-normal"
            >
              Rythu Nestham connects farmers, consumers, and suppliers through a trusted digital marketplace where quality agricultural products move directly from rural farms to your table with certified verification.
            </motion.p>

            {/* Action CTA Row — Staggered at 0.9s */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASINGS.cinematic }}
              className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <Button
                variant="gold"
                size="lg"
                onClick={onExploreClick}
                className="w-full sm:w-auto shadow-xl shadow-[#E5A83B]/20 text-sm sm:text-base font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                rightIcon={<ShoppingCart className="w-4 h-4" />}
              >
                Explore Marketplace
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onJoinClick('consumer')}
                className="w-full sm:w-auto border-white/25 text-[#F8F5EC] hover:bg-white/10 text-sm sm:text-base transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Join Rythu Nestham
              </Button>

              <button
                type="button"
                onClick={() => onJoinClick('farmer')}
                className="text-xs sm:text-sm font-medium text-[#E5A83B] hover:text-[#F8F5EC] transition-colors inline-flex items-center gap-1.5 py-2 px-1 underline-offset-4 hover:underline cursor-pointer"
              >
                <span>Are you a grower?</span>
                <span className="font-semibold">Become a Verified Farmer →</span>
              </button>
            </motion.div>

            {/* Micro Trust Indicators below CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.45 }}
              className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#F8F5EC]/70"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#65A30D]" />
                <span>Field-Audited Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E5A83B]" />
                <span>Zero Hidden Intermediaries</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#65A30D]" />
                <span>Pan-India Rural Reach</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Layered Cinematic Organic Farm Landscape Visual with Parallax */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Layered Decorative Backdrop Frames */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-[#2E7D32]/40 via-[#E5A83B]/20 to-transparent rounded-[32px] sm:rounded-[40px] blur-sm transform rotate-1 pointer-events-none" />
            <div className="absolute inset-0 bg-[#8B6F47]/20 rounded-[28px] sm:rounded-[36px] -rotate-1 pointer-events-none" />

            {/* Main Visual Container */}
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.18, ease: EASINGS.cinematic }}
              className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border-2 border-white/20 shadow-2xl bg-[#172019] aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] will-change-transform"
            >
              <motion.img
                style={{ scale: imageScale }}
                src={imgSrc}
                alt={IMAGES.heroOrganicFarm.alt}
                onError={() => setImgSrc(IMAGES.heroOrganicFarm.fallback)}
                loading="eager"
                className="w-full h-full object-cover object-center transition-transform duration-700 will-change-transform"
              />

              {/* Gradient lighting vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/90 via-[#12372A]/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#12372A]/40 to-transparent pointer-events-none" />

              {/* Bottom Card Caption */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-[#12372A]/85 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#E5A83B]">
                      Organic Cultivation
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#F8F5EC]">
                      Natural Agro-Ecosystem
                    </h3>
                    <p className="text-xs text-[#F8F5EC]/70 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#65A30D]" />
                      Deccan Agro-Climatic Zone, India
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/40 border border-[#65A30D]/50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#65A30D]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass UI Card 1: Certified Organic Farm (Top Left) */}
            <motion.div
              style={{ y: floatingCard1Y }}
              initial={{ opacity: 0, x: -25, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: 0.42, ease: EASINGS.smooth }}
              className="absolute -top-4 -left-4 sm:-left-6 z-20 bg-white/90 text-[#172019] backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-white/60 flex items-center gap-3 hidden sm:flex will-change-transform"
            >
              <div className="w-9 h-9 rounded-xl bg-[#2E7D32]/15 flex items-center justify-center text-[#2E7D32] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#12372A]">Certified Organic Farm</span>
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                </div>
                <p className="text-[11px] text-[#66736A]">Direct Field Origin</p>
              </div>
            </motion.div>

            {/* Floating Glass UI Card 2: Sustainable Cultivation (Top Right) */}
            <motion.div
              style={{ y: floatingCard2Y }}
              initial={{ opacity: 0, x: 25, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: 0.58, ease: EASINGS.smooth }}
              className="absolute top-12 -right-4 sm:-right-6 z-20 bg-[#12372A]/90 text-[#F8F5EC] backdrop-blur-md rounded-2xl p-3 shadow-xl border border-white/15 flex items-center gap-2.5 hidden sm:flex will-change-transform"
            >
              <Sparkles className="w-4 h-4 text-[#E5A83B]" />
              <div className="text-left">
                <p className="text-xs font-semibold text-[#F8F5EC]">Sustainable Cultivation</p>
                <p className="text-[10px] text-[#65A30D]">Chemical-Free Soil</p>
              </div>
            </motion.div>

            {/* Floating Glass UI Card 3: Fresh From Farm (Bottom Left) */}
            <motion.div
              style={{ y: floatingCard3Y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.72, ease: EASINGS.smooth }}
              className="absolute -bottom-5 -left-3 sm:-left-5 z-20 bg-white/95 text-[#172019] backdrop-blur-md rounded-xl px-3.5 py-2 shadow-lg border border-white/70 flex items-center gap-2 hidden sm:flex will-change-transform"
            >
              <span className="w-2 h-2 rounded-full bg-[#65A30D] animate-pulse" />
              <span className="text-xs font-medium text-[#12372A]">Fresh From Farm Today</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
