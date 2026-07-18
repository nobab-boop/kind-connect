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
  { label: "Pricing", to: "/pricing" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const AUTH_NAV = {
  signIn: { label: "Sign in", to: "/sign-in" } as NavItem,
  signUp: { label: "Get started", to: "/sign-up" } as NavItem,
};

export const DASHBOARD_NAV: NavSection[] = [
  {
    label: "Workspace",
    items: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Workspace", to: "/workspace" },
      { label: "Prompt Experts", to: "/prompt-experts" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Credits", to: "/credits" },
      { label: "Billing", to: "/billing" },
      { label: "Settings", to: "/settings" },
    ],
  },
];

export const ADMIN_NAV: NavItem[] = [
  { label: "Admin Overview", to: "/admin" },
];
