"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("hi_herbs_admin_auth");
    if (auth === "true") {
      router.replace("/admin/dashboard");
    }
    // If not authenticated, do nothing — the AdminLayout will show login form
  }, [router]);

  return null;
}
