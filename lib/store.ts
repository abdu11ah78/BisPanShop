// Shared in-memory store for dev mode (no MySQL required)
// In production: replace with actual DB queries via lib/db.ts

import { OrderRecord, ConsultationRecord, Product, Category, SiteSettings } from "./types";
import { MOCK_ORDERS, MOCK_CONSULTATIONS, MOCK_PRODUCTS, MOCK_CATEGORIES } from "./mockData";

// Mutable in-memory state (persists during server session)
let _orders: OrderRecord[] = [...MOCK_ORDERS];
let _consultations: ConsultationRecord[] = [...MOCK_CONSULTATIONS];
let _products: Product[] = [...MOCK_PRODUCTS];
let _categories: Category[] = [...MOCK_CATEGORIES];

let _siteSettings: SiteSettings = {
  siteName: "Hi Herbs",
  siteSubtitle: "By Bismillah Pansar Store",
  logoUrl: "/WebsiteData/logo.jpeg",
  phone1: "+92 321 4544949",
  phone2: "+92 313 4053679",
  registrationNo: "QH-48599-A",
  address: "Shellar Chowk, College Road, Shalimar, Lahore, Punjab, Pakistan",
  heroBgUrl: "/WebsiteData/IMG_6354.PNG",
  categoriesBgUrl: "/WebsiteData/IMG_6355.PNG",
  featuredBgUrl: "/WebsiteData/IMG_6356.PNG",
  heritageBgUrl: "/WebsiteData/IMG_6357.PNG",
  contactBgUrl: "/WebsiteData/IMG_6358.PNG",
};

export const store = {
  // Settings
  getSiteSettings: () => _siteSettings,
  updateSiteSettings: (updates: Partial<SiteSettings>) => {
    _siteSettings = { ..._siteSettings, ...updates };
    return _siteSettings;
  },

  // Orders
  getOrders: () => _orders,
  addOrder: (order: OrderRecord) => {
    _orders = [order, ..._orders];
    return order;
  },
  updateOrderStatus: (id: number, status: OrderRecord["order_status"]) => {
    _orders = _orders.map((o) => (o.id === id ? { ...o, order_status: status } : o));
  },

  // Consultations
  getConsultations: () => _consultations,
  addConsultation: (c: ConsultationRecord) => {
    _consultations = [c, ..._consultations];
    return c;
  },
  updateConsultationStatus: (id: number, status: ConsultationRecord["status"]) => {
    _consultations = _consultations.map((c) => (c.id === id ? { ...c, status } : c));
  },

  // Products
  getProducts: () => _products,
  getProductBySlug: (slug: string) => _products.find((p) => p.slug === slug),
  addProduct: (p: Product) => {
    _products = [p, ..._products];
    return p;
  },
  updateProduct: (id: number, updates: Partial<Product>) => {
    _products = _products.map((p) => (p.id === id ? { ...p, ...updates } : p));
  },
  deleteProduct: (id: number) => {
    _products = _products.filter((p) => p.id !== id);
  },

  // Categories
  getCategories: () => _categories,
  addCategory: (c: Category) => {
    _categories = [c, ..._categories];
    return c;
  },
  updateCategory: (id: number, updates: Partial<Category>) => {
    _categories = _categories.map((c) => (c.id === id ? { ...c, ...updates } : c));
  },
  deleteCategory: (id: number) => {
    _categories = _categories.filter((c) => c.id !== id);
  },
};
