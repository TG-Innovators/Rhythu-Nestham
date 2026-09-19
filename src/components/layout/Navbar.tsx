import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ShoppingBag, ArrowRight, UserPlus, LogIn, Sparkles, Sprout, User, LogOut, PlusCircle } from 'lucide-react';
import { BRAND, NAV_LINKS } from '../../lib/constants';
import { Button } from '../common/Button';
import { AuthUser, isVerifiedProducer } from '../../lib/api';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenJoinModal: (role?: 'consumer' | 'farmer' | 'supplier') => void;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  onOpenAddProduct?: () => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenJoinModal,
  onOpenAuthModal,
  onOpenAddProduct,
  currentUser,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Page Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const sections = ['hero', 'marketplace', 'farmers', 'suppliers', 'verification', 'how-it-works', 'stories'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* 1. Accessible Skip-to-Content Link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#E5A83B] focus:text-[#172019] focus:rounded-xl focus:shadow-2xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-[#12372A]"
      >
        Skip to main content
      </a>

      {/* 2. Viewport Top Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#2E7D32] via-[#65A30D] to-[#E5A83B] origin-left z-50 pointer-events-none shadow-sm"
      />

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#12372A]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
            : 'bg-gradient-to-b from-[#12372A]/80 via-[#12372A]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A83B] rounded-lg p-1"
              aria-label="Rythu Nestham Homepage"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#12372A] border border-[#65A30D]/40 flex items-center justify-center shadow-md shadow-[#12372A]/20 transition-transform duration-300 group-hover:scale-105">
                <Sprout className="w-5 h-5 text-[#E5A83B]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[#F8F5EC] leading-tight">
                  {BRAND.name}
                </span>
                <span className="text-[11px] font-medium tracking-wide text-[#E5A83B]/90 hidden sm:block">
                  {BRAND.tagline}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const sectionKey = link.href.replace('#', '');
                const isActive = activeSection === sectionKey;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 relative ${
                      isActive
                        ? 'text-[#F8F5EC] bg-white/15'
                        : 'text-[#F8F5EC]/75 hover:text-[#F8F5EC] hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E5A83B] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#F8F5EC] border border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A83B] cursor-pointer"
                aria-label={`Cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#E5A83B] text-[#172019] text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* Authenticated User Pill OR Login/Register Buttons */}
              {currentUser ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-[#F8F5EC] text-xs font-semibold transition-colors cursor-pointer"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#E5A83B] text-[#172019] flex items-center justify-center font-bold text-[11px]">
                      {currentUser.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                    <span className="text-[10px] uppercase font-bold text-[#E5A83B] bg-[#E5A83B]/15 px-1.5 py-0.5 rounded">
                      {currentUser.role}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#12372A]/10 py-2 text-xs text-[#12372A] z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-bold truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-[#66736A] truncate">{currentUser.phone}</p>
                      </div>

                      {isVerifiedProducer(currentUser) && onOpenAddProduct && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenAddProduct();
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-[#F8F5EC] font-semibold text-[#2E7D32] flex items-center gap-2 cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4" />
                          <span>+ List New Harvest Crop</span>
                        </button>
                      )}

                      {onLogout && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full px-4 py-2.5 text-left hover:bg-red-50 text-red-600 font-semibold border-t border-gray-100 flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('login')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#F8F5EC] hover:text-[#E5A83B] transition-colors rounded-xl cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuthModal('register')}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#F8F5EC]/80 hover:text-[#F8F5EC] transition-colors rounded-xl cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </button>
                </div>
              )}

              {/* Primary CTA: Add Produce for verified producers ONLY, otherwise Join Network */}
              {isVerifiedProducer(currentUser) ? (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    if (onOpenAddProduct) onOpenAddProduct();
                  }}
                  className="hidden md:inline-flex shadow-lg shadow-[#E5A83B]/20"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  + Add Produce
                </Button>
              ) : (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => onOpenJoinModal('farmer')}
                  className="hidden md:inline-flex shadow-lg shadow-[#E5A83B]/20"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Join Network
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#F8F5EC] border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A83B] cursor-pointer"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Polished Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-[#12372A]/70 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 bg-[#12372A] border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#2E7D32] flex items-center justify-center">
                      <Sprout className="w-4 h-4 text-[#E5A83B]" />
                    </div>
                    <span className="font-heading font-bold text-base text-[#F8F5EC]">
                      {BRAND.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-[#F8F5EC]/70 hover:text-[#F8F5EC] hover:bg-white/10 cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile User Profile Status */}
                {currentUser ? (
                  <div className="mt-4 p-3 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#F8F5EC]">{currentUser.name}</p>
                      <p className="text-[11px] text-[#E5A83B] capitalize font-semibold">{currentUser.role} Account</p>
                    </div>
                    {onLogout && (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onLogout();
                        }}
                        className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                      >
                        Sign Out
                      </button>
                    )}
                  </div>
                ) : null}

                {/* Mobile Links */}
                <nav className="mt-6 flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-xl text-sm font-medium text-[#F8F5EC]/85 hover:text-[#F8F5EC] hover:bg-white/10 transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-40" />
                    </a>
                  ))}
                </nav>

                {/* Stakeholder Quick Pathways */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-xs uppercase tracking-wider text-[#E5A83B] font-semibold mb-3 px-2">
                    Agricultural Pathways
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {isVerifiedProducer(currentUser) ? (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onOpenAddProduct) onOpenAddProduct();
                        }}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#2E7D32]/30 border border-[#2E7D32]/40 text-xs font-semibold text-[#F8F5EC] flex items-center justify-between hover:bg-[#2E7D32]/40 transition-colors cursor-pointer"
                      >
                        <span>+ List Crop Produce</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#E5A83B]" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenJoinModal('farmer');
                        }}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-[#F8F5EC] flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <span>Join as Verified Producer</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white/50" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                {isVerifiedProducer(currentUser) ? (
                  <Button
                    variant="gold"
                    fullWidth
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenAddProduct) onOpenAddProduct();
                    }}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    + Add Produce to Marketplace
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    fullWidth
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenJoinModal('farmer');
                    }}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Join Rythu Nestham Network
                  </Button>
                )}
                {!currentUser && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      fullWidth
                      size="sm"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuthModal('login');
                      }}
                      className="border-white/20 text-[#F8F5EC] hover:bg-white/10"
                      leftIcon={<LogIn className="w-3.5 h-3.5" />}
                    >
                      Login
                    </Button>
                    <Button
                      variant="secondary"
                      fullWidth
                      size="sm"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAuthModal('register');
                      }}
                      leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
