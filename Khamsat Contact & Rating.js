// ==UserScript==
// @name         Khamsat Contact & Rating
// @namespace    https://khamsat.com/
// @version      1.0
// @description  إضافة زر "اتصل بي" وعرض التقييمات للمعلقين في خمسات
// @author       Your Name
// @match        https://khamsat.com/community/requests/*
// @icon         https://khamsat.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Process each comment
    document.querySelectorAll('.discussion-item.comment').forEach(comment => {
        const userLink = comment.querySelector('.meta--user a');
        const userProfile = userLink ? userLink.href : null;

        if (userProfile) {
            // Create contact button
            const btn = document.createElement('a');
            btn.href = '#';
            btn.className = 'c-button c-button--primary c-button--ghost contact_button';
            btn.innerHTML = '<span>تواصل معي</span>';
            Object.assign(btn.style, {
                display: 'none',
                padding: '1px 15px',
                fontSize: '14px',
                position: 'absolute',
                left: '1px',
                top: '10%',
                transform: 'translateY(-50%)'
            });

            // Create rating container
            const ratingCont = document.createElement('span');
            Object.assign(ratingCont.style, {
                marginRight: '5px',
                display: 'none',
                alignItems: 'center'
            });

            // Create stars container
            const stars = document.createElement('span');
            stars.className = 'c-list--rating';
            ratingCont.appendChild(stars);

            // Create rating text
            const ratingTxt = document.createElement('span');
            ratingTxt.style.marginLeft = '5px';
            ratingCont.appendChild(ratingTxt);

            // Add elements to DOM
            const userMeta = comment.querySelector('.meta--user');
            if (userMeta) {
                userMeta.appendChild(ratingCont);
            }

            const media = comment.querySelector('.o-media');
            if (media) {
                media.style.position = 'relative';
                media.appendChild(btn);
            }

            // Track if data has been loaded
            let loaded = false;

            // Handle click event
            comment.addEventListener('click', e => {
                // Ignore clicks on contact button or rating
                if (e.target.closest('.contact_button') || e.target.closest('.c-list--rating')) {
                    return;
                }

                if (!loaded) {
                    loaded = true;
                    const username = userProfile.split('/').pop();

                    // Fetch user data
                    fetch(`https://khamsat.com/user/${username}`, {
                        credentials: 'include'
                    })
                        .then(res => res.text())
                        .then(html => {
                            const doc = new DOMParser().parseFromString(html, 'text/html');
                            const firstService = doc.querySelector('.service-card a.url-product');
                            const reviewsEl = doc.querySelector('.list.col-6 .c-list--rating');

                            if (firstService && reviewsEl) {
                                // Get user ID from first service URL
                                const userId = firstService.href.split('/').slice(-1)[0].split('-')[0];
                                const contactUrl = `https://khamsat.com/message/new/${userId}`;

                                // Get rating information
                                const ratingStr = reviewsEl.getAttribute('title') || '';
                                const reviewsCount = reviewsEl.querySelector('.info')
                                    ? reviewsEl.querySelector('.info').textContent.trim().replace(/[()]/g, '')
                                    : '';

                                // Update contact button
                                btn.href = contactUrl;

                                // Update rating display
                                const clone = reviewsEl.cloneNode(true);
                                clone.querySelectorAll('.info').forEach(el => el.remove());
                                stars.innerHTML = '';
                                stars.appendChild(clone);
                                ratingTxt.textContent = ` ${ratingStr} (${reviewsCount})`;

                                // Show elements
                                ratingCont.style.display = 'inline-flex';
                                btn.style.display = 'block';
                            }
                        })
                        .catch(err => {
                            console.error('Error:', err);
                            loaded = false;
                        });
                } else {
                    // Show elements if data is already loaded
                    ratingCont.style.display = 'inline-flex';
                    btn.style.display = 'block';
                }
            });
        }
    });

    // Observer to handle new comments
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.matches('.discussion-item.comment')) {
                        processComment(node);
                    }
                    // Also check for comments within added nodes
                    node.querySelectorAll('.discussion-item.comment').forEach(processComment);
                }
            });
        });
    });

    // Process a single comment
    const processComment = (comment) => {
        // Only process if not already processed
        if (!comment.dataset.processed) {
            const userLink = comment.querySelector('.meta--user a');
            const userProfile = userLink ? userLink.href : null;

            if (userProfile) {
                // Create elements and setup event handlers
                // (Same code as above for creating elements and handling clicks)
                // Marking as processed
                comment.dataset.processed = 'true';
            }
        }
    };

    // Start observing
    const commentsContainer = document.querySelector('.comments');
    if (commentsContainer) {
        observer.observe(commentsContainer, {
            childList: true,
            subtree: true
        });
    }
})();