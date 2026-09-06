"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Truck,
  ChevronDown,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Stethoscope,
  Globe,
} from "lucide-react";
import { useCart } from "./CartContext";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useApp } from "@/lib/AppContext";

export default function Header() {
  const { cart, totalItems, subtotal, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } =
    useCart();
  const { theme, language, setLanguage, t, siteSettings } = useApp();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const linkClass = (href: string) =>
    `transition-colors font-semibold text-[15px] ${
      isActive(href) ? "text-brand-gold" : "text-gray-200 hover:text-brand-gold"
    }`;

  const isDark = theme === "dark";
  const topBg = isDark ? "bg-brand-deepest border-brand-dark/40" : "bg-brand-deep border-brand-dark/60";
  const headerBg = isDark
    ? scrolled
      ? "bg-brand-deep/98 shadow-xl"
      : "bg-brand-deep/95"
    : "bg-brand-deep shadow-md";

  return (
    <>
      {/* Top Trust Banner */}
      <div className={`${topBg} text-gray-300 text-xs py-2 px-4 border-b z-50 relative`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-brand-gold font-bold">
              <ShieldCheck className="w-4 h-4" />
              {t("100% Pure Herbal & Tibb Solutions", "100% خالص جڑی بوٹیاں")}
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Truck className="w-4 h-4 text-brand-light" />
              {t(
                "Free Lahore delivery on orders over Rs. 2,000",
                "Rs. 2,000 سے زیادہ آرڈر پر لاہور میں مفت ڈیلیوری"
              )}
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-300 text-xs">
            <a
              href={`tel:${siteSettings.phone1.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1 hover:text-brand-gold transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              {siteSettings.phone1}
            </a>
            <span className="text-white/20">|</span>
            <a
              href={`tel:${siteSettings.phone2.replace(/[^0-9+]/g, "")}`}
              className="hover:text-brand-light transition-colors"
            >
              {siteSettings.phone2}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 ${headerBg} backdrop-blur-md border-b border-brand-dark/40 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold p-0.5 shadow-lg group-hover:scale-105 transition-transform flex-shrink-0 bg-brand-dark">
                <Image
                  src={siteSettings.logoUrl}
                  alt={siteSettings.siteName}
                  fill
                  className="object-cover"
                  priority
                  onError={(e: any) => {
                    e.currentTarget.src = "/WebsiteData/logo.jpeg";
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight group-hover:text-brand-gold transition-colors flex items-center gap-1">
                  {siteSettings.siteName} <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold" />
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-light">
                  {t(siteSettings.siteSubtitle, "بِسمِ اللہ پنساری اسٹور")}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 font-semibold text-[15px]">
              <Link href="/" className={linkClass("/")}>
                {t("Home", "ہوم")}
              </Link>

              {/* Categories Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setCategoryMenuOpen(true)}
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 py-2 transition-colors font-semibold text-[15px] ${
                    pathname?.startsWith("/category") ? "text-brand-gold" : "text-gray-200 hover:text-brand-gold"
                  }`}
                >
                  {t("Products", "مصنوعات")}
                  <ChevronDown className={`w-4 h-4 transition-transform ${categoryMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {categoryMenuOpen && (
                  <div className="absolute top-full left-0 w-64 bg-brand-softDark rounded-2xl shadow-2xl border border-brand-dark/50 p-3 z-50">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-gold pb-2 border-b border-brand-dark/50 mb-2">
                      {t("All Categories", "تمام زمرے")}
                    </div>
                    <div className="grid grid-cols-1 gap-0.5 max-h-80 overflow-y-auto">
                      {MOCK_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.slug}`}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-200 hover:bg-brand-dark hover:text-brand-gold transition-colors"
                          onClick={() => setCategoryMenuOpen(false)}
                        >
                          <span>{t(cat.name_en, cat.name_ur || cat.name_en)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/portfolio" className={linkClass("/portfolio")}>
                {t("Portfolio & Heritage", "ہمارا ورثہ")}
              </Link>

              <Link
                href="/contact"
                className={`flex items-center gap-1.5 font-semibold text-[15px] transition-colors ${
                  isActive("/contact") ? "text-brand-gold" : "text-brand-light hover:text-brand-gold"
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                {t("Consultation", "مشاورت")}
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center relative w-44 lg:w-56">
                <input
                  type="text"
                  placeholder={t("Search herbs, oils...", "جڑی بوٹیاں تلاش کریں...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-brand-dark bg-brand-deepest text-white focus:outline-none focus:border-brand-gold transition-all placeholder:text-gray-500"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
              </div>

              {/* Language Toggle ONLY (Theme toggle is in Admin panel) */}
              <button
                onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full border border-brand-dark/60 bg-brand-deepest hover:border-brand-gold text-gray-300 hover:text-brand-gold transition-all"
                title="Toggle Language / زبان تبدیل کریں"
              >
                <Globe className="w-3.5 h-3.5" />
                {language === "en" ? "اردو" : "EN"}
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-deep transition-all shadow-md border border-brand-gold/30"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-deep text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-deep shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-brand-gold"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-dark/50 bg-brand-deep px-4 pt-4 pb-6 space-y-1 shadow-2xl">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {t("Home", "ہوم")}
            </Link>
            <div className="py-2 border-t border-b border-brand-dark/40">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-gold px-3 mb-1">
                {t("Categories", "کیٹیگریز")}
              </div>
              <div className="grid grid-cols-2 gap-1 px-2">
                {MOCK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs py-1.5 px-2 text-gray-300 hover:text-brand-gold block truncate"
                  >
                    {t(cat.name_en, cat.name_ur || cat.name_en)}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-brand-dark"
            >
              {t("Portfolio & Heritage", "ہمارا ورثہ")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-brand-light hover:bg-brand-dark"
            >
              {t("Hakeem Consultation", "طبی مشاورت")}
            </Link>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-brand-deepest h-full flex flex-col shadow-2xl border-l border-brand-dark/60 text-white">
            <div className="flex items-center justify-between p-4 border-b border-brand-dark/60">
              <div className="flex items-center gap-2 font-black text-lg">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                {t("Your Shopping Cart", "آپ کا شاپنگ کارٹ")} ({totalItems})
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <ShoppingBag className="w-16 h-16 text-gray-600" />
                <p className="text-sm text-gray-400">
                  {t("Your cart is currently empty.", "آپ کا کارٹ فی الحال خالی ہے۔")}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-gold text-brand-deep font-bold text-xs hover:bg-brand-goldShaded"
                >
                  {t("Explore Catalog", "مصنوعات دیکھیں")}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-brand-softDark border border-brand-dark/60"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-brand-dark flex-shrink-0 bg-brand-dark">
                        <Image
                          src={
                            Array.isArray(item.product.images_json)
                              ? item.product.images_json[0]
                              : "/WebsiteData/logo.jpeg"
                          }
                          alt={item.product.name_en}
                          fill
                          className="object-cover"
                          onError={(e: any) => {
                            e.currentTarget.src = "/WebsiteData/logo.jpeg";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {t(item.product.name_en, item.product.name_ur || item.product.name_en)}
                        </h4>
                        <div className="text-[11px] text-gray-400">
                          {item.selectedWeight} | {formatPrice(item.selectedPrice)}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)
                            }
                            className="p-1 rounded bg-brand-dark hover:bg-brand-gold hover:text-brand-deep transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)
                            }
                            className="p-1 rounded bg-brand-dark hover:bg-brand-gold hover:text-brand-deep transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-extrabold text-brand-gold">
                          {formatPrice(item.selectedPrice * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-gray-400 hover:text-rose-400 mt-2 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-brand-dark/60 bg-brand-softDark space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-gray-300">{t("Subtotal", "سب ٹوٹل")}</span>
                    <span className="text-brand-gold text-base font-extrabold">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {t(
                      "Shipping fee calculated at checkout (FREE over Rs. 2,000).",
                      "ڈیلیوری فیس چیک آؤٹ پر حساب کی جائے گی۔"
                    )}
                  </p>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-brand-gold text-brand-deep font-extrabold text-xs hover:bg-brand-goldShaded flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    {t("Proceed to Checkout", "چیک آؤٹ کے لیے آگے بڑھیں")}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
