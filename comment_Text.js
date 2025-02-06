// ==UserScript==
// @name         إظهار عدد التعليقات في خمسات (محسّن)
// @namespace    https://khamsat.com/
// @version      2.2
// @description  نسخة محسنة لعرض عدد التعليقات مع معالجة أفضل للأخطاء والتحقق من المستخدم
// @author       محمد
// @match        https://khamsat.com/community/requests*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const CONFIG = {
        MAX_CONCURRENT_REQUESTS: 3,
        RETRY_LIMIT: 3,
        RETRY_DELAY: 1000,
        LOAD_MORE_DELAY: 1500,
        AUTH_CHECK_INTERVAL: 5000
    };

    class CommentCounter {
        constructor() {
            this.cache = new Map();
            this.activeRequests = 0;
            this.requestQueue = [];
            this.authorized = false;
            this.retryCount = 0;
        }

        async init() {
            try {
                await this.checkAuthorization();
                if (this.authorized) {
                    this.setupObservers();
                    this.addStyles();
                    await this.updateComments();
                }
            } catch (error) {
                console.error('فشل في تهيئة السكريبت:', error);
                this.showError('حدث خطأ أثناء تهيئة السكريبت. يرجى تحديث الصفحة.');
            }
        }

        async checkAuthorization() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/fetch.json');
                if (!response.ok) throw new Error('فشل في جلب قائمة المستخدمين المصرح لهم');
                
                const data = await response.json();
                const username = this.getCurrentUsername();
                
                if (!username || !data.authorizedUsers.includes(username)) {
                    this.showError('غير مصرح لك باستخدام هذا السكريبت');
                    return false;
                }
                
                this.authorized = true;
                return true;
            } catch (error) {
                console.error('خطأ في التحقق من الصلاحية:', error);
                if (this.retryCount < CONFIG.RETRY_LIMIT) {
                    this.retryCount++;
                    await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY));
                    return this.checkAuthorization();
                }
                this.showError('فشل في التحقق من الصلاحية. يرجى المحاولة لاحقاً.');
                return false;
            }
        }

        getCurrentUsername() {
            const usernameElement = document.querySelector('a[href^="/user/"]');
            return usernameElement?.getAttribute('title')?.trim();
        }

        showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff4444;
                color: white;
                padding: 15px;
                border-radius: 5px;
                z-index: 9999;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            `;
            errorDiv.textContent = message;
            document.body.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 5000);
        }

        async processPost(post) {
            if (this.cache.has(post.href)) {
                this.appendCommentCount(post, this.cache.get(post.href));
                return;
            }

            try {
                const response = await fetch(post.href, { credentials: 'include' });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const text = await response.text();
                const doc = new DOMParser().parseFromString(text, 'text/html');
                const commentsElement = doc.querySelector('.card-header.bg-white h3');
                
                if (commentsElement) {
                    const count = parseInt(commentsElement.textContent.match(/\d+/)?.[0] || '0', 10);
                    this.cache.set(post.href, count);
                    this.appendCommentCount(post, count);
                }
            } catch (error) {
                console.error(`فشل في جلب التعليقات: ${post.href}`, error);
                if (!this.cache.has(post.href)) {
                    this.cache.set(post.href, '؟');
                    this.appendCommentCount(post, '؟');
                }
            }
        }

        appendCommentCount(post, count) {
            if (post.querySelector('.comments-count')) return;

            const countSpan = document.createElement('span');
            countSpan.className = 'comments-count';
            countSpan.textContent = ` (${count} ${count === 1 ? 'تعليق' : 'تعليقات'})`;
            post.appendChild(countSpan);
        }

        async updateComments() {
            const posts = document.querySelectorAll('td.details-td h3.details-head a.ajaxbtn:not([data-processed])');
            for (const post of posts) {
                post.setAttribute('data-processed', 'true');
                while (this.activeRequests >= CONFIG.MAX_CONCURRENT_REQUESTS) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                this.activeRequests++;
                await this.processPost(post);
                this.activeRequests--;
            }
        }

        setupObservers() {
            // مراقب التغييرات في DOM
            const observer = new MutationObserver(_.debounce(() => this.updateComments(), 500));
            const targetNode = document.querySelector('.community-posts-list');
            if (targetNode) {
                observer.observe(targetNode, { childList: true, subtree: true });
            }

            // مراقبة زر "عرض المزيد"
            const loadMoreButton = document.getElementById('community_loadmore_btn');
            if (loadMoreButton) {
                loadMoreButton.addEventListener('click', () => {
                    setTimeout(() => this.updateComments(), CONFIG.LOAD_MORE_DELAY);
                });
            }
        }

        addStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .comments-count {
                    color: #ff4500;
                    font-weight: bold;
                    margin-right: 5px;
                    font-size: 14px;
                }
                .comments-count:hover {
                    text-decoration: underline;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // تشغيل السكريبت
    window.addEventListener('load', () => {
        const counter = new CommentCounter();
        counter.init();
    });
})();
