import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock, ShieldCheck, Heart, Sparkles, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white border-t-4 border-brand-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold">
                <Image
                  src="/WebsiteData/logo.jpeg"
                  alt="Hi Herbs Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                  Hi Herbs <Sparkles className="w-4 h-4 text-brand-gold" />
                </h3>
                <p className="text-xs text-brand-gold font-medium">
                  By Bismillah Pansar Store
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-200 leading-relaxed">
              Carrying forward the rich Unani & Tibb legacy of Hakeem Muhammad Ikram. 
              Providing 100% pure cold-pressed oils, authentic raw botanicals, organic preserves (Murabbajat), 
              and natural healthcare across Pakistan.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-deep/80 text-brand-gold text-xs border border-brand-gold/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                Reg No: QH-48599-A
              </span>
            </div>
          </div>

          {/* Store Location & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold border-b border-white/10 pb-2">
              Physical Store Location
            </h4>
            
            <div className="space-y-2.5 text-xs text-gray-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>
                  Shellar Chowk, College Road, Shalimar, Lahore, Punjab, Pakistan
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Operating Hours: 9:00 AM – 12:00 AM (Mon - Sun)</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <div>
                  <div>Hakeem Ikram: +92 321 4544949</div>
                  <div>Awais Ikram: +92 313 4053679</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold border-b border-white/10 pb-2">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs text-gray-200">
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
                <Link href="/category/raw-herbs" className="hover:text-brand-gold transition-colors">
                  • Pure Pansar Herbs & Zafran
                </Link>
              </li>
              <li>
                <Link href="/category/digestive-relief" className="hover:text-brand-gold transition-colors">
                  • AciCalm Gastric & Digestive Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Consultation & WhatsApp */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-gold border-b border-white/10 pb-2">
              Hakeem Consultation
            </h4>
            <p className="text-xs text-gray-200">
              Get personalized herbal consultation with Hakeem Muhammad Ikram for chronic conditions, hair care, diabetes, or joint relief.
            </p>

            <div className="space-y-2">
              <Link
                href="/contact"
                className="block w-full text-center bg-brand-gold text-brand-deep font-bold py-2.5 rounded-lg hover:bg-brand-goldShaded transition-colors text-xs shadow-md"
              >
                Book Hakeem Consultation
              </Link>
              <a
                href="https://wa.me/923214544949?text=Hello%20Hakeem%20Ikram,%20I%20would%20like%20to%20inquire%20about%20Hi%20Herbs%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition-colors text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp (+923214544949)
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 gap-4">
          <div>
            © {new Date().getFullYear()} Hi Herbs (by Bismillah Pansar Store). All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/portfolio" className="hover:text-brand-gold">About & Timeline</Link>
            <Link href="/contact" className="hover:text-brand-gold">Contact Us</Link>
            <Link href="/admin" className="hover:text-brand-gold text-gray-400">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
