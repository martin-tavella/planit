import { FormData as RegisterFormData}from "@/components/Register/types/FormData";
import { FormData as LoginFormData } from "@/components/Login/types/FormData";
import api from "./api";

export const login = async ({ email, password }: LoginFormData) => {
    const res = await api.post("/auth/login", { email, password});
    localStorage.setItem("token", res.data.access_token);
    return res.data;
}

export const register = async (data: RegisterFormData) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("token", res.data.access_token);
    return res.data;
}

export const loginWithGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
}

export const handleGoogleCallback = async (code: string) => {
    const res = await api.get(`/auth/google/redirect?code=${code}`);
    return res.data;
}

export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
}