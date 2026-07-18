import { APP } from "./constants";

/**
 * Build a TanStack Router `head()` meta array for a page.
 * Keeps title/description/open-graph/twitter tags consistent across routes.
 */
export function buildPageMeta(input: {
  title: string;
  description: string;
  /** When true, uses the title verbatim (for the home route). Otherwise appends " — CreatorVault". */
  standaloneTitle?: boolean;
  ogImage?: string;
}) {
  const title = input.standaloneTitle ? input.title : `${input.title} — ${APP.name}`;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: input.description },
    { property: "og:title", content: title },
    { property: "og:description", content: input.description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: input.description },
  ];
  if (input.ogImage) {
    meta.push({ property: "og:image", content: input.ogImage });
    meta.push({ name: "twitter:image", content: input.ogImage });
  }
  return meta;
}
