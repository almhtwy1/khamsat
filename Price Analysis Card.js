// ==UserScript==
// @name         Khamsat Price Analysis Card
// @namespace    https://khamsat.com/
// @version      1.0
// @description  إضافة تحليل أسعار لطلبات خمسات
// @author       Your Name
// @match        https://khamsat.com/community/requests/*
// @icon         https://khamsat.com/favicon.ico
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Return if we're on the main requests page
    if (location.pathname === '/community/requests' || location.pathname === '/community/requests/') {
        return;
    }

    // Create the price analysis card
    const createPriceCard = () => {
        const card = document.createElement('div');
        card.style.cssText = `
            width: 100%;
            max-width: 1000px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 15px;
            margin: 10px auto;
            border: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #2d3436;
            transition: all 0.3s ease;
        `;

        card.innerHTML = `
            <span style="display:flex;align-items:center;gap:5px;">
                <i class="fas fa-chart-line" style="color:#0984e3;"></i>
                <strong>تحليل الأسعار:</strong>
            </span>
            <span class="price-info" style="display:flex;gap:65px;">
                <span style="color:#636e72;">
                    <i class="fas fa-info-circle"></i> لم يتم تقديم أي سعر حتى الآن.
                </span>
            </span>
            <span style="color:#636e72;">
                <i class="fas fa-comment-dots"></i> تم تحليل <span class="comments-count">0</span> تعليق
            </span>
        `;

        return card;
    };

    // Insert the card into the page
    const insertPriceCard = () => {
        const target = document.querySelector('.card, .discussion-list-item');
        if (!target) return;

        const card = createPriceCard();
        target.parentNode.insertBefore(card, target);

        return {
            priceInfo: card.querySelector('.price-info'),
            commentsCount: card.querySelector('.comments-count')
        };
    };

    // Extract prices from text using regex
    const extractPrices = (text) => {
        const pattern = /(\d{1,5})[\s,]*(?:دولار|دولاراً|\$|USD|dollar)/gi;
        return [...text.matchAll(pattern)]
            .map(match => parseInt(match[1]))
            .filter(price => price > 0 && price <= 10000);
    };

    // Update price information in the card
    const updatePriceInfo = (elements) => {
        const comments = document.querySelectorAll('.discussion-item.comment, .comment-item');
        const prices = [];

        // Extract prices from all comments
        comments.forEach(comment => {
            const content = comment.querySelector('.reply_content, .comment-content')?.textContent;
            if (content) {
                prices.push(...extractPrices(content));
            }
        });

        // Update the price info display
        if (prices.length === 0) {
            elements.priceInfo.innerHTML = `
                <span style="color:#636e72;">
                    <i class="fas fa-info-circle"></i> لم يتم تقديم أي سعر حتى الآن.
                </span>
            `;
        } else {
            const min = Math.min(...prices);
            const max = Math.max(...prices);

            if (min === max) {
                elements.priceInfo.innerHTML = `
                    <span style="color:#0984e3;">
                        <i class="fas fa-tag"></i> السعر الموحد للخدمة هو <strong>${min}</strong> دولار.
                    </span>
                `;
            } else {
                elements.priceInfo.innerHTML = `
                    <span style="color:#00b894;margin-right:10px;">
                        <i class="fas fa-arrow-down"></i> أقل سعر: <strong>${min}</strong> دولار
                    </span>
                    <span style="color:#d63031;">
                        <i class="fas fa-arrow-up"></i> أعلى سعر: <strong>${max}</strong> دولار
                    </span>
                `;
            }
        }

        // Update comments count
        elements.commentsCount.textContent = comments.length;
    };

    // Initialize the price analysis card
    const initializePriceAnalysis = () => {
        // Insert card and get elements
        const elements = insertPriceCard();
        if (!elements) {
            setTimeout(initializePriceAnalysis, 1000);
            return;
        }

        // Initial update
        updatePriceInfo(elements);

        // Setup observer for comments changes
        const commentsContainer = document.getElementById('post_replies') || 
                                document.querySelector('.comments-list');
        
        if (commentsContainer) {
            const observer = new MutationObserver(() => updatePriceInfo(elements));
            observer.observe(commentsContainer, {
                childList: true,
                subtree: true
            });
        }
    };

    // Start after a short delay to ensure DOM is ready
    setTimeout(initializePriceAnalysis, 1000);
})();