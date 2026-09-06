"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/AppContext";
import { useEffect } from "react";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const { theme } = useApp();

  // Apply body bg based on theme
  useEffect(() => {
    document.body.className = `min-h-screen flex flex-col font-sans antialiased ${
      theme === "dark"
        ? "bg-brand-deepest text-gray-100"
        : "bg-gray-50 text-brand-deep"
    }`;
  }, [theme]);

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={isAdminRoute ? "flex-1" : "flex-1"}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
