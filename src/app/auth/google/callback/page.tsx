"use client";

import { handleGoogleCallback } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const code = searchParams.get("code");
      if (!code) return router.push("/login");

      try {
        const res = await handleGoogleCallback(code);
        localStorage.setItem("token", res.access_token);
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchParams, router]);

  return <p>Autenticando con Google...</p>
}
