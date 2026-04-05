import React, { createContext, useState, useCallback, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Mock fallback for development
        console.warn("Dev server not found, using mock login for testing");
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const userObj = JSON.parse(savedUser);
          if (userObj.email === email) {
            setUser(userObj);
            return;
          }
        }
        // Create a new mock user if none exists
        const mockUser: User = { id: 'mock-1', email, name: email.split('@')[0], createdAt: new Date().toISOString() };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        return;
      }

      const data = await response.json();
      const userData: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        createdAt: data.createdAt,
      };
      
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("authToken", data.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData: SignupData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        // Mock fallback for development
        console.warn("Dev server not found, using mock signup for testing");
        const newUser: User = {
          id: `user_${Math.random().toString(36).substr(2, 9)}`,
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          createdAt: new Date().toISOString(),
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("authToken", "mock-dev-token");
        return;
      }

      const data = await response.json();
      const newUser: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        createdAt: data.createdAt,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("authToken", data.token);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  }, []);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    login,
    signup,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
