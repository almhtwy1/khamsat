// ==UserScript==
// @name         Khamsat Categories
// @namespace    https://khamsat.com/
// @version      1.0
// @description  تصنيف طلبات خمسات تلقائياً مع إمكانية التصفية حسب الفئة
// @author       Your Name
// @match        https://khamsat.com/community/requests*
// @icon         https://khamsat.com/favicon.ico
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Utility function for debouncing
    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    };

    // Categories configuration
    const categories = {
        تصميم: {
            keywords: ['تصميم', 'مصممه', 'مصمم', 'لوغو', 'canva', 'شعارات', 'هوية', 'جرافيك', 'شعار', 'تصاميم', 
                      'صور', 'صوره', 'صورة', 'تيكتوك', 'بوستات', 'بوست', 'مسوقين', 'مسوق', 'سوشيال', 'مصممين', 
                      'كانفا', 'ui', 'ux', 'بوستر', 'غلاف', 'بروشور', 'بانر', 'هوية بصرية', 'انفوجرافيك', 
                      'بروفايل', 'اليستريتور', 'فوتوشوب', 'عرض بوربوينت', 'بوث', 'مخطط مفاهيم', 'مصمم ويب'],
            icon: 'fa-palette',
            color: '#17a2b8'
        },
        كتابة: {
            keywords: ['كتابة', 'لكتابة', 'لكتابه', 'ترجمة', 'محتوى', 'مقالات', 'كاتب', 'تأليف', 'مدونة', 
                      'نص', 'سيناريو', 'سيو', 'تلخيص', 'سيرة ذاتية', 'بحث', 'تدقيق', 'تحرير', 'صياغة', 
                      'تنسيق', 'بحث أكاديمي', 'مراجعة'],
            icon: 'fa-pen',
            color: '#6610f2'
        },
        تسويق: {
            keywords: ['تسويق', 'تسويقي', 'تسويقية', 'اعلان', 'اعلانات', 'حملات', 'ads', 'seo', 'marketing',
                      'فيسبوك', 'انستقرام', 'سناب', 'التسويق', 'الإعلانية', 'للتسويق', 'ادارة حسابات',
                      'براند', 'مبيعات', 'ترويج', 'جوجل أدز', 'ادسنس', 'حملات ممولة', 'cpa', 'bing',
                      'استراتيجية', 'guest post', 'تسويق عقاري', 'سوشيال ميديا', 'تيك توك'],
            icon: 'fa-bullhorn',
            color: '#ffc107'
        },
        برمجة: {
            keywords: ['برمجة', 'تطوير', 'موقع', 'مواقع', 'تطبيق', 'تطبيقات', 'tabby', 'متجر', 'اندرويد',
                      'ios', 'wordpress', 'بوت', 'مبرمج', 'php', 'ويب', 'فايرفوكس', 'قوقل', 'متصفح',
                      'ايفون', 'أيفون', 'chrome', 'extension', 'بايثون', 'js', 'تكويد', 'فلاتر', 'لارافل',
                      'HTML', 'CSS', 'JavaScript', 'Objective-C', 'Xcode', 'Websocket', 'API', 'Frontend',
                      'Backend', 'SQL', 'VB.NET', 'Postgres', 'Supabase', 'ريسكين', 'Figma'],
            icon: 'fa-code',
            color: '#28a745'
        },
        فيديو: {
            keywords: ['فيديو', 'موشن', 'مونتاج', 'انيميشن', 'الفيديو', 'الفيديوهات', 'فيديوهات',
                      'فديوهات', 'انترو', 'تحريك', 'animation', 'edit', 'اخراج', 'مونتير', 'تعديل ألوان',
                      'Video', 'فلاتر', 'ترانزيشن', 'إخراج سينمائي', 'تحرير فيديو', 'إعلان مصوَّر',
                      'Videographer'],
            icon: 'fa-video',
            color: '#dc3545'
        },
        هندسة: {
            keywords: ['هندسة', 'معمار', 'مدني', 'خريطة', 'ميكانيكي', 'معماري', 'مخطط', 'مهندس',
                      'مشروع هندسي', 'خرائط', 'تصميم داخلي', 'ديكور', 'أوتوكاد', 'ريفيت', '3ds Max',
                      'SketchUp', 'مخطط سلامة', 'ديناميكا حرارية', 'هندسي'],
            icon: 'fa-building',
            color: '#8e44ad'
        },
        أعمال: {
            keywords: ['اعمال', 'ادارة', 'محاسبة', 'مالية', 'قانونية', 'دراسة جدوى', 'خطة عمل',
                      'مشروع', 'وظائف', 'موظف', 'سكرتير', 'موظفين', 'مندوب', 'تمويل', 'تسعير',
                      'مبيعات', 'إدارة مشاريع', 'موارد بشرية'],
            icon: 'fa-briefcase',
            color: '#fd7e14'
        },
        صوتيات: {
            keywords: ['صوت', 'تعليق', 'موسيقى', 'هندسة صوت', 'تلحين', 'فويس', 'اغنية', 'إنشاد',
                      'إنشودة', 'انشودة', 'إلقاء', 'فويس أوفر', 'صوتي', 'دبلجة', 'بودكاست'],
            icon: 'fa-microphone',
            color: '#FF80AB'
        },
        تعليم: {
            keywords: ['تعليم', 'الواجب', 'تدريب', 'دروس', 'مدرس', 'حل واجبات', 'كورس', 'معلم',
                      'قرآن', 'دورات', 'شرح', 'آيلتس', 'تدريس', 'خصوصي', 'منصة تعليمية', 'التعلم',
                      'معلمة', 'تعليم', 'اختبارات', 'مساعدة واجبات', 'أكاديمي'],
            icon: 'fa-chalkboard-teacher',
            color: '#FA8072'
        },
        بيانات: {
            keywords: ['بيانات', 'البيانات', 'ادخال', 'تنظيف', 'تحليل', 'جمع', 'scraping', 'اكسل',
                      'pdf', 'sql', 'database', 'جوجل شيت', 'SharePoint', 'VBA', 'جدول ديناميكي',
                      'تنسيق ملفات', 'دمج بيانات', 'Pivot', 'CSV'],
            icon: 'fa-database',
            color: '#FF6347'
        },
        'أسلوب حياة': {
            keywords: ['حياة', 'لياقة', 'ارشاد', 'استشارة', 'طبخ', 'صحة', 'هواية', 'ترفيه',
                      'شخصي', 'رشاقة', 'جمال', 'موضة', 'نصائح', 'عناية', 'وصفات طبخ', 'تخسيس'],
            icon: 'fa-heart',
            color: '#20B2AA'
        },
        أخرى: {
            keywords: [],
            icon: 'fa-folder-open',
            color: '#6c757d'
        }
    };

    // Prepare regex patterns for each category
    Object.values(categories).forEach(category => {
        if (category.keywords.length) {
            category.regex = new RegExp(
                `(?:^|\\s)(${category.keywords
                    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                    .join('|')})(?:\\s|$)`,
                'i'
            );
        }
    });

    // Add category icons to requests
    const addCategoryIcons = () => {
        document.querySelectorAll('#forums_table tr.forum_post:not([data-categorized])').forEach(row => {
            const link = row.querySelector('.details-td h3 a');
            if (!link) return;

            const text = link.textContent.toLowerCase();
            const matchedCategories = Object.entries(categories)
                .filter(([name, cat]) => name !== 'أخرى' && cat.regex?.test(text))
                .map(([name]) => name);

            if (!matchedCategories.length) {
                matchedCategories.push('أخرى');
            }

            const iconSpan = document.createElement('span');
            iconSpan.style.cssText = 'display:inline-flex;gap:8px;align-items:center;padding-right:2px';

            matchedCategories.forEach(categoryName => {
                const category = categories[categoryName];
                const icon = document.createElement('i');
                icon.className = `fas ${category.icon}`;
                icon.title = categoryName;
                icon.style.cssText = `color:${category.color};font-size:16px`;
                iconSpan.appendChild(icon);
            });

            link.after(iconSpan);
            row.dataset.categories = matchedCategories.join(',');
            row.dataset.categorized = 'true';
        });
    };

    // Filter posts by category
    let currentCategory = 'الكل';
    const filterPosts = (category) => {
        currentCategory = category;
        document.querySelectorAll('#forums_table tr.forum_post').forEach(row => {
            row.style.display = category === 'الكل' || 
                (row.dataset.categories && row.dataset.categories.includes(category))
                ? ''
                : 'none';
        });
    };

    // Create category filter button
    const createCategoryButton = (name, icon, color, onClick) => {
        const button = document.createElement('button');
        button.className = 'cat-btn';
        button.innerHTML = `<i class="fas ${icon}"></i> ${name}`;
        button.style.backgroundColor = color;
        button.onclick = onClick;
        return button;
    };

    // Add category filter buttons
    const addCategoryButtons = () => {
        const container = document.createElement('div');
        container.id = 'cat-buttons';
        container.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin:10px 0';

        // Add "All" button
        container.appendChild(
            createCategoryButton('الكل', 'fa-list', '#6c757d', () => filterPosts('الكل'))
        );

        // Add category buttons
        Object.entries(categories).forEach(([name, category]) => {
            container.appendChild(
                createCategoryButton(name, category.icon, category.color, () => filterPosts(name))
            );
        });

        const forumElement = document.querySelector('#forum-requests');
        if (forumElement) {
            forumElement.prepend(container);
        }
    };

    // Add styles for category buttons
    const addStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            #cat-buttons {
                margin-bottom: 15px;
            }
            .cat-btn {
                color: #fff;
                border: none;
                border-radius: 25px;
                padding: 8px 15px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 7px;
                font-size: 14px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                transition: .3s;
                margin-bottom: 5px;
            }
            .cat-btn:hover {
                transform: translateY(-2px);
                opacity: .9;
            }
            .cat-btn i {
                font-size: 13px;
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize observers and event listeners
    const initialize = () => {
        // Ensure Font Awesome is loaded
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
            document.head.appendChild(link);
        }

        // Add styles
        addStyles();

        // Add category buttons
        addCategoryButtons();

        // Initial categorization of existing posts
        addCategoryIcons();

        // Observe table for new posts
        const tableObserver = new MutationObserver(() => {
            debounce(addCategoryIcons, 300)();
        });

        const forumTable = document.querySelector('#forums_table tbody');
        if (forumTable) {
            tableObserver.observe(forumTable, { 
                childList: true, 
                subtree: true 
            });
        }

        // Handle "Load More" button
        const loadMoreButton = document.getElementById('community_loadmore_btn');
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', () => {
                setTimeout(() => {
                    addCategoryIcons();
                    filterPosts(currentCategory);
                }, 2000);
            });
        }
    };

    // Start script when page is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();