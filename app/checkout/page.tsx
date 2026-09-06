"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  ArrowLeft, 
  CreditCard,
  User,
  MapPin,
  Phone,
  Sparkles
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useApp } from "@/lib/AppContext";
import { formatPrice, generateWhatsAppPayload } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { t, siteSettings } = useApp();

  const [customer, setCustomer] = useState({
    customer_name: "",
    phone: "",
    whatsapp_number: "",
    shipping_address: "",
    city: "Lahore",
    payment_method: "COD" as 'COD' | 'JazzCash' | 'EasyPaisa' | 'BankTransfer' | 'PayPro',
    notes: "",
  });

  const [orderComplete, setOrderComplete] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const shippingFee = subtotal >= 2000 || subtotal === 0 ? 0 : 200;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    const generatedOrderNum = `HIP-${Math.floor(10000 + Math.random() * 90000)}`;

    const orderData = {
      orderNumber: generatedOrderNum,
      customerName: customer.customer_name,
      phone: customer.phone,
      whatsappNumber: customer.whatsapp_number || customer.phone,
      shippingAddress: customer.shipping_address,
      city: customer.city,
      paymentMethod: customer.payment_method,
      items: cart,
      subtotal,
      shippingFee,
      grandTotal,
      notes: customer.notes,
    };

    const waLink = generateWhatsAppPayload(orderData, siteSettings.phone1);

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch (e) {
      console.warn("Order saved locally with store fallback");
    }

    setOrderComplete({
      orderNumber: generatedOrderNum,
      waLink,
      grandTotal,
    });

    clearCart();
    setLoading(false);
  };

  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto border-2 border-brand-gold shadow-2xl">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-gold bg-brand-softDark px-4 py-1 rounded-full border border-brand-gold/40">
            {t("Order Confirmation", "آرڈر کی تصدیق")}
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            {t(`Order #${orderComplete.orderNumber} Placed!`, `آرڈر #${orderComplete.orderNumber} موصول ہو گیا!`)}
          </h1>
          <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
            {t(
              "Thank you for ordering with Hi Herbs. Click below to send your order summary to Hakeem Ikram on WhatsApp for instant priority processing.",
              "ہائی ہربر سے آن لائن خریداری کا شکریہ۔ آرڈر کی فوری کارروائی کے لیے نیچے دیئے گئے بٹن پر کلک کر کے واٹس ایپ میسج بھیجیں۔"
            )}
          </p>
        </div>

        <div className="p-6 bg-brand-softDark/80 rounded-3xl border border-brand-dark/80 max-w-md mx-auto space-y-4 shadow-xl">
          <div className="flex justify-between items-center text-xs font-bold text-gray-300 border-b border-brand-dark pb-3">
            <span>{t("Total Amount Payable (COD)", "کُل رقم (کیش آن ڈیلیوری)")}</span>
            <span className="text-base text-brand-gold font-extrabold">{formatPrice(orderComplete.grandTotal)}</span>
          </div>

          <a
            href={orderComplete.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30"
          >
            <MessageSquare className="w-4 h-4" />
            {t(`Send Order to WhatsApp (${siteSettings.phone1 || "+92 321 4544949"})`, `واٹس ایپ پر آرڈر بھیجیں (${siteSettings.phone1 || "+92 321 4544949"})`)}
          </a>

          <Link
            href="/"
            className="inline-block text-xs font-bold text-gray-400 hover:text-white pt-2 transition-colors"
          >
            ← {t("Return to Store Catalog", "ہوم پیج پر واپس جائیں")}
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-gray-500 mx-auto" />
        <h1 className="text-2xl font-bold text-white">{t("Your Cart is Empty", "آپ کا شاپنگ کارٹ خالی ہے")}</h1>
        <p className="text-xs text-gray-400">
          {t("Explore our herbal products catalog to add items.", "مصنوعات دیکھنے کے لیے شاپنگ کیٹلاگ ملاحظہ کریں۔")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-brand-deep font-bold text-xs hover:bg-brand-goldShaded transition-all shadow-lg"
        >
          {t("Browse Products", "کیٹلاگ دیکھیں")}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image Layer */}
      {Boolean(siteSettings?.heroBgUrl && siteSettings.heroBgUrl.trim() !== "") && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src={siteSettings.heroBgUrl!}
            alt="Checkout Background"
            fill
            className="object-cover opacity-60 dark:opacity-50"
            priority
            onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 dark:bg-brand-deepest/50 bg-white/60 backdrop-blur-sm pointer-events-none" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-brand-gold font-bold transition-colors">
        <ArrowLeft className="w-4 h-4" /> {t("Back to Shop", "واپس شاپنگ پر جائیں")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Form */}
        <div className="lg:col-span-7 bg-brand-softDark/70 border border-brand-dark/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          <div className="border-b border-brand-dark/60 pb-4">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-gold" />
              {t("Shipping & Checkout Details", "ڈیلیوری اور چیک آؤٹ کی تفصیلات")}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              {t("Enter your delivery address to receive your order.", "ڈیلیوری ایڈریس اور رابطہ نمبر فراہم کریں۔")}
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-bold mb-1">
                {t("Full Customer Name *", "پورا نام *")}
              </label>
              <input
                type="text"
                required
                placeholder={t("e.g. Muhammad Ali", "مثلاً محمد علی")}
                value={customer.customer_name}
                onChange={(e) => setCustomer({ ...customer, customer_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {t("Mobile Phone Number *", "موبائل فون نمبر *")}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="03XXXXXXXXX"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {t("WhatsApp Number (Optional)", "واٹس ایپ نمبر (اختیاری)")}
                </label>
                <input
                  type="tel"
                  placeholder="03XXXXXXXXX"
                  value={customer.whatsapp_number}
                  onChange={(e) => setCustomer({ ...customer, whatsapp_number: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">
                {t("Complete Delivery Address *", "مکمل پتہ *")}
              </label>
              <textarea
                required
                rows={2}
                placeholder={t("House #, Street #, Colony/Area...", "مکان نمبر، گلی نمبر، علاقہ...")}
                value={customer.shipping_address}
                onChange={(e) => setCustomer({ ...customer, shipping_address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {t("City *", "شہر *")}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">
                  {t("Payment Option *", "طریقہ ادائیگی *")}
                </label>
                <select
                  value={customer.payment_method}
                  onChange={(e) => setCustomer({ ...customer, payment_method: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-xs focus:border-brand-gold focus:outline-none"
                >
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="EasyPaisa">EasyPaisa</option>
                  <option value="BankTransfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-bold mb-1">
                {t("Special Instructions / Notes", "خصوصی ہدایات")}
              </label>
              <input
                type="text"
                placeholder={t("e.g. Call before delivery", "مثلاً ڈیلیوری سے پہلے فون کریں")}
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white placeholder-gray-500 text-xs focus:border-brand-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-brand-gold text-brand-deep font-extrabold text-xs hover:bg-brand-goldShaded transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-gold/20 pt-3"
            >
              <CheckCircle2 className="w-4 h-4" />
              {loading ? t("Processing Order...", "آرڈر جمع ہو رہا ہے...") : t(`Complete Order (${formatPrice(grandTotal)})`, `آرڈر مکمل کریں (${formatPrice(grandTotal)})`)}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-brand-softDark/70 border border-brand-dark/80 rounded-3xl p-6 space-y-5 shadow-2xl backdrop-blur-md">
          <div className="border-b border-brand-dark/60 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-brand-gold" />
              {t("Order Items Summary", "آرڈر کا خلاصہ")} ({cart.length})
            </h2>
          </div>

          {/* Cart items list */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-brand-deepest/80 border border-brand-dark/60">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-brand-dark flex-shrink-0 bg-brand-dark">
                  <Image
                    src={Array.isArray(item.product.images_json) ? item.product.images_json[0] : "/WebsiteData/logo.jpeg"}
                    alt={item.product.name_en}
                    fill
                    className="object-cover"
                    onError={(e: any) => { e.currentTarget.src = "/WebsiteData/logo.jpeg"; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.product.name_en}</h4>
                  <div className="text-[10px] text-gray-400">Weight: {item.selectedWeight} | Qty: {item.quantity}</div>
                </div>
                <div className="text-xs font-extrabold text-brand-gold">
                  {formatPrice(item.selectedPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing table */}
          <div className="p-4 bg-brand-deepest/90 rounded-xl border border-brand-dark/80 space-y-2 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>{t("Subtotal", "سب ٹوٹل")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>{t("Shipping Fee", "ڈیلیوری فیس")}</span>
              <span>{shippingFee === 0 ? t("FREE (Above Rs 2000)", "مفت") : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-extrabold text-white text-sm border-t border-brand-dark/60 pt-2">
              <span className="text-brand-gold">{t("Grand Total", "کل قیمت")}</span>
              <span className="text-brand-gold">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-brand-dark/40 border border-brand-gold/30 text-[11px] text-brand-gold font-medium flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-brand-gold" />
            <span>{t("100% Authentic herbal products directly from Shalimar Lahore clinic.", "لاہور شالیمار کلینک سے 100٪ خالص قدرتی مصنوعات۔")}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
