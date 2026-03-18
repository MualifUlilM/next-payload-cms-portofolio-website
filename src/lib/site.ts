const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
export const FALLBACK_SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Your Name";
export const FALLBACK_META_DESCRIPTION =
  "Fullstack developer specializing in Next.js, Supabase, and Payload CMS. Building fast, maintainable web products for US and EU teams.";

function normalizePath(value: string) {
  return value.startsWith("/") ? value : `/${value}`;
}

export function getMediaUrl(url?: string | null) {
  if (!url) return undefined;

  if (ABSOLUTE_URL_PATTERN.test(url)) return url;

  const normalized = normalizePath(url);
  // Payload serves media via /api/media/file/<filename>, but files live in
  // public/media/ — rewrite to the static path so Next.js Image reads from
  // the filesystem instead of making a loopback HTTP request.
  return normalized.replace(/^\/api\/media\/file\//, "/media/");
}

export function getAbsoluteUrl(url?: string | null) {
  if (!url) return BASE_URL;

  if (ABSOLUTE_URL_PATTERN.test(url)) return url;

  return new URL(normalizePath(url), BASE_URL).toString();
}

export function getAbsoluteMediaUrl(url?: string | null) {
  const mediaUrl = getMediaUrl(url);

  return mediaUrl ? getAbsoluteUrl(mediaUrl) : undefined;
}
