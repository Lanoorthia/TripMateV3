// lib/mockData.ts
export type Post = { id: string; user: string; avatar: string; frame: string; caption: string; media: { type:"image"|"video"; src:string } };
export type Place = { id: string; name: string; province: string; district?: string; category: string; tags: string[]; ratingAvg: number; thumbnail: string; description?: string };

export const demoPosts: Post[] = [
  { id:"p1", user:"Pim", avatar:"/assets/avatars/pim.jpg", frame:"pf-frame-gold",
    caption:"วันสบายๆ ที่ #ปทุมธานี แวะ #ตลาดวัดศาลเจ้า อิ่มมาก 🥰", media:{ type:"image", src:"/assets/photos/watsaochao.jpg" } },
  { id:"p2", user:"Non", avatar:"/assets/avatars/non.jpg", frame:"pf-frame-pastel",
    caption:"เล่นสนุกสุดๆ ที่ #dreamworld #theme_park #family", media:{ type:"video", src:"/assets/videos/dreamworld.mp4" } },
];

export const demoPlaces: Place[] = [
  { id:"pl1", name:"Dream World", province:"ปทุมธานี", category:"สวนสนุก", tags:["dreamworld","theme_park","family","photo_spot"], ratingAvg:4.6, thumbnail:"/assets/photos/dreamworld.jpg", description:"สวนสนุกยอดนิยม #ปทุมธานี" },
  { id:"pl2", name:"พิพิธภัณฑ์วิทยาศาสตร์ คลอง5", province:"ปทุมธานี", category:"พิพิธภัณฑ์", tags:["museum","indoor","family","คลอง5"], ratingAvg:4.4, thumbnail:"/assets/photos/nsm.jpg", description:"#museum #ปทุมธานี #learning" },
  { id:"pl3", name:"ตลาดริมน้ำวัดศาลเจ้า", province:"ปทุมธานี", category:"ตลาด/ชุมชน", tags:["local_food","weekend","photo_spot"], ratingAvg:4.3, thumbnail:"/assets/photos/market.jpg" },
  { id:"pl4", name:"วัดเจดีย์หอย", province:"ปทุมธานี", category:"วัด/ศาสนสถาน", tags:["unique","photo_spot"], ratingAvg:4.2, thumbnail:"/assets/photos/shelltemple.jpg" },
  { id:"pl5", name:"ทุ่งบัวแดง คลอง13", province:"ปทุมธานี", category:"ธรรมชาติ", tags:["nature","outdoor","seasonal"], ratingAvg:4.1, thumbnail:"/assets/photos/lotus.jpg" },
  { id:"pl6", name:"Zpell @ Future Park", province:"ปทุมธานี", category:"ไลฟ์สไตล์", tags:["indoor","foodie","shopping"], ratingAvg:4.5, thumbnail:"/assets/photos/zpell.jpg" },
  // จังหวัดอื่นตัวอย่าง
  { id:"pl7", name:"วัดพระศรีรัตนศาสดาราม", province:"กรุงเทพฯ", category:"วัด/ศาสนสถาน", tags:["temple","photo_spot"], ratingAvg:4.8, thumbnail:"/assets/photos/wat.jpg" },
];
