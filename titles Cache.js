// ==UserScript==
// @name         titles Cache
// @namespace    https://khamsat.com/
// @version      1.0
// @description  اظهار مسمى المشتري
// @author       Your Name
// @match        https://khamsat.com/community/requests
// @icon         https://khamsat.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
  
    if (location.href.includes('/community/requests')) {
      const C = JSON.parse(localStorage.getItem('titlesCache') || '{}');
      const Q = [];
      let A = 0;
  
      async function pr(l, u) {
        A++;
        try {
          let s = await fetch(u, { credentials: 'include' });
          if (!s.ok) throw new Error();
          let t = await s.text(),
            p = new DOMParser().parseFromString(t, 'text/html'),
            d = p.querySelector('ul.details-list.pe-0 li');
          if (d) {
            let T = d.textContent.trim();
            C[u] = T;
            ad(l, T);
            localStorage.setItem('titlesCache', JSON.stringify(C));
          }
        } catch (e) {
          Q.push(() => pr(l, u));
        } finally {
          A--;
          pq();
        }
      }
  
      function ad(l, t) {
        if (!l.querySelector('.user-title')) {
          let s = document.createElement('span');
          s.textContent = ` (${t})`;
          s.style.color = '#007bff';
          s.style.fontWeight = 'bold';
          s.style.marginLeft = '5px';
          s.className = 'user-title';
          l.appendChild(s);
        }
      }
  
      function pq() {
        while (A < 5 && Q.length) Q.shift()();
      }
  
      function uT() {
        document.querySelectorAll('td.details-td ul.details-list li a.user').forEach(a => {
          let h = `https://khamsat.com${a.getAttribute('href')}`;
          C[h] ? ad(a, C[h]) : Q.push(() => pr(a, h));
        });
        pq();
      }
  
      window.addEventListener('load', uT);
    }
  })();
  