const posts = [
  {
    id: 1,
    title: "Sunrise River Cruise",
    caption: "ตื่นมารับอรุณที่เจ้าพระยากับ TripMate",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80",
    author: "Aom Wander",
    location: "ปทุมธานี",
    timeAgo: "2h ago",
  },
  {
    id: 2,
    title: "Hidden Cafe Corners",
    caption: "มุมสงบในคาเฟ่สวน แสงบ่ายนุ่มมาก",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    author: "Beam Explorer",
    location: "เชียงใหม่",
    timeAgo: "Yesterday",
  },
  {
    id: 3,
    title: "Street Food Nights",
    caption: "ชวนเดินตลาดค่ำ ลองเมนูท้องถิ่นแบบจัดเต็ม",
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80",
    author: "TripMate",
    location: "กรุงเทพฯ",
    timeAgo: "3d ago",
  },
];

export default function Home() {
  return (
    <div className="page">
      <header className="top-nav">
        <div className="nav-brand">TripMate</div>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#" className="active">
            Home
          </a>
          <a href="#">Places</a>
          <a href="#">Compose</a>
          <a href="#">Profile</a>
          <a href="#">Feedback</a>
        </nav>
      </header>

      <main className="content" aria-label="Travel stories feed">
        <section className="hero">
          <h1>Discover weekend escapes</h1>
          <p>
            เลือกจุดหมายใกล้กรุงเทพฯ แล้วออกเดินทางกับเพื่อนใหม่ในคอมมูนิตี้
            TripMate
          </p>
          <button type="button">Start exploring</button>
        </section>

        <section className="feed" aria-label="Latest posts">
          {posts.map((post) => (
            <article className="feed-card" key={post.id}>
              <div className="image-wrap">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="card-body">
                <h2>{post.title}</h2>
                <p>{post.caption}</p>
                <div className="card-meta">
                  <span>{post.author}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.location}</span>
                  <span aria-hidden="true">•</span>
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="page-footer">© {new Date().getFullYear()} TripMate Collective</footer>
    </div>
  );
}
