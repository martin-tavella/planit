"use client";

import { useAuth } from "@/context/AuthContext";
import { handleGoogleCallback } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const code = searchParams.get("code");
      if (!code) return router.push("/login");

      try {
        const res = await handleGoogleCallback(code);
        login(res.access_token);
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchParams, router, login]);

  return <p>Autenticando con Google...</p>
}
