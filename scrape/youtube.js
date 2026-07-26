const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function youtubeV2(url, format) {
    const yt = { title: null, image: null, format, download: null };

    const options = {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.7444.174 Mobile Safari/537.36',
            'referer': 'https://ytmp3.so/',
            'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    };

    try {
        let init = await fetch(
            `https://p.savenow.to/ajax/download.php?copyright=0&format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab23222`,
            options
        ).then(r => r.json());

        if (!init || !init.id) {
            throw new Error("Gagal inisialisasi. Coba video lain.");
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
    } catch (e) {
        throw e;
    }
}

module.exports = { youtubeV2 };