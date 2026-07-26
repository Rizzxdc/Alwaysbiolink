const axios = require('axios');
const cheerio = require('cheerio');
const vm = require('vm');
const { URLSearchParams } = require('url');

async function savegram(url) {
    if (!url) throw new Error('Url required');
    const payload = new URLSearchParams({ url, action: 'post', lang: 'id' });
    
    try {
        const { data } = await axios.post('https://savegram.info/action.php', payload.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://savegram.info/id' }
        });
        
        if (typeof data !== 'string') throw new Error('Script error');
        
        let capturedHtml = '';
        const context = {
            window: { location: { hostname: 'savegram.info' } },
            pushAlert: () => {},
            gtag: () => {},
            document: { getElementById: (id) => { if (id === 'div_download') return { set innerHTML(html) { capturedHtml = html; } }; return { style: {}, remove: () => {} }; }, querySelector: () => ({ classList: { remove: () => {} } }) },
        };
        vm.createContext(context); new vm.Script(data).runInContext(context);
        
        if (!capturedHtml) throw new Error('Html empty');
        
        const $ = cheerio.load(capturedHtml);
        const out = [];

        $('.download-items').each((_, el) => {
            const item = $(el);
            const thumbnail = item.find('img').attr('src');
            const btn = item.find('.download-items__btn a');
            const downloadUrl = btn.attr('href');
            const btnText = btn.text().trim().toLowerCase();
            const isVideo = btnText.includes('video') || (downloadUrl && downloadUrl.includes('.mp4'));
            const type = isVideo ? 'video' : 'image';

            if (downloadUrl) {
                out.push({ 
                    thumbnail, 
                    url_download: downloadUrl,
                    type: type
                });
            }
        });
        
        if (!out.length) throw new Error('Media not found');
        return out;
    } catch (e) {
        throw e;
    }
}

module.exports = { savegram };