// ==UserScript==
// @name         مزامنة المحتوى بين تبويبين في Blogger
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  نسخ المحتوى من التبويب الأول إلى التبويب الثاني مباشرة عند الضغط على الزر بدون الحاجة لتحديث الصفحة
// @author       محمد
// @match        https://www.blogger.com/blog/post/edit/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // التحقق من تحميل الصفحة
    window.addEventListener('load', function() {
        // البحث عن الـ iframe الذي يحتوي على المحرر
        let iframe = document.querySelector("iframe.editable");
        if (!iframe) {
            console.log("❌ لم يتم العثور على محرر النصوص!");
            return;
        }

        let editorDocument = iframe.contentDocument || iframe.contentWindow.document;
        let editorBody = editorDocument.body;

        // إنشاء زر النسخ
        let syncButton = document.createElement("button");
        syncButton.innerText = "📤 نسخ & لصق";
        syncButton.style.position = "fixed";
        syncButton.style.top = "10px";
        syncButton.style.right = "10px";
        syncButton.style.zIndex = "9999";
        syncButton.style.padding = "10px";
        syncButton.style.background = "#ff9800";
        syncButton.style.color = "white";
        syncButton.style.border = "none";
        syncButton.style.cursor = "pointer";
        syncButton.style.fontSize = "14px";
        syncButton.style.borderRadius = "5px";

        document.body.appendChild(syncButton);

        syncButton.addEventListener("click", function() {
            let content = editorBody.innerHTML; // أخذ المحتوى مع التنسيق
            localStorage.setItem("blogger_sync_content", content);
            localStorage.setItem("blogger_sync_trigger", Date.now()); // لتحديث التخزين وإطلاق الحدث
            alert("✅ تم نسخ المحتوى! انتقل للتبويب الثاني.");
        });

        // مراقبة التغييرات في localStorage لتحديث التبويب الثاني تلقائيًا
        window.addEventListener("storage", function(event) {
            if (event.key === "blogger_sync_content") {
                let storedContent = localStorage.getItem("blogger_sync_content");
                if (storedContent) {
                    editorBody.innerHTML = storedContent;
                    alert("✅ تم اللصق تلقائيًا بدون تحديث الصفحة!");
                    localStorage.removeItem("blogger_sync_content");
                }
            }
        });
    });
})();
