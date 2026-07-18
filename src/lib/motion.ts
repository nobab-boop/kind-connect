/**
 * Motion tokens for CreatorVault.
 * Prefer these class strings over ad-hoc animation classes so timing stays
 * consistent, and honor `prefers-reduced-motion` via Tailwind's `motion-safe:`.
 */

export const MOTION = {
  fadeIn: "motion-safe:animate-in motion-safe:fade-in-0",
  fadeOut: "motion-safe:animate-out motion-safe:fade-out-0",
  scaleIn: "motion-safe:animate-in motion-safe:zoom-in-95",
  slideInFromTop: "motion-safe:animate-in motion-safe:slide-in-from-top-2",
  slideInFromBottom: "motion-safe:animate-in motion-safe:slide-in-from-bottom-2",
  hoverLift: "transition-transform duration-200 motion-safe:hover:-translate-y-0.5",
  hoverGlow: "transition-shadow duration-200 hover:shadow-md",
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
} as const;

export type MotionToken = keyof typeof MOTION;
