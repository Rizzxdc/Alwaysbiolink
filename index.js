const express = require('express');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

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
// 2. HELPER FUNCTIONS (SCRAPERS) - TANPA VM
// ============================================================

// --- SCRAPER YOUTUBE ---
async function youtubeV2(url, format) {
    const yt = { title: null, image: null, format, download: null };

    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.174 Mobile Safari/537.36',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'referer': 'https://ytmp3.so/',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    };

    // STEP 1: INIT
    let init = await fetch(
        `https://p.savenow.to/ajax/download.php?copyright=0&format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab23222`,
        options
    ).then(r => r.json());

    if (!init || !init.id) {
        throw new Error("Gagal inisialisasi. Kualitas mungkin tidak tersedia.");
    }

    const id = init.id;
    yt.title = init.info?.title || "YouTube Video";
    yt.image = init.info?.image || "";

    let prog = await fetch(`https://p.savenow.to/api/progress?id=${id}`, options).then(r => r.json());

    let attempt = 0;
    while (prog.success === 0) {
        if (attempt > 30) break; 
        await new Promise(resolve => setTimeout(resolve, 1000));
        prog = await fetch(`https://p.savenow.to/api/progress?id=${id}`, options).then(r => r.json());
        if (prog.success === 1) break;
        attempt++;
    }

    yt.download = prog.download_url || null;
    return yt;
}

// --- SCRAPER INSTAGRAM (SEDERHANA) ---
async function savegram(url) {
    try {
        const response = await axios.get(`https://api.instagram.com/oembed?url=${encodeURIComponent(url)}`);
        return {
            title: response.data.title || 'Instagram Post',
            thumbnail: response.data.thumbnail_url || '',
            url_download: url
        };
    } catch (error) {
        // Fallback: return data sederhana
        return {
            title: 'Instagram Post',
            thumbnail: '',
            url_download: url
        };
    }
}

// ============================================================
// 3. ROUTES
// ============================================================

// Halaman utama
app.get('/', (req, res) => {
    res.render('index', { bio: bioData });
});

// Halaman products
app.get('/products', (req, res) => {
    res.render('products', { products: productsData.products });
});

// Halaman detail product
app.get('/product/:id?', (req, res) => {
    const id = parseInt(req.params.id) || 1;
    const product = productsData.products.find(p => p.id === id) || productsData.products[0];
    res.render('product-detail', { product });
});

// Halaman downloader
app.get('/downloader', (req, res) => {
    res.render('downloader');
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
    
    if (apikey !== 'FreeByFhkry') {
        return res.json({ status: false, error: "Apikey invalid" });
    }
    if (!url) {
        return res.json({ status: false, error: "Url missing" });
    }

    try {
        const response = await axios.post('https://www.tikwm.com/api/', 
            new URLSearchParams({ url: url, count: 12, cursor: 0, web: 1, hd: 1 })
        );
        const data = response.data.data;
        if (!data) throw new Error("Video not found");
        
        res.json({
            status: true,
            result: {
                author: data.author?.nickname || 'Unknown',
                username: data.author?.unique_id || 'unknown',
                caption: data.title || '',
                video: data.play || '',
                cover: data.cover || '',
                audio: data.music || '',
                images: data.images || []
            }
        });
    } catch (error) {
        console.error("TikTok Error:", error.message);
        res.json({ status: false, error: "Gagal mengambil data TikTok" });
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
        const result = await savegram(url);
        res.status(200).json({ 
            status: true, 
            result: [{
                thumbnail: result.thumbnail || '',
                url_download: result.url_download || url,
                kualitas: 'HD'
            }]
        });
    } catch (error) {
        console.error("Instagram Error:", error.message);
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

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📱 Bio Link: http://localhost:${PORT}/`);
    console.log(`📦 Products: http://localhost:${PORT}/products`);
    console.log(`⬇️ Downloader: http://localhost:${PORT}/downloader`);
});