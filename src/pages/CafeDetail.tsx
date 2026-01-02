import { useParams, useNavigate, Link } from "react-router-dom";
import { getAllCafes, reviews } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Heart, MapPin, Phone, Clock, Star, Wifi, Zap, Dog, Cat, Trees, MessageSquarePlus, ThumbsUp, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Comment {
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
  likes: number;
  timestamp: number; // Unix timestamp for sorting
}

const CafeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const cafes = getAllCafes();
  const cafe = cafes.find((c) => c.id === Number(id));
  const cafeReviews = reviews.filter((r) => r.cafeId === Number(id));

  const [isFavorite, setIsFavorite] = useState(false);
  const [userComments, setUserComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ 
    rating: 5, 
    drinkRating: 5, 
    foodRating: 5, 
    serviceRating: 5, 
    atmosphereRating: 5, 
    text: "" 
  });
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [reviewLikes, setReviewLikes] = useState<Record<string | number, string[]>>({});
  const [sortBy, setSortBy] = useState<"mostLiked" | "earliest">("mostLiked");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(Number(id)));
    
    const savedComments = JSON.parse(localStorage.getItem("cafe_comments") || "[]");
    setUserComments(savedComments.filter((c: Comment) => c.cafeId === Number(id)));
    
    // Load likes from localStorage
    const savedLikes = JSON.parse(localStorage.getItem("review_likes") || "{}");
    setReviewLikes(savedLikes);
  }, [id]);

  if (!cafe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Café not found</h1>
          <Link to="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((fid: number) => fid !== cafe.id)
      : [...favorites, cafe.id];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to add a comment");
      navigate("/auth");
      return;
    }
    if (!newComment.text.trim()) {
      toast.error("Please write a comment");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      cafeId: cafe.id,
      username: user!.username,
      rating: (newComment.drinkRating + newComment.foodRating + newComment.serviceRating + newComment.atmosphereRating) / 4,
      drinkRating: newComment.drinkRating,
      foodRating: newComment.foodRating,
      serviceRating: newComment.serviceRating,
      atmosphereRating: newComment.atmosphereRating,
      text: newComment.text,
      date: new Date().toLocaleDateString("ja-JP", { month: "short", day: "numeric", year: "numeric" }),
      likes: 0,
      timestamp: Date.now(),
    };

    const allComments = JSON.parse(localStorage.getItem("cafe_comments") || "[]");
    const updatedComments = [...allComments, comment];
    localStorage.setItem("cafe_comments", JSON.stringify(updatedComments));
    setUserComments([...userComments, comment]);
    setNewComment({ 
      rating: 5, 
      drinkRating: 5, 
      foodRating: 5, 
      serviceRating: 5, 
      atmosphereRating: 5, 
      text: "" 
    });
    setIsCommentDialogOpen(false);
    toast.success("コメントを投稿しました！");
  };

  const toggleLike = (reviewId: string | number) => {
    if (!isAuthenticated) {
      toast.error("Please login to like reviews");
      navigate("/auth");
      return;
    }

    const currentUserId = user!.username;
    const updatedLikes = { ...reviewLikes };
    
    if (!updatedLikes[reviewId]) {
      updatedLikes[reviewId] = [];
    }
    
    const userIndex = updatedLikes[reviewId].indexOf(currentUserId);
    if (userIndex > -1) {
      // Unlike
      updatedLikes[reviewId].splice(userIndex, 1);
    } else {
      // Like
      updatedLikes[reviewId].push(currentUserId);
    }
    
    setReviewLikes(updatedLikes);
    localStorage.setItem("review_likes", JSON.stringify(updatedLikes));
  };

  const getLikesCount = (reviewId: string | number, baseLikes: number = 0): number => {
    const userLikesCount = reviewLikes[reviewId]?.length || 0;
    return baseLikes + userLikesCount;
  };

  const isLikedByUser = (reviewId: string | number): boolean => {
    if (!isAuthenticated || !user) return false;
    return reviewLikes[reviewId]?.includes(user.username) || false;
  };

  // Merge mock reviews with user comments and add likes count - recalculate when reviewLikes changes
  const getAllReviewsWithLikes = () => {
    return [
      ...cafeReviews.map(r => ({ 
        ...r, 
        likes: r.likes || 0, 
        timestamp: r.timestamp || 0, 
        currentLikes: getLikesCount(r.id, r.likes || 0) 
      })),
      ...userComments.map(c => ({ 
        ...c, 
        currentLikes: getLikesCount(c.id, c.likes || 0) 
      }))
    ];
  };
  
  // Sort reviews based on selected sort option
  const sortedReviews = getAllReviewsWithLikes().sort((a, b) => {
    if (sortBy === "mostLiked") {
      return b.currentLikes - a.currentLikes;
    } else {
      // Sort by newest first (most recent)
      return b.timestamp - a.timestamp;
    }
  });

  const allReviews = sortedReviews;

  // Calculate rating distribution from actual reviews
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const mockCount = cafeReviews.filter(r => Math.round(r.rating) === star).length;
    const userCount = userComments.filter(c => Math.round(c.rating) === star).length;
    return mockCount + userCount;
  });

  // Calculate average categories from all reviews
  const avgCategories = allReviews.length > 0 
    ? {
        drinks: allReviews.reduce((sum, r) => {
          const drinkRating = 'categories' in r ? r.categories.drinks : r.drinkRating;
          return sum + drinkRating;
        }, 0) / allReviews.length,
        food: allReviews.reduce((sum, r) => {
          const foodRating = 'categories' in r ? r.categories.food : r.foodRating;
          return sum + foodRating;
        }, 0) / allReviews.length,
        service: allReviews.reduce((sum, r) => {
          const serviceRating = 'categories' in r ? r.categories.service : r.serviceRating;
          return sum + serviceRating;
        }, 0) / allReviews.length,
        atmosphere: allReviews.reduce((sum, r) => {
          const atmosphereRating = 'categories' in r ? r.categories.atmosphere : r.atmosphereRating;
          return sum + atmosphereRating;
        }, 0) / allReviews.length,
      }
    : { drinks: 0, food: 0, service: 0, atmosphere: 0 };

  // Calculate overall average rating
  const overallAvgRating = allReviews.length > 0
    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    : cafe.rating;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-3 flex-1">
            <h1 className="text-4xl font-bold text-foreground">{cafe.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold text-lg">{cafe.rating}</span>
                <span className="text-muted-foreground">({cafe.reviews} reviews)</span>
              </div>
              {cafe.distance && (
                <span className="text-muted-foreground">{cafe.distance} km away</span>
              )}
            </div>
          </div>
          <Button
            onClick={toggleFavorite}
            variant={isFavorite ? "default" : "outline"}
            className="shrink-0"
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Saved" : "Save"}
          </Button>
        </div>

        {/* Photo Tabs */}
        <Tabs defaultValue="interior" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-secondary/50">
            <TabsTrigger value="interior">店内</TabsTrigger>
            <TabsTrigger value="menu">メニュー</TabsTrigger>
            <TabsTrigger value="food">料理と飲み物</TabsTrigger>
          </TabsList>
          <TabsContent value="interior" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {cafe.photos.interior.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${cafe.name} interior ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-card"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="menu" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {cafe.photos.menu.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${cafe.name} menu ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-card"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="food" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {cafe.photos.food.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`${cafe.name} food ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-xl shadow-card"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Info & Reviews */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Info Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
                <TabsTrigger value="about">基本情報</TabsTrigger>
                <TabsTrigger value="amenities">設備</TabsTrigger>
                <TabsTrigger value="details">詳細</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">このカフェについて</h2>
                    <p className="text-muted-foreground leading-relaxed">{cafe.description}</p>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">住所</p>
                          <span className="text-sm">{cafe.address}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">営業時間</p>
                          <span className="text-sm">{cafe.hours}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">電話番号</p>
                          <span className="text-sm">{cafe.phone}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="mt-4">
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">設備とサービス</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {cafe.tags.includes("Wi-Fi") && (
                        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                          <Wifi className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">無料Wi-Fi</p>
                            <p className="text-xs text-muted-foreground">高速インターネット接続</p>
                          </div>
                        </div>
                      )}
                      {cafe.tags.includes("Power Outlets") && (
                        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                          <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">電源コンセント</p>
                            <p className="text-xs text-muted-foreground">全席利用可能</p>
                          </div>
                        </div>
                      )}
                      {cafe.tags.some(t => t.toLowerCase().includes("dog")) && (
                        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                          <Dog className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">ペット同伴可</p>
                            <p className="text-xs text-muted-foreground">犬と一緒に楽しめます</p>
                          </div>
                        </div>
                      )}
                      {cafe.tags.some(t => t.toLowerCase().includes("cat")) && (
                        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                          <Cat className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">猫カフェ</p>
                            <p className="text-xs text-muted-foreground">かわいい猫たちと触れ合えます</p>
                          </div>
                        </div>
                      )}
                      {cafe.tags.includes("Outdoor") && (
                        <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                          <Trees className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">屋外席</p>
                            <p className="text-xs text-muted-foreground">テラス席あり</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {cafe.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-4">
                <Card className="shadow-card border-border/50">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">詳細情報</h2>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">価格帯</p>
                          <p className="text-lg font-semibold capitalize">
                            {cafe.price_range === "cheap" && "お手頃 (¥)"}
                            {cafe.price_range === "moderate" && "標準 (¥¥)"}
                            {cafe.price_range === "expensive" && "高級 (¥¥¥)"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">距離</p>
                          <p className="text-lg font-semibold">{cafe.distance} km</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">総レビュー数</p>
                          <p className="text-lg font-semibold">{cafe.reviews} 件</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">平均評価</p>
                          <p className="text-lg font-semibold flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                            {cafe.rating}
                          </p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm font-medium text-muted-foreground mb-2">支払い方法</p>
                        <p className="text-sm">現金、クレジットカード、電子マネー対応</p>
                      </div>
                      <div className="pt-2">
                        <p className="text-sm font-medium text-muted-foreground mb-2">駐車場</p>
                        <p className="text-sm">近隣にコインパーキングあり</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Reviews Section */}
            <Card className="shadow-card border-border/50">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">レビュー・コメント</h2>
                  
                  {/* Add Comment Button */}
                  {isAuthenticated ? (
                    <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" className="gap-2">
                          <MessageSquarePlus className="h-4 w-4" />
                          コメントを追加
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>コメントを投稿</DialogTitle>
                          <DialogDescription>
                            このカフェでの体験を評価してシェアしてください
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmitComment} className="space-y-6 pt-4">
                          {/* Individual Category Ratings */}
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-base">飲み物の評価</Label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => setNewComment({ ...newComment, drinkRating: rating })}
                                    className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${
                                      rating <= newComment.drinkRating
                                        ? "bg-primary text-primary-foreground scale-110"
                                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-base">料理の評価</Label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => setNewComment({ ...newComment, foodRating: rating })}
                                    className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${
                                      rating <= newComment.foodRating
                                        ? "bg-primary text-primary-foreground scale-110"
                                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-base">サービスの評価</Label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => setNewComment({ ...newComment, serviceRating: rating })}
                                    className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${
                                      rating <= newComment.serviceRating
                                        ? "bg-primary text-primary-foreground scale-110"
                                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-base">雰囲気の評価</Label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => setNewComment({ ...newComment, atmosphereRating: rating })}
                                    className={`h-10 w-10 rounded-full text-sm font-medium transition-all ${
                                      rating <= newComment.atmosphereRating
                                        ? "bg-primary text-primary-foreground scale-110"
                                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="comment-text">コメント</Label>
                            <Textarea
                              id="comment-text"
                              placeholder="このカフェでの体験を共有してください..."
                              value={newComment.text}
                              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => setIsCommentDialogOpen(false)}>
                              キャンセル
                            </Button>
                            <Button type="submit" className="flex-1">投稿する</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button onClick={() => navigate("/auth")} variant="outline" size="sm">
                      ログインして投稿
                    </Button>
                  )}
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-primary">{overallAvgRating.toFixed(1)}</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(overallAvgRating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({allReviews.length}件のレビュー)</span>
                  </div>
                  {[5, 4, 3, 2, 1].map((stars, idx) => {
                    const totalReviews = ratingDistribution.reduce((a, b) => a + b, 0);
                    const percentage = totalReviews > 0 ? (ratingDistribution[idx] / totalReviews) * 100 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm w-16">★ {stars}</span>
                        <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-10 text-right">
                          {ratingDistribution[idx]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Category Ratings with 1-10 scale */}
                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">飲み物</span>
                      <span className="text-2xl font-bold text-primary">{avgCategories.drinks.toFixed(1)}</span>
                    </div>
                    <div className="bg-secondary rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary/80 to-primary h-full transition-all"
                        style={{ width: `${(avgCategories.drinks / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">料理</span>
                      <span className="text-2xl font-bold text-primary">{avgCategories.food.toFixed(1)}</span>
                    </div>
                    <div className="bg-secondary rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary/80 to-primary h-full transition-all"
                        style={{ width: `${(avgCategories.food / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">サービス</span>
                      <span className="text-2xl font-bold text-primary">{avgCategories.service.toFixed(1)}</span>
                    </div>
                    <div className="bg-secondary rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary/80 to-primary h-full transition-all"
                        style={{ width: `${(avgCategories.service / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">雰囲気</span>
                      <span className="text-2xl font-bold text-primary">{avgCategories.atmosphere.toFixed(1)}</span>
                    </div>
                    <div className="bg-secondary rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary/80 to-primary h-full transition-all"
                        style={{ width: `${(avgCategories.atmosphere / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Individual Reviews & Comments */}
                <div className="space-y-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">レビュー ({allReviews.length})</h3>
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "mostLiked" | "earliest")}
                        className="text-sm border border-border rounded-md px-3 py-1.5 bg-background cursor-pointer hover:bg-secondary/50 transition-colors"
                      >
                        <option value="mostLiked">人気順</option>
                        <option value="earliest">日付順</option>
                      </select>
                    </div>
                  </div>
                  {allReviews.map((review) => (
                    <div key={review.id} className="space-y-3 p-4 bg-secondary/10 rounded-xl">
                      <div className="flex items-start gap-3">
                        {"userAvatar" in review ? (
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-lg font-semibold text-primary">
                              {review.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-base">
                              {"userName" in review ? review.userName : review.username}
                            </span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            {Array.from({ length: Math.min(5, Math.round(review.rating)) }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            ))}
                            <span className="text-sm font-semibold text-muted-foreground ml-1">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                            <div className="flex items-center justify-between px-2 py-1 bg-background/50 rounded">
                              <span className="text-muted-foreground">飲み物</span>
                              <span className="font-bold text-primary">
                                {"drinkRating" in review ? review.drinkRating : review.categories.drinks.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1 bg-background/50 rounded">
                              <span className="text-muted-foreground">料理</span>
                              <span className="font-bold text-primary">
                                {"foodRating" in review ? review.foodRating : review.categories.food.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1 bg-background/50 rounded">
                              <span className="text-muted-foreground">サービス</span>
                              <span className="font-bold text-primary">
                                {"serviceRating" in review ? review.serviceRating : review.categories.service.toFixed(1)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between px-2 py-1 bg-background/50 rounded">
                              <span className="text-muted-foreground">雰囲気</span>
                              <span className="font-bold text-primary">
                                {"atmosphereRating" in review ? review.atmosphereRating : review.categories.atmosphere.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-foreground mt-3 leading-relaxed">{review.text}</p>
                          
                          {/* Like Button */}
                          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                            <button
                              onClick={() => toggleLike(review.id)}
                              className={`flex items-center gap-2 text-sm transition-colors ${
                                isLikedByUser(review.id)
                                  ? "text-primary font-medium"
                                  : "text-muted-foreground hover:text-primary"
                              }`}
                            >
                              <ThumbsUp className={`h-4 w-4 ${
                                isLikedByUser(review.id) ? "fill-current" : ""
                              }`} />
                              <span>{review.currentLikes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quick Actions */}
          <aside className="space-y-4">
            <Card className="shadow-card border-border/50 sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-lg">クイック情報</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">価格帯</span>
                    <span className="font-medium capitalize">
                      {cafe.price_range === "cheap" && "¥"}
                      {cafe.price_range === "moderate" && "¥¥"}
                      {cafe.price_range === "expensive" && "¥¥¥"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">評価</span>
                    <span className="font-medium">⭐ {cafe.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">距離</span>
                    <span className="font-medium">{cafe.distance} km</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  道順を取得
                </Button>
                <Button className="w-full">電話する</Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CafeDetail;
