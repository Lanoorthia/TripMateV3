// app/profile/page.tsx
export const metadata = { title: "Profile | TripMate" };

export default function Profile() {
  return (
    <main className="container">
      <h1>Profile</h1>
      <ProfileClient />
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";

const frames = ["pf-frame-basic","pf-frame-pastel","pf-frame-neon","pf-frame-gold","pf-frame-leafy"];

function ProfileClient() {
  const [frame, setFrame] = useState(frames[0]);
  useEffect(()=>{ setFrame(localStorage.getItem("profile_frame") || frames[0]); }, []);
  function save() {
    localStorage.setItem("profile_frame", frame);
    alert("บันทึกกรอบโปรไฟล์แล้ว");
  }
  return (
    <div className="row" style={{ gap:24 }}>
      <div className="card" style={{ padding:16 }}>
        <div className="row" style={{ gap:12 }}>
          <img className={`avatar ${frame}`} src="/assets/avatars/pim.jpg" alt="me" />
          <div>
            <strong>Pim</strong>
            <div className="muted">Entrepreneur & traveler</div>
          </div>
        </div>
        <div style={{ marginTop:12 }}>
          <div className="section-title">Customize frame</div>
          <div className="chips">
            {frames.map(f => (
              <button key={f} className="chip" aria-pressed={frame===f} onClick={()=>setFrame(f)}>
                {f.replace("pf-frame-","")}
              </button>
            ))}
          </div>
          <button className="btn" style={{ marginTop:12 }} onClick={save}>บันทึก</button>
        </div>
      </div>
    </div>
  );
}
