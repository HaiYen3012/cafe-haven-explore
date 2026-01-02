import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, PenSquare, Coffee, User, Settings } from "lucide-react";
import { toast } from "sonner";
import { UserPreferences } from "./Preferences";

const Profile = () => {
  const [isLoggedIn] = useState(true);
  
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Preferences state
  const [preferences, setPreferences] = useState<UserPreferences>({
    cafeTypes: [],
    priceRange: [],
    maxDistance: "5",
    amenities: [],
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("user_profile") || "{}");
    if (savedProfile.name) setProfile(savedProfile);
    
    const savedPreferences = JSON.parse(localStorage.getItem("user_preferences") || "{}");
    if (savedPreferences.cafeTypes) setPreferences(savedPreferences);
  }, []);

  const toggleArrayPreference = (key: keyof UserPreferences, value: string) => {
    setPreferences((prev) => {
      const array = prev[key] as string[];
      return {
        ...prev,
        [key]: array.includes(value)
          ? array.filter((v) => v !== value)
          : [...array, value],
      };
    });
  };

  const handleSaveProfile = () => {
    localStorage.setItem("user_profile", JSON.stringify(profile));
    toast.success("プロフィールを保存しました！");
  };

  const handleSavePreferences = () => {
    localStorage.setItem("user_preferences", JSON.stringify(preferences));
    toast.success("好みを保存しました！");
  };

  // Mock user reviews
  const myReviews = [
    {
      cafeId: 1,
      cafeName: "Highlands Coffee",
      rating: 5,
      date: "2024-10-15",
      text: "雰囲気が最高！安定したWi-Fiと電源コンセントがあり、リモートワークに最適です。",
    },
    {
      cafeId: 2,
      cafeName: "The Coffee House",
      rating: 5,
      date: "2024-10-20",
      text: "ベルベットのソファと最高の抹茶ラテがあるキャットカフェ。猫たちがとても可愛い！",
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center space-y-4">
            <Coffee className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">ログインが必要です</h2>
            <p className="text-muted-foreground">
              お気に入りとレビューを見るにはログインしてください
            </p>
            <Button className="w-full">ログイン</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-secondary/70">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">マイプロフィール</h1>
        </div>
      </header>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">プロフィール</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">好み</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <PenSquare className="h-4 w-4" />
              <span className="hidden sm:inline">レビュー</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-8">
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle>プロフィール編集</CardTitle>
                <CardDescription>あなたの情報を更新してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">お名前</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="山田太郎"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="090-1234-5678"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="w-full mt-4">
                  プロフィールを保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="mt-8">
            <Card className="shadow-card border-border/50">
              <CardHeader>
                <CardTitle>好みの設定</CardTitle>
                <CardDescription>カフェ検索をカスタマイズしましょう</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Café Types */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">好きなカフェタイプ</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "dog", label: "🐕 ドッグカフェ" },
                      { value: "cat", label: "🐱 キャットカフェ" },
                      { value: "work", label: "💼 仕事向け" },
                      { value: "quiet", label: "🤫 静か" },
                    ].map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pref-type-${type.value}`}
                          checked={preferences.cafeTypes.includes(type.value)}
                          onCheckedChange={() => toggleArrayPreference("cafeTypes", type.value)}
                        />
                        <Label htmlFor={`pref-type-${type.value}`} className="cursor-pointer">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">価格帯</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "cheap", label: "₫ < 100k" },
                      { value: "moderate", label: "₫₫ 100-200k" },
                      { value: "expensive", label: "₫₫₫ > 200k" },
                    ].map((price) => (
                      <div key={price.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pref-price-${price.value}`}
                          checked={preferences.priceRange.includes(price.value)}
                          onCheckedChange={() => toggleArrayPreference("priceRange", price.value)}
                        />
                        <Label htmlFor={`pref-price-${price.value}`} className="cursor-pointer">
                          {price.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Max Distance */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">最大距離</Label>
                  <Select
                    value={preferences.maxDistance}
                    onValueChange={(value) => setPreferences({ ...preferences, maxDistance: value })}
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 km</SelectItem>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="20">20 km</SelectItem>
                      <SelectItem value="any">制限なし</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">設備の好み</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "wifi", label: "📶 Wi-Fi" },
                      { value: "outlets", label: "🔌 電源コンセント" },
                      { value: "outdoor", label: "🌳 屋外席" },
                      { value: "parking", label: "🚗 駐車場" },
                    ].map((amenity) => (
                      <div key={amenity.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pref-amenity-${amenity.value}`}
                          checked={preferences.amenities.includes(amenity.value)}
                          onCheckedChange={() => toggleArrayPreference("amenities", amenity.value)}
                        />
                        <Label htmlFor={`pref-amenity-${amenity.value}`} className="cursor-pointer">
                          {amenity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="w-full mt-4">
                  好みを保存
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-8">
            {myReviews.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    {myReviews.length} 件のレビュー
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    あなたのカフェ体験をシェア
                  </p>
                </div>
                <div className="space-y-4">
                  {myReviews.map((review, idx) => (
                    <Card key={idx} className="shadow-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Link
                            to={`/cafe/${review.cafeId}`}
                            className="font-semibold text-lg hover:text-primary transition-colors"
                          >
                            {review.cafeName}
                          </Link>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {"⭐".repeat(review.rating)}
                          <span className="text-sm text-muted-foreground ml-2">
                            {review.rating}/5
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            編集
                          </Button>
                          <Button variant="ghost" size="sm">
                            削除
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <PenSquare className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  レビューがありません
                </h2>
                <p className="text-muted-foreground mb-6">
                  カフェ体験をコミュニティとシェアしましょう！
                </p>
                <Link to="/search">
                  <Button>
                    <Coffee className="h-4 w-4 mr-2" />
                    レビューするカフェを探す
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
