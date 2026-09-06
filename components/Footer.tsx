"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";
import { useApp } from "@/lib/AppContext";

export default function Footer() {
  const { t, siteSettings } = useApp();

  const cleanPhone1 = (siteSettings?.phone1 || "+923214544949").replace(/[^0-9]/g, "");

  return (
    <footer className="relative z-20 bg-brand-deepest text-white border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold shadow-lg bg-brand-dark">
                <Image
                  src={siteSettings?.logoUrl || "/WebsiteData/logo.jpeg"}
                  alt={siteSettings?.siteName || "Hi Herbs"}
                  fill
                  className="object-cover"
                  onError={(e: any) => { e.currentTarget.src = "/WebsiteData/logo.jpeg"; }}
                />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  {siteSettings?.siteName || "Hi Herbs"} <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold" />
                </h3>
                <p className="text-xs text-brand-gold font-bold">
                  {siteSettings?.siteSubtitle || "By Bismillah Pansar Store"}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              {t(
                "Carrying forward the rich Unani & Tibb legacy of Hakeem Muhammad Ikram. Providing 100% pure cold-pressed oils, authentic raw botanicals, organic preserves (Murabbajat), and natural healthcare across Pakistan.",
                "حکیم محمد اکرام کی زیر سرپرستی روایتی یونانی حکمت۔ 100٪ خالص تیل، جڑی بوٹیاں اور مربہ جات کی فراہمی۔"
              )}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-dark/80 text-brand-gold text-xs font-bold border border-brand-gold/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                Reg No: {siteSettings?.registrationNo || "QH-48599-A"}
              </span>
            </div>
          </div>

          {/* Store Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-dark/50 pb-2">
              {t("Physical Store Location", "اسٹور کا پتہ")}
            </h4>
            
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>
                  {siteSettings?.address || "Shellar Chowk, College Road, Shalimar, Lahore, Punjab, Pakistan"}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Operating Hours: 9:00 AM – 12:00 AM (Mon - Sun)</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <div className="space-y-0.5">
                  <div>Hakeem Ikram: <strong className="text-brand-gold">{siteSettings?.phone1 || "+92 321 4544949"}</strong></div>
                  {siteSettings?.phone2 && <div>Awais Ikram: <strong className="text-brand-gold">{siteSettings.phone2}</strong></div>}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-dark/50 pb-2">
              {t("Popular Categories", "مقبول کیٹیگریز")}
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link href="/category/oils" className="hover:text-brand-gold transition-colors">
                  • Pure Cold-Pressed Oils (روغن)
                </Link>
              </li>
              <li>
                <Link href="/category/hair-care" className="hover:text-brand-gold transition-colors">
                  • Flora Roots Hair Care & Shampoo
                </Link>
              </li>
              <li>
                <Link href="/category/murabba" className="hover:text-brand-gold transition-colors">
                  • Fruit Preserves & Murabbajat (مربہ)
                </Link>
              </li>
              <li>
                <Link href="/category/dry-fruits" className="hover:text-brand-gold transition-colors">
                  • Premium Dry Fruits & Desi Nuts
                </Link>
              </li>
              <li>
                <Link href="/category/mens-health" className="hover:text-brand-gold transition-colors">
                  • Unani Vitality & Men's Health
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-dark/50 pb-2">
              {t("Hakeem Consultation", "طبی مشورہ")}
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {t(
                "Directly consult with Hakeem Muhammad Ikram via WhatsApp for customized health advice.",
                "براہِ راست واٹس ایپ کے ذریعے حکیم محمد اکرام صاحب سے طبی مشورہ حاصل کریں۔"
              )}
            </p>

            <a
              href={`https://wa.me/${cleanPhone1}?text=Assalam-o-Alaikum%20${encodeURIComponent(siteSettings?.siteName || "Hi Herbs")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-all shadow-lg shadow-emerald-900/30"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp: {siteSettings?.phone1 || "+92 321 4544949"}
            </a>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-brand-dark/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} {siteSettings?.siteName || "Hi Herbs"} ({siteSettings?.siteSubtitle || "by Bismillah Pansar Store"}). All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/contact" className="hover:text-white transition-colors">Clinic Contact</Link>
            <Link href="/portfolio" className="hover:text-white transition-colors">Our Heritage</Link>
            <Link href="/admin" className="hover:text-brand-gold transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
