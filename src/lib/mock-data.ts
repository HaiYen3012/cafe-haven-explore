export interface Cafe {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  price_range: "cheap" | "moderate" | "expensive";
  tags: string[];
  photos: {
    menu: string[];
    interior: string[];
    food: string[];
  };
  description: string;
  phone: string;
  hours: string;
  distance?: number;
}

export interface Review {
  id: number;
  cafeId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
  categories: {
    drinks: number;
    food: number;
    service: number;
    atmosphere: number;
  };
  likes: number;
  timestamp: number; // Unix timestamp for sorting
}

// Function to get all cafes including user-submitted ones
export const getAllCafes = (): Cafe[] => {
  const userCafes = JSON.parse(localStorage.getItem("user_cafes") || "[]");
  return [...mockCafes, ...userCafes];
};

const mockCafes: Cafe[] = [
  {
    id: 1,
    name: "Highlands Coffee",
    address: "123 Hai Bà Trưng, Hoàn Kiếm, Hanoi",
    lat: 21.027,
    lng: 105.834,
    rating: 4.5,
    reviews: 124,
    price_range: "moderate",
    tags: ["Wi-Fi", "Outdoor", "Work-Friendly"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop",
      ],
    },
    description: "Popular Vietnamese coffee chain with spacious seating and reliable wifi.",
    phone: "0123 456 789",
    hours: "Mon–Fri: 7AM–10PM · Sat–Sun: 8AM–11PM",
    distance: 1.2,
  },
  {
    id: 2,
    name: "The Coffee House",
    address: "45 Trần Đại Nghĩa, Hai Bà Trưng, Hanoi",
    lat: 21.023,
    lng: 105.842,
    rating: 4.7,
    reviews: 89,
    price_range: "moderate",
    tags: ["Cat Café", "Wi-Fi", "Cozy"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1559305616-3b04f6c7c9ae?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1501622549218-2c3ef86627cb?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=600&h=400&fit=crop",
      ],
    },
    description: "Cat café with velvet sofas and killer matcha lattes.",
    phone: "0987 654 321",
    hours: "Mon–Sun: 8AM–11PM",
    distance: 2.1,
  },
  {
    id: 3,
    name: "Cộng Cà Phê",
    address: "78 Lê Duẩn, Đống Đa, Hanoi",
    lat: 21.018,
    lng: 105.828,
    rating: 4.3,
    reviews: 156,
    price_range: "cheap",
    tags: ["Vintage", "Local Vibe", "Coconut Coffee"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1572282464867-8a0b2c052efe?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=400&fit=crop",
      ],
    },
    description: "Nostalgic Vietnamese café with vintage décor and famous coconut coffee.",
    phone: "0901 234 567",
    hours: "Daily: 7AM–11PM",
    distance: 3.5,
  },
  {
    id: 4,
    name: "Starbucks Reserve",
    address: "12 Lý Thường Kiệt, Hoàn Kiếm, Hanoi",
    lat: 21.029,
    lng: 105.835,
    rating: 4.6,
    reviews: 210,
    price_range: "expensive",
    tags: ["Premium", "Wi-Fi", "Power Outlets", "Work-Friendly"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1578374173705-0a2c6c3e7e3c?w=600&h=400&fit=crop",
      ],
    },
    description: "Upscale Starbucks with specialty brews and elegant atmosphere.",
    phone: "0912 345 678",
    hours: "Mon–Sun: 6AM–11PM",
    distance: 0.8,
  },
  {
    id: 5,
    name: "Maison Marou",
    address: "89 Bà Triệu, Hai Bà Trưng, Hanoi",
    lat: 21.025,
    lng: 105.838,
    rating: 4.8,
    reviews: 67,
    price_range: "expensive",
    tags: ["Chocolate", "Premium", "Desserts"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&h=400&fit=crop",
      ],
    },
    description: "French-Vietnamese chocolate house with artisanal drinks and pastries.",
    phone: "0909 876 543",
    hours: "Mon–Sun: 9AM–9PM",
    distance: 1.5,
  },
  {
    id: 6,
    name: "Puku Café & Sports Bar",
    address: "34 Tràng Tiền, Hoàn Kiếm, Hanoi",
    lat: 21.028,
    lng: 105.852,
    rating: 4.2,
    reviews: 92,
    price_range: "moderate",
    tags: ["Sports Bar", "Wi-Fi", "Outdoor"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=600&h=400&fit=crop",
      ],
    },
    description: "Lively café with sports screens, rooftop seating, and international menu.",
    phone: "0123 987 654",
    hours: "Daily: 8AM–12AM",
    distance: 2.8,
  },
  {
    id: 7,
    name: "Hanoi Social Club",
    address: "6 Hội Vũ, Hoàn Kiếm, Hanoi",
    lat: 21.031,
    lng: 105.847,
    rating: 4.7,
    reviews: 134,
    price_range: "moderate",
    tags: ["Brunch", "Wi-Fi", "Garden", "Cozy"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop",
      ],
    },
    description: "Hip brunch spot with garden seating and fusion food.",
    phone: "0987 321 654",
    hours: "Mon–Sun: 8AM–11PM",
    distance: 1.9,
  },
  {
    id: 8,
    name: "Tranquil Books & Coffee",
    address: "5 Nguyễn Quang Bích, Hoàn Kiếm, Hanoi",
    lat: 21.032,
    lng: 105.845,
    rating: 4.9,
    reviews: 78,
    price_range: "moderate",
    tags: ["Bookstore", "Quiet", "Wi-Fi", "Work-Friendly"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
      ],
    },
    description: "Quiet bookstore café perfect for reading and remote work.",
    phone: "0911 222 333",
    hours: "Mon–Sun: 7AM–10PM",
    distance: 2.3,
  },
  {
    id: 9,
    name: "Dog & Bee Café",
    address: "92 Nguyễn Du, Hai Bà Trưng, Hanoi",
    lat: 21.020,
    lng: 105.841,
    rating: 4.4,
    reviews: 58,
    price_range: "moderate",
    tags: ["Dog Café", "Pet-Friendly", "Outdoor"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1585581701825-42e1ac22a3d2?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1584554231218-741d11de35d7?w=600&h=400&fit=crop",
      ],
    },
    description: "Dog-friendly café with a playful atmosphere and furry friends.",
    phone: "0922 444 555",
    hours: "Daily: 9AM–9PM",
    distance: 2.7,
  },
  {
    id: 10,
    name: "Giang Café (Egg Coffee)",
    address: "39 Nguyễn Hữu Huân, Hoàn Kiếm, Hanoi",
    lat: 21.033,
    lng: 105.851,
    rating: 4.8,
    reviews: 412,
    price_range: "cheap",
    tags: ["Egg Coffee", "Local Vibe", "Historic"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1572478204481-a9bb598c77f7?w=600&h=400&fit=crop",
      ],
    },
    description: "Legendary spot for authentic Vietnamese egg coffee (cà phê trứng).",
    phone: "0905 666 777",
    hours: "Daily: 7AM–10PM",
    distance: 3.2,
  },
  {
    id: 11,
    name: "Loading T Café",
    address: "108 Phan Đình Phùng, Ba Đình, Hanoi",
    lat: 21.035,
    lng: 105.830,
    rating: 4.5,
    reviews: 102,
    price_range: "moderate",
    tags: ["Gaming", "Wi-Fi", "Power Outlets", "Work-Friendly"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=400&fit=crop",
      ],
    },
    description: "Gaming café with high-speed internet and board games.",
    phone: "0933 888 999",
    hours: "Mon–Sun: 9AM–12AM",
    distance: 4.1,
  },
  {
    id: 12,
    name: "Loft 29 Café",
    address: "29 Tống Duy Tân, Hoàn Kiếm, Hanoi",
    lat: 21.030,
    lng: 105.849,
    rating: 4.6,
    reviews: 87,
    price_range: "moderate",
    tags: ["Rooftop", "Outdoor", "Instagrammable", "Wi-Fi"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1599898593425-f97d4ecf2c0e?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
      ],
    },
    description: "Rooftop café with stunning city views and Instagram-worthy décor.",
    phone: "0944 111 222",
    hours: "Daily: 8AM–11PM",
    distance: 2.5,
  },
  {
    id: 13,
    name: "Xofa Café & Bistro",
    address: "54 Thái Hà, Đống Đa, Hanoi",
    lat: 21.015,
    lng: 105.825,
    rating: 4.4,
    reviews: 95,
    price_range: "moderate",
    tags: ["Brunch", "Outdoor", "Wi-Fi", "Instagrammable"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=600&h=400&fit=crop",
      ],
    },
    description: "Trendy bistro with creative brunch menu and garden seating.",
    phone: "0955 333 444",
    hours: "Mon–Sun: 8AM–10PM",
    distance: 4.8,
  },
  {
    id: 14,
    name: "Sói Biển Café",
    address: "23 Quán Thánh, Ba Đình, Hanoi",
    lat: 21.037,
    lng: 105.832,
    rating: 4.7,
    reviews: 71,
    price_range: "cheap",
    tags: ["Outdoor", "Lake View", "Budget-Friendly"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600&h=400&fit=crop",
      ],
    },
    description: "Lakeside café with affordable drinks and sunset views by West Lake.",
    phone: "0966 555 666",
    hours: "Daily: 6AM–11PM",
    distance: 5.3,
  },
  {
    id: 15,
    name: "Cafe Pho Cổ",
    address: "11 Hàng Gai, Hoàn Kiếm, Hanoi",
    lat: 21.034,
    lng: 105.853,
    rating: 4.3,
    reviews: 128,
    price_range: "cheap",
    tags: ["Old Quarter", "Traditional", "Local Vibe"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1572478204481-a9bb598c77f7?w=600&h=400&fit=crop",
      ],
    },
    description: "Traditional Old Quarter café serving pho and Vietnamese coffee.",
    phone: "0977 777 888",
    hours: "Daily: 6AM–10PM",
    distance: 3.8,
  },
];

export const cafes = mockCafes;

export const reviews: Review[] = [
  {
    id: 1,
    cafeId: 1,
    userName: "佐藤さくら",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura",
    rating: 4.6,
    date: "2024-10-15",
    text: "ここの雰囲気が最高です！Wi-Fiが安定していて、電源コンセントもたくさんあるのでリモートワークに最適です。",
    categories: { drinks: 4.5, food: 4.0, service: 5.0, atmosphere: 5.0 },
    likes: 0,
    timestamp: new Date("2024-10-15").getTime(),
  },
  {
    id: 2,
    cafeId: 1,
    userName: "田中健太",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta",
    rating: 4.0,
    date: "2024-10-12",
    text: "コーヒーが美味しくて、屋外席も素敵です。ピーク時には少し混雑することがあります。",
    categories: { drinks: 4.5, food: 3.5, service: 4.0, atmosphere: 4.0 },
    likes: 0,
    timestamp: new Date("2024-10-12").getTime(),
  },
  {
    id: 3,
    cafeId: 2,
    userName: "山本えみ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emi",
    rating: 4.8,
    date: "2024-10-20",
    text: "ベルベットソファがある猫カフェで、抹茶ラテが絶品です！猫たちも可愛くて、とても良く世話されています。",
    categories: { drinks: 5.0, food: 4.5, service: 4.8, atmosphere: 5.0 },
    likes: 0,
    timestamp: new Date("2024-10-20").getTime(),
  },
  {
    id: 4,
    cafeId: 2,
    userName: "中村りな",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina",
    rating: 5.0,
    date: "2024-11-02",
    text: "とても居心地の良いカフェです！猫たちがとても可愛くて、抹茶ラテも絶品でした。何時間でもいられます。",
    categories: { drinks: 5.0, food: 4.8, service: 5.0, atmosphere: 5.0 },
    likes: 0,
    timestamp: new Date("2024-11-02").getTime(),
  },
  {
    id: 5,
    cafeId: 2,
    userName: "田中はな",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hana",
    rating: 4.4,
    date: "2024-11-05",
    text: "猫好きにはたまらない場所！コーヒーも美味しいし、スタッフも親切。ただ週末は混雑することがあります。",
    categories: { drinks: 4.2, food: 4.0, service: 4.5, atmosphere: 4.8 },
    likes: 0,
    timestamp: new Date("2024-11-05").getTime(),
  },
  {
    id: 6,
    cafeId: 2,
    userName: "小林大輔",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daisuke",
    rating: 4.8,
    date: "2024-11-10",
    text: "猫好きには完璧な場所！雰囲気がとても居心地よく、抹茶ラテはハノイで一番美味しいです。",
    categories: { drinks: 4.8, food: 4.5, service: 4.7, atmosphere: 5.0 },
    likes: 0,
    timestamp: new Date("2024-11-10").getTime(),
  },
  {
    id: 7,
    cafeId: 2,
    userName: "鈴木まい",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai",
    rating: 4.2,
    date: "2024-11-15",
    text: "可愛い猫たちに癒されました。ケーキセットがおすすめ！Wi-Fiも速くて仕事にも使えます。",
    categories: { drinks: 4.3, food: 4.2, service: 4.0, atmosphere: 4.5 },
    likes: 0,
    timestamp: new Date("2024-11-15").getTime(),
  },
  {
    id: 8,
    cafeId: 2,
    userName: "渡辺アレックス",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 4.8,
    date: "2024-11-18",
    text: "ベルベットソファがとても快適！猫たちと午後をずっと過ごしました。料理の質も期待以上でした。",
    categories: { drinks: 4.7, food: 4.8, service: 4.9, atmosphere: 5.0 },
    likes: 0,
    timestamp: new Date("2024-11-18").getTime(),
  },
  {
    id: 9,
    cafeId: 2,
    userName: "佐藤ゆき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
    rating: 4.2,
    date: "2024-11-22",
    text: "素敵な雰囲気で、猫たちもフレンドリー。ただ、ピークタイムは席が取りにくいかも。",
    categories: { drinks: 4.0, food: 3.8, service: 4.2, atmosphere: 4.6 },
    likes: 0,
    timestamp: new Date("2024-11-22").getTime(),
  },
  {
    id: 10,
    cafeId: 2,
    userName: "高橋みゆき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miyuki",
    rating: 4.9,
    date: "2024-12-01",
    text: "ハノイで一番好きなカフェです！猫たちはよく訓練されていて、スタッフも動物とお客様の両方を大切にしています。",
    categories: { drinks: 4.9, food: 4.6, service: 5.0, atmosphere: 5.0 },
    likes: 0,
    timestamp: new Date("2024-12-01").getTime(),
  },
  {
    id: 11,
    cafeId: 2,
    userName: "伊藤みなと",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minato",
    rating: 3.5,
    date: "2024-12-05",
    text: "雰囲気は良いけど、混んでいて少しうるさかった。猫は可愛いけど、静かに仕事したい人には向かないかも。",
    categories: { drinks: 3.5, food: 3.2, service: 3.5, atmosphere: 3.8 },
    likes: 0,
    timestamp: new Date("2024-12-05").getTime(),
  },
  {
    id: 12,
    cafeId: 2,
    userName: "木村そら",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sora",
    rating: 4.9,
    date: "2024-12-10",
    text: "本当に素晴らしかったです！猫たちはとてもフレンドリーで遊び好き。抹茶チーズケーキは絶対に試すべき！",
    categories: { drinks: 4.8, food: 5.0, service: 4.8, atmosphere: 5.0 },
    likes: 0,
    timestamp: new Date("2024-12-10").getTime(),
  },
];
