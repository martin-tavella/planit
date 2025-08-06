import { FormData as LoginFormData } from "@/components/Login/types/FormData";
import api from "./api";
import { AxiosError } from "axios";

export const loginService = async ({ email, password }: LoginFormData) => {
    try {
    const res = await api.post("/auth/login", { email, password});
     return res.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            return error.response?.data || { error: "An unexpected error occurred" };
        }
        return { error: "An unexpected error occurred" };
    }
}

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerService = async (data: RegisterFormData) => {
    const res = await api.post("/auth/register", data);
    return res.data;
}

export const loginWithGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
}

export const handleGoogleCallback = async (code: string) => {
    const res = await api.get(`/auth/google/redirect?code=${code}`);
    return res.data;
}
