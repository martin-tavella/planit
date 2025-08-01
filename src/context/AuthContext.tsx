"use client";

import { decodeToken, JwtPayload } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: JwtPayload | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
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

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
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