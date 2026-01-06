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
  menuItems?: {
    name: string;
    priceVND: number;
    priceJPY: number;
    description: string;
  }[];
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
    address: "123 Hai Ba Trung, Hoan Kiem, Hanoi (ハイバーチュン通り、ホアンキエム区、ハノイ)",
    lat: 21.027,
    lng: 105.834,
    rating: 4.3,
    reviews: 2,
    price_range: "moderate",
    tags: ["Wi-Fi", "屋外席", "作業向き", "コンセント", "Wi-Fi安定", "長時間OK", "禁煙"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://i.pinimg.com/1200x/83/99/fa/8399fa0295e11e5c2c451df7fc08fcf2.jpg",
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
    menuItems: [
      {
        name: "ベトナムコーヒー",
        priceVND: 35000,
        priceJPY: 200,
        description: "濃厚なベトナム伝統コーヒー。",
      },
      {
        name: "アイスラテ",
        priceVND: 45000,
        priceJPY: 260,
        description: "ミルクたっぷりのアイスラテ。",
      },
      {
        name: "バインミー",
        priceVND: 50000,
        priceJPY: 290,
        description: "ベトナム風サンドイッチ。",
      },
      {
        name: "エッグコーヒー",
        priceVND: 40000,
        priceJPY: 230,
        description: "クリーミーな卵入りコーヒー。",
      },
      {
        name: "カフェスアダー",
        priceVND: 38000,
        priceJPY: 220,
        description: "練乳入りアイスコーヒー。",
      },
      {
        name: "チョコレートケーキ",
        priceVND: 60000,
        priceJPY: 340,
        description: "濃厚なチョコレートケーキ。",
      },
      {
        name: "抹茶ラテ",
        priceVND: 55000,
        priceJPY: 310,
        description: "香り高い抹茶とミルクのラテ。",
      },
      {
        name: "フルーツスムージー",
        priceVND: 50000,
        priceJPY: 280,
        description: "新鮮なフルーツのスムージー。",
      },
    ],
  },
  {
    id: 2,
    name: "The Coffee House",
    address: "45 Tran Dai Nghia, Hai Ba Trung, Hanoi (チャンダイギア通り、ハイバーチュン区、ハノイ)",
    lat: 21.023,
    lng: 105.842,
    rating: 4.5,
    reviews: 10,
    price_range: "moderate",
    tags: ["猫カフェ", "Wi-Fi", "静か", "一人でも入りやすい", "猫がいる", "禁煙", "長時間OK"],
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
    menuItems: [
      {
        name: "抹茶ラテ",
        priceVND: 60000,
        priceJPY: 350,
        description: "香り高い抹茶とミルクの和風ラテ。",
      },
      {
        name: "チーズケーキ",
        priceVND: 70000,
        priceJPY: 400,
        description: "濃厚でクリーミーな自家製チーズケーキ。",
      },
      {
        name: "エスプレッソ",
        priceVND: 40000,
        priceJPY: 230,
        description: "深い味わいのエスプレッソ。",
      },
      {
        name: "カフェモカ",
        priceVND: 55000,
        priceJPY: 320,
        description: "チョコレートとコーヒーの絶妙なバランス。",
      },
      {
        name: "キャラメルマキアート",
        priceVND: 65000,
        priceJPY: 370,
        description: "キャラメル風味の人気ドリンク。",
      },
      {
        name: "バナナスムージー",
        priceVND: 50000,
        priceJPY: 280,
        description: "新鮮なバナナのスムージー。",
      },
      {
        name: "抹茶チーズケーキ",
        priceVND: 75000,
        priceJPY: 430,
        description: "抹茶とチーズの濃厚な味わい。",
      },
      {
        name: "フルーツタルト",
        priceVND: 70000,
        priceJPY: 400,
        description: "季節のフルーツを使ったタルト。",
      },
    ],
  },
  {
    id: 3,
    name: "Cong Ca Phe",
    address: "78 Le Duan, Dong Da, Hanoi (レーズアン通り、ドンダー区、ハノイ)",
    lat: 21.018,
    lng: 105.828,
    rating: 4.3,
    reviews: 3,
    price_range: "cheap",
    tags: ["ヴィンテージ", "ローカル", "ココナッツコーヒー", "観光向け", "会話向き", "日本人が多い"],
    photos: {
      menu: [
        "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=400&fit=crop",
      ],
    },
    description: "ヴィンテージな内装と有名なココナッツコーヒーが楽しめるノスタルジックなベトナムカフェ。",
    phone: "0901 234 567",
    hours: "毎日: 7時～23時",
    distance: 3.5,
    menuItems: [
      {
        name: "ココナッツコーヒー",
        priceVND: 50000,
        priceJPY: 290,
        description: "名物ココナッツコーヒー。",
      },
      {
        name: "ベトナムティー",
        priceVND: 30000,
        priceJPY: 170,
        description: "伝統的なベトナムティー。",
      },
      {
        name: "バナナケーキ",
        priceVND: 40000,
        priceJPY: 230,
        description: "しっとりバナナケーキ。",
      },
      {
        name: "カフェスアダー",
        priceVND: 35000,
        priceJPY: 200,
        description: "練乳入りアイスコーヒー。",
      },
      {
        name: "エッグコーヒー",
        priceVND: 42000,
        priceJPY: 240,
        description: "クリーミーな卵入りコーヒー。",
      },
      {
        name: "マンゴースムージー",
        priceVND: 48000,
        priceJPY: 270,
        description: "新鮮なマンゴーのスムージー。",
      },
      {
        name: "チョコレートブラウニー",
        priceVND: 60000,
        priceJPY: 340,
        description: "濃厚なチョコレートブラウニー。",
      },
      {
        name: "フルーツサラダ",
        priceVND: 55000,
        priceJPY: 310,
        description: "季節のフルーツサラダ。",
      },
    ],
  },
  {
    id: 4,
    name: "Starbucks Reserve",
    address: "12 Ly Thuong Kiet, Hoan Kiem, Hanoi (リートゥオンキエット通り、ホアンキエム区、ハノイ)",
    lat: 21.029,
    lng: 105.835,
    rating: 4.6,
    reviews: 3,
    price_range: "expensive",
    tags: ["プレミアム", "Wi-Fi", "コンセント", "作業向き", "Wi-Fi安定", "長時間OK", "禁煙", "一人でも入りやすい"],
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
    menuItems: [
      {
        name: "カフェラテ",
        priceVND: 65000,
        priceJPY: 370,
        description: "まろやかなミルクとエスプレッソ。",
      },
      {
        name: "キャラメルマキアート",
        priceVND: 70000,
        priceJPY: 400,
        description: "キャラメル風味の人気ドリンク。",
      },
      {
        name: "チョコレートケーキ",
        priceVND: 80000,
        priceJPY: 460,
        description: "濃厚なチョコレートケーキ。",
      },
      {
        name: "アメリカーノ",
        priceVND: 60000,
        priceJPY: 340,
        description: "すっきりとした味わいのアメリカーノ。",
      },
      {
        name: "抹茶フラペチーノ",
        priceVND: 75000,
        priceJPY: 430,
        description: "抹茶の香り豊かなフラペチーノ。",
      },
      {
        name: "ストロベリースコーン",
        priceVND: 70000,
        priceJPY: 400,
        description: "いちご入りのスコーン。",
      },
      {
        name: "ブルーベリーマフィン",
        priceVND: 75000,
        priceJPY: 430,
        description: "ブルーベリーたっぷりのマフィン。",
      },
      {
        name: "サーモンサンド",
        priceVND: 90000,
        priceJPY: 520,
        description: "サーモンとクリームチーズのサンドイッチ。",
      },
    ],
  },
  {
    id: 5,
    name: "Maison Marou",
    address: "89 Ba Trieu, Hai Ba Trung, Hanoi (バーチウ通り、ハイバーチュン区、ハノイ)",
    lat: 21.025,
    lng: 105.838,
    rating: 4.9,
    reviews: 2,
    price_range: "expensive",
    tags: ["チョコレート", "プレミアム", "デザート", "静か", "日本人が多い", "禁煙", "観光向け"],
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
    menuItems: [
      {
        name: "チョコレートドリンク",
        priceVND: 90000,
        priceJPY: 510,
        description: "自家製チョコレートドリンク。",
      },
      {
        name: "マカロン",
        priceVND: 60000,
        priceJPY: 340,
        description: "フランス風マカロン。",
      },
      {
        name: "チョコレートケーキ",
        priceVND: 95000,
        priceJPY: 540,
        description: "濃厚なチョコレートケーキ。",
      },
      {
        name: "カフェラテ",
        priceVND: 70000,
        priceJPY: 400,
        description: "まろやかなミルクとエスプレッソ。",
      },
      {
        name: "抹茶ガトーショコラ",
        priceVND: 85000,
        priceJPY: 480,
        description: "抹茶とチョコの贅沢なケーキ。",
      },
      {
        name: "フルーツタルト",
        priceVND: 80000,
        priceJPY: 450,
        description: "季節のフルーツを使ったタルト。",
      },
      {
        name: "エクレア",
        priceVND: 65000,
        priceJPY: 370,
        description: "クリームたっぷりのエクレア。",
      },
      {
        name: "アーモンドクロワッサン",
        priceVND: 70000,
        priceJPY: 400,
        description: "香ばしいアーモンドのクロワッサン。",
      },
    ],
  },
  {
    id: 6,
    name: "Puku Café & Sports Bar",
    address: "34 Trang Tien, Hoan Kiem, Hanoi (チャンティエン通り、ホアンキエム区、ハノイ)",
    lat: 21.028,
    lng: 105.852,
    rating: 4.2,
    reviews: 2,
    price_range: "moderate",
    tags: ["スポーツバー", "Wi-Fi", "屋外席", "会話向き", "長時間OK"],
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
    menuItems: [
      {
        name: "ビール",
        priceVND: 30000,
        priceJPY: 170,
        description: "冷たいビール。",
      },
      {
        name: "ピザ",
        priceVND: 120000,
        priceJPY: 690,
        description: "石窯で焼いた本格ピザ。",
      },
      {
        name: "チキンウィング",
        priceVND: 70000,
        priceJPY: 400,
        description: "スパイシーなチキンウィング。",
      },
    ],
  },
  {
    id: 7,
    name: "Hanoi Social Club",
    address: "6 Hoi Vu, Hoan Kiem, Hanoi (ホイヴー通り、ホアンキエム区、ハノイ)",
    lat: 21.031,
    lng: 105.847,
    rating: 4.7,
    reviews: 3,
    price_range: "moderate",
    tags: ["ブランチ", "Wi-Fi", "庭園", "静か", "会話向き", "屋外席", "日本人が多い", "禁煙"],
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
    menuItems: [
      {
        name: "フレンチトースト",
        priceVND: 70000,
        priceJPY: 400,
        description: "自家製フレンチトースト。",
      },
      {
        name: "アボカドトースト",
        priceVND: 80000,
        priceJPY: 460,
        description: "新鮮なアボカドを使ったトースト。",
      },
      {
        name: "スムージーボウル",
        priceVND: 90000,
        priceJPY: 510,
        description: "栄養満点のスムージーボウル。",
      },
    ],
  },
  {
    id: 8,
    name: "Tranquil Books & Coffee",
    address: "5 Nguyen Quang Bich, Hoan Kiem, Hanoi (グエンクアンビック通り、ホアンキエム区、ハノイ)",
    lat: 21.032,
    lng: 105.845,
    rating: 4.9,
    reviews: 3,
    price_range: "moderate",
    tags: ["書店", "静か", "Wi-Fi", "作業向き", "一人でも入りやすい", "Wi-Fi安定", "長時間OK", "コンセント", "禁煙"],
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
    menuItems: [
      {
        name: "カフェスア",
        priceVND: 35000,
        priceJPY: 200,
        description: "ベトナム風アイスコーヒー。",
      },
      {
        name: "抹茶ラテ",
        priceVND: 60000,
        priceJPY: 350,
        description: "香り高い抹茶とミルクの和風ラテ。",
      },
      {
        name: "チーズケーキ",
        priceVND: 70000,
        priceJPY: 400,
        description: "濃厚でクリーミーな自家製チーズケーキ。",
      },
    ],
  },
  {
    id: 9,
    name: "Dog & Bee Café",
    address: "92 Nguyen Du, Hai Ba Trung, Hanoi (グエンズー通り、ハイバーチュン区、ハノイ)",
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
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      ],
      food: [
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      ],
    },
    description: "遊び心のある雰囲気と毛むくじゃらの友達がいる犬に優しいカフェ。",
    phone: "0922 444 555",
    hours: "毎日: 9時～21時",
    distance: 2.7,
    menuItems: [
      {
        name: "犬用クッキー",
        priceVND: 15000,
        priceJPY: 90,
        description: "犬用の手作りクッキー。",
      },
      {
        name: "カフェラテ",
        priceVND: 65000,
        priceJPY: 370,
        description: "まろやかなミルクとエスプレッソ。",
      },
      {
        name: "チョコレートケーキ",
        priceVND: 80000,
        priceJPY: 460,
        description: "濃厚なチョコレートケーキ。",
      },
    ],
  },
  {
    id: 10,
    name: "Giang Café (Egg Coffee)",
    address: "39 Nguyen Huu Huan, Hoan Kiem, Hanoi (グエンフーフアン通り、ホアンキエム区、ハノイ)",
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
    menuItems: [
      {
        name: "エッグコーヒー",
        priceVND: 40000,
        priceJPY: 230,
        description: "クリーミーで濃厚なエッグコーヒー。",
      },
      {
        name: "ベトナムコーヒー",
        priceVND: 35000,
        priceJPY: 200,
        description: "濃厚なベトナム伝統コーヒー。",
      },
      {
        name: "バインミー",
        priceVND: 50000,
        priceJPY: 290,
        description: "ベトナム風サンドイッチ。",
      },
    ],
  },
  {
    id: 11,
    name: "Loading T Café",
    address: "108 Phan Dinh Phung, Ba Dinh, Hanoi (ファンディンフン通り、バーディン区、ハノイ)",
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
    menuItems: [
      {
        name: "コーヒー",
        priceVND: 30000,
        priceJPY: 170,
        description: "ホットまたはアイスのコーヒー。",
      },
      {
        name: "紅茶",
        priceVND: 25000,
        priceJPY: 150,
        description: "ホットまたはアイスの紅茶。",
      },
      {
        name: "チョコレートケーキ",
        priceVND: 80000,
        priceJPY: 460,
        description: "濃厚なチョコレートケーキ。",
      },
    ],
  },
  {
    id: 12,
    name: "Loft 29 Café",
    address: "29 Tong Duy Tan, Hoan Kiem, Hanoi (トンズイタン通り、ホアンキエム区、ハノイ)",
    lat: 21.030,
    lng: 105.849,
    rating: 4.6,
    reviews: 2,
    price_range: "moderate",
    tags: ["ルーフトップ", "屋外席", "インスタ映え", "Wi-Fi"],
    photos: {
      menu: [
        "https://i.pinimg.com/1200x/b8/5f/4f/b85f4f56ef2419f679ef69fec2032fb8.jpg?w=600&h=400&fit=crop",
      ],
      interior: [
        "https://i.pinimg.com/1200x/b8/5f/4f/b85f4f56ef2419f679ef69fec2032fb8.jpg",
      ],
      food: [
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
      ],
    },
    description: "素晴らしい街の景色とインスタ映えする内装を備えたルーフトップカフェ。",
    phone: "0944 111 222",
    hours: "毎日: 8時～23時",
    distance: 2.5,
    menuItems: [
      {
        name: "カクテル",
        priceVND: 120000,
        priceJPY: 690,
        description: "フルーツカクテル。",
      },
      {
        name: "ビール",
        priceVND: 30000,
        priceJPY: 170,
        description: "冷たいビール。",
      },
      {
        name: "スナック盛り合わせ",
        priceVND: 150000,
        priceJPY: 860,
        description: "おつまみの盛り合わせ。",
      },
    ],
  },
  {
    id: 13,
    name: "Xofa Café & Bistro",
    address: "54 Thai Ha, Dong Da, Hanoi (タイハー通り、ドンダー区、ハノイ)",
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
    menuItems: [
      {
        name: "エッグベネディクト",
        priceVND: 90000,
        priceJPY: 510,
        description: "ポーチドエッグとハムのベネディクト。",
      },
      {
        name: "アサイーボウル",
        priceVND: 80000,
        priceJPY: 460,
        description: "アサイーとフルーツのボウル。",
      },
      {
        name: "フレンチトースト",
        priceVND: 70000,
        priceJPY: 400,
        description: "自家製フレンチトースト。",
      },
    ],
  },
  {
    id: 14,
    name: "Soi Bien Café",
    address: "23 Quan Thanh, Ba Dinh, Hanoi (クアンタン通り、バーディン区、ハノイ)",
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
    menuItems: [
      {
        name: "ココナッツジュース",
        priceVND: 25000,
        priceJPY: 150,
        description: "フレッシュなココナッツジュース。",
      },
      {
        name: "ビール",
        priceVND: 30000,
        priceJPY: 170,
        description: "冷たいビール。",
      },
      {
        name: "シーフードサラダ",
        priceVND: 120000,
        priceJPY: 690,
        description: "新鮮なシーフードのサラダ。",
      },
    ],
  },
  {
    id: 15,
    name: "Cafe Pho Co",
    address: "11 Hang Gai, Hoan Kiem, Hanoi (ハンガイ通り、ホアンキエム区、ハノイ)",
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
        "https://i.pinimg.com/1200x/e7/04/f8/e704f859e505c51f81243373e592749c.jpg",
      ],
      food: [
        "https://images.unsplash.com/photo-1572478204481-a9bb598c77f7?w=600&h=400&fit=crop",
      ],
    },
    description: "フォーとベトナムコーヒーを提供する伝統的な旧市街のカフェ。",
    phone: "0977 777 888",
    hours: "毎日: 6:00～22:00",
    distance: 3.8,
    menuItems: [
      {
        name: "フォー",
        priceVND: 50000,
        priceJPY: 290,
        description: "ベトナムの伝統的なヌードルスープ。",
      },
      {
        name: "ベトナムコーヒー",
        priceVND: 35000,
        priceJPY: 200,
        description: "濃厚なベトナム伝統コーヒー。",
      },
      {
        name: "バインミー",
        priceVND: 50000,
        priceJPY: 290,
        description: "ベトナム風サンドイッチ。",
      },
    ],
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



