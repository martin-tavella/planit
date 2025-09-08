"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardActions from "@/components/dashboard";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  
  return (
    <>
        <DashboardActions />
    </>
  );
};

export default DashboardPage;
