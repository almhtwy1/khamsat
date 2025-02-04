// ==UserScript==
// @name         Khamsat Notes Toggle
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  عرض جزء الملاحظات فقط مع إمكانية توسيع البطاقة عند النقر عليها وإضافة إشعار حفظ عصري وعلامة في حال وجود نص محفوظ مع أيقونة ورقة ملاحظات صفراء مميزة في قائمة الطلبات
// @author       Joe
// @match        https://khamsat.com/community/requests/*
// @match        https://khamsat.com/community/requests
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';
  
    const logError = (msg, error) => console.error(msg, error);
  
    const getRequestId = () => {
      try {
        const match = window.location.pathname.match(/\/community\/requests\/(\d+)-/);
        return (match && match[1]) || 'default';
      } catch (error) {
        logError('Error extracting request ID:', error);
        return 'default';
      }
    };
  
    const updateRequestListIcons = () => {
      document.querySelectorAll('a.ajaxbtn[href^="/community/requests/"]').forEach(link => {
        const match = link.getAttribute('href').match(/\/community\/requests\/(\d+)-/);
        if (match && match[1]) {
          const note = localStorage.getItem(`khamsat_note_${match[1]}`) || '';
          if (note.trim()) {
            const td = link.closest('td');
            if (td && !td.querySelector('.note-icon')) {
              const noteIcon = document.createElement('div');
              noteIcon.className = 'note-icon';
              noteIcon.innerHTML = `<svg style="color: #FFD700; font-size: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px"><path d="M4 2h14a2 2 0 012 2v14l-4-4H4a2 2 0 01-2-2V4a2 2 0 012-2z"/></svg>`;
              noteIcon.style.cssText = 'position:absolute;left:5px;top:50%;transform:translateY(-50%);cursor:pointer';
              td.style.position = 'relative';
              td.appendChild(noteIcon);
            }
          }
        }
      });
    };
  
    const initNoteFeature = async () => {
      try {
        const sidebar = document.querySelector('#community_sidebar');
        if (!sidebar) return;
  
        const lastCard = Array.from(sidebar.querySelectorAll('.card')).find(card => {
          const header = card.querySelector('.card-header');
          return header && header.textContent.includes('آخر المساهمات');
        });
        if (!lastCard) return;
  
        const requestId = getRequestId();
        const storageKey = `khamsat_note_${requestId}`;
  
        const noteCard = document.createElement('div');
        noteCard.className = 'card u-margin-bottom--large';
        noteCard.innerHTML = `
          <div class="card-header bg-white" id="toggleNote">
            الملاحظات <span id="noteIndicator" style="color: #16c516; display: none;">●</span>
          </div>
          <div class="card-body" style="display: none;">
            <textarea id="noteTextarea" style="width: 100%; height: 150px; resize: vertical;" placeholder="اكتب ملاحظاتك هنا..."></textarea>
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
              <button id="saveNoteBtn" class="c-button c-button--primary u-block@small">حفظ</button>
              <span id="saveNotification" style="display: none; color: green; font-weight: bold;">✔ تم الحفظ بنجاح</span>
            </div>
          </div>
        `;
        sidebar.insertBefore(noteCard, lastCard);
  
        const noteTextarea = noteCard.querySelector('#noteTextarea');
        const noteIndicator = noteCard.querySelector('#noteIndicator');
        noteTextarea.value = localStorage.getItem(storageKey) || '';
        noteIndicator.style.display = noteTextarea.value.trim() ? 'inline' : 'none';
  
        const saveNote = async () => {
          try {
            localStorage.setItem(storageKey, noteTextarea.value);
            const saveNotification = noteCard.querySelector('#saveNotification');
            saveNotification.style.display = 'inline';
            setTimeout(() => (saveNotification.style.display = 'none'), 2000);
            noteIndicator.style.display = noteTextarea.value.trim() ? 'inline' : 'none';
            updateRequestListIcons();
          } catch (error) {
            logError('Error saving note:', error);
            alert('حدث خطأ أثناء حفظ الملاحظات.');
          }
        };
  
        noteCard.querySelector('#saveNoteBtn').addEventListener('click', saveNote);
        noteCard.querySelector('#toggleNote').addEventListener('click', () => {
          const body = noteCard.querySelector('.card-body');
          body.style.display = body.style.display === 'none' ? 'block' : 'none';
        });
  
        updateRequestListIcons();
      } catch (error) {
        logError('Error initializing note feature:', error);
      }
    };
  
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', initNoteFeature)
      : initNoteFeature();
  })();
  