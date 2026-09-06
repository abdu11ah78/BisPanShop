"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Stethoscope,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Bell,
  Lock,
  User,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";

const NAV_ITEMS = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: Tag, label: "Categories" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/consultations", icon: Stethoscope, label: "Consultations" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

function AdminSidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, siteSettings } = useApp();

  const handleLogout = () => {
    localStorage.removeItem("hi_herbs_admin_auth");
    router.push("/admin");
  };

  return (
    <aside
      className={`flex flex-col h-screen bg-brand-deepest border-r border-brand-dark/60 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex-shrink-0 admin-sidebar overflow-y-auto`}
      dir="ltr"
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-brand-dark/60 min-h-[76px]">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-brand-gold bg-brand-dark flex-shrink-0 shadow-md">
              <Image
                src={siteSettings.logoUrl}
                alt={siteSettings.siteName}
                fill
                className="object-cover"
                onError={(e: any) => { e.currentTarget.src = "/WebsiteData/logo.jpeg"; }}
              />
            </div>
            <div>
              <div className="text-base font-black text-white flex items-center gap-1">
                {siteSettings.siteName} <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
              </div>
              <div className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">Admin Portal</div>
            </div>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl hover:bg-brand-dark text-gray-400 hover:text-white transition-all flex-shrink-0"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-base font-bold transition-all group ${
                active
                  ? "bg-brand-gold text-brand-deep shadow-goldGlow"
                  : "text-gray-300 hover:bg-brand-dark/50 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronRight className="w-4 h-4" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-brand-dark/60 space-y-1">
        {/* Global Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-base font-bold text-gray-300 hover:bg-brand-dark/50 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "Global Theme Switcher" : undefined}
        >
          {theme === "dark" ? <Sun className="w-5 h-5 flex-shrink-0 text-amber-400" /> : <Moon className="w-5 h-5 flex-shrink-0 text-brand-gold" />}
          {!collapsed && <span>{theme === "dark" ? "Light Mode (Global)" : "Dark Mode (Global)"}</span>}
        </button>

        {/* View Website */}
        <Link
          href="/"
          target="_blank"
          className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-base font-bold text-gray-300 hover:bg-brand-dark/50 hover:text-white transition-all ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "View Website" : undefined}
        >
          <Sparkles className="w-5 h-5 flex-shrink-0 text-brand-gold" />
          {!collapsed && <span>View Website</span>}
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-base font-bold text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all ${collapsed ? "justify-center" : ""}`}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function AdminTopBar() {
  const pathname = usePathname();
  const { siteSettings } = useApp();
  const label = NAV_ITEMS.find((n) => pathname?.startsWith(n.href))?.label || "Admin Portal";

  return (
    <div className="h-16 border-b border-brand-dark/60 bg-brand-deepest flex items-center justify-between px-6 flex-shrink-0 admin-topbar" dir="ltr">
      <h1 className="text-xl font-black text-white">{label}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-dark/50 border border-brand-dark">
          <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-deep text-sm font-black shadow-md">
            H
          </div>
          <span className="text-sm font-bold text-white hidden sm:block">Hakeem Muhammad Ikram</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const pathname = usePathname();
  const { siteSettings } = useApp();

  useEffect(() => {
    document.documentElement.dir = "ltr";

    const auth = localStorage.getItem("hi_herbs_admin_auth");
    if (auth === "true") {
      setAuthenticated(true);
    } else if (pathname !== "/admin") {
      // Unauthenticated access to any admin sub-route → redirect to login
      router.replace("/admin");
    }
    setLoading(false);
  }, [pathname, router]);

  const isLoginPage = pathname === "/admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-deepest flex items-center justify-center" dir="ltr">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-300 text-base font-bold">Loading admin portal...</p>
        </div>
      </div>
    );
  }

  // Block rendering of admin content entirely for unauthenticated users on sub-routes
  if (!authenticated && !isLoginPage) {
    return null;
  }

  if (!authenticated && isLoginPage) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const validUsers = [
        { username: "admin", password: "hiherbs2026" },
        { username: "hakeem", password: "hiherbs2026" },
        { username: "admin", password: "123456" },
      ];
      const match = validUsers.some(
        (u) =>
          u.username.toLowerCase() === loginForm.username.trim().toLowerCase() &&
          u.password === loginForm.password
      );
      if (match) {
        localStorage.setItem("hi_herbs_admin_auth", "true");
        setAuthenticated(true);
      } else {
        setLoginError("Invalid admin credentials. Please try again.");
      }
    };

    return (
      <div className="min-h-screen bg-brand-deepest flex items-center justify-center p-4" dir="ltr">
        <div className="bg-brand-softDark border border-brand-dark/60 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold mx-auto shadow-lg bg-brand-dark">
              <Image
                src={siteSettings.logoUrl}
                alt={siteSettings.siteName}
                fill
                className="object-cover"
                onError={(e: any) => { e.currentTarget.src = "/WebsiteData/logo.jpeg"; }}
              />
            </div>
            <h1 className="text-2xl font-black text-white">{siteSettings.siteName} Admin</h1>
            <p className="text-sm text-gray-300">Authorized Hakeem & Staff Portal Login</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-sm">
            <div>
              <label className="block text-gray-200 font-bold mb-1">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin or hakeem"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full pl-9 pr-3 py-3 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-200 font-bold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full pl-9 pr-3 py-3 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand-gold text-brand-deep font-black text-sm hover:bg-brand-goldShaded transition-all shadow-lg shadow-brand-gold/20"
            >
              Sign In to Admin Panel
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="text-sm text-gray-300 hover:text-brand-gold transition-colors font-bold">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-brand-deepest text-base" dir="ltr">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" dir="ltr">
        <AdminTopBar />
        <main className="flex-1 overflow-y-auto p-6 text-base" dir="ltr">{children}</main>
      </div>
    </div>
  );
}
