import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Lock, Phone, UserCheck, ShieldCheck, Mail, User, Sprout, ShoppingBag, Wrench, Eye, EyeOff } from 'lucide-react';
import { authAPI, AuthUser } from '../../lib/api';
import { UserRole } from '../../lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  initialRole?: UserRole;
  onAuthSuccess?: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'consumer',
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [farmOrBusinessName, setFarmOrBusinessName] = useState('');
  const [district, setDistrict] = useState('Medak, Telangana');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState('');

  React.useEffect(() => {
    setMode(initialMode);
    setRole(initialRole);
    setIsSuccess(false);
    setError('');
  }, [initialMode, initialRole, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phoneOrEmail.trim()) {
      setError('Please enter your mobile number or email');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password / PIN');
      return;
    }
    if (mode === 'register' && !fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    setIsLoading(true);

    try {
      let user: AuthUser;
      if (mode === 'login') {
        user = await authAPI.login(phoneOrEmail, password, role);
      } else {
        user = await authAPI.register({
          name: fullName.trim(),
          phone: phoneOrEmail,
          email: phoneOrEmail.includes('@') ? phoneOrEmail : undefined,
          password,
          role,
          farmOrBusinessName: farmOrBusinessName.trim() || undefined,
          district,
        });
      }

      setAuthenticatedUser(user);
      setIsSuccess(true);
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    onClose();
    setIsSuccess(false);
    setError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDone}
      title={mode === 'login' ? 'Login to Rythu Nestham' : 'Join Rythu Nestham Ecosystem'}
      maxWidth="sm"
    >
      {isSuccess && authenticatedUser ? (
        <div className="text-center py-6 space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center mx-auto animate-bounce">
            <UserCheck className="w-8 h-8" />
          </div>
          <h4 className="font-heading font-extrabold text-lg text-[#12372A]">
            Welcome, {authenticatedUser.name}!
          </h4>
          <p className="text-xs text-[#66736A]">
            You are authenticated as{' '}
            <span className="font-bold text-[#2E7D32] capitalize">
              {authenticatedUser.role}
            </span>
            . Explore verified produce and direct grower relationships.
          </p>
          <Button variant="primary" fullWidth onClick={handleDone} className="mt-4">
            Continue to Marketplace
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mode Tabs */}
          <div className="flex border-b border-[#12372A]/10">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`flex-1 pb-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                mode === 'login'
                  ? 'border-[#12372A] text-[#12372A]'
                  : 'border-transparent text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError('');
              }}
              className={`flex-1 pb-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                mode === 'register'
                  ? 'border-[#2E7D32] text-[#2E7D32]'
                  : 'border-transparent text-[#66736A] hover:text-[#12372A]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Role Pill Selector */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-[#12372A] uppercase tracking-wider">
              Account Role
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F8F5EC] rounded-xl border border-[#12372A]/10">
              <button
                type="button"
                onClick={() => setRole('farmer')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  role === 'farmer' ? 'bg-[#12372A] text-[#F8F5EC] shadow-xs' : 'text-[#66736A] hover:text-[#12372A]'
                }`}
              >
                <Sprout className="w-3.5 h-3.5" />
                <span>Farmer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('consumer')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  role === 'consumer' ? 'bg-[#2E7D32] text-white shadow-xs' : 'text-[#66736A] hover:text-[#12372A]'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buyer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('supplier')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  role === 'supplier' ? 'bg-[#E5A83B] text-[#172019] shadow-xs' : 'text-[#66736A] hover:text-[#12372A]'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Supplier</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <>
                <Input
                  label="Full Name"
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />

                {role === 'farmer' && (
                  <Input
                    label="Farm Name / Village"
                    placeholder="e.g. Deccan Organic Farm, Medak"
                    value={farmOrBusinessName}
                    onChange={(e) => setFarmOrBusinessName(e.target.value)}
                    leftIcon={<Sprout className="w-4 h-4" />}
                  />
                )}

                {role === 'supplier' && (
                  <Input
                    label="Business / Dealership Name"
                    placeholder="e.g. Kisan Drip Solutions"
                    value={farmOrBusinessName}
                    onChange={(e) => setFarmOrBusinessName(e.target.value)}
                    leftIcon={<Wrench className="w-4 h-4" />}
                  />
                )}
              </>
            )}

            <Input
              label="Mobile Number or Email"
              placeholder="+91 98765 43210 or user@example.com"
              type="text"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
              required
            />

            <div className="space-y-1.5">
              <Input
                label="Password / Security PIN"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer hover:text-[#12372A]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              isLoading={isLoading}
              className="mt-2"
            >
              {mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#66736A] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Encrypted with Rythu Nestham Security Standard</span>
          </div>
        </div>
      )}
    </Modal>
  );
};
