"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Star, CheckCircle, Package, Leaf, ChevronRight, MessageCircle, Plus, Minus } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/CartContext";
import { useApp } from "@/lib/AppContext";

export default function ProductPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();
  const { t, theme, siteSettings } = useApp();
  const isDark = theme === "dark";

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "usage" | "ingredients">("overview");
  const [selectedWeight, setSelectedWeight] = useState<{ label: string; price: number } | null>(null);
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);

  if (!product) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${isDark ? "bg-brand-deepest text-white" : "bg-gray-50 text-brand-deep"}`}>
        <h1 className="text-3xl font-black">Product Not Found</h1>
        <Link href="/" className="btn-primary">← Back to Home</Link>
      </div>
    );
  }

  const images = Array.isArray(product.images_json)
    ? product.images_json
    : JSON.parse(product.images_json || "[]");
  const hasImage = images[0] && !images[0].includes("placeholder");
  const displayImage = hasImage ? images[0] : "/WebsiteData/logo.jpeg";

  const weightOptions = Array.isArray(product.weight_options_json)
    ? product.weight_options_json
    : JSON.parse(product.weight_options_json || "[]");

  const activeOption = selectedWeight || (weightOptions[0] as { label: string; price: number } | undefined);
  const category = MOCK_CATEGORIES.find((c) => c.id === product.category_id);

  const handleAddToCart = () => {
    if (!activeOption) return;
    for (let i = 0; i < qty; i++) {
      addToCart(product, activeOption.label, activeOption.price);
    }
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  const bg = isDark ? "bg-brand-deepest" : "bg-gray-50";
  const cardBg = isDark ? "bg-brand-softDark/80 border-brand-dark/60 backdrop-blur-md" : "bg-white/90 border-gray-200 backdrop-blur-md";
  const textPrimary = isDark ? "text-white" : "text-brand-deep";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";

  const TABS = [
    { id: "overview", label: t("Overview", "جائزہ") },
    { id: "benefits", label: t("Benefits", "فوائد") },
    { id: "usage", label: t("How to Use", "استعمال") },
    { id: "ingredients", label: t("Ingredients", "اجزاء") },
  ] as const;

  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      {Boolean(siteSettings?.featuredBgUrl && siteSettings.featuredBgUrl.trim() !== "") && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src={siteSettings.featuredBgUrl!}
            alt="Product Background"
            fill
            className="object-cover opacity-60 dark:opacity-50"
            priority
            onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 dark:bg-brand-deepest/50 bg-white/60 backdrop-blur-sm pointer-events-none" />
        </div>
      )}

      <div className="relative z-10 container-max py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className={`${isDark ? "text-gray-400" : "text-gray-500"} hover:text-brand-gold transition-colors`}>
            {t("Home", "ہوم")}
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-500" />
          {category && (
            <>
              <Link href={`/category/${category.slug}`} className={`${isDark ? "text-gray-400" : "text-gray-500"} hover:text-brand-gold transition-colors`}>
                {t(category.name_en, category.name_ur || category.name_en)}
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </>
          )}
          <span className="text-brand-gold font-semibold truncate max-w-[200px]">{product.name_en}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-10"
        >
          {/* Product Image */}
          <div className="space-y-4">
            <div className={`relative h-72 sm:h-96 md:h-[480px] rounded-2xl overflow-hidden border ${cardBg}`}>
              <Image
                src={displayImage}
                alt={product.name_en}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/WebsiteData/logo.jpeg";
                }}
              />
              {product.is_featured && (
                <div className="absolute top-4 left-4 bg-brand-gold text-brand-deep px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1">
                  <Star className="w-3 h-3 fill-brand-deep" /> {t("Bestseller", "بہترین فروخت")}
                </div>
              )}
              {!hasImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="w-16 h-16 text-brand-light/30 mx-auto mb-2" />
                    <p className={`text-sm ${textSecondary}`}>{t("Image coming soon", "تصویر جلد آئے گی")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand & Category Badge */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-brand-light uppercase tracking-widest">{product.brand}</span>
              {category && (
                <Link href={`/category/${category.slug}`} className="text-xs px-3 py-1 rounded-full bg-brand-dark/50 text-brand-gold border border-brand-gold/20 hover:border-brand-gold transition-all">
                  {t(category.name_en, category.name_ur || category.name_en)}
                </Link>
              )}
            </div>

            {/* Product Name */}
            <div>
              <h1 className={`text-3xl md:text-4xl font-black ${textPrimary} leading-tight`}>
                {t(product.name_en, product.name_ur || product.name_en)}
              </h1>
              {product.name_ur && (
                <p className="text-brand-gold/80 text-lg font-bold mt-1">{product.name_ur}</p>
              )}
            </div>

            {/* SKU & Stock */}
            <div className="flex items-center gap-4 text-sm">
              <span className={textSecondary}>SKU: {product.sku}</span>
              <span className={`flex items-center gap-1.5 font-semibold ${product.stock_quantity > 0 ? "text-brand-light" : "text-red-400"}`}>
                <CheckCircle className="w-4 h-4" />
                {product.stock_quantity > 0
                  ? t(`${product.stock_quantity} in stock`, `${product.stock_quantity} دستیاب`)
                  : t("Out of Stock", "ختم")}
              </span>
            </div>

            {/* Price */}
            <div className={`p-5 rounded-2xl border ${cardBg}`}>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-brand-gold">
                  {formatPrice(activeOption?.price || product.price)}
                </span>
                {activeOption && (
                  <span className={`text-sm ${textSecondary}`}>/ {activeOption.label}</span>
                )}
              </div>
            </div>

            {/* Weight/Size Selector */}
            {weightOptions.length > 0 && (
              <div>
                <p className={`text-sm font-bold mb-3 ${textPrimary}`}>{t("Select Size / Weight:", "سائز منتخب کریں:")}</p>
                <div className="flex flex-wrap gap-3">
                  {weightOptions.map((opt: { label: string; price: number }) => (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedWeight(opt)}
                      className={`px-5 py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                        (activeOption?.label === opt.label)
                          ? "border-brand-gold bg-brand-gold text-brand-deep"
                          : isDark
                            ? "border-brand-dark text-gray-300 hover:border-brand-gold hover:text-brand-gold"
                            : "border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold"
                      }`}
                    >
                      <span className="block">{opt.label}</span>
                      <span className={`block text-xs mt-0.5 font-normal ${activeOption?.label === opt.label ? "text-brand-deep/70" : textSecondary}`}>
                        {formatPrice(opt.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center border-2 rounded-xl overflow-hidden ${isDark ? "border-brand-dark" : "border-gray-200"}`}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className={`px-4 py-3 transition-colors ${isDark ? "hover:bg-brand-dark text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className={`px-5 py-3 text-lg font-black ${textPrimary} min-w-[3rem] text-center`}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className={`px-4 py-3 transition-colors ${isDark ? "hover:bg-brand-dark text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-base font-black transition-all shadow-lg ${
                  addedMsg
                    ? "bg-brand-light text-white"
                    : "bg-brand-gold text-brand-deep hover:bg-brand-goldShaded"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingBag className="w-5 h-5" />
                {addedMsg ? t("✓ Added to Cart!", "✓ ٹوکری میں شامل!") : t("Add to Cart", "ٹوکری میں شامل کریں")}
              </button>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${(siteSettings?.phone1 || "+923214544949").replace(/[^0-9]/g, "")}?text=Assalamu%20Alaikum%20Hakeem%20Sahib%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name_en)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-brand-light text-brand-light font-bold hover:bg-brand-light hover:text-brand-deep transition-all text-base"
            >
              <MessageCircle className="w-5 h-5" />
              {t("Enquire on WhatsApp", "واٹس ایپ پر پوچھیں")}
            </a>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {[
                t("100% Natural", "100% قدرتی"),
                t("No Side Effects", "کوئی نقصان نہیں"),
                t("Expert Formulated", "ماہر کی تیاری"),
              ].map((badge) => (
                <span key={badge} className={`text-xs px-3 py-1.5 rounded-full font-semibold ${isDark ? "bg-brand-dark/60 text-brand-light border border-brand-dark" : "bg-brand-light/10 text-brand-dark border border-brand-light/30"}`}>
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info Tabs */}
        <div className={`mt-12 rounded-2xl border overflow-hidden ${cardBg}`}>
          {/* Tab Headers – horizontally scrollable on mobile */}
          <div className={`flex border-b overflow-x-auto scrollbar-hide ${isDark ? "border-brand-dark/50 bg-brand-deepest" : "border-gray-200 bg-gray-50"}`}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-none min-w-[25%] py-4 px-3 text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-brand-gold border-b-2 border-brand-gold"
                    : isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-500 hover:text-brand-deep"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-8">
            {activeTab === "overview" && (
              <p className={`text-base leading-relaxed ${textSecondary}`}>{product.description}</p>
            )}
            {activeTab === "benefits" && (
              <div className="space-y-3">
                {(product.benefits || t("No benefit info listed.", "فوائد درج نہیں۔"))
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-light flex-shrink-0 mt-0.5" />
                      <span className={`text-base ${textSecondary}`}>{line.replace(/^[•\-\*]\s*/, "")}</span>
                    </div>
                  ))}
              </div>
            )}
            {activeTab === "usage" && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-brand-gold" />
                </div>
                <p className={`text-base leading-relaxed ${textSecondary}`}>
                  {product.how_to_use || t("Usage instructions will be provided with the product.", "استعمال کی ہدایات مصنوع کے ساتھ دی جائیں گی۔")}
                </p>
              </div>
            )}
            {activeTab === "ingredients" && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-dark flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-brand-light" />
                </div>
                <p className={`text-base leading-relaxed ${textSecondary}`}>
                  {product.ingredients || t("Pure natural ingredients. Details available on packaging.", "خالص قدرتی اجزاء۔ تفصیل پیکیجنگ پر دستیاب ہے۔")}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back to category */}
        <div className="mt-8">
          <Link
            href={category ? `/category/${category.slug}` : "/"}
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${isDark ? "text-gray-400 hover:text-brand-gold" : "text-gray-500 hover:text-brand-dark"}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {t("Back to", "واپس")} {category ? t(category.name_en, category.name_ur || category.name_en) : "Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
