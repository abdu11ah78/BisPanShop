"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingBag, Eye, MessageSquare, ArrowLeft, Filter, Sparkles } from "lucide-react";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "@/lib/mockData";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/components/CartContext";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { addToCart } = useCart();

  const category = MOCK_CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    // Fallback display all products if category not matched strictly
  }

  const categoryProducts = MOCK_PRODUCTS.filter((p) => {
    if (!category) return true;
    return p.category_id === category.id || p.category_name?.toLowerCase() === category.name_en.toLowerCase();
  });

  const displayProducts = categoryProducts.length > 0 ? categoryProducts : MOCK_PRODUCTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Breadcrumb & Title */}
      <div className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-brand-medium hover:text-brand-light font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Categories
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold text-brand-deep">
                {category ? category.name_en : "All Products"}
              </h1>
              {category?.name_ur && (
                <span className="text-xl font-serif text-brand-gold bg-brand-deep px-3 py-0.5 rounded-full text-xs font-normal">
                  {category.name_ur}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Showing {displayProducts.length} certified Unani & Tibb formulations
            </p>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => {
          const firstImage = Array.isArray(product.images_json) && product.images_json[0]
            ? product.images_json[0]
            : "/placeholder-oil.png";
          
          const firstWeight = Array.isArray(product.weight_options_json) && product.weight_options_json[0]
            ? product.weight_options_json[0]
            : { label: "Standard", price: product.price };

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-light/40 transition-all flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative w-full h-52 bg-gradient-to-b from-brand-softBg to-white p-4 flex items-center justify-center overflow-hidden">
                <Image
                  src={firstImage}
                  alt={product.name_en}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {product.is_featured && (
                  <span className="absolute top-3 left-3 bg-brand-gold text-brand-deep text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-brand-medium tracking-wider">
                    {product.brand}
                  </span>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-sm font-bold text-brand-deep hover:text-brand-light transition-colors line-clamp-1">
                      {product.name_en}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">{firstWeight.label}</span>
                    <span className="text-base font-bold text-brand-dark">
                      {formatPrice(firstWeight.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => addToCart(product, firstWeight.label, firstWeight.price, 1)}
                      className="p-2.5 rounded-xl bg-brand-softBg text-brand-dark hover:bg-brand-light hover:text-white transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/923214544949?text=${encodeURIComponent(
                        `Hello Hi Herbs, I would like to order ${product.name_en} (${firstWeight.label}) - ${formatPrice(firstWeight.price)}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                      title="Direct Order via WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
