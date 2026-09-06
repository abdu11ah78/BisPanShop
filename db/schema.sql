-- Hi Herbs (by Bismillah Pansar Store) MySQL Database Migration Schema
-- Compatible with MySQL 8.0+

CREATE DATABASE IF NOT EXISTS bispanshop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bispanshop_db;

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ur VARCHAR(255) CHARACTER SET utf8mb4,
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    brand VARCHAR(100) DEFAULT 'Hi Herbs',
    name_en VARCHAR(255) NOT NULL,
    name_ur VARCHAR(255) CHARACTER SET utf8mb4,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    benefits TEXT,
    how_to_use TEXT,
    ingredients TEXT,
    price DECIMAL(10,2) NOT NULL,
    weight_options_json JSON NOT NULL,
    stock_quantity INT DEFAULT 100,
    images_json JSON NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsapp_number VARCHAR(20),
    email VARCHAR(255),
    shipping_address TEXT NOT NULL,
    city VARCHAR(100) DEFAULT 'Lahore',
    payment_method ENUM('COD', 'JazzCash', 'EasyPaisa', 'BankTransfer', 'PayPro') NOT NULL DEFAULT 'COD',
    order_status ENUM('Pending', 'Processing', 'Dispatched', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    grand_total DECIMAL(10,2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    variant_weight VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 5. Consultations Table
CREATE TABLE IF NOT EXISTS consultations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    health_issue VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL,
    visit_type ENUM('InClinic', 'OnlineWhatsApp') DEFAULT 'OnlineWhatsApp',
    status ENUM('Pending', 'Confirmed', 'Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
