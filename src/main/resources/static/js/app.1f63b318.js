(function(){"use strict";var e={277:function(e,t,n){var o=n(963),r=n(252);function a(e,t,n,o,a,i){const u=(0,r.up)("Header"),c=(0,r.up)("router-view"),s=(0,r.up)("Footer");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.Wm)(u),(0,r.Wm)(c),(0,r.Wm)(s)],64)}var i=n(577);function u(e,t,n,o,a,u){const c=(0,r.up)("Logo"),s=(0,r.up)("RouterLink");return(0,r.wg)(),(0,r.iD)("header",null,[(0,r.Wm)(c),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(a.navigations,(e=>((0,r.wg)(),(0,r.iD)("nav",{key:e.name},[(0,r.Wm)(s,{to:e.href},{default:(0,r.w5)((()=>[(0,r.Uk)((0,i.zw)(e.name),1)])),_:2},1032,["to"])])))),128))])}var c={data(){return{navigations:[{name:"Search",href:"/"},{name:"About",href:"/about"},{name:"Habit",href:"/habit"},{name:"Book",href:"/book"}]}}},s=n(744);const l=(0,s.Z)(c,[["render",u],["__scopeId","data-v-bb15aa5a"]]);var f=l;const d=e=>((0,r.dD)("data-v-1f0d1de2"),e=e(),(0,r.Cn)(),e),m=d((()=>(0,r._)("br",null,null,-1))),p=d((()=>(0,r._)("h4",null,"==============footer 영역 ============",-1))),h=[m,p];function b(e,t){return(0,r.wg)(),(0,r.iD)("footer",null,h)}const g={},v=(0,s.Z)(g,[["render",b],["__scopeId","data-v-1f0d1de2"]]);var y=v,k={components:{Header:f,Footer:y}};const w=(0,s.Z)(k,[["render",a]]);var _=w,O=n(201);const S=(0,r._)("div",{class:"home"},null,-1),C=(0,r._)("div",{class:"demoDiv"},[(0,r._)("h2",null,"메인 페이지"),(0,r._)("h4",null,"** 여러가지 컨텐츠 / 링크로 가득 채우기 ")],-1);function E(e,t,n,o,a,i){return(0,r.wg)(),(0,r.iD)(r.HY,null,[S,C],64)}var j={name:"HomeView",components:{}};const A=(0,s.Z)(j,[["render",E]]);var D=A,T=[{path:"/",name:"home",component:D},{path:"/about",name:"about",component:()=>n.e(182).then(n.bind(n,182))}],P=[{path:"/habit",name:"habit",component:()=>n.e(503).then(n.bind(n,503))}],H=[{path:"/rollingpaper",name:"rollingpaper",component:()=>n.e(660).then(n.bind(n,660))}],N=[{path:"/book",name:"book",component:()=>n.e(598).then(n.bind(n,598))}];const B=(0,O.p7)({history:(0,O.PO)("/"),routes:[...T,...H,...P,...N]});var L=B,x=n(907),F={namespaced:!0,state:()=>({name:"1",email:"2",blog:"https://nono.blog",phone:"+82-10-1234-5678",image:"ㅁㄴㅇ"})},W=n(594);console.log("bbbbbbbbbbbbbbbbb");var Z={namespaced:!0,state:{meta:[],books:[],loading:!1,theBook:{},message:""},getters:{},mutations:{updateState(e,t){Object.keys(t).forEach((n=>{e[n]=t[n]}))}},actions:{async searchBooks({state:e,commit:t},n){console.log(n),t("updateState",{message:"",loading:!0});try{const e=await q({...n,page:1}),{meta:o,documents:r}=e.data;t("updateState",{books:r}),console.log(o),console.log(r),console.log(typeof r)}catch({message:o}){t("updateState",{movies:[],message:o})}finally{t("updateState",{loading:!1})}}}};async function q(e){const{query:t,sort:n,page:o,size:r,target:a}=e;console.log(n,o,r,a);const i="fe183eb6099a52483687d16016c6ef65",u="dapi.kakao.com",c={headers:{host:u,Authorization:"KakaoAK "+i}},s=`https://dapi.kakao.com/v3/search/book?query=${t}`;return new Promise(((e,t)=>{W.Z.get(s,c).then((n=>{console.log("res"),console.log(n),n.data.Error&&t(n.data.Error),e(n)})).catch((e=>{console.log("err"),console.log(e),t(e.message)}))}))}var K=(0,x.MT)({state:{},getters:{},mutations:{},actions:{},modules:{about:F,book:Z}});n(877);(0,o.ri)(_).use(K).use(L).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,a){if(!o){var i=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],a=e[l][2];for(var u=!0,c=0;c<o.length;c++)(!1&a||i>=a)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(u=!1,a<i&&(i=a));if(u){e.splice(l--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var l=e.length;l>0&&e[l-1][2]>a;l--)e[l]=e[l-1];e[l]=[o,r,a]}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{182:"924f5b19",503:"7ca0c258",598:"be78f23d",660:"16408061"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+".59904df9.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="front-end:";n.l=function(o,r,a,i){if(e[o])e[o].push(r);else{var u,c;if(void 0!==a)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var f=s[l];if(f.getAttribute("src")==o||f.getAttribute("data-webpack")==t+a){u=f;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",t+a),u.src=o),e[o]=[r];var d=function(t,n){u.onerror=u.onload=null,clearTimeout(m);var r=e[o];if(delete e[o],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(n)})),t)return t(n)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,o,r){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=function(n){if(a.onerror=a.onload=null,"load"===n.type)o();else{var i=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=u,a.parentNode.removeChild(a),r(c)}};return a.onerror=a.onload=i,a.href=t,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],a=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(a===e||a===t))return r}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){r=i[o],a=r.getAttribute("data-href");if(a===e||a===t)return r}},o=function(o){return new Promise((function(r,a){var i=n.miniCssF(o),u=n.p+i;if(t(i,u))return r();e(o,u,null,r,a)}))},r={143:0};n.f.miniCss=function(e,t){var n={660:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var a=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=a);var i=n.p+n.u(t),u=new Error,c=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;u.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",u.name="ChunkLoadError",u.type=a,u.request=i,r[1](u)}};n.l(i,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,a,i=o[0],u=o[1],c=o[2],s=0;if(i.some((function(t){return 0!==e[t]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(c)var l=c(n)}for(t&&t(o);s<i.length;s++)a=i[s],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(l)},o=self["webpackChunkfront_end"]=self["webpackChunkfront_end"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(277)}));o=n.O(o)})();
//# sourceMappingURL=app.1f63b318.js.map