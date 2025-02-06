// المشكلة الرئيسية: تداخل الوظائف بين السكريبتات

// 1. تعديل السكريبت الرئيسي
// ==UserScript==
// @name         ردود احترافية متعددة - محسن
// @namespace    http://tampermonkey.net/
// @version      2.5
// @description  نسخة محسنة مع حل تداخل الوظائف
// @author       You
// @match        https://khamsat.com/community/requests*
// @grant        GM_xmlhttpRequest
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/titles_Cache.js
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Khamsat_Categories.js
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/requests.js
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Price_Analysis_Card.js
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Notes_Toggle.js
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Khamsat_Contact_and_Rating.js
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/comment_Text.js
// @require      https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/Smart_responses.js
// ==/UserScript==

(function() {
    'use strict';
    
    // منع تكرار تحميل Khamsat_Request_Expander
    if (window.requestExpanderLoaded) return;
    window.requestExpanderLoaded = true;

    // إضافة التنسيقات
    const styles = `
        .request-details-container { 
            width: 100%; 
            box-sizing: border-box; 
            padding: 10px; 
            background-color: #fff; 
        }
        .request-content-wrapper { 
            display: flex; 
            gap: 20px; 
        }
        .request-details { 
            flex: 6; 
            text-align: right; 
        }
        .request-comment-form { 
            flex: 4; 
        }
        .request-comment-form textarea { 
            width: 100%; 
            height: 100px; 
            box-sizing: border-box; 
            resize: vertical; 
            border: 1px solid #ccc; 
            border-radius: 4px; 
            padding: 8px; 
            margin-bottom: 8px; 
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

    // تحميل تفاصيل الطلب
    const loadRequestDetails = async (url) => {
        try {
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: resolve,
                    onerror: reject
                });
            });
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.responseText, 'text/html');
            
            return {
                body: doc.querySelector('.card-body article'),
                form: doc.querySelector('form#add_comment, #add_comment form')
            };
        } catch (error) {
            console.error('خطأ في تحميل التفاصيل:', error);
            throw error;
        }
    };

    // إضافة مستمع الأحداث للطلبات
    const initializeRequestListeners = () => {
        const posts = document.querySelectorAll('tr.forum_post');
        posts.forEach(attachClickListener);
    };

    // تشغيل السكريبت
    window.addEventListener('load', initializeRequestListeners);
})();
