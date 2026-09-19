import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, MessageCircle, ShieldCheck, MapPin, Mail, Phone, PlusCircle, Users } from 'lucide-react';
import { BRAND } from '../../lib/constants';
import { EASINGS } from '../../lib/animations';

interface FooterProps {
  onOpenAddProduct?: () => void;
}

const columnVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.08,
      ease: EASINGS.cinematic,
    },
  }),
};

export const Footer: React.FC<FooterProps> = ({
  onOpenAddProduct,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-[#12372A] text-[#F8F5EC] pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2E7D32]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E5A83B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10"
        >
          {/* Col 1: Brand & Identity */}
          <motion.div custom={0} variants={columnVariants} className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#12372A] border border-[#65A30D]/40 flex items-center justify-center shadow-md">
                <Sprout className="w-5 h-5 text-[#E5A83B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-[#F8F5EC]">
                  {BRAND.name}
                </span>
                <span className="text-[11px] font-medium tracking-wide text-[#E5A83B]">
                  {BRAND.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F8F5EC]/75 leading-relaxed max-w-sm">
              Connecting farmers, consumers, and suppliers through a trusted Indian agritech digital marketplace where quality agricultural products move directly from rural farms to your table.
            </p>

            <div className="space-y-2 text-xs text-[#F8F5EC]/80 pt-2">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#65A30D]" />
                <span>{BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#65A30D]" />
                <span>{BRAND.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#65A30D]" />
                <span>Deccan Agritech Hub, Telangana, India</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#25D366] text-[#F8F5EC] flex items-center justify-center transition-colors"
                aria-label="Rythu Nestham WhatsApp Helpdesk"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/rythunestham"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#E5A83B] hover:text-[#172019] text-[#F8F5EC] flex items-center justify-center transition-colors"
                aria-label="Rythu Nestham Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/rythunestham"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#2E7D32] text-[#F8F5EC] flex items-center justify-center transition-colors"
                aria-label="Rythu Nestham Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.583 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/rythunestham"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-red-600 text-[#F8F5EC] flex items-center justify-center transition-colors"
                aria-label="Rythu Nestham YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Col 2: Platform */}
          <motion.div custom={1} variants={columnVariants} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A83B]">
              Platform
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F8F5EC]/75">
              <li>
                <a href="#marketplace" className="hover:text-white transition-colors">
                  Fresh Produce
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAddProduct}
                  className="hover:text-white text-left text-xs sm:text-sm text-[#E5A83B] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>List Harvest Crops</span>
                </button>
              </li>
              <li>
                <a href="#farmers" className="hover:text-white transition-colors">
                  Farmer Directory
                </a>
              </li>
              <li>
                <a href="#suppliers" className="hover:text-white transition-colors">
                  Equipment Suppliers
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-white transition-colors">
                  Verification Standards
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 3: Company */}
          <motion.div custom={2} variants={columnVariants} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A83B]">
              Community
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F8F5EC]/75">
              <li>
                <a href="#farmers" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#65A30D] font-medium">
                  <Users className="w-3.5 h-3.5" />
                  <span>Growers & Producers</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Rythu Nestham
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">
                  Stories From the Soil
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">
                  Rural Community Impact
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: Trust & Verification */}
          <motion.div custom={3} variants={columnVariants} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A83B]">
              Trust & Quality
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F8F5EC]/75">
              <li>
                <a href="#verification" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold text-[#65A30D]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verification Protocol</span>
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-white transition-colors">
                  Field Identity Audit
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  Direct Farm Gateway
                </a>
              </li>
              <li>
                <a href="#verification" className="hover:text-white transition-colors">
                  Quality Standards
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 5: Values Box */}
          <motion.div custom={4} variants={columnVariants} className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5A83B]">
              Commitment
            </h4>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#F8F5EC]/80 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#65A30D]">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Inspected</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#F8F5EC]/70">
                Direct farm connections, transparent pricing, and zero adulteration guarantee.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright & Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EC]/60"
        >
          <p>
            © {currentYear} {BRAND.name}. All rights reserved. Made for Indian Agriculture.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Pesticide Safety Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
