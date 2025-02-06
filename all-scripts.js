// all-scripts.js
(function() {
   'use strict';
   
   async function loadKhamsatScripts() {
       const baseUrl = 'https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/';
       
       const scripts = [
           {
               name: 'titles_Cache.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'titles_Cache.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'Khamsat_Categories.js', 
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'Khamsat_Categories.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'requests.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'requests.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'Khamsat_Request_Expander.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'Khamsat_Request_Expander.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'Price_Analysis_Card.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'Price_Analysis_Card.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'Notes_Toggle.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'Notes_Toggle.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'Khamsat_Contact_and_Rating.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'Khamsat_Contact_and_Rating.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'comment_Text.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'comment_Text.js',
                       onload: response => eval(response.responseText)
                   });
               }
           },
           {
               name: 'Smart_responses.js',
               load: async () => {
                   await GM_xmlhttpRequest({
                       method: 'GET',
                       url: baseUrl + 'Smart_responses.js',
                       onload: response => eval(response.responseText)
                   });
               }
           }
       ];

       // تحميل السكريبتات بالترتيب
       for (const script of scripts) {
           try {
               console.log(`Loading ${script.name}...`);
               await script.load();
               console.log(`${script.name} loaded successfully`);
           } catch (error) {
               console.error(`Error loading ${script.name}:`, error);
           }
       }
   }

   // تنفيذ التحميل
   loadKhamsatScripts().then(() => {
       console.log('All scripts loaded successfully');
   }).catch(error => {
       console.error('Error loading scripts:', error);
   });

})();
