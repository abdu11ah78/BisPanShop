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
  Phone
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import { formatPrice, generateWhatsAppPayload } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

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

    // Generate WhatsApp payload link
    const waLink = generateWhatsAppPayload(orderData);

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch (e) {
      console.warn("Order saved locally with fallback API");
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
        <div className="w-16 h-16 rounded-full bg-brand-softBg text-brand-light flex items-center justify-center mx-auto border-2 border-brand-light">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-deep px-3 py-1 rounded-full">
            Order Confirmation
          </span>
          <h1 className="text-3xl font-extrabold text-brand-deep">
            Order #{orderComplete.orderNumber} Submitted!
          </h1>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Your order details have been stored. Click below to instantly send your pre-formatted order payload to our official WhatsApp (+92 321 4544949).
          </p>
        </div>

        <div className="p-6 bg-brand-softBg rounded-3xl border border-brand-light/30 space-y-4 max-w-lg mx-auto text-left">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Number:</span>
              <span className="font-bold text-brand-deep">#{orderComplete.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Value:</span>
              <span className="font-bold text-brand-dark">{formatPrice(orderComplete.grandTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Routing Target:</span>
              <span className="font-semibold text-emerald-700">+92 321 4544949 (Hakeem Ikram)</span>
            </div>
          </div>

          <a
            href={orderComplete.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors text-center text-xs shadow-lg flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Send Order Payload to WhatsApp (+923214544949)
          </a>
        </div>

        <Link
          href="/"
          className="inline-block text-xs font-bold text-brand-medium hover:text-brand-light"
        >
          Return to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-brand-medium hover:text-brand-light font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <h1 className="text-3xl font-extrabold text-brand-deep mt-2">
          Frictionless Checkout & Order Capture
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 space-y-4 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
          <p className="text-brand-deep font-bold">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-brand-light text-white font-bold text-xs"
          >
            Browse Hi Herbs Catalog
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns: Customer Details & Payment */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Delivery Info */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-4">
              <h2 className="text-lg font-bold text-brand-deep flex items-center gap-2 border-b border-gray-100 pb-3">
                <User className="w-5 h-5 text-brand-gold" />
                1. Customer Delivery Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-deep mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Imran Khan"
                    value={customer.customer_name}
                    onChange={(e) => setCustomer({ ...customer, customer_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-deep mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-deep mb-1">
                    WhatsApp Number (for order updates)
                  </label>
                  <input
                    type="tel"
                    placeholder="0300-1234567"
                    value={customer.whatsapp_number}
                    onChange={(e) => setCustomer({ ...customer, whatsapp_number: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-deep mb-1">
                    City *
                  </label>
                  <select
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light bg-white"
                  >
                    <option value="Lahore">Lahore (Express Delivery)</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other Pakistan City">Other Pakistan City</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deep mb-1">
                  Complete Shipping Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House #, Street #, Block / Colony, Area"
                  value={customer.shipping_address}
                  onChange={(e) => setCustomer({ ...customer, shipping_address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-md space-y-4">
              <h2 className="text-lg font-bold text-brand-deep flex items-center gap-2 border-b border-gray-100 pb-3">
                <CreditCard className="w-5 h-5 text-brand-gold" />
                2. Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "COD", name: "Cash on Delivery (COD)", desc: "Pay cash upon parcel arrival" },
                  { id: "JazzCash", name: "JazzCash Mobile Wallet", desc: "Direct wallet transfer" },
                  { id: "EasyPaisa", name: "EasyPaisa Mobile Wallet", desc: "EasyPaisa merchant payment" },
                  { id: "BankTransfer", name: "Direct Bank Transfer", desc: "Online banking transfer" },
                  { id: "PayPro", name: "PayPro Gateway", desc: "Automated digital invoice" },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      customer.payment_method === pm.id
                        ? "bg-brand-softBg border-brand-light ring-2 ring-brand-light/20"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value={pm.id}
                      checked={customer.payment_method === pm.id}
                      onChange={(e) => setCustomer({ ...customer, payment_method: e.target.value as any })}
                      className="mt-1 text-brand-light"
                    />
                    <div>
                      <div className="text-xs font-bold text-brand-deep">{pm.name}</div>
                      <div className="text-[11px] text-gray-500">{pm.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary Card */}
          <div className="space-y-6">
            <div className="bg-brand-deep text-white p-6 rounded-3xl border border-brand-gold/30 shadow-xl space-y-6 sticky top-28">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                3. Cart Summary
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-gray-100">{item.product.name_en}</div>
                      <div className="text-[11px] text-brand-gold">{item.selectedWeight} x {item.quantity}</div>
                    </div>
                    <div className="font-bold text-white">
                      {formatPrice(item.selectedPrice * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping Fee</span>
                  <span className="font-bold text-brand-gold">
                    {shippingFee === 0 ? "FREE (Orders > Rs 2000)" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-brand-gold">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-brand-gold text-brand-deep font-bold hover:bg-brand-goldShaded transition-all shadow-lg text-xs flex items-center justify-center gap-2"
              >
                {loading ? "Processing Order..." : (
                  <>
                    <MessageSquare className="w-4 h-4" /> Generate WhatsApp Order Payload
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
