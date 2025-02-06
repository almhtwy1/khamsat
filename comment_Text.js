// ==UserScript==
// @name         إظهار عدد التعليقات بجانب العنوان في خمسات (محسن)
// @namespace    https://khamsat.com/
// @version      2.1
// @description  يعرض عدد التعليقات بجانب العنوان في صفحة الطلبات في خمسات ويعمل حتى بعد الضغط على "عرض المواضيع الأقدم" بدون تخزين محلي. محسّن للتحكم في عدد الطلبات وتحسين الأداء.
// @author       محمد
// @match        https://khamsat.com/community/requests*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // إعدادات التحكم في الطلبات
    const MAX_CONCURRENT_REQUESTS = 5; // الحد الأقصى للطلبات الموازية
    const RETRY_LIMIT = 3; // عدد مرات إعادة المحاولة في حال فشل الطلب

    // جلب قائمة اليوزرات المصرح لهم من ملف JSON خارجي
    const authorizedUsersUrl = "https://raw.githubusercontent.com/almhtwy1/khamsat/refs/heads/main/fetch.json";
    let authorizedUsers = [];

    fetch(authorizedUsersUrl)
        .then(response => response.json())
        .then(data => {
            authorizedUsers = data.authorizedUsers;
            checkUserAuthorization();
        })
        .catch(error => {
            console.error("فشل جلب قائمة اليوزرات:", error);
        });

    // التحقق من إذا كان المستخدم مصرح له
    function checkUserAuthorization() {
        const usernameLink = document.querySelector('a[href="/user/almhtwy"]'); // تحديد الرابط الذي يحتوي على اسم المستخدم
        if (usernameLink === null) {
            alert("أنت غير مصرح لك باستخدام السكربت!");
            return; // إنهاء السكربت إذا لم يتم العثور على الرابط
        }

        const username = usernameLink.title; // الحصول على اسم المستخدم من خاصية title في الرابط

        if (!authorizedUsers.includes(username)) {
            alert("أنت غير مصرح لك باستخدام السكربت!");
            return; // إنهاء السكربت إذا كان اسم المستخدم غير مصرح له
        }

        // تنفيذ باقي السكربت بعد التحقق من المستخدم المصرح له
        startScript();
    }

    function startScript() {
        // كاش لتخزين عدد التعليقات
        const commentCache = {};

        // قائمة انتظار الطلبات
        let requestQueue = [];
        let activeRequests = 0;

        // دالة لإضافة تعليق عدد التعليقات إلى المنشور
        function appendCommentCount(post, count) {
            const existingSpan = post.querySelector('.comments-count');
            if (existingSpan) return; // تجنب إضافة نفس العدد مرتين

            const commentText = count === '1' ? 'تعليق' : 'تعليقات';
            const countSpan = document.createElement('span');
            countSpan.textContent = ` (${count} ${commentText})`;
            countSpan.style.color = '#ff4500'; // لون مميز
            countSpan.style.fontWeight = 'bold';
            countSpan.style.marginLeft = '5px';
            countSpan.classList.add('comments-count');
            post.appendChild(countSpan);
        }

        // دالة لمعالجة طلب واحد مع إعادة المحاولة
        async function processRequest(post, retries = 0) {
            activeRequests++;
            try {
                const response = await fetch(post.href, { credentials: 'include' });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const text = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const commentsElement = doc.querySelector('.card-header.bg-white h3');
                if (commentsElement) {
                    const match = commentsElement.textContent.trim().match(/\d+/);
                    if (match) {
                        const count = parseInt(match[0], 10);
                        commentCache[post.href] = count;
                        appendCommentCount(post, count);
                    }
                }
            } catch (error) {
                if (retries < RETRY_LIMIT) {
                    console.warn(`محاولة إعادة الطلب للمنشور: ${post.href} (محاولة ${retries + 1})`);
                    requestQueue.push(() => processRequest(post, retries + 1));
                } else {
                    console.error(`فشل جلب عدد التعليقات للمنشور: ${post.href}`, error);
                }
            } finally {
                activeRequests--;
                processQueue();
            }
        }

        // دالة لمعالجة قائمة الانتظار
        function processQueue() {
            while (activeRequests < MAX_CONCURRENT_REQUESTS && requestQueue.length > 0) {
                const request = requestQueue.shift();
                request();
            }
        }

        // دالة لتحديث عدد التعليقات
        function updateComments() {
            const posts = document.querySelectorAll('td.details-td h3.details-head a.ajaxbtn');
            posts.forEach(post => {
                if (post.querySelector('.comments-count')) return;

                if (commentCache[post.href] !== undefined) {
                    appendCommentCount(post, commentCache[post.href]);
                } else {
                    requestQueue.push(() => processRequest(post));
                }
            });
            processQueue();
        }

        // دالة لـ Debouncing لتقليل عدد مرات التنفيذ
        function debounce(func, delay) {
            let debounceTimer;
            return function () {
                const context = this;
                const args = arguments;
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => func.apply(context, args), delay);
            };
        }

        const debouncedUpdateComments = debounce(updateComments, 500);

        // مراقبة التغييرات في الـ DOM باستخدام MutationObserver
        function setupMutationObserver() {
            const targetNode = document.querySelector('.community-posts-list');
            if (!targetNode) {
                console.error('لم يتم العثور على العنصر .community-posts-list');
                return;
            }

            const observerOptions = {
                childList: true,
                subtree: true
            };

            const observer = new MutationObserver((mutationsList) => {
                for (let mutation of mutationsList) {
                    if (mutation.addedNodes.length) {
                        debouncedUpdateComments();
                        break; // لا حاجة لمواصلة الفحص بعد العثور على إضافة
                    }
                }
            });

            observer.observe(targetNode, observerOptions);
        }

        // إضافة عدد التعليقات عند النقر على زر "عرض المواضيع الأقدم"
        function setupLoadMoreButton() {
            const loadMoreButton = document.getElementById('community_loadmore_btn');
            if (!loadMoreButton) {
                console.error('لم يتم العثور على زر "عرض المواضيع الأقدم"');
                return;
            }

            loadMoreButton.addEventListener('click', () => {
                // تأخير لتأكد من تحميل المنشورات الجديدة
                setTimeout(() => {
                    debouncedUpdateComments();
                }, 1000);
            });
        }

        // إضافة أنماط CSS لتحسين العرض
        function addStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .comments-count {
                    font-size: 14px;
                    margin-left: 5px;
                }
                .comments-count:hover {
                    text-decoration: underline;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
        }

        // تهيئة السكريبت عند تحميل الصفحة
        window.addEventListener('load', () => {
            addStyles();
            updateComments();
            setupMutationObserver();
            setupLoadMoreButton();
        });
    }
})();
