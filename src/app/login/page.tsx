import Login from "@/components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Planit - Login",
    description: "Login to your account",
}

export default function LoginPage() {
    return <Login />
}