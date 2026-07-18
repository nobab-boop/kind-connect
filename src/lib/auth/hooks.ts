/**
 * Reusable auth hooks. Consumers should NEVER call `supabase.auth.*` directly.
 */

import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "./AuthProvider";

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>.");
  return ctx;
}

export function useUser() {
  return useAuth().user;
}

export function useSession() {
  return useAuth().session;
}

export function useIsAuthenticated() {
  return useAuth().isAuthenticated;
}
