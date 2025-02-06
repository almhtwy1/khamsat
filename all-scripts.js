// تحميل جميع السكريبتات المطلوبة
(async function loadScripts() {
    const scripts = [
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/titles_Cache.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/main/Khamsat_Categories.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/requests.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Price_Analysis_Card.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Notes_Toggle.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Khamsat_Contact_and_Rating.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/comment_Text.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Smart_responses.js'
    ];

    for (const url of scripts) {
        await new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(response) {
                    try {
                        eval(response.responseText);
                        resolve();
                    } catch (error) {
                        console.error(`Error loading script ${url}:`, error);
                        reject(error);
                    }
                },
                onerror: reject
            });
        });
    }
})();
