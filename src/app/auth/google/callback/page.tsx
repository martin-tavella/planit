"use client";

import GoogleAuthLoading from "@/components/GoogleAuthLoading";
import { useAuth } from "@/context/AuthContext";
// import { handleGoogleCallback } from "@/services/authService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const token = searchParams.get("token");
      if (!token) return router.push("/login");
      login(token);
      router.push("/dashboard");
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GoogleAuthLoading />;
}
