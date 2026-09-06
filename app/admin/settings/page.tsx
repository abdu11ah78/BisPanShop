"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Settings, 
  Sun, 
  Moon, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles, 
  Lock, 
  Save, 
  Check, 
  KeyRound,
  Upload,
  RefreshCw,
  Globe,
  Image as ImageIcon,
  Layers,
  Trash2
} from "lucide-react";
import { useApp } from "@/lib/AppContext";

export default function AdminSettingsPage() {
  const { theme, toggleTheme, siteSettings, updateSiteSettings, showToast } = useApp();

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const [siteForm, setSiteForm] = useState({
    siteName: siteSettings.siteName,
    siteSubtitle: siteSettings.siteSubtitle,
    logoUrl: siteSettings.logoUrl,
    phone1: siteSettings.phone1,
    phone2: siteSettings.phone2,
    registrationNo: siteSettings.registrationNo,
    address: siteSettings.address,
    heroBgUrl: siteSettings.heroBgUrl || "/WebsiteData/IMG_6354.PNG",
    categoriesBgUrl: siteSettings.categoriesBgUrl || "/WebsiteData/IMG_6355.PNG",
    featuredBgUrl: siteSettings.featuredBgUrl || "/WebsiteData/IMG_6356.PNG",
    heritageBgUrl: siteSettings.heritageBgUrl || "/WebsiteData/IMG_6357.PNG",
    contactBgUrl: siteSettings.contactBgUrl || "/WebsiteData/IMG_6358.PNG",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setSiteForm({
      siteName: siteSettings.siteName,
      siteSubtitle: siteSettings.siteSubtitle,
      logoUrl: siteSettings.logoUrl,
      phone1: siteSettings.phone1,
      phone2: siteSettings.phone2,
      registrationNo: siteSettings.registrationNo,
      address: siteSettings.address,
      heroBgUrl: siteSettings.heroBgUrl || "/WebsiteData/IMG_6354.PNG",
      categoriesBgUrl: siteSettings.categoriesBgUrl || "/WebsiteData/IMG_6355.PNG",
      featuredBgUrl: siteSettings.featuredBgUrl || "/WebsiteData/IMG_6356.PNG",
      heritageBgUrl: siteSettings.heritageBgUrl || "/WebsiteData/IMG_6357.PNG",
      contactBgUrl: siteSettings.contactBgUrl || "/WebsiteData/IMG_6358.PNG",
    });
  }, [siteSettings]);

  const handleGenericUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof typeof siteForm) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        setSiteForm((prev) => ({ ...prev, [fieldName]: data.url }));
        showToast(`Image uploaded for ${fieldName}!`, "success");
      } else {
        showToast("Upload failed: " + (data.error || "Unknown error"), "error");
      }
    } catch (err) {
      showToast("Error uploading file", "error");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSiteSettings(siteForm);
      showToast("Website settings & section backgrounds saved site-wide!", "success");
    } catch (err) {
      showToast("Failed to save settings", "error");
    }
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.newPassword) {
      showToast("Please enter a new password", "error");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match!", "error");
      return;
    }
    showToast("Admin password updated successfully!", "success");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex items-center gap-3 bg-brand-softDark/80 border border-brand-dark/60 rounded-2xl p-5 backdrop-blur-md">
        <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            System & Store Settings <Sparkles className="w-4 h-4 text-brand-gold" />
          </h1>
          <p className="text-sm text-gray-300">
            Dynamically configure website branding, section background images, theme, and store metadata.
          </p>
        </div>
      </div>

      {/* Global Theme Controls */}
      <div className="bg-brand-softDark/60 border border-brand-dark/60 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-brand-dark pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sun className="w-4.5 h-4.5 text-brand-gold" /> Global Theme Mode (Admin & Public Website)
            </h2>
            <p className="text-sm text-gray-300 mt-0.5">
              This single control switches the dark or light theme across the ENTIRE website for both customers and admin.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => {
              if (theme !== "dark") {
                toggleTheme();
                showToast("Global Theme switched to Dark Forest Mode", "info");
              }
            }}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              theme === "dark"
                ? "bg-brand-deepest border-brand-gold text-white shadow-lg"
                : "bg-brand-softDark/40 border-brand-dark/40 text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-dark text-brand-gold">
                <Moon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">Dark Forest Mode (Default)</div>
                <div className="text-xs text-gray-400">Deep emerald & rich gold accents</div>
              </div>
            </div>
            {theme === "dark" && <Check className="w-4 h-4 text-brand-gold" />}
          </button>

          <button
            type="button"
            onClick={() => {
              if (theme !== "light") {
                toggleTheme();
                showToast("Global Theme switched to Clean Light Mode", "info");
              }
            }}
            className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              theme === "light"
                ? "bg-white border-brand-gold text-brand-deep shadow-lg"
                : "bg-brand-softDark/40 border-brand-dark/40 text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <Sun className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">Clean Light Mode</div>
                <div className="text-xs text-gray-500">Crisp white & dark typography</div>
              </div>
            </div>
            {theme === "light" && <Check className="w-4 h-4 text-brand-gold" />}
          </button>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSiteSettings} className="space-y-6">
        {/* Dynamic Website Brand Name & Logo Controls */}
        <div className="bg-brand-softDark/60 border border-brand-dark/60 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="border-b border-brand-dark pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4.5 h-4.5 text-brand-gold" /> Website Branding & Metadata
            </h2>
            <p className="text-sm text-gray-300 mt-0.5">
              Updates header title, tagline, logo, phone numbers, and physical address immediately.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-200 font-bold mb-1">Website Brand Name *</label>
                <input
                  type="text"
                  required
                  value={siteForm.siteName}
                  onChange={(e) => setSiteForm({ ...siteForm, siteName: e.target.value })}
                  placeholder="e.g. Hi Herbs"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-200 font-bold mb-1">Tagline / Subtitle *</label>
                <input
                  type="text"
                  required
                  value={siteForm.siteSubtitle}
                  onChange={(e) => setSiteForm({ ...siteForm, siteSubtitle: e.target.value })}
                  placeholder="e.g. By Bismillah Pansar Store"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="block text-gray-200 font-bold mb-1">
                Website Logo (Upload File or Image URL)
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={siteForm.logoUrl}
                  onChange={(e) => setSiteForm({ ...siteForm, logoUrl: e.target.value })}
                  placeholder="/WebsiteData/logo.jpeg or /uploads/..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
                />
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold text-sm font-bold hover:bg-brand-gold hover:text-brand-deep cursor-pointer transition-all flex-shrink-0">
                  {uploadingField === "logoUrl" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingField === "logoUrl" ? "Uploading..." : "Upload Logo"}
                  <input type="file" accept="image/*" onChange={(e) => handleGenericUpload(e, "logoUrl")} className="hidden" />
                </label>
              </div>

              {siteForm.logoUrl && (
                <div className="flex items-center gap-3 pt-1">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold bg-brand-dark shadow-md">
                    <Image
                      src={siteForm.logoUrl}
                      alt="Logo Preview"
                      fill
                      className="object-cover"
                      onError={(e: any) => { e.currentTarget.src = "/WebsiteData/logo.jpeg"; }}
                    />
                  </div>
                  <span className="text-gray-300 text-xs font-medium">Live Logo Preview</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-200 font-bold mb-1">Hakeem Phone 1 *</label>
                <input
                  type="text"
                  value={siteForm.phone1}
                  onChange={(e) => setSiteForm({ ...siteForm, phone1: e.target.value })}
                  placeholder="+92 321 4544949"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-200 font-bold mb-1">Contact Phone 2</label>
                <input
                  type="text"
                  value={siteForm.phone2}
                  onChange={(e) => setSiteForm({ ...siteForm, phone2: e.target.value })}
                  placeholder="+92 313 4053679"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-200 font-bold mb-1">Unani Registration Number</label>
                <input
                  type="text"
                  value={siteForm.registrationNo}
                  onChange={(e) => setSiteForm({ ...siteForm, registrationNo: e.target.value })}
                  placeholder="QH-48599-A"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-200 font-bold mb-1">Physical Store Address</label>
                <input
                  type="text"
                  value={siteForm.address}
                  onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                  placeholder="Shellar Chowk, College Road, Shalimar, Lahore"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section Background Images Control Panel */}
        <div className="bg-brand-softDark/60 border border-brand-dark/60 rounded-2xl p-6 space-y-5 shadow-xl">
          <div className="border-b border-brand-dark pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-4.5 h-4.5 text-brand-gold" /> Page Section Background Images
            </h2>
            <p className="text-sm text-gray-300 mt-0.5">
              Upload custom background photos for website sections. In dark mode, a dark green glassmorphism overlay is applied; in light mode, a white glassmorphism overlay is applied.
            </p>
          </div>

          <div className="space-y-4 text-sm">
            {/* Hero Section Background */}
            <div className="p-4 bg-brand-deepest/80 rounded-xl border border-brand-dark/80 space-y-2">
              <label className="block text-gray-200 font-bold">1. Home Hero Section Background</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={siteForm.heroBgUrl}
                  onChange={(e) => setSiteForm({ ...siteForm, heroBgUrl: e.target.value })}
                  placeholder="Solid theme active (or enter image URL / upload photo)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white text-sm"
                />
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold text-sm font-bold hover:bg-brand-gold hover:text-brand-deep cursor-pointer transition-all flex-shrink-0">
                  {uploadingField === "heroBgUrl" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingField === "heroBgUrl" ? "Uploading..." : "Upload File"}
                  <input type="file" accept="image/*" onChange={(e) => handleGenericUpload(e, "heroBgUrl")} className="hidden" />
                </label>
                {siteForm.heroBgUrl ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSiteForm({ ...siteForm, heroBgUrl: "" });
                      showToast("Hero section image removed. Solid theme color active.", "info");
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold hover:bg-rose-900 hover:text-white transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Image
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-2.5 rounded-xl flex-shrink-0">
                    ✓ Solid Color Active
                  </span>
                )}
              </div>
            </div>

            {/* Categories Section Background */}
            <div className="p-4 bg-brand-deepest/80 rounded-xl border border-brand-dark/80 space-y-2">
              <label className="block text-gray-200 font-bold">2. Home Categories Grid Section Background</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={siteForm.categoriesBgUrl}
                  onChange={(e) => setSiteForm({ ...siteForm, categoriesBgUrl: e.target.value })}
                  placeholder="Solid theme active (or enter image URL / upload photo)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white text-sm"
                />
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold text-sm font-bold hover:bg-brand-gold hover:text-brand-deep cursor-pointer transition-all flex-shrink-0">
                  {uploadingField === "categoriesBgUrl" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingField === "categoriesBgUrl" ? "Uploading..." : "Upload File"}
                  <input type="file" accept="image/*" onChange={(e) => handleGenericUpload(e, "categoriesBgUrl")} className="hidden" />
                </label>
                {siteForm.categoriesBgUrl ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSiteForm({ ...siteForm, categoriesBgUrl: "" });
                      showToast("Categories section image removed. Solid theme color active.", "info");
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold hover:bg-rose-900 hover:text-white transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Image
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-2.5 rounded-xl flex-shrink-0">
                    ✓ Solid Color Active
                  </span>
                )}
              </div>
            </div>

            {/* Featured Products Section Background */}
            <div className="p-4 bg-brand-deepest/80 rounded-xl border border-brand-dark/80 space-y-2">
              <label className="block text-gray-200 font-bold">3. Featured Products Bestsellers Background</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={siteForm.featuredBgUrl}
                  onChange={(e) => setSiteForm({ ...siteForm, featuredBgUrl: e.target.value })}
                  placeholder="Solid theme active (or enter image URL / upload photo)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white text-sm"
                />
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold text-sm font-bold hover:bg-brand-gold hover:text-brand-deep cursor-pointer transition-all flex-shrink-0">
                  {uploadingField === "featuredBgUrl" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingField === "featuredBgUrl" ? "Uploading..." : "Upload File"}
                  <input type="file" accept="image/*" onChange={(e) => handleGenericUpload(e, "featuredBgUrl")} className="hidden" />
                </label>
                {siteForm.featuredBgUrl ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSiteForm({ ...siteForm, featuredBgUrl: "" });
                      showToast("Featured section image removed. Solid theme color active.", "info");
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold hover:bg-rose-900 hover:text-white transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Image
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-2.5 rounded-xl flex-shrink-0">
                    ✓ Solid Color Active
                  </span>
                )}
              </div>
            </div>

            {/* Portfolio Heritage Background */}
            <div className="p-4 bg-brand-deepest/80 rounded-xl border border-brand-dark/80 space-y-2">
              <label className="block text-gray-200 font-bold">4. Portfolio & Heritage Page Background</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={siteForm.heritageBgUrl}
                  onChange={(e) => setSiteForm({ ...siteForm, heritageBgUrl: e.target.value })}
                  placeholder="Solid theme active (or enter image URL / upload photo)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white text-sm"
                />
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold text-sm font-bold hover:bg-brand-gold hover:text-brand-deep cursor-pointer transition-all flex-shrink-0">
                  {uploadingField === "heritageBgUrl" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingField === "heritageBgUrl" ? "Uploading..." : "Upload File"}
                  <input type="file" accept="image/*" onChange={(e) => handleGenericUpload(e, "heritageBgUrl")} className="hidden" />
                </label>
                {siteForm.heritageBgUrl ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSiteForm({ ...siteForm, heritageBgUrl: "" });
                      showToast("Heritage page image removed. Solid theme color active.", "info");
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold hover:bg-rose-900 hover:text-white transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Image
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-2.5 rounded-xl flex-shrink-0">
                    ✓ Solid Color Active
                  </span>
                )}
              </div>
            </div>

            {/* Contact Page Background */}
            <div className="p-4 bg-brand-deepest/80 rounded-xl border border-brand-dark/80 space-y-2">
              <label className="block text-gray-200 font-bold">5. Contact & Consultation Page Background</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  value={siteForm.contactBgUrl}
                  onChange={(e) => setSiteForm({ ...siteForm, contactBgUrl: e.target.value })}
                  placeholder="Solid theme active (or enter image URL / upload photo)"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-brand-softDark border border-brand-dark text-white text-sm"
                />
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-gold/40 text-brand-gold text-sm font-bold hover:bg-brand-gold hover:text-brand-deep cursor-pointer transition-all flex-shrink-0">
                  {uploadingField === "contactBgUrl" ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingField === "contactBgUrl" ? "Uploading..." : "Upload File"}
                  <input type="file" accept="image/*" onChange={(e) => handleGenericUpload(e, "contactBgUrl")} className="hidden" />
                </label>
                {siteForm.contactBgUrl ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSiteForm({ ...siteForm, contactBgUrl: "" });
                      showToast("Contact page image removed. Solid theme color active.", "info");
                    }}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold hover:bg-rose-900 hover:text-white transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Image
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-2.5 rounded-xl flex-shrink-0">
                    ✓ Solid Color Active
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-gold text-brand-deep font-black text-sm hover:bg-brand-goldShaded transition-all shadow-lg shadow-brand-gold/20"
            >
              <Save className="w-4.5 h-4.5" /> Save All Branding & Section Background Settings
            </button>
          </div>
        </div>
      </form>

      {/* Security Settings */}
      <div className="bg-brand-softDark/60 border border-brand-dark/60 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="border-b border-brand-dark pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <KeyRound className="w-4.5 h-4.5 text-brand-gold" /> Admin Portal Password
          </h2>
          <p className="text-sm text-gray-300 mt-0.5">
            Update credentials for admin portal access. (Default: hiherbs2026 / 123456)
          </p>
        </div>

        <form onSubmit={handlePasswordSave} className="space-y-4 text-sm max-w-md">
          <div>
            <label className="block text-gray-200 font-bold mb-1">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-bold mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-bold mb-1">Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-deepest border border-brand-dark text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-brand-gold text-brand-deep font-bold text-sm hover:bg-brand-goldShaded transition-all shadow-md"
          >
            <Save className="w-4 h-4" /> Save Security Settings
          </button>
        </form>
      </div>
    </div>
  );
}
