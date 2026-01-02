import { Heart, MapPin, Star, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Cafe } from "@/lib/mock-data";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useState, useEffect } from "react";

interface CafeCardProps {
  cafe: Cafe;
}

export const CafeCard = ({ cafe }: CafeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currency, setCurrency] = useState<"VND" | "JPY">("VND");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(cafe.id));

    const savedCurrency = localStorage.getItem("currency_preference") as
      | "VND"
      | "JPY"
      | null;
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, [cafe.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorites = isFavorite
      ? favorites.filter((id: number) => id !== cafe.id)
      : [...favorites, cafe.id];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const getPriceDisplay = (priceRange: string) => {
    if (currency === "VND") {
      if (priceRange === "cheap") return "< 100.000 VND";
      if (priceRange === "moderate") return "100.000 - 200.000 VND";
      if (priceRange === "expensive") return "> 200.000 VND";
    } else {
      if (priceRange === "cheap") return "< 600 JPY";
      if (priceRange === "moderate") return "600 - 1200 JPY";
      if (priceRange === "expensive") return "> 1200 JPY";
    }
    return "";
  };

  const toggleCurrency = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newCurrency = currency === "VND" ? "JPY" : "VND";
    setCurrency(newCurrency);
    localStorage.setItem("currency_preference", newCurrency);
  };

  return (
    <Link to={`/cafe/${cafe.id}`}>
      <Card className="group overflow-hidden border-border/50 bg-card hover:shadow-hover transition-all duration-300 h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={cafe.photos.interior[0]}
            alt={cafe.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm hover:bg-card/95 transition-colors"
            onClick={toggleFavorite}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-accent text-accent" : "text-foreground/70"
              }`}
            />
          </Button>
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {cafe.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium text-sm">{cafe.rating}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-1 flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {cafe.address}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span>{getPriceDisplay(cafe.price_range)}</span>
              <button
                onClick={toggleCurrency}
                className="p-0.5 hover:bg-secondary rounded transition-colors"
                title={`切り替え: ${currency === "VND" ? "JPY" : "VND"}`}
              >
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>
            {cafe.distance && <span>{cafe.distance} km</span>}
          </div>

          <div className="flex gap-1.5 flex-wrap pt-1">
            {cafe.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-secondary/50 hover:bg-secondary/70 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {cafe.tags.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 bg-secondary/50"
              >
                +{cafe.tags.length - 3}
              </Badge>
            )}
          </div>

          <p className="text-xs text-muted-foreground pt-1">
            {cafe.reviews} レビュー
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
