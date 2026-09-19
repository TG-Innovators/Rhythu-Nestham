/**
 * Animation Design Tokens & Reusable Motion Variants
 * Rythu Nestham — 60fps Cinematic Scroll Animation System
 */

// Custom Bezier Curves for Luxury & Editorial Aesthetics
export const EASINGS = {
  cinematic: [0.16, 1, 0.3, 1], // Smooth deceleration, luxurious feel
  smooth: [0.22, 1, 0.36, 1],    // Fast-out, gentle settle
  gentle: [0.25, 0.1, 0.25, 1],  // Balanced ease-in-out
  spring: { type: 'spring', stiffness: 280, damping: 24 },
} as const;

// Standardized Durations
export const DURATIONS = {
  fast: 0.18,
  normal: 0.32,
  smooth: 0.5,
  cinematic: 0.75,
  epic: 0.9,
} as const;

// Viewport defaults for performant triggering
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.2,
};

// Reusable Variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.smooth,
      ease: EASINGS.smooth,
      delay: customDelay,
    },
  }),
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.97, y: 16 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: DURATIONS.smooth,
      ease: EASINGS.cinematic,
      delay: customDelay,
    },
  }),
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.smooth,
      ease: EASINGS.cinematic,
      delay: customDelay,
    },
  }),
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 32 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATIONS.smooth,
      ease: EASINGS.cinematic,
      delay: customDelay,
    },
  }),
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
