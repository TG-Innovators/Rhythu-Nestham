import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, CheckCircle, MapPin, ShieldCheck } from 'lucide-react';
import { IMPACT_STATS } from '../../lib/mockData';
import { SectionHeading } from '../common/SectionHeading';
import { EASINGS } from '../../lib/animations';

const statIcons: Record<string, React.ReactNode> = {
  Users: <Users className="w-6 h-6 text-[#2E7D32]" />,
  CheckCircle: <CheckCircle className="w-6 h-6 text-[#65A30D]" />,
  MapPin: <MapPin className="w-6 h-6 text-[#8B6F47]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#E5A83B]" />,
};

interface CounterProps {
  valueString: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ valueString }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  // Extract integer and any suffix like '+' or '%'
  const cleanNumber = parseInt(valueString.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = valueString.replace(/[0-9,]/g, '');

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * cleanNumber);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(cleanNumber);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, cleanNumber]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-3xl sm:text-4xl text-[#12372A] tracking-tight">
      {displayValue.toLocaleString('en-IN')}{suffix}
    </span>
  );
};

export const ImpactStats: React.FC = () => {
  return (
    <section id="impact" className="py-20 sm:py-28 bg-[#F8F5EC] border-b border-[#12372A]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Ecosystem Milestones"
          title="Empowering the Rural Soil Economy."
          subtitle="Real progress across farming clusters, direct consumer households, and verified agricultural logistics."
          align="center"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {IMPACT_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: EASINGS.cinematic,
              }}
              className="p-6 rounded-3xl bg-white border border-[#12372A]/10 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-center will-change-transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F8F5EC] border border-[#12372A]/10 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
                {statIcons[stat.icon]}
              </div>

              {/* Animated Counting Metric */}
              <AnimatedCounter valueString={stat.value} />

              <h3 className="font-heading font-bold text-sm sm:text-base text-[#12372A] mt-2">
                {stat.label}
              </h3>

              <p className="text-xs text-[#66736A] mt-1">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Scalable Placeholder Structure Note */}
        <div className="mt-8 text-center text-[11px] text-[#66736A]">
          * Metrics reflect initial regional operational benchmarks ready for live database telemetry integration.
        </div>
      </div>
    </section>
  );
};
