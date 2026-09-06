"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Truck, 
  ChevronDown, 
  Trash2, 
  Plus, 
  Minus,
  Sparkles,
  Stethoscope
} from "lucide-react";
import { useCart } from "./CartContext";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";

export default function Header() {
  const { cart, totalItems, subtotal, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Top Credentials & Trust Banner */}
      <div className="bg-brand-deep text-white text-xs py-2 px-4 border-b border-brand-dark/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 text-brand-gold font-medium">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              100% Pure Herbal & Tibb Solutions
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="flex items-center gap-1.5 text-gray-200">
              <Truck className="w-4 h-4 text-brand-light" />
              Free Lahore Express Delivery on orders over Rs. 2,000
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-200 text-xs">
            <a 
              href="tel:+923214544949" 
              className="flex items-center gap-1 hover:text-brand-gold transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              Hakeem Ikram: +92 321 4544949
            </a>
            <span className="text-white/40">|</span>
            <a 
              href="tel:+923134053679" 
              className="hover:text-brand-light transition-colors"
            >
              Awais Ikram: +92 313 4053679
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-gold p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <Image
                  src="/WebsiteData/logo.jpeg"
                  alt="Hi Herbs by Bismillah Pansar Store"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-brand-deep tracking-tight group-hover:text-brand-medium transition-colors flex items-center gap-1">
                  Hi Herbs <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold inline" />
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-medium">
                  By Bismillah Pansar Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-brand-deep">
              <Link href="/" className="hover:text-brand-light transition-colors">
                Home
              </Link>
              
              {/* Category Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setCategoryMenuOpen(true)}
                onMouseLeave={() => setCategoryMenuOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-brand-light transition-colors py-2">
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4 text-brand-medium" />
                </button>

                {categoryMenuOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand-medium pb-2 border-b border-gray-100 mb-1">
                      Pansar Verticals & Formulations
                    </div>
                    {MOCK_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-brand-softBg hover:text-brand-dark transition-colors"
                        onClick={() => setCategoryMenuOpen(false)}
                      >
                        <span>{cat.name_en}</span>
                        {cat.name_ur && (
                          <span className="text-gray-400 font-serif text-[11px]">
                            {cat.name_ur}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/portfolio" className="hover:text-brand-light transition-colors">
                Portfolio & Heritage
              </Link>

              <Link href="/contact" className="flex items-center gap-1.5 text-brand-dark font-semibold hover:text-brand-light transition-colors">
                <Stethoscope className="w-4 h-4 text-brand-gold" />
                Hakeem Consultation
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center relative w-48 lg:w-60">
                <input
                  type="text"
                  placeholder="Search herbs, oils..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full border border-gray-200 focus:outline-none focus:border-brand-light bg-gray-50 focus:bg-white transition-all"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3" />
              </div>

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-brand-softBg text-brand-dark hover:bg-brand-light hover:text-white transition-all shadow-sm"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-deep text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-brand-deep hover:text-brand-light"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pt-4 pb-6 space-y-3 shadow-xl">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-deep hover:bg-brand-softBg"
            >
              Home
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-deep hover:bg-brand-softBg"
            >
              Portfolio & Heritage
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-brand-deep hover:bg-brand-softBg"
            >
              Hakeem Consultation & Store Map
            </Link>

            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs font-semibold uppercase text-brand-medium px-3 pb-2">
                Browse Categories
              </div>
              <div className="grid grid-cols-2 gap-1 px-3">
                {MOCK_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-gray-700 hover:text-brand-light py-1.5 block"
                  >
                    {cat.name_en}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Cart Slide-Over Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Cart Drawer Header */}
              <div className="p-5 bg-brand-deep text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-brand-gold" />
                  <h2 className="text-lg font-bold">Your Order Cart</h2>
                  <span className="text-xs bg-brand-dark px-2.5 py-0.5 rounded-full text-brand-gold font-semibold">
                    {totalItems} items
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-300 hover:text-white p-1 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto stroke-1" />
                    <p className="text-brand-deep font-semibold">Your cart is currently empty</p>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      Explore our pure oils, traditional Unani majoons, and herbal supplements.
                    </p>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedWeight}-${idx}`}
                      className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-brand-light/30 transition-all shadow-xs"
                    >
                      <div className="w-16 h-16 relative bg-white rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={
                            Array.isArray(item.product.images_json) && item.product.images_json[0]
                              ? item.product.images_json[0]
                              : "/placeholder-oil.png"
                          }
                          alt={item.product.name_en}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-brand-deep truncate">
                          {item.product.name_en}
                        </h4>
                        <p className="text-xs text-brand-medium font-medium mt-0.5">
                          Variant: {item.selectedWeight}
                        </p>
                        <p className="text-xs font-bold text-brand-dark mt-1">
                          {formatPrice(item.selectedPrice)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedWeight)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center border border-gray-200 rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-brand-deep">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-4">
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-deep">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Delivery Fee (Lahore / Pakistan)</span>
                      <span className="text-brand-medium font-medium">
                        {subtotal >= 2000 ? "FREE" : "Rs. 200"}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-brand-deep pt-2 border-t border-gray-200">
                      <span>Grand Total</span>
                      <span className="text-brand-dark">
                        {formatPrice(subtotal >= 2000 ? subtotal : subtotal + 200)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full text-center bg-brand-light text-white font-bold py-3.5 rounded-xl hover:bg-brand-medium shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Fast Checkout & WhatsApp Payload
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
