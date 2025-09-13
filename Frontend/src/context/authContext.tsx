"use client"
import { useContext, createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface authContextTypes {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  loading : boolean
}

const authContext = createContext<authContextTypes | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching getMe")
        const res = await fetch("http://localhost:5000/api/auth/getMe", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log("The response from getMe is :-", res)
        if (!res.ok) {
          throw new Error("Failed to fetch User");
        }
        const data = await res.json();
        console.log("the data is :-", data);
        setAuthUserState(data.user);
      } catch (err) {
        console.log("Error in Frontend getMe", err);
        setAuthUserState(null);
      } finally{
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const setAuthUser = (user: User | null) => {
    setAuthUserState(user);
  };

  return (
    <authContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </authContext.Provider>
  );
};
