"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Star, Filter, Grid, List } from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/CartContext";
import { useApp } from "@/lib/AppContext";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();
  const { t, theme, siteSettings } = useApp();
  const isDark = theme === "dark";

  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);
  const products = MOCK_PRODUCTS.filter((p) => {
    const cat = MOCK_CATEGORIES.find((c) => c.id === p.category_id);
    return cat?.slug === slug;
  });

  if (!category) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${isDark ? "bg-brand-deepest text-white" : "bg-gray-50 text-brand-deep"}`}>
        <h1 className="text-3xl font-black">Category Not Found</h1>
        <Link href="/" className="btn-primary">← Back to Home</Link>
      </div>
    );
  }

  const bg = isDark ? "bg-brand-deepest" : "bg-gray-50";
  const cardBg = isDark ? "bg-brand-softDark/80 border-brand-dark/60 backdrop-blur-md" : "bg-white/90 border-gray-200 backdrop-blur-md";
  const textPrimary = isDark ? "text-white" : "text-brand-deep";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-500";
  const breadcrumbLink = isDark ? "text-gray-400 hover:text-brand-gold" : "text-gray-500 hover:text-brand-dark";

  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      {Boolean(siteSettings?.categoriesBgUrl && siteSettings.categoriesBgUrl.trim() !== "") && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src={siteSettings.categoriesBgUrl!}
            alt="Category Background"
            fill
            className="object-cover opacity-60 dark:opacity-50"
            priority
            onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 dark:bg-brand-deepest/50 bg-white/60 backdrop-blur-sm pointer-events-none" />
        </div>
      )}

      <div className="relative z-10 min-h-screen">
        {/* Hero Banner */}
        <div className={`relative py-10 sm:py-16 overflow-hidden ${isDark ? "bg-brand-softDark/60" : "bg-brand-deep/10"}`}>
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-brand-light to-brand-gold" />
        <div className="container-max relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className={`${breadcrumbLink} transition-colors`}>
              {t("Home", "ہوم")}
            </Link>
            <span className={textSecondary}>/</span>
            <span className="text-brand-gold font-semibold">
              {t(category.name_en, category.name_ur || category.name_en)}
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-brand-dark/50 hover:bg-brand-dark text-gray-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white">
                {t(category.name_en, category.name_ur || category.name_en)}
              </h1>
              {category.name_ur && (
                <p className="text-brand-gold font-bold text-lg mt-1">{category.name_ur}</p>
              )}
              <p className={`text-gray-300 mt-2 text-base`}>
                {products.length} {t("products available", "مصنوعات دستیاب")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-max py-12">
        {products.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <div className="text-6xl">🌿</div>
            <h2 className={`text-2xl font-bold ${textPrimary}`}>
              {t("No products in this category yet", "اس زمرے میں ابھی کوئی مصنوعات نہیں")}
            </h2>
            <p className={textSecondary}>
              {t("Check back soon or browse other categories.", "دوبارہ چیک کریں یا دیگر اقسام دیکھیں۔")}
            </p>
            <Link href="/" className="inline-flex btn-primary mt-4">
              {t("Browse All Categories", "تمام اقسام دیکھیں")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, idx) => {
              const images = Array.isArray(product.images_json)
                ? product.images_json
                : JSON.parse(product.images_json || "[]");
              const hasImage = images[0] && !images[0].includes("placeholder");
              const displayImage = hasImage ? images[0] : "/WebsiteData/logo.jpeg";
              const weightOptions = Array.isArray(product.weight_options_json)
                ? product.weight_options_json
                : JSON.parse(product.weight_options_json || "[]");
              const firstOption = weightOptions[0];

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
                  className={`group flex flex-col rounded-2xl border overflow-hidden ${cardBg} hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Product Image */}
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className={`relative h-52 overflow-hidden ${isDark ? "bg-brand-deepest" : "bg-gray-100"}`}>
                      <Image
                        src={displayImage}
                        alt={product.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/WebsiteData/logo.jpeg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {product.is_featured && (
                        <span className="absolute top-3 left-3 bg-brand-gold text-brand-deep text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-brand-deep" /> {t("Featured", "نمایاں")}
                        </span>
                      )}
                      <span className={`absolute bottom-3 right-3 text-xs font-bold px-2 py-1 rounded-lg ${product.stock_quantity > 0 ? "bg-brand-dark text-brand-light" : "bg-red-900/80 text-red-300"}`}>
                        {product.stock_quantity > 0 ? t("In Stock", "موجود") : t("Out of Stock", "ختم")}
                      </span>
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-2">
                      <span className={`text-xs font-semibold uppercase tracking-wide text-brand-light`}>
                        {product.brand}
                      </span>
                    </div>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className={`text-base font-bold ${textPrimary} group-hover:text-brand-gold transition-colors mb-2 leading-tight`}>
                        {t(product.name_en, product.name_ur || product.name_en)}
                      </h3>
                    </Link>
                    <p className={`text-xs ${textSecondary} line-clamp-2 flex-1 mb-4`}>
                      {product.description}
                    </p>

                    {/* Price and Weight */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xl font-black text-brand-gold">
                          {formatPrice(product.price)}
                        </span>
                        {firstOption && (
                          <span className={`text-xs ml-1.5 ${textSecondary}`}>/ {firstOption.label}</span>
                        )}
                      </div>
                      {weightOptions.length > 1 && (
                        <span className={`text-xs px-2 py-1 rounded-lg ${isDark ? "bg-brand-deep text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                          +{weightOptions.length - 1} {t("sizes", "سائز")}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold border border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-brand-deep transition-all"
                      >
                        {t("Details", "تفصیل")}
                      </Link>
                      <button
                        onClick={() => {
                          if (firstOption) {
                            addToCart(product, firstOption.label, firstOption.price);
                          }
                        }}
                        disabled={product.stock_quantity === 0}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold bg-brand-gold text-brand-deep hover:bg-brand-goldShaded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {t("Add", "شامل")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Other Categories */}
      <div className={`py-12 border-t ${isDark ? "border-brand-dark/50 bg-brand-softDark" : "border-gray-200 bg-white"}`}>
        <div className="container-max">
          <h2 className={`text-2xl font-black mb-6 ${textPrimary}`}>
            {t("Other Categories", "دیگر اقسام")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {MOCK_CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all hover:border-brand-gold hover:text-brand-gold ${isDark ? "border-brand-dark text-gray-300 bg-brand-deep" : "border-gray-200 text-gray-600 bg-gray-50"}`}
              >
                {t(cat.name_en, cat.name_ur || cat.name_en)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
