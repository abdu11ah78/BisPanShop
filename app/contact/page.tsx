"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Stethoscope,
  MapPin,
  Clock,
  Phone,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  User,
  Calendar,
} from "lucide-react";
import { useApp } from "@/lib/AppContext";

type VisitType = "OnlineWhatsApp" | "InClinic";

interface FormData {
  patient_name: string;
  phone: string;
  health_issue: string;
  preferred_date: string;
  visit_type: VisitType;
}

export default function ContactPage() {
  const { t, siteSettings } = useApp();

  const [formData, setFormData] = useState<FormData>({
    patient_name: "",
    phone: "",
    health_issue: "Hair Loss & Scalp Care",
    preferred_date: "",
    visit_type: "OnlineWhatsApp",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patient_name || !formData.phone) return;
    setLoading(true);
    try {
      await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const bgSrc = siteSettings?.contactBgUrl || "/WebsiteData/IMG_6358.PNG";

  return (
    <div className="relative min-h-screen">
      {/* ── Background Image Layer ── */}
      {Boolean(siteSettings?.contactBgUrl && siteSettings.contactBgUrl.trim() !== "") && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src={siteSettings.contactBgUrl!}
            alt="Contact page background"
            fill
            className="object-cover opacity-60 dark:opacity-50"
            priority
            onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
          />
          {/* Dark mode: dark-green glass · Light mode: white glass */}
          <div className="absolute inset-0 dark:bg-brand-deepest/50 bg-white/60 backdrop-blur-sm pointer-events-none" />
        </div>
      )}

      {/* ── Page Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Header Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-softDark/80 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md">
            <Stethoscope className="w-4 h-4 text-brand-gold" />
            {t("Hakeem Consultation & Store Details", "حکیم صاحب سے مشورہ اور کلینک کی تفصیلات")}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t("Book Hakeem Consultation & Visit Us", "حکیم صاحب سے وقت لیں اور کلینک کا دورہ کریں")}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
            {t(
              "Schedule a physical diagnosis at our Lahore clinic or request an immediate WhatsApp online consultation with Hakeem Muhammad Ikram.",
              "لاہور کلینک پر بالمشافہ معائنے کے لیے وقت طے کریں یا آن لائن واٹس ایپ کے ذریعے براہِ راست مشورہ کریں۔"
            )}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Consultation Form ── */}
          <div className="bg-brand-softDark/70 border border-brand-dark/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md">
            <div className="border-b border-brand-dark/60 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-brand-gold" />
                {t("Patient Appointment Form", "مریض کی رجسٹریشن فارم")}
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {t(
                  "Fill details below to lock your appointment slot with Hakeem Ikram.",
                  "حکیم اکرام صاحب سے وقت طے کرنے کے لیے نیچے دی گئی معلومات فراہم کریں۔"
                )}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-brand-deepest/90 rounded-2xl text-center space-y-4 border border-brand-gold/40">
                <CheckCircle2 className="w-12 h-12 text-brand-gold mx-auto" />
                <h3 className="text-lg font-bold text-white">
                  {t("Consultation Request Received!", "آپ کی درخواست موصول ہو گئی ہے!")}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t(
                    `Thank you, ${formData.patient_name}. Our team will contact you on ${formData.phone} for your appointment.`,
                    `شکریہ ${formData.patient_name}، ہماری ٹیم جلد آپ سے رابطہ کرے گی۔`
                  )}
                </p>
                <a
                  href={`https://wa.me/${(siteSettings?.phone1 || "+923214544949").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Assalam-o-Alaikum, I requested a consultation for ${formData.patient_name} regarding ${formData.health_issue}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition-colors shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t("Connect on WhatsApp Now", "ابھی واٹس ایپ پر بات کریں")}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {t("Patient Name *", "مریض کا نام *")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("Full Name", "پورا نام")}
                    value={formData.patient_name}
                    onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark/80 text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {t("Mobile / WhatsApp Phone Number *", "موبائل یا واٹس ایپ نمبر *")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0321XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark/80 text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    {t("Primary Health Concern", "بیماری یا درپیش مسئلہ")}
                  </label>
                  <select
                    value={formData.health_issue}
                    onChange={(e) => setFormData({ ...formData, health_issue: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark/80 text-white text-xs focus:border-brand-gold focus:outline-none"
                  >
                    <option value="Hair Loss & Scalp Care">Hair Loss &amp; Scalp Care (بالوں کے مسائل)</option>
                    <option value="Digestive & Stomach Issues">Digestive &amp; Stomach Relief (معدہ و ہضم)</option>
                    <option value="Men's Health & Stamina">{"Men's"} Vitality &amp; Stamina (مردانہ صحت)</option>
                    <option value="Diabetes Support">Diabetes Care (ذیابطیس کی دیکھ بھال)</option>
                    <option value="Joint & Muscular Pain">Joint &amp; Muscular Pain (جوڑوں کا درد)</option>
                    <option value="Skin & Complexion">Skin &amp; Complexion Care (جلد کے مسائل)</option>
                    <option value="Other Issue">Other Health Problem (دیگر مسئلے)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {t("Preferred Date", "پسندیدہ تاریخ")}
                    </label>
                    <input
                      type="date"
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark/80 text-white text-xs focus:border-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      {t("Visit Type", "طریقہ معائنہ")}
                    </label>
                    <select
                      value={formData.visit_type}
                      onChange={(e) =>
                        setFormData({ ...formData, visit_type: e.target.value as VisitType })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark/80 text-white text-xs focus:border-brand-gold focus:outline-none"
                    >
                      <option value="OnlineWhatsApp">Online WhatsApp (آن لائن واٹس ایپ)</option>
                      <option value="InClinic">Physical In-Clinic (کلینک تشریف لانا)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-brand-gold text-brand-deep font-extrabold text-xs hover:bg-brand-goldShaded transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/20"
                >
                  <Send className="w-4 h-4" />
                  {loading
                    ? t("Submitting Request...", "درخواست جمع ہو رہی ہے...")
                    : t("Book Consultation Slot", "اپائنٹمنٹ بک کریں")}
                </button>
              </form>
            )}
          </div>

          {/* ── Store Info ── */}
          <div className="space-y-6">
            <div className="bg-brand-softDark/70 border border-brand-dark/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-md">
              <div className="border-b border-brand-dark/60 pb-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                  {t("Physical Store & Clinic Details", "کلینک اور پنسار اسٹور کا پتہ")}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {t(`${siteSettings?.siteName || "Hi Herbs"} — ${siteSettings?.siteSubtitle || "Bismillah Pansar Store"}`, `${siteSettings?.siteName || "ہائی ہربر"} — ${siteSettings?.siteSubtitle || "بسم اللہ پنسار اسٹور"}`)}
                </p>
              </div>

              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-dark text-brand-gold flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold mb-0.5">Location Address</strong>
                    <span>{siteSettings?.address || "Shellar Chowk, College Road, Shalimar, Lahore, Punjab, Pakistan"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-dark text-brand-gold flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold mb-0.5">Clinic &amp; Store Hours</strong>
                    <span>9:00 AM – 12:00 AM (Monday to Sunday)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-dark text-brand-gold flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block font-bold">Direct Phone Contacts</strong>
                    <div>
                      Hakeem Muhammad Ikram:{" "}
                      <strong className="text-brand-gold">{siteSettings?.phone1 || "+92 321 4544949"}</strong>
                    </div>
                    {siteSettings?.phone2 && (
                      <div>
                        Awais Ikram:{" "}
                        <strong className="text-brand-gold">{siteSettings.phone2}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-deepest text-brand-gold text-xs font-bold border border-brand-gold/40">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  Unani Registration: Reg No. {siteSettings?.registrationNo || "QH-48599-A"}
                </span>
              </div>
            </div>

            {/* Quick WhatsApp Card */}
            <div className="bg-gradient-to-r from-emerald-950/80 to-brand-softDark border border-emerald-500/40 rounded-3xl p-6 shadow-xl flex items-center justify-between gap-4 backdrop-blur-md">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  {t("Instant WhatsApp Contact", "فوری واٹس ایپ رابطہ")}
                </h3>
                <p className="text-xs text-gray-300">
                  {t("Directly talk to Hakeem Ikram on WhatsApp", "حکیم صاحب سے ڈائریکٹ چیٹ کریں")}
                </p>
              </div>

              <a
                href={`https://wa.me/${(siteSettings?.phone1 || "+923214544949").replace(/[^0-9]/g, "")}?text=Assalam-o-Alaikum%20Hakeem%20Ikram`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-700 transition-all flex-shrink-0 shadow-lg"
              >
                {siteSettings?.phone1 || "+92 321 4544949"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
