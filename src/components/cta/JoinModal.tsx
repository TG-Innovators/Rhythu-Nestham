import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Sprout, ShoppingCart, Wrench, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'farmer' | 'consumer' | 'supplier';
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'farmer',
}) => {
  const [role, setRole] = useState<'farmer' | 'consumer' | 'supplier'>(initialRole);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingRef, setTrackingRef] = useState('');
  const [error, setError] = useState('');

  // Sync role when initialRole changes
  React.useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions from double-clicking
    setError('');

    // Validate required fields before submission
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedLocation = location.trim();
    const trimmedDetails = details.trim();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }
    if (!trimmedPhone) {
      setError('Please enter your mobile number.');
      return;
    }
    if (!trimmedLocation) {
      setError('Please enter your location (district & state).');
      return;
    }

    // Verify Supabase configuration before attempting insertion
    if (!isSupabaseConfigured) {
      const configError = new Error('Missing Supabase credentials in environment. (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not configured).');
      console.error('Registration submission failed:', configError);
      console.error(
        '[Rythu Nestham Registration] Cannot submit: Missing Supabase credentials in environment.'
      );
      setError('Registration service is temporarily offline: Supabase credentials are not configured. Please check environment variables.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      role: role,
      full_name: trimmedName,
      phone: trimmedPhone,
      location: trimmedLocation,
      details: trimmedDetails,
    };

    console.log(
      '[Rythu Nestham Registration] Executing Supabase INSERT into public.registration_requests:',
      payload
    );

    try {
      // Direct Supabase insert into public.registration_requests table
      const { data, error: insertError } = await supabase
        .from('registration_requests')
        .insert({
          role: payload.role,
          full_name: payload.full_name,
          phone: payload.phone,
          location: payload.location,
          details: payload.details,
        });

      if (insertError) {
        console.error('Registration submission failed:', insertError);
        console.error('[Rythu Nestham Registration] Supabase INSERT failed:', {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          table: 'registration_requests',
          payload,
        });

        if (insertError.code === '42501') {
          setError('Database permission error (RLS 42501): Row Level Security is blocking public inserts. Please execute the "Allow public insert" policy in Supabase SQL Editor.');
        } else if (insertError.code === '42P01') {
          setError('Database table error (42P01): public.registration_requests does not exist in Supabase. Please create the table in Supabase.');
        } else if (insertError.code === '42703') {
          setError('Database column mismatch (42703): Verify columns in public.registration_requests match role, full_name, phone, location, details.');
        } else {
          setError(`Registration failed: ${insertError.message || 'Please check your connection and try again.'}`);
        }
        return;
      }

      // On successful submission
      console.log('[Rythu Nestham Registration] Successfully inserted into Supabase public.registration_requests!', data);
      const newRef = `RN-REG-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingRef(newRef);
      setIsSubmitted(true);
      setError('');
    } catch (err: any) {
      console.error('Registration submission failed:', err);
      console.error('[Rythu Nestham Registration] Unexpected error during submission:', err);
      setError(`Unable to submit registration: ${err?.message || 'Network error'}. Please check your connection and try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleReset = () => {
    setIsSubmitted(false);
    setError('');
    setName('');
    setPhone('');
    setLocation('');
    setDetails('');
    setTrackingRef('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={
        isSubmitted
          ? 'Registration Successful'
          : `Join Rythu Nestham as a ${
              role === 'farmer' ? 'Farmer' : role === 'supplier' ? 'Supplier' : 'Consumer'
            }`
      }
      maxWidth="md"
    >
      {isSubmitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="font-heading font-extrabold text-xl text-[#12372A]">
            Namaste, {name}!
          </h4>
          <p className="text-xs sm:text-sm text-[#66736A] max-w-sm mx-auto leading-relaxed">
            Your application to join Rythu Nestham as a{' '}
            <strong className="text-[#12372A] uppercase">{role}</strong> has been registered. Our regional verification coordinator will connect directly with you at {phone} to confirm credentials.
          </p>

          <div className="p-4 rounded-xl bg-white border border-[#12372A]/10 text-xs text-left max-w-xs mx-auto space-y-1">
            <div className="text-[#66736A]">Tracking Reference:</div>
            <div className="font-mono font-bold text-[#12372A]">
              {trackingRef}
            </div>
          </div>

          <Button variant="primary" fullWidth onClick={handleReset} className="mt-4">
            Return to Marketplace
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Switcher Pills */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#12372A]/5 rounded-xl border border-[#12372A]/10">
            <button
              type="button"
              onClick={() => {
                setRole('farmer');
                if (error) setError('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'farmer'
                  ? 'bg-[#2E7D32] text-white shadow-sm'
                  : 'text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" /> Farmer
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('consumer');
                if (error) setError('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'consumer'
                  ? 'bg-[#12372A] text-[#F8F5EC] shadow-sm'
                  : 'text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Consumer
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('supplier');
                if (error) setError('');
              }}
              className={`py-2 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'supplier'
                  ? 'bg-[#E5A83B] text-[#172019] shadow-sm'
                  : 'text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" /> Supplier
            </button>
          </div>

          {/* Friendly Error Feedback */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <Input
            label="Full Name"
            placeholder="e.g. Ramesh Kumar"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
            required
          />

          <Input
            label="Mobile Number"
            placeholder="+91 98765 43210"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
            required
          />

          <Input
            label="Location (District & State)"
            placeholder="e.g. Medak, Telangana"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
            required
          />

          {role === 'farmer' && (
            <Input
              label="Acreage & Primary Crops"
              placeholder="e.g. 5 Acres • Vine Tomatoes, Greens, Carrots"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={isSubmitting}
            />
          )}

          {role === 'supplier' && (
            <Input
              label="Equipment / Input Specialty"
              placeholder="e.g. Drip Irrigation Systems & Solar Pumps"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={isSubmitting}
            />
          )}

          {role === 'consumer' && (
            <Input
              label="Preferred Produce or Bulk Requirement"
              placeholder="e.g. Weekly organic vegetables basket for family"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              disabled={isSubmitting}
            />
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant={role === 'farmer' ? 'secondary' : role === 'supplier' ? 'gold' : 'primary'}
              fullWidth
              size="lg"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Submit Registration for Verification
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#66736A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Your information is protected & securely submitted for verification</span>
          </div>
        </form>
      )}
    </Modal>
  );
};
