try{var ce=new window.CustomEvent("test");if(ce.preventDefault(),!0!==ce.defaultPrevented)throw new Error("Could not prevent default")}catch(e){var CustomEvent=function(e,o){var t,n;return o=o||{bubbles:!1,cancelable:!1,detail:void 0},(t=document.createEvent("CustomEvent")).initCustomEvent(e,o.bubbles,o.cancelable,o.detail),n=t.preventDefault,t.preventDefault=function(){n.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(e){this.defaultPrevented=!0}},t};CustomEvent.prototype=window.Event.prototype,window.CustomEvent=CustomEvent}!function(e){var o=!1;if("function"==typeof define&&define.amd&&(define(e),o=!0),"object"==typeof exports&&(module.exports=e(),o=!0),!o){var t=window.Cookies,n=window.Cookies=e();n.noConflict=function(){return window.Cookies=t,n}}}(function(){function k(){for(var e=0,o={};e<arguments.length;e++){var t=arguments[e];for(var n in t)o[n]=t[n]}return o}return function e(p){function f(e,o,t){var n;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(t=k({path:"/"},f.defaults,t)).expires){var i=new Date;i.setMilliseconds(i.getMilliseconds()+864e5*t.expires),t.expires=i}t.expires=t.expires?t.expires.toUTCString():"";try{n=JSON.stringify(o),/^[\{\[]/.test(n)&&(o=n)}catch(e){}o=p.write?p.write(o,e):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var c="";for(var a in t)t[a]&&(c+="; "+a,!0!==t[a]&&(c+="="+t[a]));return document.cookie=e+"="+o+c}e||(n={});for(var r=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,d=0;d<r.length;d++){var l=r[d].split("="),u=l.slice(1).join("=");this.json||'"'!==u.charAt(0)||(u=u.slice(1,-1));try{var m=l[0].replace(s,decodeURIComponent);if(u=p.read?p.read(u,m):p(u,m)||u.replace(s,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch(e){}if(e===m){n=u;break}e||(n[m]=u)}catch(e){}}return n}}return(f.set=f).get=function(e){return f.call(f,e)},f.getJSON=function(){return f.apply({json:!0},[].slice.call(arguments))},f.defaults={},f.remove=function(e,o){f(e,"",k(o,{expires:-1}))},f.withConverter=e,f}(function(){})}),window["gdpr-cookie-notice-templates"]={},window["gdpr-cookie-notice-templates"]["bar.html"]='<div class="gdpr-cookie-notice">\n  <p class="gdpr-cookie-notice-description">{description}</p>\n  <nav class="gdpr-cookie-notice-nav">\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{settings}</a>\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{accept}</a>\n  </div>\n</div>\n',window["gdpr-cookie-notice-templates"]["category.html"]='<li class="gdpr-cookie-notice-modal-cookie">\n  <div class="gdpr-cookie-notice-modal-cookie-row">\n    <h3 class="gdpr-cookie-notice-modal-cookie-title">{title}</h3>\n    <input type="checkbox" name="gdpr-cookie-notice-{prefix}" id="gdpr-cookie-notice-{prefix}" class="gdpr-cookie-notice-modal-cookie-input" {checked}>\n    <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{prefix}"></label>\n  </div>\n  <p class="gdpr-cookie-notice-modal-cookie-info">{desc}</p>\n</li>\n',window["gdpr-cookie-notice-templates"]["modal.html"]='<div class="gdpr-cookie-notice-modal">\n  <div class="gdpr-cookie-notice-modal-content">\n    <div class="gdpr-cookie-notice-modal-header">\n      <h2 class="gdpr-cookie-notice-modal-title">{settings}</h2>\n      <button type="button" class="gdpr-cookie-notice-modal-close"></button>\n    </div>\n    <ul class="gdpr-cookie-notice-modal-cookies"></ul>\n    <div class="gdpr-cookie-notice-modal-footer">\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{statement}</a>\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn"><span>{save}</span></a>\n    </div>\n  </div>\n</div>\n';var gdprCookieNoticeLocales={};function gdprCookieNotice(a){var n="gdprcookienotice",c="gdpr-cookie-notice",r=window[c+"-templates"],i=Cookies.noConflict(),s=!1,d=!1,l=!1,u=[];a.performance&&(u.performance=a.performance),a.analytics&&(u.analytics=a.analytics),a.marketing&&(u.marketing=a.marketing),a.defaultChecked,a.locale||(a.locale="en"),a.timeout||(a.timeout=500),a.domain||(a.domain=null),a.expiration||(a.expiration=30);var m=i.getJSON(n),p=new CustomEvent("gdprCookiesEnabled",{detail:m});function f(e){for(var o=0;o<u.length;o++)if(a[u[o]]&&!e[u[o]])for(var t=0;t<a[u[o]].length;t++)i.remove(a[u[o]][t]),!0;e||i?document.documentElement.classList.remove(c+"-loaded"):g()}function k(e){var o={date:new Date,necessary:!0};if(u.forEach(function(e){o[e]=!0}),e)for(var t=0;t<u.length;t++)o[u[t]]=document.getElementById(c+"-cookie_"+u[t]).checked;i.set(n,o,{expires:a.expiration,domain:a.domain}),f(o),p=new CustomEvent("gdprCookiesEnabled",{detail:o}),document.dispatchEvent(p)}function e(){if(d)return!1;var e,o,t=v("bar.html");document.body.insertAdjacentHTML("beforeend",t),e=document.querySelectorAll("."+c+"-nav-item-settings")[0],o=document.querySelectorAll("."+c+"-nav-item-accept")[0],e.addEventListener("click",function(e){e.preventDefault(),h()}),o.addEventListener("click",function(e){e.preventDefault(),k()}),d=!0}function g(){e(),setTimeout(function(){document.documentElement.classList.add(c+"-loaded")},a.timeout)}function v(e,t,o){var n=r[e],i=gdprCookieNoticeLocales[a.locale];if(i.checked=o,t?t+="_":t="",!("string"==typeof n&&i instanceof Object))return!1;for(var c in i)return n.replace(/({([^}]+)})/g,function(e){var o=e.replace(/{/,"").replace(/}/,"");return"prefix"==o?t.slice(0,-1):i[o]?i[o]:i[t+o]?i[t+o]:e})}function o(){if(s)return!1;var e=v("modal.html");document.body.insertAdjacentHTML("beforeend",e);var o=document.querySelector("."+c+"-modal-cookies");o.innerHTML+=v("category.html","cookie_essential");var t=document.querySelector("."+c+"-modal-cookie-input"),n=document.querySelector("."+c+"-modal-cookie-input-switch");n.innerHTML=gdprCookieNoticeLocales[a.locale].always_on,n.classList.add(c+"-modal-cookie-state"),n.classList.remove(c+"-modal-cookie-input-switch"),t.remove(),a.performance&&(o.innerHTML+=v("category.html","cookie_performance",a.defaultChecked)),a.analytics&&(o.innerHTML+=v("category.html","cookie_analytics",a.defaultChecked)),a.marketing&&(o.innerHTML+=v("category.html","cookie_marketing",a.defaultChecked)),function(){var e=document.querySelectorAll("."+c+"-modal-close")[0],o=document.querySelectorAll("."+c+"-modal-footer-item-statement")[0],t=document.querySelectorAll("."+c+"-modal-cookie-title"),n=document.querySelectorAll("."+c+"-modal-footer-item-save")[0];e.addEventListener("click",function(){return y(),!1}),o.addEventListener("click",function(e){e.preventDefault(),window.location.href=a.statement});for(var i=0;i<t.length;i++)t[i].addEventListener("click",function(){return this.parentNode.parentNode.classList.toggle("open"),!1});n.addEventListener("click",function(e){e.preventDefault(),n.classList.add("saved"),setTimeout(function(){n.classList.remove("saved")},1e3),k(!0),setTimeout(function(){y()},1e3)})}(),m&&(a.performance&&(document.getElementById(c+"-cookie_performance").checked=m.performance),a.analytics&&(document.getElementById(c+"-cookie_analytics").checked=m.analytics),a.marketing&&(document.getElementById(c+"-cookie_marketing").checked=m.marketing)),s=!0}function h(){o(),document.documentElement.classList.add(c+"-show-modal")}function y(){document.documentElement.classList.remove(c+"-show-modal")}m?(f(m),document.dispatchEvent(p)):(g(),a.implicit&&window.addEventListener("scroll",function e(){var o,t,n,i,c;o=window.innerHeight||(document.documentElement||document.body).clientHeight,c=document,t=Math.max(c.body.scrollHeight,c.documentElement.scrollHeight,c.body.offsetHeight,c.documentElement.offsetHeight,c.body.clientHeight,c.documentElement.clientHeight),n=window.pageYOffset||(document.documentElement||document.body.parentNode||document.body).scrollTop,i=t-o,25<Math.floor(n/i*100)&&!l&&(l=!0)&&(k(),window.removeEventListener("click",e))}));var t=document.querySelectorAll("."+c+"-settings-button");if(t)for(var w=0;w<t.length;w++)t[w].addEventListener("click",function(e){e.preventDefault(),h()})}gdprCookieNoticeLocales.en={description:"We use cookies to offer you a better browsing experience, personalise content and ads, to provide social media features and to analyse our traffic. Read about how we use cookies and how you can control them by clicking Cookie Settings. You consent to our cookies if you continue to use this website.",settings:"Cookie settings",accept:"Accept cookies",statement:"Our cookie statement",save:"Save settings",always_on:"Always on",cookie_essential_title:"Essential website cookies",cookie_essential_desc:"Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.",cookie_performance_title:"Performance cookies",cookie_performance_desc:"These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. For example it stores your preferred language or the region that you are in.",cookie_analytics_title:"Analytics cookies",cookie_analytics_desc:"We use analytics cookies to help us measure how users interact with website content, which helps us customize our websites and application for you in order to enhance your experience.",cookie_marketing_title:"Marketing cookies",cookie_marketing_desc:"These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers."};