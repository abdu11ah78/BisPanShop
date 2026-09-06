"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ShoppingBag, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Minus,
  FileText,
  HeartPulse,
  Leaf,
  Info
} from "lucide-react";
import ProductViewer3D from "@/components/3d/ProductViewer3D";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/CartContext";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart();

  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug) || MOCK_PRODUCTS[0];

  // Parse options
  const weightOptions = Array.isArray(product.weight_options_json)
    ? product.weight_options_json
    : [{ label: "Standard", price: product.price }];

  const [selectedVariant, setSelectedVariant] = useState(weightOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "benefits" | "dosage" | "ingredients">("overview");

  const images = Array.isArray(product.images_json) && product.images_json.length > 0
    ? product.images_json
    : ["/placeholder-oil.png"];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-brand-medium hover:text-brand-light font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: 3D Canvas & Gallery */}
        <div className="space-y-6">
          <ProductViewer3D categoryName={product.category_name} />

          {/* Asset Image Preview */}
          <div className="flex gap-4 items-center overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === img ? "border-brand-light ring-2 ring-brand-light/30" : "border-gray-200"
                }`}
              >
                <Image src={img} alt={product.name_en} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Quality Guarantee Box */}
          <div className="p-4 rounded-2xl bg-brand-softBg border border-brand-light/30 space-y-2 text-xs text-brand-dark">
            <div className="flex items-center gap-2 font-bold text-brand-deep">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              Purity & Guarantee
            </div>
            <p className="text-gray-600 leading-relaxed">
              100% natural botanical formulation. Free from synthetic chemicals, artificial preservatives, or diluents. Reg. No. QH-48599-A.
            </p>
          </div>
        </div>

        {/* Right Column: Title, Weight Selectors, Price & CTAs */}
        <div className="space-y-6">
          
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-deep px-3 py-1 rounded-full">
              {product.brand}
            </span>
            <h1 className="text-3xl font-extrabold text-brand-deep">
              {product.name_en}
            </h1>
            {product.name_ur && (
              <span className="text-lg font-serif text-brand-medium block">
                {product.name_ur}
              </span>
            )}
            <p className="text-xs text-gray-500">
              SKU: <span className="font-mono text-gray-700">{product.sku}</span>
            </p>
          </div>

          {/* Dynamic Price */}
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Selected Option Price</span>
            <div className="text-3xl font-extrabold text-brand-dark">
              {formatPrice(selectedVariant.price * quantity)}
            </div>
          </div>

          {/* Multi-Weight Variant Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-deep">
              Select Weight / Packaging Variant:
            </label>
            <div className="flex flex-wrap gap-3">
              {weightOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVariant(opt)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                    selectedVariant.label === opt.label
                      ? "bg-brand-deep text-white border-brand-gold shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:border-brand-light"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span className="text-brand-gold">({formatPrice(opt.price)})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-deep">
              Quantity:
            </label>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-brand-deep">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-brand-medium font-medium">
                In Stock ({product.stock_quantity} available)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, selectedVariant.label, selectedVariant.price, quantity)}
                className="w-full py-4 rounded-xl bg-brand-light text-white font-bold hover:bg-brand-medium transition-all shadow-md text-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Order Cart
              </button>

              <a
                href={`https://wa.me/923214544949?text=${encodeURIComponent(
                  `Hello Hi Herbs, I would like to order ${product.name_en} (${selectedVariant.label}) x ${quantity} - Total: ${formatPrice(selectedVariant.price * quantity)}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-all shadow-md text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Direct Order via WhatsApp
              </a>
            </div>
          </div>

          {/* Tabbed Information Area */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            <div className="flex border-b border-gray-200 gap-4 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === "overview" ? "border-brand-light text-brand-light" : "border-transparent text-gray-500"
                }`}
              >
                <Info className="w-4 h-4" /> Overview
              </button>
              <button
                onClick={() => setActiveTab("benefits")}
                className={`pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === "benefits" ? "border-brand-light text-brand-light" : "border-transparent text-gray-500"
                }`}
              >
                <HeartPulse className="w-4 h-4" /> Health Benefits
              </button>
              <button
                onClick={() => setActiveTab("dosage")}
                className={`pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === "dosage" ? "border-brand-light text-brand-light" : "border-transparent text-gray-500"
                }`}
              >
                <FileText className="w-4 h-4" /> Dosage & Usage
              </button>
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`pb-2 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === "ingredients" ? "border-brand-light text-brand-light" : "border-transparent text-gray-500"
                }`}
              >
                <Leaf className="w-4 h-4" /> Ingredients
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-700 leading-relaxed min-h-32">
              {activeTab === "overview" && <p>{product.description}</p>}
              {activeTab === "benefits" && <p className="whitespace-pre-line">{product.benefits || "• 100% natural formulation\n• Promotes overall vitality and balance"}</p>}
              {activeTab === "dosage" && <p>{product.how_to_use || "Follow standard Tibb instructions or consult Hakeem Ikram."}</p>}
              {activeTab === "ingredients" && <p>{product.ingredients || "100% pure natural herbs and botanical oils."}</p>}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
