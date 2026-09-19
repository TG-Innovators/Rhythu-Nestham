import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import {
  FileCheck,
  Search,
  UserCheck,
  Award,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { VERIFICATION_STEPS } from '../../lib/mockData';
import { SectionHeading } from '../common/SectionHeading';
import { EASINGS } from '../../lib/animations';

const stepIcons: Record<string, React.ReactNode> = {
  FileCheck: <FileCheck className="w-6 h-6" />,
  SearchCheck: <Search className="w-6 h-6" />,
  UserCheck: <UserCheck className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
};

export const VerificationTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Measure scroll through the timeline section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 40%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="verification" className="py-20 sm:py-28 bg-[#12372A] text-[#F8F5EC] relative overflow-hidden">
      {/* Subtle organic gradient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#2E7D32]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#E5A83B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Verification & Certification System"
          title="Every Listing Has a Story. Every Product Has Proof."
          subtitle="We believe digital trust begins at the soil. Before any produce or farm input is published, it passes through our multi-tier verification process to protect consumers and reward honest farmers."
          align="center"
          dark
        />

        {/* Verification Guarantee Badges Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASINGS.cinematic }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2E7D32]/30 text-[#F8F5EC] border border-[#65A30D]/40 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-[#65A30D]" />
            ✓ Verified Farmer
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5A83B]/20 text-[#F8F5EC] border border-[#E5A83B]/40 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#E5A83B]" />
            ✓ Verified Product
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-[#F8F5EC] border border-white/25 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#F8F5EC]" />
            ✓ Certified Listing
          </span>
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative mt-8">
          {/* Desktop Connecting Background Line */}
          <div className="hidden lg:block absolute top-8 left-12 right-12 h-1 bg-white/10 rounded-full z-0 overflow-hidden">
            {/* Animated Scroll-Linked Progress Fill Line */}
            <motion.div
              style={{ scaleX: smoothProgress }}
              className="h-full w-full bg-gradient-to-r from-[#2E7D32] via-[#65A30D] to-[#E5A83B] origin-left shadow-lg shadow-[#65A30D]/50"
            />
          </div>

          {/* Steps Grid (Responsive Desktop & Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {VERIFICATION_STEPS.map((step, idx) => {
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.12,
                    ease: EASINGS.cinematic,
                  }}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center group cursor-default"
                >
                  {/* Node Circle with Illuminated Glow */}
                  <div className="relative mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#172019] border-2 border-[#65A30D]/50 text-[#65A30D] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-[#E5A83B] group-hover:text-[#E5A83B] group-hover:shadow-[#65A30D]/30 transition-all duration-300 bg-gradient-to-br from-white/10 to-transparent">
                      {stepIcons[step.iconName] || <ShieldCheck className="w-6 h-6" />}
                    </div>

                    {/* Step indicator mini-pill */}
                    <div className="absolute -bottom-2 lg:left-1/2 lg:-translate-x-1/2 px-2 py-0.5 rounded-full bg-[#12372A] border border-[#65A30D]/40 text-[9px] font-bold text-[#E5A83B] uppercase tracking-wider shadow-sm">
                      {idx + 1}
                    </div>
                  </div>

                  {/* Stage Tag */}
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A83B] mt-1">
                    {step.stage}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-[#F8F5EC] mt-1 font-heading group-hover:text-[#65A30D] transition-colors">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-2 text-xs text-[#F8F5EC]/75 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Proof Type Pill */}
                  <div className="mt-3 px-2.5 py-1 rounded-lg bg-white/10 text-[10px] font-medium text-[#F8F5EC]/90 border border-white/10 group-hover:border-[#65A30D]/50 transition-colors">
                    {step.proofType}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ethical Transparency Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASINGS.smooth }}
          className="mt-16 p-4 rounded-2xl bg-white/5 border border-white/10 text-center max-w-2xl mx-auto"
        >
          <p className="text-xs text-[#F8F5EC]/70 leading-relaxed">
            <strong className="text-[#E5A83B]">Transparency Note:</strong> Rythu Nestham conducts independent on-ground agronomic inspections, GPS origin recording, and batch trace audits. We do not claim unaffiliated statutory endorsements unless third-party lab documentation confirms organic certification.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
