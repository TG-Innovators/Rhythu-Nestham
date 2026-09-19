import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight, Sprout, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Realistic frontend submission simulation
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 700);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F8F5EC] border-b border-[#12372A]/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#12372A]/15 shadow-xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2E7D32]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto mb-4">
            <Sprout className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-[#2E7D32]">
            Seasonal Harvest Bulletins
          </span>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#12372A] mt-2">
            Stay Connected to the Farm.
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#66736A] max-w-md mx-auto leading-relaxed">
            Receive weekly harvest alerts, seasonal fruit availability, direct grower stories, and verified farm price updates straight to your inbox.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-4 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/30 max-w-md mx-auto flex items-center gap-3 text-left text-xs text-[#2E7D32]"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold">Welcome to the Rythu Nestham Circle!</p>
                <p className="text-[#66736A] mt-0.5">
                  You will receive our next seasonal harvest digest directly.
                </p>
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row items-stretch gap-2.5"
            >
              <div className="relative flex-1">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66736A] pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#12372A]/15 bg-[#F8F5EC]/50 text-xs sm:text-sm text-[#12372A] placeholder:text-[#66736A]/70 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={status === 'loading'}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shrink-0"
              >
                Subscribe
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-xs text-red-600 mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errorMessage}
            </p>
          )}

          <p className="text-[11px] text-[#66736A] mt-4">
            Zero spam. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
};
