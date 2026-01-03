import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Coffee } from "lucide-react";
import { toast } from "sonner";

export interface UserPreferences {
  cafeTypes: string[];
  priceRange: string[];
  maxDistance: string;
  amenities: string[];
}

const Preferences = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences>({
    cafeTypes: [],
    priceRange: [],
    maxDistance: "5",
    amenities: [],
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user_preferences", JSON.stringify(preferences));
    toast.success("好みを保存しました！");
    navigate("/");
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-hover border-border/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Coffee className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl">あなたの好みを教えてください</CardTitle>
          <CardDescription>
            カフェ体験をカスタマイズしましょう（後で変更可能）
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                      id={`type-${type.value}`}
                      checked={preferences.cafeTypes.includes(type.value)}
                      onCheckedChange={() => toggleArrayPreference("cafeTypes", type.value)}
                    />
                    <Label htmlFor={`type-${type.value}`} className="cursor-pointer text-sm">
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
                      id={`price-${price.value}`}
                      checked={preferences.priceRange.includes(price.value)}
                      onCheckedChange={() => toggleArrayPreference("priceRange", price.value)}
                    />
                    <Label htmlFor={`price-${price.value}`} className="cursor-pointer text-xs leading-tight">
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
                      id={`amenity-${amenity.value}`}
                      checked={preferences.amenities.includes(amenity.value)}
                      onCheckedChange={() => toggleArrayPreference("amenities", amenity.value)}
                    />
                    <Label htmlFor={`amenity-${amenity.value}`} className="cursor-pointer">
                      {amenity.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleSkip} className="flex-1">
                スキップ
              </Button>
              <Button type="submit" className="flex-1">
                保存
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preferences;
