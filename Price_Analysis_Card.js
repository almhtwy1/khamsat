// ==UserScript==
// @name         Khamsat Price Analysis Card
// @namespace    https://khamsat.com/
// @version      1.0
// @description  إضافة تحليل أسعار لطلبات خمسات
// @author       Your Name
// @match        https://khamsat.com/community/requests/*
// @icon         https://khamsat.com/favicon.ico
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js
// ==/UserScript==

function _0x4b41(){const _0x5eeb1b=['pathname','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20width:\x20100%;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20max-width:\x201000px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20background:\x20#fff;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border-radius:\x2012px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20box-shadow:\x200\x204px\x2012px\x20rgba(0,0,0,0.1);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20padding:\x2015px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20margin:\x2010px\x20auto;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20border:\x201px\x20solid\x20#e9ecef;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20display:\x20flex;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20justify-content:\x20space-between;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20align-items:\x20center;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20font-size:\x2014px;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20color:\x20#2d3436;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20transition:\x20all\x200.3s\x20ease;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','</strong>\x20دولار.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','commentsCount','6655cjGZua','insertBefore','matchAll','</strong>\x20دولار\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','priceInfo','607953VmzFcv','max','.card,\x20.discussion-list-item','2007186SoaIRx','innerHTML','forEach','filter','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22color:#0984e3;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22fas\x20fa-tag\x22></i>\x20السعر\x20الموحد\x20للخدمة\x20هو\x20<strong>','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22color:#00b894;margin-right:10px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22fas\x20fa-arrow-down\x22></i>\x20أقل\x20سعر:\x20<strong>','querySelectorAll','.discussion-item.comment,\x20.comment-item','div','7543626urvrEv','3940wxReTE','post_replies','.comments-list','/community/requests','.price-info','min','616ofJyix','/community/requests/','observe','</strong>\x20دولار\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22color:#d63031;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22fas\x20fa-arrow-up\x22></i>\x20أعلى\x20سعر:\x20<strong>','push','getElementById','2010870ICoQcV','.reply_content,\x20.comment-content','map','.comments-count','createElement','1772274SnaOrK','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22display:flex;align-items:center;gap:5px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22fas\x20fa-chart-line\x22\x20style=\x22color:#0984e3;\x22></i>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>تحليل\x20الأسعار:</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22price-info\x22\x20style=\x22display:flex;gap:65px;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22color:#636e72;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22fas\x20fa-info-circle\x22></i>\x20لم\x20يتم\x20تقديم\x20أي\x20سعر\x20حتى\x20الآن.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22color:#636e72;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22fas\x20fa-comment-dots\x22></i>\x20تم\x20تحليل\x20<span\x20class=\x22comments-count\x22>0</span>\x20تعليق\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20','64737NynTZQ','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20style=\x22color:#636e72;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<i\x20class=\x22fas\x20fa-info-circle\x22></i>\x20لم\x20يتم\x20تقديم\x20أي\x20سعر\x20حتى\x20الآن.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','querySelector','textContent','parentNode','style'];_0x4b41=function(){return _0x5eeb1b;};return _0x4b41();}function _0x5d5a(_0x86cbdc,_0x4dbf73){const _0x4b41c1=_0x4b41();return _0x5d5a=function(_0x5d5a37,_0x36c36f){_0x5d5a37=_0x5d5a37-0x1ab;let _0x52f6c4=_0x4b41c1[_0x5d5a37];return _0x52f6c4;},_0x5d5a(_0x86cbdc,_0x4dbf73);}(function(_0x405128,_0x516838){const _0x5cf513=_0x5d5a,_0x2eb69d=_0x405128();while(!![]){try{const _0xe0e691=parseInt(_0x5cf513(0x1cd))/0x1+-parseInt(_0x5cf513(0x1b7))/0x2+-parseInt(_0x5cf513(0x1d0))/0x3+parseInt(_0x5cf513(0x1ab))/0x4*(parseInt(_0x5cf513(0x1c8))/0x5)+parseInt(_0x5cf513(0x1d9))/0x6+-parseInt(_0x5cf513(0x1bc))/0x7+-parseInt(_0x5cf513(0x1b1))/0x8*(parseInt(_0x5cf513(0x1be))/0x9);if(_0xe0e691===_0x516838)break;else _0x2eb69d['push'](_0x2eb69d['shift']());}catch(_0x4c5462){_0x2eb69d['push'](_0x2eb69d['shift']());}}}(_0x4b41,0xa99bf),(function(){'use strict';const _0x2d8e57=_0x5d5a;if(location[_0x2d8e57(0x1c4)]===_0x2d8e57(0x1ae)||location[_0x2d8e57(0x1c4)]===_0x2d8e57(0x1b2))return;const _0x22ee4f=()=>{const _0x2b8ded=_0x2d8e57,_0x5d168f=document[_0x2b8ded(0x1bb)](_0x2b8ded(0x1d8));return _0x5d168f[_0x2b8ded(0x1c3)]['cssText']=_0x2b8ded(0x1c5),_0x5d168f[_0x2b8ded(0x1d1)]=_0x2b8ded(0x1bd),_0x5d168f;},_0x1605c4=()=>{const _0x4fe793=_0x2d8e57,_0x44b5d7=document[_0x4fe793(0x1c0)](_0x4fe793(0x1cf));if(!_0x44b5d7)return;const _0x2fa7a7=_0x22ee4f();return _0x44b5d7[_0x4fe793(0x1c2)][_0x4fe793(0x1c9)](_0x2fa7a7,_0x44b5d7),{'priceInfo':_0x2fa7a7['querySelector'](_0x4fe793(0x1af)),'commentsCount':_0x2fa7a7[_0x4fe793(0x1c0)](_0x4fe793(0x1ba))};},_0x3028f0=_0x1f3dc2=>{const _0x57420f=_0x2d8e57,_0x20a6a7=/(\d{1,5})[\s,]*(?:دولار|دولاراً|\$|USD|dollar)/gi;return[..._0x1f3dc2[_0x57420f(0x1ca)](_0x20a6a7)][_0x57420f(0x1b9)](_0x49d6f0=>parseInt(_0x49d6f0[0x1]))[_0x57420f(0x1d3)](_0x1281a0=>_0x1281a0>0x0&&_0x1281a0<=0x2710);},_0x37fa2d=_0x4ec6c4=>{const _0x461ad4=_0x2d8e57,_0x5d171c=document[_0x461ad4(0x1d6)](_0x461ad4(0x1d7)),_0x15aa06=[];_0x5d171c[_0x461ad4(0x1d2)](_0x5e6ad8=>{const _0xc7447d=_0x461ad4,_0x31f01f=_0x5e6ad8[_0xc7447d(0x1c0)](_0xc7447d(0x1b8))?.[_0xc7447d(0x1c1)];_0x31f01f&&_0x15aa06[_0xc7447d(0x1b5)](..._0x3028f0(_0x31f01f));});if(_0x15aa06['length']===0x0)_0x4ec6c4[_0x461ad4(0x1cc)]['innerHTML']=_0x461ad4(0x1bf);else{const _0x83d3a3=Math[_0x461ad4(0x1b0)](..._0x15aa06),_0x492176=Math[_0x461ad4(0x1ce)](..._0x15aa06);_0x83d3a3===_0x492176?_0x4ec6c4['priceInfo']['innerHTML']=_0x461ad4(0x1d4)+_0x83d3a3+_0x461ad4(0x1c6):_0x4ec6c4['priceInfo'][_0x461ad4(0x1d1)]=_0x461ad4(0x1d5)+_0x83d3a3+_0x461ad4(0x1b4)+_0x492176+_0x461ad4(0x1cb);}_0x4ec6c4[_0x461ad4(0x1c7)][_0x461ad4(0x1c1)]=_0x5d171c['length'];},_0x88cfaa=()=>{const _0x323133=_0x2d8e57,_0x37fa10=_0x1605c4();if(!_0x37fa10){setTimeout(_0x88cfaa,0x3e8);return;}_0x37fa2d(_0x37fa10);const _0x2793a7=document[_0x323133(0x1b6)](_0x323133(0x1ac))||document['querySelector'](_0x323133(0x1ad));if(_0x2793a7){const _0x5177f5=new MutationObserver(()=>_0x37fa2d(_0x37fa10));_0x5177f5[_0x323133(0x1b3)](_0x2793a7,{'childList':!![],'subtree':!![]});}};setTimeout(_0x88cfaa,0x3e8);}()));
