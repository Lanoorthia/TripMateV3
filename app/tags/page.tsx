// app/tags/page.tsx
export const metadata = { title: "#Tags | TripMate" };

export default function TagsPage({ searchParams }: { searchParams: { tag?: string } }) {
  return (
    <main className="container">
      <TagsClient tag={searchParams.tag || ""} />
    </main>
  );
}

"use client";
import { useEffect, useMemo, useState } from "react";
import { demoPosts, demoPlaces } from "@/lib/mockData";
import { loadTagIndex, toggleFollowTag, getRelatedTags } from "@/lib/tagStore";

function TagsClient({ tag }: { tag: string }) {
  const [slug, setSlug] = useState(tag);
  const idx = useMemo(()=>loadTagIndex(), []);
  const data = idx.tags[slug];

  const postIds = new Set(data?.postIds || []);
  const placeIds = new Set(data?.placeIds || []);
  const posts = demoPosts.filter(p => postIds.has(p.id));
  const places = demoPlaces.filter(p => placeIds.has(p.id));

  const [tab, setTab] = useState<"posts"|"places">("posts");
  const [following, setFollowing] = useState(!!data?.following);

  useEffect(()=>{ setFollowing(!!data?.following); }, [slug]);

  if (!slug || !data) {
    return (
      <div>
        <h1>#Tags</h1>
        <p className="muted">พิมพ์ URL เช่น <code>/tags?tag=ปทุมธานี</code> หรือคลิกจากชิป #แท็ก</p>
      </div>
    );
  }

  const related = getRelatedTags(slug);

  return (
    <>
      <div className="row" style={{ justifyContent:"space-between" }}>
        <h1>#{data.name} <span className="muted">({data.count})</span></h1>
        <button
          className="chip"
          aria-pressed={following}
          onClick={() => { toggleFollowTag(slug, !following); setFollowing(!following); }}
        >
          {following ? "กำลังติดตาม" : "ติดตามแท็ก"}
        </button>
      </div>

      <div className="row" style={{ gap:8, margin:"8px 0 16px" }}>
        <button className="chip" aria-pressed={tab==="posts"} onClick={()=>setTab("posts")}>Posts</button>
        <button className="chip" aria-pressed={tab==="places"} onClick={()=>setTab("places")}>Places</button>
      </div>

      {tab === "posts" ? (
        <div className="grid">
          {posts.map(p => (
            <article key={p.id} className="card">
              {p.media.type === "image"
                ? <img className="media" src={p.media.src} alt="" />
                : <video className="media" src={p.media.src} controls playsInline />}
              <div className="pad">
                <div className="row" style={{ gap:8, marginBottom:8 }}>
                  <img className={`avatar ${p.frame}`} src={p.avatar} alt={p.user} />
                  <strong>{p.user}</strong>
                </div>
                <div className="muted">#{data.name}</div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid">
          {places.map(p => (
            <article key={p.id} className="card">
              <img className="media" src={p.thumbnail} alt={p.name} />
              <div className="pad">
                <div className="row" style={{ justifyContent:"space-between" }}>
                  <strong>{p.name}</strong>
                  <span className="badge">{p.ratingAvg.toFixed(1)}</span>
                </div>
                <div className="chips">
                  {p.tags.map(t => <a key={t} className="chip" href={`/tags?tag=${encodeURIComponent(t)}`}>#{t}</a>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {!!related.length && (
        <>
          <div className="section-title">แท็กที่เกี่ยวข้อง</div>
          <div className="chips">
            {related.map(r => <a key={r.slug} className="chip" href={`/tags?tag=${encodeURIComponent(r.slug)}`}>#{r.name}</a>)}
          </div>
        </>
      )}
    </>
  );
}
