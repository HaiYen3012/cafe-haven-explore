import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  email: string;
  role?: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  signup: (username: string, email: string, password: string, skipPreferences?: boolean) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("cafe_haven_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, _password: string) => {
    // Admin account: username "admin", others are regular users
    const role: "admin" | "user" = username.toLowerCase() === "admin" ? "admin" : "user";
    const userData = { username, email: `${username}@example.com`, role };
    setUser(userData);
    localStorage.setItem("cafe_haven_user", JSON.stringify(userData));
  };

  const signup = (username: string, email: string, _password: string, skipPreferences = false) => {
    const userData = { username, email, role: "user" as const };
    setUser(userData);
    localStorage.setItem("cafe_haven_user", JSON.stringify(userData));
    return skipPreferences;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cafe_haven_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
