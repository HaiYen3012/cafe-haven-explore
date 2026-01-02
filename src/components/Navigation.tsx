import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Heart, LogOut, User, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("ログアウトしました");
  };

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-foreground">Café Haven</span>
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
          
          {isAuthenticated ? (
            <>
              <Link to="/add-cafe">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  カフェを追加
                </Button>
              </Link>
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
