// ==UserScript==
// @name         ردود احترافية متعددة
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  أيقونة ذكية مع 10 ردود قابلة للتناوب
// @author       You
// @match        https://khamsat.com/community/requests/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const textarea = document.querySelector('textarea[name="content"][class="c-form__control"]');
    if (!textarea) return;

    // إنشاء أيقونة SVG احترافية
    const button = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    button.setAttribute('width', '28');
    button.setAttribute('height', '28');
    button.style.position = 'absolute';
    button.style.left = '8px';
    button.style.top = '8px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '100';
    button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    // تصميم أيقونة القلم
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    iconPath.setAttribute('d', 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z');
    iconPath.setAttribute('fill', '#5f6368');
    button.appendChild(iconPath);

    textarea.parentNode.style.position = 'relative';
    textarea.style.paddingLeft = '40px';
    textarea.parentNode.insertBefore(button, textarea.nextSibling);

    // مجموعة الردود المحدثة
    const responses = [
        username => `مرحبًا ${username}،
شكرًا لاهتمامك بخدماتي. يمكنني تنفيذ طلبك باحترافية عالية وفقًا لمتطلباتك، مع ضمان الدقة والجودة. يُرجى تزويدي بتفاصيل إضافية لنبدأ العمل فورًا.

التكلفة:  $`,

        username => `أهلًا وسهلًا ${username}،
سأكون سعيدًا بتنفيذ طلبك بأفضل جودة ممكنة، مع مراعاة جميع التفاصيل التي تفضلها. أضمن لك تنفيذًا احترافيًا وتسليمًا في الوقت المحدد. تواصل معي الآن للبدء!

التكلفة:  $`,

        username => `مرحبًا ${username}،
لدي خبرة واسعة في هذا المجال، وأضمن لك تنفيذًا متقنًا وفق أعلى المعايير. يمكنك الاطلاع على تقييمات عملائي السابقين للتأكد من جودة عملي. بانتظار تفاصيلك للبدء فورًا.

التكلفة:  $`,

        username => `مرحبًا ${username}،
أنا مهتم بمشروعك وأرى أنني الشخص المناسب لتنفيذه بأفضل صورة. لدي بعض الأفكار التي قد تضيف قيمة لطلبك، هل يمكننا مناقشتها؟ أتطلع للعمل معك!

التكلفة:  $`,

        username => `مرحبًا ${username}،
يمكنني تنفيذ طلبك بسرعة ودقة عالية مع الحرص على تحقيق أفضل النتائج. سأضمن لك تنفيذًا متقنًا وفقًا لمتطلباتك، وتسليمًا في الموعد المحدد. لا تتردد في التواصل للبدء فورًا!

التكلفة:  $`,

        username => `أهلًا وسهلًا ${username}،
أحرص دائمًا على تقديم خدمات احترافية بجودة عالية، مع الاهتمام بأدق التفاصيل لضمان رضاك التام. يسعدني تنفيذ طلبك بأفضل طريقة ممكنة!

التكلفة:  $`,

        username => `مرحبًا ${username}،
سعيد برغبتك في العمل معي مجددًا! سأحرص على تنفيذ طلبك بنفس الاحترافية التي عهدتها مع إمكانية تخصيص بعض المزايا الإضافية لك. بانتظار تفاصيلك للبدء!

التكلفة:  $`,

        username => `مرحبًا ${username}،
يهمني أن تحصل على الخدمة التي تناسب احتياجاتك تمامًا، لذا يسعدني مناقشة تفاصيل طلبك لضمان تحقيق أفضل النتائج. أخبرني بالمزيد وسأكون جاهزًا للبدء!

التكلفة:  $`,

        username => `أهلًا ${username}،
يمكنني تنفيذ طلبك بجودة عالية، كما يمكنني تقديم بعض الإضافات التي قد تضيف قيمة حقيقية لعملك. تواصل معي لمناقشة التفاصيل!

التكلفة:  $`,

        username => `مرحبًا ${username}،
أؤمن بأن تنفيذ هذا الطلب سيكون تجربة رائعة، وأعدك بتقديم خدمة متقنة تليق بتوقعاتك. لا تتردد في التواصل للانطلاق فورًا!

التكلفة:  $`
    ];

    let currentResponseIndex = 0;

    button.addEventListener('click', function() {
        const username = document.querySelector('.sidebar_user').textContent.trim();
        textarea.value = responses[currentResponseIndex](username);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        currentResponseIndex = (currentResponseIndex + 1) % responses.length;
    });

    // تأثيرات تفاعلية محسنة
    button.addEventListener('mouseover', () => {
        iconPath.setAttribute('fill', '#1a73e8');
        button.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
        button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseout', () => {
        iconPath.setAttribute('fill', '#5f6368');
        button.style.filter = 'none';
        button.style.transform = 'translateY(0)';
    });
})();