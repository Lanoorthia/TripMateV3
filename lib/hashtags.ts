// lib/hashtags.ts
export const hashtagRegex = /(^|\s)#([A-Za-z0-9_\u0E00-\u0E7F]{2,50})/g;

export function normalizeTag(raw: string) {
  const clean = raw.normalize("NFC").trim().replace(/^#/, "");
  const lower = clean.toLowerCase();
  // allow thai/eng/num/underscore; strip others
  const kept = Array.from(lower).filter(ch => /[a-z0-9_\u0E00-\u0E7F]/i.test(ch)).join("");
  return kept;
}

export function slugifyTag(raw: string) {
  return normalizeTag(raw); // already safe for URL (no spaces)
}

export function extractHashtags(text: string) {
  const set = new Set<string>();
  text.replace(hashtagRegex, (_m, p1, tag) => {
    const slug = slugifyTag(tag);
    if (slug.length >= 2 && slug.length <= 50) set.add(slug);
    return "";
  });
  return Array.from(set);
}

export function linkifyHashtags(text: string) {
  return text.replace(hashtagRegex, (_m, ws, tag) => {
    const slug = slugifyTag(tag);
    return `${ws}<a href="/tags?tag=${encodeURIComponent(slug)}" class="chip">#${tag}</a>`;
  });
}
