import Register from "@/components/Register";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Planit - Register",
    description: "Create your account",
}


export default function RegisterPage() {
    return <Register />
}