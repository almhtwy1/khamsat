// ==UserScript==
// @name         Khamsat Comment Count Fast Updater
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Faster update of comment counts for both initial and dynamically loaded topics
// @author       Joe
// @match        https://khamsat.com/community/requests*
// @grant        none
// ==/UserScript==

(async function () {
  'use strict';

  async function updateAnchor(anchor) {
    try {
      const href = anchor.getAttribute('href');
      const url = new URL(href, window.location.origin);
      console.log('Fetching:', url.href);

      const response = await fetch(url.href);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const header = doc.querySelector('div.card-header.bg-white h3');

      if (!header) {
        console.warn('Comment header not found for', url.href);
        return;
      }

      const match = header.textContent.match(/\((\d+)/);
      if (match) {
        const count = match[1];
        const span = anchor.querySelector('span.comments-count');
        if (span) {
          span.textContent = ` (${count} تعليقات)`;
        } else {
          const newSpan = document.createElement('span');
          newSpan.className = 'comments-count';
          newSpan.style.color = 'rgb(255, 69, 0)';
          newSpan.style.fontWeight = 'bold';
          newSpan.style.marginLeft = '5px';
          newSpan.textContent = ` (${count} تعليقات)`;
          anchor.appendChild(newSpan);
        }
      } else {
        console.warn('No comment count found in header for', url.href);
      }
    } catch (error) {
      console.error('Error processing anchor:', anchor, error);
    }
  }

  function processAnchors(root = document) {
    const anchors = root.querySelectorAll('a.ajaxbtn:not([data-processed])');
    anchors.forEach(anchor => {
      anchor.setAttribute('data-processed', 'true');
      updateAnchor(anchor);
    });
  }

  // Process initial anchors concurrently
  processAnchors();

  // MutationObserver to handle dynamically added topics
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.matches && node.matches('a.ajaxbtn:not([data-processed])')) {
          node.setAttribute('data-processed', 'true');
          updateAnchor(node);
        } else {
          processAnchors(node);
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Optional: Listen for the "عرض المواضيع الأقدم" button click to process new topics faster
  const loadMoreButton = document.getElementById('community_loadmore_btn');
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', () => {
      // Delay to allow new content to be inserted into DOM
      setTimeout(() => processAnchors(), 500);
    });
  }
})();
