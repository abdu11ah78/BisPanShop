"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { SiteSettings } from "./types";

type Theme = "dark" | "light";
type Language = "en" | "ur";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Hi Herbs",
  siteSubtitle: "By Bismillah Pansar Store",
  logoUrl: "/WebsiteData/logo.jpeg",
  phone1: "+92 321 4544949",
  phone2: "+92 313 4053679",
  registrationNo: "QH-48599-A",
  address: "Shellar Chowk, College Road, Shalimar, Lahore, Punjab, Pakistan",
  heroBgUrl: "/WebsiteData/IMG_6354.PNG",
  categoriesBgUrl: "/WebsiteData/IMG_6355.PNG",
  featuredBgUrl: "/WebsiteData/IMG_6356.PNG",
  heritageBgUrl: "/WebsiteData/IMG_6357.PNG",
  contactBgUrl: "/WebsiteData/IMG_6358.PNG",
};

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, ur: string) => string;
  siteSettings: SiteSettings;
  updateSiteSettings: (updates: Partial<SiteSettings>) => Promise<void>;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguageState] = useState<Language>("en");
  // Initialize with DEFAULT_SETTINGS on initial render to prevent SSR/hydration mismatch
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("hi_herbs_theme") as Theme) || "dark";
    const savedLang = (localStorage.getItem("hi_herbs_lang") as Language) || "en";

    setTheme(savedTheme);
    setLanguageState(savedLang);
    applyTheme(savedTheme);

    // Hydrate client-stored settings AFTER mount to ensure 0 hydration errors
    const saved = localStorage.getItem("hi_herbs_site_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSiteSettingsState((prev) => ({ ...prev, ...parsed }));
      } catch (e) {}
    }

    // Apply RTL for public site, but keep LTR if in admin
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin")) {
      document.documentElement.dir = savedLang === "ur" ? "rtl" : "ltr";
    } else {
      document.documentElement.dir = "ltr";
    }

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.siteName) {
          setSiteSettingsState((prev) => {
            const merged = { ...prev, ...data };
            localStorage.setItem("hi_herbs_site_settings", JSON.stringify(merged));
            return merged;
          });
        }
      })
      .catch(() => {});

    // Listen for cross-tab & same-window settings changes so all components update instantly without page refresh
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "hi_herbs_site_settings" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSiteSettingsState((prev) => ({ ...prev, ...parsed }));
        } catch (err) {}
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail) {
        setSiteSettingsState((prev) => ({ ...prev, ...customEv.detail }));
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("hi_herbs_settings_updated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("hi_herbs_settings_updated", handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined" && siteSettings?.siteName) {
      document.title = `${siteSettings.siteName} — ${siteSettings.siteSubtitle}`;
    }
  }, [siteSettings]);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("hi_herbs_theme", next);
    applyTheme(next);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("hi_herbs_lang", lang);
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/admin")) {
      document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    } else {
      document.documentElement.dir = "ltr";
    }
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
  };

  const updateSiteSettings = async (updates: Partial<SiteSettings>) => {
    setSiteSettingsState((prev) => {
      const merged = { ...prev, ...updates };
      localStorage.setItem("hi_herbs_site_settings", JSON.stringify(merged));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("hi_herbs_settings_updated", { detail: merged }));
      }
      return merged;
    });

    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const t = (en: string, ur: string) => (language === "ur" ? ur : en);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        siteSettings,
        updateSiteSettings,
        showToast,
      }}
    >
      {children}

      {/* Floating Toast Popup Banner Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-fade-in text-xs font-bold transition-all ${
              toast.type === "success"
                ? "bg-emerald-950/90 border-emerald-500/60 text-emerald-200"
                : toast.type === "error"
                ? "bg-rose-950/90 border-rose-500/60 text-rose-200"
                : "bg-brand-deepest/90 border-brand-gold/60 text-brand-gold"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-brand-gold flex-shrink-0" />}
              <span className="truncate leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/20 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
