/**
 * Prompt Expert Engine — local mock store for favorites & recent experts.
 * localStorage-backed; no backend. Safe on SSR (guards `window`).
 */

const FAV_KEY = "cv:favorite-experts";
const RECENT_KEY = "cv:recent-experts";
const RECENT_MAX = 8;

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota */
  }
}

export function isFavorite(slug: string): boolean {
  return read(FAV_KEY).includes(slug);
}

/** Returns the new favorited state. */
export function toggleFavorite(slug: string): boolean {
  const current = read(FAV_KEY);
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [slug, ...current];
  write(FAV_KEY, next);
  return next.includes(slug);
}

export function getFavorites(): string[] {
  return read(FAV_KEY);
}

export function pushRecentExpert(slug: string) {
  const current = read(RECENT_KEY).filter((s) => s !== slug);
  write(RECENT_KEY, [slug, ...current].slice(0, RECENT_MAX));
}

export function getRecentExperts(): string[] {
  return read(RECENT_KEY);
}
