import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hi Herbs (by Bismillah Pansar Store) | 100% Pure Herbal Solutions & Oils",
  description: "Official online store for Hi Herbs by Bismillah Pansar Store (Hakeem Muhammad Ikram). Pure cold-pressed oils, Unani majoons, herbal hair care, organic preserves & raw herbs in Lahore, Pakistan.",
  keywords: ["Hi Herbs", "Bismillah Pansar Store", "Hakeem Ikram", "Herbal Hair Oil", "Onion Oil", "Flora Roots", "Pansar Lahore", "Unani Medicine"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-white text-brand-deep">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
