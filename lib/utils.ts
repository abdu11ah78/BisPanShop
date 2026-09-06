import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function generateWhatsAppPayload(data: {
  orderNumber: string;
  customerName: string;
  phone: string;
  shippingAddress: string;
  city: string;
  paymentMethod: string;
  items: CartItem[];
  grandTotal: number;
}): string {
  const adminWhatsAppPhone = "923214544949";
  
  let itemsText = "";
  data.items.forEach((item) => {
    itemsText += ` - ${item.product.name_en} (${item.selectedWeight}) x ${item.quantity} - Rs. ${(item.selectedPrice * item.quantity).toLocaleString()}\n`;
  });

  const rawMessage = 
`*NEW WEBSITE ORDER RECEIVED*
*Order ID:* #${data.orderNumber}
*Customer Name:* ${data.customerName}
*Contact Phone:* ${data.phone}
*Shipping Address:* ${data.shippingAddress}, ${data.city}
*Items Ordered:*
${itemsText}*Total Order Value:* Rs. ${data.grandTotal.toLocaleString()}
*Payment Method:* ${data.paymentMethod}`;

  const encodedMessage = encodeURIComponent(rawMessage);
  return `https://wa.me/${adminWhatsAppPhone}?text=${encodedMessage}`;
}
