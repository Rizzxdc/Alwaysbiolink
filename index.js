const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// ===== BIO DATA =====
const bioData = {
  name: 'Always Rizz',
  bio: 'All Saluran Real Always Rizz ✦',
  logo: '/logo.jpg',
  links: [
    {
      id: 'saluran-info',
      title: 'Saluran Information Always Rizz',
      url: 'https://whatsapp.com/channel/0029VbCo5zqB4hdWoU88fV0S',
      icon: 'fa-solid fa-satellite',
      type: 'antenna'
    },
    {
      id: 'saluran-testimoni',
      title: 'Saluran All Testimoni Always Rizz',
      url: 'https://whatsapp.com/channel/0029Vb8BxGdD8SE1GiHCbu0g',
      icon: 'fa-solid fa-satellite',
      type: 'antenna'
    },
    {
      id: 'tiktok-utama',
      title: 'Akun Tiktok Utama Always Rizz',
      url: 'https://tiktok.com/@riz55761',
      icon: 'fa-brands fa-tiktok',
      type: 'tiktok'
    }
  ],
  social: [
    {
      name: 'WhatsApp',
      url: 'https://wa.me/6282113877157',
      icon: 'fa-brands fa-whatsapp',
      class: 'whatsapp'
    },
    {
      name: 'Telegram',
      url: 'https://t.me/AlwaysRizz',
      icon: 'fa-brands fa-telegram-plane',
      class: 'telegram'
    }
  ],
  menuItems: [
    {
      title: 'All Products by Always Rizz',
      icon: 'fa-solid fa-box',
      url: '/products'
    }
  ],
  footer: '© 2026 • Always Riz Official'
};

// ===== DATA PRODUCTS =====
const productsData = {
  products: [
    {
      id: 1,
      name: 'Product 1 - Always Rizz',
      icon: '📦',
      desc: 'Ini adalah produk pertama dari Always Rizz. Kualitas terbaik dengan harga terjangkau. Klik sub button di bawah untuk detail lebih lanjut.',
      price: 'Rp 50.000',
      subButtons: [
        { 
          name: 'Panel legal Ram 1gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 5.000', 
          icon: '📱', 
          label: 'Sub 1' 
        },
        { 
          name: 'Panel legal Ram 2gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 8.000', 
          icon: '💻', 
          label: 'Sub 2' 
        },
        { 
          name: 'Panel legal Ram 3gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 10.000', 
          icon: '🎮', 
          label: 'Sub 3' 
        },
        { 
          name: 'Panel legal Ram 4gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 13.000', 
          icon: '📷', 
          label: 'Sub 4' 
        },
        { 
          name: 'Panel Legal Ram 5gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 15.000', 
          icon: '🎵', 
          label: 'Sub 5' 
        },
        { 
          name: 'Panel legal Ram 6gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 17.000', 
          icon: '📚', 
          label: 'Sub 6' 
        },
        { 
          name: 'Panel legal Ram 7gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 20.000', 
          icon: '🏆', 
          label: 'Sub 7' 
        },
        { 
          name: 'Panel legal Ram 8gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 22.000', 
          icon: '⭐', 
          label: 'Sub 8' 
        },
        { 
          name: 'Panel legal Ram 9gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 25.000', 
          icon: '🔥', 
          label: 'Sub 9' 
        },
        { 
          name: 'Panel legal Ram 10gb', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 27.000', 
          icon: '💎', 
          label: 'Sub 10' 
        },
        { 
          name: 'Panel legal Ram Unlimited', 
          desc: 'Panel Legal full garansi dan selalu on anti lemot dan anti delay.', 
          price: 'Rp 30.000', 
          icon: '🚀', 
          label: 'Sub 11' 
        }
      ]
    }
  ]
};

// ===== ROUTES =====
// Halaman utama
app.get('/', (req, res) => {
  res.render('index', { bio: bioData });
});

// Halaman products
app.get('/products', (req, res) => {
  res.render('products', { products: productsData.products });
});

// Halaman detail product (default ke product pertama)
app.get('/product/:id?', (req, res) => {
  const id = parseInt(req.params.id) || 1;
  const product = productsData.products.find(p => p.id === id) || productsData.products[0];
  res.render('product-detail', { product });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📱 Bio Link: http://localhost:${PORT}/`);
  console.log(`📦 Products: http://localhost:${PORT}/products`);
});