const axios = require('axios');

/**
 * TikTok Scraper
 * Download video/audio dari TikTok tanpa watermark
 */

async function tiktokDownload(url) {
    try {
        const response = await axios.post('https://www.tikwm.com/api/',
            new URLSearchParams({
                url: url,
                count: 12,
                cursor: 0,
                web: 1,
                hd: 1
            }),
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const data = response.data.data;

        if (!data) {
            throw new Error("Video not found");
        }

        // Gunakan video URL tanpa watermark (wmplay) atau play
        let videoUrl = data.wmplay || data.play || '';

        // Jika videoUrl kosong, coba alternatif lain
        if (!videoUrl && data.video) {
            videoUrl = data.video;
        }

        return {
            status: true,
            result: {
                author: data.author?.nickname || 'Unknown',
                username: data.author?.unique_id || 'unknown',
                caption: data.title || 'TikTok Video',
                video: videoUrl,
                cover: data.cover || '',
                audio: data.music || '',
                images: data.images || [],
                duration: data.duration || 0,
                play_count: data.play_count || 0,
                like_count: data.digg_count || 0,
                comment_count: data.comment_count || 0,
                share_count: data.share_count || 0,
                download_count: data.download_count || 0,
                wmplay: data.wmplay || '',
                hdplay: data.hdplay || ''
            }
        };

    } catch (error) {
        console.error("TikTok Error:", error.message);
        throw new Error("Gagal mengambil data TikTok: " + error.message);
    }
}

// ✅ PASTIKAN EXPORT DENGAN CARA INI
module.exports = { tiktokDownload };