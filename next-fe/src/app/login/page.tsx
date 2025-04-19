"use client";
import { useEffect, useState } from "react";
import LoginCard from "@/components/login/LoginCard";
import Image from "next/image";
const LoginPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-50 flex items-center justify-center overflow-hidden">
      {/* Enhanced navbar with better logo treatment */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-6 py-4 flex items-center">
        <div className="flex items-center space-x-2"></div>
      </nav>

      {/* Aceternity UI-inspired background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient blob that follows mouse */}
        <div
          className="absolute bg-gradient-to-r from-blue-200 to-purple-200 opacity-60 blur-3xl rounded-full w-96 h-96"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        />

        {/* Fixed position background elements */}
        <div className="absolute top-1/4 left-1/4 bg-sky-200 opacity-40 blur-3xl rounded-full w-64 h-64" />
        <div className="absolute bottom-1/3 right-1/4 bg-violet-200 opacity-40 blur-3xl rounded-full w-80 h-80" />
        <div className="absolute top-2/3 left-1/3 bg-indigo-200 opacity-40 blur-3xl rounded-full w-72 h-72" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-slate-200/[0.2] bg-[size:20px_20px]" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-md px-4">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
