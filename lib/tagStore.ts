// lib/tagStore.ts
export type TagIndex = {
  tags: {
    [slug: string]: {
      name: string;      // first-seen display
      count: number;     // total occurrences
      postIds: string[];
      placeIds: string[];
      updatedAt: number; // epoch ms
      following?: boolean;
    };
  };
};

const KEY = "tripmate_tag_index";

export function loadTagIndex(): TagIndex {
  if (typeof window === "undefined") return { tags: {} };
  try { return JSON.parse(localStorage.getItem(KEY) || `{"tags":{}}`); }
  catch { return { tags: {} }; }
}

export function saveTagIndex(idx: TagIndex) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(idx));
}

export function updateTagIndex(
  entityType: "post" | "place",
  entityId: string,
  tags: { slug: string; name: string }[]
) {
  const idx = loadTagIndex();
  const now = Date.now();
  for (const t of tags) {
    const cur = idx.tags[t.slug] ?? { name: t.name, count: 0, postIds: [], placeIds: [], updatedAt: now };
    cur.name ||= t.name;
    cur.count += 1;
    if (entityType === "post" && !cur.postIds.includes(entityId)) cur.postIds.push(entityId);
    if (entityType === "place" && !cur.placeIds.includes(entityId)) cur.placeIds.push(entityId);
    cur.updatedAt = now;
    idx.tags[t.slug] = cur;
  }
  saveTagIndex(idx);
}

export function toggleFollowTag(slug: string, follow: boolean) {
  const idx = loadTagIndex();
  if (!idx.tags[slug]) return;
  idx.tags[slug].following = follow;
  saveTagIndex(idx);
}

export function getTrendingTags(windowHours = 168, limit = 10) {
  const idx = loadTagIndex();
  const since = Date.now() - windowHours * 3600 * 1000;
  return Object.entries(idx.tags)
    .filter(([_, v]) => v.updatedAt >= since)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, limit)
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count, following: !!v.following }));
}

export function getRelatedTags(baseSlug: string, limit = 5) {
  const idx = loadTagIndex();
  const base = idx.tags[baseSlug];
  if (!base) return [];
  const coScore: Record<string, number> = {};
  const setPosts = new Set(base.postIds);
  const setPlaces = new Set(base.placeIds);
  for (const [slug, v] of Object.entries(idx.tags)) {
    if (slug === baseSlug) continue;
    // co-occurrence score
    const p = v.postIds.filter(id => setPosts.has(id)).length;
    const q = v.placeIds.filter(id => setPlaces.has(id)).length;
    const s = p + q;
    if (s > 0) coScore[slug] = s;
  }
  return Object.entries(coScore)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug]) => ({ slug, name: idx.tags[slug].name }));
}
