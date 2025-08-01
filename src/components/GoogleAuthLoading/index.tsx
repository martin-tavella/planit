"use client";

import { useEffect, useState } from "react";
import "./index.css";

const GoogleAuthLoading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1d0c37] via-[#2a1548] to-[#0f051a] flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#a98af7] rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Loading Container */}
      <div className="relative z-10 text-center">
        {/* Solar System Animation */}
        <div className="relative w-64 h-64 mx-auto flex mb-20 scale-120">
          {/* Central Sun/Core */}
          <div className="absolute top-27.5 left-32 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full">
            <div className="absolute inset-2">
              <div className="mb-6 flex justify-center">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
        </div>
            </div>
          </div>

         {/* Orbit Rings */}
          <div className="absolute top-45 left-48 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#a98af7]/40 rounded-full animate-spin-reverse"></div>
          <div className="absolute top-52 left-56 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#a98af7]/40 rounded-full animate-spin-slow"></div>
          <div className="absolute top-60 left-64 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#a98af7]/40 rounded-full animate-spin-reverse-slow"></div>

          {/* Orbiting Planets */}
          <div className="absolute top-45 left-48 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 animate-spin-reverse">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#c4b5fd] rounded-full shadow-[0_0_10px_rgba(196,181,253,0.6)]"></div>
          </div>

          <div className="absolute top-52 left-56 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-spin-slow">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#a98af7] rounded-full shadow-[0_0_15px_rgba(169,138,247,0.8)]"></div>
          </div>

          <div className="absolute top-60 left-64 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 animate-spin-reverse-slow">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#e0e7ff] rounded-full shadow-[0_0_8px_rgba(224,231,255,0.6)]"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white mb-2">Planit</h2>
          <p className="text-[#c4b5fd] text-lg font-medium">
            Connecting with Google...
            {dots}
          </p>
          <p className="text-[#a98af7]/70 text-sm">
            Preparing your cosmic workspace
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-[#a98af7]/20 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#a98af7] to-[#c4b5fd] rounded-full animate-progress shadow-[0_0_10px_rgba(169,138,247,0.5)]"></div>
          </div>
        </div>

        <div className="absolute -inset-10 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#c4b5fd] rounded-full animate-cosmic-dust"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthLoading;