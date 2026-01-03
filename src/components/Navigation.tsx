import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Heart, LogOut, User, Plus, MapPin, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "@/contexts/LocationContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { userLocation, locationError, isLoading, requestLocation, permissionStatus, locationName } = useLocation();
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("ログアウトしました");
  };

  const handleLocationClick = () => {
    // If permission not granted, show dialog
    if (permissionStatus === "prompt" || permissionStatus === "denied") {
      setShowLocationDialog(true);
    } else if (permissionStatus === "granted") {
      // Refresh location
      requestLocation();
      toast.success("位置情報を更新しました");
    }
  };

  const handleEnableLocation = () => {
    setShowLocationDialog(false);
    requestLocation();
    toast.info("位置情報へのアクセスを許可してください", {
      description: "より正確な距離計算のため、現在地を取得します",
      duration: 5000,
    });
  };

  const isUsingRealLocation = userLocation && userLocation.lat !== 21.028511;

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-foreground">KissaGo</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/search">
            <Button variant="ghost" className="hover:bg-secondary/70">
              探索
            </Button>
          </Link>
          <Link to="/favorites">
            <Button variant="ghost" className="hover:bg-secondary/70">
              <Heart className="h-4 w-4 mr-2" />
              お気に入り
            </Button>
          </Link>

          {/* Location Button */}
          {permissionStatus === "granted" && isUsingRealLocation ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleLocationClick}
                    disabled={isLoading}
                    className="gap-2 max-w-[300px]"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="h-4 w-4 fill-current text-green-600 flex-shrink-0" />
                    )}
                    <span className="truncate text-sm">{locationName || "現在地"}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>クリックして位置情報を更新</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              variant="outline"
              onClick={handleLocationClick}
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4" />
              )}
              <span>位置情報を有効にする</span>
            </Button>
          )}

          {/* Location Permission Dialog */}
          <AlertDialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  位置情報を有効にする
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-3 pt-2">
                  <p>
                    現在地を使用すると、近くのカフェを見つけやすくなります。
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>あなたの現在地から各カフェまでの正確な距離を表示</li>
                    <li>最寄りのカフェを簡単に検索</li>
                    <li>より良いおすすめを提供</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    「有効にする」をクリックすると、ブラウザが位置情報へのアクセス許可を求めます。
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleEnableLocation}>
                  有効にする
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Link to="/add-cafe">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    カフェを追加
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      プロフィール
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    ログアウト
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button>ログイン</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
