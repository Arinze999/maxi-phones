// db/products.ts

export type Category =
  | 'phones'
  | 'computers'
  | 'gaming'
  | 'entertainment'
  | 'smart watch';

export interface Product {
  src: string;
  title: string;
  description: string;
  deliveryPeriod: string;
  specs: string[];
  slashedPrice?: string;
  discountPercent?: string;
  price: string;
  rating: number;
  categories: Category[];
}

const baseProducts: Product[] = [
  {
    src: '/imgs/xboxpad.png',
    title: 'Xbox Pad',
    description:
      'Ergonomic wireless controller for Xbox Series X/S and PC, with textured grip and responsive buttons.',
    deliveryPeriod: '1–2 days',
    specs: [
      'Wireless via Xbox Wireless and Bluetooth',
      'Built-in rechargeable battery (up to 30h runtime)',
      'Textured grip for handling',
      '3.5 mm stereo headset jack',
      'Custom button mapping',
    ],
    slashedPrice: '70000',
    discountPercent: '-10%',
    price: '64000',
    rating: 3,
    categories: ['gaming'],
  },
  {
    src: '/imgs/keyboard2.png',
    title: 'Wireless Keyboard',
    description:
      'Slim, compact 2.4 GHz wireless keyboard with low-profile keys and long battery life.',
    deliveryPeriod: '1–3 days',
    specs: [
      '2.4 GHz USB receiver (plug-and-play)',
      '104-key layout with media shortcuts',
      'Adjustable tilt legs',
      'Battery life up to 12 months (2× AAA)',
      'Spill-resistant design',
    ],
    slashedPrice: '12000',
    discountPercent: '-35%',
    price: '7800',
    rating: 3,
    categories: ['computers'],
  },
  {
    src: '/imgs/asuslaptop.png',
    title: 'Asus Gaming laptop',
    description:
      'High-performance gaming laptop with Intel i7, NVIDIA RTX graphics, and high-speed SSD.',
    deliveryPeriod: '2–4 days',
    specs: [
      'Intel Core i7-12700H 14-core CPU',
      'NVIDIA GeForce RTX 3060 6 GB GDDR6',
      '16 GB DDR4 RAM (upgradeable)',
      '512 GB NVMe PCIe SSD',
      '15.6″ FHD 144 Hz display',
      'RGB backlit keyboard',
      'Wi-Fi 6 & Bluetooth 5.2',
    ],
    slashedPrice: '470000',
    discountPercent: '-30%',
    price: '309000',
    rating: 3,
    categories: ['computers', 'gaming'],
  },
  {
    src: '/imgs/jbl.png',
    title: 'JBL Speakers',
    description:
      'Portable Bluetooth speaker with deep bass, waterproof design, and long battery life.',
    deliveryPeriod: '1–2 days',
    specs: [
      'Bluetooth 5.1',
      'Up to 12 h playtime',
      'IPX7 waterproof',
      'Built-in microphone',
      'PartyBoost to link multiple speakers',
    ],
    slashedPrice: '300000',
    discountPercent: '-15%',
    price: '275000',
    rating: 2,
    categories: ['entertainment'],
  },
  {
    src: '/imgs/iPhone16.png',
    title: 'Apple iPhone 16',
    description:
      'Flagship 6.7″ OLED phone with A16 Bionic, 48 MP camera, and MagSafe.',
    deliveryPeriod: '1–2 days',
    specs: [
      'A16 Bionic 6-core CPU',
      '6.7″ Super Retina XDR OLED',
      '48 MP main + 12 MP ultrawide',
      'Cinematic mode & Night mode',
      '5G, Wi-Fi 6E, Bluetooth 5.3',
      'Face ID & MagSafe',
    ],
    slashedPrice: '1700000',
    price: '1220000',
    rating: 4,
    categories: ['phones'],
  },
  {
    src: '/imgs/ps5.png',
    title: 'PS5 Game Console',
    description:
      'Next-gen console with ultra-high-speed SSD, 4K/120 Hz, and Tempest 3D AudioTech.',
    deliveryPeriod: '2–4 days',
    specs: [
      'Custom AMD Ryzen Zen 2 8-core CPU',
      'Custom RDNA 2 GPU (10.28 TFLOPs)',
      '825 GB NVMe SSD',
      '4K/120 Hz & HDR',
      'DualSense wireless controller',
      'Tempest 3D AudioTech',
    ],
    slashedPrice: '900000',
    price: '720000',
    rating: 5,
    categories: ['gaming', 'entertainment'],
  },
  {
    src: '/imgs/jblhead.png',
    title: 'JBL Headset',
    description:
      'Wireless over-ear headset with active noise cancellation and rich JBL sound.',
    deliveryPeriod: '1–3 days',
    specs: [
      'Bluetooth 5.0',
      'Active Noise Cancelling',
      'Up to 20 h battery life',
      'Foldable design',
      'Built-in mic for calls',
      'Comfort-fit ear cushions',
    ],
    slashedPrice: '100000',
    price: '70000',
    rating: 4,
    categories: ['entertainment'],
  },
  {
    src: '/imgs/watchX6Pro.png',
    title: 'Smartwatch X6Pro',
    description:
      'Feature-rich smartwatch with health tracking, built-in GPS, and AMOLED display.',
    deliveryPeriod: '1–2 days',
    specs: [
      '1.78″ AMOLED touchscreen',
      'HR & SpO₂ monitoring',
      'Built-in GPS/GLONASS',
      'Sleep & stress tracking',
      'Up to 7 days battery',
      'IP68 water/dust resistant',
    ],
    slashedPrice: '300000',
    price: '220000',
    rating: 4,
    categories: ['smart watch'],
  },
  {
    src: '/imgs/iPhone12promax.png',
    title: 'Apple iPhone 12 Pro Max',
    description:
      '6.7″ OLED phone with A14 Bionic, triple-camera system, and LiDAR scanner.',
    deliveryPeriod: '2–4 days',
    specs: [
      'A14 Bionic chip',
      '6.7″ Super Retina XDR OLED',
      '12 MP (wide/ultrawide/telephoto)',
      'LiDAR scanner',
      '5G & MagSafe',
      'Up to 20 h video playback',
    ],
    slashedPrice: '700000',
    discountPercent: '-40%',
    price: '420000',
    rating: 4,
    categories: ['phones'],
  },
  {
    src: '/imgs/keyboard.png',
    title: 'AK-900 Wired Keyboard',
    description:
      'Mechanical USB keyboard with clicky blue switches and per-key RGB lighting.',
    deliveryPeriod: '1–2 days',
    specs: [
      'Outemu Blue switches',
      'N-key rollover',
      'Detachable braided USB-C cable',
      'Per-key RGB backlight',
      'Aluminium top plate',
    ],
    slashedPrice: '12000',
    discountPercent: '-35%',
    price: '7800',
    rating: 3,
    categories: ['computers'],
  },
  {
    src: '/imgs/mcbookair.png',
    title: 'Apple MacBook Air',
    description:
      'Ultra-thin laptop with Apple M1, Retina display, Magic Keyboard, and all-day battery.',
    deliveryPeriod: '2–4 days',
    specs: [
      'Apple M1 chip (8-core CPU/GPU)',
      '13.3″ Retina (2560×1600)',
      '8 GB RAM, 256 GB SSD',
      'Magic Keyboard & Touch ID',
      'Up to 18 h battery',
    ],
    slashedPrice: '870000',
    discountPercent: '-30%',
    price: '609000',
    rating: 4,
    categories: ['computers'],
  },
  {
    src: '/imgs/iPhone11.png',
    title: 'Apple iPhone 11',
    description:
      '6.1″ LCD phone with A13 Bionic, dual-camera system, and excellent battery life.',
    deliveryPeriod: '1–2 days',
    specs: [
      'A13 Bionic chip',
      '6.1″ Liquid Retina LCD',
      '12 MP dual cameras',
      'Face ID & IP68',
      'Up to 17 h video playback',
      'Wireless charging',
    ],
    slashedPrice: '500000',
    discountPercent: '-25%',
    price: '375000',
    rating: 2,
    categories: ['phones'],
  },
  {
    src: '/imgs/pad.png',
    title: 'HAVIT HV-G92 Gamepad',
    description:
      'Ergonomic wired controller with dual vibration motors for PC & consoles.',
    deliveryPeriod: '1–2 days',
    specs: [
      'USB-A plug-and-play',
      'Dual vibration feedback',
      '6-axis gyroscope',
      'Adjustable triggers',
      'Rubber grips',
    ],
    slashedPrice: '14000',
    discountPercent: '-40%',
    price: '8400',
    rating: 4,
    categories: ['gaming'],
  },
  {
    src: '/imgs/redmi.png',
    title: 'Redmi Note 13',
    description:
      'Mid-range 6.67″ AMOLED phone with Dimensity 6080, 108 MP camera & 33 W fast charge.',
    deliveryPeriod: '2–3 days',
    specs: [
      'Dimensity 6080 CPU',
      '6.67″ FHD+ AMOLED, 120 Hz',
      '108 MP main + 8 MP ultrawide + 2 MP macro',
      '5000 mAh, 33 W fast charge',
      'Side fingerprint sensor',
    ],
    slashedPrice: '400000',
    discountPercent: '-35%',
    price: '260000',
    rating: 3,
    categories: ['phones'],
  },
  {
    src: '/imgs/tv.png',
    title: 'IPS LCD Gaming Monitor',
    description:
      '24″ 1080p IPS gaming monitor with 144 Hz, 1 ms response, and FreeSync.',
    deliveryPeriod: '3–5 days',
    specs: [
      '24″ 1080p IPS, 144 Hz',
      '1 ms MPRT',
      'AMD FreeSync',
      'Height-adjustable stand',
      'VESA mount',
    ],
    slashedPrice: '150000',
    discountPercent: '-30%',
    price: '105000',
    rating: 4,
    categories: ['computers', 'gaming'],
  },
  {
    src: '/imgs/iPhonexr.png',
    title: 'Apple iPhone XR',
    description:
      '6.1″ LCD phone with A12 Bionic, single 12 MP camera, and multiple color options.',
    deliveryPeriod: '1–2 days',
    specs: [
      '6.1″ Liquid Retina LCD',
      'A12 Bionic chip',
      '12 MP wide camera',
      'Face ID & IP67',
      'Up to 15 h video playback',
    ],
    slashedPrice: '350000',
    discountPercent: '-25%',
    price: '262500',
    rating: 2,
    categories: ['phones'],
  },
  {
    src: '/imgs/iPhone15.png',
    title: 'Apple iPhone 15',
    description:
      'Flagship 6.1″ Super Retina XDR phone with A16 Bionic, Dynamic Island & emergency SOS.',
    deliveryPeriod: '1–2 days',
    specs: [
      '6.1″ Super Retina XDR OLED',
      'A16 Bionic 6-core CPU',
      '48 MP + 12 MP cameras',
      'Dynamic Island',
      'Emergency SOS via satellite',
      'IP68 & MagSafe',
    ],
    slashedPrice: '1300000',
    discountPercent: '-8%',
    price: '1200000',
    rating: 5,
    categories: ['phones'],
  },
  {
    src: '/imgs/iPhone13-mini.png',
    title: 'Apple iPhone 13 mini',
    description:
      'Compact 5.4″ OLED phone with A15 Bionic, dual 12 MP cameras, and MagSafe.',
    deliveryPeriod: '1–3 days',
    specs: [
      '5.4″ OLED Super Retina',
      'A15 Bionic chip',
      'Dual 12 MP cameras',
      'MagSafe & IP68',
      'Up to 17 h playback',
    ],
    slashedPrice: '550000',
    discountPercent: '-18%',
    price: '450000',
    rating: 4,
    categories: ['phones'],
  },
  {
    src: '/imgs/samsungS23.png',
    title: 'Samsung Galaxy S23',
    description:
      'Premium 6.1″ Dynamic AMOLED phone with Snapdragon 8 Gen 2 and pro-grade cameras.',
    deliveryPeriod: '1–2 days',
    specs: [
      '6.1″ Dynamic AMOLED 2X, 120 Hz',
      'Snapdragon 8 Gen 2, 8 GB RAM',
      '50 MP + 12 MP + 10 MP cameras',
      'OIS & 4K/120 Hz video',
      'IP68 & 3900 mAh battery',
    ],
    slashedPrice: '700000',
    discountPercent: '-14%',
    price: '600000',
    rating: 5,
    categories: ['phones'],
  },
  {
    src: '/imgs/samsungA16.png',
    title: 'Samsung Galaxy A16',
    description:
      'Mid-range 6.5″ HD+ LCD phone with Helio G85, quad cameras, and 5000 mAh battery.',
    deliveryPeriod: '2–4 days',
    specs: [
      '6.5″ HD+ LCD, 90 Hz',
      'Helio G85, 4 GB RAM',
      '50 MP + 5 MP + 2 MP + 2 MP cameras',
      '5000 mAh battery',
      'Side fingerprint',
    ],
    price: '140000',
    rating: 3,
    categories: ['phones'],
  },
  {
    src: '/imgs/samsungZflip.png',
    title: 'Samsung Galaxy Z Flip',
    description:
      'Foldable 6.7″ AMOLED phone with cover display, Snapdragon 8+ Gen 1 & Flex mode.',
    deliveryPeriod: '1–3 days',
    specs: [
      '6.7″ FHD+ AMOLED main + 1.9″ cover display',
      'Snapdragon 8+ Gen 1, 8 GB RAM',
      '12 MP dual cameras',
      'Flex hinge & Flex mode',
      'IPX8 & 3700 mAh',
    ],
    slashedPrice: '350000',
    discountPercent: '-20%',
    price: '280000',
    rating: 4,
    categories: ['phones', 'gaming'],
  },
  {
    src: '/imgs/samsungS10Plus.png',
    title: 'Samsung Galaxy S10 Plus',
    description:
      '6.4″ AMOLED phone with triple cameras, Wireless PowerShare & HDR10.',
    deliveryPeriod: '2–5 days',
    specs: [
      '6.4″ Quad HD+ AMOLED',
      'Exynos 9820, 8 GB RAM',
      '12+12+16 MP cameras',
      'Wireless PowerShare',
      'IP68 & 4100 mAh',
    ],
    price: '150000',
    rating: 4,
    categories: ['phones'],
  },
  {
    src: '/imgs/samsungS9.png',
    title: 'Samsung Galaxy S9',
    description:
      '5.8″ Super AMOLED phone with variable aperture camera, stereo speakers.',
    deliveryPeriod: '2–4 days',
    specs: [
      '5.8″ Quad HD+ Super AMOLED',
      'Exynos 9810, 4 GB RAM',
      '12 MP variable aperture',
      'Stereo speakers',
      'IP68 & 3000 mAh',
    ],
    price: '80000',
    rating: 3,
    categories: ['phones'],
  },
  {
    src: '/imgs/redmiNote14.png',
    title: 'Redmi Note 14',
    description:
      '6.67″ FHD+ AMOLED phone with Dimensity 6080, 108 MP camera & 33 W charge.',
    deliveryPeriod: '1–3 days',
    specs: [
      '6.67″ FHD+ AMOLED, 120 Hz',
      'Dimensity 6080, 6 GB RAM',
      '108 MP + 8 MP + 2 MP cameras',
      '33 W fast charge, 5000 mAh',
      'Side fingerprint',
    ],
    slashedPrice: '150000',
    discountPercent: '-20%',
    price: '120000',
    rating: 4,
    categories: ['phones'],
  },
  {
    src: '/imgs/redmi14C.png',
    title: 'Redmi 14C',
    description:
      '6.71″ HD+ LCD phone with UNISOC T606, large battery & entry-level price.',
    deliveryPeriod: '1–4 days',
    specs: [
      '6.71″ HD+ LCD',
      'UNISOC T606, 4 GB RAM',
      '13 MP + 2 MP + 2 MP cameras',
      '5000 mAh, 10 W charge',
      'Rear fingerprint',
    ],
    price: '60000',
    rating: 3,
    categories: ['phones'],
  },
  {
    src: '/imgs/redmiA5.png',
    title: 'Redmi A5',
    description:
      '6.52″ HD+ IPS LCD phone with Helio G25, basic cameras & large battery.',
    deliveryPeriod: '1–5 days',
    specs: [
      '6.52″ HD+ IPS LCD',
      'Helio G25, 2 GB RAM',
      '8 MP + 5 MP cameras',
      '5000 mAh, 10 W charging',
      'Face unlock',
    ],
    price: '50000',
    rating: 2,
    categories: ['phones'],
  },
  {
    src: '/imgs/infinixhot40pro.png',
    title: 'Infinix Hot 40 Pro',
    description:
      '6.78″ FHD+ IPS display, Helio G96, 108 MP camera & 33 W fast charging.',
    deliveryPeriod: '1–3 days',
    specs: [
      '6.78″ FHD+ IPS, 120 Hz',
      'Helio G96, 8 GB RAM',
      '108 MP + 2 MP cameras',
      '33 W charge, 5000 mAh',
      'Side fingerprint',
    ],
    slashedPrice: '130000',
    discountPercent: '-15%',
    price: '110000',
    rating: 4,
    categories: ['phones'],
  },
  {
    src: '/imgs/infinixnote11pro.png',
    title: 'Infinix Note 11 Pro',
    description:
      '6.95″ FHD+ IPS, Helio G96, dual-tone flash & 33 W fast charging.',
    deliveryPeriod: '2–4 days',
    specs: [
      '6.95″ FHD+ IPS, 90 Hz',
      'Helio G96, 6 GB RAM',
      '64 MP + QVGA cameras',
      '33 W fast charge, 5000 mAh',
    ],
    price: '90000',
    rating: 3,
    categories: ['phones'],
  },
  {
    src: '/imgs/infinixsmart8.png',
    title: 'Infinix Smart 8',
    description:
      '6.6″ HD+ IPS display, Helio G35, and massive 6000 mAh battery.',
    deliveryPeriod: '1–4 days',
    specs: [
      '6.6″ HD+ IPS LCD',
      'Helio G35, 4 GB RAM',
      '8 MP + 5 MP cameras',
      '6000 mAh battery',
      '10 W charging',
    ],
    price: '80000',
    rating: 3,
    categories: ['phones'],
  },
  {
    src: '/imgs/tecnocamon40.png',
    title: 'Tecno Camon 40',
    description:
      '6.67″ FHD+ IPS, Helio G85, 108 MP Sony sensor & 18 W fast charge.',
    deliveryPeriod: '1–3 days',
    specs: [
      '6.67″ FHD+ IPS, 120 Hz',
      'Helio G85, 6 GB RAM',
      '108 MP Sony + 2 MP cameras',
      '18 W charge, 5000 mAh',
      'Side fingerprint',
    ],
    slashedPrice: '80000',
    discountPercent: '-12%',
    price: '70000',
    rating: 4,
    categories: ['phones'],
  },
  {
    src: '/imgs/tecnospark9pro.png',
    title: 'Tecno Spark 9 Pro',
    description:
      '6.6″ HD+ IPS, Helio G80, 50 MP selfie camera & reliable 5000 mAh battery.',
    deliveryPeriod: '1–4 days',
    specs: [
      '6.6″ HD+ IPS LCD',
      'Helio G80, 4 GB RAM',
      '50 MP front camera',
      '5000 mAh battery',
      '18 W charge',
    ],
    price: '60000',
    rating: 3,
    categories: ['phones'],
  },
  {
    src: '/imgs/tecnophantomx.png',
    title: 'Tecno Phantom X',
    description:
      '6.8″ FHD+ AMOLED, Helio G95, dual 50 MP cameras & curved glass design.',
    deliveryPeriod: '2–4 days',
    specs: [
      '6.8″ FHD+ AMOLED, 90 Hz',
      'Helio G95, 8 GB RAM',
      '50 MP + 50 MP cameras',
      '33 W charge, 5000 mAh',
      'Curved glass back',
    ],
    slashedPrice: '350000',
    discountPercent: '-14%',
    price: '300000',
    rating: 5,
    categories: ['phones'],
  },
  {
    src: '/imgs/ps4.png',
    title: 'Sony PlayStation 4',
    description:
      '1 TB console for gaming & streaming, with DualShock 4 and HDR support.',
    deliveryPeriod: '3–7 days',
    specs: [
      '1 TB HDD',
      'HDR10 output',
      'Blu-ray/DVD drive',
      'DualShock 4 wireless controller',
      'Remote Play support',
    ],
    price: '150000',
    rating: 4,
    categories: ['gaming', 'entertainment'],
  },
  {
    src: '/imgs/xbox.png',
    title: 'Xbox Series X',
    description:
      'High-end 4K console with 1 TB SSD, up to 120 FPS, and Quick Resume.',
    deliveryPeriod: '2–5 days',
    specs: [
      '1 TB NVMe SSD',
      '4K UHD @ 60 FPS (120 FPS support)',
      'Quick Resume',
      'Backward compatible',
      'Xbox Wireless Controller',
    ],
    slashedPrice: '550000',
    discountPercent: '-18%',
    price: '450000',
    rating: 5,
    categories: ['gaming', 'entertainment'],
  },
  {
    src: '/imgs/carneo.png',
    title: 'Carneo Smartwatch',
    description:
      'Stylish metal-cased smartwatch with heart-rate, SpO₂ & multi-sports tracking.',
    deliveryPeriod: '1–3 days',
    specs: [
      '1.3″ IPS touchscreen (240×240)',
      'HR & SpO₂ monitoring',
      '14 sport modes',
      'Up to 7 days battery',
      'IP67 water resistant',
    ],
    slashedPrice: '25000',
    discountPercent: '-20%',
    price: '20000',
    rating: 4,
    categories: ['smart watch'],
  },
  {
    src: '/imgs/godofwar.jpg',
    title: 'God of War PS5 Disc',
    description:
      'Physical PS5 game disc—Kratos embarks on a Norse mythology-inspired adventure.',
    deliveryPeriod: '2–4 days',
    specs: [
      'PS5 physical disc',
      '4K HDR support',
      'DualSense adaptive triggers',
      'Single-player action-adventure',
    ],
    price: '25000',
    rating: 5,
    categories: ['gaming', 'entertainment'],
  },
  {
    src: '/imgs/fc24.jpg',
    title: 'FC 24 PS5 Disc',
    description:
      'Latest FIFA on PS5, with HyperMotion2 and immersive stadium atmospheres.',
    deliveryPeriod: '2–4 days',
    specs: [
      'PS5 physical disc',
      'HyperMotion2 tech',
      'Ultimate Team & Career modes',
      'Next-gen gameplay',
    ],
    price: '30000',
    rating: 4,
    categories: ['gaming', 'entertainment'],
  },
  {
    src: '/imgs/oraimo.png',
    title: 'Oraimo Space Buds',
    description:
      'True wireless earbuds with 40 h playtime, fast-charge case, and ENC for calls.',
    deliveryPeriod: '1–3 days',
    specs: [
      'Bluetooth 5.2',
      '40 h total battery (with case)',
      'Fast-charge (10 min→3 h)',
      'Touch-control & ENC mic',
      'IPX4 splash resistant',
    ],
    slashedPrice: '20000',
    discountPercent: '-25%',
    price: '15000',
    rating: 4,
    categories: ['entertainment'],
  },
  {
    src: '/imgs/hisense.png',
    title: 'Hisense 43″ Smart TV',
    description:
      '43″ 4K UHD Android TV with HDR10, DTS Virtual:X, and built-in Google Assistant.',
    deliveryPeriod: '3–7 days',
    specs: [
      '43″ 4K UHD (3840×2160)',
      'Android TV OS',
      'HDR10 & HLG',
      'DTS Virtual:X audio',
      'Chromecast built in',
    ],
    slashedPrice: '250000',
    discountPercent: '-20%',
    price: '200000',
    rating: 4,
    categories: ['entertainment'],
  },
  {
    src: '/imgs/applewatchbasic.png',
    title: 'Classic Apple Watch',
    description:
      'Apple Watch SE features a Retina display, S5 SiP, advanced fitness tracking and fall detection.',
    deliveryPeriod: '1–3 days',
    specs: [
      '40 / 44 mm Retina LTPO OLED display',
      'Apple S5 dual-core processor',
      'Optical heart sensor & fall detection',
      'Swimproof (50 m)',
      'GPS + Cellular option',
      'Up to 18 h battery life',
    ],
    price: '150000',
    rating: 4,
    categories: ['smart watch'],
  },

  {
    src: '/imgs/applewatchseries7.png',
    title: 'Apple Watch Series 7',
    description:
      'Series 7 with Always-On Retina display, faster charging, blood O₂ & ECG apps, and robust crack resistance.',
    deliveryPeriod: '1–3 days',
    specs: [
      '41 / 45 mm Always-On Retina LTPO OLED display',
      'S7 SiP with 64-bit dual-core processor',
      'Blood Oxygen & ECG apps',
      'IP6X dust-resistant, WR50 water-resistant',
      'GPS + Cellular',
      'Up to 18 h battery; 33% faster charging',
    ],
    slashedPrice: '280000',
    discountPercent: '-10%',
    price: '252000',
    rating: 5,
    categories: ['smart watch'],
  },

  {
    src: '/imgs/applewatchultra2.png',
    title: 'Apple Watch Ultra 2',
    description:
      'Ultra 2 with 49 mm bright Always-On Retina, dual-frequency GPS, 36 h battery, and rugged titanium case.',
    deliveryPeriod: '2–4 days',
    specs: [
      '49 mm Always-On Retina LTPO OLED (2000 nits)',
      'S8 SiP dual-core processor',
      'Dual-frequency GPS & precision navigation',
      'Depth gauge & low-water temperature sensor',
      'WR100 water-resistant & MIL-STD-810H',
      'Up to 36 h normal / 60 h low-power battery',
    ],
    price: '650000',
    rating: 5,
    categories: ['smart watch'],
  },
];

// Fisher–Yates shuffle
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const products = shuffleArray(baseProducts);

export const getProductsByCategory = (category: Category): Product[] => {
  return products.filter((product) => product.categories.includes(category));
};

export const getProductByTitle = (title: string): Product | undefined => {
  return products.find(
    (product) => product.title.toLowerCase() === title.toLowerCase()
  );
};

export function getFlashSales(): Product[] {
  const discounted = products.filter((p) => p.discountPercent);
  return shuffleArray(discounted).slice(0, 8);
}

/**
 * A static list of the top 4 highest‐rated products that have no discount.
 */
export const bestsellers: Product[] = products
  .filter((p) => p.discountPercent == null) // no discount
  .sort((a, b) => b.rating - a.rating) // highest rating first
  .slice(0, 4); // take top 4
