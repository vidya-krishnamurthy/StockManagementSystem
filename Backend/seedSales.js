require('dotenv').config();
const mongoose = require('mongoose');
const Sale = require('./models/Sale');

const seedSales = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('Connected to MongoDB');

    const sampleSales = [
      {
        customer: 'VGP Cotton traders',
        pieces: 50,
        amount: 1500,
        date: '2024-04-08',
        yarnType: 'Cotton Dothi',
        address: '123 Cotton Street, Textile City, TC 12345',
        status: 'Delivered',
        phone: '9876543210',
        gstin: '22AAAAA0000A1Z5'
      },
      {
        customer: 'bull traders',
        pieces: 44,
        amount: 2200,
        date: '2024-05-09',
        yarnType: 'Silk Dothi',
        address: '456 Silk Avenue, Fabric Town, FT 54321',
        status: 'Shipped',
        phone: '8765432109',
        gstin: '33BBBBB0000B2Y4'
      },
      {
        customer: 'Textile World',
        pieces: 100,
        amount: 3500,
        date: '2024-06-10',
        yarnType: 'Velcro Dothi',
        address: '789 Poly Plaza, Fiber District, FD 67890',
        status: 'Delivered',
        phone: '7654321098',
        gstin: '44CCCCC0000C3X3'
      },
      {
        customer: 'Fabric Haven',
        pieces: 45,
        amount: 1800,
        date: '2024-07-11',
        yarnType: 'Silk Saree',
        address: '321 Wool Way, Knitville, KV 13579',
        status: 'Pending',
        phone: '6543210987',
        gstin: '55DDDDD0000D4W2'
      },
      {
        customer: 'Yarn Paradise',
        pieces: 120,
        amount: 4200,
        date: '2024-08-12',
        yarnType: 'Towels',
        address: '654 Nylon Lane, Weave City, WC 24680',
        status: 'Shipped',
        phone: '5432109876',
        gstin: '66EEEEE0000E5V1'
      },
      {
        customer: 'Stitch Masters',
        pieces: 75,
        amount: 2750,
        date: '2024-09-13',
        yarnType: 'Cotton Saree',
        address: '987 Thread Trail, Sewville, SV 97531',
        status: 'Delivered',
        phone: '4321098765',
        gstin: '77FFFFF0000F6U0'
      },
      {
        customer: 'Knit & Stitch',
        pieces: 62,
        amount: 3100,
        date: '2025-03-14',
        yarnType: 'Silk Dothi',
        address: '159 Pattern Path, Quiltown, QT 86420',
        status: 'Pending',
        phone: '3210987654',
        gstin: '88GGGGG0000G7T9'
      },
      {
        customer: 'The Yarn Barn',
        pieces: 50,
        amount: 1950,
        date: '2025-04-15',
        yarnType: 'Tissue Dothi',
        address: '753 Skein Street, Spintown, ST 75319',
        status: 'Delivered',
        phone: '2109876543',
        gstin: '99HHHHH0000H8S8'
      },
      {
        customer: 'Mega Textiles',
        pieces: 200,
        amount: 7500,
        date: '2024-10-05',
        yarnType: 'Silk Dothi',
        address: '888 Fabric Square, Mega City, MC 88888',
        status: 'Delivered',
        phone: '9999999999',
        gstin: '11MMMMM0000M9M9'
      },
      {
        customer: 'Bulk Yarn Importers',
        pieces: 300,
        amount: 10500,
        date: '2024-11-18',
        yarnType: 'Cotton Dothi',
        address: '999 Bulk Road, Import Town, IT 99999',
        status: 'Delivered',
        phone: '8888888888',
        gstin: '22BBBBB0000B8B8'
      }
    ];

    await Sale.deleteMany({});
    await Sale.insertMany(sampleSales);
    console.log('Sales data seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedSales();