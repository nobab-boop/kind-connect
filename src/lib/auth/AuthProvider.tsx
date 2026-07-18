/**
 * AuthProvider — the single source of truth for authentication state.
 *
 * Wraps the app once (in __root.tsx) and exposes the current session, user,
 * loading state, and the imperative auth actions via React context. Consumers
 * MUST use the hooks in `./hooks.ts` rather than calling `supabase.auth.*`
 * directly, so we keep a single place that owns session lifecycle.
 *
 * Portability: only touches the Supabase JS SDK and our config module — no
 * Loveable-managed auth surface.
 */

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase/client";
import { AUTH_ROUTES, getAuthRedirectUrl } from "@/lib/supabase/config";
import { friendlyAuthError } from "./errors";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type AuthResult = { error: string | null };

export type AuthContextValue = {
  user: User | null;
  session: Session | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signUpWithPassword: (email: string, password: string) => Promise<AuthResult & { needsConfirmation?: boolean }>;
  signInWithGoogle: (redirectPath?: string) => Promise<AuthResult>;
  sendPasswordReset: (email: string) => Promise<AuthResult>;
  updatePassword: (newPassword: string) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    // Restore any persisted session before wiring the listener so the
    // initial state reflects the real user, not an unauthenticated flash.
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted.current) return;
      setSession(data.session ?? null);
      setStatus(data.session ? "authenticated" : "unauthenticated");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!mounted.current) return;
      setSession(next ?? null);
      setStatus(next ? "authenticated" : "unauthenticated");
    });

    return () => {
      mounted.current = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = useCallback<AuthContextValue["signInWithPassword"]>(
    async (email, password) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? friendlyAuthError(error) : null };
    },
    [],
  );

  const signUpWithPassword = useCallback<AuthContextValue["signUpWithPassword"]>(
    async (email, password) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: getAuthRedirectUrl(AUTH_ROUTES.afterSignIn) },
      });
      if (error) return { error: friendlyAuthError(error) };
      // When email confirmation is enabled, Supabase returns a user without a session.
      const needsConfirmation = !data.session;
      return { error: null, needsConfirmation };
    },
    [],
  );

  const signInWithGoogle = useCallback<AuthContextValue["signInWithGoogle"]>(
    async (redirectPath = AUTH_ROUTES.afterSignIn) => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: getAuthRedirectUrl(redirectPath) },
      });
      return { error: error ? friendlyAuthError(error) : null };
    },
    [],
  );

  const sendPasswordReset = useCallback<AuthContextValue["sendPasswordReset"]>(
    async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: getAuthRedirectUrl(AUTH_ROUTES.resetPassword),
      });
      return { error: error ? friendlyAuthError(error) : null };
    },
    [],
  );

  const updatePassword = useCallback<AuthContextValue["updatePassword"]>(
    async (newPassword) => {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      return { error: error ? friendlyAuthError(error) : null };
    },
    [],
  );

  const signOut = useCallback<AuthContextValue["signOut"]>(async () => {
    const { error } = await supabase.auth.signOut();
    return { error: error ? friendlyAuthError(error) : null };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      session,
      status,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      signInWithPassword,
      signUpWithPassword,
      signInWithGoogle,
      sendPasswordReset,
      updatePassword,
      signOut,
    }),
    [
      session,
      status,
      signInWithPassword,
      signUpWithPassword,
      signInWithGoogle,
      sendPasswordReset,
      updatePassword,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
