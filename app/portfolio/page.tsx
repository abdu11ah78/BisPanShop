"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Sparkles, CheckCircle2, History, Stethoscope } from "lucide-react";
import Ingredient3DViewer from "@/components/3d/Ingredient3DViewer";

const TIMELINE_STEPS = [
  {
    year: "Legacy Roots",
    title: "Bismillah Pansar Store Foundation",
    description: "Established in Shalimar, Lahore, as a trusted local pansar shop providing authentic raw herbs, cold-pressed mustard oil, and classical Unani preparations.",
  },
  {
    year: "Clinical Practice",
    title: "Hakeem Muhammad Ikram Lineage",
    description: "Expansion into personalized patient care and traditional Tibb diagnosis, formulating custom herbal hair oils (Onion Oil, Flora Roots) and gastric relief syrups (AciCalm).",
  },
  {
    year: "Modern Quality Standards",
    title: "Certification & Pure Extraction (Reg. QH-48599-A)",
    description: "Standardizing extraction techniques without synthetic additives, chemical preservatives, or paraben fillers.",
  },
  {
    year: "Digital Transformation",
    title: "Launch of Hi Herbs E-Commerce Platform",
    description: "Bringing nationwide delivery across Pakistan and direct WhatsApp consultation payload automation for instant patient response.",
  },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-softBg text-brand-dark text-xs font-bold border border-brand-light/30">
          <History className="w-4 h-4 text-brand-gold" />
          Heritage & Quality Journey
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-deep tracking-tight">
          The Story of <span className="text-brand-light">Bismillah Pansar Store</span> & Hi Herbs
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Decades of Eastern medicinal wisdom passed down through Hakeem Muhammad Ikram, 
          combining authentic wild-harvested botanicals with pure cold-press technology.
        </p>
      </div>

      {/* 3D Raw Ingredient Viewer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-r from-brand-softBg to-white p-6 sm:p-10 rounded-3xl border border-brand-light/20 shadow-xl">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-brand-medium">
            <Sparkles className="w-4 h-4 text-brand-gold" /> Raw Botanical Purity
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
            3D Botanical Ingredient Showcase
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We source 100% genuine Kashmiri Zafran (Saffron), Salab Misri, Ashwagandha roots, 
            organic chia seeds, and cold-pressed oilseeds. Explore our interactive 3D raw element canvas.
          </p>

          <div className="space-y-2 text-xs text-brand-dark pt-2">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Pure unrefined cold-pressed extraction
            </div>
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Zero artificial colors or synthetic fragrances
            </div>
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Registered Unani Unit: Reg No. QH-48599-A
            </div>
          </div>
        </div>

        <div>
          <Ingredient3DViewer />
        </div>
      </div>

      {/* Animated Heritage Timeline */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-deep">
            Brand Timeline & Heritage
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            From a physical Pansar shop in Shalimar, Lahore to a digital 3D platform.
          </p>
        </div>

        <div className="relative border-l-2 border-brand-light/40 ml-4 sm:ml-32 space-y-12 py-4">
          {TIMELINE_STEPS.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative pl-6 sm:pl-10"
            >
              {/* Dot Icon */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-light text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white">
                {idx + 1}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-2 hover:border-brand-light transition-all">
                <span className="text-xs font-bold text-brand-gold bg-brand-deep px-3 py-1 rounded-full inline-block">
                  {step.year}
                </span>
                <h3 className="text-lg font-bold text-brand-deep">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quality Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-softBg text-brand-light flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-brand-deep text-sm">Official Certification</h3>
          <p className="text-xs text-gray-500">
            Certified Unani unit under registration number <strong>QH-48599-A</strong>.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-softBg text-brand-light flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-brand-deep text-sm">Pure Cold-Press Oils</h3>
          <p className="text-xs text-gray-500">
            Mustard, Onion, Almond, Rosemary, and Coconut oils pressed without thermal degradation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-md text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-brand-softBg text-brand-light flex items-center justify-center mx-auto">
            <Stethoscope className="w-6 h-6 text-brand-gold" />
          </div>
          <h3 className="font-bold text-brand-deep text-sm">Traditional Tibb Consultations</h3>
          <p className="text-xs text-gray-500">
            Personal guidance by Hakeem Muhammad Ikram for chronic ailments and natural wellness.
          </p>
        </div>
      </div>

    </div>
  );
}
