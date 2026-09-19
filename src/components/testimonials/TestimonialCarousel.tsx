import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, ShieldCheck, MapPin } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../lib/mockData';
import { SectionHeading } from '../common/SectionHeading';
import { EASINGS } from '../../lib/animations';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  // Touch gesture support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  const variants = {
    enter: (d: number) => ({
      opacity: 0,
      x: d > 0 ? 35 : -35,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: EASINGS.cinematic,
      },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d > 0 ? -35 : 35,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: EASINGS.smooth,
      },
    }),
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F8F5EC] border-b border-[#12372A]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Community Voices"
          title="Voices From Our Shared Ecosystem."
          subtitle="Real perspectives from growers, urban households, and agricultural innovators working together."
          align="center"
        />

        {/* Carousel Viewport with Keyboard & Touch listener */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: EASINGS.cinematic }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="max-w-4xl mx-auto mt-12 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D32] rounded-3xl"
          aria-label="Testimonial carousel"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-3xl p-6 sm:p-10 border border-[#12372A]/10 shadow-xl relative will-change-transform"
            >
              {/* Quote Mark Watermark */}
              <Quote className="absolute top-6 right-8 w-16 h-16 text-[#12372A]/5 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#E5A83B] mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E5A83B]" />
                ))}
                <span className="ml-2 text-xs font-bold text-[#12372A]">
                  5.0 Ecosystem Rating
                </span>
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-xl md:text-2xl font-normal text-[#12372A] leading-relaxed italic">
                "{current.quote}"
              </blockquote>

              {/* Author Row */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#12372A]/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-base text-[#12372A]">
                        {current.name}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Verified {current.role}
                      </span>
                    </div>
                    <p className="text-xs text-[#66736A] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#8B6F47]" />
                      {current.location}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-[#F8F5EC] border border-[#12372A]/10 text-xs font-semibold text-[#12372A] self-start sm:self-auto">
                  {current.tag}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls: Prev/Next & Dots */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-[#2E7D32]'
                      : 'w-2.5 bg-[#12372A]/20 hover:bg-[#12372A]/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-11 h-11 rounded-2xl bg-white border border-[#12372A]/15 text-[#12372A] hover:bg-[#12372A] hover:text-white transition-all duration-200 active:scale-95 flex items-center justify-center shadow-sm cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-11 h-11 rounded-2xl bg-white border border-[#12372A]/15 text-[#12372A] hover:bg-[#12372A] hover:text-white transition-all duration-200 active:scale-95 flex items-center justify-center shadow-sm cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
