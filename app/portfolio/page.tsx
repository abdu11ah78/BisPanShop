"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  History, 
  Stethoscope, 
  Leaf,
  HeartPulse
} from "lucide-react";
import { useApp } from "@/lib/AppContext";

const getTimelineSteps = (regNo: string, siteName: string, siteSubtitle: string) => [
  {
    year: "Legacy Roots",
    title_en: `${siteSubtitle} Foundation`,
    title_ur: `${siteSubtitle} کی بنیاد`,
    description_en: "Established in Shalimar, Lahore, as a trusted local pansar shop providing authentic raw herbs, cold-pressed mustard oil, and classical Unani preparations.",
    description_ur: "شالیمار، لاہور میں قائم ایک بااعتماد پنسار اسٹور جو خالص جڑی بوٹیاں اور سرسوں کا تیل فراہم کرتا ہے۔",
  },
  {
    year: "Clinical Practice",
    title_en: "Hakeem Muhammad Ikram Lineage",
    title_ur: "حکیم محمد اکرام کا ہربل تجربہ",
    description_en: "Expansion into personalized patient care and traditional Tibb diagnosis, formulating custom herbal hair oils (Onion Oil, Flora Roots) and gastric relief syrups.",
    description_ur: "روایتی طب اور مریضوں کے علاج کا طویل تجربہ، جس سے پیاز کا تیل اور معدہ کا علاج متعارف کروایا گیا۔",
  },
  {
    year: "Quality Standards",
    title_en: `Unani Unit Registration (Reg. ${regNo})`,
    title_ur: `یونانی یونٹ رجسٹریشن (${regNo})`,
    description_en: "Standardizing extraction techniques without synthetic additives, chemical preservatives, or paraben fillers.",
    description_ur: "بغیر کسی کیمیائی ملاوٹ اور ملاوٹ سے پاک خالص جڑی بوٹیوں کی تیاری۔",
  },
  {
    year: "Digital Era",
    title_en: `Launch of ${siteName} E-Commerce`,
    title_ur: `${siteName} آن لائن اسٹور کا آغاز`,
    description_en: "Bringing nationwide delivery across Pakistan and direct WhatsApp consultation payload automation for instant patient response.",
    description_ur: "پورے پاکستان میں ہربل پروڈکٹس کی ڈیلیوری اور واٹس ایپ پر حکیم صاحب کی فوری ڈائریکٹ سروس۔",
  },
];

const RAW_BOTANICALS = [
  {
    name_en: "Pure Kashmiri Zafran",
    name_ur: "زعفران خالص",
    desc_en: "Grade-1 All-Red Saffron threads sourced for vitality & organic preserves.",
    desc_ur: "خالص ترین کشمیری زعفران",
    tag: "100% Grade A+",
  },
  {
    name_en: "Organic Salab Misri",
    name_ur: "ثعلب مصری",
    desc_en: "Authentic wild-harvested root for Unani restorative formulations.",
    desc_ur: "خالص ثعلب مصری جڑی بوٹی",
    tag: "Wild Harvested",
  },
  {
    name_en: "Cold-Pressed Seeds",
    name_ur: "خالص روغنیات",
    desc_en: "Cold-extracted black seed (Kalonji), mustard, sesame, and almond oils.",
    desc_ur: "بغیر حرارت کے نچوڑا گیا تیل",
    tag: "Zero Additives",
  },
  {
    name_en: "Ashwagandha (Asgandh)",
    name_ur: "اسگندھ ناگوری",
    desc_en: "Potent Adaptogenic root for immune vitality and mental stress relief.",
    desc_ur: "قوت مدافعت کے لیے بہترین",
    tag: "Pure Roots",
  },
];

export default function PortfolioPage() {
  const { t, siteSettings } = useApp();

  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      {Boolean(siteSettings.heritageBgUrl && siteSettings.heritageBgUrl.trim() !== "") && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src={siteSettings.heritageBgUrl!}
            alt="Heritage Background"
            fill
            className="object-cover opacity-60 dark:opacity-50"
            onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 dark:bg-brand-deepest/55 bg-slate-50/65 backdrop-blur-sm pointer-events-none" />
        </div>
      )}

      <div className="relative z-10 container-max py-12 space-y-16">
        {/* Header Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-softDark/80 border border-brand-gold/40 text-brand-gold text-xs font-extrabold tracking-wide uppercase shadow-lg backdrop-blur-md">
            <History className="w-4 h-4 text-brand-gold" />
            {t("Heritage & Medicinal Wisdom", "ہماری روایتی تاریخ اور ہربل حکمت")}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t("The Story of", "کہانی")}{" "}
            <span className="text-brand-gold">{siteSettings?.siteSubtitle || "Bismillah Pansar Store"}</span> &amp; {siteSettings?.siteName || "Hi Herbs"}
          </h1>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
            {t(
              "Decades of Eastern medicinal wisdom passed down through Hakeem Muhammad Ikram, combining authentic wild-harvested botanicals with pure cold-press technology.",
              "حکیم محمد اکرام کی زیرِ سرپرستی دہائیوں پر محیط روایتی یونانی حکمت، جہاں 100٪ خالص جڑی بوٹیوں کو جدید ترین کولڈ پریس ٹیکنالوجی سے تیار کیا جاتا ہے۔"
            )}
          </p>
        </div>

        {/* Raw Botanical Showcase Grid */}
        <div className="bg-brand-softDark/70 border border-brand-dark/60 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-brand-dark/60 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-gold" /> {t("Purity & Quality Directives", "خالص مادہ کی ضمانت")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t("Raw Botanical Purity Standard", "100٪ خالص قدرتی اجزا اور بوٹیاں")}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-xl bg-brand-dark text-brand-gold text-xs font-bold border border-brand-gold/30 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Reg No: {siteSettings?.registrationNo || "QH-48599-A"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RAW_BOTANICALS.map((botanical, idx) => (
              <div
                key={idx}
                className="bg-brand-deepest/80 border border-brand-dark/80 rounded-2xl p-5 hover:border-brand-gold/60 transition-all duration-300 group space-y-3 shadow-lg backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-dark text-brand-gold border border-brand-gold/30">
                    {botanical.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-brand-gold transition-colors">
                    {t(botanical.name_en, botanical.name_ur)}
                  </h3>
                  <p className="text-xs text-emerald-400 font-bold mt-0.5">{botanical.name_ur}</p>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {t(botanical.desc_en, botanical.desc_ur)}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs font-medium text-gray-300 border-t border-brand-dark/40">
            <div className="flex items-center gap-2 bg-brand-deepest/50 p-3 rounded-xl border border-brand-dark/40">
              <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>{t("Pure cold-pressed extraction without heat damage", "کیمیائی پروسیس کے بغیر خالص نچوڑ")}</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-deepest/50 p-3 rounded-xl border border-brand-dark/40">
              <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>{t("Zero synthetic colors or artificial fragrance", "کسی بھی مصنوعی رنگ یا خوشبو سے پاک")}</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-deepest/50 p-3 rounded-xl border border-brand-dark/40">
              <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>{t("Formulated under expert Unani practitioners", "ماہر حکماء کی زیر نگرانی تیاری")}</span>
            </div>
          </div>
        </div>

        {/* Heritage Timeline Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t("Brand Timeline & Heritage", "ہماری تاریخ اور ارتقاء")}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              {t(
                "From a physical Pansar shop in Shalimar, Lahore to a modern digital herbal store.",
                "لاہور شالیمار میں پنسار کی دکان سے لے کر آن لائن اسٹور تک کا سفر۔"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getTimelineSteps(
              siteSettings?.registrationNo || "QH-48599-A",
              siteSettings?.siteName || "Hi Herbs",
              siteSettings?.siteSubtitle || "Bismillah Pansar Store"
            ).map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-brand-softDark/70 border border-brand-dark/60 rounded-2xl p-6 space-y-3 relative hover:border-brand-gold/50 transition-all shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-dark text-brand-gold border border-brand-gold/40">
                    {step.year}
                  </span>
                  <span className="text-xs font-mono text-gray-400">0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-white">
                  {t(step.title_en, step.title_ur)}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {t(step.description_en, step.description_ur)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hakeem Ikram Consultation Callout */}
        <div className="bg-brand-softDark/80 border border-brand-gold/40 rounded-3xl p-8 text-center space-y-5 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="w-14 h-14 rounded-full bg-brand-gold/10 border-2 border-brand-gold text-brand-gold flex items-center justify-center mx-auto shadow-lg">
              <HeartPulse className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t("Need Personalized Health Advice?", "کیا آپ کو طبی مشورے کی ضرورت ہے؟")}
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {t(
                "Consult Hakeem Muhammad Ikram at our Shalimar Lahore clinic or message on WhatsApp for customized herbal therapy.",
                "حکیم محمد اکرام صاحب سے شالیمار کلینک میں ملاقات کریں یا آن لائن واٹس ایپ کے ذریعے مشورہ حاصل کریں۔"
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${siteSettings.phone1.replace(/[^0-9]/g, "")}?text=Hello%20Hakeem%20Ikram`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-brand-deep font-extrabold text-xs hover:bg-brand-goldShaded transition-all shadow-lg shadow-brand-gold/20"
              >
                <Stethoscope className="w-4 h-4" />
                {t(`WhatsApp Consultation (${siteSettings.phone1})`, `واٹس ایپ مشورہ (${siteSettings.phone1})`)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
