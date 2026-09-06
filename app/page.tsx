"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Leaf, ShieldCheck, Award, Star, Truck, Phone, MessageCircle, ChevronRight, Sparkles } from "lucide-react";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mockData";
import { useApp } from "@/lib/AppContext";
import { formatPrice } from "@/lib/utils";

// Category icons mapping
const CATEGORY_ICONS: Record<string, string> = {
  oils: "🌿",
  "hair-care": "💆",
  "skin-care": "✨",
  "mens-health": "💪",
  "diabetes-support": "🩺",
  "kids-nutrition": "🌱",
  "digestive-relief": "🍃",
  "weight-gain": "⚖️",
  "pain-relief": "🌡️",
  "weight-loss": "🏃",
  "womens-health": "🌸",
  "unani-majoons": "🏺",
  "sharbat-arq": "🧃",
  murabba: "🫙",
  spices: "🌶️",
  "dry-fruits": "🌰",
  "raw-herbs": "🌾",
};

const buildStats = () => [
  { numericValue: 25, suffix: "+", label: "Years of Experience", label_ur: "سال تجربہ" },
  { numericValue: 500, suffix: "+", label: "Herbal Formulations", label_ur: "جڑی بوٹی فارمولے" },
  { numericValue: 10, suffix: "K+", label: "Satisfied Customers", label_ur: "مطمئن گاہک" },
  { numericValue: MOCK_CATEGORIES.length, suffix: "+", label: "Product Categories", label_ur: "مصنوعات کی اقسام" },
];

const getFeatures = (regNo: string) => [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "100% Pure & Natural",
    title_ur: "100% خالص اور قدرتی",
    desc: "No additives, preservatives, or artificial ingredients. Every product directly sourced.",
    desc_ur: "کوئی مصنوعی اجزاء نہیں۔ ہر مصنوع براہ راست قدرتی ذرائع سے۔",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Registered Hakeem",
    title_ur: "رجسٹرڈ حکیم",
    desc: `Reg. No. ${regNo} · Hakeem Muhammad Ikram — 25+ years in Tibb & Unani practice.`,
    desc_ur: `Reg. No. ${regNo} · حکیم محمد اکرم — 25+ سال تجربہ`,
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Lahore Delivery",
    title_ur: "لاہور میں مفت ڈیلیوری",
    desc: "Express delivery across Lahore on orders above Rs. 2,000. Pakistan-wide shipping available.",
    desc_ur: "Rs. 2,000 سے زیادہ آرڈر پر مفت ڈیلیوری۔ پاکستان بھر میں بھیجا جاتا ہے۔",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Authentic Formulations",
    title_ur: "اصل یونانی فارمولے",
    desc: "Ancient Unani recipes combined with modern quality control for maximum efficacy.",
    desc_ur: "قدیم یونانی نسخے اور جدید معیار کا امتزاج۔",
  },
];

const FEATURED_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.is_featured).slice(0, 6);

// Smooth Count-Up component (0 to target number)
function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Smooth cubic ease out
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const { t, siteSettings } = useApp();

  // Horizontal Category Slider state & drag logic
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Slow, smooth continuous horizontal auto-scroll
  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (sliderRef.current && !isHovered && !isMouseDown) {
        sliderRef.current.scrollLeft += 0.6; // Slow, smooth speed
        if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 2) {
          sliderRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isMouseDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const STATS = buildStats();

  return (
    <div className="min-h-screen bg-brand-deepest">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image Layer (Home Hero Only - High Visibility) */}
        {Boolean(siteSettings.heroBgUrl && siteSettings.heroBgUrl.trim() !== "") && (
          <div className="absolute inset-0 z-0">
            <Image
              src={siteSettings.heroBgUrl!}
              alt="Hero Section Background"
              fill
              className="object-cover opacity-85 dark:opacity-80"
              priority
              onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className="absolute inset-0 dark:bg-brand-deepest/35 bg-white/45 backdrop-blur-[2px] pointer-events-none" />
          </div>
        )}

        <div className="relative z-10 container-max w-full py-16 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Hero Text with Framer Motion Fade-In */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-dark/70 border border-brand-gold/40 text-brand-gold text-sm font-bold backdrop-blur-md shadow-lg">
                <Sparkles className="w-4 h-4" />
                {t(`${siteSettings.siteName} — ${siteSettings.siteSubtitle}`, `بِسمِ اللہ پنساری اسٹور — 2000 سے`)}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">{t("Nature's", "قدرت کا")}</span>
                <br />
                <span className="shimmer-text">{t("Healing", "علاج")}</span>
                <br />
                <span className="text-white">{t("Power", "طاقت")}</span>
              </h1>

              <p className="text-base text-gray-300 leading-relaxed max-w-xl">
                {t(
                  "Pure Unani & Herbal remedies by Hakeem Muhammad Ikram. Cold-pressed oils, authentic majoons, curative herbs — trusted by thousands for over 25 years.",
                  "حکیم محمد اکرم کے خالص یونانی و جڑی بوٹی علاج۔ کولڈ پریسڈ تیل، اصل معجونات، شفاء بخش جڑی بوٹیاں — 25 سال سے ہزاروں کا اعتماد۔"
                )}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/category/oils"
                  className="group inline-flex items-center gap-2 bg-brand-gold text-brand-deep font-bold px-6 py-3 rounded-xl text-sm hover:bg-brand-goldShaded transition-all shadow-goldGlow hover:shadow-2xl hover:-translate-y-0.5"
                >
                  {t("Shop Now", "ابھی خریدیں")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={`https://wa.me/${siteSettings.phone1.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-brand-light text-brand-light font-semibold px-6 py-3 rounded-xl text-sm hover:bg-brand-light hover:text-brand-deep transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("WhatsApp Us", "واٹس ایپ کریں")}
                </a>
              </div>
            </motion.div>

            {/* Hero Image / Dynamic Logo with Scale Fade-In */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center z-10"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-light/20 to-brand-gold/10 blur-2xl animate-pulse-slow" />
                <div className="absolute inset-6 rounded-full bg-brand-softDark border-2 border-brand-gold/30 flex items-center justify-center overflow-hidden shadow-2xl">
                  <Image
                    src={siteSettings.logoUrl}
                    alt={siteSettings.siteName}
                    fill
                    className="object-cover opacity-95"
                    onError={(e: any) => { e.currentTarget.src = "/WebsiteData/logo.jpeg"; }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-gold/30 animate-spin-slow" />
                <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-deep px-3 py-2 rounded-xl text-xs font-black shadow-lg animate-float">
                  ✓ {t("Reg. Hakeem", "رجسٹرڈ حکیم")}
                </div>
                <div className="absolute -bottom-4 -left-4 bg-brand-dark text-brand-gold px-3 py-2 rounded-xl text-xs font-bold border border-brand-gold/30 shadow-lg animate-float" style={{ animationDelay: "0.5s" }}>
                  🌿 {t("100% Natural", "100% قدرتی")}
                </div>
                <div className="absolute top-1/2 -right-8 bg-brand-softDark text-brand-light px-3 py-2 rounded-xl text-xs font-bold border border-brand-light/30 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  📍 {t("Lahore, PK", "لاہور")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ===== STATS BAR — Premium bottom-gradient fade (transparent → deep dark) ===== */}
        <div className="relative z-20 w-full" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(5,15,10,0.72) 30%, rgba(5,15,10,0.96) 100%)" }}>
          {/* Gold gradient top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/70 to-transparent" />

          <div className="container-max py-4 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center py-1"
                >
                  <span className="text-lg sm:text-xl lg:text-2xl font-black text-brand-gold drop-shadow-md mb-1">
                    <AnimatedCounter end={s.numericValue} suffix={s.suffix} />
                  </span>
                  <div className="text-[10px] sm:text-xs font-bold text-white/90 leading-snug max-w-[140px]">
                    {t(s.label, s.label_ur)}
                  </div>
                  <div className="text-[9px] text-brand-light/60 font-medium mt-0.5 hidden sm:block">
                    ✓ Verified Tibb
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES HORIZONTAL SLIDER SECTION ===== */}
      <section className="relative section-y overflow-hidden bg-brand-deepest">
        <div className="relative z-10 container-max">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-bold mb-4">
              <Leaf className="w-4 h-4" />
              {t("Our Herbal Categories", "ہماری جڑی بوٹی اقسام")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t("Explore All", "تمام مصنوعات")}
              <span className="text-green-gradient"> {t("Pansar Verticals", "پنساری اقسام")}</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t(
                "17 specialized categories of pure herbal & Unani formulations. (Hover to pause, drag left or right with mouse)",
                "17 خصوصی اقسام — ماؤس سے ڈریگ کریں یا روکنے کے لیے اوپر رکھیں"
              )}
            </p>
          </motion.div>
        </div>

        {/* Horizontal Slider (Pause on Hover + Mouse Drag + Slow Speed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={sliderRef}
          className="relative w-full overflow-x-auto scrollbar-hide py-4 cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex gap-4 w-max px-6">
            {[...MOCK_CATEGORIES, ...MOCK_CATEGORIES].map((cat, idx) => (
              <Link
                key={`${cat.id}-${idx}`}
                href={`/category/${cat.slug}`}
                draggable={false}
                className="group relative flex flex-col items-center justify-center min-w-[165px] sm:min-w-[200px] p-5 rounded-2xl bg-brand-softDark/90 border border-brand-dark/70 hover:border-brand-gold/60 hover:bg-brand-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-center flex-shrink-0"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                  {CATEGORY_ICONS[cat.slug] || "🌿"}
                </div>
                <span className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors leading-tight pointer-events-none">
                  {t(cat.name_en, cat.name_ur || cat.name_en)}
                </span>
                <ChevronRight className="w-4 h-4 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity mt-2 pointer-events-none" />
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== FEATURED PRODUCTS TEASER ===== */}
      <section className="relative section-y overflow-hidden bg-brand-deepest">
        <div className="relative z-10 container-max">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-sm font-bold mb-4">
              <Star className="w-4 h-4 fill-brand-gold" />
              {t("Bestsellers", "سب سے زیادہ فروخت")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t("Top", "بہترین")}
              <span className="shimmer-text"> {t("Herbal Picks", "جڑی بوٹی انتخاب")}</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              {t(
                "Our most loved formulations — tried, tested, and trusted by thousands of families.",
                "ہماری سب سے مقبول مصنوعات — ہزاروں خاندانوں کا اعتماد۔"
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((product, idx) => {
              const images = Array.isArray(product.images_json)
                ? product.images_json
                : JSON.parse(product.images_json || "[]");
              const hasImage = images[0] && !images[0].includes("placeholder");
              const displayImage = hasImage ? images[0] : "/WebsiteData/logo.jpeg";

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="group flex flex-col bg-brand-softDark/80 border border-brand-dark/60 rounded-2xl overflow-hidden hover:border-brand-gold/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 backdrop-blur-md h-full"
                  >
                    <div className="relative h-60 w-full overflow-hidden bg-brand-dark flex items-center justify-center p-4">
                      <Image
                        src={displayImage}
                        alt={product.name_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e: any) => { e.currentTarget.src = "/WebsiteData/logo.jpeg"; }}
                      />
                      <div className="absolute top-3 right-3 bg-brand-gold text-brand-deep text-xs font-black px-2.5 py-1 rounded-lg">
                        {product.category_name}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-brand-gold transition-colors">
                          {t(product.name_en, product.name_ur || product.name_en)}
                        </h3>
                        <p className="text-xs text-gray-300 line-clamp-2 mt-1">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-brand-dark/50">
                        <span className="text-lg font-black text-brand-gold">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs font-bold text-brand-light flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {t("View Details", "تفصیلات دیکھیں")} →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURES / TRUST BADGES ===== */}
      <section className="relative section-y overflow-hidden border-t border-brand-dark/50 bg-brand-deepest">
        <div className="relative z-10 container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFeatures(siteSettings?.registrationNo || "QH-48599-A").map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="p-6 rounded-2xl bg-brand-softDark/70 border border-brand-dark/60 hover:border-brand-gold/30 transition-all space-y-3 backdrop-blur-md"
              >
                <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold w-fit">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {t(f.title, f.title_ur)}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t(f.desc, f.desc_ur)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

