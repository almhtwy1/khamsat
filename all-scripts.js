async function loadScripts() {
    const scripts = [
        'titles_Cache.js',
        'Khamsat_Categories.js', 
        'requests.js',
        'Khamsat_Request_Expander.js',
        'Price_Analysis_Card.js',
        'Notes_Toggle.js',
        'Khamsat_Contact_and_Rating.js',
        'comment_Text.js',
        'Smart_responses.js'
    ];

    const baseUrl = 'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/';
    
    for (const script of scripts) {
        await fetch(baseUrl + script)
            .then(response => response.text())
            .then(code => eval(code));
    }
}

loadScripts();
