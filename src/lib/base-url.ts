/** Vite `base`, including trailing slash. `/` in preview, `/skazitel/` on Pages. */
export const BASE_URL = import.meta.env.BASE_URL;

export function publicUrl(path: string): string {
  return `${BASE_URL}${path.replace(/^\//, "")}`;
}

export function routerBasepath(): string | undefined {
  const trimmed = BASE_URL.replace(/\/$/, "");
  return trimmed.length > 0 ? trimmed : undefined;
}
