import { LogOut, User } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth/hooks";
import { AUTH_ROUTES } from "@/lib/supabase/config";

export function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const email = user?.email ?? "";
  const initial = email ? email[0]?.toUpperCase() : "?";

  async function onSignOut() {
    await signOut();
    navigate({ to: AUTH_ROUTES.afterSignOut, replace: true });
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: AUTH_ROUTES.signIn })}>
          Sign in
        </Button>
        <Button size="sm" onClick={() => navigate({ to: AUTH_ROUTES.signUp })}>
          Get started
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open user menu">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
            {initial || <User className="h-4 w-4" />}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">{email || "Signed in"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
