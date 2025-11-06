import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loginApi, logoutApi, fetchProfileFromApi } from "./authService";

type User = {
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  roles: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  const login = async (email: string, password: string) => {
    const { user, token } = await loginApi(email, password);
    localStorage.setItem("token", token);
    setUser(user);

    const profile = await fetchProfileFromApi(token);
    setRoles(profile.roles);
  };

  const logout = () => {
    logoutApi();
    localStorage.removeItem("token");
    setUser(null);
    setRoles([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfileFromApi(token).then((profile) => {
        setUser({ email: profile.email });
        setRoles(profile.roles);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
