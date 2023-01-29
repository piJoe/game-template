(()=>{var ut=Object.create;var Z=Object.defineProperty;var ft=Object.getOwnPropertyDescriptor;var dt=Object.getOwnPropertyNames,ue=Object.getOwnPropertySymbols,mt=Object.getPrototypeOf,de=Object.prototype.hasOwnProperty,pt=Object.prototype.propertyIsEnumerable;var fe=(t,r,e)=>r in t?Z(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,ee=(t,r)=>{for(var e in r||={})de.call(r,e)&&fe(t,e,r[e]);if(ue)for(var e of ue(r))pt.call(r,e)&&fe(t,e,r[e]);return t};var ct=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var bt=(t,r,e,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of dt(r))!de.call(t,o)&&o!==e&&Z(t,o,{get:()=>r[o],enumerable:!(a=ft(r,o))||a.enumerable});return t};var gt=(t,r,e)=>(e=t!=null?ut(mt(t)):{},bt(r||!t||!t.__esModule?Z(e,"default",{value:t,enumerable:!0}):e,t));var _=(t,r,e)=>new Promise((a,o)=>{var n=i=>{try{s(e.next(i))}catch(f){o(f)}},u=i=>{try{s(e.throw(i))}catch(f){o(f)}},s=i=>i.done?a(i.value):Promise.resolve(i.value).then(n,u);s((e=e.apply(t,r)).next())});var be=ct((Qa,ce)=>{"use strict";var xt=/["'&<>]/;ce.exports=vt;function vt(t){var r=""+t,e=xt.exec(r);if(!e)return r;var a,o="",n=0,u=0;for(n=e.index;n<r.length;n++){switch(r.charCodeAt(n)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}u!==n&&(o+=r.substring(u,n)),u=n+1,o+=a}return u!==n?o+r.substring(u,n):o}});var A={me:{id:"",name:""}};var O=document.querySelector(".overlay-container"),G=new Map,yt=0;O.addEventListener("click",t=>{let r=t.target;if(r.hasAttribute("data-popup-id")){let e=r.getAttribute("data-popup-id"),a=r.getAttribute("data-value");me(e,a)}});function me(t,r){var a;let e=G.get(t);e&&O.removeChild(e.dom),G.delete(t),(a=e.options)!=null&&a.callback&&e.options.callback(r),G.size<1&&O.setAttribute("data-active","false")}function S(t,r,e){let a=(yt++).toString(),o=document.createElement("div");o.classList.add("container","container-fadein");let n=[];e!=null&&e.actions?n.push(...e.actions.map(u=>`<input type="button" data-popup-id="${a}" data-value="${u.value}" class="button ${u.class}" value="${u.title}">`)):n.push(`<input type="button" data-popup-id="${a}" data-value="ok" class="button button-outline" value="OK">`),o.innerHTML=`
    <div class="title-h2">${t}</div>
    <div class="dialog-content">${r&&r.length>0?`${r}`:""}</div>
    <div class="dialog-actions">${n.join("")}</div>`,e!=null&&e.alternativeContentDom&&o.querySelector(".dialog-content").appendChild(e.alternativeContentDom),G.set(a,{dom:o,options:e}),O.setAttribute("data-active","true"),O.appendChild(o),e!=null&&e.closeDialogPromise&&e.closeDialogPromise.then(()=>{me(a)})}var te=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",r=>{let{type:e,data:a}=JSON.parse(r.data);this.handleMessage(e,a)}),this.ws.addEventListener("close",()=>{S("You were disconnected","The session was closed by the server.",{callback:()=>{location.reload()}})}),new Promise(r=>{this.ws.addEventListener("open",()=>{r()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(r,e){this.ws.send(JSON.stringify({type:r,data:e}))}on(r,e,a=!1){this.listener.has(r)||this.listener.set(r,[]);let o=this.listenerId++;return this.listener.get(r).push({callback:e,once:a,id:o}),o}once(r,e){return this.on(r,e,!0)}callListeners(r,e){let a=this.listener.get(r);a&&[...a].forEach((o,n)=>{o.callback(e),o.once&&a.splice(n,1)})}off(r,e){let a=this.listener.get(r);if(!a)return;let o=a.findIndex(n=>n.id===e);o>-1&&a.splice(o,1)}handleMessage(r,e){switch(r){case"me":this.callListeners("me",e);break;case"me.game.left":this.callListeners("me.game.left",e);break;case"game.status":this.callListeners("game.status",e);break;case"game.playerlist":this.callListeners("game.playerlist",e);break;case"game.settings":this.callListeners("game.settings",e);break;case"game.question":this.callListeners("game.question",e);break;case"game.question.active":this.callListeners("game.question.active",e);break;case"game.question.answers":this.callListeners("game.question.answers",e);break;case"generic.error":this.callListeners("generic.error",e);break;default:throw Error("Not yet implemented"+r)}}},l=new te;function pe(t){switch(t){case"animeFromChar":return"Guess anime title by character";case"animeGenre":return"Guess the anime's genre";case"animeStudio":return"Guess the anime's studio";case"charByPicture":return"Guess character from picture";case"animeOpening":return"BETA: Guess anime from opening";default:throw Error("Id not recognized: "+t)}}var K=gt(be(),1);var ht=typeof global=="object"&&global&&global.Object===Object&&global,q=ht;var Et=typeof self=="object"&&self&&self.Object===Object&&self,St=q||Et||Function("return this")(),b=St;var At=b.Symbol,L=At;var ge=Object.prototype,Tt=ge.hasOwnProperty,It=ge.toString,k=L?L.toStringTag:void 0;function Lt(t){var r=Tt.call(t,k),e=t[k];try{t[k]=void 0;var a=!0}catch{}var o=It.call(t);return a&&(r?t[k]=e:delete t[k]),o}var ye=Lt;var Mt=Object.prototype,wt=Mt.toString;function Nt(t){return wt.call(t)}var xe=Nt;var _t="[object Null]",Ot="[object Undefined]",ve=L?L.toStringTag:void 0;function kt(t){return t==null?t===void 0?Ot:_t:ve&&ve in Object(t)?ye(t):xe(t)}var x=kt;function Rt(t){return t!=null&&typeof t=="object"}var M=Rt;function Ct(t,r){for(var e=-1,a=t==null?0:t.length,o=Array(a);++e<a;)o[e]=r(t[e],e,t);return o}var he=Ct;var Pt=Array.isArray,Ee=Pt;function Gt(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var H=Gt;var Dt="[object AsyncFunction]",qt="[object Function]",Ht="[object GeneratorFunction]",jt="[object Proxy]";function Ut(t){if(!H(t))return!1;var r=x(t);return r==qt||r==Ht||r==Dt||r==jt}var j=Ut;var Bt=b["__core-js_shared__"],U=Bt;var Se=function(){var t=/[^.]+$/.exec(U&&U.keys&&U.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function $t(t){return!!Se&&Se in t}var Ae=$t;var Qt=Function.prototype,Yt=Qt.toString;function Ft(t){if(t!=null){try{return Yt.call(t)}catch{}try{return t+""}catch{}}return""}var v=Ft;var Wt=/[\\^$.*+?()[\]{}|]/g,Vt=/^\[object .+?Constructor\]$/,Kt=Function.prototype,Jt=Object.prototype,Xt=Kt.toString,zt=Jt.hasOwnProperty,Zt=RegExp("^"+Xt.call(zt).replace(Wt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function er(t){if(!H(t)||Ae(t))return!1;var r=j(t)?Zt:Vt;return r.test(v(t))}var Te=er;function tr(t,r){return t?.[r]}var Ie=tr;function rr(t,r){var e=Ie(t,r);return Te(e)?e:void 0}var y=rr;var ar=y(b,"WeakMap"),B=ar;var or=9007199254740991,sr=/^(?:0|[1-9]\d*)$/;function ir(t,r){var e=typeof t;return r=r??or,!!r&&(e=="number"||e!="symbol"&&sr.test(t))&&t>-1&&t%1==0&&t<r}var Le=ir;var nr=9007199254740991;function lr(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=nr}var $=lr;function ur(t){return t!=null&&$(t.length)&&!j(t)}var Me=ur;var fr=Object.prototype;function dr(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||fr;return t===e}var we=dr;function mr(t,r){for(var e=-1,a=Array(t);++e<t;)a[e]=r(e);return a}var Ne=mr;var pr="[object Arguments]";function cr(t){return M(t)&&x(t)==pr}var re=cr;var _e=Object.prototype,br=_e.hasOwnProperty,gr=_e.propertyIsEnumerable,yr=re(function(){return arguments}())?re:function(t){return M(t)&&br.call(t,"callee")&&!gr.call(t,"callee")},Oe=yr;function xr(){return!1}var ke=xr;var Pe=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Re=Pe&&typeof module=="object"&&module&&!module.nodeType&&module,vr=Re&&Re.exports===Pe,Ce=vr?b.Buffer:void 0,hr=Ce?Ce.isBuffer:void 0,Er=hr||ke,Ge=Er;var Sr="[object Arguments]",Ar="[object Array]",Tr="[object Boolean]",Ir="[object Date]",Lr="[object Error]",Mr="[object Function]",wr="[object Map]",Nr="[object Number]",_r="[object Object]",Or="[object RegExp]",kr="[object Set]",Rr="[object String]",Cr="[object WeakMap]",Pr="[object ArrayBuffer]",Gr="[object DataView]",Dr="[object Float32Array]",qr="[object Float64Array]",Hr="[object Int8Array]",jr="[object Int16Array]",Ur="[object Int32Array]",Br="[object Uint8Array]",$r="[object Uint8ClampedArray]",Qr="[object Uint16Array]",Yr="[object Uint32Array]",d={};d[Dr]=d[qr]=d[Hr]=d[jr]=d[Ur]=d[Br]=d[$r]=d[Qr]=d[Yr]=!0;d[Sr]=d[Ar]=d[Pr]=d[Tr]=d[Gr]=d[Ir]=d[Lr]=d[Mr]=d[wr]=d[Nr]=d[_r]=d[Or]=d[kr]=d[Rr]=d[Cr]=!1;function Fr(t){return M(t)&&$(t.length)&&!!d[x(t)]}var De=Fr;function Wr(t){return function(r){return t(r)}}var qe=Wr;var He=typeof exports=="object"&&exports&&!exports.nodeType&&exports,R=He&&typeof module=="object"&&module&&!module.nodeType&&module,Vr=R&&R.exports===He,ae=Vr&&q.process,Kr=function(){try{var t=R&&R.require&&R.require("util").types;return t||ae&&ae.binding&&ae.binding("util")}catch{}}(),oe=Kr;var je=oe&&oe.isTypedArray,Jr=je?qe(je):De,Ue=Jr;var Xr=Object.prototype,zr=Xr.hasOwnProperty;function Zr(t,r){var e=Ee(t),a=!e&&Oe(t),o=!e&&!a&&Ge(t),n=!e&&!a&&!o&&Ue(t),u=e||a||o||n,s=u?Ne(t.length,String):[],i=s.length;for(var f in t)(r||zr.call(t,f))&&!(u&&(f=="length"||o&&(f=="offset"||f=="parent")||n&&(f=="buffer"||f=="byteLength"||f=="byteOffset")||Le(f,i)))&&s.push(f);return s}var Be=Zr;function ea(t,r){return function(e){return t(r(e))}}var $e=ea;var ta=$e(Object.keys,Object),Qe=ta;var ra=Object.prototype,aa=ra.hasOwnProperty;function oa(t){if(!we(t))return Qe(t);var r=[];for(var e in Object(t))aa.call(t,e)&&e!="constructor"&&r.push(e);return r}var Ye=oa;function sa(t){return Me(t)?Be(t):Ye(t)}var Fe=sa;var ia=y(b,"Map"),Q=ia;var na=y(b,"DataView"),Y=na;var la=y(b,"Promise"),F=la;var ua=y(b,"Set"),W=ua;var We="[object Map]",fa="[object Object]",Ve="[object Promise]",Ke="[object Set]",Je="[object WeakMap]",Xe="[object DataView]",da=v(Y),ma=v(Q),pa=v(F),ca=v(W),ba=v(B),T=x;(Y&&T(new Y(new ArrayBuffer(1)))!=Xe||Q&&T(new Q)!=We||F&&T(F.resolve())!=Ve||W&&T(new W)!=Ke||B&&T(new B)!=Je)&&(T=function(t){var r=x(t),e=r==fa?t.constructor:void 0,a=e?v(e):"";if(a)switch(a){case da:return Xe;case ma:return We;case pa:return Ve;case ca:return Ke;case ba:return Je}return r});var ze=T;function ga(t){var r=-1,e=Array(t.size);return t.forEach(function(a,o){e[++r]=[o,a]}),e}var Ze=ga;function ya(t,r){return he(r,function(e){return[e,t[e]]})}var et=ya;function xa(t){var r=-1,e=Array(t.size);return t.forEach(function(a){e[++r]=[a,a]}),e}var tt=xa;var va="[object Map]",ha="[object Set]";function Ea(t){return function(r){var e=ze(r);return e==va?Ze(r):e==ha?tt(r):et(r,t(r))}}var rt=Ea;var Sa=rt(Fe),se=Sa;var C=null,m=class{constructor(){this.killWhenInactive=!0;this.additionalClasses=[]}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen",...this.additionalClasses),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(r="right",e){let a="cur-none";switch(r){case"left":a="cur-left";break;case"right":a="cur";break;case"fade":a="cur-fade";break}if(e){this.domRef.setAttribute("data-screen-active",a),this.domRef.setAttribute("data-screen-overlay","true");return}C&&C.setInactive(r),this.domRef.setAttribute("data-screen-active",a),C=this}setInactive(r="right"){let e="prev-none";switch(r){case"left":e="prev-left";break;case"right":e="prev";break;case"fade":e="prev-fade";break}this.domRef.setAttribute("data-screen-active",e),this.killWhenInactive&&this.die()}die(){C===this&&(C=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(r){return r.setup(),r.render(),r.init(),r}};var V=class extends m{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["gradient-bg-screen"]}init(){this.domRef.querySelector("#settings-close").addEventListener("click",a=>{this.setInactive("fade")});let e=this.domRef.querySelector("form");e.addEventListener("input",a=>{let n=e.elements.namedItem("anime-title-language").value;h.languagePreference=n})}setActive(){super.setActive("fade",!0)}template(){return`
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
                      ${h.languagePreference===e?"selected":""}>${e}</option>`)}
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
    
    <div class="bottom-container" data-tab="general">
      <input type="button" class="button button-outline" id="settings-close" value="Back">
    </div>`}};var Aa={volume:1,languagePreference:"Default"},ot,Ta=ee(ee({},Aa),JSON.parse((ot=localStorage.getItem("settings"))!=null?ot:"{}")),h=new Proxy(Ta,{set(t,r,e){return t[r]=e,localStorage.setItem("settings",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("globalSettingsChanged",{detail:t})),!0}}),ie=document.querySelector(".settings-overlay"),Ia=m.spawnScreen(new V);function La(){let t=ie.querySelector(".settings-dropdown");t.innerHTML=`
  <div class="settings-dropdown-entry settings-dropdown-entry-inverted">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /></svg>
    <input type="range" id="setting-audio-volume" min="1" max="100" value="${h.volume*100}">
  </div>
  <div class="settings-dropdown-entry" data-link="settings-screen">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
    Settings
  </div>`,ie.querySelector("#setting-audio-volume").addEventListener("input",e=>{h.volume=parseInt(e.target.value)/100});let r=ie.querySelector(".settings-button");document.addEventListener("click",e=>{let a=e.target;if(a===r){t.toggleAttribute("data-active");return}if(t.contains(a)){let o=a.closest("[data-link]");if(!o)return;switch(o.getAttribute("data-link")){case"settings-screen":Ia.setActive();break}}t.toggleAttribute("data-active",!1)})}La();function ne(t){var e,a,o,n,u,s,i,f,g,E,P,I,N,p;if(typeof t=="string")return t;let r=(a=(e=t.find(c=>c.type==="Default"))==null?void 0:e.title)!=null?a:t.at(0).title;switch(h.languagePreference){case"Default":return r;case"Shortest":return(n=(o=t.filter(c=>["Default","Synonym"].includes(c.type)).sort((c,lt)=>c.title.length-lt.title.length).at(0))==null?void 0:o.title)!=null?n:r;case"English":return(s=(u=t.find(c=>c.type==="English"))==null?void 0:u.title)!=null?s:r;case"Japanese":return(f=(i=t.find(c=>c.type==="Japanese"))==null?void 0:i.title)!=null?f:r;case"German":return(E=(g=t.find(c=>c.type==="German"))==null?void 0:g.title)!=null?E:r;case"Spanish":return(I=(P=t.find(c=>c.type==="Spanish"))==null?void 0:P.title)!=null?I:r;case"French":return(p=(N=t.find(c=>c.type==="French"))==null?void 0:N.title)!=null?p:r}return r}function it(t){var e;let r=(e=t==null?void 0:t.data)!=null?e:{};return t.template.map(a=>{let o=r[a];return o?typeof o=="string"?o:ne(o):a}).join("")}var st=document.createElement("canvas").getContext("2d");function nt(t,r="800 22px Fira Sans, sans-serif"){return st.font=r,st.measureText(t).width}var J=class extends m{constructor(e,a,o){super();this.questionId=null;this.ownAnwser=null;this.questionDone=!1;this.lobby=e,this.questionId=a,this.question=o}init(){this.domRef.addEventListener("click",a=>{let o=a.target;if(!o.hasAttribute("data-answer"))return;let n=o.getAttribute("data-answer");this.ownAnwser=parseInt(n),l.sendMsg("game.question.answer",{questionId:this.questionId,answer:this.ownAnwser}),this.domRef.querySelectorAll("[data-answer-selected=true]").forEach(u=>{u.removeAttribute("data-answer-selected")}),o.setAttribute("data-answer-selected","true")}),this.question.question.audioUrl&&(this.audio=new Audio(this.question.question.audioUrl),this.audio.preload="auto",this.audio.autoplay=!1,this.audio.volume=h.volume,document.addEventListener("globalSettingsChanged",this.settingsChanged.bind(this))),this.domRef.querySelectorAll(".answers > li").forEach(a=>{let o=a.getBoundingClientRect().width-64,n=nt(a.getAttribute("data-str-val"));a.style.fontSize=`${Math.min(Math.max(22*(o/n),16),22)}px`}),this.timerDOM=this.domRef.querySelector(".question-timer")}setActive(){super.setActive(),this.timerStarted=Date.now(),this.audio&&this.audio.play(),window.requestAnimationFrame(()=>{this.updateTimer()})}settingsChanged(e){this.audio.volume=e.detail.volume}updateTimer(){let e=this.question.timeoutMs-500,a=Math.ceil((this.timerStarted+e-Date.now())/1e3),o=Math.max(1-(Date.now()-this.timerStarted)/e,0);this.questionDone&&(o=0),this.timerDOM.style.transform=`scaleX(${o})`,(a>0||!this.questionDone)&&window.requestAnimationFrame(()=>{this.updateTimer()})}showAnswers(e,a){let{correct:o,wrong:n}=e,u=se(a);o.forEach(s=>{this.domRef.querySelector(`li[data-answer="${s}"]`).setAttribute("data-answer-correct","true")}),n.includes(this.ownAnwser)&&this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct","false"),this.question.question.image&&this.domRef.querySelector(".question-image").removeAttribute("data-blurred"),u.forEach(([s,i])=>{let f=this.lobby.getPlayerEntryById(s).name,g=this.domRef.querySelector(`li[data-answer="${i}"] > .answer-others-container`),E=document.createElement("div");E.classList.add("answer-others","skewed-tag"),E.innerHTML=`<span>${f}</span>`,g.appendChild(E)}),this.questionDone=!0}setInactive(e){super.setInactive(e),this.audio&&(this.audio.pause(),this.audio.remove())}die(){super.die(),document.removeEventListener("globalSettingsChanged",this.settingsChanged)}template(){let e=this.question.question,a=this.question.answers,o=!!this.question.question.image,n=!!this.question.question.audioUrl;return`
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId+1}</div>
        ${o?`<div class="question-image-container">
            <img class="question-image" ${e.imageBlurred?"data-blurred=true":""} src="${(0,K.default)(e.image)}">
            </div>`:""}
        <div class="question-title title-h3">${(0,K.default)(it(e.title))}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${a.map((u,s)=>{let i=(0,K.default)(ne(u));return`<li data-answer="${s}" data-str-val="${i}">
            ${i}
            <div class="answer-others-container"></div>
          </li>`}).join("")}
      </ul>
    </div>`}};var X=class extends m{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["gradient-bg-screen"];this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[];this.questions=new Map}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let e=this.domRef.querySelector("#copy-lobby-id");this.lobbySettingsDom=this.domRef.querySelector(".lobby-settings");let a=this.domRef.querySelector("#lobby-back-button");document.addEventListener("keydown",this.keydown.bind(this)),document.addEventListener("keyup",this.keyup.bind(this));let o=this.domRef.querySelector(".lobby-playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=l.on("game.status",({id:s,status:i})=>{if(this.lobbyId=s,this.domRef.querySelector("#lobby-id").innerHTML=s,this.currentLobbyStatus&&this.currentLobbyStatus!==i)switch(i){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),S("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=i,this.updateReadyButton()}),this.playerlistListener=l.on("game.playerlist",({playerlist:s,host:i})=>{var N;this.playerlist=s,this.lobbyHost=this.playerlist.find(p=>p.playerId===i);let f=new Array(Math.max(6-this.playerlist.length,0)).fill(!0),g=[...this.playerlist].map(p=>`<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <span class="player-name">${p.name}</span>
                  ${p.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
                </div>
                <div class="list-row-entry player-row-more">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                  </svg>
                </div>
              </li>`).join(""),E=f.map(p=>`<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`).join("");o.innerHTML=g+E,this.scoreboardDom.innerHTML=[...this.playerlist].sort((p,c)=>c.score-p.score).map(p=>`<li class="playerlist-entry">
                ${p.name}
                <div class="skewed-tag ${p.playerId===A.me.id?"skewed-tag-primary":""} tag-score">${p.score}</div>
              </li>`).join("");let P=this.playerlist.filter(p=>p.ready).length;document.querySelector("#lobby-dd-ready").innerHTML=`${P}/${this.playerlist.length}`,document.querySelector("#lobby-dd-host").innerHTML=(N=this.lobbyHost)==null?void 0:N.name;let I=s.find(p=>p.playerId===A.me.id);this.selfReady=I==null?void 0:I.ready,this.updateReadyButton(),this.updateSaveSettingsButton()}),this.gameSettingsListener=l.on("game.settings",({currentSettings:s,availableQuestions:i})=>{this.renderSettings(s,i),document.querySelector("#lobby-dd-question-amount").innerHTML=`${s["questionCount"]}`}),this.questionListener=l.on("game.question",({id:s,question:i})=>{let f=m.spawnScreen(new J(this,s,i));this.questions.set(s,f)}),this.questionActiveListener=l.on("game.question.active",({id:s})=>{this.questions.get(s).setActive()}),this.questionAnswersListener=l.on("game.question.answers",({id:s,answers:i,playerAnswers:f})=>{this.questions.get(s).showAnswers(i,f)}),this.selfLeftListener=l.on("me.game.left",({reason:s})=>{this.leaveLobby(),s==="KICKED_INACTIVITY"&&S("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",s=>{this.selfReady=!this.selfReady,l.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),e.addEventListener("click",s=>{s.preventDefault(),navigator.clipboard.writeText(this.lobbyId)});let n=this.domRef.querySelectorAll("[data-tab]"),u=this.domRef.querySelector(".tab-menu");u.addEventListener("click",s=>{s.preventDefault();let i=s.target,f=i.getAttribute("data-target-tab");console.log(i,f),f&&(u.querySelector("[data-active=true]").removeAttribute("data-active"),i.setAttribute("data-active","true"),n.forEach(g=>{g.setAttribute("data-inactive","true"),g.getAttribute("data-tab")===f&&g.removeAttribute("data-inactive")}))}),a.addEventListener("click",s=>{s.preventDefault(),l.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",s=>{s.preventDefault(),this.submitSettings()}),this.settingsSubmitButton=this.domRef.querySelector(".button[name=update-settings]"),this.lobbySettingsDom.addEventListener("input",s=>{if(s.preventDefault(),!this.selfIsHost()){this.lobbySettingsDom.reset();return}this.settingsSubmitButton.setAttribute("data-active","true")})}renderSettings(e,a){let n=[{label:"No. of Questions",inputs:[{value:e["questionCount"],name:"questionCount",type:"number",min:3,max:50}]},{label:"Popularity",inputs:[{value:e["minPopularity"],name:"minPopularity",type:"number",min:-1,max:1e4},{value:e["maxPopularity"],name:"maxPopularity",type:"number",min:-1,max:1e4}]},{label:"Year",inputs:[{value:e["minYear"],name:"minYear",type:"number",min:-1,max:1e4},{value:e["maxYear"],name:"maxYear",type:"number",min:-1,max:1e4}]},{label:"Main Role Only",inputs:[{value:e["mainRoleOnly"],checked:e["mainRoleOnly"],name:"mainRoleOnly",type:"checkbox"}]}].map(s=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${s.label}</span>
            ${s.inputs.map(i=>`<input name="${i.name}" type="${i.type}" 
                  ${i.type!=="checkbox"?'style="width:6rem" required':""} 
                  value="${i.value}" 
                  ${i.min?`min="${i.min}"`:""} 
                  ${i.max?`max="${i.max}"`:""} 
                  ${i.checked?"checked":""}>`).join(" - ")}
          </div>
        </div>`).join(""),u=a.map(s=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${pe(s)}</span>
            <input type="checkbox" id="q_${s}" 
            name="${"activeQuestions"}" 
            value="${s}" 
            ${e["activeQuestions"].some(i=>s===i)?"checked":""}>
          </div>
        </div>`).join("");this.lobbySettingsDom.innerHTML=`<div class="list-row list-row-header">Filters</div>
    ${n}
    
    <div class="list-row list-row-header">Questions</div>
    ${u}`,this.settingsSubmitButton.removeAttribute("data-active")}submitSettings(){l.sendMsg("game.settings",{settings:{["questionCount"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"questionCount"}"]`).value),["activeQuestions"]:Array.from(this.lobbySettingsDom.querySelectorAll(`[name="${"activeQuestions"}"]:checked`)).map(e=>e.value),["mainRoleOnly"]:this.lobbySettingsDom.querySelector(`[name="${"mainRoleOnly"}"]`).checked,["minPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minPopularity"}"]`).value),["maxPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxPopularity"}"]`).value),["minYear"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minYear"}"]`).value),["maxYear"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxYear"}"]`).value)}})}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}updateSaveSettingsButton(){let e=this.domRef.querySelector("#update-settings-button");this.selfIsHost()?(e.value="Save",e.disabled=!1):(e.value="Only host can save",e.disabled=!0)}getPlayerEntryById(e){return this.playerlist.find(a=>a.playerId===e)}leaveLobby(){m.spawnScreen(new w).setActive("left"),this.die()}selfIsHost(){return this.lobbyHost&&this.lobbyHost.playerId===A.me.id}template(){return`
    <div class="title-bar">
      <h1 class="title-h1">LOBBY</h1>
      <div class="tab-menu">
        <div class="tab-menu-entry" data-active="true" data-target-tab="overview">Overview</div>
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

    <div class="bottom-container" data-tab="overview">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Leave">
      <input type="button" class="button button-primary" id="lobby-ready" value="Ready" disabled=true>
    </div>

    <div class="bottom-container" data-tab="settings" data-inactive="true">
      <input type="submit" class="button button-outline" name="update-settings" id="update-settings-button" form="lobby-settings" value="Save">
    </div>`}keydown(e){if(this.currentLobbyStatus!=="IN_GAME"||e.key!=="Tab"||(e.preventDefault(),e.stopPropagation(),e.repeat))return;this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let a=new Promise(o=>{this.scoreboardCloseCallback=o});S("Scoreboard",void 0,{actions:[],closeDialogPromise:a,alternativeContentDom:this.scoreboardDom})}keyup(e){e.key==="Tab"&&this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}die(){super.die(),l.off("game.status",this.statusListener),l.off("game.playerlist",this.playerlistListener),l.off("game.settings",this.gameSettingsListener),l.off("game.question",this.questionListener),l.off("game.question.active",this.questionActiveListener),l.off("game.question.answers",this.questionAnswersListener),l.off("me.game.left",this.selfLeftListener),this.questions.forEach(e=>{e.die()}),document.removeEventListener("keydown",this.keydown),document.removeEventListener("keyup",this.keyup)}};var w=class extends m{init(){this.domRef.querySelector("form[name=create]").addEventListener("submit",a=>_(this,null,function*(){a.preventDefault(),this.submitDisabled(!0),l.sendMsg("game.create")})),this.domRef.querySelector("form[name=join]").addEventListener("submit",a=>_(this,null,function*(){a.preventDefault(),document.activeElement.blur();let o=a.target["lobby-id"].value;this.submitDisabled(!0),l.sendMsg("game.join",{id:o})})),this.errListener=l.on("generic.error",({title:a})=>{console.log("called err"),S(a),this.submitDisabled(!1)});let e=m.spawnScreen(new X);this.joinedListener=l.once("game.status",({id:a,status:o})=>{l.off("generic.error",this.errListener),e.setActive()})}submitDisabled(e){this.domRef.querySelectorAll("input[type=submit]").forEach(a=>a.disabled=e)}die(){super.die(),l.off("generic.error",this.errListener),l.off("game.status",this.joinedListener)}template(){return`
    <h1 class="title-h1">PLAY</h1>
    <section class="multiple-container-wrapper">
      <div class="container">
        <div class="title-h2">Create Lobby</div>
        <form name="create">
          <input type="submit" class="button button-primary" name="create-new" value="Create New">
        </form>
      </div>

      <label class="container">
        <div class="title-h2">Join Lobby</div>
        <form class="combined-form" name="join">
          <input type="text" name="lobby-id" autocomplete="off" required minlength=4 placeholder="XXXX">
          <input type="submit" class="button button-primary" name="join" value="Join">
        </form>
      </label>
    </section>`}};var z=class extends m{init(){this.domRef.querySelector("form").addEventListener("submit",e=>_(this,null,function*(){e.preventDefault();let a=e.target.submit;a.disabled=!0;let o=e.target.username.value;l.isOpen()||(yield l.open()),l.sendMsg("me.change_name",{name:o}),m.spawnScreen(new w).setActive()}))}setActive(){super.setActive("none"),this.domRef.querySelector("input[name=username]").focus({preventScroll:!0})}template(){return`
    <h1 class="title-h1">otakuquiz.lol</h1>
    <div class="container">
      <div class="title-h2">Choose your username</div>
      <form class="combined-form" name="login">
        <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
        <input type="submit" class="button button-primary" name="submit" value="Connect!">
      </form>
    </div>`}die(){super.die(),l.off("generic.error",this.errListener)}};l.on("me",t=>{A.me.id=t.id,A.me.name=t.name});var Ma=m.spawnScreen(new z);Ma.setActive();})();
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
