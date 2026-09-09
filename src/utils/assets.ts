/**
 * Helper to resolve public assets correctly in all environments,
 * including GitHub Pages with subpath bases (e.g. /Gender-Society/).
 */
export function getAssetUrl(path?: string): string | undefined {
  if (!path) return undefined;
  const cleanPath = path.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${cleanPath}`;
}
