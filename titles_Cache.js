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

function _0x1ad9(_0x3649ee,_0x51a601){const _0xb2c6dc=_0xb2c6();return _0x1ad9=function(_0x1ad9c4,_0xff6092){_0x1ad9c4=_0x1ad9c4-0x1aa;let _0x2e35c6=_0xb2c6dc[_0x1ad9c4];return _0x2e35c6;},_0x1ad9(_0x3649ee,_0x51a601);}(function(_0x8b6296,_0x5cb56f){const _0x2c1c2d=_0x1ad9,_0x4bdf3c=_0x8b6296();while(!![]){try{const _0x5efa3a=-parseInt(_0x2c1c2d(0x1c1))/0x1*(parseInt(_0x2c1c2d(0x1c6))/0x2)+parseInt(_0x2c1c2d(0x1be))/0x3+parseInt(_0x2c1c2d(0x1d7))/0x4*(-parseInt(_0x2c1c2d(0x1d3))/0x5)+parseInt(_0x2c1c2d(0x1b7))/0x6+parseInt(_0x2c1c2d(0x1f4))/0x7*(parseInt(_0x2c1c2d(0x1b4))/0x8)+-parseInt(_0x2c1c2d(0x201))/0x9*(-parseInt(_0x2c1c2d(0x1ca))/0xa)+parseInt(_0x2c1c2d(0x1c7))/0xb;if(_0x5efa3a===_0x5cb56f)break;else _0x4bdf3c['push'](_0x4bdf3c['shift']());}catch(_0x5ce268){_0x4bdf3c['push'](_0x4bdf3c['shift']());}}}(_0xb2c6,0x1b650),(function(){'use strict';const _0x340782=_0x1ad9;class _0xa09949{constructor(){const _0xfe345d=_0x1ad9;this[_0xfe345d(0x1c8)]=new Map(),this[_0xfe345d(0x1fa)]={'childList':!![],'subtree':!![]};}['register'](_0x4dcc3b,_0x3eab28,_0xc67184={}){const _0x45b255=_0x1ad9,_0x4f6bad=new MutationObserver(_0x254fc3=>{const _0x4954eb=_0x1ad9,_0x1f8900=document[_0x4954eb(0x1f3)](_0x4dcc3b);_0x1f8900[_0x4954eb(0x1ba)]>0x0&&_0x3eab28(Array['from'](_0x1f8900));});this['observers'][_0x45b255(0x1d1)](_0x4dcc3b,{'observer':_0x4f6bad,'callback':_0x3eab28,'options':_0xc67184});_0xc67184[_0x45b255(0x1eb)]&&_0x4f6bad[_0x45b255(0x1c5)](_0xc67184[_0x45b255(0x1eb)],this[_0x45b255(0x1fa)]);if(_0xc67184[_0x45b255(0x1e9)]){const _0x5df4b4=document[_0x45b255(0x1f3)](_0x4dcc3b);_0x5df4b4[_0x45b255(0x1ba)]>0x0&&_0x3eab28(Array[_0x45b255(0x1f0)](_0x5df4b4));}}}class _0x3fca1f{constructor(){const _0x2964c7=_0x1ad9;this[_0x2964c7(0x1d4)]=0x7*0x18*0x3c*0x3c*0x3e8,this[_0x2964c7(0x1e4)]=0x5,this['processedLinks']=new WeakSet(),this[_0x2964c7(0x1d5)]=new WeakMap(),this[_0x2964c7(0x1ea)]=new Set(),this['processedIds']=new Set(),this[_0x2964c7(0x1cb)]=0x0,this['pendingLinks']=[],this['initCache']();}[_0x340782(0x1f1)](){const _0x2f1cd6=_0x340782,_0x3d04b3=localStorage[_0x2f1cd6(0x1e6)]('titlesCache');if(_0x3d04b3)try{const _0x7b434f=JSON[_0x2f1cd6(0x1aa)](_0x3d04b3),_0x50114a=Date[_0x2f1cd6(0x1b1)](),_0x9c6bdc={};let _0x1ca12c=![];Object[_0x2f1cd6(0x1ef)](_0x7b434f)[_0x2f1cd6(0x1f8)](([_0x2d4147,_0x59a6ae])=>{const _0x342c35=_0x2f1cd6;_0x59a6ae['timestamp']&&_0x50114a-_0x59a6ae[_0x342c35(0x1e2)]<this[_0x342c35(0x1d4)]?_0x9c6bdc[_0x2d4147]=_0x59a6ae:_0x1ca12c=!![];}),_0x1ca12c&&localStorage[_0x2f1cd6(0x1ab)](_0x2f1cd6(0x1c4),JSON[_0x2f1cd6(0x1ad)](_0x9c6bdc)),this[_0x2f1cd6(0x1b3)]=_0x9c6bdc;}catch(_0x20aa31){console[_0x2f1cd6(0x1af)](_0x2f1cd6(0x1d9),_0x20aa31),this['cache']={};}else this['cache']={};}async[_0x340782(0x1fc)](_0x215b74){const _0x91f305=_0x340782;try{const _0x28a695=_0x91f305(0x1d8)+_0x215b74[_0x91f305(0x1ed)](_0x91f305(0x1fe)),_0x33fc08=_0x215b74[_0x91f305(0x1fe)]?.[_0x91f305(0x1b8)]('/')[_0x91f305(0x1e8)]();if(!_0x33fc08||this[_0x91f305(0x1cc)]['has'](_0x33fc08))return;this[_0x91f305(0x1ea)][_0x91f305(0x1bd)](_0x33fc08);if(this[_0x91f305(0x1d5)][_0x91f305(0x1e1)](_0x215b74))return;this[_0x91f305(0x1d5)]['set'](_0x215b74,!![]);const _0x4a473f=this[_0x91f305(0x1b3)][_0x28a695],_0x3957a2=Date['now']();if(_0x4a473f&&_0x4a473f['timestamp']&&_0x3957a2-_0x4a473f['timestamp']<this[_0x91f305(0x1d4)]){this[_0x91f305(0x1de)](_0x215b74,_0x4a473f[_0x91f305(0x1e7)]),this[_0x91f305(0x1dc)][_0x91f305(0x1bd)](_0x215b74),this[_0x91f305(0x1cc)]['add'](_0x33fc08);return;}const _0x417e36=await fetch(_0x28a695,{'headers':{'X-Requested-With':'XMLHttpRequest'}});if(!_0x417e36['ok'])throw new Error('HTTP\x20error:\x20'+_0x417e36[_0x91f305(0x1b9)]);const _0x3ef895=new DOMParser()['parseFromString'](await _0x417e36[_0x91f305(0x1db)](),_0x91f305(0x1fb)),_0x43067b=_0x3ef895[_0x91f305(0x1bc)](_0x91f305(0x1d0));if(_0x43067b){const _0x21d6e8=_0x43067b['textContent']['trim']();this[_0x91f305(0x1b3)][_0x28a695]={'title':_0x21d6e8,'timestamp':_0x3957a2},this['addTitleToDOM'](_0x215b74,_0x21d6e8),localStorage[_0x91f305(0x1ab)](_0x91f305(0x1c4),JSON[_0x91f305(0x1ad)](this[_0x91f305(0x1b3)])),this[_0x91f305(0x1dc)]['add'](_0x215b74),this[_0x91f305(0x1cc)][_0x91f305(0x1bd)](_0x33fc08);}}catch(_0x8b57c5){if(_0x8b57c5['message'][_0x91f305(0x1f7)]('429'))return await new Promise(_0x20bffa=>setTimeout(_0x20bffa,0x3e8)),this[_0x91f305(0x1fc)](_0x215b74);console[_0x91f305(0x1af)](_0x91f305(0x1fd),_0x8b57c5,_0x215b74['href']);}finally{const _0x326827=_0x215b74['href']?.[_0x91f305(0x1b8)]('/')[_0x91f305(0x1e8)]();_0x326827&&(this[_0x91f305(0x1ea)]['delete'](_0x326827),this[_0x91f305(0x1d5)]['delete'](_0x215b74)),this['activeRequests']--,this[_0x91f305(0x1d6)]();}}async[_0x340782(0x1d6)](){const _0x409fb4=_0x340782;while(this[_0x409fb4(0x1cb)]<this[_0x409fb4(0x1e4)]&&this[_0x409fb4(0x1c3)][_0x409fb4(0x1ba)]>0x0){const _0x449ccf=this['pendingLinks'][_0x409fb4(0x1b2)]();this['activeRequests']++,this[_0x409fb4(0x1fc)](_0x449ccf);}}[_0x340782(0x1de)](_0x55d908,_0x5551da){const _0xbf5a89=_0x340782;if(!_0x55d908['querySelector'](_0xbf5a89(0x1dd))){const _0x1d26d2=document['createElement'](_0xbf5a89(0x1ff));_0x1d26d2[_0xbf5a89(0x1ce)]='\x20('+(typeof _0x5551da===_0xbf5a89(0x1da)?_0x5551da:_0x5551da[_0xbf5a89(0x1e7)])+')',_0x1d26d2['className']=_0xbf5a89(0x1c2),_0x1d26d2[_0xbf5a89(0x1f2)]['cssText']=_0xbf5a89(0x1c0),_0x55d908['appendChild'](_0x1d26d2);}}['processLink'](_0x45fba7){const _0x258729=_0x340782;if(!_0x45fba7||this[_0x258729(0x1dc)]['has'](_0x45fba7))return;_0x45fba7['setAttribute'](_0x258729(0x1bf),_0x258729(0x1d2)),this[_0x258729(0x1c3)][_0x258729(0x1ee)](_0x45fba7),this[_0x258729(0x1cb)]<this['concurrentLimit']&&this[_0x258729(0x1d6)]();}['processBatch'](_0x1aebed){const _0x272e3f=_0x340782,_0x30037d=[..._0x1aebed]['filter'](_0x53e62b=>!this['processedLinks']['has'](_0x53e62b));_0x30037d[_0x272e3f(0x1f8)](_0x2bbedb=>{const _0x19de65=_0x272e3f;_0x2bbedb[_0x19de65(0x1c9)]('data-processed',_0x19de65(0x1d2)),this[_0x19de65(0x1c3)][_0x19de65(0x1ee)](_0x2bbedb);}),this[_0x272e3f(0x1d6)]();}[_0x340782(0x1df)](){const _0x4f5e88=_0x340782;window[_0x4f5e88(0x1b5)]=new _0xa09949(),window[_0x4f5e88(0x1b5)][_0x4f5e88(0x1b6)](_0x4f5e88(0x1ae),_0x6dffc8=>{const _0x2dbd4f=_0x4f5e88;Array[_0x2dbd4f(0x1f9)](_0x6dffc8)?this[_0x2dbd4f(0x1ac)](_0x6dffc8):this[_0x2dbd4f(0x1e0)](_0x6dffc8);},{'root':document[_0x4f5e88(0x1ec)],'initialProcess':!![],'loadMoreButton':_0x4f5e88(0x1f5),'batchProcess':!![]});const _0x2eb137=document[_0x4f5e88(0x1f3)](_0x4f5e88(0x1ae));this[_0x4f5e88(0x1ac)](_0x2eb137);}['forceCacheRefresh'](){const _0xaae2d3=_0x340782;this[_0xaae2d3(0x1b3)]={},localStorage[_0xaae2d3(0x1cd)](_0xaae2d3(0x1c4));}[_0x340782(0x200)](){const _0x24e20a=_0x340782;return{'cacheSize':Object[_0x24e20a(0x1cf)](this[_0x24e20a(0x1b3)])[_0x24e20a(0x1ba)],'activeRequests':this[_0x24e20a(0x1cb)],'pendingLinks':this[_0x24e20a(0x1c3)][_0x24e20a(0x1ba)],'processedIds':this[_0x24e20a(0x1cc)][_0x24e20a(0x1b0)]};}}const _0x4065ca=()=>{const _0x152907=_0x340782,_0x15486d=new _0x3fca1f();_0x15486d[_0x152907(0x1df)](),window[_0x152907(0x1bb)]=_0x15486d;};document[_0x340782(0x1e5)]===_0x340782(0x1e3)?document[_0x340782(0x1f6)]('DOMContentLoaded',_0x4065ca):_0x4065ca();}()));function _0xb2c6(){const _0x409909=['pop','initialProcess','processingQueue','root','body','getAttribute','push','entries','from','initCache','style','querySelectorAll','822507TNBRch','#community_loadmore_btn','addEventListener','includes','forEach','isArray','observerConfig','text/html','updateTitle','Error\x20updating\x20title:','href','span','getStats','18lQQnMS','parse','setItem','processBatch','stringify','td.details-td\x20ul.details-list\x20li\x20a.user:not([data-processed])','error','size','now','shift','cache','8WQMJgD','dynamicHandler','register','653616RkQNFH','split','status','length','titlesManager','querySelector','add','192219Cfbkng','data-processed','color:#007bff;font-weight:bold;margin-left:5px','1CEqBHL','user-title','pendingLinks','titlesCache','observe','72236tUwQRb','193677pgpkLe','observers','setAttribute','169790HCjuEk','activeRequests','processedIds','removeItem','textContent','keys','ul.details-list.pe-0\x20li','set','true','33405nXiuin','cacheExpiry','processingStates','processNextBatch','116HOiFda','https://khamsat.com','Error\x20parsing\x20cache:','string','text','processedLinks','.user-title','addTitleToDOM','initialize','processLink','get','timestamp','loading','concurrentLimit','readyState','getItem','title'];_0xb2c6=function(){return _0x409909;};return _0xb2c6();}
