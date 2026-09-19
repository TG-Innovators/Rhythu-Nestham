import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, ShieldCheck, Award, ArrowRight, CheckCircle2, Star, MapPin, Calendar, Users } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { EASINGS } from '../../lib/animations';
import { OTHER_FARMERS } from '../../lib/mockData';

interface FarmerSectionProps {
  onJoinFarmer: () => void;
}

const FEATURED_FARMER = {
  id: 'farmer_1',
  name: 'Ramesh Kumar',
  specialty: 'Country Heirloom Tomatoes & Micro-Greens',
  location: 'Medak District, Telangana',
  state: 'Telangana',
  rating: 4.95,
  reviewsCount: 142,
  productsSoldCount: 1240,
  image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=800&q=80',
  verified: true,
  bio: 'Practicing chemical-free natural farming for over 14 years across 8 acres. Certified under PGS-India natural farming standards, utilizing jeevamrutha and multi-cropping.',
  experienceYears: 14,
  acresCultivated: 8,
  primaryCrops: ['Country Tomatoes', 'Palak & Methi', 'Desi Carrots', 'Ridge Gourd'],
};

export const FarmerSection: React.FC<FarmerSectionProps> = ({ onJoinFarmer }) => {
  const [activeFarmerModal, setActiveFarmerModal] = useState<typeof FEATURED_FARMER | null>(null);

  const benefits = [
    {
      title: 'Showcase Your Farm & Legacy',
      desc: 'Build a permanent digital profile displaying your soil practices, crop varieties, and harvest calendar.',
      icon: <Sprout className="w-5 h-5 text-[#65A30D]" />,
    },
    {
      title: 'Pre-Verified Credibility',
      desc: 'Gain customer trust instantly through our rigorous verification badges and batch inspection reports.',
      icon: <ShieldCheck className="w-5 h-5 text-[#E5A83B]" />,
    },
    {
      title: 'Direct Grower Inquiries',
      desc: 'Coordinate bulk harvests, answer verified buyer inquiries, and confirm seasonal pickup schedules directly.',
      icon: <Users className="w-5 h-5 text-[#2E7D32]" />,
    },
  ];

  return (
    <section id="farmers" className="py-20 sm:py-28 bg-[#F8F5EC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Farmer Empowerment"
          title="Helping Farmers Reach More People."
          subtitle="Rythu Nestham provides rural agricultural producers with direct market visibility, verification credentials, and income stability."
          align="center"
        />

        {/* Featured Hero Farmer Spotlight + Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-12">
          {/* Left Column: Featured Farmer Profile Card (Ramesh Kumar) — Rises from bottom */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 36, x: -15 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl border border-[#12372A]/15 shadow-xl overflow-hidden hover:border-[#2E7D32]/40 transition-all duration-300 will-change-transform"
            >
              {/* Farmer Header Image with subtle zoom on hover */}
              <div className="relative h-64 sm:h-72 bg-[#12372A] overflow-hidden">
                <img
                  src={FEATURED_FARMER.image}
                  alt={FEATURED_FARMER.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12372A]/90 via-[#12372A]/30 to-transparent" />

                {/* Verification Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-[#2E7D32] shadow-md">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                    Verified Farmer
                  </span>
                </div>

                {/* Rating Overlay */}
                <div className="absolute top-4 right-4 bg-[#12372A]/80 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-bold text-[#E5A83B] flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-[#E5A83B]" />
                  <span>{FEATURED_FARMER.rating}</span>
                  <span className="text-white/60">({FEATURED_FARMER.reviewsCount})</span>
                </div>

                {/* Farmer Name & Region Overlay */}
                <div className="absolute bottom-4 left-6 right-6 text-[#F8F5EC]">
                  <h3 className="font-heading font-extrabold text-2xl text-[#F8F5EC]">
                    {FEATURED_FARMER.name}
                  </h3>
                  <p className="text-xs text-[#E5A83B] font-semibold mt-0.5">
                    {FEATURED_FARMER.specialty}
                  </p>
                  <p className="text-xs text-[#F8F5EC]/75 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#65A30D]" />
                    {FEATURED_FARMER.location}, {FEATURED_FARMER.state}
                  </p>
                </div>
              </div>

              {/* Farmer Stats Row */}
              <div className="p-6 bg-[#F8F5EC]/50 border-b border-[#12372A]/10 grid grid-cols-3 text-center gap-2">
                <div>
                  <span className="block font-heading font-extrabold text-lg text-[#12372A]">
                    {FEATURED_FARMER.productsSoldCount}+
                  </span>
                  <span className="text-[11px] text-[#66736A] uppercase font-medium">
                    Products Sold
                  </span>
                </div>
                <div className="border-x border-[#12372A]/10">
                  <span className="block font-heading font-extrabold text-lg text-[#12372A]">
                    {FEATURED_FARMER.acresCultivated} Acres
                  </span>
                  <span className="text-[11px] text-[#66736A] uppercase font-medium">
                    Organic Land
                  </span>
                </div>
                <div>
                  <span className="block font-heading font-extrabold text-lg text-[#12372A]">
                    {FEATURED_FARMER.experienceYears} Yrs
                  </span>
                  <span className="text-[11px] text-[#66736A] uppercase font-medium">
                    Experience
                  </span>
                </div>
              </div>

              {/* Bio & Crops */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-[#66736A] leading-relaxed">
                  "{FEATURED_FARMER.bio}"
                </p>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-2">
                    Primary Verified Crops:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {FEATURED_FARMER.primaryCrops.map((crop) => (
                      <span
                        key={crop}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-[#12372A]/15 text-[#12372A]"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => setActiveFarmerModal(FEATURED_FARMER)}
                  >
                    View Farm Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Key Benefits for Growers entering from left */}
          <div className="lg:col-span-6 space-y-5">
            {benefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -24, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 rounded-2xl bg-white border border-[#12372A]/10 shadow-sm flex items-start gap-4 hover:border-[#2E7D32]/30 transition-all duration-300 hover:-translate-y-0.5 will-change-transform"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F8F5EC] border border-[#12372A]/10 flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#12372A]">
                    {b.title}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#66736A] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Grower CTA Box */}
            <div className="mt-8 p-6 rounded-2xl bg-[#12372A] text-[#F8F5EC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-heading font-bold text-lg text-[#F8F5EC]">
                  Ready to showcase your harvest?
                </h4>
                <p className="text-xs text-[#F8F5EC]/70 mt-1">
                  Registration takes less than 3 minutes. Zero listing fees.
                </p>
              </div>
              <Button
                variant="gold"
                size="md"
                onClick={onJoinFarmer}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shrink-0 w-full sm:w-auto"
              >
                Register as a Farmer
              </Button>
            </div>
          </div>
        </div>

        {/* Other Active Verified Farmers Carousel/Grid Preview */}
        <div className="mt-16 pt-12 border-t border-[#12372A]/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-lg sm:text-xl text-[#12372A]">
                More Verified Growers in the Network
              </h3>
              <p className="text-xs text-[#66736A]">
                Every farmer is authenticated via regional inspection records
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_FARMERS.map((farmer) => (
              <div
                key={farmer.id}
                className="p-5 bg-white rounded-2xl border border-[#12372A]/10 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading font-bold text-sm text-[#12372A] truncate">
                      {farmer.name}
                    </h4>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#2E7D32] bg-[#2E7D32]/10 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#66736A] truncate">{farmer.specialty}</p>
                  <p className="text-[11px] text-[#8B6F47] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {farmer.location}, {farmer.state} • {farmer.acresCultivated} Acres
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveFarmerModal(farmer)}
                >
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farmer Profile Modal */}
      {activeFarmerModal && (
        <Modal
          isOpen={!!activeFarmerModal}
          onClose={() => setActiveFarmerModal(null)}
          title={`Farm Profile: ${activeFarmerModal.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={activeFarmerModal.image}
                alt={activeFarmerModal.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h4 className="font-heading font-bold text-lg text-[#12372A]">
                  {activeFarmerModal.name}
                </h4>
                <p className="text-xs font-semibold text-[#2E7D32]">
                  {activeFarmerModal.specialty}
                </p>
                <p className="text-xs text-[#66736A] flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-[#8B6F47]" />
                  {activeFarmerModal.location}, {activeFarmerModal.state}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#66736A] leading-relaxed">
              {activeFarmerModal.bio}
            </p>

            <div className="p-4 rounded-xl bg-[#F8F5EC] border border-[#12372A]/10 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#66736A]">Total Acreage:</span>
                <span className="font-bold block text-sm text-[#12372A]">
                  {activeFarmerModal.acresCultivated} Acres
                </span>
              </div>
              <div>
                <span className="text-[#66736A]">Farming Experience:</span>
                <span className="font-bold block text-sm text-[#12372A]">
                  {activeFarmerModal.experienceYears} Years
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#12372A] block mb-2">
                Certified Harvest Lots:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeFarmerModal.primaryCrops.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-[#2E7D32]/30 text-[#2E7D32]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <div className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-[#2E7D32]/10 text-[#12372A] border border-[#2E7D32]/20">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                <span>Verified Organic Cultivator & Harvest Partner</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
