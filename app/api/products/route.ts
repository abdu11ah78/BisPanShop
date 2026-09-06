import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export async function GET() {
  try {
    const dbProducts = await query("SELECT * FROM products ORDER BY id DESC");
    if (dbProducts && dbProducts.length > 0) {
      return NextResponse.json(dbProducts);
    }
  } catch (error) {
    console.warn("Using fallback catalog dataset:", error);
  }
  return NextResponse.json(MOCK_PRODUCTS);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category_id, brand, name_en, name_ur, slug, sku, description, price, weight_options_json, stock_quantity, images_json } = body;

    const sql = `
      INSERT INTO products (category_id, brand, name_en, name_ur, slug, sku, description, price, weight_options_json, stock_quantity, images_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      category_id,
      brand || 'Hi Herbs',
      name_en,
      name_ur || null,
      slug,
      sku,
      description || '',
      price,
      JSON.stringify(weight_options_json || []),
      stock_quantity || 100,
      JSON.stringify(images_json || [])
    ]);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
