-- Hi Herbs (by Bismillah Pansar Store) Database Seed Catalog
USE bispanshop_db;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE consultations;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Categories
INSERT INTO categories (id, name_en, name_ur, slug) VALUES
(1, 'Oils', 'روغن', 'oils'),
(2, 'Hair Care', 'بالوں کی دیکھ بھال', 'hair-care'),
(3, 'Skin Care', 'جلد کی دیکھ بھال', 'skin-care'),
(4, 'Men\'s Health', 'مردانہ صحت', 'mens-health'),
(5, 'Diabetes Support', 'ذیابطیس کی دیکھ بھال', 'diabetes-support'),
(6, 'Kids Nutrition', 'بچوں کی نشوونما', 'kids-nutrition'),
(7, 'Digestive Relief', 'ہضم اور معدہ', 'digestive-relief'),
(8, 'Weight Gain', 'وزن میں اضافہ', 'weight-gain'),
(9, 'Pain Relief', 'درد کا علاج', 'pain-relief'),
(10, 'Weight Loss', 'وزن کی کمی', 'weight-loss'),
(11, 'Women\'s Health', 'خواتین کی صحت', 'womens-health'),
(12, 'Unani Majoons', 'معجونات', 'unani-majoons'),
(13, 'Sharbat & Distillates', 'شربت اور عرق', 'sharbat-arq'),
(14, 'Preserves & Murabba', 'مربہ جات', 'murabba'),
(15, 'Spices & Condiments', 'مصالحہ جات', 'spices'),
(16, 'Dry Fruits & Nuts', 'میوہ جات', 'dry-fruits'),
(17, 'Raw Herbs', 'جڑی بوٹیاں', 'raw-herbs');

-- 2. Insert Initial Seed Catalog Items (with placeholder image structure)
INSERT INTO products (category_id, brand, name_en, name_ur, slug, sku, description, benefits, how_to_use, ingredients, price, weight_options_json, stock_quantity, images_json, is_featured, seo_title, seo_description) VALUES
(1, 'Hi Herbs', 'Onion Hair Oil', 'پیاز کا تیل', 'onion-hair-oil', 'HH-OIL-01', 'For strong, healthy hair growth — made with red onion extract & 10 natural oils.', 'Promotes scalp blood circulation, reduces hair fall, strengthens hair roots.', 'Apply gently on scalp twice a week before bed.', 'Red Onion Extract, Coconut Oil, Almond Oil, Sesame Oil, Vitamin E.', 250.00, '[{"label": "30 ml", "price": 250}]', 150, '["/WebsiteData/IMG_6354.PNG"]', TRUE, 'Pure Onion Hair Oil | Hi Herbs', 'Buy 100% natural Onion Hair Oil by Hi Herbs for fast hair growth.'),

(1, 'Hi Herbs', 'Sarsoo Oil (Mustard Oil)', 'سرسوں کا خالص تیل', 'mustard-oil-sarsoo', 'HH-OIL-02', '100% pure & cold-pressed natural mustard oil.', 'Rich in omega fatty acids, deep muscle massager, nourishing hair oil.', 'Warm slightly and massage onto body or scalp.', 'Pure Cold Pressed Mustard Seeds.', 600.00, '[{"label": "1 Litre", "price": 600}]', 200, '["/placeholder-oil.png"]', FALSE, 'Pure Mustard Oil | Hi Herbs', '100% cold pressed sarsoo oil.'),

(1, 'Hi Herbs', 'Retha & Dhaniya Hair Oil', 'ریٹھا دھنیا تیل', 'retha-dhaniya-hair-oil', 'HH-OIL-03', 'For revitalized scalp health — made with retha, dhaniya oil & natural botanicals.', 'Cooling effect on scalp, prevents dandruff, strengthens roots.', 'Massage into scalp 30 minutes before shower.', 'Retha Extract, Dhaniya Oil, Herbal Carrier Oils.', 300.00, '[{"label": "250 gms", "price": 300}]', 80, '["/placeholder-oil.png"]', FALSE, 'Retha & Dhaniya Hair Oil | Hi Herbs', 'Herbal scalp cooling and anti-dandruff hair oil.'),

(1, 'Hi Herbs', 'Rosemary Hair Oil', 'روزمیری آئل', 'rosemary-hair-oil', 'HH-OIL-04', 'For revitalized, thick hair growth — pure essential rosemary blend.', 'Stimulates dormant hair follicles, increases hair density.', 'Mix 3-4 drops with carrier oil or apply directly to scalp.', 'Pure Rosemary Extract, Cold Pressed Base Oil.', 120.00, '[{"label": "50 gms", "price": 120}]', 100, '["/placeholder-oil.png"]', TRUE, 'Rosemary Hair Oil | Hi Herbs', 'Pure rosemary oil for hair regrowth and thickness.'),

(1, 'Hi Herbs', 'Coconut Hair Oil', 'ناریل کا تیل', 'coconut-hair-oil', 'HH-OIL-05', 'For nourished, shiny hair — made with pure coconut oil.', 'Deep hydration, prevents protein loss in hair strands.', 'Warm in palms and apply from roots to tips.', 'Pure Virgin Coconut Oil.', 400.00, '[{"label": "250 gms", "price": 400}]', 150, '["/placeholder-oil.png"]', FALSE, 'Pure Coconut Hair Oil | Hi Herbs', 'Pure organic coconut oil for hair shine and moisture.'),

(2, 'Hi Herbs', 'Flora Roots Herbal Hair Oil', 'فلورا روٹس ہربل آئل', 'flora-roots-herbal-hair-oil', 'HH-HC-01', '"The Essence of Strength" — 100% natural herbal hair oil for stronger roots.', 'Deep root nourishment, prevents premature graying, adds shine.', 'Massage into hair roots 1 hour before wash.', 'Amla, Reetha, Shikakai, Rosemary, Bhringraj, Virgin Coconut Oil.', 699.00, '[{"label": "150 ml", "price": 699}]', 120, '["/WebsiteData/IMG_6355.PNG"]', TRUE, 'Flora Roots Herbal Hair Oil | Hi Herbs', '100% natural herbal hair oil for strong, thick hair.'),

(2, 'Hi Herbs', 'Flora Roots Herbal Shampoo', 'فلورا روٹس ہربل شیمپو', 'flora-roots-herbal-shampoo', 'HH-HC-02', '"The Natural Path to Luminous Hair" — 100% natural, paraben-free herbal shampoo.', 'Gently cleanses scalp without stripping natural oils, leaves hair soft.', 'Apply to wet hair, lather, and rinse thoroughly.', 'Amla, Reetha, Shikakai, Aloe Vera Extract, Natural Cleansers.', 250.00, '[{"label": "150 ml", "price": 250}]', 140, '["/placeholder-shampoo.png"]', FALSE, 'Flora Roots Herbal Shampoo | Hi Herbs', 'Paraben-free herbal shampoo for hair vitality.'),

(4, 'Hi Herbs Naturals', 'Men\'s Fertility Health Capsules', 'مردانہ طاقت کیپسول', 'mens-fertility-health-capsules', 'HH-MH-01', '100% botanical formulation designed for male well-being and vitality support.', 'Enhances stamina, improves reproductive vigor, boosts natural vitality.', 'Take 1 capsule twice daily with milk after meals.', 'Salab Misri, Ashwagandha, Safed Musli, Zafran, Shilajit.', 1000.00, '[{"label": "60 Capsules / 100g", "price": 1000}]', 80, '["/WebsiteData/IMG_6356.PNG"]', TRUE, 'Men\'s Fertility Health Capsules | Hi Herbs', 'Natural Unani herbal capsules for male vitality and health.'),

(5, 'DiaCure', 'DiaCure Naturals — Diabetes Support', 'ڈائیا کیور شوگر سپورٹ', 'diacure-naturals-diabetes-support', 'HH-DC-01', 'Advanced blood sugar management blend; supports healthy insulin function.', 'Helps regulate glucose levels, reduces sugar cravings, aids pancreatic health.', '1 capsule morning and evening before food.', 'Karela Extract, Jamun Seed, Gurmar, Methi Seed.', 500.00, '[{"label": "60 Capsules", "price": 500}]', 90, '["/WebsiteData/IMG_6357.PNG"]', TRUE, 'DiaCure Diabetes Support | Hi Herbs', 'Herbal diabetes care and blood sugar support capsules.'),

(6, 'Hi Herbs', 'Hi Herbs Talbina Powder', 'تلبینہ پاؤڈر', 'hi-herbs-talbina-powder', 'HH-KN-01', 'For kids\' growth — enriched with pure barley, nutrient-dense natural nourishment.', 'Boosts immunity, aids bone growth, improves digestion in growing children.', 'Mix 2 tbsp in warm milk daily.', 'Pure Ground Barley, Honey Extract, Almond Flour, Cardamom.', 1000.00, '[{"label": "500 gms", "price": 1000}]', 100, '["/WebsiteData/IMG_6358.PNG"]', TRUE, 'Sunnah Talbina Powder | Hi Herbs', 'Pure barley Talbina powder for kids growth and family health.'),

(7, 'Hi Herbs', 'AciCalm Heartburn Relief Liquid', 'ایسی کام لیکوڈ', 'acicalm-heartburn-relief-liquid', 'HH-DR-01', 'Forms a protective soothing barrier with ginger & marshmallow to calm reflux.', 'Instant relief from stomach heartburn, acid reflux, and gastric bloating.', '10-15 ml after meals as required.', 'Ginger Extract, Marshmallow Root, Peppermint Oil, Natural Mineral Buffer.', 150.00, '[{"label": "150 ml", "price": 150}]', 200, '["/WebsiteData/IMG_6359.PNG"]', TRUE, 'AciCalm Gastric Relief Liquid | Hi Herbs', 'Natural heartburn and acid reflux relief syrup.'),

(7, 'Hi Herbs', 'AciCalm Powder & Mint Essence', 'ایسی کام پاؤڈر', 'acicalm-powder-mint-essence', 'HH-DR-02', 'Stomach harmony & reflux balance. Calms acidity with herbal minerals.', 'Soothes acid burn instantly and improves gut motility.', 'Dissolve 1 tsp in warm water after heavy meals.', 'Herbal Minerals, Peppermint Extract, Aniseed.', 200.00, '[{"label": "150g Powder", "price": 200}, {"label": "100g Mint Essence", "price": 200}]', 150, '["/placeholder-herb.png"]', FALSE, 'AciCalm Powder | Hi Herbs', 'Stomach harmony and anti-acidity herbal powder.'),

(8, 'Hi Herbs', 'Hi Herbs GainX Powder', 'گین ایکس پاؤڈر', 'hi-herbs-gainx-powder', 'HH-WG-01', 'Guaranteed natural power for healthy weight gain and muscle mass enhancement.', 'Promotes healthy appetite, increases muscle weight naturally without steroids.', 'Take 1 scoop with milk twice daily.', 'Ashwagandha, Shatavari, Barley Flour, Natural Herbs.', 1000.00, '[{"label": "1 Month Supply", "price": 1000}]', 75, '["/placeholder-powder.png"]', TRUE, 'GainX Weight Gain | Hi Herbs', 'Natural herbal powder for body muscle and weight gain.'),

(9, 'PainRoot', 'PainRoot Naturals — Joint & Muscle', 'پین روٹ جوڑوں کا علاج', 'painroot-naturals-joint-muscle', 'HH-PR-01', 'Targets joint pain, supports flexibility, aids rapid muscle recovery with GoldenRoot.', 'Relieves arthritis, backache, knee pain, and stiffness.', '1 capsule daily after meal with water.', 'Golden Root Extract, Suranjan Shirin, Guggul, Turmeric.', 200.00, '[{"label": "12 Golden Capsules", "price": 200}]', 110, '["/placeholder-capsule.png"]', TRUE, 'PainRoot Joint Care | Hi Herbs', 'Herbal joint and muscle pain relief capsules.'),

(10, 'Hi Herbs', 'Trim & Tone Chia Powder', 'ٹرم اینڈ ٹون چیا پاؤڈر', 'trim-tone-chia-powder', 'HH-WL-01', 'Nature\'s secret to a slimmer you — organic fiber rich chia weight loss blend.', 'Promotes fullness, burns body fat, boosts metabolic rate.', '1 tbsp in warm water with lemon 30 min before meal.', 'Organic Chia Seeds, Flaxseed Meal, Green Tea Extract.', 400.00, '[{"label": "250 gm", "price": 400}]', 130, '["/placeholder-powder.png"]', FALSE, 'Trim & Tone Chia Powder | Hi Herbs', 'Organic weight loss and belly fat reduction fiber blend.'),

(11, 'Hi Herbs', 'Hi Herbs Women Powder', 'خواتین کیئر پاؤڈر', 'hi-herbs-women-powder', 'HH-WH-01', 'Relieves body & back pain naturally; ancient herbal wisdom tailored for modern women.', 'Balances hormones, relieves fatigue, back pain, and internal weakness.', '1 tsp with lukewarm milk before bed.', 'Asgandh, Shatavari, Lodhra, Kamarkas.', 1000.00, '[{"label": "150 g", "price": 1000}]', 90, '["/placeholder-herb.png"]', TRUE, 'Women\'s Health Powder | Hi Herbs', 'Herbal women wellness powder for body and back pain relief.'),

(14, 'Hi Herbs', 'Murabba Amla', 'مربہ آملہ', 'murabba-amla', 'HH-MB-01', 'Rich in Vitamin C; supports digestion, immunity, stamina, and eye health.', 'Boosts immune strength, cools digestive tract, improves hair health.', 'Eat 1-2 fruits in morning with water.', 'Fresh Organic Amla, Sugar Syrup, Silver Leaf.', 800.00, '[{"label": "1 kg", "price": 800}, {"label": "500g", "price": 450}]', 100, '["/placeholder-jar.png"]', TRUE, 'Pure Amla Murabba | Hi Herbs', 'Traditional Vitamin C rich Amla preserve.'),

(14, 'Hi Herbs', 'Murabba Harar', 'مربہ ہلیل', 'murabba-harar', 'HH-MB-02', 'Chebulic myrobalan preserve; digestive tonic and natural mild laxative.', 'Relieves chronic constipation, clears brain fog, strengthens stomach.', '1 fruit at bedtime.', 'Fresh Harar Fruit, Pure Syrup.', 1200.00, '[{"label": "1 kg", "price": 1200}, {"label": "500g", "price": 650}]', 80, '["/placeholder-jar.png"]', FALSE, 'Murabba Harar | Hi Herbs', 'Traditional Chebulic myrobalan preserve for digestive health.'),

(16, 'Hi Herbs', 'Almonds (Desi Badam)', 'دیسی بادام گری', 'desi-badam-almonds', 'HH-DF-01', 'Whole desi almond kernels; traditional brain and general stamina tonic.', 'Rich in vitamin E, enhances memory, improves heart health.', 'Soak 7 almonds overnight and consume in morning.', '100% Pure Desi Almond Kernels.', 750.00, '[{"label": "250g", "price": 750}, {"label": "1 kg", "price": 2800}]', 200, '["/placeholder-nuts.png"]', TRUE, 'Desi Badam Almonds | Hi Herbs', 'Pure desi almond kernels for brain health.'),

(17, 'Hi Herbs', 'Saffron (Kesar / Zafran)', 'خالص زعفران', 'saffron-kesar-zafran', 'HH-RH-01', 'Prized aromatic herb; mood, skin glow, and reproductive vitality tonic.', 'Provides radiant skin complexion, boosts mental warmth and energy.', 'Pinch of threads in warm milk.', '100% Pure Kashmiri Zafran Threads.', 450.00, '[{"label": "1g", "price": 450}, {"label": "5g", "price": 2100}]', 50, '["/placeholder-saffron.png"]', TRUE, 'Pure Kashmiri Saffron | Hi Herbs', '100% pure authentic Kashmiri Zafran.');
