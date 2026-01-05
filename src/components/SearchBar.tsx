import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchBarProps {
  defaultValue?: string;
  variant?: "hero" | "compact";
}

export const SearchBar = ({ defaultValue = "", variant = "hero" }: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const isHero = variant === "hero";

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${isHero ? "w-full max-w-2xl" : "w-full"}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="カフェ名、住所、タグで検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`pl-10 ${isHero ? "h-14 text-lg" : "h-12"} bg-card shadow-card border-border/50 focus-visible:ring-primary`}
        />
      </div>
      <Button 
        type="submit" 
        size={isHero ? "lg" : "default"}
        className={`${isHero ? "px-8" : "px-6"} bg-primary hover:bg-primary/90 text-primary-foreground shadow-card transition-all duration-300 hover:shadow-hover`}
      >
        検索
      </Button>
    </form>
  );
};
