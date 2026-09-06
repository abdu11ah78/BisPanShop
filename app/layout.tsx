import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { AppProvider } from "@/lib/AppContext";
import RootLayoutClient from "@/components/RootLayoutClient";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hi Herbs — 100% Pure Herbal Solutions & Oils | Bismillah Pansar Store",
  description:
    "Official online store for Hi Herbs by Bismillah Pansar Store (Hakeem Muhammad Ikram). Pure cold-pressed oils, Unani majoons, herbal hair care, organic preserves & raw herbs. Lahore, Pakistan.",
  keywords: [
    "Hi Herbs",
    "Bismillah Pansar Store",
    "Hakeem Ikram",
    "Herbal Hair Oil",
    "Onion Oil",
    "Flora Roots",
    "Pansar Lahore",
    "Unani Medicine",
    "Herbal Products Pakistan",
  ],
  openGraph: {
    title: "Hi Herbs — Pure Herbal Solutions",
    description: "Authentic Unani & Herbal remedies from Hakeem Muhammad Ikram, Lahore.",
    siteName: "Hi Herbs",
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${barlow.variable} dark`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('hi_herbs_theme') || 'dark';
                document.documentElement.className = (document.documentElement.className || '').replace(/(dark|light)/g,'').trim() + ' ' + t;
                var l = localStorage.getItem('hi_herbs_lang') || 'en';
                document.documentElement.lang = l === 'ur' ? 'ur' : 'en';
                document.documentElement.dir = l === 'ur' ? 'rtl' : 'ltr';
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AppProvider>
          <CartProvider>
            <RootLayoutClient>{children}</RootLayoutClient>
          </CartProvider>
        </AppProvider>
      </body>
    </html>
  );
}
