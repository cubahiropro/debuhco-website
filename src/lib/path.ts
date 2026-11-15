/**
 * Prefixes internal links & asset paths with the configured base path
 * (e.g. "/debuhco-website/" on GitHub Pages, "/" elsewhere).
 * Leaves external URLs, mailto:, tel:, and pure #anchors untouched.
 */
const RAW = import.meta.env.BASE_URL || '/';
const BASE = RAW.endsWith('/') ? RAW.slice(0, -1) : RAW;

export function url(p: string): string {
  if (!p) return RAW;
  if (/^(https?:|mailto:|tel:)/i.test(p)) return p;
  if (p.startsWith('#')) return p;
  const path = p.startsWith('/') ? p : '/' + p;
  return (BASE + path) || '/';
}
