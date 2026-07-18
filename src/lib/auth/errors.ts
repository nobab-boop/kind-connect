/**
 * Auth error mapper — translate raw Supabase errors into friendly strings.
 * Never surface raw SDK messages to end users.
 */

export function friendlyAuthError(err: unknown): string {
  if (!err) return "Something went wrong. Please try again.";
  const msg = err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();

  if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
    return "Incorrect email or password.";
  }
  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }
  if (lower.includes("user already registered") || lower.includes("already registered")) {
    return "An account with this email already exists.";
  }
  if (lower.includes("password") && lower.includes("6")) {
    return "Password must be at least 6 characters.";
  }
  if (lower.includes("rate limit") || lower.includes("too many")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (lower.includes("network") || lower.includes("failed to fetch")) {
    return "Network error. Check your connection and try again.";
  }
  if (lower.includes("otp") || lower.includes("token has expired") || lower.includes("expired")) {
    return "This link has expired. Please request a new one.";
  }
  if (lower.includes("provider is not enabled")) {
    return "This sign-in method isn't enabled yet. Please contact support.";
  }
  return "Something went wrong. Please try again.";
}
