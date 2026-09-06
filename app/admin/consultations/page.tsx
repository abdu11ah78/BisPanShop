"use client";

import React, { useState, useEffect } from "react";
import { 
  Stethoscope, 
  Search, 
  RefreshCw, 
  MessageSquare, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  CheckCircle2, 
  Sparkles,
  Check,
  X
} from "lucide-react";
import { ConsultationRecord } from "@/lib/types";
import { useApp } from "@/lib/AppContext";

const STATUS_COLORS: Record<ConsultationRecord["status"], string> = {
  Pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Confirmed: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export default function AdminConsultationsPage() {
  const { showToast } = useApp();
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/consultations");
      const data = await res.json();
      setConsultations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: ConsultationRecord["status"]) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );

    try {
      await fetch("/api/consultations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      showToast(`Appointment status updated to ${status}`, "success");
    } catch (e) {
      showToast("Failed to update consultation status", "error");
    }
  };

  const filteredConsultations = consultations.filter((c) =>
    c.patient_name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.health_issue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-brand-softDark/80 border border-brand-dark/60 rounded-2xl p-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Patient Consultations <Sparkles className="w-4 h-4 text-brand-gold" />
            </h1>
            <p className="text-xs text-gray-400">
              Manage patient appointment bookings for Hakeem Muhammad Ikram.
            </p>
          </div>
        </div>

        <button
          onClick={fetchConsultations}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-dark hover:bg-brand-dark text-gray-300 transition-all font-bold text-xs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-brand-gold" : ""}`} /> Refresh List
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by Patient Name, Phone Number, or Health Issue..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-brand-softDark/60 border border-brand-dark/60 text-white placeholder-gray-400 text-xs focus:border-brand-gold focus:outline-none"
        />
      </div>

      {/* Consultations Table */}
      <div className="bg-brand-softDark/60 border border-brand-dark/60 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-brand-gold" /> Loading appointments...
          </div>
        ) : filteredConsultations.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-xs space-y-2">
            <Stethoscope className="w-8 h-8 text-gray-500 mx-auto" />
            <p>No consultation requests found matching criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-brand-deepest/80 text-brand-gold uppercase tracking-wider font-bold border-b border-brand-dark/60">
                <tr>
                  <th className="py-3.5 px-4">Patient Name</th>
                  <th className="py-3.5 px-4">Phone Number</th>
                  <th className="py-3.5 px-4">Health Issue / Concern</th>
                  <th className="py-3.5 px-4">Date & Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-dark/40">
                {filteredConsultations.map((c) => (
                  <tr key={c.id} className="hover:bg-brand-dark/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-brand-gold" />
                      {c.patient_name}
                    </td>
                    <td className="py-3.5 px-4 text-gray-300 font-mono">{c.phone}</td>
                    <td className="py-3.5 px-4 text-emerald-300 font-medium max-w-xs truncate">
                      {c.health_issue}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-brand-gold" /> {c.preferred_date}
                      </div>
                      <div className="text-[10px] text-gray-400">{c.visit_type}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          handleStatusChange(c.id, e.target.value as ConsultationRecord["status"])
                        }
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                          STATUS_COLORS[c.status]
                        }`}
                      >
                        <option value="Pending" className="bg-brand-deepest text-white">Pending</option>
                        <option value="Confirmed" className="bg-brand-deepest text-white">Confirmed</option>
                        <option value="Completed" className="bg-brand-deepest text-white">Completed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/92${c.phone.replace(/[^0-9]/g, "").slice(-10)}?text=${encodeURIComponent(
                          `Assalam-o-Alaikum ${c.patient_name}, Hakeem Muhammad Ikram team regarding your consultation for ${c.health_issue}...`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold text-xs transition-all border border-emerald-500/30"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
