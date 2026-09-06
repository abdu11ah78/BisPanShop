import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { store } from "@/lib/store";
import { ConsultationRecord } from "@/lib/types";

export async function GET() {
  try {
    const dbConsultations = await query("SELECT * FROM consultations ORDER BY id DESC");
    if (dbConsultations && dbConsultations.length > 0) {
      return NextResponse.json(dbConsultations);
    }
  } catch (error) {
    console.warn("Using in-memory consultations store fallback");
  }
  return NextResponse.json(store.getConsultations());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patient_name, phone, health_issue, preferred_date, visit_type } = body;

    const newConsultation: ConsultationRecord = {
      id: Date.now(),
      patient_name: patient_name || "Patient",
      phone: phone || "",
      health_issue: health_issue || "General Consultation",
      preferred_date: preferred_date || new Date().toISOString().split("T")[0],
      visit_type: visit_type || "OnlineWhatsApp",
      status: "Pending",
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    store.addConsultation(newConsultation);

    try {
      const sql = `
        INSERT INTO consultations (patient_name, phone, health_issue, preferred_date, visit_type, status)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await query(sql, [
        newConsultation.patient_name,
        newConsultation.phone,
        newConsultation.health_issue,
        newConsultation.preferred_date,
        newConsultation.visit_type,
        newConsultation.status,
      ]);
    } catch (dbErr) {
      // Ignored if DB is not running
    }

    return NextResponse.json({ success: true, consultation: newConsultation });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }
    store.updateConsultationStatus(Number(id), status);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
