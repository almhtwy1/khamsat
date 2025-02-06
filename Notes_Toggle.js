// ==UserScript==
// @name         Khamsat Notes Toggle with Auto-Save
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  عرض جزء الملاحظات مع الحفظ التلقائي وإمكانية توسيع البطاقة عند النقر عليها وإضافة إشعار حفظ عصري وعلامة في حال وجود نص محفوظ
// @author       Joe
// @match        https://khamsat.com/community/requests/*
// @match        https://khamsat.com/community/requests
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const initNoteFeature = async () => {
    try {
      const communitySidebar = document.querySelector('#community_sidebar');
      if (communitySidebar) {
        let lastActivityCard = null;
        const cards = communitySidebar.querySelectorAll('.card');
        cards.forEach((card) => {
          const header = card.querySelector('.card-header');
          if (header && header.textContent.includes('آخر المساهمات')) {
            lastActivityCard = card;
          }
        });

        if (lastActivityCard) {
          const noteCard = document.createElement('div');
          noteCard.className = 'card u-margin-bottom--large';
          noteCard.innerHTML = `
            <div class="card-header bg-white" id="toggleNote">الملاحظات <span id="noteIndicator" style="color: green; display: none;">●</span></div>
            <div class="card-body" style="display: none;">
              <textarea id="noteTextarea" style="width: 100%; height: 150px; resize: vertical;" placeholder="اكتب ملاحظاتك هنا..."></textarea>
              <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                <span id="saveNotification" style="display: none; color: green; font-weight: bold;">✔ تم الحفظ بنجاح</span>
              </div>
            </div>
          `;

          communitySidebar.insertBefore(noteCard, lastActivityCard);

          let requestId = 'default';
          try {
            const match = window.location.pathname.match(/\/community\/requests\/(\d+)-/);
            if (match && match[1]) {
              requestId = match[1];
            }
          } catch (err) {
            console.error('خطأ أثناء استخراج رقم الطلب:', err);
          }
          const storageKey = 'khamsat_note_' + requestId;

          const savedNote = localStorage.getItem(storageKey) || '';
          const noteTextarea = document.getElementById('noteTextarea');
          const noteIndicator = document.getElementById('noteIndicator');
          noteTextarea.value = savedNote;

          if (savedNote.trim() !== '') {
            noteIndicator.style.display = 'inline';
          }

          // إضافة متغير للتأخير
          let saveTimeout;

          const saveNote = async () => {
            try {
              localStorage.setItem(storageKey, noteTextarea.value);
              const saveNotification = document.getElementById('saveNotification');
              saveNotification.style.display = 'inline';
              setTimeout(() => {
                saveNotification.style.display = 'none';
              }, 2000);

              noteIndicator.style.display = noteTextarea.value.trim() !== '' ? 'inline' : 'none';
              updateRequestListIcons();
            } catch (error) {
              console.error('خطأ أثناء حفظ الملاحظات:', error);
              alert('حدث خطأ أثناء حفظ الملاحظات.');
            }
          };

          // إضافة مستمع حدث input للحفظ التلقائي
          noteTextarea.addEventListener('input', () => {
            // إلغاء المؤقت السابق إذا كان موجوداً
            clearTimeout(saveTimeout);
            // تعيين مؤقت جديد للحفظ بعد نصف ثانية من توقف الكتابة
            saveTimeout = setTimeout(saveNote, 500);
          });

          document.getElementById('toggleNote').addEventListener('click', function () {
            const cardBody = noteCard.querySelector('.card-body');
            cardBody.style.display = cardBody.style.display === 'none' ? 'block' : 'none';
          });
        }
      }

      const updateRequestListIcons = () => {
        const requestLinks = document.querySelectorAll('a.ajaxbtn[href^="/community/requests/"]');
        requestLinks.forEach(link => {
          const match = link.getAttribute('href').match(/\/community\/requests\/(\d+)-/);
          if (match && match[1]) {
            const requestId = match[1];
            const note = localStorage.getItem('khamsat_note_' + requestId);
            if (note && note.trim() !== '') {
              if (!link.closest('td').querySelector('.note-icon')) {
                // إنشاء حاوية للأيقونة والتلميح
                const iconContainer = document.createElement('div');
                iconContainer.className = 'note-icon-container';
                iconContainer.style.position = 'absolute';
                iconContainer.style.left = '5px';
                iconContainer.style.top = '50%';
                iconContainer.style.transform = 'translateY(-50%)';

                // إنشاء الأيقونة
                const noteIcon = document.createElement('div');
                noteIcon.className = 'note-icon';
                noteIcon.innerHTML = '<svg style="color: #FFD700; font-size: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px"><path d="M4 2h14a2 2 0 012 2v14l-4-4H4a2 2 0 01-2-2V4a2 2 0 012-2z"/></svg>';
                noteIcon.style.cursor = 'pointer';

                // إنشاء عنصر التلميح
                const tooltip = document.createElement('div');
                tooltip.className = 'note-tooltip';
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 4px;
                    font-size: 14px;
                    min-width: 200px;
                    max-width: 400px;
                    width: max-content;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    line-height: 1.5;
                    left: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    display: none;
                    z-index: 1000;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                `;
                tooltip.textContent = note;

                // إضافة event listeners للـ hover
                iconContainer.addEventListener('mouseenter', () => {
                    tooltip.style.display = 'block';
                });

                iconContainer.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });

                // تجميع العناصر
                iconContainer.appendChild(noteIcon);
                iconContainer.appendChild(tooltip);

                const parentTd = link.closest('td');
                parentTd.style.position = 'relative';
                parentTd.appendChild(iconContainer);
              }
            }
          }
        });
      };

      updateRequestListIcons();

    } catch (error) {
      console.error('خطأ في سكريبت تامبل مونكي:', error);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNoteFeature);
  } else {
    initNoteFeature();
  }
})();
