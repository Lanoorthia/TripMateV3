/* What's new: Unified TripMate interactions with theme, language, feed, compose, profile frames, places filtering, and preserved aesthetic */

const STORAGE_KEYS = {
  theme: 'tripmate-theme',
  language: 'tripmate-language',
  posts: 'tripmate-posts',
  frame: 'tripmate-frame',
  feedback: 'tripmate-feedback',
};

const FALLBACK_TRANSLATIONS = {
  th: {
    'brand.title': 'TripMate',
    'search.placeholder': 'ค้นหาคาเฟ่ · สถานที่ · รีวิว',
    'nav.home': 'หน้าแรก',
    'nav.places': 'สถานที่',
    'nav.compose': 'สร้างโพสต์',
    'nav.profile': 'โปรไฟล์',
    'nav.feedback': 'ฟีดแบ็ก',
    'nav.theme': 'โหมดสว่าง',
    'hero.badge': 'พบแรงบันดาลใจ',
    'hero.title': 'ฟีดแนวตั้งสำหรับนักเดินทางสายไลฟ์สไตล์',
    'hero.subtitle': 'สำรวจภาพและวิดีโอรีวิวแนวตั้งที่คัดสรรโดยคอมมูนิตี้ TripMate พร้อมแรงบันดาลใจใหม่ทุกวัน',
    'hero.chip1': 'คาเฟ่สวย',
    'hero.chip2': 'โลคอลสปอต',
    'hero.chip3': 'ทริปสั้น',
    'hero.chip4': 'ปทุมธานี',
    'hero.cta': 'เริ่มแชร์ทริปของคุณ',
    'hero.secondary': 'ค้นหาที่เที่ยวที่ใช่',
    'hero.overlayTag': 'Highlight วันนี้',
    'hero.overlayTitle': 'คาเฟ่ริมเจ้าพระยา • ปทุมธานี',
    'hero.overlaySubtitle': 'วิวโค้งน้ำสวยพร้อมมุมถ่ายรูปแนวตั้งสุดปัง',
    'breadcrumb.home': 'หน้าแรก',
    'breadcrumb.feed': 'ฟีด',
    'breadcrumb.places': 'สถานที่',
    'breadcrumb.profile': 'โปรไฟล์',
    'breadcrumb.compose': 'สร้างโพสต์',
    'breadcrumb.feedback': 'ฟีดแบ็ก',
    'feed.title': 'เรื่องราวล่าสุด',
    'feed.quickPathum': 'เฉพาะโพสต์ปทุมธานี',
    'feed.loadMore': 'โหลดเพิ่มเติม',
    'feed.like': 'ถูกใจ',
    'feed.save': 'บันทึก',
    'feed.comment': 'คอมเมนต์',
    'feed.filters.pathum': 'โพสต์จากปทุมธานี',
    'feed.filters.clear': 'ล้างตัวกรอง',
    'footer.tagline': 'TripMate — แชร์ประสบการณ์เที่ยวแนวตั้งของคุณให้เพื่อนเห็นก่อนใคร',
    'footer.cta': 'พร้อมออกสำรวจปทุมธานี?',
    'footer.link': 'ดูที่เที่ยวทั้งหมด',
    'footer.back': 'กลับสู่ฟีด',
    'footer.share': 'สร้างโพสต์ใหม่',
    'places.title': 'ออกสำรวจจังหวัดปทุมธานี',
    'places.subtitle': 'กรองหาที่เที่ยว คาเฟ่ และกิจกรรมสุดพิเศษที่คัดมาให้คุณโดยเฉพาะ',
    'places.pathumOnly': 'เฉพาะปทุมธานี',
    'places.searchLabel': 'ค้นหาชื่อหรือแท็ก',
    'places.searchPlaceholder': 'เช่น ตลาดริมน้ำ · คาเฟ่หลังสวน',
    'places.province': 'จังหวัด',
    'places.sort': 'จัดเรียง',
    'places.sortMatch': 'Best match',
    'places.sortRating': 'Highest rating',
    'places.sortNew': 'Newest',
    'places.rating': 'เรตติ้งขั้นต่ำ',
    'places.category': 'ประเภท',
    'places.tags': 'แท็ก',
    'places.clear': 'ล้างตัวกรองทั้งหมด',
    'places.results': 'ผลการค้นหา',
    'places.empty': 'ยังไม่พบสถานที่ตรงกับตัวกรอง ลองลดเงื่อนไขหรือดูจังหวัดใกล้เคียง',
    'places.modal.about': 'เกี่ยวกับสถานที่นี้',
    'places.modal.tags': 'แท็กยอดนิยม',
    'places.modal.rating': 'เรตติ้งเฉลี่ย',
    'profile.title': 'โปรไฟล์ของคุณ',
    'profile.subtitle': 'ติดตามกิจกรรมล่าสุด ปรับแต่งกรอบโปรไฟล์ และดูของตกแต่งทั้งหมดที่สะสมได้',
    'profile.bio': 'ชอบเส้นทางลัดวิวสวย คาเฟ่ริมน้ำ และการเดินทางแบบ slow life',
    'profile.customize': 'เลือกกรอบโปรไฟล์',
    'profile.customizeHint': 'เลือกกรอบที่ใช่เพื่อสะท้อนสไตล์ของคุณ ทุกโพสต์และคอมเมนต์จะใช้กรอบนี้',
    'profile.save': 'บันทึกการเปลี่ยนแปลง',
    'profile.badgesTitle': 'ของตกแต่งและรางวัล',
    'profile.saved': 'บันทึกแล้ว!',
    'compose.title': 'สร้างโพสต์ใหม่',
    'compose.subtitle': 'รองรับภาพแนวตั้ง 4:5 และวิดีโอแนวตั้ง 9:16 / 4:5 เพื่อให้ฟีดของคุณโดดเด่น',
    'compose.media': 'อัปโหลดภาพหรือวิดีโอ',
    'compose.mediaHint': 'ไฟล์วิดีโอจะแสดงตัวอย่างและเล่นแบบ mute เพื่อความสะดวก',
    'compose.caption': 'คำบรรยาย',
    'compose.captionPlaceholder': 'เล่าเรื่องราวหรือเคล็ดลับสั้น ๆ',
    'compose.location': 'เชื่อมกับสถานที่',
    'compose.locationPlaceholder': 'เช่น คาเฟ่ริมเจ้าพระยา',
    'compose.visibility': 'การมองเห็น',
    'compose.public': 'สาธารณะ',
    'compose.friends': 'เพื่อน',
    'compose.private': 'ส่วนตัว',
    'compose.submit': 'เผยแพร่โพสต์',
    'compose.clear': 'ล้างแบบฟอร์ม',
    'compose.success': 'โพสต์ของคุณถูกบันทึกแล้ว 🎉',
    'compose.error': 'กรุณาอัปโหลดไฟล์ภาพหรือวิดีโอ',
    'feedback.title': 'เสียงจากคุณคือพลังของ TripMate',
    'feedback.subtitle': 'แชร์สิ่งที่คุณชอบ ข้อเสนอแนะ หรือไอเดียใหม่ ๆ เพื่อให้ TripMate ดีขึ้นสำหรับทุกคน',
    'feedback.name': 'ชื่อ',
    'feedback.namePlaceholder': 'ชื่อเล่นหรือชื่อเต็ม',
    'feedback.email': 'อีเมล',
    'feedback.emailPlaceholder': 'you@email.com',
    'feedback.message': 'ข้อเสนอแนะ',
    'feedback.messagePlaceholder': 'บอกเราได้เลยว่าชอบอะไรหรืออยากให้ปรับอะไร',
    'feedback.submit': 'ส่งฟีดแบ็ก',
    'feedback.success': 'ขอบคุณสำหรับฟีดแบ็ก 💙',
    'feedback.history': 'ฟีดแบ็กล่าสุด',
    'feedback.error.name': 'กรุณากรอกชื่อ',
    'feedback.error.email': 'รูปแบบอีเมลไม่ถูกต้อง',
    'feedback.error.message': 'กรุณากรอกข้อเสนอแนะ',
    'nav.theme.dark': 'โหมดมืด',
    'nav.theme.light': 'โหมดสว่าง',
  },
  en: {
    'brand.title': 'TripMate',
    'search.placeholder': 'Search cafés · spots · stories',
    'nav.home': 'Home',
    'nav.places': 'Places',
    'nav.compose': 'Compose',
    'nav.profile': 'Profile',
    'nav.feedback': 'Feedback',
    'nav.theme': 'Light mode',
    'hero.badge': 'Inspiration',
    'hero.title': 'Vertical stories for lifestyle explorers',
    'hero.subtitle': 'Discover curated vertical photos and videos from the TripMate community with fresh inspiration every day.',
    'hero.chip1': 'Stylish cafés',
    'hero.chip2': 'Local gems',
    'hero.chip3': 'Mini trips',
    'hero.chip4': 'Pathum Thani',
    'hero.cta': 'Share your trip',
    'hero.secondary': 'Find the right place',
    'hero.overlayTag': 'Today’s highlight',
    'hero.overlayTitle': 'Riverside café • Pathum Thani',
    'hero.overlaySubtitle': 'Scenic riverbend view with perfect portrait corners',
    'breadcrumb.home': 'Home',
    'breadcrumb.feed': 'Feed',
    'breadcrumb.places': 'Places',
    'breadcrumb.profile': 'Profile',
    'breadcrumb.compose': 'Compose',
    'breadcrumb.feedback': 'Feedback',
    'feed.title': 'Latest stories',
    'feed.quickPathum': 'Only Pathum Thani posts',
    'feed.loadMore': 'Load more',
    'feed.like': 'Like',
    'feed.save': 'Save',
    'feed.comment': 'Comment',
    'feed.filters.pathum': 'Posts from Pathum Thani',
    'feed.filters.clear': 'Clear filter',
    'footer.tagline': 'TripMate — Share your vertical travel stories before anyone else',
    'footer.cta': 'Ready to explore Pathum Thani?',
    'footer.link': 'See all places',
    'footer.back': 'Back to feed',
    'footer.share': 'Create a post',
    'places.title': 'Explore Pathum Thani province',
    'places.subtitle': 'Filter cafés, attractions, and curated highlights for your next trip.',
    'places.pathumOnly': 'Only Pathum Thani',
    'places.searchLabel': 'Search by name or tags',
    'places.searchPlaceholder': 'e.g. Riverside market · hidden café',
    'places.province': 'Province',
    'places.sort': 'Sort',
    'places.sortMatch': 'Best match',
    'places.sortRating': 'Highest rating',
    'places.sortNew': 'Newest',
    'places.rating': 'Minimum rating',
    'places.category': 'Category',
    'places.tags': 'Tags',
    'places.clear': 'Clear filters',
    'places.results': 'Results',
    'places.empty': 'No places match your filters. Try removing a few filters or check nearby provinces.',
    'places.modal.about': 'About this place',
    'places.modal.tags': 'Popular tags',
    'places.modal.rating': 'Average rating',
    'profile.title': 'Your profile',
    'profile.subtitle': 'Track your latest activity, choose a signature profile frame, and review your collectibles.',
    'profile.bio': 'Lover of scenic shortcuts, riverside cafés, and slow travel moments.',
    'profile.customize': 'Choose your profile frame',
    'profile.customizeHint': 'Pick the frame that matches your vibe. Every post and comment will use it.',
    'profile.save': 'Save changes',
    'profile.badgesTitle': 'Collectibles & rewards',
    'profile.saved': 'Saved!',
    'compose.title': 'Create a new post',
    'compose.subtitle': 'Supports portrait 4:5 photos and 9:16 / 4:5 videos so your feed shines.',
    'compose.media': 'Upload photo or video',
    'compose.mediaHint': 'Videos preview muted for easy review.',
    'compose.caption': 'Caption',
    'compose.captionPlaceholder': 'Tell your story or share quick tips',
    'compose.location': 'Attach a place',
    'compose.locationPlaceholder': 'e.g. Chao Phraya riverside café',
    'compose.visibility': 'Visibility',
    'compose.public': 'Public',
    'compose.friends': 'Friends',
    'compose.private': 'Private',
    'compose.submit': 'Publish post',
    'compose.clear': 'Clear form',
    'compose.success': 'Your post has been saved 🎉',
    'compose.error': 'Please upload a portrait photo or video',
    'feedback.title': 'Your voice powers TripMate',
    'feedback.subtitle': 'Tell us what you love, share suggestions, or pitch new ideas to make TripMate better.',
    'feedback.name': 'Name',
    'feedback.namePlaceholder': 'Nickname or full name',
    'feedback.email': 'Email',
    'feedback.emailPlaceholder': 'you@email.com',
    'feedback.message': 'Feedback',
    'feedback.messagePlaceholder': 'Share your thoughts and ideas',
    'feedback.submit': 'Send feedback',
    'feedback.success': 'Thanks for the feedback 💙',
    'feedback.history': 'Recent feedback',
    'feedback.error.name': 'Please enter your name',
    'feedback.error.email': 'Email format looks incorrect',
    'feedback.error.message': 'Let us know your thoughts',
    'nav.theme.dark': 'Dark mode',
    'nav.theme.light': 'Light mode',
  }
};

const DEFAULT_USERS = [
  {
    handle: '@tammy',
    name: 'Tammy Wander',
    avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80',
    frame: 'pf-frame-basic',
  },
  {
    handle: '@moss',
    name: 'Moss Fielding',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
    frame: 'pf-frame-pastel',
  },
];

const DEFAULT_POSTS = [
  {
    id: 'p1',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    caption: 'คาเฟ่บ้านสวนกลางทุ่งกับแสงยามบ่ายที่ตกกระทบโต๊ะไม้ ใครสาย slow life ต้องมาลอง 🪴',
    author: '@tammy',
    location: 'คาเฟ่ลุ่มเจ้าพระยา, ปทุมธานี',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    likes: 182,
    comments: 24,
    saves: 61,
    province: 'ปทุมธานี',
  },
  {
    id: 'p2',
    type: 'video',
    mediaUrl: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    poster: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    caption: 'วิดีโอไฮไลต์งานลอยกระทงริมแม่น้ำ เสียงดนตรีพื้นบ้านและไฟระยิบระยับตลอดคืน ✨',
    author: '@moss',
    location: 'ท่าน้ำวัดโปรดเกศ, ปทุมธานี',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    likes: 264,
    comments: 38,
    saves: 109,
    province: 'ปทุมธานี',
  },
  {
    id: 'p3',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    caption: 'Brunch คาเฟ่โทนสแกนดิเนเวียนพร้อมมุมสอนวาดภาพสำหรับเด็ก #family',
    author: '@tammy',
    location: 'Latte Lab Café, ปทุมธานี',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    likes: 92,
    comments: 12,
    saves: 27,
    province: 'ปทุมธานี',
  },
  {
    id: 'p4',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    caption: 'แวะตลาดน้ำเก่า ลองขนมครกสูตรครอบครัวและล่องเรือชมสวนผลไม้',
    author: '@moss',
    location: 'ตลาดน้ำคลองสาม, ปทุมธานี',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    likes: 74,
    comments: 9,
    saves: 18,
    province: 'ปทุมธานี',
  },
  {
    id: 'p5',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1455906876003-298dd8c44ab1?auto=format&fit=crop&w=900&q=80',
    caption: 'เดินเส้นทางศึกษาแนวป่าชายเลนระยะสั้น พกหมวกและกันแดดไปด้วยนะ',
    author: '@tammy',
    location: 'ศูนย์การเรียนรู้ป่าชายเลน, สมุทรปราการ',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    likes: 54,
    comments: 6,
    saves: 21,
    province: 'สมุทรปราการ',
  },
  {
    id: 'p6',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1500043208734-096709ffb87c?auto=format&fit=crop&w=900&q=80',
    caption: 'คาเฟ่ pet-friendly ให้หมาน้อยวิ่งเล่น สนามหญ้านุ่มมาก 🐶',
    author: '@moss',
    location: 'The Yard Café, ปทุมธานี',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 54).toISOString(),
    likes: 128,
    comments: 17,
    saves: 43,
    province: 'ปทุมธานี',
  },
  {
    id: 'p7',
    type: 'video',
    mediaUrl: 'https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4',
    poster: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=900&q=80',
    caption: 'ไนท์มาร์เก็ตเปิดใหม่ในเมือง มีมุมเล่นสเก็ตและเพลงสดทุกคืน',
    author: '@tammy',
    location: 'Pathum Night Yard',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
    likes: 211,
    comments: 29,
    saves: 97,
    province: 'ปทุมธานี',
  },
  {
    id: 'p8',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    caption: 'อาร์ตสเปซใหม่จัดนิทรรศการภาพถ่ายท้องถิ่นหมุนเวียนทุกสองเดือน',
    author: '@moss',
    location: 'Gallery 23, กรุงเทพฯ',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    likes: 48,
    comments: 5,
    saves: 14,
    province: 'กรุงเทพมหานคร',
  },
];

const DEFAULT_FEEDBACK = [
  {
    name: 'Aom',
    message: 'อยากได้ฟีเจอร์รวมแพ็กเกจคาเฟ่ + ที่พักในคืนเดียวกันเลยค่ะ',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    name: 'Ken',
    message: 'Dark mode ดีมาก ขอบคุณที่เพิ่มให้ ช่วยเพิ่มระบบเซฟไว้ดูออฟไลน์ได้อีกจะเลิศเลย',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 100).toISOString(),
  },
];

// preserved from original design: profile frame references retained for continuity
const PROFILE_FRAMES = [
  { id: 'pf-frame-basic', label: 'Crystal Blue' },
  { id: 'pf-frame-pastel', label: 'Pastel Bloom' },
  { id: 'pf-frame-neon', label: 'Neon Beam' },
  { id: 'pf-frame-gold', label: 'Golden Hour' },
  { id: 'pf-frame-leafy', label: 'Leafy Fresh' },
];

const DEFAULT_PLACES = [
  {
    id: 'place-1',
    name: 'ตลาดน้ำคลองลัดมะยม',
    province: 'กรุงเทพมหานคร',
    district: 'ตลิ่งชัน',
    category: 'ตลาด/ชุมชน',
    tags: ['local-food', 'family', 'boat'],
    ratingAvg: 4.6,
    coords: { lat: 13.765, lng: 100.43 },
    thumbnail: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 12,
    description: 'ตลาดน้ำบรรยากาศอบอุ่น เดินเลือกของพื้นบ้านพร้อมล่องเรือชมสวนผลไม้',
  },
  {
    id: 'place-2',
    name: 'คาเฟ่บ้านสวนปทุม',
    province: 'ปทุมธานี',
    district: 'สามโคก',
    category: 'คาเฟ่',
    tags: ['photo-spot', 'outdoor', 'family'],
    ratingAvg: 4.8,
    coords: { lat: 14.048, lng: 100.541 },
    thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 8,
    description: 'คาเฟ่ริมคลองในสวนผลไม้ มีโซนเปลญวนและบาร์กาแฟพิเศษ',
  },
  {
    id: 'place-3',
    name: 'วัดเจดีย์ทอง',
    province: 'ปทุมธานี',
    district: 'เมืองปทุมธานี',
    category: 'วัด/ศาสนสถาน',
    tags: ['heritage', 'photo-spot', 'calm'],
    ratingAvg: 4.4,
    coords: { lat: 14.019, lng: 100.545 },
    thumbnail: 'https://images.unsplash.com/photo-1524492449094-1fafe32003d4?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 18,
    description: 'วัดเก่าแก่ริมแม่น้ำเจ้าพระยา โดดเด่นด้วยเจดีย์ทองและจิตรกรรมฝาผนังสมัยรัตนโกสินทร์',
  },
  {
    id: 'place-4',
    name: 'สวนสนุก Dream Arena',
    province: 'ปทุมธานี',
    district: 'คลองหลวง',
    category: 'สวนสนุก',
    tags: ['family', 'indoor', 'night'],
    ratingAvg: 4.2,
    coords: { lat: 14.068, lng: 100.605 },
    thumbnail: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 30,
    description: 'สวนสนุกในร่มธีมอวกาศ พร้อมโซนไฮไลต์เครื่องเล่น VR และสไลเดอร์ยักษ์',
  },
  {
    id: 'place-5',
    name: 'พิพิธภัณฑ์เรือไทย',
    province: 'ปทุมธานี',
    district: 'สามโคก',
    category: 'พิพิธภัณฑ์',
    tags: ['heritage', 'indoor', 'education'],
    ratingAvg: 4.5,
    coords: { lat: 14.037, lng: 100.53 },
    thumbnail: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 72,
    description: 'พิพิธภัณฑ์ขนาดกะทัดรัดจัดแสดงเรือไทยหายาก พร้อมกิจกรรม workshop',
  },
  {
    id: 'place-6',
    name: 'Skyline Rooftop Pathum',
    province: 'ปทุมธานี',
    district: 'ธัญบุรี',
    category: 'คาเฟ่',
    tags: ['night', 'photo-spot', 'date'],
    ratingAvg: 4.7,
    coords: { lat: 14.028, lng: 100.71 },
    thumbnail: 'https://images.unsplash.com/photo-1506812574058-fc75fa93fead?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 10,
    description: 'รูฟท็อปวิวพระอาทิตย์ตก พร้อมมุมถ่ายภาพและเมนู crafted drinks',
  },
  {
    id: 'place-7',
    name: 'Farm & Flow Retreat',
    province: 'ปทุมธานี',
    district: 'ลาดหลุมแก้ว',
    category: 'สวน/ธรรมชาติ',
    tags: ['outdoor', 'family', 'wellness'],
    ratingAvg: 4.9,
    coords: { lat: 14.058, lng: 100.485 },
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 6,
    description: 'ฟาร์มผสมผสานกิจกรรมเวิร์กช็อปทำชีส โยคะกลางทุ่ง และคาเฟ่ฟาร์มทูเทเบิล',
  },
  {
    id: 'place-8',
    name: 'ตลาดริมน้ำปทุม',
    province: 'ปทุมธานี',
    district: 'เมืองปทุมธานี',
    category: 'ตลาด/ชุมชน',
    tags: ['local-food', 'night', 'boat'],
    ratingAvg: 4.3,
    coords: { lat: 14.016, lng: 100.533 },
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 20,
    description: 'ตลาดโทนอบอุ่นติดแม่น้ำเจ้าพระยา มีมุมดนตรีสดและโซนของฝากชุมชน',
  },
  {
    id: 'place-9',
    name: 'Leaf & Latte Greenhouse',
    province: 'ปทุมธานี',
    district: 'คลองหลวง',
    category: 'คาเฟ่',
    tags: ['photo-spot', 'indoor', 'coffee'],
    ratingAvg: 4.6,
    coords: { lat: 14.057, lng: 100.643 },
    thumbnail: 'https://images.unsplash.com/photo-1525054098605-8e762c017741?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 14,
    description: 'คาเฟ่ในเรือนกระจกใส พร้อมโซนต้นไม้หายากและ workshop จัดสวนขวด',
  },
  {
    id: 'place-10',
    name: 'คลองสวยฟ้า Kayak',
    province: 'ปทุมธานี',
    district: 'สามโคก',
    category: 'สวน/ธรรมชาติ',
    tags: ['outdoor', 'adventure', 'photo-spot'],
    ratingAvg: 4.1,
    coords: { lat: 14.04, lng: 100.517 },
    thumbnail: 'https://images.unsplash.com/photo-1516569422535-1d392b8f0b5e?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 4,
    description: 'พายคายัคผ่านคลองสายธรรมชาติพร้อมบริการถ่ายรูปด้วยโดรน',
  },
  {
    id: 'place-11',
    name: 'Pathum Creative Hub',
    province: 'ปทุมธานี',
    district: 'ธัญบุรี',
    category: 'พิพิธภัณฑ์',
    tags: ['indoor', 'photo-spot', 'night'],
    ratingAvg: 4.0,
    coords: { lat: 14.025, lng: 100.724 },
    thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 50,
    description: 'ศูนย์สร้างสรรค์พร้อมนิทรรศการหมุนเวียนและคาเฟ่ศิลป์',
  },
  {
    id: 'place-12',
    name: 'ตลาดบางเดื่อ OTOP',
    province: 'ปทุมธานี',
    district: 'เมืองปทุมธานี',
    category: 'ตลาด/ชุมชน',
    tags: ['local-food', 'family', 'souvenir'],
    ratingAvg: 4.5,
    coords: { lat: 14.024, lng: 100.526 },
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 28,
    description: 'ตลาดชุมชนริมคลองจำหน่ายอาหารท้องถิ่นและงานคราฟต์ฝีมือคนพื้นที่',
  },
  {
    id: 'place-13',
    name: 'สวนศิลป์ใต้ร่มไม้',
    province: 'ปทุมธานี',
    district: 'ลาดหลุมแก้ว',
    category: 'สวน/ธรรมชาติ',
    tags: ['outdoor', 'photo-spot', 'art'],
    ratingAvg: 4.7,
    coords: { lat: 14.06, lng: 100.47 },
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 16,
    description: 'สวนป่าแนวศิลป์มีงานติดตั้งกลางแจ้งและคาเฟ่เล็กๆ ซ่อนอยู่',
  },
  {
    id: 'place-14',
    name: 'วัดโบสถ์มณีศรีสุทธาวาส',
    province: 'ปทุมธานี',
    district: 'สามโคก',
    category: 'วัด/ศาสนสถาน',
    tags: ['heritage', 'calm', 'photo-spot'],
    ratingAvg: 4.8,
    coords: { lat: 14.041, lng: 100.545 },
    thumbnail: 'https://images.unsplash.com/photo-1524492449094-1fafe32003d4?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 90,
    description: 'วัดริมคลองที่มีอุโมงค์ต้นไม้และพระอุโบสถสีทองสวยโดดเด่น',
  },
  {
    id: 'place-15',
    name: 'MooKata Sky Market',
    province: 'ปทุมธานี',
    district: 'คลองหลวง',
    category: 'ตลาด/ชุมชน',
    tags: ['night', 'local-food', 'photo-spot'],
    ratingAvg: 4.1,
    coords: { lat: 14.081, lng: 100.617 },
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 40,
    description: 'ตลาดนัดกลางคืนบรรยากาศลอฟต์ มีมุมกินหมูกระทะและดนตรีสด',
  },
  {
    id: 'place-16',
    name: 'หอวัฒนธรรมเจ้าพระยา',
    province: 'ปทุมธานี',
    district: 'เมืองปทุมธานี',
    category: 'พิพิธภัณฑ์',
    tags: ['heritage', 'education', 'indoor'],
    ratingAvg: 4.6,
    coords: { lat: 14.016, lng: 100.54 },
    thumbnail: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
    updatedAt: Date.now() - 1000 * 60 * 60 * 32,
    description: 'จัดแสดงประวัติศาสตร์ลุ่มเจ้าพระยา พร้อมโซน workshop สำหรับเด็ก',
  },
];

let translations = { ...FALLBACK_TRANSLATIONS };
let currentLang = localStorage.getItem(STORAGE_KEYS.language) || document.documentElement.lang || 'th';
let currentTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'light';
let dynamicPosts = [];
let feedLimit = 6;
let feedFilterProvince = null;

const debounce = (fn, delay = 250) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const clampCaption = (caption, limit = 120) => {
  if (!caption) return '';
  return caption.length > limit ? `${caption.slice(0, limit)}…` : caption;
};

const formatTimeAgo = (isoString, lang = currentLang) => {
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
  const now = Date.now();
  const value = new Date(isoString).getTime();
  const diff = value - now;
  const units = [
    { unit: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: 'week', ms: 1000 * 60 * 60 * 24 * 7 },
    { unit: 'day', ms: 1000 * 60 * 60 * 24 },
    { unit: 'hour', ms: 1000 * 60 * 60 },
    { unit: 'minute', ms: 1000 * 60 },
  ];
  for (const { unit, ms } of units) {
    const delta = Math.round(diff / ms);
    if (Math.abs(delta) >= 1) {
      return rtf.format(delta, unit);
    }
  }
  return rtf.format(Math.round(diff / 1000), 'second');
};

const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ก-๙\s-]/g, '')
    .replace(/\s+/g, '-');

const showToast = (key) => {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = t(key);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
};

const t = (key) => translations[currentLang]?.[key] || translations.th?.[key] || key;

const applyTranslations = () => {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.setAttribute('title', t(el.dataset.i18nTitle));
  });
  document.querySelectorAll('option[data-i18n]').forEach((opt) => {
    opt.textContent = t(opt.dataset.i18n);
  });
  const provinceSelect = document.getElementById('provinceSelect');
  if (provinceSelect && provinceSelect.options.length) {
    provinceSelect.options[0].textContent = currentLang === 'th' ? 'ทุกจังหวัด' : 'All provinces';
  }
  const themeToggleLabel = document.querySelector('#themeToggle span');
  if (themeToggleLabel) {
    themeToggleLabel.textContent = currentTheme === 'dark' ? t('nav.theme.dark') : t('nav.theme.light');
  }
  updateLanguageToggle();
  renderFeed();
  renderPlaces();
  renderFeedback();
  renderProfileCard();
};

const updateLanguageToggle = () => {
  const langToggle = document.getElementById('languageToggle');
  if (!langToggle) return;
  const display = currentLang === 'th' ? 'TH <span>|</span> <strong>EN</strong>' : 'EN <span>|</span> <strong>TH</strong>';
  langToggle.innerHTML = display;
};

const applyTheme = () => {
  document.documentElement.setAttribute('data-theme', currentTheme);
  const themeToggleLabel = document.querySelector('#themeToggle span');
  if (themeToggleLabel) {
    themeToggleLabel.textContent = currentTheme === 'dark' ? t('nav.theme.dark') : t('nav.theme.light');
  }
};

const loadTranslations = async () => {
  try {
    const [thResp, enResp] = await Promise.all([
      fetch(new URL('./i18n/th.json', window.location.href)).then((res) => (res.ok ? res.json() : null)).catch(() => null),
      fetch(new URL('./i18n/en.json', window.location.href)).then((res) => (res.ok ? res.json() : null)).catch(() => null),
    ]);
    translations = {
      th: thResp || FALLBACK_TRANSLATIONS.th,
      en: enResp || FALLBACK_TRANSLATIONS.en,
    };
  } catch (error) {
    translations = { ...FALLBACK_TRANSLATIONS };
  }
};

const loadDynamicPosts = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.posts) || '[]');
    dynamicPosts = Array.isArray(stored) ? stored : [];
  } catch (error) {
    dynamicPosts = [];
  }
};

const getAllPosts = () => {
  const posts = [...dynamicPosts, ...DEFAULT_POSTS];
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const getUserByHandle = (handle) => DEFAULT_USERS.find((user) => user.handle === handle) || DEFAULT_USERS[0];

const getFrameClass = () => localStorage.getItem(STORAGE_KEYS.frame) || DEFAULT_USERS[0].frame;

const renderFeed = () => {
  const feedGrid = document.getElementById('feedGrid');
  if (!feedGrid) return;
  const posts = getAllPosts();
  const filtered = feedFilterProvince ? posts.filter((post) => post.province === feedFilterProvince) : posts;
  const visible = filtered.slice(0, feedLimit);
  const filtersEl = document.getElementById('feedFilters');
  if (filtersEl) {
    filtersEl.innerHTML = '';
    if (feedFilterProvince) {
      const chip = document.createElement('span');
      chip.className = 'filter-chip';
      chip.innerHTML = `${t('feed.filters.pathum')} <button type="button" aria-label="${t('feed.filters.clear')}">×</button>`;
      chip.querySelector('button').addEventListener('click', () => {
        feedFilterProvince = null;
        renderFeed();
      });
      filtersEl.appendChild(chip);
    }
  }
  feedGrid.innerHTML = '';
  visible.forEach((post) => feedGrid.appendChild(createFeedCard(post)));
  const loadMoreBtn = document.getElementById('loadMorePosts');
  if (loadMoreBtn) {
    loadMoreBtn.disabled = visible.length >= filtered.length;
  }
};

const createFeedCard = (post) => {
  const user = getUserByHandle(post.author);
  const frameClass = post.author === '@tammy' ? getFrameClass() : user.frame;
  const card = document.createElement('article');
  card.className = 'feed-card';
  card.tabIndex = 0;
  const media = document.createElement('div');
  media.className = 'feed-media';
  if (post.type === 'video') {
    const video = document.createElement('video');
    video.src = post.mediaUrl;
    video.playsInline = true;
    video.muted = true;
    video.controls = false;
    if (post.poster) video.poster = post.poster;
    const toggle = document.createElement('button');
    toggle.className = 'play-toggle';
    toggle.type = 'button';
    toggle.innerHTML = '▶';
    toggle.setAttribute('aria-label', 'Toggle play');
    toggle.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        toggle.innerHTML = '⏸';
      } else {
        video.pause();
        toggle.innerHTML = '▶';
      }
    });
    media.append(video, toggle);
    const pill = document.createElement('span');
    pill.className = 'video-pill';
    pill.textContent = 'Video';
    media.appendChild(pill);
  } else {
    const img = document.createElement('img');
    img.src = post.mediaUrl;
    img.alt = post.caption;
    img.loading = 'lazy';
    media.appendChild(img);
  }
  const content = document.createElement('div');
  content.className = 'feed-content';
  const authorRow = document.createElement('div');
  authorRow.className = 'feed-author';
  const avatar = document.createElement('div');
  avatar.className = `avatar ${frameClass}`;
  const avatarImg = document.createElement('img');
  avatarImg.src = user.avatar;
  avatarImg.alt = user.name;
  avatar.appendChild(avatarImg);
  const authorMeta = document.createElement('div');
  const name = document.createElement('div');
  name.style.fontWeight = '600';
  name.textContent = user.name;
  const handle = document.createElement('div');
  handle.className = 'badge';
  handle.textContent = `${user.handle} • ${formatTimeAgo(post.createdAt)}`;
  authorMeta.append(name, handle);
  authorRow.append(avatar, authorMeta);
  const caption = document.createElement('p');
  caption.textContent = clampCaption(post.caption);
  const location = document.createElement('p');
  location.className = 'badge';
  location.textContent = post.location || '';
  const actions = document.createElement('div');
  actions.className = 'feed-actions';
  const likeBtn = document.createElement('button');
  likeBtn.innerHTML = `❤️ ${post.likes}`;
  likeBtn.setAttribute('aria-pressed', 'false');
  likeBtn.addEventListener('click', () => toggleCount(likeBtn, '❤️', post.likes));
  const saveBtn = document.createElement('button');
  saveBtn.innerHTML = `🔖 ${post.saves}`;
  saveBtn.setAttribute('aria-pressed', 'false');
  saveBtn.addEventListener('click', () => toggleCount(saveBtn, '🔖', post.saves));
  const commentBtn = document.createElement('button');
  commentBtn.innerHTML = `💬 ${post.comments}`;
  commentBtn.disabled = true;
  actions.append(likeBtn, saveBtn, commentBtn);
  content.append(authorRow, caption, location, actions);
  card.append(media, content);
  return card;
};

const toggleCount = (button, icon, base) => {
  const active = button.getAttribute('aria-pressed') === 'true';
  button.setAttribute('aria-pressed', String(!active));
  button.innerHTML = `${icon} ${active ? base : base + 1}`;
};

const renderPlaces = () => {
  const grid = document.getElementById('placesGrid');
  if (!grid) return;
  const state = window.tripmatePlacesState || initPlacesState();
  const places = applyPlaceFilters(state);
  grid.innerHTML = '';
  places.forEach((place) => grid.appendChild(createPlaceCard(place)));
  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    const label = currentLang === 'th' ? 'สถานที่' : 'places';
    countEl.textContent = `${places.length} ${label}`;
  }
  const emptyState = document.getElementById('emptyState');
  if (emptyState) {
    emptyState.classList.toggle('hidden', places.length > 0);
  }
};

const initPlacesState = () => {
  const state = {
    query: '',
    province: 'all',
    categories: new Set(),
    tags: new Set(),
    minRating: 0,
    sort: 'match',
    pathumOnly: false,
  };
  window.tripmatePlacesState = state;
  setupPlacesControls(state);
  return state;
};

const setupPlacesControls = (state) => {
  const provinces = Array.from(new Set(DEFAULT_PLACES.map((p) => p.province))).sort();
  const provinceSelect = document.getElementById('provinceSelect');
  if (provinceSelect) {
    provinceSelect.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = currentLang === 'th' ? 'ทุกจังหวัด' : 'All provinces';
    provinceSelect.appendChild(allOpt);
    provinces.forEach((prov) => {
      const opt = document.createElement('option');
      opt.value = prov;
      opt.textContent = prov;
      provinceSelect.appendChild(opt);
    });
    provinceSelect.addEventListener('change', () => {
      state.province = provinceSelect.value;
      renderPlaces();
    });
  }

  const categories = Array.from(new Set(DEFAULT_PLACES.map((p) => p.category)));
  const categoryChips = document.getElementById('categoryChips');
  if (categoryChips) {
    categoryChips.innerHTML = '';
    categories.forEach((cat) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = cat;
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        chip.setAttribute('aria-pressed', chip.classList.contains('active'));
        if (state.categories.has(cat)) state.categories.delete(cat);
        else state.categories.add(cat);
        renderPlaces();
      });
      categoryChips.appendChild(chip);
    });
  }

  const tagSet = new Set();
  DEFAULT_PLACES.forEach((p) => p.tags.forEach((tag) => tagSet.add(tag)));
  const tagChips = document.getElementById('tagChips');
  if (tagChips) {
    tagChips.innerHTML = '';
    Array.from(tagSet).forEach((tag) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip';
      chip.textContent = tag;
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        chip.setAttribute('aria-pressed', chip.classList.contains('active'));
        if (state.tags.has(tag)) state.tags.delete(tag);
        else state.tags.add(tag);
        renderPlaces();
      });
      tagChips.appendChild(chip);
    });
  }

  const ratingRange = document.getElementById('ratingRange');
  if (ratingRange) {
    const ratingVal = document.getElementById('ratingValue');
    ratingRange.addEventListener('input', () => {
      state.minRating = Number(ratingRange.value);
      if (ratingVal) ratingVal.textContent = `${state.minRating.toFixed(1)}+`;
      renderPlaces();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      state.sort = sortSelect.value;
      renderPlaces();
    });
  }

  const searchInput = document.getElementById('placeSearch');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      state.query = searchInput.value.trim().toLowerCase();
      renderPlaces();
    }));
  }

  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.query = '';
      state.province = 'all';
      state.categories.clear();
      state.tags.clear();
      state.minRating = 0;
      state.sort = 'match';
      state.pathumOnly = false;
      document.getElementById('pathumOnly')?.classList.remove('active');
      if (searchInput) searchInput.value = '';
      if (provinceSelect) provinceSelect.value = 'all';
      if (ratingRange) {
        ratingRange.value = '0';
        const ratingVal = document.getElementById('ratingValue');
        if (ratingVal) ratingVal.textContent = '0.0+';
      }
      if (sortSelect) sortSelect.value = 'match';
      document.querySelectorAll('#categoryChips .chip, #tagChips .chip').forEach((chip) => {
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      });
      renderPlaces();
    });
  }

  const pathumBtn = document.getElementById('pathumOnly');
  if (pathumBtn) {
    pathumBtn.addEventListener('click', () => {
      state.pathumOnly = !state.pathumOnly;
      pathumBtn.classList.toggle('active', state.pathumOnly);
      renderPlaces();
    });
  }
};

const applyPlaceFilters = (state) => {
  let list = [...DEFAULT_PLACES];
  if (state.pathumOnly) {
    list = list.filter((place) => place.province === 'ปทุมธานี');
  }
  if (state.province !== 'all') {
    list = list.filter((place) => place.province === state.province);
  }
  if (state.categories.size > 0) {
    list = list.filter((place) => state.categories.has(place.category));
  }
  if (state.tags.size > 0) {
    list = list.filter((place) => place.tags.some((tag) => state.tags.has(tag)));
  }
  if (state.query) {
    list = list.filter((place) => {
      const haystack = `${place.name} ${place.tags.join(' ')}`.toLowerCase();
      return haystack.includes(state.query);
    });
  }
  list = list.filter((place) => place.ratingAvg >= state.minRating);

  switch (state.sort) {
    case 'rating':
      list.sort((a, b) => b.ratingAvg - a.ratingAvg);
      break;
    case 'new':
      list.sort((a, b) => b.updatedAt - a.updatedAt);
      break;
    default:
      list.sort((a, b) => b.ratingAvg - a.ratingAvg / 2);
  }
  return list;
};

const createPlaceCard = (place) => {
  const card = document.createElement('article');
  card.className = 'place-card';
  card.tabIndex = 0;
  card.addEventListener('click', () => openPlaceModal(place));
  const img = document.createElement('img');
  img.src = place.thumbnail;
  img.alt = place.name;
  img.loading = 'lazy';
  const content = document.createElement('div');
  content.className = 'place-card-content';
  const title = document.createElement('h3');
  title.textContent = place.name;
  const meta = document.createElement('p');
  meta.textContent = `${place.district}, ${place.province}`;
  const rating = document.createElement('div');
  rating.className = 'rating';
  rating.innerHTML = `⭐ ${place.ratingAvg.toFixed(1)}`;
  const tags = document.createElement('div');
  tags.className = 'chip-list';
  place.tags.slice(0, 3).forEach((tag) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = `#${tag}`;
    tags.appendChild(chip);
  });
  content.append(title, meta, rating, tags);
  card.append(img, content);
  return card;
};

const openPlaceModal = (place) => {
  closeModal();
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  const modal = document.createElement('div');
  modal.className = 'modal';
  const header = document.createElement('header');
  const title = document.createElement('h2');
  title.textContent = place.name;
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.innerHTML = '×';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.addEventListener('click', closeModal);
  header.append(title, closeBtn);
  const body = document.createElement('section');
  const img = document.createElement('img');
  img.src = place.thumbnail;
  img.alt = place.name;
  img.loading = 'lazy';
  const aboutTitle = document.createElement('h3');
  aboutTitle.textContent = t('places.modal.about');
  const about = document.createElement('p');
  about.textContent = place.description;
  const rating = document.createElement('p');
  rating.textContent = `${t('places.modal.rating')}: ${place.ratingAvg.toFixed(1)} ⭐`;
  const tagsTitle = document.createElement('h3');
  tagsTitle.textContent = t('places.modal.tags');
  const tags = document.createElement('div');
  tags.className = 'chip-list';
  place.tags.forEach((tag) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = `#${tag}`;
    tags.appendChild(chip);
  });
  body.append(img, aboutTitle, about, rating, tagsTitle, tags);
  modal.append(header, body);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closeModal();
  });
};

const closeModal = () => {
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) backdrop.remove();
};

const renderProfile = () => {
  const frameOptions = document.getElementById('frameOptions');
  if (!frameOptions) return;
  const currentFrame = getFrameClass();
  frameOptions.innerHTML = '';
  PROFILE_FRAMES.forEach((frame) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'frame-option';
    option.setAttribute('aria-selected', frame.id === currentFrame ? 'true' : 'false');
    option.dataset.frame = frame.id;
    const preview = document.createElement('div');
    preview.className = `frame-preview ${frame.id}`;
    const img = document.createElement('img');
    img.src = DEFAULT_USERS[0].avatar;
    img.alt = frame.label;
    preview.appendChild(img);
    const label = document.createElement('span');
    label.textContent = frame.label;
    option.append(preview, label);
    option.addEventListener('click', () => {
      frameOptions.querySelectorAll('.frame-option').forEach((btn) => btn.setAttribute('aria-selected', 'false'));
      option.setAttribute('aria-selected', 'true');
      frameOptions.dataset.selectedFrame = frame.id;
    });
    frameOptions.appendChild(option);
  });
  const saveBtn = document.getElementById('saveFrame');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const selected = frameOptions.dataset.selectedFrame || currentFrame;
      localStorage.setItem(STORAGE_KEYS.frame, selected);
      document.dispatchEvent(new CustomEvent('tripmate:frame-updated'));
      showToast('profile.saved');
      renderProfileCard();
    });
  }
  renderProfileCard();
  renderBadges();
};

const renderProfileCard = () => {
  const avatar = document.getElementById('profileAvatar');
  if (avatar) {
    const frame = getFrameClass();
    avatar.className = `avatar ${frame}`;
  }
  const stats = document.getElementById('profileStats');
  if (stats) {
    stats.innerHTML = '';
    const items = [
      { label: currentLang === 'th' ? 'โพสต์ทั้งหมด' : 'Total posts', value: getAllPosts().length },
      { label: currentLang === 'th' ? 'ของสะสม' : 'Collectibles', value: PROFILE_FRAMES.length },
      { label: currentLang === 'th' ? 'แต้ม' : 'Points', value: 1240 },
    ];
    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'badge-item';
      card.innerHTML = `<strong>${item.value}</strong><div>${item.label}</div>`;
      stats.appendChild(card);
    });
  }
};

const renderBadges = () => {
  const badgeGrid = document.getElementById('badgeGrid');
  if (!badgeGrid) return;
  badgeGrid.innerHTML = '';
  PROFILE_FRAMES.forEach((frame) => {
    const item = document.createElement('div');
    item.className = 'badge-item';
    item.innerHTML = `<div class="frame-preview ${frame.id}"><img src="${DEFAULT_USERS[0].avatar}" alt="${frame.label}" /></div><div>${frame.label}</div>`;
    badgeGrid.appendChild(item);
  });
};

const setupCompose = () => {
  const form = document.getElementById('composeForm');
  if (!form) return;
  const mediaInput = document.getElementById('composeMedia');
  const preview = document.getElementById('composePreview');
  const captionInput = document.getElementById('composeCaption');
  const locationInput = document.getElementById('composeLocation');
  const visibilitySelect = document.getElementById('composeVisibility');
  const clearBtn = document.getElementById('clearCompose');

  mediaInput.addEventListener('change', () => {
    preview.innerHTML = '';
    const file = mediaInput.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (file.type.startsWith('video')) {
      const video = document.createElement('video');
      video.src = url;
      video.controls = true;
      video.playsInline = true;
      video.muted = true;
      preview.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = url;
      img.alt = captionInput.value || 'preview';
      preview.appendChild(img);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const file = mediaInput.files[0];
    if (!file) {
      showToast('compose.error');
      mediaInput.focus();
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const newPost = {
        id: `dyn-${Date.now()}`,
        type: file.type.startsWith('video') ? 'video' : 'image',
        mediaUrl: reader.result,
        caption: captionInput.value.trim(),
        author: '@tammy',
        location: locationInput.value.trim(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        saves: 0,
        province: locationInput.value.includes('ปทุม') ? 'ปทุมธานี' : 'กรุงเทพมหานคร',
      };
      dynamicPosts.unshift(newPost);
      localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(dynamicPosts.slice(0, 40)));
      document.dispatchEvent(new CustomEvent('tripmate:posts-updated'));
      showToast('compose.success');
      form.reset();
      preview.innerHTML = '';
    };
    reader.readAsDataURL(file);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      preview.innerHTML = '';
    });
  }
};

const getStoredFeedback = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.feedback) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
};

const setupFeedback = () => {
  const form = document.getElementById('feedbackForm');
  if (!form) return;
  const nameInput = document.getElementById('feedbackName');
  const emailInput = document.getElementById('feedbackEmail');
  const messageInput = document.getElementById('feedbackMessage');
  const errorName = document.getElementById('errorName');
  const errorEmail = document.getElementById('errorEmail');
  const errorMessage = document.getElementById('errorMessage');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    if (!nameInput.value.trim()) {
      errorName.textContent = t('feedback.error.name');
      errorName.classList.remove('hidden');
      nameInput.setAttribute('aria-describedby', 'errorName');
      valid = false;
    } else {
      errorName.classList.add('hidden');
      nameInput.removeAttribute('aria-describedby');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      errorEmail.textContent = t('feedback.error.email');
      errorEmail.classList.remove('hidden');
      emailInput.setAttribute('aria-describedby', 'errorEmail');
      valid = false;
    } else {
      errorEmail.classList.add('hidden');
      emailInput.removeAttribute('aria-describedby');
    }

    if (!messageInput.value.trim()) {
      errorMessage.textContent = t('feedback.error.message');
      errorMessage.classList.remove('hidden');
      messageInput.setAttribute('aria-describedby', 'errorMessage');
      valid = false;
    } else {
      errorMessage.classList.add('hidden');
      messageInput.removeAttribute('aria-describedby');
    }

    if (!valid) {
      const firstError = [nameInput, emailInput, messageInput].find((input) => input.hasAttribute('aria-describedby'));
      firstError?.focus();
      return;
    }

    const stored = getStoredFeedback();
    stored.unshift({
      name: nameInput.value.trim(),
      message: messageInput.value.trim(),
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEYS.feedback, JSON.stringify(stored.slice(0, 20)));
    showToast('feedback.success');
    form.reset();
    renderFeedback();
  });
};

const loadFeedback = () => {
  const stored = getStoredFeedback();
  return [...stored, ...DEFAULT_FEEDBACK].slice(0, 20);
};

const renderFeedback = () => {
  const list = document.getElementById('feedbackList');
  if (!list) return;
  const entries = loadFeedback();
  list.innerHTML = '';
  entries.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'feed-card';
    const content = document.createElement('div');
    content.className = 'feed-content';
    const header = document.createElement('div');
    header.className = 'feed-author';
    const avatar = document.createElement('div');
    avatar.className = `avatar ${getFrameClass()}`;
    const img = document.createElement('img');
    img.src = DEFAULT_USERS[0].avatar;
    img.alt = item.name;
    avatar.appendChild(img);
    const meta = document.createElement('div');
    const name = document.createElement('div');
    name.style.fontWeight = '600';
    name.textContent = item.name;
    const time = document.createElement('div');
    time.className = 'badge';
    time.textContent = formatTimeAgo(item.createdAt);
    meta.append(name, time);
    header.append(avatar, meta);
    const body = document.createElement('p');
    body.textContent = item.message;
    content.append(header, body);
    card.appendChild(content);
    list.appendChild(card);
  });
};

const highlightActiveNav = () => {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach((link) => {
    const isActive = link.dataset.nav === currentPage;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
};

const setupNavInteractions = () => {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme();
      localStorage.setItem(STORAGE_KEYS.theme, currentTheme);
    });
  }
  const langToggle = document.getElementById('languageToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'th' ? 'en' : 'th';
      localStorage.setItem(STORAGE_KEYS.language, currentLang);
      applyTranslations();
    });
  }
  const quickFilterPathum = document.getElementById('quickFilterPathum');
  if (quickFilterPathum) {
    quickFilterPathum.addEventListener('click', () => {
      feedFilterProvince = feedFilterProvince ? null : 'ปทุมธานี';
      renderFeed();
    });
  }
  const loadMoreBtn = document.getElementById('loadMorePosts');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      feedLimit += 3;
      renderFeed();
    });
  }
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        showToast('places.results');
      }
    });
  }
};

const hydrateThemeAndLanguage = () => {
  applyTheme();
  applyTranslations();
};

document.addEventListener('DOMContentLoaded', async () => {
  highlightActiveNav();
  await loadTranslations();
  loadDynamicPosts();
  applyTheme();
  applyTranslations();
  setupNavInteractions();
  renderFeed();
  renderPlaces();
  renderProfile();
  setupCompose();
  setupFeedback();
  renderFeedback();

  document.addEventListener('tripmate:frame-updated', () => {
    renderFeed();
    renderFeedback();
  });
  document.addEventListener('tripmate:posts-updated', () => {
    renderFeed();
  });

  hydrateThemeAndLanguage();
});
