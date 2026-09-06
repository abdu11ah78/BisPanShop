import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { store } from "@/lib/store";
import { OrderRecord } from "@/lib/types";

export async function GET() {
  try {
    const dbOrders = await query("SELECT * FROM orders ORDER BY id DESC");
    if (dbOrders && dbOrders.length > 0) {
      return NextResponse.json(dbOrders);
    }
  } catch (error) {
    console.warn("Using in-memory orders store fallback");
  }
  return NextResponse.json(store.getOrders());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderNumber,
      customerName,
      phone,
      whatsappNumber,
      shippingAddress,
      city,
      paymentMethod,
      subtotal,
      shippingFee,
      grandTotal,
      notes,
    } = body;

    const newOrder: OrderRecord = {
      id: Date.now(),
      order_number: orderNumber || `HIP-${Math.floor(10000 + Math.random() * 90000)}`,
      customer_name: customerName || "Guest",
      phone: phone || "",
      whatsapp_number: whatsappNumber || phone || "",
      shipping_address: shippingAddress || "",
      city: city || "Lahore",
      payment_method: paymentMethod || "COD",
      order_status: "Pending",
      subtotal: Number(subtotal) || 0,
      shipping_fee: Number(shippingFee) || 0,
      grand_total: Number(grandTotal) || 0,
      notes: notes || "",
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    store.addOrder(newOrder);

    try {
      const sql = `
        INSERT INTO orders (order_number, customer_name, phone, whatsapp_number, shipping_address, city, payment_method, order_status, subtotal, shipping_fee, grand_total, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await query(sql, [
        newOrder.order_number,
        newOrder.customer_name,
        newOrder.phone,
        newOrder.whatsapp_number,
        newOrder.shipping_address,
        newOrder.city,
        newOrder.payment_method,
        newOrder.order_status,
        newOrder.subtotal,
        newOrder.shipping_fee,
        newOrder.grand_total,
        newOrder.notes,
      ]);
    } catch (dbErr) {
      // Ignored if DB is not running
    }

    return NextResponse.json({ success: true, order: newOrder });
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
    store.updateOrderStatus(Number(id), status);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
