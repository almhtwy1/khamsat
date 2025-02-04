// ==UserScript==
// @name         Khamsat Request Expander
// @namespace    https://khamsat.com/
// @version      1.0
// @description  توسيع تفاصيل طلبات خمسات مع إمكانية الرد السريع
// @author       Your Name
// @match        https://khamsat.com/community/requests*
// @icon         https://khamsat.com/favicon.ico
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Add styles
    const styleTxt = `
.request-details-container { width: 100%; box-sizing: border-box; padding: 10px; background-color: #fff; }
.request-content-wrapper { display: flex; gap: 20px; }
.request-details { flex: 6; text-align: right; }
.request-comment-form { flex: 4; }
.request-comment-form textarea { width: 100%; height: 100px; box-sizing: border-box; resize: vertical; border: 1px solid #ccc; border-radius: 4px; padding: 8px; margin-bottom: 8px; }
`;
    const sEl = document.createElement('style');
    sEl.textContent = styleTxt;
    document.head.appendChild(sEl);

    // Load request details
    const loadDetails = url =>
        new Promise((res, rej) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                onload: ({ responseText }) => {
                    const doc = new DOMParser().parseFromString(responseText, 'text/html');
                    res({ body: doc.querySelector('.card-body article'), form: doc.querySelector('form#add_comment, #add_comment form') });
                },
                onerror: rej,
            });
        });

    // Create details row
    const createDetailsRow = (data, colspan) => {
        const row = document.createElement('tr');
        row.className = 'request-details-container';
        row.innerHTML = `<td colspan="${colspan}">
  <div class="request-content-wrapper">
    <div class="request-details">${data.body?.innerHTML || ''}</div>
    <div class="request-comment-form"></div>
  </div>
</td>`;
        if (data.form) {
            const fClone = data.form.cloneNode(true);
            fClone.querySelectorAll('.card-header, .c-form__hb').forEach(el => el.remove());
            const confirmInput = fClone.querySelector('input#confirm');
            if (confirmInput) {
                const newId = 'confirm_' + Date.now();
                confirmInput.id = newId;
                fClone.querySelector(`label[for="confirm"]`)?.setAttribute('for', newId);
            }
            fClone.querySelector('button[type="submit"], input[type="submit"]')?.addEventListener('click', async e => {
                e.preventDefault();
                try {
                    const formData = new URLSearchParams(new FormData(fClone)).toString();
                    await new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: 'POST',
                            url: new URL(data.form.action, window.location.href).toString(),
                            data: formData,
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            onload: resolve,
                            onerror: reject
                        });
                    });
                    fClone.querySelectorAll('textarea').forEach(ta => ta.value = '');
                    const note = document.createElement('div');
                    note.textContent = 'تم إرسال التعليق بنجاح';
                    note.style.cssText = 'color: green; margin-top: 10px;';
                    fClone.appendChild(note);
                    setTimeout(() => note.remove(), 3000);
                } catch (error) {
                    console.error('Error in form submission', error);
                }
            });
            row.querySelector('.request-comment-form').appendChild(fClone);
        }
        return row;
    };

    // Handle post click
    const handlePostClick = async e => {
        if (e.target.closest('a, button, input, textarea')) return;
        const post = e.currentTarget,
            link = post.querySelector('h3.details-head a.ajaxbtn');
        if (!link) return;
        if (post.classList.toggle('expanded')) {
            try {
                const data = await loadDetails(link.href);
                post.insertAdjacentElement('afterend', createDetailsRow(data, post.children.length));
            } catch (error) {
                console.error(error);
            }
        } else {
            post.nextElementSibling?.remove();
        }
    };

    // Attach listener to post
    const attachListener = post => {
        if (!post.dataset.listenerAttached) {
            post.style.cursor = 'pointer';
            post.addEventListener('click', handlePostClick);
            post.dataset.listenerAttached = 'true';
        }
    };

    // Initialize mutation observer
    const observer = new MutationObserver(mutations => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    node.matches('tr.forum_post') ? attachListener(node) : node.querySelectorAll('tr.forum_post').forEach(attachListener);
                }
            });
        });
    });

    // Initialize script
    window.addEventListener('load', () => {
        document.querySelectorAll('tr.forum_post').forEach(attachListener);
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();