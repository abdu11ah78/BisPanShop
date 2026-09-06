"use client";

import React, { useState, useEffect } from "react";
import { 
  Tag, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  Sparkles, 
  RefreshCw,
  Layers
} from "lucide-react";
import { Category } from "@/lib/types";
import { useApp } from "@/lib/AppContext";

export default function AdminCategoriesPage() {
  const { showToast } = useApp();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name_en: "",
    name_ur: "",
    slug: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name_en: "", name_ur: "", slug: "" });
    setShowModal(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name_en: cat.name_en,
      name_ur: cat.name_ur || "",
      slug: cat.slug,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name_en) {
      showToast("Category English name is required", "error");
      return;
    }

    const autoSlug = formData.slug || formData.name_en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    try {
      if (editingCategory) {
        await fetch("/api/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCategory.id, ...formData, slug: autoSlug }),
        });
        showToast("Category updated successfully!", "success");
      } else {
        await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, slug: autoSlug }),
        });
        showToast("New category created successfully!", "success");
      }
    } catch (err) {
      showToast("Failed to save category", "error");
    }

    setShowModal(false);
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      showToast("Category deleted successfully", "info");
      fetchCategories();
    } catch (err) {
      showToast("Failed to delete category", "error");
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name_en.toLowerCase().includes(search.toLowerCase()) ||
      (c.name_ur && c.name_ur.includes(search)) ||
      c.slug.includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-softDark/80 border border-brand-dark/60 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Categories Management <Sparkles className="w-4 h-4 text-brand-gold" />
            </h1>
            <p className="text-sm text-gray-300">
              Manage product categories, Urdu names, and slugs for navigation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCategories}
            className="p-2.5 rounded-xl border border-brand-dark hover:bg-brand-dark text-gray-300 transition-all"
            title="Refresh"
          >
            <RefreshCw className={`w-4.5 h-4.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gold text-brand-deep font-bold text-sm hover:bg-brand-goldShaded transition-all shadow-lg shadow-brand-gold/10"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search categories by name (English / اردو) or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-brand-softDark/60 border border-brand-dark/60 text-white placeholder-gray-400 text-sm font-medium focus:border-brand-gold focus:outline-none transition-all"
        />
      </div>

      {/* Categories Table / Grid */}
      <div className="bg-brand-softDark/60 border border-brand-dark/60 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-brand-gold" /> Loading categories...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm space-y-2">
            <Layers className="w-8 h-8 text-gray-500 mx-auto" />
            <p>No categories found matching search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-200">
              <thead className="bg-brand-deepest/80 text-brand-gold uppercase tracking-wider font-bold border-b border-brand-dark/60 text-xs">
                <tr>
                  <th className="py-4 px-4">ID</th>
                  <th className="py-4 px-4">English Name</th>
                  <th className="py-4 px-4">Urdu Name (اردو)</th>
                  <th className="py-4 px-4">Slug</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark/40 font-medium">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-brand-dark/30 transition-colors">
                    <td className="py-4 px-4 font-mono text-gray-400 font-bold">#{cat.id}</td>
                    <td className="py-4 px-4 font-bold text-white text-base flex items-center gap-2">
                      <Tag className="w-4 h-4 text-brand-gold" />
                      {cat.name_en}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-400 text-base">{cat.name_ur || "—"}</td>
                    <td className="py-4 px-4 font-mono text-gray-300">/category/{cat.slug}</td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(cat)}
                        className="p-2 rounded-xl bg-brand-dark hover:bg-brand-gold hover:text-brand-deep text-gray-300 transition-all shadow-sm"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-600 text-rose-300 hover:text-white transition-all shadow-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-brand-deepest border border-brand-dark rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fade-in text-white">
            <div className="flex items-center justify-between border-b border-brand-dark pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Tag className="w-5 h-5 text-brand-gold" />
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-brand-dark transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Category Name (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Cold-Pressed Oils"
                  value={formData.name_en}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({
                      ...formData,
                      name_en: val,
                      slug: editingCategory ? formData.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white placeholder-gray-500 text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Urdu Name (اردو)</label>
                <input
                  type="text"
                  placeholder="e.g. روغن"
                  dir="rtl"
                  value={formData.name_ur}
                  onChange={(e) => setFormData({ ...formData, name_ur: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white placeholder-gray-500 text-sm focus:border-brand-gold focus:outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">URL Slug</label>
                <input
                  type="text"
                  placeholder="e.g. oils"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white placeholder-gray-500 text-sm focus:border-brand-gold focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-dark">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-brand-dark text-gray-300 hover:bg-brand-dark font-bold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand-gold text-brand-deep font-bold text-sm hover:bg-brand-goldShaded transition-all shadow-md"
                >
                  <Check className="w-4 h-4" /> Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
