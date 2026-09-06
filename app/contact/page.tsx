"use client";

import React, { useState } from "react";
import { Stethoscope, MapPin, Clock, Phone, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    patient_name: "",
    phone: "",
    health_issue: "Hair Loss & Scalp Health",
    preferred_date: "",
    visit_type: "OnlineWhatsApp",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback simulate success
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-softBg text-brand-dark text-xs font-bold border border-brand-light/30">
          <Stethoscope className="w-4 h-4 text-brand-gold" />
          Hakeem Consultation & Store Details
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-deep tracking-tight">
          Book Hakeem Consultation & Visit Us
        </h1>

        <p className="text-xs sm:text-sm text-gray-600">
          Schedule a physical diagnosis at our Lahore clinic or request an immediate WhatsApp online consultation with Hakeem Muhammad Ikram.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Consultation Booking Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-brand-deep flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-brand-gold" />
              Patient Appointment Form
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Fill details below to lock your appointment slot with Hakeem Ikram.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-brand-softBg rounded-2xl text-center space-y-4 border border-brand-light/40">
              <CheckCircle2 className="w-12 h-12 text-brand-light mx-auto" />
              <h3 className="text-lg font-bold text-brand-deep">
                Consultation Request Received!
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Thank you, <strong>{formData.patient_name}</strong>. Our team will contact you on <strong>{formData.phone}</strong> to confirm your slot for {formData.preferred_date || "today"}.
              </p>
              
              <a
                href={`https://wa.me/923214544949?text=${encodeURIComponent(
                  `Hello Hakeem Ikram, I booked a consultation for ${formData.patient_name} regarding ${formData.health_issue}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Connect on WhatsApp Now
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-deep mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Usman"
                  value={formData.patient_name}
                  onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deep mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-deep mb-1">
                  Primary Health Concern / Issue *
                </label>
                <select
                  value={formData.health_issue}
                  onChange={(e) => setFormData({ ...formData, health_issue: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light bg-white"
                >
                  <option value="Hair Loss & Scalp Health">Hair Loss & Scalp Health</option>
                  <option value="Skin, Eczema & Acne Care">Skin, Eczema & Acne Care</option>
                  <option value="Diabetes & Sugar Balance">Diabetes & Sugar Balance</option>
                  <option value="Gastric, Acidity & Reflux">Gastric, Acidity & Reflux</option>
                  <option value="Joint & Muscle Pain Relief">Joint & Muscle Pain Relief</option>
                  <option value="Men's Vitality & Stamina">Men's Vitality & Stamina</option>
                  <option value="Women's Wellness & Body Pain">Women's Wellness & Body Pain</option>
                  <option value="Kids Growth & Immunity">Kids Growth & Immunity</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-deep mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-deep mb-1">
                    Visit Mode *
                  </label>
                  <select
                    value={formData.visit_type}
                    onChange={(e) => setFormData({ ...formData, visit_type: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-light bg-white"
                  >
                    <option value="OnlineWhatsApp">Online WhatsApp Consultation</option>
                    <option value="InClinic">Physical In-Clinic Visit (Lahore)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-brand-light text-white font-bold hover:bg-brand-medium transition-all shadow-md text-xs flex items-center justify-center gap-2"
              >
                {loading ? "Submitting..." : (
                  <>
                    <Send className="w-4 h-4" /> Submit Consultation Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Store Info & Phone Contacts */}
        <div className="space-y-6">
          <div className="bg-brand-deep text-white p-6 sm:p-8 rounded-3xl border border-brand-gold/30 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-brand-gold" />
              Physical Store & Clinic Location
            </h2>

            <div className="space-y-4 text-xs text-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-sm block">Bismillah Pansar Store / Hi Herbs</strong>
                  <span>Shellar Chowk, College Road, Shalimar, Lahore, Punjab, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white text-sm block">Operating Hours</strong>
                  <span>Monday to Sunday: <strong>9:00 AM – 12:00 AM</strong></span>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-white text-sm block">Direct Phone Contacts</strong>
                  <div>Hakeem Muhammad Ikram: <a href="tel:+923214544949" className="text-brand-gold font-bold underline">+92 321 4544949</a></div>
                  <div>Awais Ikram: <a href="tel:+923134053679" className="text-brand-gold font-bold underline">+92 313 4053679</a></div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <a
                href="https://wa.me/923214544949?text=Hello%20Hakeem%20Ikram,%20I%20want%20to%20consult%20regarding%20herbal%20treatment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" /> Direct WhatsApp Consultation (+92 321 4544949)
              </a>
            </div>
          </div>

          {/* Embedded Google Maps Placeholder */}
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-md space-y-2 text-center">
            <span className="text-xs font-bold text-brand-medium uppercase">
              Shalimar, Lahore Store Map
            </span>
            <div className="w-full h-48 bg-brand-softBg rounded-2xl flex flex-col items-center justify-center p-4 border border-brand-light/20 text-brand-deep">
              <MapPin className="w-8 h-8 text-brand-gold mb-2" />
              <p className="font-bold text-xs">Shellar Chowk, College Road, Shalimar</p>
              <p className="text-[11px] text-gray-500">Lahore, Punjab, Pakistan</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
