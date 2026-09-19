import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Compass, CheckSquare, ShieldCheck, MessageCircle, CreditCard, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { EASINGS } from '../../lib/animations';

export const ConsumerJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 35%'],
  });

  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    restDelta: 0.001,
  });

  const steps = [
    {
      number: '01',
      title: 'Discover',
      desc: 'Browse harvest crops, seasonal fruits, and staple grains mapped directly to certified local producers.',
      icon: <Compass className="w-5 h-5 text-[#2E7D32]" />,
    },
    {
      number: '02',
      title: 'Choose',
      desc: 'Select harvest lots based on harvest date, farm photos, and nutritional highlights.',
      icon: <CheckSquare className="w-5 h-5 text-[#65A30D]" />,
    },
    {
      number: '03',
      title: 'Verify',
      desc: 'Inspect the digital authenticity audit: GPS location, residue safety status, and grower credentials.',
      icon: <ShieldCheck className="w-5 h-5 text-[#E5A83B]" />,
    },
    {
      number: '04',
      title: 'Connect',
      desc: 'Connect directly with verified farmers to ask questions, coordinate harvest packs, or confirm harvest schedules.',
      icon: <MessageCircle className="w-5 h-5 text-[#2E7D32]" />,
    },
    {
      number: '05',
      title: 'Purchase',
      desc: 'Complete payment with zero hidden middlemen commissions. Transparent prices that support the farmer.',
      icon: <CreditCard className="w-5 h-5 text-[#12372A]" />,
    },
    {
      number: '06',
      title: 'Enjoy Fresh',
      desc: 'Receive natural produce delivered directly to your doorstep with maximum taste, nutrition, and peace of mind.',
      icon: <Sparkles className="w-5 h-5 text-[#E5A83B]" />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Consumer Experience"
          title="From Farm to Your Door."
          subtitle="Experience the joy of knowing exactly who grew your food, when it was picked, and how it was cared for with full transparency."
          align="center"
        />

        {/* Connected Journey Grid */}
        <div ref={containerRef} className="relative mt-12">
          {/* Subtle connecting track line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-[#12372A]/10 -translate-y-1/2 z-0 overflow-hidden">
            <motion.div
              style={{ scaleX: pathProgress }}
              className="h-full w-full bg-gradient-to-r from-[#2E7D32] via-[#65A30D] to-[#E5A83B] origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.52,
                  delay: idx * 0.09,
                  ease: EASINGS.cinematic,
                }}
                className="p-6 rounded-3xl bg-[#F8F5EC]/70 border border-[#12372A]/10 hover:border-[#2E7D32]/40 hover:bg-white hover:shadow-xl transition-all duration-300 relative group will-change-transform"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-6 font-heading font-extrabold text-3xl sm:text-4xl text-[#12372A]/10 group-hover:text-[#2E7D32]/20 transition-colors">
                  {step.number}
                </span>

                {/* Step icon container with pulse on hover */}
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#12372A]/10 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 group-hover:border-[#2E7D32]/30 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3 className="font-heading font-bold text-lg text-[#12372A] group-hover:text-[#2E7D32] transition-colors">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#66736A] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
