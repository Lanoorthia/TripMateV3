// app/page.tsx
import FeedClient from "./sections/FeedClient";

export default function Home() {
  return (
    <main className="container" style={{ display:"grid", gridTemplateColumns:"1fr", gap:24 }}>
      <div>
        <h1>Feed</h1>
        <FeedClient />
      </div>
      <aside className="sidebar">
        <TrendingClient />
      </aside>
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import { demoPosts } from "@/lib/mockData";
import { extractHashtags, linkifyHashtags, slugifyTag } from "@/lib/hashtags";
import { updateTagIndex, getTrendingTags } from "@/lib/tagStore";

function FeedClient() {
  const [posts, setPosts] = useState(demoPosts);

  useEffect(() => {
    // seed tag index from posts
    posts.forEach(p => {
      const tags = extractHashtags(p.caption).map(slug => ({ slug, name: slug }));
      updateTagIndex("post", p.id, tags);
    });
  }, []);

  return (
    <div className="grid">
      {posts.map(p => (
        <article key={p.id} className="card">
          {p.media.type === "image" ? (
            <img src={p.media.src} alt="" className="media" loading="lazy" />
          ) : (
            <video className="media" src={p.media.src} controls playsInline preload="metadata" />
          )}
          <div className="pad">
            <div className="row" style={{ marginBottom:8 }}>
              <img className={`avatar ${p.frame}`} src={p.avatar} alt={p.user} />
              <strong>{p.user}</strong>
              <span className="badge">new</span>
            </div>
            <div
              className="caption"
              dangerouslySetInnerHTML={{ __html: linkifyHashtags(p.caption) }}
            />
            <div className="chips">
              {extractHashtags(p.caption).map(slug => (
                <a key={slug} className="chip" href={`/tags?tag=${encodeURIComponent(slug)}`}>#{slug}</a>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function TrendingClient() {
  const [list, setList] = useState<{slug:string;name:string;count:number}[]>([]);
  useEffect(() => { setList(getTrendingTags()); }, []);
  if (!list.length) return null;
  return (
    <div>
      <div className="section-title"># กำลังมาแรง</div>
      <div className="chips">
        {list.map(t => (
          <a key={t.slug} className="chip" href={`/tags?tag=${encodeURIComponent(t.slug)}`}>#{t.name} ({t.count})</a>
        ))}
      </div>
    </div>
  );
}
