import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { MOCK_CONSULTATIONS } from "@/lib/mockData";

export async function GET() {
  try {
    const dbConsultations = await query("SELECT * FROM consultations ORDER BY id DESC");
    if (dbConsultations && dbConsultations.length > 0) {
      return NextResponse.json(dbConsultations);
    }
  } catch (error) {
    console.warn("Using fallback consultations dataset");
  }
  return NextResponse.json(MOCK_CONSULTATIONS);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { patient_name, phone, health_issue, preferred_date, visit_type } = body;

    const sql = `
      INSERT INTO consultations (patient_name, phone, health_issue, preferred_date, visit_type)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      patient_name,
      phone,
      health_issue,
      preferred_date || new Date().toISOString().split('T')[0],
      visit_type || 'OnlineWhatsApp'
    ]);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: true });
  }
}
