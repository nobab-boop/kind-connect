/**
 * Centralized navigation definitions for CreatorVault.
 * Route paths are declared as string literals; keep in sync with src/routes/.
 */

export type NavItem = {
  label: string;
  to: string;
  description?: string;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const PUBLIC_NAV: NavItem[] = [
  { label: "Features", to: "/features" },
  { label: "Prompt Experts", to: "/prompt-experts" },
  { label: "Pricing", to: "/pricing" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_NAV: NavSection[] = [
  {
    label: "Product",
    items: [
      { label: "Features", to: "/features" },
      { label: "Prompt Experts", to: "/prompt-experts" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Terms of Service", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
];

export const AUTH_NAV = {
  signIn: { label: "Sign in", to: "/sign-in" } as NavItem,
  signUp: { label: "Get started", to: "/sign-up" } as NavItem,
};

/**
 * Dashboard navigation — matches Phase 5 spec.
 * Admin nav is intentionally excluded from the dashboard sidebar.
 */
export const DASHBOARD_NAV: NavSection[] = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Prompt Experts", to: "/experts" },
      { label: "Favorites", to: "/favorites" },
      { label: "Recent Generations", to: "/history" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Credits", to: "/credits" },
      { label: "Pricing", to: "/pricing" },
      { label: "Settings", to: "/settings" },
      { label: "Help", to: "/help" },
    ],
  },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Admin Overview", to: "/admin" },
];
