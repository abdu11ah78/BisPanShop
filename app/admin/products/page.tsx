"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Package,
  Save,
  ImagePlus,
  ChevronDown,
  CheckCircle,
  Upload,
  RefreshCw,
} from "lucide-react";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Product, WeightOption } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useApp } from "@/lib/AppContext";

const EMPTY_PRODUCT: Partial<Product> = {
  name_en: "",
  name_ur: "",
  brand: "Hi Herbs",
  category_id: 1,
  slug: "",
  sku: "",
  description: "",
  benefits: "",
  how_to_use: "",
  ingredients: "",
  price: 0,
  stock_quantity: 0,
  is_featured: false,
  images_json: [],
  weight_options_json: [{ label: "100g", price: 0 }],
};

export default function AdminProductsPage() {
  const { showToast } = useApp();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>(EMPTY_PRODUCT);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<number | "all">("all");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name_en.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === "all" || p.category_id === filterCategory;
    return matchesSearch && matchesCat;
  });

  const openAdd = () => {
    setEditingProduct({ ...EMPTY_PRODUCT, weight_options_json: [{ label: "100g", price: 0 }], images_json: [] });
    setIsEditing(false);
    setImageUrlInput("");
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setIsEditing(true);
    setImageUrlInput(
      Array.isArray(p.images_json) ? (p.images_json[0] || "") : ""
    );
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this product from catalog?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted from catalog", "info");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.url) {
        setImageUrlInput(data.url);
        showToast("Image uploaded successfully!", "success");
      } else {
        showToast("Upload failed: " + (data.error || "Unknown error"), "error");
      }
    } catch (err) {
      showToast("Error uploading image file", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    if (!editingProduct.name_en) {
      showToast("Please enter product English name", "error");
      return;
    }

    const images = imageUrlInput
      ? [imageUrlInput, ...(Array.isArray(editingProduct.images_json) ? editingProduct.images_json.slice(1) : [])]
      : (Array.isArray(editingProduct.images_json) ? editingProduct.images_json : []);

    const productToSave: Product = {
      id: isEditing ? (editingProduct.id as number) : Date.now(),
      name_en: editingProduct.name_en || "",
      name_ur: editingProduct.name_ur || "",
      brand: editingProduct.brand || "Hi Herbs",
      category_id: editingProduct.category_id || 1,
      slug: editingProduct.slug || editingProduct.name_en?.toLowerCase().replace(/\s+/g, "-") || "",
      sku: editingProduct.sku || `HH-${Date.now()}`,
      description: editingProduct.description || "",
      benefits: editingProduct.benefits || "",
      how_to_use: editingProduct.how_to_use || "",
      ingredients: editingProduct.ingredients || "",
      price: Number(editingProduct.price) || 0,
      stock_quantity: Number(editingProduct.stock_quantity) || 0,
      is_featured: editingProduct.is_featured || false,
      images_json: images,
      weight_options_json: editingProduct.weight_options_json || [],
      category_name: MOCK_CATEGORIES.find((c) => c.id === editingProduct.category_id)?.name_en,
    };

    if (isEditing) {
      setProducts((prev) => prev.map((p) => (p.id === productToSave.id ? productToSave : p)));
      showToast("Product updated successfully!", "success");
    } else {
      setProducts((prev) => [productToSave, ...prev]);
      showToast("New product added to catalog!", "success");
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setModalOpen(false);
    }, 800);
  };

  const updateWeightOption = (idx: number, field: "label" | "price", value: string) => {
    const opts = Array.isArray(editingProduct.weight_options_json)
      ? [...(editingProduct.weight_options_json as WeightOption[])]
      : [];
    opts[idx] = { ...opts[idx], [field]: field === "price" ? Number(value) : value };
    setEditingProduct((p) => ({ ...p, weight_options_json: opts }));
  };

  const addWeightOption = () => {
    const opts = Array.isArray(editingProduct.weight_options_json)
      ? [...(editingProduct.weight_options_json as WeightOption[])]
      : [];
    opts.push({ label: "", price: 0 });
    setEditingProduct((p) => ({ ...p, weight_options_json: opts }));
  };

  const removeWeightOption = (idx: number) => {
    const opts = (editingProduct.weight_options_json as WeightOption[]).filter((_, i) => i !== idx);
    setEditingProduct((p) => ({ ...p, weight_options_json: opts }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Products Management</h1>
          <p className="text-gray-300 text-sm mt-0.5">{products.length} products in catalog</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-brand-gold text-brand-deep font-black px-5 py-3 rounded-xl hover:bg-brand-goldShaded transition-all shadow-lg text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark pl-10 text-sm font-medium"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) =>
            setFilterCategory(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="input-dark sm:w-56 text-sm font-medium"
        >
          <option value="all">All Categories</option>
          {MOCK_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name_en}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="card-dark overflow-hidden shadow-xl border border-brand-dark/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-200">
            <thead className="bg-brand-deepest/90 text-brand-gold uppercase tracking-wider font-bold border-b border-brand-dark/60 text-xs">
              <tr>
                <th className="py-4 px-4">Product</th>
                <th className="py-4 px-4">SKU</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Base Price</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark/40 font-medium">
              {filtered.map((p) => {
                const img = Array.isArray(p.images_json)
                  ? p.images_json[0]
                  : "/WebsiteData/logo.jpeg";
                return (
                  <tr key={p.id} className="hover:bg-brand-dark/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-brand-dark flex-shrink-0 bg-brand-dark shadow-sm">
                          <Image
                            src={img}
                            alt={p.name_en}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/WebsiteData/logo.jpeg";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white text-base">{p.name_en}</div>
                          {p.name_ur && (
                            <div className="text-xs text-emerald-400 font-bold">{p.name_ur}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-300 text-xs">{p.sku}</td>
                    <td className="py-4 px-4 font-semibold text-gray-200">{p.category_name || "General"}</td>
                    <td className="py-4 px-4 font-extrabold text-white text-base">{formatPrice(p.price)}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                          p.stock_quantity > 20
                            ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-950/40 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {p.stock_quantity}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {p.is_featured ? (
                        <span className="px-2.5 py-1 rounded-lg bg-brand-gold/20 text-brand-gold font-bold text-xs border border-brand-gold/30">
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">No</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-2 rounded-xl bg-brand-dark hover:bg-brand-gold hover:text-brand-deep text-gray-300 transition-all shadow-sm"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-600 text-rose-300 hover:text-white transition-all shadow-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-brand-deepest border border-brand-dark rounded-2xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl animate-fade-in text-white">
            <div className="flex items-center justify-between p-6 border-b border-brand-dark/60">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-brand-gold" />
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-brand-dark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-sm">
              {/* Image Input + Upload Option */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <ImagePlus className="w-4 h-4 text-brand-gold" />
                  Product Image (URL or Upload Image File)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="/WebsiteData/IMG_XXXX.PNG, /uploads/... or http..."
                    className="input-dark flex-1 text-sm font-medium"
                  />
                  <label className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold text-sm font-bold hover:bg-brand-gold hover:text-brand-deep cursor-pointer transition-all flex-shrink-0">
                    {uploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? "Uploading..." : "Upload File"}
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {imageUrlInput && (
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-brand-dark bg-brand-dark mt-2 shadow-md">
                    <Image
                      src={imageUrlInput}
                      alt="Preview"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/WebsiteData/logo.jpeg";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Name EN + UR */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Name (English) *</label>
                  <input
                    value={editingProduct.name_en || ""}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, name_en: e.target.value }))}
                    placeholder="Product name..."
                    className="input-dark text-sm font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Name (اردو)</label>
                  <input
                    value={editingProduct.name_ur || ""}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, name_ur: e.target.value }))}
                    placeholder="مصنوع کا نام..."
                    className="input-dark text-sm font-bold"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Brand + Category + SKU */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Brand *</label>
                  <input
                    value={editingProduct.brand || ""}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, brand: e.target.value }))}
                    placeholder="Hi Herbs"
                    className="input-dark text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Category *</label>
                  <select
                    value={editingProduct.category_id || 1}
                    onChange={(e) =>
                      setEditingProduct((p) => ({ ...p, category_id: Number(e.target.value) }))
                    }
                    className="input-dark text-sm font-medium"
                  >
                    {MOCK_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-brand-deepest text-white">
                        {c.name_en}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">SKU</label>
                  <input
                    value={editingProduct.sku || ""}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, sku: e.target.value }))}
                    placeholder="HH-OIL-01"
                    className="input-dark text-sm font-medium"
                  />
                </div>
              </div>

              {/* Slug + Stock + Price */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">URL Slug</label>
                  <input
                    value={editingProduct.slug || ""}
                    onChange={(e) => setEditingProduct((p) => ({ ...p, slug: e.target.value }))}
                    placeholder="auto-generated"
                    className="input-dark text-sm font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Base Price (Rs.)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) =>
                      setEditingProduct((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    className="input-dark text-sm font-medium"
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">Stock Qty</label>
                  <input
                    type="number"
                    value={editingProduct.stock_quantity || 0}
                    onChange={(e) =>
                      setEditingProduct((p) => ({ ...p, stock_quantity: Number(e.target.value) }))
                    }
                    className="input-dark text-sm font-medium"
                    min={0}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Description *</label>
                <textarea
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Product description..."
                  className="input-dark text-sm font-medium min-h-[80px] resize-none"
                  rows={3}
                />
              </div>

              {/* Weight Options */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-300">Size / Weight Options</label>
                  <button
                    onClick={addWeightOption}
                    type="button"
                    className="flex items-center gap-1 text-sm text-brand-gold hover:text-brand-goldShaded font-bold"
                  >
                    <Plus className="w-4 h-4" /> Add Size
                  </button>
                </div>
                <div className="space-y-2">
                  {((editingProduct.weight_options_json as WeightOption[]) || []).map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input
                        value={opt.label}
                        onChange={(e) => updateWeightOption(idx, "label", e.target.value)}
                        placeholder="100g / 250ml"
                        className="input-dark text-sm flex-1"
                      />
                      <input
                        type="number"
                        value={opt.price}
                        onChange={(e) => updateWeightOption(idx, "price", e.target.value)}
                        placeholder="Price"
                        className="input-dark text-sm w-32"
                        min={0}
                      />
                      <button
                        onClick={() => removeWeightOption(idx)}
                        type="button"
                        className="p-2.5 rounded-xl hover:bg-red-900/30 text-gray-400 hover:text-red-400 transition-all flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Is Featured */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="is-featured"
                  checked={editingProduct.is_featured || false}
                  onChange={(e) =>
                    setEditingProduct((p) => ({ ...p, is_featured: e.target.checked }))
                  }
                  className="w-4 h-4 accent-brand-gold"
                />
                <label htmlFor="is-featured" className="text-sm font-bold text-gray-300">
                  Mark as Featured (shown on homepage)
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-brand-dark/60">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-3 rounded-xl text-sm font-bold text-gray-400 hover:bg-brand-dark hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all shadow-lg ${
                  saved
                    ? "bg-brand-light text-white"
                    : "bg-brand-gold text-brand-deep hover:bg-brand-goldShaded"
                }`}
              >
                {saved ? (
                  <><CheckCircle className="w-4 h-4" /> Saved!</>
                ) : (
                  <><Save className="w-4 h-4" /> {isEditing ? "Save Changes" : "Add Product"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
