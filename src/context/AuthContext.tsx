"use client";

import { decodeToken, JwtPayload } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: JwtPayload | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    checkTokenExpiration: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            const decodedUser = decodeToken(storedToken);
            setUser(decodedUser);
        }
        checkTokenExpiration();
    }, [])

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setToken(token);
        const decodedUser = decodeToken(token);
        setUser(decodedUser);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        window.location.href = "/";
    }

    const checkTokenExpiration = (): boolean => {
        if (token && user) {
            console.log(user, token)
            if (user.exp < new Date().getTime() / 1000) {
                logout();
                return true
            }
        }
        return false
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, checkTokenExpiration }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}