(async function() {
    const scripts = [
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Khamsat_Categories.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Khamsat_Contact_and_Rating.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Khamsat_Request_Expander.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Notes_Toggle.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Price_Analysis_Card.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Smart_responses.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/comment_Text.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/requests.js',
        'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/titles_Cache.js'
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
