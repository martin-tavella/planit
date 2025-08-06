"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const DashboardNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="bg-purple-600 min-h-30 flex justify-center fixed z-0 w-full">
      <div className="flex items-center gap-30 justify-center">
        <p className="text-5xl">Hi, {user?.name}! 👋</p>
        <div className="border-2 border-violet-700 w-20 h-20 rounded-full">
          <Image src={user!.picture} alt={user!.name} />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
