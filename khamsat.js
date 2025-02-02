// ==UserScript==
// @name         khamsat.js
// @namespace    https://khamsat.com/
// @version      3.6
// @description  دمج السكربتات الخاصة بتحسين تجربة خمسات مع عرض تحليل الأسعار داخل المواضيع فقط دون الظهور في صفحة الطلبات الرئيسية. التعديلات الجديدة تشمل تحميل التقييم وزر "تواصل معي" عند النقر فقط.
// @author
// @match        https://khamsat.com/purchase/*
// @match        https://khamsat.com/community/requests*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=khamsat.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js
// @updateURL    https://raw.githubusercontent.com/almhtwy1/khamsat/main/khamsat.js
// @downloadURL  https://raw.githubusercontent.com/almhtwy1/khamsat/main/khamsat.js
// ==/UserScript==

(function () {
  'use strict';

  //--- نقل نموذج التعليق وفرز التعليقات في /purchase/
  if (location.href.includes('/purchase/')) {
    let f = document.querySelector('.comment-form'),
      c = document.querySelector('.card-body .comments');
    if (f && c) {
      c.insertAdjacentElement('beforebegin', f);
      let m = Array.from(document.querySelectorAll('.discussion-item.comment'));
      m.sort((a, b) => parseInt(b.getAttribute('data-id')) - parseInt(a.getAttribute('data-id'))).forEach(e => c.appendChild(e));
    }
  }

  //--- في /community/requests
  if (location.href.includes('/community/requests')) {
    // فرز التعليقات ونقل نموذج التعليق لأعلى (إن وجد)
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

    // إظهار عدد التعليقات بجانب العنوان
    (function () {
      let M = 5,
        R = 3,
        CC = {},
        Q = [],
        A = 0,
        d = (f, t) => {
          let n;
          return (...a) => {
            clearTimeout(n);
            n = setTimeout(() => f(...a), t);
          };
        },
        deb = d(uC, 500);

      function ap(p, c) {
        if (!p.querySelector('.comments-count')) {
          let s = document.createElement('span');
          s.textContent = ` (${c} ${c == 1 ? 'تعليق' : 'تعليقات'})`;
          s.style.color = '#ff4500';
          s.style.fontWeight = 'bold';
          s.style.marginLeft = '5px';
          s.className = 'comments-count';
          p.appendChild(s);
        }
      }

      async function pr(p, r = 0) {
        A++;
        try {
          let d = await fetch(p.href, { credentials: 'include' });
          if (!d.ok) throw new Error();
          let t = await d.text(),
            z = new DOMParser().parseFromString(t, 'text/html'),
            x = z.querySelector('.card-header.bg-white h3');
          if (x) {
            let m = x.textContent.trim().match(/\d+/);
            if (m) {
              let c = parseInt(m[0], 10);
              CC[p.href] = c;
              ap(p, c);
            }
          }
        } catch (e) {
          if (r < R) Q.push(() => pr(p, r + 1));
        } finally {
          A--;
          pq();
        }
      }

      function pq() {
        while (A < M && Q.length) Q.shift()();
      }

      function uC() {
        document.querySelectorAll('td.details-td h3.details-head a.ajaxbtn').forEach(p => {
          if (!p.querySelector('.comments-count')) {
            CC[p.href] !== undefined ? ap(p, CC[p.href]) : Q.push(() => pr(p));
          }
        });
        pq();
      }

      function mo() {
        let n = document.querySelector('.community-posts-list');
        if (!n) return;
        new MutationObserver(m => {
          for (let i of m) if (i.addedNodes.length) {
            deb();
            break;
          }
        }).observe(n, { childList: true, subtree: true });
      }

      function lmb() {
        let b = document.getElementById('community_loadmore_btn');
        if (!b) return;
        b.addEventListener('click', () => setTimeout(() => deb(), 1000));
      }

      function st() {
        let s = document.createElement('style');
        s.textContent = '.comments-count{font-size:14px;margin-left:5px;cursor:pointer;}';
        document.head.appendChild(s);
      }

      window.addEventListener('load', () => {
        st();
        uC();
        mo();
        lmb();
      });
    })();

    // إظهار مسمى المشتري بجانب الاسم
    (function () {
      let M = 5,
        R = 3,
        D = 500,
        C = JSON.parse(localStorage.getItem('titlesCache') || '{}'),
        Q = [],
        A = 0,
        sv = () => localStorage.setItem('titlesCache', JSON.stringify(C)),
        deb = (f, t) => {
          let n;
          return (...a) => {
            clearTimeout(n);
            n = setTimeout(() => f(...a), t);
          };
        },
        du = deb(uT, D);

      async function pr(l, u, r = 0) {
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
            sv();
          }
        } catch (e) {
          if (r < R) Q.push(() => pr(l, u, r + 1));
        } finally {
          A--;
          pq();
        }
      }

      function pq() {
        while (A < M && Q.length) Q.shift()();
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

      function uT() {
        document.querySelectorAll('td.details-td ul.details-list li a.user').forEach(a => {
          let h = `https://khamsat.com${a.getAttribute('href')}`;
          C[h]
            ? ad(a, C[h])
            : (
                a.querySelector('.user-title-loading') ||
                (function () {
                  let s = document.createElement('span');
                  s.textContent = ' (جارٍ التحميل...)';
                  s.style.color = '#6c757d';
                  s.style.fontStyle = 'italic';
                  s.style.marginLeft = '5px';
                  s.className = 'user-title-loading';
                  a.appendChild(s);
                })(),
                Q.push(() => pr(a, h))
              );
        });
        pq();
      }

      function mo() {
        let n = document.querySelector('.community-posts-list');
        if (!n) return;
        new MutationObserver(m => {
          for (let i of m) if (i.addedNodes.length) {
            du();
            break;
          }
        }).observe(n, { childList: true, subtree: true });
      }

      function lmb() {
        let b = document.getElementById('community_loadmore_btn');
        if (!b) return;
        b.addEventListener('click', () =>
          setTimeout(() => du(), 1000)
        );
      }

      function st() {
        let s = document.createElement('style');
        s.textContent = '.user-title{font-size:14px}.user-title-loading{font-size:14px}';
        document.head.appendChild(s);
      }

      window.addEventListener('load', () => {
        st();
        uT();
        mo();
        lmb();
      });
    })();

    // تصنيفات محسّنة
    (function () {
      let D = 300,
        cC = 'الكل',
        cats = {
          تصميم: { k: ['تصميم','مصممه','مصمم','لوغو','canva','شعارات','هوية','جرافيك','شعار','تصاميم','صور','صوره','صورة','تيكتوك','بوستات','بوست','مسوقين','مسوق','سوشيال','مصممين','كانفا','ui','ux','بوستر','غلاف','بروشور','بانر','هوية بصرية','انفوجرافيك','بروفايل','اليستريتور','فوتوشوب','عرض بوربوينت','بوث','مخطط مفاهيم','مصمم ويب'], i: 'fa-palette', c: '#17a2b8' },
          كتابة: { k: ['كتابة','لكتابة','لكتابه','ترجمة','محتوى','مقالات','كاتب','تأليف','مدونة','نص','سيناريو','سيو','تلخيص','سيرة ذاتية','بحث','تدقيق','تحرير','صياغة','تنسيق','بحث أكاديمي','مراجعة'], i: 'fa-pen', c: '#6610f2' },
          تسويق: { k: ['تسويق','تسويقي','اعلان','حملات','ads','seo','marketing','فيسبوك','انستقرام','سناب','التسويق','الإعلانية','للتسويق','ادارة حسابات','براند','مبيعات','ترويج','جوجل أدز','ادسنس','حملات ممولة','cpa','bing','استراتيجية','guest post','تسويق عقاري','سوشيال ميديا','تيك توك'], i: 'fa-bullhorn', c: '#ffc107' },
          برمجة: { k: ['برمجة','تطوير','موقع','مواقع','تطبيق','تطبيقات','tabby','متجر','اندرويد','ios','wordpress','بوت','مبرمج','php','ويب','فايرفوكس','قوقل','متصفح','ايفون','أيفون','chrome','extension','بايثون','js','تكويد','فلاتر','لارافل','HTML','CSS','JavaScript','Objective-C','Xcode','Websocket','API','Frontend','Backend','SQL','VB.NET','Postgres','Supabase','ريسكين','Figma'], i: 'fa-code', c: '#28a745' },
          فيديو: { k: ['فيديو','موشن','مونتاج','انيميشن','الفيديو','انترو','تحريك','animation','edit','اخراج','مونتير','تعديل ألوان','Video','فلاتر','ترانزيشن','إخراج سينمائي','تحرير فيديو','إعلان مصوَّر','Videographer'], i: 'fa-video', c: '#dc3545' },
          هندسة: { k: ['هندسة','معمار','مدني','خريطة','ميكانيكي','معماري','مخطط','مهندس','مشروع هندسي','خرائط','تصميم داخلي','ديكور','أوتوكاد','ريفيت','3ds Max','SketchUp','مخطط سلامة','ديناميكا حرارية','هندسي'], i: 'fa-building', c: '#8e44ad' },
          أعمال: { k: ['اعمال','ادارة','محاسبة','مالية','قانونية','دراسة جدوى','خطة عمل','مشروع','وظائف','موظف','سكرتير','موظفين','مندوب','تمويل','تسعير','مبيعات (من جانب البيزنس)','إدارة مشاريع','موارد بشرية'], i: 'fa-briefcase', c: '#fd7e14' },
          صوتيات: { k: ['صوت','تعليق','موسيقى','هندسة صوت','تلحين','فويس','اغنية','إنشاد','إنشودة','انشودة','إلقاء','فويس أوفر','صوتي','دبلجة','بودكاست'], i: 'fa-microphone', c: '#FF80AB' },
          تعليم: { k: ['تعليم','الواجب','تدريب','دروس','مدرس','حل واجبات','كورس','معلم','قرآن','دورات','شرح','آيلتس','تدريس','خصوصي','منصة تعليمية','التعلم','معلمة','تعليم','اختبارات','مساعدة واجبات','أكاديمي'], i: 'fa-chalkboard-teacher', c: '#FA8072' },
          بيانات: { k: ['بيانات','البيانات','ادخال','تنظيف','تحليل','جمع','scraping','اكسل','pdf','sql','database','جوجل شيت','SharePoint','VBA','جدول ديناميكي','تنسيق ملفات','دمج بيانات','Pivot','CSV'], i: 'fa-database', c: '#FF6347' },
          'أسلوب حياة': { k: ['حياة','لياقة','ارشاد','استشارة','طبخ','صحة','هواية','ترفيه','شخصي','رشاقة','جمال','موضة','نصائح','عناية','وصفات طبخ','تخسيس'], i: 'fa-heart', c: '#20B2AA' },
          أخرى: { k: [], i: 'fa-folder-open', c: '#6c757d' }
        };

      Object.values(cats).forEach(v => {
        if (v.k.length)
          v.regex = new RegExp(
            `(?:^|\\s)(${v.k.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?:\\s|$)`,
            'i'
          );
      });

      let db = (f, d) => {
          let t;
          return (...a) => (clearTimeout(t), (t = setTimeout(() => f(...a), d)));
        },
        dd = db(ai, D);

      function fa() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
          let l = document.createElement('link');
          l.rel = 'stylesheet';
          l.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
          document.head.appendChild(l);
        }
      }

      function ic(n) {
        let o = cats[n],
          i = document.createElement('i');
        i.className = `fas ${o.i}`;
        i.title = n;
        i.style = `color:${o.c};font-size:16px`;
        return i;
      }

      function ai() {
        document.querySelectorAll('#forums_table tr.forum_post:not([data-categorized])').forEach(r => {
          let t = r.querySelector('.details-td h3 a');
          if (!t) return;
          let x = t.textContent.toLowerCase(),
            m = Object.entries(cats)
              .filter(([n, v]) => n !== 'أخرى' && v.regex?.test(x))
              .map(([n]) => n);
          m.length || m.push('أخرى');
          let c = document.createElement('span');
          c.style = 'display:inline-flex;gap:8px;align-items:center;padding-right:2px';
          m.forEach(n => c.appendChild(ic(n)));
          t.after(c);
          r.dataset.categories = m.join(',');
          r.dataset.categorized = true;
        });
      }

      function fp(cat) {
        cC = cat;
        document.querySelectorAll('#forums_table tr.forum_post').forEach(r => {
          r.style.display =
            cat === 'الكل' || (r.dataset.categories && r.dataset.categories.includes(cat))
              ? ''
              : 'none';
        });
      }

      function cb(n, i, c, f) {
        let b = document.createElement('button');
        b.className = 'cat-btn';
        b.innerHTML = `<i class="fas ${i}"></i> ${n}`;
        b.style.backgroundColor = c;
        b.onclick = f;
        return b;
      }

      function con() {
        let d = document.createElement('div');
        d.id = 'cat-buttons';
        d.style = 'display:flex;gap:8px;flex-wrap:wrap;margin:10px 0';
        let a = cb('الكل', 'fa-list', '#6c757d', () => fp('الكل'));
        d.appendChild(a);
        Object.entries(cats).forEach(([n, o]) => {
          d.appendChild(cb(n, o.i, o.c, () => fp(n)));
        });
        let f = document.querySelector('#forum-requests');
        f && f.prepend(d);
      }

      function st() {
        let s = document.createElement('style');
        s.textContent = `
#cat-buttons{margin-bottom:15px}
.cat-btn{color:#fff;border:none;border-radius:25px;padding:8px 15px;cursor:pointer;display:flex;align-items:center;gap:7px;font-size:14px;box-shadow:0 2px 5px rgba(0,0,0,0.2);transition:.3s;margin-bottom:5px}
.cat-btn:hover{transform:translateY(-2px);opacity:.9}
.cat-btn i{font-size:13px}
        `;
        document.head.appendChild(s);
      }

      function so() {
        let t = document.querySelector('#forums_table tbody');
        if (!t) return;
        new MutationObserver(() => dd()).observe(t, { childList: true, subtree: true });
      }

      function lm() {
        let b = document.getElementById('community_loadmore_btn');
        b &&
          b.addEventListener('click', () =>
            setTimeout(() => {
              dd();
              fp(cC);
            }, 2000)
          );
      }

      window.addEventListener('load', () => {
        fa();
        st();
        con();
        ai();
        so();
        lm();
      });
    })();

    // زر تواصل معي مع التقييمات (التعديل الجديد ليتم التحميل عند النقر فقط)
    (function () {
      document.querySelectorAll('.discussion-item.comment').forEach(comment => {
        let userLink = comment.querySelector('.meta--user a'),
          userProfile = userLink ? userLink.href : null;

        if (userProfile) {
          // إنشاء زر "تواصل معي" وإخفائه بشكل افتراضي
          let contactButton = document.createElement('a');
          contactButton.href = '#'; // سيتم تحديث الرابط عند التحميل
          contactButton.className = 'c-button c-button--primary c-button--ghost contact_button';
          contactButton.innerHTML = '<span>تواصل معي</span>';
          contactButton.style.display = 'none'; // إخفاء الزر
          contactButton.style.padding = '1px 15px';
          contactButton.style.fontSize = '14px'; // تعديل حجم الخط ليكون مقروءاً
          contactButton.style.position = 'absolute';
          contactButton.style.left = '1px';
          contactButton.style.top = '10%';
          contactButton.style.transform = 'translateY(-50%)';

          // إنشاء حاوية التقييم وإخفائها بشكل افتراضي
          let ratingContainer = document.createElement('span');
          ratingContainer.style.marginRight = '5px';
          ratingContainer.style.display = 'none'; // إخفاء الحاوية
          ratingContainer.style.alignItems = 'center';

          let stars = document.createElement('span'); // سيتم تعبئة النجوم لاحقاً
          stars.className = 'c-list--rating';
          ratingContainer.appendChild(stars);

          let ratingTextSpan = document.createElement('span');
          ratingTextSpan.textContent = ''; // سيتم تعبئة النص لاحقاً
          ratingTextSpan.style.marginLeft = '5px';
          ratingContainer.appendChild(ratingTextSpan);

          // إضافة حاوية التقييم إلى معلومات المستخدم
          let userMeta = comment.querySelector('.meta--user');
          if (userMeta) {
            userMeta.appendChild(ratingContainer);
          }

          // إضافة زر "تواصل معي" إلى حاوية التعليق
          let commentContainer = comment.querySelector('.o-media');
          if (commentContainer) {
            commentContainer.style.position = 'relative';
            commentContainer.appendChild(contactButton);
          }

          // متغير لتتبع ما إذا تم تحميل البيانات بالفعل
          let dataLoaded = false;

          // إضافة مستمع حدث للنقر على التعليق لعرض التقييم وزر "تواصل معي"
          comment.addEventListener('click', function(e) {
            // منع تفعيل الحدث عند النقر على زر "تواصل معي" أو التقييم
            if (e.target.closest('.contact_button') || e.target.closest('.c-list--rating')) {
              return;
            }

            if (!dataLoaded) {
              dataLoaded = true; // منع تحميل البيانات أكثر من مرة

              let username = userProfile.split('/').pop();

              fetch(`https://khamsat.com/user/${username}`, { credentials: 'include' })
                .then(response => response.text())
                .then(html => {
                  let parser = new DOMParser(),
                      doc = parser.parseFromString(html, 'text/html'),
                      firstService = doc.querySelector('.service-card a.url-product'),
                      reviewsElement = doc.querySelector('.list.col-6 .c-list--rating');

                  if (firstService && reviewsElement) {
                    let userId = firstService.href.split('/').slice(-1)[0].split('-')[0],
                        contactUrl = `https://khamsat.com/message/new/${userId}`,
                        ratingText = reviewsElement.getAttribute('title') || '',
                        reviewsCountElement = reviewsElement.querySelector('.info'),
                        reviewsCount = reviewsCountElement
                          ? reviewsCountElement.textContent.trim().replace(/[()]/g, '')
                          : '';

                    // تحديث رابط زر "تواصل معي"
                    contactButton.href = contactUrl;

                    // استنساخ النجوم وإزالة عناصر المعلومات منها
                    let clonedStars = reviewsElement.cloneNode(true);
                    clonedStars.querySelectorAll('.info').forEach(el => el.remove());

                    stars.innerHTML = '';
                    stars.appendChild(clonedStars);

                    // تحديث نص التقييم
                    ratingTextSpan.textContent = ` ${ratingText} (${reviewsCount})`;

                    // عرض العناصر
                    ratingContainer.style.display = 'inline-flex';
                    contactButton.style.display = 'block';
                  }
                })
                .catch(error => {
                  console.error('حدث خطأ أثناء جلب البيانات:', error);
                  dataLoaded = false; // إعادة السماح بمحاولة التحميل مرة أخرى في حال حدوث خطأ
                });
            } else {
              // عرض العناصر إذا تم تحميلها مسبقاً
              ratingContainer.style.display = 'inline-flex';
              contactButton.style.display = 'block';
            }
          });
        }
      });
    })();

    // كرت تحليل الأسعار (يظهر فقط داخل المواضيع وليس في صفحة "requests" الرئيسية)
    (function() {
      // إذا كان الرابط بالضبط هو صفحة الطلبات الرئيسية، لا ننفذ كود التحليل
      const isMainRequestsPage =
        location.pathname === '/community/requests' ||
        location.pathname === '/community/requests/';

      if (isMainRequestsPage) return;

      const createPriceCard = () => {
        const priceCard = document.createElement('div');
        priceCard.style = `
            width: 100%;
            max-width: 1000px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            padding: 15px;
            margin: 10px auto;
            border: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #2d3436;
            transition: all 0.3s ease;
        `;
        priceCard.innerHTML = `
            <span style="display: flex; align-items: center; gap: 5px;">
                <i class="fas fa-chart-line" style="color: #0984e3;"></i>
                <strong>تحليل الأسعار:</strong>
            </span>
            <span class="price-info" style="display: flex; gap: 65px;">
                <span style="color: #636e72;">
                    <i class="fas fa-info-circle"></i> لم يتم تقديم أي سعر حتى الآن.
                </span>
            </span>
            <span style="color: #636e72;">
                <i class="fas fa-comment-dots"></i> تم تحليل <span class="comments-count">0</span> تعليق
            </span>
        `;
        return priceCard;
      };

      const insertPriceCard = () => {
        const targetCard = document.querySelector('.card, .discussion-list-item');
        if (!targetCard) return null;
        const priceCard = createPriceCard();
        targetCard.parentNode.insertBefore(priceCard, targetCard);
        return {
          priceInfoElement: priceCard.querySelector('.price-info'),
          countElement: priceCard.querySelector('.comments-count')
        };
      };

      function extractPrice(text) {
        const pricePattern = /(\d+)[\s,]*(?:دولار|دولاراً|\$|USD|dollar)/gi;
        return [...text.matchAll(pricePattern)].map(match => parseInt(match[1]));
      }

      function updatePrice(elements) {
        const comments = document.querySelectorAll('.discussion-item.comment, .comment-item');
        const allPrices = [];
        comments.forEach(comment => {
          const content = comment.querySelector('.reply_content, .comment-content')?.textContent;
          if (content) allPrices.push(...extractPrice(content));
        });
        if (elements) {
          if (allPrices.length === 0) {
            elements.priceInfoElement.innerHTML = `
              <span style="color: #636e72;">
                <i class="fas fa-info-circle"></i> لم يتم تقديم أي سعر حتى الآن.
              </span>
            `;
          } else {
            const minPrice = Math.min(...allPrices);
            const maxPrice = Math.max(...allPrices);
            if (minPrice === maxPrice) {
              elements.priceInfoElement.innerHTML = `
                <span style="color: #0984e3;">
                  <i class="fas fa-tag"></i> السعر الموحد للخدمة هو <strong>${minPrice}</strong> دولار.
                </span>
              `;
            } else {
              elements.priceInfoElement.innerHTML = `
                <span style="color: #00b894; margin-right: 10px;">
                  <i class="fas fa-arrow-down"></i> أقل سعر: <strong>${minPrice}</strong> دولار
                </span>
                <span style="color: #d63031;">
                  <i class="fas fa-arrow-up"></i> أعلى سعر: <strong>${maxPrice}</strong> دولار
                </span>
              `;
            }
          }
          elements.countElement.textContent = comments.length;
        }
      }

      const init = () => {
        const elements = insertPriceCard();
        if (!elements) {
          setTimeout(init, 1000);
          return;
        }
        updatePrice(elements);
        const observer = new MutationObserver(() => updatePrice(elements));
        const targetNode = document.getElementById('post_replies') || document.querySelector('.comments-list');
        if (targetNode) observer.observe(targetNode, { childList: true, subtree: true });
      };

      setTimeout(init, 1000);
    })();
  }
  (function() {
    const updateUrl = 'https://raw.githubusercontent.com/almhtwy1/khamsat/main/خمسات%20-%20سكريبت%20موحّد%20مختصر-3.7.user.js';
    const currentVersion = '3.6'; // هنا ضع رقم الإصدار الحالي المثبت عندك

    async function checkForUpdate() {
        try {
            const response = await fetch(updateUrl);
            const scriptText = await response.text();
            const versionMatch = scriptText.match(/@version\s+([\d.]+)/);

            if (versionMatch && versionMatch[1] !== currentVersion) {
                if (confirm(`تحديث جديد متوفر (${versionMatch[1]})! هل ترغب بالتحديث الآن؟`)) {
                    window.open(updateUrl, '_blank');
                }
            }
        } catch (error) {
            console.error('فشل التحقق من التحديث:', error);
        }
    }

    checkForUpdate();
})();

})();
