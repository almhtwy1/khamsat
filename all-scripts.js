(async function() {
    const scripts = [
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/titles%20Cache.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/Khamsat%20Categories.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/requests.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Khamsat_Request_Expander.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/Price%20Analysis%20Card.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/Notes_Toggle.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/Khamsat%20Contact%20%26%20Rating.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/comment%20Text.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/Smart%20responses.js'
    ];

    for (const url of scripts) {
        try {
            const response = await fetch(`${url}?v=${Date.now()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const scriptText = await response.text();
            const scriptElement = document.createElement('script');
            scriptElement.textContent = scriptText;
            document.head.appendChild(scriptElement);
        } catch (error) {
            console.error(`فشل تحميل السكريبت من: ${url}`, error);
        }
    }
})();
