"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Stethoscope, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search,
  ArrowRight,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_CONSULTATIONS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Product, OrderRecord, ConsultationRecord } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "consultations">("dashboard");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username === "admin" || username === "hakeem") && (password === "hiherbs2026" || password === "123456")) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid admin credentials. Use admin / hiherbs2026");
    }
  };

  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [ordersList, setOrdersList] = useState<OrderRecord[]>(MOCK_ORDERS);
  const [consultationsList, setConsultationsList] = useState<ConsultationRecord[]>(MOCK_CONSULTATIONS);

  // New Product Modal Form State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name_en: "",
    name_ur: "",
    brand: "Hi Herbs",
    category_id: 1,
    price: 300,
    sku: `HH-NEW-${Math.floor(100 + Math.random() * 900)}`,
    description: "",
    weight_label: "250g",
    stock_quantity: 100,
    image_url: "/placeholder-oil.png",
  });

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: productsList.length + 1,
      category_id: newProduct.category_id,
      brand: newProduct.brand,
      name_en: newProduct.name_en,
      name_ur: newProduct.name_ur,
      slug: newProduct.name_en.toLowerCase().replace(/\s+/g, "-"),
      sku: newProduct.sku,
      description: newProduct.description,
      price: newProduct.price,
      weight_options_json: [{ label: newProduct.weight_label, price: newProduct.price }],
      stock_quantity: newProduct.stock_quantity,
      images_json: [newProduct.image_url],
      is_featured: true,
    };
    setProductsList([created, ...productsList]);
    setShowAddProduct(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProductsList(productsList.filter((p) => p.id !== id));
  };

  const handleOrderStatusChange = (orderId: number, status: OrderRecord["order_status"]) => {
    setOrdersList(ordersList.map((o) => (o.id === orderId ? { ...o, order_status: status } : o)));
  };

  const handleConsultationStatusChange = (id: number, status: ConsultationRecord["status"]) => {
    setConsultationsList(consultationsList.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const totalRevenue = ordersList.reduce((sum, o) => sum + Number(o.grand_total), 0);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-gray-100 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-deep px-3 py-1 rounded-full">
            Hi Herbs Admin Portal
          </span>
          <h1 className="text-2xl font-extrabold text-brand-deep">
            Management Login
          </h1>
          <p className="text-xs text-gray-500">
            Enter authorized administrative credentials to access products, orders, and consultations.
          </p>
        </div>

        {loginError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold text-center border border-red-200">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-deep mb-1">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-deep mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-light text-white font-bold hover:bg-brand-medium transition-all text-xs shadow-md"
          >
            Authenticate & Access Dashboard
          </button>
        </form>

        <div className="p-3 rounded-xl bg-brand-softBg text-center text-xs text-brand-dark space-y-1">
          <div>Default Admin Username: <strong className="font-mono">admin</strong></div>
          <div>Default Password: <strong className="font-mono">hiherbs2026</strong></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Title Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-brand-deep text-white p-6 rounded-3xl border border-brand-gold/30 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase text-brand-gold tracking-wider">
            Hi Herbs Protected Management Portal
          </span>
          <h1 className="text-2xl font-extrabold text-white">
            Admin Control Center
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-brand-dark p-1.5 rounded-xl border border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "dashboard" ? "bg-brand-gold text-brand-deep" : "text-gray-300 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "products" ? "bg-brand-gold text-brand-deep" : "text-gray-300 hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" /> Products ({productsList.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "orders" ? "bg-brand-gold text-brand-deep" : "text-gray-300 hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders ({ordersList.length})
          </button>
          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === "consultations" ? "bg-brand-gold text-brand-deep" : "text-gray-300 hover:text-white"
            }`}
          >
            <Stethoscope className="w-4 h-4" /> Consultations ({consultationsList.length})
          </button>
        </div>
      </div>

      {/* 1. DASHBOARD TAB */}
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md space-y-2">
              <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
                <span>Total Orders</span>
                <ShoppingBag className="w-5 h-5 text-brand-light" />
              </div>
              <div className="text-3xl font-extrabold text-brand-deep">{ordersList.length}</div>
              <p className="text-[11px] text-emerald-600 font-semibold">+100% website capture</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md space-y-2">
              <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
                <span>Total Revenue</span>
                <DollarSign className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="text-3xl font-extrabold text-brand-dark">{formatPrice(totalRevenue)}</div>
              <p className="text-[11px] text-gray-500">COD & Mobile Wallets</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md space-y-2">
              <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
                <span>Catalog Items</span>
                <Package className="w-5 h-5 text-brand-light" />
              </div>
              <div className="text-3xl font-extrabold text-brand-deep">{productsList.length}</div>
              <p className="text-[11px] text-gray-500">Formulations & Botanicals</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md space-y-2">
              <div className="flex justify-between items-center text-gray-500 text-xs font-bold">
                <span>Patient Appointments</span>
                <Stethoscope className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="text-3xl font-extrabold text-brand-deep">{consultationsList.length}</div>
              <p className="text-[11px] text-emerald-600 font-semibold">Hakeem Ikram Clinic</p>
            </div>
          </div>

          {/* Recent Orders Overview Table */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-md space-y-4">
            <h3 className="text-base font-bold text-brand-deep">Recent Customer Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-softBg text-brand-deep font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ordersList.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="p-3 font-bold text-brand-deep">#{o.order_number}</td>
                      <td className="p-3 font-medium text-gray-800">{o.customer_name}</td>
                      <td className="p-3 text-gray-600">{o.phone}</td>
                      <td className="p-3 text-gray-600">{o.city}</td>
                      <td className="p-3 font-bold text-brand-dark">{formatPrice(o.grand_total)}</td>
                      <td className="p-3 text-gray-600">{o.payment_method}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          o.order_status === "Delivered" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {o.order_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 2. PRODUCT CRUD MANAGER TAB */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-brand-deep">Product Catalog Manager</h2>
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-4 py-2.5 rounded-xl bg-brand-light text-white font-bold text-xs hover:bg-brand-medium transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add New Herbal Product
            </button>
          </div>

          {/* Add Product Modal */}
          {showAddProduct && (
            <div className="p-6 bg-white rounded-3xl border border-brand-light/30 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-brand-deep">Add New Product Specification</h3>
              <form onSubmit={handleAddProductSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pure Kalonji Oil"
                    value={newProduct.name_en}
                    onChange={(e) => setNewProduct({ ...newProduct, name_en: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Name (Urdu)</label>
                  <input
                    type="text"
                    placeholder="کلونجی کا تیل"
                    value={newProduct.name_ur}
                    onChange={(e) => setNewProduct({ ...newProduct, name_ur: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Variant Weight Label</label>
                  <input
                    type="text"
                    value={newProduct.weight_label}
                    onChange={(e) => setNewProduct({ ...newProduct, weight_label: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stock_quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stock_quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div className="sm:col-span-3 flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-brand-light text-white font-bold text-xs"
                  >
                    Save Product to Catalog
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddProduct(false)}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products List Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-softBg text-brand-deep font-bold border-b border-gray-200">
                <tr>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productsList.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-gray-600">{p.sku}</td>
                    <td className="p-3 font-bold text-brand-deep">
                      {p.name_en} {p.name_ur && <span className="text-gray-400 font-serif">({p.name_ur})</span>}
                    </td>
                    <td className="p-3 text-gray-600">{p.brand}</td>
                    <td className="p-3 font-bold text-brand-dark">{formatPrice(p.price)}</td>
                    <td className="p-3 text-gray-700">{p.stock_quantity} units</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="text-red-500 hover:text-red-700 p-1 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ORDER STATUS MANAGER TAB */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-brand-deep">Order Status Manager</h2>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-softBg text-brand-deep font-bold border-b border-gray-200">
                <tr>
                  <th className="p-3">Order Number</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Shipping Address</th>
                  <th className="p-3">Grand Total</th>
                  <th className="p-3">Status Workflow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ordersList.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-brand-deep">#{o.order_number}</td>
                    <td className="p-3">
                      <div className="font-bold text-gray-800">{o.customer_name}</div>
                      <div className="text-gray-500">{o.phone}</div>
                    </td>
                    <td className="p-3 text-gray-600">{o.shipping_address}, {o.city}</td>
                    <td className="p-3 font-bold text-brand-dark">{formatPrice(o.grand_total)}</td>
                    <td className="p-3">
                      <select
                        value={o.order_status}
                        onChange={(e) => handleOrderStatusChange(o.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 font-bold bg-white text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. CONSULTATION REQUEST MANAGER TAB */}
      {activeTab === "consultations" && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-brand-deep">Hakeem Consultation Appointments</h2>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-brand-softBg text-brand-deep font-bold border-b border-gray-200">
                <tr>
                  <th className="p-3">Patient Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Health Issue</th>
                  <th className="p-3">Preferred Date</th>
                  <th className="p-3">Visit Type</th>
                  <th className="p-3">Appointment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consultationsList.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-brand-deep">{c.patient_name}</td>
                    <td className="p-3 text-gray-700 font-mono">{c.phone}</td>
                    <td className="p-3 text-gray-600 font-medium">{c.health_issue}</td>
                    <td className="p-3 text-gray-700">{c.preferred_date}</td>
                    <td className="p-3 text-gray-600 font-semibold">{c.visit_type}</td>
                    <td className="p-3">
                      <select
                        value={c.status}
                        onChange={(e) => handleConsultationStatusChange(c.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 font-bold bg-white text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
