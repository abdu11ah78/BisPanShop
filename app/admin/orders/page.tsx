"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  Search, 
  RefreshCw, 
  Eye, 
  MessageSquare, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle,
  X,
  Sparkles,
  MapPin,
  Phone,
  User,
  CreditCard
} from "lucide-react";
import { OrderRecord } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useApp } from "@/lib/AppContext";

const STATUS_OPTIONS: OrderRecord["order_status"][] = [
  "Pending",
  "Processing",
  "Dispatched",
  "Delivered",
  "Cancelled",
];

const STATUS_COLORS: Record<OrderRecord["order_status"], string> = {
  Pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Processing: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Dispatched: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Delivered: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Cancelled: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export default function AdminOrdersPage() {
  const { showToast, siteSettings } = useApp();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: OrderRecord["order_status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, order_status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, order_status: newStatus });
    }

    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      showToast(`Order status updated to ${newStatus}`, "success");
    } catch (e) {
      showToast("Failed to update status", "error");
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.order_number.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search) ||
      o.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || o.order_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-softDark/80 border border-brand-dark/60 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Orders Management <Sparkles className="w-4 h-4 text-brand-gold" />
            </h1>
            <p className="text-xs text-gray-400">
              Track customer orders, update status, and view WhatsApp payload info.
            </p>
          </div>
        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-dark hover:bg-brand-dark text-gray-300 transition-all font-bold text-xs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-brand-gold" : ""}`} /> Refresh Orders
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {["All", ...STATUS_OPTIONS].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                statusFilter === st
                  ? "bg-brand-gold text-brand-deep border-brand-gold shadow-md"
                  : "bg-brand-softDark/60 text-gray-400 border-brand-dark/60 hover:text-white hover:border-brand-dark"
              }`}
            >
              {st} {st !== "All" && `(${orders.filter((o) => o.order_status === st).length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Order #, Name, Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-brand-softDark/60 border border-brand-dark/60 text-white placeholder-gray-400 text-xs focus:border-brand-gold focus:outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-brand-softDark/60 border border-brand-dark/60 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-brand-gold" /> Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs space-y-2">
            <ShoppingCart className="w-8 h-8 text-gray-500 mx-auto" />
            <p>No orders found matching criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-brand-deepest/80 text-brand-gold uppercase tracking-wider font-bold border-b border-brand-dark/60">
                <tr>
                  <th className="py-3.5 px-4">Order #</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark/40">
                {filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-brand-dark/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-gold">
                      #{o.order_number}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{o.customer_name}</div>
                      <div className="text-[11px] text-gray-400">{o.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-300">{o.city}</td>
                    <td className="py-3.5 px-4 font-extrabold text-white">
                      {formatPrice(o.grand_total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-brand-dark text-gray-300 text-[10px] font-bold border border-brand-dark">
                        {o.payment_method}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={o.order_status}
                        onChange={(e) =>
                          handleStatusChange(o.id, e.target.value as OrderRecord["order_status"])
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                          STATUS_COLORS[o.order_status]
                        }`}
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st} className="bg-brand-deepest text-white">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`https://wa.me/92${o.phone.replace(/[^0-9]/g, "").slice(-10)}?text=${encodeURIComponent(
                          `Assalam-o-Alaikum ${o.customer_name}, regarding your Hi Herbs order #${o.order_number}...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-600 text-emerald-400 hover:text-white transition-all"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="p-1.5 rounded-lg bg-brand-dark hover:bg-brand-gold hover:text-brand-deep text-gray-300 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-brand-deepest border border-brand-dark rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fade-in text-white">
            <div className="flex items-center justify-between border-b border-brand-dark pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-brand-gold" />
                  Order #{selectedOrder.order_number}
                </h3>
                <p className="text-[11px] text-gray-400">{selectedOrder.created_at}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-brand-dark transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-brand-softDark rounded-xl border border-brand-dark space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <User className="w-3.5 h-3.5 text-brand-gold" /> {selectedOrder.customer_name}
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-3.5 h-3.5 text-brand-gold" /> {selectedOrder.phone}
                </div>
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold mt-0.5 flex-shrink-0" />
                  <span>{selectedOrder.shipping_address}, {selectedOrder.city}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-brand-softDark rounded-xl border border-brand-dark">
                  <span className="text-gray-400 font-bold block mb-1">Payment Method</span>
                  <span className="font-extrabold text-white flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-brand-gold" /> {selectedOrder.payment_method}
                  </span>
                </div>
                <div className="p-3 bg-brand-softDark rounded-xl border border-brand-dark">
                  <span className="text-gray-400 font-bold block mb-1">Order Status</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border inline-block ${STATUS_COLORS[selectedOrder.order_status]}`}>
                    {selectedOrder.order_status}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-brand-softDark rounded-xl border border-brand-dark space-y-1.5">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping Fee</span>
                  <span>{selectedOrder.shipping_fee === 0 ? "FREE" : formatPrice(selectedOrder.shipping_fee)}</span>
                </div>
                <div className="flex justify-between font-extrabold text-white text-sm border-t border-brand-dark pt-1.5">
                  <span className="text-brand-gold">Grand Total</span>
                  <span className="text-brand-gold">{formatPrice(selectedOrder.grand_total)}</span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="p-3 bg-brand-softDark/40 rounded-xl border border-brand-dark text-gray-300">
                  <strong className="text-gray-400 block mb-1">Notes:</strong>
                  {selectedOrder.notes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-brand-dark pt-3">
              <a
                href={`https://wa.me/${(siteSettings?.phone1 || "+923214544949").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `*ORDER DETAILS #${selectedOrder.order_number}*\nName: ${selectedOrder.customer_name}\nPhone: ${selectedOrder.phone}\nAddress: ${selectedOrder.shipping_address}, ${selectedOrder.city}\nTotal: ${formatPrice(selectedOrder.grand_total)}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Payload
              </a>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-brand-dark text-white font-bold text-xs hover:bg-brand-dark/80 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
