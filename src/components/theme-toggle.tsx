import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * useTheme — client-only theme controller.
 * Dark theme is the CreatorVault default; toggle only applies after hydration.
 */
export type Theme = "dark" | "light";

const STORAGE_KEY = "cv.theme";

function apply(theme: Theme) {
  const el = document.documentElement;
  if (theme === "dark") el.classList.add("dark");
  else el.classList.remove("dark");
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "dark";
    setTheme(saved);
    apply(saved);
    setHydrated(true);
  }, []);

  const update = (next: Theme) => {
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return {
    theme,
    hydrated,
    setTheme: update,
    toggle: () => update(theme === "dark" ? "light" : "dark"),
  };
}

/**
 * ThemeToggle — infrastructure only. Renders a static placeholder before
 * hydration to avoid SSR mismatch, then a real toggle.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, hydrated, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggle}
      className={className}
      disabled={!hydrated}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
