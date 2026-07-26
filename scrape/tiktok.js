const axios = require('axios');
const { URLSearchParams } = require('url');

async function tiktokDl(url) {
    try {
        const response = await axios.post('https://www.tikwm.com/api/', 
            new URLSearchParams({ 
                url: url, 
                count: 12, 
                cursor: 0, 
                web: 1, 
                hd: 1 
            })
        );
        const data = response.data.data;
        
        if (!data) throw new Error("Video not found / Private");

        // --- FIX: PASTIKAN URL ABSOLUT ---
        const domain = 'https://www.tikwm.com';
        
        let videoUrl = data.play;
        let musicUrl = data.music;
        let coverUrl = data.cover;

        // Jika url dimulai dengan '/', tambahkan domain
        if (videoUrl && !videoUrl.startsWith('http')) videoUrl = domain + videoUrl;
        if (musicUrl && !musicUrl.startsWith('http')) musicUrl = domain + musicUrl;
        if (coverUrl && !coverUrl.startsWith('http')) coverUrl = domain + coverUrl;

        // Handle Images (Slide)
        let images = [];
        if (data.images && Array.isArray(data.images)) {
            images = data.images.map(img => !img.startsWith('http') ? domain + img : img);
        }

        return {
            status: true,
            result: {
                author: data.author?.nickname || 'Unknown',
                unique_id: data.author?.unique_id || 'unknown',
                title: data.title || 'TikTok Video',
                video: videoUrl || '',
                cover: coverUrl || '',
                audio: musicUrl || '',
                images: images || [],
                duration: data.duration || 0,
                play_count: data.play_count || 0,
                like_count: data.digg_count || 0,
                comment_count: data.comment_count || 0,
                share_count: data.share_count || 0,
                download_count: data.download_count || 0,
                wmplay: data.wmplay ? (data.wmplay.startsWith('http') ? data.wmplay : domain + data.wmplay) : '',
                hdplay: data.hdplay ? (data.hdplay.startsWith('http') ? data.hdplay : domain + data.hdplay) : ''
            }
        };
    } catch (e) {
        console.error("TikTok Error:", e.message);
        throw new Error("Gagal mengambil data TikTok: " + e.message);
    }
}

module.exports = { tiktokDl };