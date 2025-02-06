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

    scripts.forEach(url => {
        const script = document.createElement('script');
        script.src = `${url}?v=${new Date().getTime()}`;  // إضافة توقيع زمني لمنع الكاش
        script.type = 'text/javascript';
        script.async = false;
        document.head.appendChild(script);
    });
})();
