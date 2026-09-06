import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { store } from "@/lib/store";
import { Category } from "@/lib/types";

export async function GET() {
  try {
    const dbCategories = await query("SELECT * FROM categories ORDER BY id ASC");
    if (dbCategories && dbCategories.length > 0) {
      return NextResponse.json(dbCategories);
    }
  } catch (error) {
    console.warn("Using in-memory store fallback for categories");
  }
  return NextResponse.json(store.getCategories());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCategory: Category = {
      id: Date.now(),
      name_en: body.name_en || "New Category",
      name_ur: body.name_ur || "",
      slug: body.slug || `category-${Date.now()}`,
    };

    store.addCategory(newCategory);
    return NextResponse.json({ success: true, category: newCategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "Missing category id" }, { status: 400 });

    store.updateCategory(Number(id), updates);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    store.deleteCategory(Number(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
