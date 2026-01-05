import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, PenSquare, Coffee, User, Settings, Trash2, Camera, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { UserPreferences } from "./Preferences";
import { getAllCafes } from "@/lib/mock-data";

interface UserReview {
  id: string;
  cafeId: number;
  username: string;
  rating: number;
  drinkRating: number;
  foodRating: number;
  serviceRating: number;
  atmosphereRating: number;
  text: string;
  date: string;
  timestamp: number;
}

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true);
  
  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preferences state
  const [preferences, setPreferences] = useState<UserPreferences>({
    cafeTypes: [],
    priceRange: [],
    maxDistance: "5",
    amenities: [],
  });

  // Reviews state
  const [myReviews, setMyReviews] = useState<UserReview[]>([]);
  const [editingReview, setEditingReview] = useState<UserReview | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    // Load profile from localStorage or set from current user
    const savedProfile = JSON.parse(localStorage.getItem("user_profile") || "{}");
    if (savedProfile.name) {
      setProfile(savedProfile);
    } else if (user) {
      // Auto-fill from user context if no saved profile
      setProfile({
        name: user.username || "",
        email: user.email || "",
        phone: "",
        avatar: "",
      });
    }
    
    const savedPreferences = JSON.parse(localStorage.getItem("user_preferences") || "{}");
    if (savedPreferences.cafeTypes) setPreferences(savedPreferences);

    // Load user's reviews from localStorage
    if (user) {
      const allComments = JSON.parse(localStorage.getItem("cafe_comments") || "[]");
      const userReviews = allComments.filter((comment: UserReview) => comment.username === user.username);
      setMyReviews(userReviews);
    }
  }, [user]);

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

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ファイルサイズは5MB以下にしてください");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
        toast.success("画像をアップロードしました");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem("user_profile", JSON.stringify(profile));
    toast.success("プロフィールを保存しました！");
  };

  const handleSavePreferences = () => {
    localStorage.setItem("user_preferences", JSON.stringify(preferences));
    toast.success("好みを保存しました！");
  };

  const handleDeleteReview = (reviewId: string) => {
    const allComments = JSON.parse(localStorage.getItem("cafe_comments") || "[]");
    const updatedComments = allComments.filter((comment: UserReview) => comment.id !== reviewId);
    localStorage.setItem("cafe_comments", JSON.stringify(updatedComments));
    setMyReviews(myReviews.filter(review => review.id !== reviewId));
    toast.success("レビューを削除しました");
  };

  const handleEditReview = (review: UserReview) => {
    setEditingReview({ ...review });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingReview) return;

    // Calculate overall rating from individual ratings
    const overallRating = (
      editingReview.drinkRating +
      editingReview.foodRating +
      editingReview.serviceRating +
      editingReview.atmosphereRating
    ) / 4;

    const updatedReview = { ...editingReview, rating: overallRating };

    const allComments = JSON.parse(localStorage.getItem("cafe_comments") || "[]");
    const updatedComments = allComments.map((comment: UserReview) => 
      comment.id === updatedReview.id ? updatedReview : comment
    );
    localStorage.setItem("cafe_comments", JSON.stringify(updatedComments));
    setMyReviews(myReviews.map(review => review.id === updatedReview.id ? updatedReview : review));
    setEditDialogOpen(false);
    setEditingReview(null);
    toast.success("レビューを更新しました");
  };

  const getCafeName = (cafeId: number) => {
    const cafes = getAllCafes();
    const cafe = cafes.find(c => c.id === cafeId);
    return cafe ? cafe.name : "Unknown Cafe";
  };

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
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4 pb-6 border-b border-border">
                  <div className="relative group">
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-secondary/30 flex items-center justify-center border-4 border-border shadow-lg">
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt="Avatar"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all hover:scale-110"
                      title="画像をアップロード"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">プロフィール画像</p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAvatarClick}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        画像をアップロード
                      </Button>
                      {profile.avatar && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setProfile({ ...profile, avatar: "" })}
                        >
                          削除
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">JPG, PNG (最大5MB)</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Profile Form */}
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
                      { value: "犬カフェ", label: "🐕 ドッグカフェ" },
                      { value: "猫カフェ", label: "🐱 キャットカフェ" },
                      { value: "作業向き", label: "💼 作業向き" },
                      { value: "静か", label: "🤫 静か" },
                      { value: "会話向き", label: "💬 会話向き" },
                      { value: "一人でも入りやすい", label: "👤 一人でも入りやすい" },
                      { value: "観光向け", label: "✈️ 観光向け" },
                      { value: "日本人が多い", label: "🇯🇵 日本人が多い" },
                    ].map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pref-type-${type.value}`}
                          checked={preferences.cafeTypes.includes(type.value)}
                          onCheckedChange={() => toggleArrayPreference("cafeTypes", type.value)}
                        />
                        <Label htmlFor={`pref-type-${type.value}`} className="cursor-pointer text-sm">
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
                      { value: "cheap", label: "100,000 VND以下" },
                      { value: "moderate", label: "100,000-200,000 VND" },
                      { value: "expensive", label: "200,000 VND以上" },
                    ].map((price) => (
                      <div key={price.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pref-price-${price.value}`}
                          checked={preferences.priceRange.includes(price.value)}
                          onCheckedChange={() => toggleArrayPreference("priceRange", price.value)}
                        />
                        <Label htmlFor={`pref-price-${price.value}`} className="cursor-pointer text-xs leading-tight">
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
                      { value: "Wi-Fi", label: "📶 Wi-Fi" },
                      { value: "Wi-Fi安定", label: "📡 Wi-Fi安定" },
                      { value: "コンセント", label: "🔌 電源コンセント" },
                      { value: "屋外席", label: "🌳 屋外席" },
                      { value: "駐車場", label: "🚗 駐車場" },
                      { value: "ペット可", label: "🐾 ペット可" },
                      { value: "禁煙", label: "🚭 禁煙" },
                      { value: "長時間OK", label: "⏰ 長時間OK" },
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
                  {myReviews.map((review) => (
                    <Card key={review.id} className="shadow-card border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <Link
                            to={`/cafe/${review.cafeId}`}
                            className="font-semibold text-lg hover:text-primary transition-colors"
                          >
                            {getCafeName(review.cafeId)}
                          </Link>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {"⭐".repeat(Math.round(review.rating))}
                          <span className="text-sm text-muted-foreground ml-2">
                            {review.rating.toFixed(1)}/5
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">ドリンク:</span>
                            <span>{"⭐".repeat(review.drinkRating)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">フード:</span>
                            <span>{"⭐".repeat(review.foodRating)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">サービス:</span>
                            <span>{"⭐".repeat(review.serviceRating)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">雰囲気:</span>
                            <span>{"⭐".repeat(review.atmosphereRating)}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                        <div className="flex gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditReview(review)}
                          >
                            <PenSquare className="h-3 w-3 mr-1" />
                            編集
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
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

      {/* Edit Review Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>レビューを編集</DialogTitle>
            <DialogDescription>
              カフェ体験の評価を更新してください
            </DialogDescription>
          </DialogHeader>
          {editingReview && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>ドリンク評価</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingReview({ ...editingReview, drinkRating: star })}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {star <= editingReview.drinkRating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>フード評価</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingReview({ ...editingReview, foodRating: star })}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {star <= editingReview.foodRating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>サービス評価</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingReview({ ...editingReview, serviceRating: star })}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {star <= editingReview.serviceRating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>雰囲気評価</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingReview({ ...editingReview, atmosphereRating: star })}
                      className="text-2xl hover:scale-110 transition-transform"
                    >
                      {star <= editingReview.atmosphereRating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>コメント</Label>
                <Textarea
                  value={editingReview.text}
                  onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
                  placeholder="あなたの体験を詳しく教えてください..."
                  rows={4}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button onClick={handleSaveEdit}>
                  保存
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
