"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Package,
  Tag,
  Stethoscope,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_ORDERS, MOCK_CONSULTATIONS } from "@/lib/mockData";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Dispatched: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  Confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  Completed: "bg-brand-light/20 text-brand-light border-brand-light/30",
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [consultations, setConsultations] = useState(MOCK_CONSULTATIONS);

  useEffect(() => {
    // In full implementation, fetch from API
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.grand_total, 0);
  const pendingOrders = orders.filter((o) => o.order_status === "Pending").length;
  const pendingConsultations = consultations.filter((c) => c.status === "Pending").length;

  const STAT_CARDS = [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      label: "Total Orders",
      value: orders.length,
      sub: `${pendingOrders} pending`,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      href: "/admin/orders",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: "Total Revenue",
      value: `Rs. ${totalRevenue.toLocaleString()}`,
      sub: "All time",
      color: "text-brand-gold",
      bg: "bg-brand-gold/10 border-brand-gold/20",
      href: "/admin/orders",
    },
    {
      icon: <Package className="w-6 h-6" />,
      label: "Products",
      value: MOCK_PRODUCTS.length,
      sub: `${MOCK_CATEGORIES.length} categories`,
      color: "text-brand-light",
      bg: "bg-brand-light/10 border-brand-light/20",
      href: "/admin/products",
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      label: "Consultations",
      value: consultations.length,
      sub: `${pendingConsultations} pending`,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      href: "/admin/consultations",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand-dark to-brand-deep border border-brand-dark/60 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="relative">
          <p className="text-brand-gold font-bold text-sm mb-1">السلام علیکم!</p>
          <h1 className="text-3xl font-black text-white mb-2">
            Welcome back, <span className="text-brand-gold">Hakeem Sahib</span>
          </h1>
          <p className="text-gray-400">
            Here&apos;s an overview of your Hi Herbs store today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {STAT_CARDS.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className={`flex flex-col gap-4 p-6 rounded-2xl border ${card.bg} hover:-translate-y-0.5 hover:shadow-xl transition-all group`}
          >
            <div className={`w-12 h-12 rounded-xl bg-brand-deepest flex items-center justify-center ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{card.label}</p>
              <p className={`text-3xl font-black mt-1 ${card.color}`}>{card.value}</p>
              <p className="text-gray-500 text-xs mt-1">{card.sub}</p>
            </div>
            <ArrowRight className={`w-4 h-4 ${card.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </Link>
        ))}
      </div>

      {/* Recent Orders + Recent Consultations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-brand-softDark border border-brand-dark/60 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-brand-dark/60">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-brand-gold" />
              Recent Orders
            </h2>
            <Link href="/admin/orders" className="text-xs text-brand-gold hover:text-brand-goldShaded font-semibold">
              View All →
            </Link>
          </div>
          <div className="p-5 space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-brand-deepest border border-brand-dark/40">
                <div>
                  <p className="text-sm font-bold text-white">#{order.order_number}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.customer_name} · {order.city}</p>
                  <p className="text-xs text-brand-gold font-bold mt-0.5">Rs. {order.grand_total.toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[order.order_status] || "text-gray-400"}`}>
                    {order.order_status}
                  </span>
                  <span className="text-[10px] text-gray-500">{order.payment_method}</span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8 text-gray-500">No orders yet.</div>
            )}
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="bg-brand-softDark border border-brand-dark/60 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-brand-dark/60">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-purple-400" />
              Recent Consultations
            </h2>
            <Link href="/admin/consultations" className="text-xs text-brand-gold hover:text-brand-goldShaded font-semibold">
              View All →
            </Link>
          </div>
          <div className="p-5 space-y-3">
            {consultations.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-brand-deepest border border-brand-dark/40">
                <div>
                  <p className="text-sm font-bold text-white">{c.patient_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.health_issue}</p>
                  <p className="text-xs text-purple-400 font-semibold mt-0.5">{c.visit_type} · {c.preferred_date}</p>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${STATUS_COLORS[c.status] || "text-gray-400"}`}>
                  {c.status}
                </span>
              </div>
            ))}
            {consultations.length === 0 && (
              <div className="text-center py-8 text-gray-500">No consultations yet.</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-brand-softDark border border-brand-dark/60 rounded-2xl p-6">
        <h2 className="text-lg font-black text-white mb-5">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { href: "/admin/products", label: "➕ Add Product", bg: "bg-brand-gold text-brand-deep hover:bg-brand-goldShaded" },
            { href: "/admin/categories", label: "📂 Add Category", bg: "bg-brand-dark border border-brand-gold/30 text-brand-gold hover:bg-brand-gold hover:text-brand-deep" },
            { href: "/admin/orders", label: "📦 View Orders", bg: "bg-brand-dark border border-blue-500/30 text-blue-400 hover:border-blue-400" },
            { href: "/admin/consultations", label: "🩺 Consultations", bg: "bg-brand-dark border border-purple-500/30 text-purple-400 hover:border-purple-400" },
            { href: "/admin/settings", label: "⚙️ Settings", bg: "bg-brand-dark border border-brand-dark text-gray-300 hover:text-white" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all ${action.bg}`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
