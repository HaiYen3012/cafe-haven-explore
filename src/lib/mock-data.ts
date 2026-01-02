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
    rating: 4.3,
    reviews: 2,
    price_range: "moderate",
    tags: ["Wi-Fi", "屋外席", "仕事向き"],
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
    description: "広々とした座席と安定したWi-Fiを備えた人気のベトナムコーヒーチェーン。",
    phone: "0123 456 789",
    hours: "月～金: 7時～22時 · 土日: 8時～23時",
    distance: 1.2,
  },
  {
    id: 2,
    name: "The Coffee House",
    address: "45 Trần Đại Nghĩa, Hai Bà Trưng, Hanoi",
    lat: 21.023,
    lng: 105.842,
    rating: 4.5,
    reviews: 10,
    price_range: "moderate",
    tags: ["猫カフェ", "Wi-Fi", "落ち着いた"],
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
    description: "ベルベットソファと絶品抹茶ラテが楽しめる猫カフェ。",
    phone: "0987 654 321",
    hours: "月～日: 8時～23時",
    distance: 2.1,
  },
  {
    id: 3,
    name: "Cộng Cà Phê",
    address: "78 Lê Duẩn, Đống Đa, Hanoi",
    lat: 21.018,
    lng: 105.828,
    rating: 4.3,
    reviews: 3,
    price_range: "cheap",
    tags: ["ヴィンテージ", "ローカル", "ココナッツコーヒー"],
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
    description: "ヴィンテージな内装と有名なココナッツコーヒーが楽しめるノスタルジックなベトナムカフェ。",
    phone: "0901 234 567",
    hours: "毎日: 7時～23時",
    distance: 3.5,
  },
  {
    id: 4,
    name: "Starbucks Reserve",
    address: "12 Lý Thường Kiệt, Hoàn Kiếm, Hanoi",
    lat: 21.029,
    lng: 105.835,
    rating: 4.6,
    reviews: 3,
    price_range: "expensive",
    tags: ["プレミアム", "Wi-Fi", "電源", "仕事向き"],
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
    description: "スペシャルティコーヒーとエレガントな雰囲気を備えた高級スターバックス。",
    phone: "0912 345 678",
    hours: "月～日: 6時～23時",
    distance: 0.8,
  },
  {
    id: 5,
    name: "Maison Marou",
    address: "89 Bà Triệu, Hai Bà Trưng, Hanoi",
    lat: 21.025,
    lng: 105.838,
    rating: 4.9,
    reviews: 2,
    price_range: "expensive",
    tags: ["チョコレート", "プレミアム", "デザート"],
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
    description: "アートisanalなドリンクとペストリーが楽しめるフランス・ベトナム融合のチョコレートハウス。",
    phone: "0909 876 543",
    hours: "月～日: 9時～21時",
    distance: 1.5,
  },
  {
    id: 6,
    name: "Puku Café & Sports Bar",
    address: "34 Tràng Tiền, Hoàn Kiếm, Hanoi",
    lat: 21.028,
    lng: 105.852,
    rating: 4.2,
    reviews: 2,
    price_range: "moderate",
    tags: ["スポーツバー", "Wi-Fi", "屋外席"],
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
    description: "スポーツスクリーン、屋上席、インターナショナルメニューを備えた活気あるカフェ。",
    phone: "0123 987 654",
    hours: "毎日: 8時～24時",
    distance: 2.8,
  },
  {
    id: 7,
    name: "Hanoi Social Club",
    address: "6 Hội Vũ, Hoàn Kiếm, Hanoi",
    lat: 21.031,
    lng: 105.847,
    rating: 4.7,
    reviews: 3,
    price_range: "moderate",
    tags: ["ブランチ", "Wi-Fi", "庭園", "落ち着いた"],
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
    description: "ガーデン席とフュージョン料理を備えたヒップなブランチスポット。",
    phone: "0987 321 654",
    hours: "月～日: 8時～23時",
    distance: 1.9,
  },
  {
    id: 8,
    name: "Tranquil Books & Coffee",
    address: "5 Nguyễn Quang Bích, Hoàn Kiếm, Hanoi",
    lat: 21.032,
    lng: 105.845,
    rating: 4.9,
    reviews: 3,
    price_range: "moderate",
    tags: ["書店", "静か", "Wi-Fi", "仕事向き"],
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
    description: "読書とリモートワークに最適な静かな書店カフェ。",
    phone: "0911 222 333",
    hours: "月～日: 7時～22時",
    distance: 2.3,
  },
  {
    id: 9,
    name: "Dog & Bee Café",
    address: "92 Nguyễn Du, Hai Bà Trưng, Hanoi",
    lat: 21.020,
    lng: 105.841,
    rating: 4.4,
    reviews: 2,
    price_range: "moderate",
    tags: ["犬カフェ", "ペット可", "屋外席"],
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
    description: "遊び心のある雰囲気と毛むくじゃらの友達がいる犬に優しいカフェ。",
    phone: "0922 444 555",
    hours: "毎日: 9時～21時",
    distance: 2.7,
  },
  {
    id: 10,
    name: "Giang Café (Egg Coffee)",
    address: "39 Nguyễn Hữu Huân, Hoàn Kiếm, Hanoi",
    lat: 21.033,
    lng: 105.851,
    rating: 4.8,
    reviews: 4,
    price_range: "cheap",
    tags: ["エッグコーヒー", "ローカル", "歴史的"],
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
    description: "本格的なベトナムエッグコーヒー(cà phê trứng)の伝説的なスポット。",
    phone: "0905 666 777",
    hours: "毎日: 7時～22時",
    distance: 3.2,
  },
  {
    id: 11,
    name: "Loading T Café",
    address: "108 Phan Đình Phùng, Ba Đình, Hanoi",
    lat: 21.035,
    lng: 105.830,
    rating: 4.5,
    reviews: 2,
    price_range: "moderate",
    tags: ["ゲーミング", "Wi-Fi", "電源", "仕事向き"],
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
    description: "高速インターネットとボードゲームを備えたゲーミングカフェ。",
    phone: "0933 888 999",
    hours: "月～日: 9時～24時",
    distance: 4.1,
  },
  {
    id: 12,
    name: "Loft 29 Café",
    address: "29 Tống Duy Tân, Hoàn Kiếm, Hanoi",
    lat: 21.030,
    lng: 105.849,
    rating: 4.6,
    reviews: 2,
    price_range: "moderate",
    tags: ["ルーフトップ", "屋外席", "インスタ映え", "Wi-Fi"],
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
    description: "素晴らしい街の景色とインスタ映えする内装を備えたルーフトップカフェ。",
    phone: "0944 111 222",
    hours: "毎日: 8時～23時",
    distance: 2.5,
  },
  {
    id: 13,
    name: "Xofa Café & Bistro",
    address: "54 Thái Hà, Đống Đa, Hanoi",
    lat: 21.015,
    lng: 105.825,
    rating: 4.4,
    reviews: 2,
    price_range: "moderate",
    tags: ["ブランチ", "屋外席", "Wi-Fi", "インスタ映え"],
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
    description: "創作的なブランチメニューとガーデン席を備えたトレンディなビストロ。",
    phone: "0955 333 444",
    hours: "月～日: 8時～22時",
    distance: 4.8,
  },
  {
    id: 14,
    name: "Sói Biển Café",
    address: "23 Quán Thánh, Ba Đình, Hanoi",
    lat: 21.037,
    lng: 105.832,
    rating: 4.7,
    reviews: 2,
    price_range: "cheap",
    tags: ["屋外席", "湖景色", "手頃な価格"],
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
    description: "西湖のほとりにある手頃な価格のドリンクと夕日の景色が楽しめる湖畔のカフェ。",
    phone: "0966 555 666",
    hours: "毎日: 6時～23時",
    distance: 5.3,
  },
  {
    id: 15,
    name: "Cafe Pho Cổ",
    address: "11 Hàng Gai, Hoàn Kiếm, Hanoi",
    lat: 21.034,
    lng: 105.853,
    rating: 4.3,
    reviews: 2,
    price_range: "cheap",
    tags: ["旧市街", "伝統的", "ローカル"],
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
    description: "フォーとベトナムコーヒーを提供する伝統的な旧市街のカフェ。",
    phone: "0977 777 888",
    hours: "毎日: 6:00～22:00",
    distance: 3.8,
  },
];

export const cafes = mockCafes;

export const reviews: Review[] = [
  // Highlands Coffee (id: 1) - 2 reviews
  {
    id: 1,
    cafeId: 1,
    userName: "佐藤さくら",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura",
    rating: 4.6,
    date: "2025-10-15",
    text: "ここの雰囲気が最高です！Wi-Fiが安定していて、電源コンセントもたくさんあるのでリモートワークに最適です。",
    categories: { drinks: 4.5, food: 4.0, service: 5.0, atmosphere: 5.0 },
    likes: 5,
    timestamp: new Date("2025-10-15").getTime(),
  },
  {
    id: 2,
    cafeId: 1,
    userName: "田中健太",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenta",
    rating: 4.0,
    date: "2025-10-12",
    text: "コーヒーが美味しくて、屋外席も素敵です。ピーク時には少し混雑することがあります。",
    categories: { drinks: 4.5, food: 3.5, service: 4.0, atmosphere: 4.0 },
    likes: 2,
    timestamp: new Date("2025-10-12").getTime(),
  },
  
  // The Coffee House (id: 2) - 10 reviews
  {
    id: 3,
    cafeId: 2,
    userName: "山本えみ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emi",
    rating: 4.8,
    date: "2025-10-20",
    text: "ベルベットソファがある猫カフェで、抹茶ラテが絶品です！猫たちも可愛くて、とても良く世話されています。",
    categories: { drinks: 5.0, food: 4.5, service: 4.8, atmosphere: 5.0 },
    likes: 12,
    timestamp: new Date("2025-10-20").getTime(),
  },
  {
    id: 4,
    cafeId: 2,
    userName: "中村りな",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina",
    rating: 5.0,
    date: "2025-11-02",
    text: "とても居心地の良いカフェです！猫たちがとても可愛くて、抹茶ラテも絶品でした。何時間でもいられます。",
    categories: { drinks: 5.0, food: 4.8, service: 5.0, atmosphere: 5.0 },
    likes: 8,
    timestamp: new Date("2025-11-02").getTime(),
  },
  {
    id: 5,
    cafeId: 2,
    userName: "田中はな",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hana",
    rating: 4.4,
    date: "2025-11-05",
    text: "猫好きにはたまらない場所！コーヒーも美味しいし、スタッフも親切。ただ週末は混雑することがあります。",
    categories: { drinks: 4.2, food: 4.0, service: 4.5, atmosphere: 4.8 },
    likes: 3,
    timestamp: new Date("2025-11-05").getTime(),
  },
  {
    id: 6,
    cafeId: 2,
    userName: "小林大輔",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daisuke",
    rating: 4.8,
    date: "2025-11-10",
    text: "猫好きには完璧な場所！雰囲気がとても居心地よく、抹茶ラテはハノイで一番美味しいです。",
    categories: { drinks: 4.8, food: 4.5, service: 4.7, atmosphere: 5.0 },
    likes: 15,
    timestamp: new Date("2025-11-10").getTime(),
  },
  {
    id: 7,
    cafeId: 2,
    userName: "鈴木まい",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai",
    rating: 4.2,
    date: "2025-11-15",
    text: "可愛い猫たちに癒されました。ケーキセットがおすすめ！Wi-Fiも速くて仕事にも使えます。",
    categories: { drinks: 4.3, food: 4.2, service: 4.0, atmosphere: 4.5 },
    likes: 6,
    timestamp: new Date("2025-11-15").getTime(),
  },
  {
    id: 8,
    cafeId: 2,
    userName: "渡辺アレックス",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 4.8,
    date: "2025-11-18",
    text: "ベルベットソファがとても快適！猫たちと午後をずっと過ごしました。料理の質も期待以上でした。",
    categories: { drinks: 4.7, food: 4.8, service: 4.9, atmosphere: 5.0 },
    likes: 9,
    timestamp: new Date("2025-11-18").getTime(),
  },
  {
    id: 9,
    cafeId: 2,
    userName: "佐藤ゆき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
    rating: 4.2,
    date: "2025-11-22",
    text: "素敵な雰囲気で、猫たちもフレンドリー。ただ、ピークタイムは席が取りにくいかも。",
    categories: { drinks: 4.0, food: 3.8, service: 4.2, atmosphere: 4.6 },
    likes: 1,
    timestamp: new Date("2025-11-22").getTime(),
  },
  {
    id: 10,
    cafeId: 2,
    userName: "高橋みゆき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miyuki",
    rating: 4.9,
    date: "2025-12-01",
    text: "ハノイで一番好きなカフェです！猫たちはよく訓練されていて、スタッフも動物とお客様の両方を大切にしています。",
    categories: { drinks: 4.9, food: 4.6, service: 5.0, atmosphere: 5.0 },
    likes: 20,
    timestamp: new Date("2025-12-01").getTime(),
  },
  {
    id: 11,
    cafeId: 2,
    userName: "伊藤みなと",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minato",
    rating: 3.5,
    date: "2025-12-05",
    text: "雰囲気は良いけど、混んでいて少しうるさかった。猫は可愛いけど、静かに仕事したい人には向かないかも。",
    categories: { drinks: 3.5, food: 3.2, service: 3.5, atmosphere: 3.8 },
    likes: 4,
    timestamp: new Date("2025-12-05").getTime(),
  },
  {
    id: 12,
    cafeId: 2,
    userName: "木村そら",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sora",
    rating: 4.9,
    date: "2025-12-10",
    text: "本当に素晴らしかったです！猫たちはとてもフレンドリーで遊び好き。抹茶チーズケーキは絶対に試すべき！",
    categories: { drinks: 4.8, food: 5.0, service: 4.8, atmosphere: 5.0 },
    likes: 11,
    timestamp: new Date("2025-12-10").getTime(),
  },
  
  // Cộng Cà Phê (id: 3) - 3 reviews
  {
    id: 13,
    cafeId: 3,
    userName: "松本ひろし",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
    rating: 4.5,
    date: "2025-09-20",
    text: "ノスタルジックな雰囲気が素晴らしい！ココナッツコーヒーは必見です。価格も手頃で地元の雰囲気を感じられます。",
    categories: { drinks: 4.8, food: 4.0, service: 4.2, atmosphere: 5.0 },
    likes: 7,
    timestamp: new Date("2025-09-20").getTime(),
  },
  {
    id: 14,
    cafeId: 3,
    userName: "吉田なお",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nao",
    rating: 4.0,
    date: "2025-10-05",
    text: "ヴィンテージな内装が魅力的。ココナッツコーヒーは独特の味わいで、ベトナムの伝統を感じられます。",
    categories: { drinks: 4.5, food: 3.5, service: 4.0, atmosphere: 4.5 },
    likes: 3,
    timestamp: new Date("2025-10-05").getTime(),
  },
  {
    id: 15,
    cafeId: 3,
    userName: "藤田ケン",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ken",
    rating: 4.3,
    date: "2025-11-12",
    text: "レトロな雰囲気が最高！地元の人々に人気のスポットです。コーヒーの質も良く、リーズナブルな価格帯。",
    categories: { drinks: 4.2, food: 4.0, service: 4.5, atmosphere: 4.5 },
    likes: 5,
    timestamp: new Date("2025-11-12").getTime(),
  },

  // Starbucks Reserve (id: 4) - 3 reviews  
  {
    id: 16,
    cafeId: 4,
    userName: "岡田りょう",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryo",
    rating: 4.8,
    date: "2025-10-08",
    text: "プレミアムなスターバックス体験！スペシャルティコーヒーが素晴らしく、店内も洗練されています。仕事にも最適。",
    categories: { drinks: 5.0, food: 4.5, service: 4.8, atmosphere: 4.8 },
    likes: 10,
    timestamp: new Date("2025-10-08").getTime(),
  },
  {
    id: 17,
    cafeId: 4,
    userName: "中島あや",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aya",
    rating: 4.5,
    date: "2025-11-01",
    text: "エレガントな空間でリラックスできます。Wi-Fiも速く、電源も豊富。少し高めですが価値はあります。",
    categories: { drinks: 4.8, food: 4.2, service: 4.5, atmosphere: 4.5 },
    likes: 6,
    timestamp: new Date("2025-11-01").getTime(),
  },
  {
    id: 18,
    cafeId: 4,
    userName: "森田まさき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Masaki",
    rating: 4.5,
    date: "2025-12-15",
    text: "高品質なコーヒーと快適な環境。ビジネスミーティングにも使えるプロフェッショナルな雰囲気です。",
    categories: { drinks: 4.7, food: 4.3, service: 4.5, atmosphere: 4.5 },
    likes: 8,
    timestamp: new Date("2025-12-15").getTime(),
  },

  // Maison Marou (id: 5) - 2 reviews
  {
    id: 19,
    cafeId: 5,
    userName: "石川みき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Miki",
    rating: 5.0,
    date: "2025-09-15",
    text: "チョコレート好きには天国！フレンチとベトナムの融合が素晴らしい。アートisanalなドリンクとペストリーは絶品です。",
    categories: { drinks: 5.0, food: 5.0, service: 5.0, atmosphere: 5.0 },
    likes: 18,
    timestamp: new Date("2025-09-15").getTime(),
  },
  {
    id: 20,
    cafeId: 5,
    userName: "竹内あきら",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akira",
    rating: 4.7,
    date: "2025-11-20",
    text: "高級感あふれるチョコレートハウス。少し高めですが、品質は最高級。デザートは芸術品レベルです。",
    categories: { drinks: 4.8, food: 4.8, service: 4.5, atmosphere: 4.7 },
    likes: 14,
    timestamp: new Date("2025-11-20").getTime(),
  },

  // Puku Café & Sports Bar (id: 6) - 2 reviews
  {
    id: 21,
    cafeId: 6,
    userName: "加藤たけし",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Takeshi",
    rating: 4.3,
    date: "2025-10-22",
    text: "スポーツ観戦に最高の場所！屋上席も良く、インターナショナルなメニューも楽しめます。活気があります。",
    categories: { drinks: 4.2, food: 4.5, service: 4.0, atmosphere: 4.5 },
    likes: 4,
    timestamp: new Date("2025-10-22").getTime(),
  },
  {
    id: 22,
    cafeId: 6,
    userName: "山田ゆうき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki2",
    rating: 4.0,
    date: "2025-12-03",
    text: "友達と集まるのに良い場所。スポーツを見ながらリラックスできます。夜は特に賑やかです。",
    categories: { drinks: 4.0, food: 4.2, service: 3.8, atmosphere: 4.0 },
    likes: 2,
    timestamp: new Date("2025-12-03").getTime(),
  },

  // Hanoi Social Club (id: 7) - 3 reviews
  {
    id: 23,
    cafeId: 7,
    userName: "井上さとみ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Satomi",
    rating: 4.8,
    date: "2025-09-28",
    text: "ブランチが最高！ガーデン席は居心地が良く、フュージョン料理も美味しい。ヒップな雰囲気が気に入りました。",
    categories: { drinks: 4.7, food: 5.0, service: 4.7, atmosphere: 4.8 },
    likes: 13,
    timestamp: new Date("2025-09-28").getTime(),
  },
  {
    id: 24,
    cafeId: 7,
    userName: "橋本だいち",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daichi",
    rating: 4.7,
    date: "2025-10-18",
    text: "素晴らしいブランチスポット！創作料理が豊富で、庭園の雰囲気も最高です。週末は特におすすめ。",
    categories: { drinks: 4.5, food: 4.8, service: 4.8, atmosphere: 4.7 },
    likes: 9,
    timestamp: new Date("2025-10-18").getTime(),
  },
  {
    id: 25,
    cafeId: 7,
    userName: "清水みなみ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minami",
    rating: 4.6,
    date: "2025-12-08",
    text: "居心地の良い庭園カフェ。食事も美味しく、Wi-Fiも快適。長居したくなる場所です。",
    categories: { drinks: 4.5, food: 4.7, service: 4.5, atmosphere: 4.7 },
    likes: 7,
    timestamp: new Date("2025-12-08").getTime(),
  },

  // Tranquil Books & Coffee (id: 8) - 3 reviews
  {
    id: 26,
    cafeId: 8,
    userName: "林ゆうこ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuko",
    rating: 5.0,
    date: "2025-09-10",
    text: "静かで本に囲まれた最高の空間！リモートワークや読書に完璧。コーヒーも美味しいです。",
    categories: { drinks: 5.0, food: 4.8, service: 5.0, atmosphere: 5.0 },
    likes: 22,
    timestamp: new Date("2025-09-10").getTime(),
  },
  {
    id: 27,
    cafeId: 8,
    userName: "村上けんじ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kenji",
    rating: 4.9,
    date: "2025-10-25",
    text: "本好きには天国のような場所。静かで集中できる環境、素晴らしい本のコレクション。",
    categories: { drinks: 4.8, food: 4.8, service: 5.0, atmosphere: 5.0 },
    likes: 16,
    timestamp: new Date("2025-10-25").getTime(),
  },
  {
    id: 28,
    cafeId: 8,
    userName: "斎藤はるか",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Haruka",
    rating: 4.8,
    date: "2025-11-30",
    text: "落ち着いた雰囲気で読書に最適。Wi-Fiも安定していて仕事もはかどります。",
    categories: { drinks: 4.7, food: 4.7, service: 4.8, atmosphere: 5.0 },
    likes: 12,
    timestamp: new Date("2025-11-30").getTime(),
  },

  // Dog & Bee Café (id: 9) - 2 reviews
  {
    id: 29,
    cafeId: 9,
    userName: "西村こうた",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kota",
    rating: 4.5,
    date: "2025-10-14",
    text: "犬好きには最高！フレンドリーなワンちゃんたちと楽しい時間を過ごせます。ペット連れもOKです。",
    categories: { drinks: 4.3, food: 4.5, service: 4.5, atmosphere: 4.7 },
    likes: 11,
    timestamp: new Date("2025-10-14").getTime(),
  },
  {
    id: 30,
    cafeId: 9,
    userName: "前田あいり",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Airi",
    rating: 4.3,
    date: "2025-12-01",
    text: "可愛い犬たちに癒されます。屋外席も快適で、ペットフレンドリーな雰囲気が良いです。",
    categories: { drinks: 4.0, food: 4.3, service: 4.3, atmosphere: 4.5 },
    likes: 6,
    timestamp: new Date("2025-12-01").getTime(),
  },

  // Giang Café (id: 10) - 4 reviews
  {
    id: 31,
    cafeId: 10,
    userName: "長谷川ひろき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroki",
    rating: 5.0,
    date: "2025-08-22",
    text: "伝説的なエッグコーヒー！本物のベトナムコーヒー体験ができます。歴史を感じる素晴らしい場所です。",
    categories: { drinks: 5.0, food: 4.8, service: 4.7, atmosphere: 5.0 },
    likes: 25,
    timestamp: new Date("2025-08-22").getTime(),
  },
  {
    id: 32,
    cafeId: 10,
    userName: "池田まり",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mari",
    rating: 4.8,
    date: "2025-09-30",
    text: "エッグコーヒーは絶対に試すべき！クリーミーで濃厚、独特の味わいです。ハノイに来たら必須。",
    categories: { drinks: 5.0, food: 4.5, service: 4.7, atmosphere: 4.8 },
    likes: 19,
    timestamp: new Date("2025-09-30").getTime(),
  },
  {
    id: 33,
    cafeId: 10,
    userName: "遠藤しょう",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sho",
    rating: 4.7,
    date: "2025-11-08",
    text: "本物のベトナムエッグコーヒーを味わえる老舗。地元の雰囲気も良く、観光客にも人気です。",
    categories: { drinks: 4.8, food: 4.5, service: 4.5, atmosphere: 5.0 },
    likes: 14,
    timestamp: new Date("2025-11-08").getTime(),
  },
  {
    id: 34,
    cafeId: 10,
    userName: "青木りか",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rika",
    rating: 4.7,
    date: "2025-12-20",
    text: "エッグコーヒー発祥の店として有名。濃厚でクリーミーな味わいは一度は体験すべきです。",
    categories: { drinks: 4.9, food: 4.5, service: 4.5, atmosphere: 4.8 },
    likes: 17,
    timestamp: new Date("2025-12-20").getTime(),
  },

  // Loading T Café (id: 11) - 2 reviews
  {
    id: 35,
    cafeId: 11,
    userName: "三浦ゆうすけ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuke",
    rating: 4.6,
    date: "2025-10-03",
    text: "ゲーマーには最高のカフェ！高速インターネットとボードゲームが充実。友達と遊ぶのに最適です。",
    categories: { drinks: 4.5, food: 4.5, service: 4.7, atmosphere: 4.7 },
    likes: 10,
    timestamp: new Date("2025-10-03").getTime(),
  },
  {
    id: 36,
    cafeId: 11,
    userName: "小野まさと",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Masato",
    rating: 4.4,
    date: "2025-12-12",
    text: "ゲームカフェとして楽しい！Wi-Fiも速く、長時間滞在できます。ボードゲームのコレクションが豊富。",
    categories: { drinks: 4.3, food: 4.3, service: 4.5, atmosphere: 4.5 },
    likes: 7,
    timestamp: new Date("2025-12-12").getTime(),
  },

  // Loft 29 Café (id: 12) - 2 reviews
  {
    id: 37,
    cafeId: 12,
    userName: "坂本えり",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eri",
    rating: 4.7,
    date: "2025-09-18",
    text: "屋上からの景色が素晴らしい！インスタ映えする内装で、街を一望できる最高のスポットです。",
    categories: { drinks: 4.5, food: 4.7, service: 4.7, atmosphere: 4.8 },
    likes: 16,
    timestamp: new Date("2025-09-18").getTime(),
  },
  {
    id: 38,
    cafeId: 12,
    userName: "内田かずや",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kazuya",
    rating: 4.5,
    date: "2025-11-25",
    text: "ルーフトップカフェとして最高！夕方の景色は特に美しいです。デートにもぴったり。",
    categories: { drinks: 4.5, food: 4.5, service: 4.5, atmosphere: 4.5 },
    likes: 11,
    timestamp: new Date("2025-11-25").getTime(),
  },

  // Xofa Café & Bistro (id: 13) - 2 reviews
  {
    id: 39,
    cafeId: 13,
    userName: "金子まい",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai2",
    rating: 4.5,
    date: "2025-10-11",
    text: "トレンディなビストロ！創作的なブランチメニューが豊富で、庭園席も素敵です。インスタ映えします。",
    categories: { drinks: 4.3, food: 4.7, service: 4.5, atmosphere: 4.5 },
    likes: 9,
    timestamp: new Date("2025-10-11").getTime(),
  },
  {
    id: 40,
    cafeId: 13,
    userName: "福田しゅん",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shun",
    rating: 4.3,
    date: "2025-12-05",
    text: "おしゃれなカフェ！ブランチが美味しく、雰囲気も良いです。週末のブランチにおすすめ。",
    categories: { drinks: 4.2, food: 4.5, service: 4.2, atmosphere: 4.3 },
    likes: 5,
    timestamp: new Date("2025-12-05").getTime(),
  },

  // Sói Biển Café (id: 14) - 2 reviews
  {
    id: 41,
    cafeId: 14,
    userName: "山口のぞみ",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nozomi",
    rating: 4.8,
    date: "2025-09-25",
    text: "湖畔のカフェで夕日が最高！リーズナブルな価格で美しい景色を楽しめます。西湖の眺めは格別です。",
    categories: { drinks: 4.5, food: 4.7, service: 4.8, atmosphere: 5.0 },
    likes: 15,
    timestamp: new Date("2025-09-25").getTime(),
  },
  {
    id: 42,
    cafeId: 14,
    userName: "森しゅうへい",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shuhei",
    rating: 4.6,
    date: "2025-11-18",
    text: "西湖の景色が素晴らしい！手頃な価格で、夕方の雰囲気は特にロマンチックです。",
    categories: { drinks: 4.5, food: 4.5, service: 4.7, atmosphere: 4.8 },
    likes: 11,
    timestamp: new Date("2025-11-18").getTime(),
  },

  // Cafe Pho Cổ (id: 15) - 2 reviews
  {
    id: 43,
    cafeId: 15,
    userName: "高橋じゅん",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jun",
    rating: 4.4,
    date: "2025-10-07",
    text: "旧市街の伝統的なカフェ！フォーとベトナムコーヒーの組み合わせが絶品。地元の雰囲気を感じられます。",
    categories: { drinks: 4.5, food: 4.5, service: 4.2, atmosphere: 4.3 },
    likes: 8,
    timestamp: new Date("2025-10-07").getTime(),
  },
  {
    id: 44,
    cafeId: 15,
    userName: "渡辺ゆき",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki3",
    rating: 4.2,
    date: "2025-12-14",
    text: "伝統的なベトナムカフェ体験ができます。フォーも美味しく、オールドクォーターの雰囲気が良いです。",
    categories: { drinks: 4.2, food: 4.3, service: 4.0, atmosphere: 4.3 },
    likes: 4,
    timestamp: new Date("2025-12-14").getTime(),
  },
];



