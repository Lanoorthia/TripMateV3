// app/places/page.tsx
import PlacesClient from "./places-client";

export const metadata = { title: "Places | TripMate" };
export default function Places() {
  return (
    <main className="container" style={{ display:"grid", gridTemplateColumns:"1fr", gap:24 }}>
      <div>
        <h1>Places</h1>
        <PlacesClient />
      </div>
      <aside className="sidebar">
        <TrendingTags />
      </aside>
    </main>
  );
}

"use client";
import { demoPlaces } from "@/lib/mockData";
import { useEffect, useMemo, useState } from "react";
import { updateTagIndex } from "@/lib/tagStore";
import { linkifyHashtags } from "@/lib/hashtags";
import { getTrendingTags } from "@/lib/tagStore";

function PlacesClient() {
  const [q, setQ] = useState("");
  const [province, setProvince] = useState("");
  const [selTags, setSelTags] = useState<string[]>([]);
  const allTags = useMemo(()=> Array.from(new Set(demoPlaces.flatMap(p=>p.tags))), []);
  const provinces = useMemo(()=> Array.from(new Set(demoPlaces.map(p=>p.province))), []);

  useEffect(() => {
    // seed tag index from places
    demoPlaces.forEach(p => {
      updateTagIndex("place", p.id, p.tags.map(t => ({ slug: t, name: t })));
    });
  }, []);

  const filtered = demoPlaces.filter(p => {
    const matchQ = q ? (p.name.includes(q) || p.tags.some(t => t.includes(q.replace(/^#/, "")))) : true;
    const matchProv = province ? p.province === province : true;
    const matchTags = selTags.length ? selTags.every(t => p.tags.includes(t)) : true;
    return matchQ && matchProv && matchTags;
  });

  function toggleTag(t: string) {
    setSelTags(s => s.includes(t) ? s.filter(x=>x!==t) : [...s, t]);
  }

  return (
    <>
      <div className="row" style={{ gap:12, marginBottom:12 }}>
        <input className="input" placeholder="ค้นหาด้วยชื่อหรือ #แท็ก" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="select" value={province} onChange={e=>setProvince(e.target.value)}>
          <option value="">ทุกจังหวัด</option>
          {provinces.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="chips">
        {allTags.map(t => (
          <button key={t} className="chip" aria-pressed={selTags.includes(t)} onClick={()=>toggleTag(t)}>
            #{t}
          </button>
        ))}
        {selTags.length>0 && (
          <button className="chip" onClick={()=>setSelTags([])}>ล้างแท็ก</button>
        )}
      </div>

      <div style={{ marginTop:12 }} className="muted">{filtered.length} ผลลัพธ์</div>

      <div className="grid" style={{ marginTop:12 }}>
        {filtered.map(p => (
          <article key={p.id} className="card">
            <img className="media" src={p.thumbnail} alt={p.name} loading="lazy" />
            <div className="pad">
              <div className="row" style={{ justifyContent:"space-between" }}>
                <strong>{p.name}</strong>
                <span className="badge">{p.ratingAvg.toFixed(1)}</span>
              </div>
              {p.description && (
                <div className="muted" dangerouslySetInnerHTML={{ __html: linkifyHashtags(p.description) }} />
              )}
              <div className="chips">
                {p.tags.map(t => <a key={t} className="chip" href={`/tags?tag=${encodeURIComponent(t)}`}>#{t}</a>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function TrendingTags() {
  const [tags, setTags] = useState<{slug:string;name:string;count:number}[]>([]);
  useEffect(()=>{ setTags(getTrendingTags()); }, []);
  if (!tags.length) return null;
  return (
    <div>
      <div className="section-title"># กำลังมาแรง</div>
      <div className="chips">
        {tags.map(t => <a key={t.slug} className="chip" href={`/tags?tag=${encodeURIComponent(t.slug)}`}>#{t.name}</a>)}
      </div>
    </div>
  );
}

export default PlacesClient;
