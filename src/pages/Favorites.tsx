import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cafes } from "@/lib/mock-data";
import { CafeCard } from "@/components/CafeCard";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Heart, Coffee } from "lucide-react";

const Favorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  const favoriteCafes = cafes.filter((cafe) => favorites.includes(cafe.id));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="bg-gradient-to-b from-secondary/30 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">お気に入りカフェ</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            あなたが保存したカフェコレクション
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favoriteCafes.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-foreground text-lg">
                <span className="font-semibold text-primary">{favoriteCafes.length}</span> 件のお気に入りカフェ
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteCafes.map((cafe) => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Heart className="h-20 w-20 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold text-foreground mb-3">
              お気に入りがありません
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              カフェを探して、お気に入りに保存しましょう！<br />
              ハートアイコンをクリックして保存できます。
            </p>
            <Link to="/search">
              <Button size="lg" className="gap-2">
                <Coffee className="h-5 w-5" />
                カフェを探す
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
