// What's new: Centralised TripMate interactions for i18n, theming, data seeding, filters, feed rendering, profile frames, and local persistence.
(function () {
  const STORAGE_KEYS = {
    theme: "tripmate.theme",
    language: "tripmate.lang",
    posts: "tripmate.posts",
    frame: "tripmate.frame",
    feedback: "tripmate.feedback",
  };
  const DEFAULT_LANGUAGE = "th";
  const DEFAULT_THEME = "auto";
  const FALLBACK_DICTIONARIES = {
    th: {
      "nav.brand": "TripMate",
      "nav.home": "หน้าหลัก",
      "nav.places": "สถานที่",
      "nav.compose": "สร้างโพสต์",
      "nav.profile": "โปรไฟล์",
      "nav.feedback": "ฟีดแบ็ก",
      "feed.overline": "แรงบันดาลใจใหม่",
      "feed.title": "ค้นหาที่เที่ยวแนวตั้งสุดฮิป",
      "feed.subtitle": "TripMate รวมโพสต์ท่องเที่ยวสไตล์ Lemon8 ให้คุณได้ค้นหาแรงบันดาลใจใหม่ ๆ ทั้งคาเฟ่ สถานที่ถ่ายรูป และประสบการณ์ที่ไม่เหมือนใคร",
      "feed.cta": "แชร์โพสต์ของฉัน",
      "feed.explore": "สำรวจสถานที่",
      "feed.sectionTitle": "ฟีดจากคอมมูนิตี้",
      "feed.sectionSubtitle": "โพสต์ล่าสุดจากเพื่อนร่วมทาง",
      "feed.loadMore": "โหลดเพิ่มเติม",
      "feed.like": "ถูกใจ",
      "feed.save": "บันทึก",
      "feed.comment": "คอมเมนต์",
      "places.title": "สถานที่",
      "places.heading": "คัดสรรสถานที่เด่นในจังหวัดปทุมธานี",
      "places.subheading": "สำรวจคาเฟ่สุดชิล พิพิธภัณฑ์ ตลาด และกิจกรรม outdoor สำหรับทุกไลฟ์สไตล์",
      "places.quickFilter": "เฉพาะปทุมธานี",
      "places.filterTitle": "ตัวกรอง",
      "places.clear": "ล้างทั้งหมด",
      "places.searchLabel": "ค้นหา",
      "places.searchPlaceholder": "ค้นหาชื่อสถานที่หรือแท็ก",
      "places.province": "จังหวัด",
      "places.provinceAll": "ทุกจังหวัด",
      "places.category": "ประเภท",
      "places.tags": "แท็ก",
      "places.rating": "เรตติ้งขั้นต่ำ",
      "places.ratingMin": "ตั้งแต่",
      "places.sort": "เรียงตาม",
      "places.sortMatch": "เหมาะสมที่สุด",
      "places.sortRating": "เรตติ้งสูง",
      "places.sortNew": "ใหม่ล่าสุด",
      "places.results": "ผลลัพธ์",
      "places.resultsSuffix": "รายการ",
      "places.empty": "ไม่พบสถานที่ตามตัวกรอง ลองปรับเงื่อนไขดูนะ",
      "profile.title": "โปรไฟล์",
      "profile.heading": "อริสา นักสำรวจเมือง",
      "profile.bio": "ครีเอเตอร์สายคาเฟ่และธรรมชาติ ชอบพาเพื่อน ๆ ออกเดินทางใกล้กรุง",
      "profile.overview": "ภาพรวม",
      "profile.customize": "ตกแต่ง",
      "profile.recent": "โพสต์ล่าสุด",
      "profile.frames": "กรอบโปรไฟล์",
      "profile.framesHint": "เลือกกรอบที่ชอบ แล้วกดบันทึกเพื่อใช้กับทุกหน้าของคุณ",
      "profile.frameBasic": "สีน้ำเงินคลาสสิก",
      "profile.framePastel": "Pastel Dream",
      "profile.frameNeon": "Neon Pop",
      "profile.frameGold": "Golden Hour",
      "profile.frameLeafy": "Leafy Vibes",
      "profile.save": "บันทึก",
      "compose.title": "สร้างโพสต์",
      "compose.heading": "บันทึกความทรงจำใหม่",
      "compose.subheading": "อัปโหลดรูปหรือวิดีโอแนวตั้ง เพื่อแชร์แรงบันดาลใจให้เพื่อนร่วมชุมชน",
      "compose.previewHint": "พรีวิวสื่อจะแสดงที่นี่",
      "compose.mediaLabel": "เลือกไฟล์ภาพหรือวิดีโอ",
      "compose.mediaHelp": "รองรับภาพแนวตั้ง 4:5 และวิดีโอแนวตั้ง (MP4 / WebM)",
      "compose.titleLabel": "ชื่อโพสต์",
      "compose.captionLabel": "คำบรรยาย",
      "compose.captionPlaceholder": "เล่าประสบการณ์น่าสนใจ",
      "compose.placeLabel": "สถานที่",
      "compose.discard": "ล้างร่าง",
      "compose.submit": "เผยแพร่โพสต์",
      "feedback.title": "ฟีดแบ็ก",
      "feedback.heading": "เราอยากฟังเสียงจากคุณ",
      "feedback.subheading": "ข้อเสนอแนะของคุณช่วยให้ TripMate ดีขึ้นสำหรับนักเดินทางทุกคน",
      "feedback.nameLabel": "ชื่อ",
      "feedback.emailLabel": "อีเมล",
      "feedback.messageLabel": "ข้อความ",
      "feedback.messagePlaceholder": "อยากให้ TripMate ปรับปรุงอะไรบ้าง?",
      "feedback.reset": "ล้างฟอร์ม",
      "feedback.submit": "ส่งฟีดแบ็ก",
      "feedback.success": "ขอบคุณที่ส่งฟีดแบ็ก!",
      "feedback.nameError": "กรุณากรอกชื่อ",
      "feedback.emailError": "รูปแบบอีเมลไม่ถูกต้อง",
      "feedback.messageError": "กรุณากรอกข้อความ",
      "footer.copy": "© 2024 TripMate Collective. สร้างแรงบันดาลใจทุกการเดินทาง",
    },
    en: {
      "nav.brand": "TripMate",
      "nav.home": "Home",
      "nav.places": "Places",
      "nav.compose": "Compose",
      "nav.profile": "Profile",
      "nav.feedback": "Feedback",
      "feed.overline": "Fresh inspiration",
      "feed.title": "Discover portrait adventures",
      "feed.subtitle": "TripMate curates Lemon8-style travel stories with cafés, scenic spots, and lifestyle escapes just for you.",
      "feed.cta": "Share a post",
      "feed.explore": "Browse places",
      "feed.sectionTitle": "Community Feed",
      "feed.sectionSubtitle": "Latest drops from fellow explorers",
      "feed.loadMore": "Load more",
      "feed.like": "Like",
      "feed.save": "Save",
      "feed.comment": "Comment",
      "places.title": "Places",
      "places.heading": "Highlights around Pathum Thani",
      "places.subheading": "Sip at chic cafés, explore museums, night markets, and lush escapes near Bangkok.",
      "places.quickFilter": "Only Pathum Thani",
      "places.filterTitle": "Filters",
      "places.clear": "Clear filters",
      "places.searchLabel": "Search",
      "places.searchPlaceholder": "Search by place or tag",
      "places.province": "Province",
      "places.provinceAll": "All provinces",
      "places.category": "Category",
      "places.tags": "Tags",
      "places.rating": "Minimum rating",
      "places.ratingMin": "From",
      "places.sort": "Sort by",
      "places.sortMatch": "Best match",
      "places.sortRating": "Highest rating",
      "places.sortNew": "Newest",
      "places.results": "Results",
      "places.resultsSuffix": "matches",
      "places.empty": "No places match these filters. Try adjusting your selection.",
      "profile.title": "Profile",
      "profile.heading": "Arisa — City Explorer",
      "profile.bio": "Creator of cozy café and nature routes inspiring quick getaways near Bangkok.",
      "profile.overview": "Overview",
      "profile.customize": "Customize",
      "profile.recent": "Recent posts",
      "profile.frames": "Profile frames",
      "profile.framesHint": "Pick your favourite frame and save to use across the site.",
      "profile.frameBasic": "Classic Blue",
      "profile.framePastel": "Pastel Dream",
      "profile.frameNeon": "Neon Pop",
      "profile.frameGold": "Golden Hour",
      "profile.frameLeafy": "Leafy Vibes",
      "profile.save": "Save",
      "compose.title": "Compose",
      "compose.heading": "Share a new story",
      "compose.subheading": "Upload vertical photos or videos and inspire fellow travellers.",
      "compose.previewHint": "Your preview will appear here",
      "compose.mediaLabel": "Choose media",
      "compose.mediaHelp": "Supports 4:5 portraits and vertical MP4 / WebM videos",
      "compose.titleLabel": "Post title",
      "compose.captionLabel": "Caption",
      "compose.captionPlaceholder": "Describe your highlight",
      "compose.placeLabel": "Place",
      "compose.discard": "Discard",
      "compose.submit": "Publish",
      "feedback.title": "Feedback",
      "feedback.heading": "We love hearing from you",
      "feedback.subheading": "Share ideas so TripMate can craft better journeys for everyone.",
      "feedback.nameLabel": "Name",
      "feedback.emailLabel": "Email",
      "feedback.messageLabel": "Message",
      "feedback.messagePlaceholder": "How can we improve TripMate?",
      "feedback.reset": "Reset",
      "feedback.submit": "Send feedback",
      "feedback.success": "Thanks for the feedback!",
      "feedback.nameError": "Please add your name",
      "feedback.emailError": "Enter a valid email",
      "feedback.messageError": "Message cannot be empty",
      "footer.copy": "© 2024 TripMate Collective. Crafted for joyful journeys.",
    },
  };

  const USER_FRAMES = ["pf-frame-basic", "pf-frame-pastel", "pf-frame-neon", "pf-frame-gold", "pf-frame-leafy"];
  let activeDictionary = FALLBACK_DICTIONARIES[DEFAULT_LANGUAGE];

  const defaultUsers = [
    {
      id: "arisa",
      name: "Arisa P.",
      handle: "arisa.city",
      avatar: "assets/images/placeholder-2.svg",
      frame: "pf-frame-pastel",
    },
    {
      id: "miles",
      name: "Miles T.",
      handle: "miles.nomad",
      avatar: "assets/images/placeholder-3.svg",
      frame: "pf-frame-basic",
    },
  ];

  const defaultPosts = [
    {
      id: "post-1",
      userId: "arisa",
      title: "Sunset at Rangsit Skywalk",
      caption: "สะพานลอยชมวิวแม่น้ำเจ้าพระยาที่แสงเย็นสวยสุดใจ",
      mediaType: "image",
      mediaUrl: "assets/images/placeholder-1.svg",
      place: "Skywalk Rangsit",
      tags: ["photo-spot", "sunset"],
      likes: 324,
      saves: 210,
      comments: 32,
      createdAt: daysAgo(1),
    },
    {
      id: "post-2",
      userId: "miles",
      title: "Latte Art at Woodbrook",
      caption: "คาเฟ่สไตล์ญี่ปุ่นในเมืองปทุมธานี ที่บาริสต้าทำลาเต้อาร์ตไม่ซ้ำ",
      mediaType: "image",
      mediaUrl: "assets/images/placeholder-2.svg",
      place: "Woodbrook",
      tags: ["cafe", "indoor", "local-food"],
      likes: 198,
      saves: 150,
      comments: 18,
      createdAt: daysAgo(2),
    },
    {
      id: "post-3",
      userId: "arisa",
      title: "Night kayak adventure",
      caption: "พายคายัคยามค่ำพร้อมไฟ LED สีพาสเทล สวยมาก",
      mediaType: "video",
      mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      place: "Dreamy Kayak",
      tags: ["night", "outdoor"],
      likes: 402,
      saves: 282,
      comments: 45,
      createdAt: daysAgo(3),
    },
    {
      id: "post-4",
      userId: "miles",
      title: "Local breakfast at Talad Thai",
      caption: "สำรวจอาหารเช้าจากตลาดไท มีครบทั้งผลไม้และข้าวต้ม",
      mediaType: "image",
      mediaUrl: "assets/images/placeholder-4.svg",
      place: "Talad Thai",
      tags: ["market", "family", "budget"],
      likes: 132,
      saves: 88,
      comments: 21,
      createdAt: daysAgo(5),
    },
    {
      id: "post-5",
      userId: "arisa",
      title: "Hidden glasshouse garden",
      caption: "เรือนกระจกกลางสวน บรรยากาศเขียวขจีและแสงธรรมชาติ",
      mediaType: "image",
      mediaUrl: "assets/images/placeholder-5.svg",
      place: "Glasshouse Pathum",
      tags: ["photo-spot", "outdoor"],
      likes: 245,
      saves: 201,
      comments: 27,
      createdAt: daysAgo(7),
    },
    {
      id: "post-6",
      userId: "miles",
      title: "Street food alley",
      caption: "ซอยเล็ก ๆ ที่เต็มไปด้วยของกินกลางคืน",
      mediaType: "image",
      mediaUrl: "assets/images/placeholder-3.svg",
      place: "Pathum Alley",
      tags: ["night", "local-food"],
      likes: 167,
      saves: 120,
      comments: 14,
      createdAt: daysAgo(8),
    },
    {
      id: "post-7",
      userId: "arisa",
      title: "Weekend craft workshop",
      caption: "เวิร์กช็อปทำเซรามิกเล็ก ๆ ในปทุมธานี คนไม่แน่น งานดีมาก",
      mediaType: "image",
      mediaUrl: "assets/images/placeholder-1.svg",
      place: "Clay Play",
      tags: ["indoor", "family"],
      likes: 98,
      saves: 64,
      comments: 10,
      createdAt: daysAgo(10),
    },
    {
      id: "post-8",
      userId: "miles",
      title: "Cycling through rice fields",
      caption: "ปั่นจักรยานผ่านทุ่งนาเขียวชอุ่ม ลมเย็นสบาย",
      mediaType: "video",
      mediaUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      place: "Rice Loop",
      tags: ["outdoor", "adventure"],
      likes: 310,
      saves: 223,
      comments: 38,
      createdAt: daysAgo(12),
    },
  ];

  const placeSeed = [
    place("dreamy-cafe", "Cafe Daydream", "ปทุมธานี", "เมืองปทุมธานี", "คาเฟ่", ["photo-spot", "indoor"], 4.7, "assets/images/placeholder-2.svg"),
    place("pathum-museum", "Pathum Heritage Museum", "ปทุมธานี", "สามโคก", "พิพิธภัณฑ์", ["history", "indoor"], 4.5, "assets/images/placeholder-3.svg"),
    place("lotus-market", "Lotus Floating Market", "ปทุมธานี", "ลาดหลุมแก้ว", "ตลาด/ชุมชน", ["local-food", "family", "night"], 4.2, "assets/images/placeholder-4.svg"),
    place("dreamy-park", "Chao Phraya Sky Park", "ปทุมธานี", "คลองหลวง", "สวน/ธรรมชาติ", ["outdoor", "photo-spot"], 4.6, "assets/images/placeholder-1.svg"),
    place("kiddo-science", "Kiddo Science Farm", "ปทุมธานี", "ธัญบุรี", "สวนสนุก", ["family", "outdoor"], 4.4, "assets/images/placeholder-5.svg"),
    place("w-wa-cafe", "W-wa Minimal Cafe", "ปทุมธานี", "ลาดหลุมแก้ว", "คาเฟ่", ["minimal", "indoor"], 4.8, "assets/images/placeholder-2.svg"),
    place("skyline-pier", "Skyline Pier", "ปทุมธานี", "เมืองปทุมธานี", "สวน/ธรรมชาติ", ["sunset", "photo-spot"], 4.1, "assets/images/placeholder-1.svg"),
    place("taladthai", "Talad Thai", "ปทุมธานี", "คลองหลวง", "ตลาด/ชุมชน", ["local-food", "night"], 4.3, "assets/images/placeholder-4.svg"),
    place("art-village", "Sam Khok Art Village", "ปทุมธานี", "สามโคก", "ตลาด/ชุมชน", ["craft", "photo-spot"], 4.5, "assets/images/placeholder-3.svg"),
    place("lotus-garden", "Lotus Garden", "ปทุมธานี", "ลาดหลุมแก้ว", "สวน/ธรรมชาติ", ["outdoor", "calm"], 4.0, "assets/images/placeholder-5.svg"),
    place("river-retreat", "River Retreat", "ปทุมธานี", "ธัญบุรี", "สวน/ธรรมชาติ", ["calm", "family"], 4.6, "assets/images/placeholder-1.svg"),
    place("jazz-cafe", "Jazz & Drip", "กรุงเทพมหานคร", "ดอนเมือง", "คาเฟ่", ["night", "music"], 4.5, "assets/images/placeholder-2.svg"),
    place("light-museum", "Light Spectrum Museum", "กรุงเทพมหานคร", "หลักสี่", "พิพิธภัณฑ์", ["indoor", "photo-spot"], 4.3, "assets/images/placeholder-3.svg"),
    place("noodle-haven", "Noodle Haven", "นนทบุรี", "ปากเกร็ด", "ตลาด/ชุมชน", ["local-food", "budget"], 4.1, "assets/images/placeholder-4.svg"),
    place("island-park", "Island Riverside Park", "นนทบุรี", "เมืองนนทบุรี", "สวน/ธรรมชาติ", ["outdoor", "family"], 4.2, "assets/images/placeholder-5.svg"),
    place("creative-lab", "Creative Lab Studio", "กรุงเทพมหานคร", "หลักสี่", "พิพิธภัณฑ์", ["indoor", "art"], 4.4, "assets/images/placeholder-3.svg"),
  ];

  function place(id, name, province, district, category, tags, rating, thumb) {
    return {
      id,
      name,
      province,
      district,
      category,
      tags,
      ratingAvg: rating,
      coords: { lat: 0, lng: 0 },
      thumbnail: thumb,
      createdAt: daysAgo(Math.floor(Math.random() * 30) + 1),
    };
  }

  function daysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
  }

  function safeLocalStorage() {
    try {
      return window.localStorage;
    } catch (err) {
      return null;
    }
  }

  const storage = safeLocalStorage();

  function getStored(key, fallback) {
    if (!storage) return fallback;
    const raw = storage.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function setStored(key, value) {
    if (!storage) return;
    storage.setItem(key, JSON.stringify(value));
  }

  function getStoredString(key) {
    if (!storage) return null;
    return storage.getItem(key);
  }

  function setStoredString(key, value) {
    if (!storage) return;
    storage.setItem(key, value);
  }

  function matchMediaTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  async function init() {
    const page = document.body.dataset.page;
    initNav();
    await initLanguage();
    initTheme();
    switch (page) {
      case "home":
        initFeed();
        break;
      case "places":
        initPlaces();
        break;
      case "profile":
        initProfile();
        break;
      case "compose":
        initCompose();
        break;
      case "feedback":
        initFeedback();
        break;
      default:
        break;
    }
  }

  function initNav() {
    const route = document.body.dataset.page;
    document.querySelectorAll(".tm-nav-link").forEach((link) => {
      if (link.dataset.route === route) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      }
    });
  }

  async function initLanguage() {
    const storedLang = getStoredString(STORAGE_KEYS.language) || DEFAULT_LANGUAGE;
    await applyLanguage(storedLang, true);
    document.querySelectorAll(".tm-lang-btn").forEach((btn) => {
      if (btn.dataset.lang === storedLang) {
        btn.classList.add("is-active");
      }
      btn.addEventListener("click", async () => {
        await applyLanguage(btn.dataset.lang, false);
      });
    });
  }

  async function applyLanguage(lang, skipStore) {
    const dictionary = await loadDictionary(lang);
    if (!dictionary) return;
    if (!skipStore) setStoredString(STORAGE_KEYS.language, lang);
    document.documentElement.lang = lang;
    applyTranslations(dictionary);
    activeDictionary = dictionary;
    document.querySelectorAll(".tm-lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    document.dispatchEvent(new CustomEvent("tripmate:language", { detail: { lang } }));
  }

  async function loadDictionary(lang) {
    if (!lang) return null;
    try {
      const response = await fetch(`i18n/${lang}.json`);
      if (!response.ok) throw new Error("Failed to fetch dictionary");
      return await response.json();
    } catch (err) {
      return FALLBACK_DICTIONARIES[lang] || FALLBACK_DICTIONARIES[DEFAULT_LANGUAGE];
    }
  }

  function applyTranslations(dictionary) {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (dictionary[key]) node.textContent = dictionary[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      if (dictionary[key] && node.placeholder !== undefined) node.placeholder = dictionary[key];
    });
  }

  function initTheme() {
    const storedTheme = getStoredString(STORAGE_KEYS.theme) || DEFAULT_THEME;
    applyTheme(storedTheme === "auto" ? matchMediaTheme() : storedTheme);
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    updateThemeIcon();
    toggle.addEventListener("click", () => {
      const current = document.body.dataset.theme || matchMediaTheme();
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      setStoredString(STORAGE_KEYS.theme, next);
      updateThemeIcon();
    });
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        const manual = getStoredString(STORAGE_KEYS.theme);
        if (!manual || manual === "auto") {
          applyTheme(event.matches ? "dark" : "light");
          updateThemeIcon();
        }
      });
    }
  }

  function updateThemeIcon() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;
    const theme = document.body.dataset.theme || "light";
    toggle.textContent = theme === "dark" ? "🌙" : "☀️";
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
  }

  function initFeed() {
    const posts = getStored(STORAGE_KEYS.posts, defaultPosts.slice());
    const feedGrid = document.getElementById("feed-grid");
    const skeleton = document.getElementById("feed-skeleton");
    const loadMoreBtn = document.getElementById("load-more");
    const template = document.getElementById("post-card-template");
    const feedTags = document.getElementById("feed-tags");
    if (!feedGrid || !template) return;

    buildSkeleton(skeleton, 6);
    renderTags(posts, feedTags);
    let batch = 0;
    const pageSize = 4;

    function renderNextBatch() {
      const start = batch * pageSize;
      const nextSlice = posts.slice(start, start + pageSize);
      if (!nextSlice.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add("is-disabled");
        return;
      }
      skeleton.style.display = "grid";
      setTimeout(() => {
        skeleton.style.display = "none";
        nextSlice.forEach((post) => {
          const node = template.content.cloneNode(true);
          const article = node.querySelector(".tm-post-card");
          const mediaWrapper = node.querySelector(".tm-media-wrapper");
          const img = node.querySelector(".tm-post-media");
          const playBtn = node.querySelector(".tm-play-btn");
          const authorEl = node.querySelector(".tm-post-author");
          const timeEl = node.querySelector(".tm-post-time");
          const titleEl = node.querySelector(".tm-post-title");
          const captionEl = node.querySelector(".tm-post-caption");
          const likeBtn = node.querySelector(".tm-like");
          const saveBtn = node.querySelector(".tm-save");
          const commentBtn = node.querySelector(".tm-comment");
          const likeCount = likeBtn.querySelector(".tm-count");
          const saveCount = saveBtn.querySelector(".tm-count");
          const commentCount = commentBtn.querySelector(".tm-count");
          const profileThumb = node.querySelector(".tm-profile-thumb");
          const profileImg = node.querySelector(".tm-profile-img");

          const user = defaultUsers.find((u) => u.id === post.userId) || defaultUsers[0];
          const frameClass = getCurrentFrame(user.id);
          profileThumb.dataset.userId = user.id;
          profileThumb.classList.add(frameClass);
          profileImg.src = user.avatar;
          profileImg.alt = `${user.name}`;

          if (post.mediaType === "video") {
            article.dataset.kind = "video";
            const video = document.createElement("video");
            video.className = "tm-post-video";
            video.src = post.mediaUrl;
            video.setAttribute("playsinline", "");
            video.setAttribute("muted", "");
            video.setAttribute("preload", "metadata");
            mediaWrapper.appendChild(video);
            playBtn.addEventListener("click", () => toggleVideo(video, playBtn));
            mediaWrapper.addEventListener("click", () => toggleVideo(video, playBtn));
            img.remove();
          } else {
            img.src = post.mediaUrl;
            img.alt = post.title || "";
          }

          authorEl.textContent = `${user.name} · @${user.handle}`;
          timeEl.textContent = formatTimeAgo(post.createdAt, document.documentElement.lang || DEFAULT_LANGUAGE);
          timeEl.dateTime = post.createdAt;
          titleEl.textContent = post.title || "";
          captionEl.textContent = clampCaption(post.caption || "");
          likeCount.textContent = post.likes;
          saveCount.textContent = post.saves;
          commentCount.textContent = post.comments;

          likeBtn.addEventListener("click", () => toggleCount(likeBtn, likeCount));
          saveBtn.addEventListener("click", () => toggleCount(saveBtn, saveCount));
          commentBtn.addEventListener("click", () => window.alert("Comments are coming soon!"));

          feedGrid.appendChild(node);
        });
        batch += 1;
      }, 320);
    }

    renderNextBatch();
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", renderNextBatch);
    }

    document.addEventListener("tripmate:language", (event) => {
      refreshTimeLabels(feedGrid, event.detail.lang);
    });
    document.addEventListener("tripmate:frame", (event) => {
      const { frame, userId } = event.detail;
      feedGrid.querySelectorAll(`.tm-profile-thumb[data-user-id="${userId}"]`).forEach((thumb) => {
        USER_FRAMES.forEach((cls) => thumb.classList.remove(cls));
        thumb.classList.add(frame);
      });
    });
  }

  function buildSkeleton(container, count) {
    if (!container) return;
    container.innerHTML = "";
    container.style.display = "grid";
    for (let i = 0; i < count; i += 1) {
      const skeleton = document.createElement("div");
      skeleton.className = "tm-skeleton-card";
      container.appendChild(skeleton);
    }
    setTimeout(() => {
      container.style.display = "none";
    }, 400);
  }

  function renderTags(posts, container) {
    if (!container) return;
    const allTags = new Set();
    posts.forEach((post) => post.tags.forEach((tag) => allTags.add(tag)));
    container.innerHTML = "";
    Array.from(allTags)
      .slice(0, 6)
      .forEach((tag) => {
        const chip = document.createElement("span");
        chip.className = "tm-chip";
        chip.textContent = `#${tag}`;
        container.appendChild(chip);
      });
  }

  function toggleCount(button, counterEl) {
    const pressed = button.getAttribute("aria-pressed") === "true";
    const count = Number(counterEl.textContent || "0");
    button.setAttribute("aria-pressed", String(!pressed));
    counterEl.textContent = pressed ? Math.max(count - 1, 0) : count + 1;
  }

  function toggleVideo(video, playBtn) {
    if (video.paused) {
      video.play();
      playBtn.textContent = "⏸";
    } else {
      video.pause();
      playBtn.textContent = "▶";
    }
  }

  function refreshTimeLabels(scope, lang) {
    scope.querySelectorAll("time").forEach((timeEl) => {
      timeEl.textContent = formatTimeAgo(timeEl.dateTime, lang);
    });
  }

  function clampCaption(text, max = 140) {
    if (text.length <= max) return text;
    return `${text.slice(0, max - 1)}…`;
  }

  function formatTimeAgo(dateISO, lang) {
    const date = new Date(dateISO);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);
    if (diffMinutes < 60) {
      return lang === "th" ? `เมื่อ ${diffMinutes} นาทีที่แล้ว` : `${diffMinutes}m ago`;
    }
    if (diffHours < 24) {
      return lang === "th" ? `เมื่อ ${diffHours} ชม.ที่แล้ว` : `${diffHours}h ago`;
    }
    if (diffDays < 7) {
      return lang === "th" ? `เมื่อ ${diffDays} วันที่แล้ว` : `${diffDays}d ago`;
    }
    return lang === "th" ? date.toLocaleDateString("th-TH") : date.toLocaleDateString("en-US");
  }

  function generateSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0E00-\u0E7F\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  function initPlaces() {
    const categories = ["คาเฟ่", "วัด/ศาสนสถาน", "พิพิธภัณฑ์", "ตลาด/ชุมชน", "สวน/ธรรมชาติ", "สวนสนุก"];
    const tagList = ["family", "budget", "outdoor", "photo-spot", "night", "local-food", "indoor", "adventure", "minimal", "craft", "calm", "music", "history", "art"];
    const places = placeSeed.slice();
    const searchInput = document.getElementById("search-places");
    const provinceSelect = document.getElementById("province-filter");
    const ratingRange = document.getElementById("rating-range");
    const ratingValue = document.getElementById("rating-value");
    const sortSelect = document.getElementById("sort-select");
    const pathumBtn = document.getElementById("pathum-only");
    const activeFilters = document.getElementById("active-filters");
    const resultsCount = document.getElementById("results-count");
    const grid = document.getElementById("places-grid");
    const emptyState = document.getElementById("no-results");
    const template = document.getElementById("place-card-template");

    const state = {
      search: "",
      provinces: "all",
      categories: new Set(),
      tags: new Set(),
      rating: 0,
      sort: "match",
    };

    buildOptions(categories, document.getElementById("category-chips"), state.categories);
    buildOptions(tagList, document.getElementById("tag-chips"), state.tags);

    const debouncedSearch = debounce((value) => {
      state.search = value;
      render();
    }, 250);

    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        debouncedSearch(event.target.value.trim());
      });
    }

    provinceSelect?.addEventListener("change", (event) => {
      state.provinces = event.target.value;
      render();
    });

    ratingRange?.addEventListener("input", (event) => {
      const value = Number(event.target.value);
      ratingValue.textContent = value.toFixed(1);
      state.rating = value;
      render();
    });

    sortSelect?.addEventListener("change", (event) => {
      state.sort = event.target.value;
      render();
    });

    pathumBtn?.addEventListener("click", () => {
      state.provinces = "ปทุมธานี";
      provinceSelect.value = "ปทุมธานี";
      render();
    });

    document.getElementById("clear-all")?.addEventListener("click", () => {
      state.search = "";
      searchInput.value = "";
      state.provinces = "all";
      provinceSelect.value = "all";
      state.categories.clear();
      state.tags.clear();
      state.rating = 0;
      ratingRange.value = "0";
      ratingValue.textContent = "0";
      state.sort = "match";
      sortSelect.value = "match";
      document.querySelectorAll(".tm-chip-option").forEach((chip) => chip.setAttribute("aria-pressed", "false"));
      render();
    });

    render();

    function render() {
      const lang = document.documentElement.lang || DEFAULT_LANGUAGE;
      const filtered = places
        .filter((item) => {
          if (state.provinces !== "all" && item.province !== state.provinces) return false;
          if (state.categories.size && !state.categories.has(item.category)) return false;
          if (state.tags.size && !item.tags.some((tag) => state.tags.has(tag))) return false;
          if (state.rating > 0 && item.ratingAvg < state.rating) return false;
          if (state.search) {
            const term = state.search.toLowerCase();
            const matchesText = item.name.toLowerCase().includes(term);
            const matchesTags = item.tags.some((tag) => tag.toLowerCase().includes(term));
            if (!matchesText && !matchesTags) return false;
          }
          return true;
        })
        .sort((a, b) => sortPlaces(a, b, state.sort));

      resultsCount.textContent = filtered.length;
      activeFilters.innerHTML = "";
      buildActiveFilterChips(state, activeFilters, render);

      grid.innerHTML = "";
      if (!filtered.length) {
        emptyState.hidden = false;
        return;
      }
      emptyState.hidden = true;
      filtered.forEach((place) => {
        const node = template.content.cloneNode(true);
        const card = node.querySelector(".tm-place-card");
        const media = node.querySelector(".tm-place-media");
        const name = node.querySelector(".tm-place-name");
        const rating = node.querySelector(".tm-place-rating");
        const meta = node.querySelector(".tm-place-meta");
        const tags = node.querySelector(".tm-place-tags");
        const img = document.createElement("img");
        img.src = place.thumbnail;
        img.alt = place.name;
        img.loading = "lazy";
        media.appendChild(img);
        name.textContent = place.name;
        rating.textContent = `${place.ratingAvg.toFixed(1)} ★`;
        meta.textContent = `${place.province} · ${place.district}`;
        tags.textContent = place.tags.map((tag) => `#${tag}`).join("  ");
        card.setAttribute("data-slug", generateSlug(place.name));
        card.addEventListener("click", () => {
          window.location.hash = generateSlug(place.name);
        });
        grid.appendChild(node);
      });
    }

    document.addEventListener("tripmate:language", () => render());
  }

  function buildOptions(items, container, stateSet) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach((item) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "tm-chip-option";
      chip.textContent = item;
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", () => {
        const active = chip.getAttribute("aria-pressed") === "true";
        if (active) {
          chip.setAttribute("aria-pressed", "false");
          stateSet.delete(item);
        } else {
          chip.setAttribute("aria-pressed", "true");
          stateSet.add(item);
        }
        container.dispatchEvent(new CustomEvent("tripmate:filters"));
      });
      container.appendChild(chip);
    });
    container.addEventListener("tripmate:filters", () => {
      container.dispatchEvent(new Event("change"));
    });
    container.addEventListener("change", () => {
      // bubble change for parent renderer
      container.parentElement?.dispatchEvent(new Event("change"));
    });
  }

  function buildActiveFilterChips(state, container, render) {
    const clearChip = (label, callback) => {
      const chip = document.createElement("span");
      chip.className = "tm-chip";
      chip.innerHTML = `${label} <button type="button" aria-label="remove">×</button>`;
      chip.querySelector("button").addEventListener("click", () => {
        callback();
        render();
      });
      container.appendChild(chip);
    };
    if (state.provinces !== "all") {
      clearChip(state.provinces, () => {
        state.provinces = "all";
        const select = document.getElementById("province-filter");
        if (select) select.value = "all";
      });
    }
    state.categories.forEach((value) => {
      clearChip(value, () => {
        state.categories.delete(value);
        findChipWithText("category-chips", value)?.setAttribute("aria-pressed", "false");
      });
    });
    state.tags.forEach((value) => {
      clearChip(`#${value}`, () => {
        state.tags.delete(value);
        findChipWithText("tag-chips", value)?.setAttribute("aria-pressed", "false");
      });
    });
    if (state.rating > 0) {
      clearChip(`≥ ${state.rating.toFixed(1)}★`, () => {
        state.rating = 0;
        const range = document.getElementById("rating-range");
        const label = document.getElementById("rating-value");
        if (range) range.value = "0";
        if (label) label.textContent = "0";
      });
    }
  }

  function findChipWithText(containerId, text) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    return Array.from(container.querySelectorAll(".tm-chip-option")).find((chip) => chip.textContent === text) || null;
  }

  function sortPlaces(a, b, sort) {
    switch (sort) {
      case "rating":
        return b.ratingAvg - a.ratingAvg;
      case "new":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return a.name.localeCompare(b.name, "th");
    }
  }

  function initProfile() {
    const badgesContainer = document.getElementById("profile-badges");
    const recentContainer = document.getElementById("profile-recent");
    const template = document.getElementById("profile-card-template");
    const frameOptions = document.querySelectorAll(".tm-frame-option");
    const framePreview = document.getElementById("frame-preview");
    const saveFrameBtn = document.getElementById("save-frame");
    const frame = getStoredString(STORAGE_KEYS.frame) || defaultUsers[0].frame;

    if (framePreview) {
      framePreview.className = `tm-profile-avatar ${frame}`;
    }
    const avatar = document.getElementById("profile-avatar");
    if (avatar) {
      avatar.className = `tm-profile-avatar ${frame}`;
    }

    renderBadges();
    renderRecent();
    initTabs();

    frameOptions.forEach((option) => {
      option.classList.toggle("is-active", option.dataset.frame === frame);
      option.addEventListener("click", () => {
        frameOptions.forEach((btn) => btn.classList.remove("is-active"));
        option.classList.add("is-active");
        const selected = option.dataset.frame;
        if (framePreview) framePreview.className = `tm-profile-avatar ${selected}`;
        if (avatar) avatar.className = `tm-profile-avatar ${selected}`;
        framePreview.dataset.frame = selected;
      });
    });

    saveFrameBtn?.addEventListener("click", () => {
      const selected = framePreview?.dataset.frame || frame;
      setStoredString(STORAGE_KEYS.frame, selected);
      showToast(getTranslation("profile.save"));
      document.dispatchEvent(new CustomEvent("tripmate:frame", { detail: { frame: selected, userId: "arisa" } }));
    });

    document.addEventListener("tripmate:language", renderBadges);

    function renderBadges() {
      if (!badgesContainer) return;
      badgesContainer.innerHTML = "";
      [
        { key: "Top Reviewer", i18n: "Top Reviewer" },
        { key: "Pathum Insider", i18n: "Pathum Insider" },
        { key: "Sunset Hunter", i18n: "Sunset Hunter" },
      ].forEach((badge) => {
        const span = document.createElement("span");
        span.className = "tm-badge";
        span.textContent = badge.i18n;
        badgesContainer.appendChild(span);
      });
    }

    function renderRecent() {
      if (!recentContainer || !template) return;
      recentContainer.innerHTML = "";
      const posts = getStored(STORAGE_KEYS.posts, defaultPosts.slice()).slice(0, 6);
      posts.forEach((post) => {
        const node = template.content.cloneNode(true);
        node.querySelector(".tm-mini-title").textContent = post.title;
        node.querySelector(".tm-mini-meta").textContent = `${post.place} · ${formatTimeAgo(post.createdAt, document.documentElement.lang || DEFAULT_LANGUAGE)}`;
        recentContainer.appendChild(node);
      });
    }

    document.addEventListener("tripmate:language", renderRecent);
  }

  function getCurrentFrame(userId) {
    const stored = getStoredString(STORAGE_KEYS.frame);
    if (userId === "arisa" && stored) return stored;
    const user = defaultUsers.find((u) => u.id === userId);
    return user ? user.frame : USER_FRAMES[0];
  }

  function initTabs() {
    const tabs = document.querySelectorAll(".tm-tab");
    const panels = document.querySelectorAll(".tm-tab-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((btn) => btn.setAttribute("aria-selected", String(btn === tab)));
        panels.forEach((panel) => {
          panel.hidden = panel.dataset.panel !== target;
        });
      });
    });
  }

  function initCompose() {
    const form = document.getElementById("compose-form");
    const mediaInput = document.getElementById("media-input");
    const preview = document.getElementById("upload-preview");
    const titleInput = document.getElementById("post-title");
    const captionInput = document.getElementById("post-caption");
    const placeInput = document.getElementById("post-place");
    const errorsContainer = document.getElementById("compose-errors");
    const discardBtn = document.getElementById("discard-draft");
    const datalist = document.getElementById("place-suggestions");

    const posts = getStored(STORAGE_KEYS.posts, defaultPosts.slice());
    const places = placeSeed.map((item) => item.name);
    if (datalist) {
      datalist.innerHTML = "";
      places.forEach((place) => {
        const option = document.createElement("option");
        option.value = place;
        datalist.appendChild(option);
      });
    }

    let mediaData = null;
    let mediaType = null;

    mediaInput?.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const type = file.type.startsWith("video") ? "video" : "image";
      mediaType = type;
      mediaData = await readFileAsDataURL(file);
      renderPreview(mediaData, type);
    });

    discardBtn?.addEventListener("click", () => {
      mediaInput.value = "";
      mediaData = null;
      mediaType = null;
      preview.innerHTML = `<p>${getTranslation("compose.previewHint")}</p>`;
      form.reset();
      errorsContainer.textContent = "";
    });

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const errors = [];
      if (!mediaData) errors.push(getTranslation("compose.mediaLabel"));
      if (!titleInput.value.trim()) errors.push(getTranslation("compose.titleLabel"));
      if (!captionInput.value.trim()) errors.push(getTranslation("compose.captionLabel"));
      if (errors.length) {
        errorsContainer.textContent = `${getTranslation("compose.submit")}: ${errors.join(", ")}`;
        return;
      }
      const newPost = {
        id: `post-${Date.now()}`,
        userId: "arisa",
        title: titleInput.value.trim(),
        caption: captionInput.value.trim(),
        mediaType: mediaType || "image",
        mediaUrl: mediaData,
        place: placeInput.value.trim(),
        tags: [],
        likes: 0,
        saves: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
      };
      posts.unshift(newPost);
      setStored(STORAGE_KEYS.posts, posts);
      showToast(getTranslation("feed.cta"));
      setTimeout(() => {
        window.location.href = "index.html";
      }, 600);
    });
  }

  function renderPreview(src, type) {
    const preview = document.getElementById("upload-preview");
    if (!preview) return;
    preview.innerHTML = "";
    if (type === "video") {
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.setAttribute("playsinline", "");
      video.muted = true;
      preview.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "";
      preview.appendChild(img);
    }
  }

  function initFeedback() {
    const form = document.getElementById("feedback-form");
    const nameInput = document.getElementById("fb-name");
    const emailInput = document.getElementById("fb-email");
    const messageInput = document.getElementById("fb-message");
    const toast = document.querySelector(".tm-toast");
    const toastClose = document.querySelector(".tm-toast-close");

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      clearFeedbackErrors();
      const entries = getStored(STORAGE_KEYS.feedback, []);
      const errors = [];
      if (!nameInput.value.trim()) {
        errors.push("name");
        document.getElementById("fb-name-error").textContent = getTranslation("feedback.nameError");
      }
      if (!isValidEmail(emailInput.value)) {
        errors.push("email");
        document.getElementById("fb-email-error").textContent = getTranslation("feedback.emailError");
      }
      if (!messageInput.value.trim()) {
        errors.push("message");
        document.getElementById("fb-message-error").textContent = getTranslation("feedback.messageError");
      }
      if (errors.length) {
        const firstError = errors[0];
        const field = document.getElementById(`fb-${firstError}`);
        field?.focus();
        return;
      }
      entries.push({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        createdAt: new Date().toISOString(),
      });
      setStored(STORAGE_KEYS.feedback, entries);
      form.reset();
      showToast(getTranslation("feedback.success"));
    });

    form?.addEventListener("reset", () => {
      clearFeedbackErrors();
    });

    toastClose?.addEventListener("click", hideToast);
  }

  function clearFeedbackErrors() {
    ["name", "email", "message"].forEach((key) => {
      const el = document.getElementById(`fb-${key}-error`);
      if (el) el.textContent = "";
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function showToast(message) {
    const toast = document.querySelector(".tm-toast");
    if (!toast) return;
    const messageEl = toast.querySelector(".tm-toast-message");
    messageEl.textContent = message;
    toast.hidden = false;
    setTimeout(hideToast, 2200);
  }

  function hideToast() {
    const toast = document.querySelector(".tm-toast");
    if (!toast) return;
    toast.hidden = true;
  }

  function getTranslation(key) {
    const dictionaries = [activeDictionary, FALLBACK_DICTIONARIES[document.documentElement.lang], FALLBACK_DICTIONARIES[DEFAULT_LANGUAGE]];
    for (const dict of dictionaries) {
      if (dict && dict[key]) return dict[key];
    }
    return key;
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
