import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { CafeCard } from "@/components/CafeCard";
import { getAllCafes, Cafe } from "@/lib/mock-data";
import { MapPin, Coffee, Heart, Sparkles } from "lucide-react";
import { calculateDistance } from "@/lib/distance";
import { useLocation } from "@/contexts/LocationContext";
import heroImage from "@/assets/hero-cafe.jpg";

interface UserPreferences {
  cafeTypes: string[];
  priceRange: string[];
  maxDistance: string;
  amenities: string[];
}

const getRecommendedCafes = (preferences: UserPreferences | null, allCafes: Cafe[]): Cafe[] => {
  if (!preferences || (preferences.cafeTypes.length === 0 && preferences.priceRange.length === 0 && preferences.amenities.length === 0)) {
    // No preferences, return top rated cafes
    return [...allCafes].sort((a, b) => b.rating - a.rating).slice(0, 5);
  }

  // Score each cafe based on preferences match
  const scoredCafes = allCafes.map(cafe => {
    let score = 0;

    // Price range match
    if (preferences.priceRange.includes(cafe.price_range)) {
      score += 3;
    }

    // Cafe type match
    if (preferences.cafeTypes.includes("dog") && cafe.tags.some(t => t.toLowerCase().includes("dog"))) score += 2;
    if (preferences.cafeTypes.includes("cat") && cafe.tags.some(t => t.toLowerCase().includes("cat"))) score += 2;
    if (preferences.cafeTypes.includes("work") && cafe.tags.some(t => t.toLowerCase().includes("work") || t.toLowerCase().includes("wi-fi"))) score += 2;
    if (preferences.cafeTypes.includes("quiet") && cafe.tags.some(t => t.toLowerCase().includes("quiet") || t.toLowerCase().includes("book"))) score += 2;

    // Amenities match
    if (preferences.amenities.includes("wifi") && cafe.tags.some(t => t.toLowerCase().includes("wi-fi"))) score += 1;
    if (preferences.amenities.includes("outlets") && cafe.tags.some(t => t.toLowerCase().includes("outlet") || t.toLowerCase().includes("power"))) score += 1;
    if (preferences.amenities.includes("outdoor") && cafe.tags.some(t => t.toLowerCase().includes("outdoor") || t.toLowerCase().includes("garden"))) score += 1;

    // Distance preference
    const maxDist = preferences.maxDistance === "any" ? 100 : parseFloat(preferences.maxDistance);
    if (cafe.distance && cafe.distance <= maxDist) score += 1;

    // Add rating as tie-breaker
    score += cafe.rating / 10;

    return { cafe, score };
  });

  return scoredCafes
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.cafe);
};

const Index = () => {
  const [recommendedCafes, setRecommendedCafes] = useState<Cafe[]>([]);
  const { userLocation } = useLocation();

  useEffect(() => {
    if (userLocation) {
      const savedPreferences = JSON.parse(localStorage.getItem("user_preferences") || "null");
      const allCafes = getAllCafes();
      
      // Calculate distances for all cafes
      const cafesWithDistance = allCafes.map((cafe) => ({
        ...cafe,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          cafe.lat,
          cafe.lng
        ),
      }));
      
      setRecommendedCafes(getRecommendedCafes(savedPreferences, cafesWithDistance));
    }
  }, [userLocation]);
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Cozy café atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center space-y-8">
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
              あなたにぴったりの
              <span className="block text-primary">カフェを発見</span>
            </h1>
            <p className="text-lg md:text-xl font-bold text-foreground max-w-2xl mx-auto">
              ベトナムで素敵なコーヒー、Wi-Fi、雰囲気のあるカフェを見つけよう
            </p>
          </div>

          <div className="flex justify-center">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>ベトナムに15以上のカフェ</span>
            </div>
            <div className="flex items-center gap-2">
              <Coffee className="h-4 w-4 text-primary" />
              <span>本物のレビューと評価</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              <span>お気に入りを保存</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Cafes Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-center text-foreground">
              あなたにおすすめ
            </h2>
          </div>
          <p className="text-center text-muted-foreground mb-10">
            あなたの好みに基づいたカフェをご紹介
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {recommendedCafes.map((cafe) => (
              <CafeCard key={cafe.id} cafe={cafe} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              もっと見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            私たちの特徴
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3 p-6 rounded-xl bg-secondary/50 shadow-card hover:shadow-hover transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <Coffee className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">厳選されたセレクション</h3>
              <p className="text-muted-foreground">
                本物のレビューと詳細情報を持つ厳選されたカフェ
              </p>
            </div>

            <div className="text-center space-y-3 p-6 rounded-xl bg-secondary/50 shadow-card hover:shadow-hover transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">スマートフィルター</h3>
              <p className="text-muted-foreground fold-bold">
                Wi-Fi、ペット可、静か、賑やかなど、必要なものを見つけよう
              </p>
            </div>

            <div className="text-center space-y-3 p-6 rounded-xl bg-secondary/50 shadow-card hover:shadow-hover transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-2">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">お気に入りを保存</h3>
              <p className="text-muted-foreground">
                お気に入りのカフェコレクションを作ろう
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 KissaGo. ベトナムのカフェ好きのために、愛を込めて制作されました。</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
