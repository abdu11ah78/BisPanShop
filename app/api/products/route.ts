import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { store } from "@/lib/store";
import { Product } from "@/lib/types";

export async function GET() {
  try {
    const dbProducts = await query("SELECT * FROM products ORDER BY id DESC");
    if (dbProducts && dbProducts.length > 0) {
      return NextResponse.json(dbProducts);
    }
  } catch (error) {
    console.warn("Using in-memory store fallback for products");
  }
  return NextResponse.json(store.getProducts());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct: Product = {
      id: Date.now(),
      category_id: Number(body.category_id) || 1,
      brand: body.brand || "Hi Herbs",
      name_en: body.name_en || "New Herbal Product",
      name_ur: body.name_ur || "",
      slug: body.slug || `product-${Date.now()}`,
      sku: body.sku || `HH-PROD-${Math.floor(100 + Math.random() * 900)}`,
      description: body.description || "",
      benefits: body.benefits || "",
      how_to_use: body.how_to_use || "",
      ingredients: body.ingredients || "",
      price: Number(body.price) || 100,
      weight_options_json: body.weight_options_json || [{ label: "100g", price: Number(body.price) || 100 }],
      stock_quantity: Number(body.stock_quantity) || 50,
      images_json: body.images_json || ["/WebsiteData/logo.jpeg"],
      is_featured: Boolean(body.is_featured),
      category_name: body.category_name || "General",
    };

    store.addProduct(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });

    store.updateProduct(Number(id), updates);
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

    store.deleteProduct(Number(id));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
