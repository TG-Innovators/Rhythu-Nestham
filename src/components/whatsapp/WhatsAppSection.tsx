import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCheck, PhoneCall, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { EASINGS } from '../../lib/animations';

interface WhatsAppSectionProps {
  onOpenCommunityModal?: () => void;
}

export const WhatsAppSection: React.FC<WhatsAppSectionProps> = ({ onOpenCommunityModal }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#12372A] text-[#F8F5EC] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#2E7D32]/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASINGS.cinematic }}
            className="lg:col-span-6 space-y-6 will-change-transform"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-semibold text-[#25D366]">
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Commerce</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F8F5EC] leading-tight">
              Connect Without the Complication.
            </h2>

            <p className="text-base sm:text-lg text-[#F8F5EC]/80 leading-relaxed font-normal">
              Farming is personal. Instead of rigid automated chatbots, Rythu Nestham connects you directly with farmers and agricultural equipment providers on WhatsApp — the tool every grower already uses daily.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-[#F8F5EC]/85">
                  <strong>Ask About Harvest Timings:</strong> Confirm whether leafy greens were harvested this morning or yesterday evening.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-[#F8F5EC]/85">
                  <strong>Negotiate Bulk Crates:</strong> Coordinate 20kg+ orders for societies, events, or restaurant kitchens with tailored rates.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-[#F8F5EC]/85">
                  <strong>Direct Equipment Guidance:</strong> Chat with suppliers to choose the right drip-irrigation sizing for your specific acre slope.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#25D366] text-white hover:bg-[#20ba59] shadow-lg shadow-[#25D366]/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat with Farm Support</span>
              </a>

              {onOpenCommunityModal && (
                <button
                  type="button"
                  onClick={onOpenCommunityModal}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-[#F8F5EC] border border-white/15 transition-all cursor-pointer"
                >
                  <span>Join WhatsApp Community</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Column: Premium Realistic Smartphone Mockup with Rising & Sequential Message Animation */}
          <div className="lg:col-span-6 flex justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 55 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: EASINGS.cinematic }}
              className="relative will-change-transform"
            >
              {/* Inner Gentle Float */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-72 sm:w-80 h-[520px] rounded-[44px] bg-gradient-to-b from-[#1a4d3b] to-[#12372A] p-3 shadow-2xl border-4 border-white/20 relative"
              >
                {/* Phone Speaker Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#172019] rounded-full z-20" />

                {/* Screen Inner */}
                <div className="w-full h-full bg-[#ECE5DD] rounded-[34px] overflow-hidden flex flex-col justify-between pt-8 text-[#172019] shadow-inner font-sans">
                  {/* Chat Top Bar */}
                  <div className="bg-[#075E54] text-white p-3 flex items-center gap-2.5 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-xs">
                      RN
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold leading-tight truncate">
                        Ramesh Kumar (Farmer)
                      </h4>
                      <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                        Verified Seller • Online
                      </span>
                    </div>
                    <PhoneCall className="w-4 h-4 opacity-75" />
                  </div>

                  {/* Conversation Stream with Sequential Message Reveals */}
                  <div className="p-3 space-y-3 text-[11px] overflow-hidden">
                    {/* Message 1: Buyer message */}
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.35, ease: EASINGS.smooth }}
                      className="bg-white p-2.5 rounded-xl rounded-tl-none shadow-sm max-w-[85%] border border-black/5"
                    >
                      <p className="text-gray-800">
                        Namaste Ramesh ji! Are the vine tomatoes listed today harvested this morning? Looking for 10 kg.
                      </p>
                      <span className="text-[9px] text-gray-400 block text-right mt-1">
                        08:14 AM
                      </span>
                    </motion.div>

                    {/* Message 2: Farmer reply */}
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.75, ease: EASINGS.smooth }}
                      className="bg-[#DCF8C6] p-2.5 rounded-xl rounded-tr-none shadow-sm max-w-[85%] ml-auto border border-[#b6e59c]/50"
                    >
                      <p className="text-gray-800">
                        Namaste! Yes, plucked at 5:45 AM from Medak block 2. 100% pesticide-free.
                      </p>
                      <div className="mt-1.5 p-1.5 bg-white/70 rounded-lg text-[10px] text-[#2E7D32] font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Rythu Nestham Audit #RN-8492</span>
                      </div>
                      <span className="text-[9px] text-gray-500 block text-right mt-1 flex items-center justify-end gap-0.5">
                        08:16 AM <CheckCheck className="w-3 h-3 text-blue-500" />
                      </span>
                    </motion.div>

                    {/* Message 3: Buyer confirmation */}
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 1.15, ease: EASINGS.smooth }}
                      className="bg-white p-2.5 rounded-xl rounded-tl-none shadow-sm max-w-[85%] border border-black/5"
                    >
                      <p className="text-gray-800">
                        Wonderful! Placing the order right now via the platform link.
                      </p>
                      <span className="text-[9px] text-gray-400 block text-right mt-1">
                        08:17 AM
                      </span>
                    </motion.div>
                  </div>

                  {/* Simulated Input Bar */}
                  <div className="p-2 bg-[#F0F0F0] border-t border-gray-200 flex items-center gap-2 text-gray-400 text-xs">
                    <div className="flex-1 bg-white py-1.5 px-3 rounded-full border border-gray-300 text-[11px] text-gray-600">
                      Type a message...
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#075E54] flex items-center justify-center text-white">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Trust Indicator beside mockup */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.85, ease: EASINGS.smooth }}
              className="absolute -bottom-4 right-2 sm:right-6 bg-white text-[#12372A] p-3.5 rounded-2xl shadow-xl border border-white/80 hidden sm:flex items-center gap-3 z-30 will-change-transform"
            >
              <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 flex items-center justify-center text-[#0d7a36]">
                <Sparkles className="w-5 h-5 text-[#0d7a36]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#12372A]">Instant Verification</p>
                <p className="text-[11px] text-[#66736A]">Direct Farmer Dialogues</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
