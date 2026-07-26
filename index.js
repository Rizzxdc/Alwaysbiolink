const express = require('express');
const path = require('path');
const axios = require('axios');

// ✅ Cara import yang benar - panggil dari folder scrape
const { youtubeV2 } = require('./scrape/youtube');
const { tiktokDownload } = require('./scrape/tiktok');
const { instagramDownload } = require('./scrape/instagram');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    },
    {
      title: 'Downloader',
      icon: 'fa-solid fa-download',
      url: '/downloader'
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

// ============================================================
// 3. ROUTES
// ============================================================

// --- Halaman Utama ---
app.get('/', (req, res) => {
    res.render('index', { bio: bioData });
});

// --- Halaman Products ---
app.get('/products', (req, res) => {
    res.render('products', { products: productsData.products });
});

// --- Halaman Detail Product ---
app.get('/product/:id?', (req, res) => {
    const id = parseInt(req.params.id) || 1;
    const product = productsData.products.find(p => p.id === id) || productsData.products[0];
    res.render('product-detail', { product });
});

// --- Halaman Downloader ---
app.get('/downloader', (req, res) => {
    res.render('downloader');
});

// --- Halaman Downloader per Platform ---
app.get('/downloader/instagram', (req, res) => {
    res.render('downloader-instagram');
});

app.get('/downloader/tiktok', (req, res) => {
    res.render('downloader-tiktok');
});

app.get('/downloader/youtube', (req, res) => {
    res.render('downloader-youtube');
});

app.get('/downloader/spotify', (req, res) => {
    res.render('downloader-spotify');
});

// ============================================================
// 4. API ENDPOINTS
// ============================================================

// --- API YOUTUBE ---
app.get('/api/download/youtube', async (req, res) => {
    const { apikey, url, type, quality } = req.query;

    if (apikey !== 'FreeByFhkry') {
        return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!url) {
        return res.json({ status: false, error: "Url is required" });
    }

    try {
        let targetFormat = "mp3";
        if (type === 'mp4') {
            if (!quality) {
                return res.json({ status: false, error: "Quality parameter is required for MP4!" });
            }
            targetFormat = quality;
        }

        const result = await youtubeV2(url, targetFormat);

        if (result.download) {
            res.json({
                status: true,
                creator: "Fhkryy",
                result: {
                    type: type || 'mp3',
                    quality: targetFormat,
                    title: result.title,
                    image: result.image,
                    download: result.download
                }
            });
        } else {
            throw new Error("Gagal generate link. Resolusi mungkin tidak tersedia.");
        }
    } catch (error) {
        console.error("YouTube Error:", error.message);
        res.status(500).json({ status: false, error: error.message });
    }
});

// --- API TIKTOK ---
app.get('/api/download/tiktok', async (req, res) => {
    const { apikey, url } = req.query;

    console.log('TikTok Request:', { apikey, url }); // Debug

    if (apikey !== 'FreeByFhkry') {
        return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!url) {
        return res.json({ status: false, error: "Url missing" });
    }

    try {
        console.log('Calling tiktokDownload...'); // Debug
        const result = await tiktokDownload(url);
        console.log('TikTok Result:', result.status); // Debug
        res.json(result);
    } catch (error) {
        console.error("TikTok API Error:", error.message);
        res.json({
            status: false,
            error: error.message || "Gagal mengambil data TikTok"
        });
    }
});

// --- API INSTAGRAM ---
app.get('/api/download/instagram', async (req, res) => {
    const { apikey, url } = req.query;

    if (apikey !== 'FreeByFhkry') {
        return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!url) {
        return res.json({ status: false, error: "Url missing" });
    }

    try {
        const result = await instagramDownload(url);
        res.status(200).json({
            status: true,
            result: [{
                thumbnail: result.thumbnail || '',
                url_download: result.url_download || url,
                kualitas: 'HD',
                title: result.title || 'Instagram Post',
                author: result.author || 'Unknown'
            }]
        });
    } catch (error) {
        console.error("Instagram API Error:", error.message);
        res.status(500).json({ status: false, error: error.message });
    }
});

// --- STREAM PROXY ---
app.get('/stream', async (req, res) => {
    const { url, ext } = req.query;
    if (!url) return res.status(400).send('Missing url');

    try {
        const response = await axios({
            method: 'GET',
            url: decodeURIComponent(url),
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://savegram.info/'
            }
        });

        res.setHeader('Content-Disposition', `attachment; filename="download.${ext || 'mp4'}"`);
        res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
        response.data.pipe(res);
    } catch (error) {
        console.error('Stream error:', error.message);
        res.status(500).send('Error downloading file');
    }
});

// ============================================================
// 5. START SERVER
// ============================================================
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📱 Bio Link: http://localhost:${PORT}/`);
    console.log(`📦 Products: http://localhost:${PORT}/products`);
    console.log(`⬇️ Downloader: http://localhost:${PORT}/downloader`);
    console.log(`📸 Instagram: http://localhost:${PORT}/downloader/instagram`);
    console.log(`🎵 TikTok: http://localhost:${PORT}/downloader/tiktok`);
    console.log(`▶️ YouTube: http://localhost:${PORT}/downloader/youtube`);
    console.log(`🎧 Spotify: http://localhost:${PORT}/downloader/spotify`);
});