"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  Eye, 
  MessageSquare, 
  Stethoscope, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone,
  X
} from "lucide-react";
import HeroCanvas3D from "@/components/3d/HeroCanvas3D";
import ProductViewer3D from "@/components/3d/ProductViewer3D";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mockData";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/CartContext";

export default function HomePage() {
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter featured bestsellers
  const bestsellers = MOCK_PRODUCTS.filter((p) => p.is_featured);

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION WITH 3D CANVAS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-softBg via-white to-white pt-8 pb-16 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content (Text & CTAs) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light/15 text-brand-dark text-xs font-bold border border-brand-light/30">
                <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold" />
                Pure Botanical Wisdom • Bismillah Pansar Store Lineage
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-deep tracking-tight leading-tight">
                Authentic <span className="text-brand-light underline decoration-brand-gold decoration-4">Pure Herbs</span> & Cold-Pressed Oils
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience the 100% natural formulations crafted under the expert guidance of <strong className="text-brand-dark">Hakeem Muhammad Ikram</strong>. From traditional hair remedies to pure Unani majoons and dry fruits.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="#bestsellers"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-light text-white font-bold hover:bg-brand-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Shop Bestsellers
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-deep text-white font-bold hover:bg-brand-dark border border-brand-gold/40 shadow-md transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Stethoscope className="w-5 h-5 text-brand-gold" />
                  Book Hakeem Consultation
                </Link>
              </div>

              {/* Quick Credentials */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 text-left">
                <div>
                  <div className="text-lg font-bold text-brand-dark">100% Pure</div>
                  <div className="text-xs text-gray-500">Unadulterated Herbs</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-brand-goldShaded">Tibb Quality</div>
                  <div className="text-xs text-gray-500">Traditional Wisdom</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-brand-dark">Same-Day</div>
                  <div className="text-xs text-gray-500">Lahore Express</div>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl bg-gradient-to-tr from-brand-softBg via-white to-brand-softBg p-4 border border-brand-light/20 shadow-2xl"
            >
              <div className="absolute top-4 right-4 bg-brand-gold text-brand-deep text-[11px] font-bold px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 3D Interactive Leaf & Bottle Canvas
              </div>
              <HeroCanvas3D />
              <div className="text-center text-xs text-brand-medium font-medium py-2">
                Drag mouse or swipe to rotate 360° interactive herbal scene
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* TRUST & CREDENTIALS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-brand-deep text-white shadow-xl border border-brand-gold/30">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-brand-dark text-brand-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Herbal Purity</h4>
              <p className="text-xs text-gray-300">Reg No: QH-48599-A certified</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-brand-dark text-brand-gold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Hakeem Diagnosis</h4>
              <p className="text-xs text-gray-300">By Hakeem Muhammad Ikram</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-brand-dark text-brand-gold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Nationwide COD</h4>
              <p className="text-xs text-gray-300">Free Lahore delivery &gt; Rs. 2000</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-brand-dark text-brand-gold">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">WhatsApp Fast Orders</h4>
              <p className="text-xs text-gray-300">Instant dispatch payload</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
            Explore Herb Categories & Formulations
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
            Browse our full Unani pansar catalog spanning pure cold-pressed oils, hair treatments, majoons, murabbajat, and raw herbs.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-brand-light hover:shadow-lg transition-all text-center space-y-2 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-full bg-brand-softBg group-hover:bg-brand-light/20 flex items-center justify-center text-brand-medium mx-auto transition-colors">
                <Sparkles className="w-5 h-5 text-brand-medium group-hover:text-brand-light" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-brand-deep group-hover:text-brand-light transition-colors line-clamp-1">
                  {cat.name_en}
                </h3>
                {cat.name_ur && (
                  <p className="text-[11px] font-serif text-brand-medium mt-0.5">
                    {cat.name_ur}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS CATALOG GRID */}
      <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase text-brand-medium tracking-wider">
              Popular Formulations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
              Hi Herbs Bestsellers
            </h2>
          </div>
          <Link
            href="/category/oils"
            className="text-xs font-bold text-brand-light hover:text-brand-medium flex items-center gap-1"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => {
            const firstImage = Array.isArray(product.images_json) && product.images_json[0]
              ? product.images_json[0]
              : "/placeholder-oil.png";
            
            const firstWeight = Array.isArray(product.weight_options_json) && product.weight_options_json[0]
              ? product.weight_options_json[0]
              : { label: "Standard", price: product.price };

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-light/40 transition-all flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative w-full h-52 bg-gradient-to-b from-brand-softBg to-white p-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src={firstImage}
                    alt={product.name_en}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.is_featured && (
                    <span className="absolute top-3 left-3 bg-brand-gold text-brand-deep text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      Bestseller
                    </span>
                  )}
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-brand-dark p-2 rounded-full shadow-md backdrop-blur-xs transition-transform hover:scale-110"
                    title="Quick 3D View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Info & Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-medium tracking-wider">
                      {product.brand}
                    </span>
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-sm font-bold text-brand-deep hover:text-brand-light transition-colors line-clamp-1">
                        {product.name_en}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 block">{firstWeight.label}</span>
                      <span className="text-base font-bold text-brand-dark">
                        {formatPrice(firstWeight.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => addToCart(product, firstWeight.label, firstWeight.price, 1)}
                        className="p-2.5 rounded-xl bg-brand-softBg text-brand-dark hover:bg-brand-light hover:text-white transition-colors"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>

                      <a
                        href={`https://wa.me/923214544949?text=${encodeURIComponent(
                          `Hello Hi Herbs, I would like to order ${product.name_en} (${firstWeight.label}) - ${formatPrice(firstWeight.price)}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                        title="Direct Order via WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* HAKEEM CREDIBILITY & HERITAGE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-deep via-brand-dark to-brand-deep text-white p-8 lg:p-12 shadow-2xl border border-brand-gold/40 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                Unani Clinical Lineage
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Crafted Under the Expertise of <span className="text-brand-gold">Hakeem Muhammad Ikram</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                Bismillah Pansar Store has served thousands of families across Lahore for decades. 
                Our transition to <strong>Hi Herbs</strong> brings certified clinical extraction standards, 
                preserving traditional Eastern medicine wisdom (Tibb-e-Unani) for modern natural health.
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>100% Pure Cold-Pressed Seeds & Herbs — No synthetic diluents</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Registered Unani Establishment: Reg. No. QH-48599-A</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  <span>Personalized Patient Consultation at Shalimar Clinic & Online</span>
                </div>
              </div>

              <div className="pt-3 flex gap-4">
                <Link
                  href="/portfolio"
                  className="px-6 py-3 rounded-xl bg-brand-gold text-brand-deep font-bold hover:bg-brand-goldShaded transition-colors text-xs"
                >
                  Explore Brand Story & Timeline
                </Link>
              </div>
            </div>

            {/* Showcase Image & Credentials Card */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-2xl">
              <Image
                src="/WebsiteData/IMG_6354.PNG"
                alt="Hi Herbs Herbal Products Showcase"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-brand-deep/90 backdrop-blur-md border border-brand-gold/30 text-white text-xs">
                <div className="font-bold text-brand-gold">Physical Store & Consultation Clinic</div>
                <div className="text-gray-300 text-[11px]">Shellar Chowk, College Road, Shalimar, Lahore</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STORE LOCATOR & OPERATING HOURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
            Visit Our Store in Lahore
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Open 7 days a week for in-person herbal diagnosis and fresh pansar items.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-brand-softBg border border-brand-light/30 space-y-4">
            <div className="flex items-center gap-3 text-brand-dark">
              <MapPin className="w-6 h-6 text-brand-gold" />
              <h3 className="font-bold text-sm">Physical Address</h3>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Bismillah Pansar Store / Hi Herbs<br />
              Shellar Chowk, College Road, Shalimar,<br />
              Lahore, Punjab, Pakistan
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-softBg border border-brand-light/30 space-y-4">
            <div className="flex items-center gap-3 text-brand-dark">
              <Clock className="w-6 h-6 text-brand-gold" />
              <h3 className="font-bold text-sm">Store & Clinic Hours</h3>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">
              Monday – Sunday: <strong>9:00 AM – 12:00 AM</strong><br />
              Available for direct Hakeem patient consultations daily.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-softBg border border-brand-light/30 space-y-4">
            <div className="flex items-center gap-3 text-brand-dark">
              <Phone className="w-6 h-6 text-brand-gold" />
              <h3 className="font-bold text-sm">Direct Phone Contacts</h3>
            </div>
            <div className="text-xs text-gray-700 space-y-1">
              <div>Hakeem Muhammad Ikram: <strong>+92 321 4544949</strong></div>
              <div>Awais Ikram: <strong>+92 313 4053679</strong></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK 3D VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <ProductViewer3D categoryName={quickViewProduct.category_name} />
              
              <div className="space-y-4">
                <span className="text-xs font-bold text-brand-medium uppercase">
                  {quickViewProduct.brand}
                </span>
                <h3 className="text-xl font-bold text-brand-deep">
                  {quickViewProduct.name_en}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="text-lg font-bold text-brand-dark">
                  {formatPrice(quickViewProduct.price)}
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      const firstWeight = Array.isArray(quickViewProduct.weight_options_json)
                        ? quickViewProduct.weight_options_json[0]?.label || "Standard"
                        : "Standard";
                      addToCart(quickViewProduct, firstWeight, quickViewProduct.price, 1);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 rounded-xl bg-brand-light text-white font-bold hover:bg-brand-medium transition-colors text-xs flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Shopping Cart
                  </button>
                  <Link
                    href={`/product/${quickViewProduct.slug}`}
                    className="block w-full text-center py-3 rounded-xl bg-gray-100 text-brand-deep font-bold hover:bg-gray-200 transition-colors text-xs"
                    onClick={() => setQuickViewProduct(null)}
                  >
                    View Full Product Details & Ingredients
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
