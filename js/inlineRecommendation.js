/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function R(c,d,n,a){function i(e){return e instanceof n?e:new n(function(o){o(e)})}return new(n||(n=Promise))(function(e,o){function u(r){try{t(a.next(r))}catch(l){o(l)}}function s(r){try{t(a.throw(r))}catch(l){o(l)}}function t(r){r.done?e(r.value):i(r.value).then(u,s)}t((a=a.apply(c,d||[])).next())})}function k(c,d){var n={label:0,sent:function(){if(e[0]&1)throw e[1];return e[1]},trys:[],ops:[]},a,i,e,o;return o={next:u(0),throw:u(1),return:u(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function u(t){return function(r){return s([t,r])}}function s(t){if(a)throw new TypeError("Generator is already executing.");for(;n;)try{if(a=1,i&&(e=t[0]&2?i.return:t[0]?i.throw||((e=i.return)&&e.call(i),0):i.next)&&!(e=e.call(i,t[1])).done)return e;switch(i=0,e&&(t=[t[0]&2,e.value]),t[0]){case 0:case 1:e=t;break;case 4:return n.label++,{value:t[1],done:!1};case 5:n.label++,i=t[1],t=[0];continue;case 7:t=n.ops.pop(),n.trys.pop();continue;default:if(e=n.trys,!(e=e.length>0&&e[e.length-1])&&(t[0]===6||t[0]===2)){n=0;continue}if(t[0]===3&&(!e||t[1]>e[0]&&t[1]<e[3])){n.label=t[1];break}if(t[0]===6&&n.label<e[1]){n.label=e[1],e=t;break}if(e&&n.label<e[2]){n.label=e[2],n.ops.push(t);break}e[2]&&n.ops.pop(),n.trys.pop();continue}t=d.call(c,n)}catch(r){t=[6,r],i=0}finally{a=e=0}if(t[0]&5)throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}function S(c,d,n){return R(this,void 0,void 0,function(){var a,i;return k(this,function(e){switch(e.label){case 0:return[4,fetch("https://api.lytics.io/api/content/recommend/".concat(c,"/user/_uids/").concat(d,"?shuffle=true&limit=5&contentsegment=").concat(n))];case 1:return a=e.sent(),[4,a.json()];case 2:return i=e.sent(),[2,i.data]}})})}var T=function(){function c(){}return c.attach=function(d,n){var a=this;if(!c.attached){c.attached=!0,console.log("Rendering content recommendations.");var i=function(e){return R(a,void 0,void 0,function(){var o,u,s,t,r,l,y,E,b,p,w,_,g;return k(this,function(f){switch(f.label){case 0:o=(p=(b=e==null?void 0:e.data)===null||b===void 0?void 0:b.user)===null||p===void 0?void 0:p._uid,u=(w=n==null?void 0:n.lytics)===null||w===void 0?void 0:w.account_id,s=(_=n==null?void 0:n.lytics)===null||_===void 0?void 0:_.content_collection_id,t=(g=n==null?void 0:n.lytics)===null||g===void 0?void 0:g.number_of_recommendations,console.log("Max items:",t),f.label=1;case 1:return f.trys.push([1,3,,4]),[4,S(u,o,s)];case 2:if(r=f.sent(),l=document.querySelector("#rec-container"),l){if(l.innerHTML="",y=0,!r||r.length===0)return l.innerHTML="No recommendations available.",[2];r.forEach(function(m){if(!(y>=t)){var h=document.createElement("div");h.classList.add("flex-container","flex-column","justify-start","align-stretch","flex-1","gap-small");var v=document.createElement("img");v.classList.add("rec-img"),v.src=m.imageurls[0],v.alt="Image of ".concat(m.title),h.appendChild(v);var x=document.createElement("div");x.classList.add("rec-title"),h.appendChild(x);var C=document.createElement("a");C.href=m.url,C.innerHTML="<strong>".concat(m.title,"</strong>"),x.appendChild(C);var L=document.createElement("p");L.classList.add("rec-description"),L.textContent=m.description,h.appendChild(L),l.appendChild(h),y++}})}return[3,4];case 3:return E=f.sent(),console.error("Error fetching recommendations:",E),[3,4];case 4:return[2]}})})};window.jstag.call("entityReady",i)}},c.attached=!1,c}();Drupal.behaviors.contentRecommendation={attach:T.attach};console.log("Lytics module JS initialized.");function I(){console.log("Shared utility function")}I();
