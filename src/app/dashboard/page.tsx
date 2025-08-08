"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardActions from "@/components/dashboard";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
        console.log('no puedes pasar mijo')
      router.push("/login");
    } else {
        console.log('puedes pasar mijo')
    }
  }, [router]);
  
  return (
    <>
        <DashboardActions />
    </>
  );
};

export default DashboardPage;
