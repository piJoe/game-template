(()=>{var ft=Object.create;var ee=Object.defineProperty;var pt=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames,de=Object.getOwnPropertySymbols,ct=Object.getPrototypeOf,pe=Object.prototype.hasOwnProperty,bt=Object.prototype.propertyIsEnumerable;var fe=(t,r,e)=>r in t?ee(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,te=(t,r)=>{for(var e in r||={})pe.call(r,e)&&fe(t,e,r[e]);if(de)for(var e of de(r))bt.call(r,e)&&fe(t,e,r[e]);return t};var gt=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var vt=(t,r,e,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of mt(r))!pe.call(t,o)&&o!==e&&ee(t,o,{get:()=>r[o],enumerable:!(a=pt(r,o))||a.enumerable});return t};var yt=(t,r,e)=>(e=t!=null?ft(ct(t)):{},vt(r||!t||!t.__esModule?ee(e,"default",{value:t,enumerable:!0}):e,t));var me=(t,r,e)=>new Promise((a,o)=>{var n=i=>{try{s(e.next(i))}catch(u){o(u)}},d=i=>{try{s(e.throw(i))}catch(u){o(u)}},s=i=>i.done?a(i.value):Promise.resolve(i.value).then(n,d);s((e=e.apply(t,r)).next())});var ve=gt((Va,ge)=>{"use strict";var ht=/["'&<>]/;ge.exports=Et;function Et(t){var r=""+t,e=ht.exec(r);if(!e)return r;var a,o="",n=0,d=0;for(n=e.index;n<r.length;n++){switch(r.charCodeAt(n)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}d!==n&&(o+=r.substring(d,n)),d=n+1,o+=a}return d!==n?o+r.substring(d,n):o}});var T={me:{id:"",name:""}};var N=document.querySelector(".overlay-container"),G=new Map,xt=0;N.addEventListener("click",t=>{let r=t.target;if(r.hasAttribute("data-popup-id")){let e=r.getAttribute("data-popup-id"),a=r.getAttribute("data-value");ce(e,a)}});function ce(t,r){var a;let e=G.get(t);e&&N.removeChild(e.dom),G.delete(t),(a=e.options)!=null&&a.callback&&e.options.callback(r),G.size<1&&N.setAttribute("data-active","false")}function g(t,r,e){let a=(xt++).toString(),o=document.createElement("div");o.classList.add("container","container-fadein");let n=[];e!=null&&e.actions?n.push(...e.actions.map(s=>`<input type="button" data-popup-id="${a}" data-value="${s.value}" class="button ${s.class}" value="${s.title}">`)):n.push(`<input type="button" data-popup-id="${a}" data-value="ok" class="button button-outline" value="OK">`),o.innerHTML=`
    <div class="title-h2">${t}</div>
    <div class="dialog-content">${r&&r.length>0?`${r}`:""}</div>
    <div class="dialog-actions">${n.join("")}</div>`,e!=null&&e.alternativeContentDom&&o.querySelector(".dialog-content").appendChild(e.alternativeContentDom),G.set(a,{dom:o,options:e}),N.setAttribute("data-active","true"),N.appendChild(o);let d=o.querySelector("input[type=text]");d&&d.focus({preventScroll:!0}),e!=null&&e.closeDialogPromise&&e.closeDialogPromise.then(()=>{ce(a)})}var re=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",r=>{let{type:e,data:a}=JSON.parse(r.data);this.handleMessage(e,a)}),this.ws.addEventListener("close",()=>{g("You were disconnected","The session was closed by the server.",{callback:()=>{location.reload()}})}),new Promise(r=>{this.ws.addEventListener("open",()=>{r()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(r,e){this.ws.send(JSON.stringify({type:r,data:e}))}on(r,e,a=!1){this.listener.has(r)||this.listener.set(r,[]);let o=this.listenerId++;return this.listener.get(r).push({callback:e,once:a,id:o}),o}once(r,e){return this.on(r,e,!0)}callListeners(r,e){let a=this.listener.get(r);a&&[...a].forEach((o,n)=>{o.callback(e),o.once&&a.splice(n,1)})}off(r,e){let a=this.listener.get(r);if(!a)return;let o=a.findIndex(n=>n.id===e);o>-1&&a.splice(o,1)}handleMessage(r,e){switch(r){case"me":this.callListeners("me",e);break;case"me.game.left":this.callListeners("me.game.left",e);break;case"game.status":this.callListeners("game.status",e);break;case"game.playerlist":this.callListeners("game.playerlist",e);break;case"game.settings":this.callListeners("game.settings",e);break;case"game.question":this.callListeners("game.question",e);break;case"game.question.active":this.callListeners("game.question.active",e);break;case"game.question.answers":this.callListeners("game.question.answers",e);break;case"generic.error":this.callListeners("generic.error",e);break;default:throw Error("Not yet implemented"+r)}}},l=new re;function be(t){switch(t){case"animeFromChar":return"Guess anime title by character";case"animeGenre":return"Guess the anime's genre";case"animeStudio":return"Guess the anime's studio";case"charByPicture":return"Guess character from picture";case"animeOpening":return"BETA: Guess anime from opening";default:throw Error("Id not recognized: "+t)}}var J=yt(ve(),1);var St=typeof global=="object"&&global&&global.Object===Object&&global,H=St;var At=typeof self=="object"&&self&&self.Object===Object&&self,Tt=H||At||Function("return this")(),b=Tt;var wt=b.Symbol,I=wt;var ye=Object.prototype,Lt=ye.hasOwnProperty,It=ye.toString,_=I?I.toStringTag:void 0;function Mt(t){var r=Lt.call(t,_),e=t[_];try{t[_]=void 0;var a=!0}catch{}var o=It.call(t);return a&&(r?t[_]=e:delete t[_]),o}var xe=Mt;var kt=Object.prototype,Ot=kt.toString;function Nt(t){return Ot.call(t)}var he=Nt;var _t="[object Null]",Ct="[object Undefined]",Ee=I?I.toStringTag:void 0;function Rt(t){return t==null?t===void 0?Ct:_t:Ee&&Ee in Object(t)?xe(t):he(t)}var h=Rt;function Pt(t){return t!=null&&typeof t=="object"}var M=Pt;function Gt(t,r){for(var e=-1,a=t==null?0:t.length,o=Array(a);++e<a;)o[e]=r(t[e],e,t);return o}var Se=Gt;var Dt=Array.isArray,Ae=Dt;function Ht(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var q=Ht;var qt="[object AsyncFunction]",jt="[object Function]",Ut="[object GeneratorFunction]",Bt="[object Proxy]";function $t(t){if(!q(t))return!1;var r=h(t);return r==jt||r==Ut||r==qt||r==Bt}var j=$t;var Qt=b["__core-js_shared__"],U=Qt;var Te=function(){var t=/[^.]+$/.exec(U&&U.keys&&U.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Yt(t){return!!Te&&Te in t}var we=Yt;var Ft=Function.prototype,Vt=Ft.toString;function Wt(t){if(t!=null){try{return Vt.call(t)}catch{}try{return t+""}catch{}}return""}var E=Wt;var Kt=/[\\^$.*+?()[\]{}|]/g,Jt=/^\[object .+?Constructor\]$/,Xt=Function.prototype,zt=Object.prototype,Zt=Xt.toString,er=zt.hasOwnProperty,tr=RegExp("^"+Zt.call(er).replace(Kt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function rr(t){if(!q(t)||we(t))return!1;var r=j(t)?tr:Jt;return r.test(E(t))}var Le=rr;function ar(t,r){return t?.[r]}var Ie=ar;function or(t,r){var e=Ie(t,r);return Le(e)?e:void 0}var x=or;var sr=x(b,"WeakMap"),B=sr;var ir=9007199254740991,nr=/^(?:0|[1-9]\d*)$/;function lr(t,r){var e=typeof t;return r=r??ir,!!r&&(e=="number"||e!="symbol"&&nr.test(t))&&t>-1&&t%1==0&&t<r}var Me=lr;var ur=9007199254740991;function dr(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=ur}var $=dr;function fr(t){return t!=null&&$(t.length)&&!j(t)}var ke=fr;var pr=Object.prototype;function mr(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||pr;return t===e}var Oe=mr;function cr(t,r){for(var e=-1,a=Array(t);++e<t;)a[e]=r(e);return a}var Ne=cr;var br="[object Arguments]";function gr(t){return M(t)&&h(t)==br}var ae=gr;var _e=Object.prototype,vr=_e.hasOwnProperty,yr=_e.propertyIsEnumerable,xr=ae(function(){return arguments}())?ae:function(t){return M(t)&&vr.call(t,"callee")&&!yr.call(t,"callee")},Ce=xr;function hr(){return!1}var Re=hr;var De=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Pe=De&&typeof module=="object"&&module&&!module.nodeType&&module,Er=Pe&&Pe.exports===De,Ge=Er?b.Buffer:void 0,Sr=Ge?Ge.isBuffer:void 0,Ar=Sr||Re,He=Ar;var Tr="[object Arguments]",wr="[object Array]",Lr="[object Boolean]",Ir="[object Date]",Mr="[object Error]",kr="[object Function]",Or="[object Map]",Nr="[object Number]",_r="[object Object]",Cr="[object RegExp]",Rr="[object Set]",Pr="[object String]",Gr="[object WeakMap]",Dr="[object ArrayBuffer]",Hr="[object DataView]",qr="[object Float32Array]",jr="[object Float64Array]",Ur="[object Int8Array]",Br="[object Int16Array]",$r="[object Int32Array]",Qr="[object Uint8Array]",Yr="[object Uint8ClampedArray]",Fr="[object Uint16Array]",Vr="[object Uint32Array]",p={};p[qr]=p[jr]=p[Ur]=p[Br]=p[$r]=p[Qr]=p[Yr]=p[Fr]=p[Vr]=!0;p[Tr]=p[wr]=p[Dr]=p[Lr]=p[Hr]=p[Ir]=p[Mr]=p[kr]=p[Or]=p[Nr]=p[_r]=p[Cr]=p[Rr]=p[Pr]=p[Gr]=!1;function Wr(t){return M(t)&&$(t.length)&&!!p[h(t)]}var qe=Wr;function Kr(t){return function(r){return t(r)}}var je=Kr;var Ue=typeof exports=="object"&&exports&&!exports.nodeType&&exports,C=Ue&&typeof module=="object"&&module&&!module.nodeType&&module,Jr=C&&C.exports===Ue,oe=Jr&&H.process,Xr=function(){try{var t=C&&C.require&&C.require("util").types;return t||oe&&oe.binding&&oe.binding("util")}catch{}}(),se=Xr;var Be=se&&se.isTypedArray,zr=Be?je(Be):qe,$e=zr;var Zr=Object.prototype,ea=Zr.hasOwnProperty;function ta(t,r){var e=Ae(t),a=!e&&Ce(t),o=!e&&!a&&He(t),n=!e&&!a&&!o&&$e(t),d=e||a||o||n,s=d?Ne(t.length,String):[],i=s.length;for(var u in t)(r||ea.call(t,u))&&!(d&&(u=="length"||o&&(u=="offset"||u=="parent")||n&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||Me(u,i)))&&s.push(u);return s}var Qe=ta;function ra(t,r){return function(e){return t(r(e))}}var Ye=ra;var aa=Ye(Object.keys,Object),Fe=aa;var oa=Object.prototype,sa=oa.hasOwnProperty;function ia(t){if(!Oe(t))return Fe(t);var r=[];for(var e in Object(t))sa.call(t,e)&&e!="constructor"&&r.push(e);return r}var Ve=ia;function na(t){return ke(t)?Qe(t):Ve(t)}var We=na;var la=x(b,"Map"),Q=la;var ua=x(b,"DataView"),Y=ua;var da=x(b,"Promise"),F=da;var fa=x(b,"Set"),V=fa;var Ke="[object Map]",pa="[object Object]",Je="[object Promise]",Xe="[object Set]",ze="[object WeakMap]",Ze="[object DataView]",ma=E(Y),ca=E(Q),ba=E(F),ga=E(V),va=E(B),w=h;(Y&&w(new Y(new ArrayBuffer(1)))!=Ze||Q&&w(new Q)!=Ke||F&&w(F.resolve())!=Je||V&&w(new V)!=Xe||B&&w(new B)!=ze)&&(w=function(t){var r=h(t),e=r==pa?t.constructor:void 0,a=e?E(e):"";if(a)switch(a){case ma:return Ze;case ca:return Ke;case ba:return Je;case ga:return Xe;case va:return ze}return r});var et=w;function ya(t){var r=-1,e=Array(t.size);return t.forEach(function(a,o){e[++r]=[o,a]}),e}var tt=ya;function xa(t,r){return Se(r,function(e){return[e,t[e]]})}var rt=xa;function ha(t){var r=-1,e=Array(t.size);return t.forEach(function(a){e[++r]=[a,a]}),e}var at=ha;var Ea="[object Map]",Sa="[object Set]";function Aa(t){return function(r){var e=et(r);return e==Ea?tt(r):e==Sa?at(r):rt(r,t(r))}}var ot=Aa;var Ta=ot(We),ie=Ta;var R=null,P=[],f=class{constructor(){this.killWhenInactive=!0;this.additionalClasses=[];this.globalDropdownOptions=null}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen",...this.additionalClasses),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(r="right",e){let a="cur-none";switch(r){case"left":a="cur-left";break;case"right":a="cur";break;case"fade":a="cur-fade";break}if(f.pushScreenStack(this),document.dispatchEvent(new CustomEvent("screenChanged")),e){this.domRef.setAttribute("data-screen-active",a),this.domRef.setAttribute("data-screen-overlay","true");return}R&&R.setInactive(r),this.domRef.setAttribute("data-screen-active",a),R=this}setInactive(r="right"){let e="prev-none";switch(r){case"left":e="prev-left";break;case"right":e="prev";break;case"fade":e="prev-fade";break}this.domRef.setAttribute("data-screen-active",e),this.killWhenInactive&&this.die(),f.popScreenStack(this),document.dispatchEvent(new CustomEvent("screenChanged"))}die(){R===this&&(R=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(r){return r.setup(),r.render(),r.init(),r}static pushScreenStack(r){f.popScreenStack(r),P.push(r)}static popScreenStack(r){P.includes(r)&&P.splice(P.indexOf(r),1)}static getCurrentScreen(){return P.at(-1)}};var W=class extends f{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["gradient-bg-screen"]}init(){this.domRef.querySelector("#settings-close").addEventListener("click",a=>{this.setInactive("fade")});let e=this.domRef.querySelector("form");e.addEventListener("input",a=>{let n=e.elements.namedItem("anime-title-language").value;S.languagePreference=n})}setActive(){super.setActive("fade",!0)}template(){return`
    <div class="title-bar">
      <h1 class="title-h1">SETTINGS</h1>
      <div class="tab-menu">
        <div class="tab-menu-entry" data-active="true" data-target-tab="general">General</div>
        <!--<div class="tab-menu-entry" data-target-tab="audio">Audio</div>-->
      </div>
      <div class="title-bar-spacer"></div>
    </div>

    <section class="content-wrapper" data-tab="general">
      <div class="container-wrapper">
        <form class="list">
          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Anime Title Language</span>
              <select name="anime-title-language">
                ${["Default","Shortest","English","Japanese","German","Spanish","French"].map(e=>`<option 
                      value="${e}" 
                      ${S.languagePreference===e?"selected":""}>${e}</option>`)}
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
    
    <div class="bottom-container" data-tab="general">
      <input type="button" class="button button-outline" id="settings-close" value="Back">
    </div>`}};var wa={volume:1,languagePreference:"Default"},it,La=te(te({},wa),JSON.parse((it=localStorage.getItem("settings"))!=null?it:"{}")),S=new Proxy(La,{set(t,r,e){return t[r]=e,localStorage.setItem("settings",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("globalSettingsChanged",{detail:t})),!0}}),ne=document.querySelector(".settings-overlay"),K=ne.querySelector(".settings-dropdown"),Ia=ne.querySelector(".settings-button"),Ma=f.spawnScreen(new W);document.addEventListener("click",t=>{var e;let r=t.target;if(r===Ia){K.toggleAttribute("data-active");return}if(K.contains(r)){let a=r.closest("[data-link]");if(!a)return;switch(a.getAttribute("data-link")){case"settings-screen":Ma.setActive();break;case"_additional":let o=parseInt(a.getAttribute("data-link-id")),n=f.getCurrentScreen();n.globalDropdownOptions&&((e=n.globalDropdownOptions[o])==null||e.callback());break}}K.toggleAttribute("data-active",!1)});document.addEventListener("screenChanged",t=>{ka()});function ka(){let t=[],r=f.getCurrentScreen();r.globalDropdownOptions&&t.push(...r.globalDropdownOptions),K.innerHTML=`
  <div class="settings-dropdown-entry settings-dropdown-entry-inverted">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /></svg>
    <input type="range" id="setting-audio-volume" min="1" max="100" value="${S.volume*100}">
  </div>
  <div class="settings-dropdown-entry" data-link="settings-screen">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
    Settings
  </div>
  ${t.map((e,a)=>`
    <div class="settings-dropdown-entry" data-link="_additional" data-link-id="${a}">
      <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${e.svgPath}</svg>
      ${e.title}
    </div>`)}`,ne.querySelector("#setting-audio-volume").addEventListener("input",e=>{S.volume=parseInt(e.target.value)/100})}function le(t){var e,a,o,n,d,s,i,u,v,y,A,L,O,m;if(typeof t=="string")return t;let r=(a=(e=t.find(c=>c.type==="Default"))==null?void 0:e.title)!=null?a:t.at(0).title;switch(S.languagePreference){case"Default":return r;case"Shortest":return(n=(o=t.filter(c=>["Default","Synonym"].includes(c.type)).sort((c,dt)=>c.title.length-dt.title.length).at(0))==null?void 0:o.title)!=null?n:r;case"English":return(s=(d=t.find(c=>c.type==="English"))==null?void 0:d.title)!=null?s:r;case"Japanese":return(u=(i=t.find(c=>c.type==="Japanese"))==null?void 0:i.title)!=null?u:r;case"German":return(y=(v=t.find(c=>c.type==="German"))==null?void 0:v.title)!=null?y:r;case"Spanish":return(L=(A=t.find(c=>c.type==="Spanish"))==null?void 0:A.title)!=null?L:r;case"French":return(m=(O=t.find(c=>c.type==="French"))==null?void 0:O.title)!=null?m:r}return r}function lt(t){var e;let r=(e=t==null?void 0:t.data)!=null?e:{};return t.template.map(a=>{let o=r[a];return o?typeof o=="string"?o:le(o):a}).join("")}var nt=document.createElement("canvas").getContext("2d");function ut(t,r="800 22px Fira Sans, sans-serif"){return nt.font=r,nt.measureText(t).width}var X=class extends f{constructor(e,a,o){super();this.globalDropdownOptions=[{svgPath:'<path d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" />',title:"Leave Session",callback:this.leaveGameGuarded.bind(this)}];this.questionId=null;this.ownAnwser=null;this.questionDone=!1;this.lobby=e,this.questionId=a,this.question=o}init(){this.domRef.addEventListener("click",a=>{let o=a.target;if(!o.hasAttribute("data-answer"))return;let n=o.getAttribute("data-answer");this.ownAnwser=parseInt(n),l.sendMsg("game.question.answer",{questionId:this.questionId,answer:this.ownAnwser}),this.domRef.querySelectorAll("[data-answer-selected=true]").forEach(d=>{d.removeAttribute("data-answer-selected")}),o.setAttribute("data-answer-selected","true")}),this.question.question.audioUrl&&(this.audio=new Audio(this.question.question.audioUrl),this.audio.preload="auto",this.audio.autoplay=!1,this.audio.volume=S.volume,document.addEventListener("globalSettingsChanged",this.settingsChanged.bind(this))),this.domRef.querySelectorAll(".answers > li").forEach(a=>{let o=a.getBoundingClientRect().width-64,n=ut(a.getAttribute("data-str-val"));a.style.fontSize=`${Math.min(Math.max(22*(o/n),16),22)}px`}),this.timerDOM=this.domRef.querySelector(".question-timer")}setActive(){super.setActive(),this.timerStarted=Date.now(),this.audio&&this.audio.play(),window.requestAnimationFrame(()=>{this.updateTimer()})}settingsChanged(e){this.audio.volume=e.detail.volume}updateTimer(){let e=this.question.timeoutMs-500,a=Math.ceil((this.timerStarted+e-Date.now())/1e3),o=Math.max(1-(Date.now()-this.timerStarted)/e,0);this.questionDone&&(o=0),this.timerDOM.style.transform=`scaleX(${o})`,(a>0||!this.questionDone)&&window.requestAnimationFrame(()=>{this.updateTimer()})}showAnswers(e,a){let{correct:o,wrong:n}=e,d=ie(a);o.forEach(s=>{this.domRef.querySelector(`li[data-answer="${s}"]`).setAttribute("data-answer-correct","true")}),n.includes(this.ownAnwser)&&this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct","false"),this.question.question.image&&this.domRef.querySelector(".question-image").removeAttribute("data-blurred"),d.forEach(([s,i])=>{let u=this.lobby.getPlayerEntryById(s).name,v=this.domRef.querySelector(`li[data-answer="${i}"] > .answer-others-container`),y=document.createElement("div");y.classList.add("answer-others","skewed-tag"),y.innerHTML=`<span>${u}</span>`,v.appendChild(y)}),this.questionDone=!0}leaveGameGuarded(){g("Are you sure?","You cannot join again as long as the game is running.",{actions:[{class:"button-outline",title:"Cancel",value:"cancel"},{class:"button-error",title:"Leave Game",value:"leave"}],callback:e=>{e==="leave"&&l.sendMsg("game.leave")}})}setInactive(e){super.setInactive(e),this.audio&&(this.audio.pause(),this.audio.remove())}die(){super.die(),document.removeEventListener("globalSettingsChanged",this.settingsChanged)}template(){let e=this.question.question,a=this.question.answers,o=!!this.question.question.image,n=!!this.question.question.audioUrl;return`
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId+1}</div>
        ${o?`<div class="question-image-container">
            <img class="question-image" ${e.imageBlurred?"data-blurred=true":""} src="${(0,J.default)(e.image)}">
            </div>`:""}
        <div class="question-title title-h3">${(0,J.default)(lt(e.title))}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${a.map((d,s)=>{let i=(0,J.default)(le(d));return`<li data-answer="${s}" data-str-val="${i}">
            ${i}
            <div class="answer-others-container"></div>
          </li>`}).join("")}
      </ul>
    </div>`}};var z=class extends f{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["gradient-bg-screen"];this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[];this.questions=new Map}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let e=this.domRef.querySelector("#copy-lobby-id");this.lobbySettingsDom=this.domRef.querySelector(".lobby-settings");let a=this.domRef.querySelector("#lobby-back-button");document.addEventListener("keydown",this.keydown.bind(this)),document.addEventListener("keyup",this.keyup.bind(this));let o=this.domRef.querySelector(".lobby-playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=l.on("game.status",({id:s,status:i})=>{if(this.lobbyId=s,this.domRef.querySelector("#lobby-id").innerHTML=s,this.currentLobbyStatus&&this.currentLobbyStatus!==i)switch(i){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),g("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=i,this.updateReadyButton()}),this.playerlistListener=l.on("game.playerlist",({playerlist:s,host:i})=>{var O;this.playerlist=s,this.lobbyHost=this.playerlist.find(m=>m.playerId===i);let u=new Array(Math.max(6-this.playerlist.length,0)).fill(!0),v=[...this.playerlist].map(m=>`<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <div class="player-name">
                    <span>${m.name}</span>
                    <div class="player-icons">
                      ${m===this.lobbyHost?'<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z" /></svg>':""}
                    </div>
                  </div>
                  ${m.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
                </div>
                <div class="list-row-entry player-row-more">
                  <div 
                    class="player-more-button" 
                    data-player-id="${m.playerId}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                    </svg>
                  </div>
                </div>
              </li>`).join(""),y=u.map(m=>`<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`).join("");o.innerHTML=v+y,this.scoreboardDom.innerHTML=[...this.playerlist].sort((m,c)=>c.score-m.score).map(m=>`<li class="playerlist-entry">
                ${m.name}
                <div class="skewed-tag ${m.playerId===T.me.id?"skewed-tag-primary":""} tag-score">${m.score}</div>
              </li>`).join("");let A=this.playerlist.filter(m=>m.ready).length;document.querySelector("#lobby-dd-ready").innerHTML=`${A}/${this.playerlist.length}`,document.querySelector("#lobby-dd-host").innerHTML=(O=this.lobbyHost)==null?void 0:O.name;let L=s.find(m=>m.playerId===T.me.id);this.selfReady=L==null?void 0:L.ready,this.updateReadyButton(),this.updateSaveSettingsButton()}),this.gameSettingsListener=l.on("game.settings",({currentSettings:s,availableQuestions:i})=>{this.renderSettings(s,i),document.querySelector("#lobby-dd-question-amount").innerHTML=`${s["questionCount"]}`}),this.questionListener=l.on("game.question",({id:s,question:i})=>{let u=f.spawnScreen(new X(this,s,i));this.questions.set(s,u)}),this.questionActiveListener=l.on("game.question.active",({id:s})=>{this.questions.get(s).setActive()}),this.questionAnswersListener=l.on("game.question.answers",({id:s,answers:i,playerAnswers:u})=>{this.questions.get(s).showAnswers(i,u)}),this.selfLeftListener=l.on("me.game.left",({reason:s})=>{this.leaveLobby(),s==="KICKED_INACTIVITY"&&g("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",s=>{this.selfReady=!this.selfReady,l.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),e.addEventListener("click",s=>{s.preventDefault(),navigator.clipboard.writeText(this.lobbyId)});let n=this.domRef.querySelectorAll("[data-tab]"),d=this.domRef.querySelector(".tab-menu");d.addEventListener("click",s=>{s.preventDefault();let i=s.target,u=i.getAttribute("data-target-tab");console.log(i,u),u&&(d.querySelector("[data-active=true]").removeAttribute("data-active"),i.setAttribute("data-active","true"),n.forEach(v=>{v.setAttribute("data-inactive","true"),v.getAttribute("data-tab")===u&&v.removeAttribute("data-inactive")}))}),a.addEventListener("click",s=>{s.preventDefault(),l.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",s=>{s.preventDefault(),this.submitSettings()}),this.settingsSubmitButton=this.domRef.querySelector(".button[name=update-settings]"),this.lobbySettingsDom.addEventListener("input",s=>{if(s.preventDefault(),!this.selfIsHost()){this.lobbySettingsDom.reset();return}this.settingsSubmitButton.setAttribute("data-active","true")}),o.addEventListener("click",s=>{s.preventDefault();let u=s.target.closest(".player-more-button");if(!u)return;let v=u.getAttribute("data-player-id"),y=this.playerlist.find(A=>A.playerId===v);if(!y){console.error("something went terribly wrong, idk how!");return}if(this.lobbyHost.playerId!==T.me.id){g("You're not the host.","Only the host can interact with this.");return}g(y.name,"",{actions:[{title:"Cancel",class:"button-outline",value:"cancel"},{title:"Kick",class:"button-error",value:"kick"},{title:"Make Host",class:"button-primary",value:"makehost"}],callback:A=>{switch(A){case"kick":g("Work in Progress","kekw");break;case"makehost":l.sendMsg("game.change.host",{newHost:y.playerId});break}}})})}renderSettings(e,a){let n=[{label:"No. of Questions",inputs:[{value:e["questionCount"],name:"questionCount",type:"number",min:3,max:50}]},{label:"Popularity",inputs:[{value:e["minPopularity"],name:"minPopularity",type:"number",min:-1,max:1e4},{value:e["maxPopularity"],name:"maxPopularity",type:"number",min:-1,max:1e4}]},{label:"Year",inputs:[{value:e["minYear"],name:"minYear",type:"number",min:-1,max:1e4},{value:e["maxYear"],name:"maxYear",type:"number",min:-1,max:1e4}]},{label:"Main Role Only",inputs:[{value:e["mainRoleOnly"],checked:e["mainRoleOnly"],name:"mainRoleOnly",type:"checkbox"}]}].map(s=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${s.label}</span>
            ${s.inputs.map(i=>`<input name="${i.name}" type="${i.type}" 
                  ${i.type!=="checkbox"?'style="width:6rem" required':""} 
                  value="${i.value}" 
                  ${i.min?`min="${i.min}"`:""} 
                  ${i.max?`max="${i.max}"`:""} 
                  ${i.checked?"checked":""}>`).join(" - ")}
          </div>
        </div>`).join(""),d=a.map(s=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${be(s)}</span>
            <input type="checkbox" id="q_${s}" 
            name="${"activeQuestions"}" 
            value="${s}" 
            ${e["activeQuestions"].some(i=>s===i)?"checked":""}>
          </div>
        </div>`).join("");this.lobbySettingsDom.innerHTML=`<div class="list-row list-row-header">Filters</div>
    ${n}
    
    <div class="list-row list-row-header">Questions</div>
    ${d}`,this.settingsSubmitButton.removeAttribute("data-active")}submitSettings(){l.sendMsg("game.settings",{settings:{["questionCount"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"questionCount"}"]`).value),["activeQuestions"]:Array.from(this.lobbySettingsDom.querySelectorAll(`[name="${"activeQuestions"}"]:checked`)).map(e=>e.value),["mainRoleOnly"]:this.lobbySettingsDom.querySelector(`[name="${"mainRoleOnly"}"]`).checked,["minPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minPopularity"}"]`).value),["maxPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxPopularity"}"]`).value),["minYear"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minYear"}"]`).value),["maxYear"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxYear"}"]`).value)}})}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}updateSaveSettingsButton(){let e=this.domRef.querySelector("#update-settings-button");this.selfIsHost()?(e.value="Save",e.disabled=!1):(e.value="Only host can save",e.disabled=!0)}getPlayerEntryById(e){return this.playerlist.find(a=>a.playerId===e)}leaveLobby(){f.spawnScreen(new k).setActive("left"),this.die()}selfIsHost(){return this.lobbyHost&&this.lobbyHost.playerId===T.me.id}template(){return`
    <div class="title-bar">
      <h1 class="title-h1">LOBBY</h1>
      <div class="tab-menu">
        <div class="tab-menu-entry" data-active="true" data-target-tab="overview">Overview</div>
        <!-- <div class="tab-menu-entry" data-target-tab="presets">Presets</div> -->
        <div class="tab-menu-entry" data-target-tab="settings">Settings</div>
      </div>
      <div class="title-bar-spacer"></div>
    </div>

    <section class="content-wrapper" data-tab="overview">
      <div class="multiple-container-wrapper lobby-container-wrapper">

        <div class="container container-translucent lobby-container">
          <div class="title-h3 lobby-title">
            Lobby Code<br>
            <span class="title-h2">
            <span id="lobby-id">${this.lobbyId}</span>&nbsp;
              <a id="copy-lobby-id" title="Copy Lobby ID" class="button button-outline button-icon-inline" style="vertical-align: middle; margin-top: -8px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7Z" fill="currentColor"/>
                </svg>
              </a>
            </span>
          </div>

          <dl>
            <dt>Player Ready</dt>
            <dd id="lobby-dd-ready">0/0</dd>

            <dt>No. of Questions</dt>
            <dd id="lobby-dd-question-amount">20</dd>

            <dt>Host</dt>
            <dd id="lobby-dd-host">-/-</dd>
          </dl>
        </div>

        <ul class="list lobby-playerlist">
        </ul>

      </div>
    </section>

    <section class="content-wrapper" data-tab="settings" data-inactive="true">
      <div class="container-wrapper">
        <form class="lobby-settings list" id="lobby-settings"></form>
      </div>
    </section>
    
    <section class="content-wrapper" data-tab="presets" data-inactive="true">
      <div class="grid-container-wrapper">
        <div class="container">Hier ist mein Preset und da steht sogar ne megagro\xDFe und ausf\xFChrliche Beschreibung dabei</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
        <div class="container">Hier ist mein Preset</div>
      </div>
    </section>

    <div class="bottom-container" data-tab="overview">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Leave">
      <input type="button" class="button button-primary" id="lobby-ready" value="Ready" disabled=true>
    </div>

    <div class="bottom-container" data-tab="settings" data-inactive="true">
      <input type="submit" class="button button-outline" name="update-settings" id="update-settings-button" form="lobby-settings" value="Save">
    </div>`}keydown(e){if(this.currentLobbyStatus!=="IN_GAME"||e.key!=="Tab"||(e.preventDefault(),e.stopPropagation(),e.repeat))return;this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let a=new Promise(o=>{this.scoreboardCloseCallback=o});g("Scoreboard",void 0,{actions:[],closeDialogPromise:a,alternativeContentDom:this.scoreboardDom})}keyup(e){e.key==="Tab"&&this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}die(){super.die(),l.off("game.status",this.statusListener),l.off("game.playerlist",this.playerlistListener),l.off("game.settings",this.gameSettingsListener),l.off("game.question",this.questionListener),l.off("game.question.active",this.questionActiveListener),l.off("game.question.answers",this.questionAnswersListener),l.off("me.game.left",this.selfLeftListener),this.questions.forEach(e=>{e.die()}),document.removeEventListener("keydown",this.keydown),document.removeEventListener("keyup",this.keyup)}};var k=class extends f{init(){this.domRef.addEventListener("click",a=>{a.preventDefault();let n=a.target.closest(".join-container");if(!n)return;switch(n.getAttribute("data-action")){case"join":this.showJoinDialog();break;case"create":l.sendMsg("game.create");break}}),this.errListener=l.on("generic.error",({title:a})=>{console.log("called err"),g(a),this.submitDisabled(!1)});let e=f.spawnScreen(new z);this.joinedListener=l.once("game.status",({id:a,status:o})=>{l.off("generic.error",this.errListener),e.setActive()})}showJoinDialog(){let e=document.createElement("div");e.innerHTML='<input type="text" name="lobby-id" autocomplete="off" required minlength=4 placeholder="XXXX">',g("Join Game","",{alternativeContentDom:e,actions:[{value:"cancel",title:"Cancel",class:"button-outline"},{value:"join",title:"Join",class:"button-primary"}],callback:a=>{switch(a){case"join":let{value:o}=e.querySelector('[name="lobby-id"]');l.sendMsg("game.join",{id:o});break}}})}submitDisabled(e){this.domRef.querySelectorAll("input[type=submit]").forEach(a=>a.disabled=e)}die(){super.die(),l.off("generic.error",this.errListener),l.off("game.status",this.joinedListener)}template(){return`
    <h1 class="title-h1">PLAY</h1>
    <section class="multiple-container-wrapper">
      <div class="container container-image join-container" data-action="join">
        <img src="/imgs/join.jpg" alt="join">
        <div class="container-image-content">
          <div class="title-h2">Join Game</div>
          <p class="join-container-description">Join an existing game and have fun with your friends</p>
        </div>
      </div>

      <div class="container container-image join-container" data-action="create">
        <img src="/imgs/create.jpg" alt="create">
        <div class="container-image-content">
          <div class="title-h2">Create Game</div>
          <p class="join-container-description">Create a new game with your own custom settings</p>
        </div>
        <!-- <form name="create">
          <input type="submit" class="button button-primary" name="create-new" value="Create New">
        </form> -->
      </div>
    </section>`}};var Z=class extends f{constructor(){super(...arguments);this.additionalClasses=["gradient-bg-screen"]}init(){this.domRef.querySelector("form").addEventListener("submit",e=>me(this,null,function*(){e.preventDefault();let a=e.target.submit;a.disabled=!0;let o=e.target.username.value;l.isOpen()||(yield l.open()),l.sendMsg("me.change_name",{name:o}),f.spawnScreen(new k).setActive()}))}setActive(){super.setActive("none"),this.domRef.querySelector("input[name=username]").focus({preventScroll:!0})}template(){return`
    <div class="title-bar">
      <div class="title-bar-spacer"></div>
    </div>
    <div class="content-wrapper">
      <div class="vertical-container-wrapper">
        <div class="login-logo">
        <img src="/imgs/logo.png" alt="logo">
        </div>
        <form class="stacked-form" name="login">
          <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
          <input type="submit" class="button button-primary" name="submit" value="Start">
        </form>
      </div>
    </div>
    <div class="bottom-container align-right" data-tab="overview">
      <!-- <a href="" class="button button-outline button-small">Discord</a> -->
    </div>`}die(){super.die(),l.off("generic.error",this.errListener)}};window.onbeforeunload=function(t){return t.preventDefault(),"are you sure?"};l.on("me",t=>{T.me.id=t.id,T.me.name=t.name});var Oa=f.spawnScreen(new Z);Oa.setActive();})();
/*! Bundled license information:

escape-html/index.js:
  (*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
