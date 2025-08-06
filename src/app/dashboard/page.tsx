"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "./layout";

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
        <p>ACA VAN LAS TAREAS</p>
    </>
  );
};

export default DashboardPage;
