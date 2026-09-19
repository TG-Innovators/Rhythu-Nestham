import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
  action,
  className,
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        isCenter ? 'text-center mx-auto max-w-3xl' : 'flex flex-col md:flex-row md:items-end justify-between gap-6',
        className
      )}
    >
      <div className={cn(isCenter ? 'mx-auto' : 'max-w-2xl')}>
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3.5',
              dark
                ? 'bg-[#2E7D32]/30 text-[#65A30D] border border-[#65A30D]/30'
                : 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/20'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#65A30D] animate-pulse" />
            {eyebrow}
          </motion.div>
        )}

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className={cn(
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.18]',
            dark ? 'text-[#F8F5EC]' : 'text-[#12372A]'
          )}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className={cn(
              'mt-3.5 text-base md:text-lg leading-relaxed font-normal',
              dark ? 'text-[#F8F5EC]/75' : 'text-[#66736A]'
            )}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {!isCenter && action && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="shrink-0"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
};
