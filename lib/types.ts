export interface Category {
  id: number;
  name_en: string;
  name_ur?: string;
  slug: string;
  parent_id?: number | null;
  created_at?: string;
}

export interface WeightOption {
  label: string;
  price: number;
}

export interface Product {
  id: number;
  category_id: number;
  brand: string;
  name_en: string;
  name_ur?: string;
  slug: string;
  sku: string;
  description: string;
  benefits?: string;
  how_to_use?: string;
  ingredients?: string;
  price: number;
  weight_options_json: WeightOption[] | string;
  stock_quantity: number;
  images_json: string[] | string;
  is_featured: boolean;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  category_name?: string;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  selectedPrice: number;
  quantity: number;
}

export interface OrderItemInput {
  product_id: number;
  product_name: string;
  variant_weight: string;
  price: number;
  quantity: number;
  total: number;
}

export interface OrderInput {
  customer_name: string;
  phone: string;
  whatsapp_number?: string;
  email?: string;
  shipping_address: string;
  city: string;
  payment_method: 'COD' | 'JazzCash' | 'EasyPaisa' | 'BankTransfer' | 'PayPro';
  subtotal: number;
  shipping_fee: number;
  grand_total: number;
  notes?: string;
  items: OrderItemInput[];
}

export interface OrderRecord {
  id: number;
  order_number: string;
  customer_name: string;
  phone: string;
  whatsapp_number?: string;
  email?: string;
  shipping_address: string;
  city: string;
  payment_method: string;
  order_status: 'Pending' | 'Processing' | 'Dispatched' | 'Delivered' | 'Cancelled';
  subtotal: number;
  shipping_fee: number;
  grand_total: number;
  notes?: string;
  created_at: string;
}

export interface ConsultationInput {
  patient_name: string;
  phone: string;
  health_issue: string;
  preferred_date: string;
  visit_type: 'InClinic' | 'OnlineWhatsApp';
}

export interface ConsultationRecord {
  id: number;
  patient_name: string;
  phone: string;
  health_issue: string;
  preferred_date: string;
  visit_type: 'InClinic' | 'OnlineWhatsApp';
  status: 'Pending' | 'Confirmed' | 'Completed';
  created_at: string;
}

export interface SiteSettings {
  siteName: string;
  siteSubtitle: string;
  logoUrl: string;
  phone1: string;
  phone2: string;
  registrationNo: string;
  address: string;
  // Dynamic Section Backgrounds
  heroBgUrl?: string;
  categoriesBgUrl?: string;
  featuredBgUrl?: string;
  heritageBgUrl?: string;
  contactBgUrl?: string;
}
