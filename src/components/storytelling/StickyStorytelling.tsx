import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, ShieldCheck, MessageCircle, Banknote, ArrowRight } from 'lucide-react';
import { IMAGES } from '../../lib/images';

export const StickyStorytelling: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'grow',
      tag: 'Step 01',
      title: 'Grow With Pride & Authenticity',
      headline: 'Cultivated in Healthy Soil with Responsible Methods',
      desc: 'Farmers practice traditional intercropping, zero-synthetic fertilizers, and conserve groundwater. Every crop begins with soil nutrition and transparent field management.',
      image: IMAGES.editorial.soilHealth.url,
      icon: <Sprout className="w-5 h-5 text-[#65A30D]" />,
      badge: 'Soil to Seed',
    },
    {
      id: 'verify',
      tag: 'Step 02',
      title: 'Rigorous Farm Audit & Validation',
      headline: 'Every Batch Inspected for Purity and Harvest Date',
      desc: 'Agronomic inspectors review harvest lots, check chemical safety parameters, and generate an authentic digital trace badge before any produce is approved for the catalog.',
      image: IMAGES.harvestHands.url,
      icon: <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />,
      badge: 'Zero Compromise',
    },
    {
      id: 'connect',
      tag: 'Step 03',
      title: 'Direct Producer & Consumer Connection',
      headline: 'Eliminating the Unfair Mandi Layer',
      desc: 'Consumers and institutional buyers connect directly with verified growers through our portal to discuss harvest availability, farm practices, and seasonal produce.',
      image: IMAGES.farmLandscape.url,
      icon: <MessageCircle className="w-5 h-5 text-[#2E7D32]" />,
      badge: 'Real Dialogue',
    },
    {
      id: 'sell',
      tag: 'Step 04',
      title: 'Dignified Financial Return to the Soil',
      headline: 'Fair Compensation Without Exploitative Commissions',
      desc: 'Growers receive direct payments quickly and build loyal customer followings. Money stays where it belongs: in rural farming households and local community economies.',
      image: IMAGES.terraceFarm.url,
      icon: <Banknote className="w-5 h-5 text-[#E5A83B]" />,
      badge: 'Economic Freedom',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F5EC] border-y border-[#12372A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E7D32] bg-[#2E7D32]/10 px-3 py-1 rounded-full">
            The Rythu Nestham Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#12372A] mt-3">
            From the Soil to the Household Table
          </h2>
          <p className="text-sm text-[#66736A] mt-2">
            Click through each phase of our direct farm ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Visual Display */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-[#12372A]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={steps[activeStep].id}
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/85 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge on Image */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#12372A]/90 text-[#F8F5EC] backdrop-blur-md border border-white/20 shadow-lg">
                  {steps[activeStep].icon}
                  {steps[activeStep].badge}
                </span>
              </div>

              {/* Bottom Caption on Image */}
              <div className="absolute bottom-5 left-5 right-5 z-10 text-[#F8F5EC]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5A83B]">
                  {steps[activeStep].tag}
                </span>
                <h4 className="font-heading font-bold text-lg text-white">
                  {steps[activeStep].title}
                </h4>
              </div>
            </div>
          </div>

          {/* Right Column: Progressive Step Navigation Cards */}
          <div className="lg:col-span-6 space-y-3">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? 'bg-white border-[#2E7D32] shadow-lg ring-1 ring-[#2E7D32]/20'
                      : 'bg-white/60 border-[#12372A]/10 hover:bg-white hover:border-[#12372A]/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                          isActive
                            ? 'bg-[#2E7D32] text-white shadow-sm'
                            : 'bg-[#12372A]/10 text-[#12372A]'
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#66736A]">
                          {step.tag}
                        </span>
                        <h4
                          className={`font-heading font-bold text-base ${
                            isActive ? 'text-[#12372A]' : 'text-[#12372A]/80'
                          }`}
                        >
                          {step.title}
                        </h4>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isActive
                          ? 'bg-[#2E7D32]/10 text-[#2E7D32]'
                          : 'text-[#66736A] opacity-0'
                      }`}
                    >
                      Active
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-gray-100"
                    >
                      <h5 className="text-xs font-bold text-[#2E7D32] mb-1">
                        {step.headline}
                      </h5>
                      <p className="text-xs sm:text-sm text-[#66736A] leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
