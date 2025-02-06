(function() {
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

    function loadScript(url) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: `${url}?v=${new Date().getTime()}`,  // منع الكاش
            onload: function(response) {
                const script = document.createElement('script');
                script.textContent = response.responseText;
                document.head.appendChild(script);
            },
            onerror: function() {
                console.error(`فشل تحميل السكريبت من: ${url}`);
            }
        });
    }

    scripts.forEach(loadScript);
})();
