import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2, ShieldCheck, Sparkles, Clock, MapPin } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'verified' | 'certified' | 'fresh' | 'organic' | 'earth' | 'neutral' | 'gold';
  size?: 'sm' | 'md';
  icon?: 'check' | 'shield' | 'sparkle' | 'clock' | 'location' | 'none';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'verified',
  size = 'md',
  icon = 'none',
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide transition-colors';

  const variants = {
    verified: 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/25',
    certified: 'bg-[#12372A]/10 text-[#12372A] border border-[#12372A]/20',
    fresh: 'bg-[#65A30D]/15 text-[#3b6605] border border-[#65A30D]/30 font-medium',
    organic: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    earth: 'bg-[#8B6F47]/15 text-[#634e32] border border-[#8B6F47]/30',
    neutral: 'bg-white/80 text-[#172019] border border-gray-200 backdrop-blur-sm',
    gold: 'bg-[#E5A83B]/15 text-[#916212] border border-[#E5A83B]/30',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const renderIcon = () => {
    switch (icon) {
      case 'check':
        return <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#2E7D32]" />;
      case 'shield':
        return <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#12372A]" />;
      case 'sparkle':
        return <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#E5A83B]" />;
      case 'clock':
        return <Clock className="w-3.5 h-3.5 shrink-0 text-[#65A30D]" />;
      case 'location':
        return <MapPin className="w-3.5 h-3.5 shrink-0 text-[#8B6F47]" />;
      default:
        return null;
    }
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {renderIcon()}
      <span>{children}</span>
    </span>
  );
};
