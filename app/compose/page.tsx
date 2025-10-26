// app/compose/page.tsx
export const metadata = { title: "Compose | TripMate" };

export default function Compose() {
  return (
    <main className="container">
      <h1>Compose</h1>
      <ComposeClient />
    </main>
  );
}

"use client";
import { useEffect, useMemo, useState } from "react";
import { extractHashtags, slugifyTag } from "@/lib/hashtags";
import { loadTagIndex, updateTagIndex } from "@/lib/tagStore";

function debounce<T extends (...args:any)=>void>(fn:T, ms=200) {
  let t:any; return (...args:any)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), ms); };
}

function ComposeClient() {
  const [caption, setCaption] = useState("");
  const [suggest, setSuggest] = useState<string[]>([]);
  const idx = useMemo(() => loadTagIndex(), []);

  const runSuggest = useMemo(()=>debounce((text:string)=>{
    const match = /#([A-Za-z0-9_\u0E00-\u0E7F]{1,50})$/.exec(text);
    if (!match) return setSuggest([]);
    const prefix = slugifyTag(match[1]);
    const cand = Object.keys(idx.tags).filter(k => k.startsWith(prefix)).slice(0,8);
    setSuggest(cand);
  }, 150), [idx]);

  useEffect(()=>{ runSuggest(caption); }, [caption]);

  function handleUseSuggestion(s: string) {
    setCaption(caption.replace(/#([A-Za-z0-9_\u0E00-\u0E7F]{1,50})$/, `#${s}`));
    setSuggest([]);
  }

  function handlePost() {
    const tags = extractHashtags(caption).map(slug => ({ slug, name: slug }));
    // Mock new post id = time
    updateTagIndex("post", `p-${Date.now()}`, tags);
    alert("โพสต์สำเร็จ! แฮชแท็กถูกบันทึกลงดัชนีแล้ว");
    location.href = "/";
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <label>Caption</label>
      <textarea className="input" rows={5} placeholder="พิมพ์ #แท็ก ในข้อความได้เลย"
        value={caption} onChange={e=>setCaption(e.target.value)} />
      {!!suggest.length && (
        <div className="chips" aria-label="Tag suggestions">
          {suggest.map(s => (
            <button key={s} className="chip" onClick={()=>handleUseSuggestion(s)}>#{s}</button>
          ))}
        </div>
      )}
      <button className="btn" style={{ marginTop: 12 }} onClick={handlePost} disabled={!caption.trim()}>
        โพสต์
      </button>
    </div>
  );
}
