// ==UserScript==
// @name         عكس التعليقات ورفع التعليق
// @namespace    https://khamsat.com/
// @version      1.0
// @description  عكس التعليقات ورفع التعليق
// @author       Your Name
// @match        https://khamsat.com/community/requests/*
// @icon         https://khamsat.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
  
    if (location.href.includes('/community/requests')) {
      window.addEventListener('load', () => {
        let r = document.getElementById('post_replies');
        if (r) {
          let c = r.querySelector('.comments');
          if (c) {
            let m = c.querySelectorAll('.discussion-item.comment');
            if (m.length > 0) {
              let f = document.getElementById('add_comment');
              if (f) r.parentNode.insertBefore(f, r);
              Array.from(m)
                .sort((a, b) => parseInt(b.getAttribute('data-id')) - parseInt(a.getAttribute('data-id')))
                .forEach(e => c.appendChild(e));
            }
          }
        }
      });
    }
  })();
  