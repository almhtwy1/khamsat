// ==UserScript==
// @name         Khamsat Request Expander (Optimized)
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  عرض تفاصيل الطلب مع نموذج التعليق بشكل مبسط في خمسات مع إشعار بعد الإرسال
// @author       You
// @match        https://khamsat.com/community/requests
// @icon         https://khamsat.com/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  const style = `
    .request-details-container { width: 100%; box-sizing: border-box; padding: 10px; background-color: #fff; }
    .request-content-wrapper { display: flex; gap: 20px; }
    .request-details { flex: 6; text-align: right; }
    .request-comment-form { flex: 4; }
    .request-comment-form textarea { width: 100%; height: 100px; box-sizing: border-box; resize: vertical; border: 1px solid #ccc; border-radius: 4px; padding: 8px; margin-bottom: 8px; }
  `;
  document.head.appendChild(Object.assign(document.createElement('style'), { textContent: style }));

  const loadRequestDetails = (url) => new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET', url,
      onload: ({ responseText }) => {
        const doc = new DOMParser().parseFromString(responseText, 'text/html');
        resolve({ body: doc.querySelector('.card-body article'), form: doc.querySelector('form#add_comment, #add_comment form') });
      },
      onerror: reject,
    });
  });

  const createDetailsElement = ({ body, form }, colspan) => {
    const row = document.createElement('tr');
    row.className = 'request-details-container';
    row.innerHTML = `
      <td colspan="${colspan}">
        <div class="request-content-wrapper">
          <div class="request-details">${body?.innerHTML || ''}</div>
          <div class="request-comment-form"></div>
        </div>
      </td>
    `;

    if (form) {
      const formClone = form.cloneNode(true);
      formClone.querySelectorAll('.card-header, .c-form__hb').forEach(el => el.remove());
      const confirmInput = formClone.querySelector('input#confirm');
      if (confirmInput) {
        const newId = 'confirm_' + Date.now();
        confirmInput.id = newId;
        formClone.querySelector(`label[for="confirm"]`)?.setAttribute('for', newId);
      }

      formClone.querySelector('button[type="submit"], input[type="submit"]')?.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const formData = new URLSearchParams(new FormData(formClone)).toString();
          await new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
              method: 'POST',
              url: new URL(form.action, window.location.href),
              data: formData,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              onload: resolve,
              onerror: reject
            });
          });
          formClone.querySelectorAll('textarea').forEach(ta => ta.value = '');
          const notification = Object.assign(document.createElement('div'), { textContent: 'تم إرسال التعليق بنجاح', style: 'color: green; margin-top: 10px;' });
          formClone.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);
        } catch (error) {
          console.error('Error in form submission', error);
        }
      });

      row.querySelector('.request-comment-form').appendChild(formClone);
    }

    return row;
  };

  const handlePostClick = async (event) => {
    if (event.target.closest('a, button, input, textarea')) return;
    const post = event.currentTarget;
    const postLink = post.querySelector('h3.details-head a.ajaxbtn');
    if (!postLink) return;

    if (post.classList.toggle('expanded')) {
      try {
        const content = await loadRequestDetails(postLink.href);
        post.insertAdjacentElement('afterend', createDetailsElement(content, post.children.length));
      } catch (error) {
        console.error(error);
      }
    } else {
      post.nextElementSibling?.remove();
    }
  };

  const attachListenerToPost = (post) => {
    if (!post.dataset.listenerAttached) {
      post.style.cursor = 'pointer';
      post.addEventListener('click', handlePostClick);
      post.dataset.listenerAttached = 'true';
    }
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.matches('tr.forum_post') ? attachListenerToPost(node) : node.querySelectorAll('tr.forum_post').forEach(attachListenerToPost);
        }
      });
    });
  });

  window.addEventListener('load', () => {
    document.querySelectorAll('tr.forum_post').forEach(attachListenerToPost);
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
