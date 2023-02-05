(()=>{var pt=Object.create;var ee=Object.defineProperty;var ct=Object.getOwnPropertyDescriptor;var bt=Object.getOwnPropertyNames,me=Object.getOwnPropertySymbols,gt=Object.getPrototypeOf,ce=Object.prototype.hasOwnProperty,vt=Object.prototype.propertyIsEnumerable;var pe=(t,r,e)=>r in t?ee(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,te=(t,r)=>{for(var e in r||={})ce.call(r,e)&&pe(t,e,r[e]);if(me)for(var e of me(r))vt.call(r,e)&&pe(t,e,r[e]);return t};var yt=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var Et=(t,r,e,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of bt(r))!ce.call(t,o)&&o!==e&&ee(t,o,{get:()=>r[o],enumerable:!(a=ct(r,o))||a.enumerable});return t};var ht=(t,r,e)=>(e=t!=null?pt(gt(t)):{},Et(r||!t||!t.__esModule?ee(e,"default",{value:t,enumerable:!0}):e,t));var be=(t,r,e)=>new Promise((a,o)=>{var i=d=>{try{s(e.next(d))}catch(l){o(l)}},f=d=>{try{s(e.throw(d))}catch(l){o(l)}},s=d=>d.done?a(d.value):Promise.resolve(d.value).then(i,f);s((e=e.apply(t,r)).next())});var Ee=yt((Ja,ye)=>{"use strict";var St=/["'&<>]/;ye.exports=At;function At(t){var r=""+t,e=St.exec(r);if(!e)return r;var a,o="",i=0,f=0;for(i=e.index;i<r.length;i++){switch(r.charCodeAt(i)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}f!==i&&(o+=r.substring(f,i)),f=i+1,o+=a}return f!==i?o+r.substring(f,i):o}});var T={me:{id:"",name:""}};var _=document.querySelector(".overlay-container"),D=new Map,xt=0;_.addEventListener("click",t=>{let r=t.target;if(r.hasAttribute("data-popup-id")){let e=r.getAttribute("data-popup-id"),a=r.getAttribute("data-value");ge(e,a)}});function ge(t,r){var a;let e=D.get(t);e&&_.removeChild(e.dom),D.delete(t),(a=e.options)!=null&&a.callback&&e.options.callback(r),D.size<1&&_.setAttribute("data-active","false")}function E(t,r,e){let a=(xt++).toString(),o=document.createElement("div");o.classList.add("container","container-fadein");let i=[];e!=null&&e.actions?i.push(...e.actions.map(s=>`<input type="button" data-popup-id="${a}" data-value="${s.value}" class="button ${s.class}" value="${s.title}">`)):i.push(`<input type="button" data-popup-id="${a}" data-value="ok" class="button button-outline" value="OK">`),o.innerHTML=`
    <div class="title-h2">${t}</div>
    <div class="dialog-content">${r&&r.length>0?`${r}`:""}</div>
    <div class="dialog-actions">${i.join("")}</div>`,e!=null&&e.alternativeContentDom&&o.querySelector(".dialog-content").appendChild(e.alternativeContentDom),D.set(a,{dom:o,options:e}),_.setAttribute("data-active","true"),_.appendChild(o);let f=o.querySelector("input[type=text]");f&&f.focus({preventScroll:!0}),e!=null&&e.closeDialogPromise&&e.closeDialogPromise.then(()=>{ge(a)})}var re=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",r=>{let{type:e,data:a}=JSON.parse(r.data);this.handleMessage(e,a)}),this.ws.addEventListener("close",()=>{E("You were disconnected","The session was closed by the server.",{callback:()=>{window.onbeforeunload=null,location.reload()}})}),new Promise(r=>{this.ws.addEventListener("open",()=>{r()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(r,e){this.ws.send(JSON.stringify({type:r,data:e}))}on(r,e,a=!1){this.listener.has(r)||this.listener.set(r,[]);let o=this.listenerId++;return this.listener.get(r).push({callback:e,once:a,id:o}),o}once(r,e){return this.on(r,e,!0)}callListeners(r,e){let a=this.listener.get(r);a&&[...a].forEach((o,i)=>{o.callback(e),o.once&&a.splice(i,1)})}off(r,e){let a=this.listener.get(r);if(!a)return;let o=a.findIndex(i=>i.id===e);o>-1&&a.splice(o,1)}handleMessage(r,e){switch(r){case"me":this.callListeners("me",e);break;case"me.game.left":this.callListeners("me.game.left",e);break;case"game.status":this.callListeners("game.status",e);break;case"game.playerlist":this.callListeners("game.playerlist",e);break;case"game.settings":this.callListeners("game.settings",e);break;case"game.question":this.callListeners("game.question",e);break;case"game.question.active":this.callListeners("game.question.active",e);break;case"game.question.answers":this.callListeners("game.question.answers",e);break;case"game.question.reset.timeout":this.callListeners("game.question.reset.timeout",e);break;case"generic.error":this.callListeners("generic.error",e);break;default:throw Error("Not yet implemented"+r)}}},u=new re;function ve(t){switch(t){case"animeFromChar":return"Guess anime title by character";case"animeGenre":return"Guess the anime's genre";case"animeStudio":return"Guess the anime's studio";case"charByPicture":return"Guess character from picture";case"animeOpening":return"BETA: Guess anime from opening";default:throw Error("Id not recognized: "+t)}}var P=ht(Ee(),1);var Tt=typeof global=="object"&&global&&global.Object===Object&&global,H=Tt;var wt=typeof self=="object"&&self&&self.Object===Object&&self,Lt=H||wt||Function("return this")(),g=Lt;var It=g.Symbol,L=It;var he=Object.prototype,Mt=he.hasOwnProperty,_t=he.toString,N=L?L.toStringTag:void 0;function Ot(t){var r=Mt.call(t,N),e=t[N];try{t[N]=void 0;var a=!0}catch{}var o=_t.call(t);return a&&(r?t[N]=e:delete t[N]),o}var xe=Ot;var Nt=Object.prototype,Rt=Nt.toString;function kt(t){return Rt.call(t)}var Se=kt;var Ct="[object Null]",Pt="[object Undefined]",Ae=L?L.toStringTag:void 0;function Gt(t){return t==null?t===void 0?Pt:Ct:Ae&&Ae in Object(t)?xe(t):Se(t)}var S=Gt;function Dt(t){return t!=null&&typeof t=="object"}var I=Dt;function Ht(t,r){for(var e=-1,a=t==null?0:t.length,o=Array(a);++e<a;)o[e]=r(t[e],e,t);return o}var Te=Ht;var qt=Array.isArray,we=qt;function Ut(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var q=Ut;var jt="[object AsyncFunction]",Wt="[object Function]",$t="[object GeneratorFunction]",Bt="[object Proxy]";function Yt(t){if(!q(t))return!1;var r=S(t);return r==Wt||r==$t||r==jt||r==Bt}var U=Yt;var Qt=g["__core-js_shared__"],j=Qt;var Le=function(){var t=/[^.]+$/.exec(j&&j.keys&&j.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Ft(t){return!!Le&&Le in t}var Ie=Ft;var Vt=Function.prototype,Kt=Vt.toString;function Jt(t){if(t!=null){try{return Kt.call(t)}catch{}try{return t+""}catch{}}return""}var A=Jt;var Xt=/[\\^$.*+?()[\]{}|]/g,zt=/^\[object .+?Constructor\]$/,Zt=Function.prototype,er=Object.prototype,tr=Zt.toString,rr=er.hasOwnProperty,ar=RegExp("^"+tr.call(rr).replace(Xt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function or(t){if(!q(t)||Ie(t))return!1;var r=U(t)?ar:zt;return r.test(A(t))}var Me=or;function sr(t,r){return t?.[r]}var _e=sr;function ir(t,r){var e=_e(t,r);return Me(e)?e:void 0}var x=ir;var nr=x(g,"WeakMap"),W=nr;var lr=9007199254740991,ur=/^(?:0|[1-9]\d*)$/;function dr(t,r){var e=typeof t;return r=r??lr,!!r&&(e=="number"||e!="symbol"&&ur.test(t))&&t>-1&&t%1==0&&t<r}var Oe=dr;var fr=9007199254740991;function mr(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=fr}var $=mr;function pr(t){return t!=null&&$(t.length)&&!U(t)}var Ne=pr;var cr=Object.prototype;function br(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||cr;return t===e}var Re=br;function gr(t,r){for(var e=-1,a=Array(t);++e<t;)a[e]=r(e);return a}var ke=gr;var vr="[object Arguments]";function yr(t){return I(t)&&S(t)==vr}var ae=yr;var Ce=Object.prototype,Er=Ce.hasOwnProperty,hr=Ce.propertyIsEnumerable,xr=ae(function(){return arguments}())?ae:function(t){return I(t)&&Er.call(t,"callee")&&!hr.call(t,"callee")},Pe=xr;function Sr(){return!1}var Ge=Sr;var qe=typeof exports=="object"&&exports&&!exports.nodeType&&exports,De=qe&&typeof module=="object"&&module&&!module.nodeType&&module,Ar=De&&De.exports===qe,He=Ar?g.Buffer:void 0,Tr=He?He.isBuffer:void 0,wr=Tr||Ge,Ue=wr;var Lr="[object Arguments]",Ir="[object Array]",Mr="[object Boolean]",_r="[object Date]",Or="[object Error]",Nr="[object Function]",Rr="[object Map]",kr="[object Number]",Cr="[object Object]",Pr="[object RegExp]",Gr="[object Set]",Dr="[object String]",Hr="[object WeakMap]",qr="[object ArrayBuffer]",Ur="[object DataView]",jr="[object Float32Array]",Wr="[object Float64Array]",$r="[object Int8Array]",Br="[object Int16Array]",Yr="[object Int32Array]",Qr="[object Uint8Array]",Fr="[object Uint8ClampedArray]",Vr="[object Uint16Array]",Kr="[object Uint32Array]",p={};p[jr]=p[Wr]=p[$r]=p[Br]=p[Yr]=p[Qr]=p[Fr]=p[Vr]=p[Kr]=!0;p[Lr]=p[Ir]=p[qr]=p[Mr]=p[Ur]=p[_r]=p[Or]=p[Nr]=p[Rr]=p[kr]=p[Cr]=p[Pr]=p[Gr]=p[Dr]=p[Hr]=!1;function Jr(t){return I(t)&&$(t.length)&&!!p[S(t)]}var je=Jr;function Xr(t){return function(r){return t(r)}}var We=Xr;var $e=typeof exports=="object"&&exports&&!exports.nodeType&&exports,R=$e&&typeof module=="object"&&module&&!module.nodeType&&module,zr=R&&R.exports===$e,oe=zr&&H.process,Zr=function(){try{var t=R&&R.require&&R.require("util").types;return t||oe&&oe.binding&&oe.binding("util")}catch{}}(),se=Zr;var Be=se&&se.isTypedArray,ea=Be?We(Be):je,Ye=ea;var ta=Object.prototype,ra=ta.hasOwnProperty;function aa(t,r){var e=we(t),a=!e&&Pe(t),o=!e&&!a&&Ue(t),i=!e&&!a&&!o&&Ye(t),f=e||a||o||i,s=f?ke(t.length,String):[],d=s.length;for(var l in t)(r||ra.call(t,l))&&!(f&&(l=="length"||o&&(l=="offset"||l=="parent")||i&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Oe(l,d)))&&s.push(l);return s}var Qe=aa;function oa(t,r){return function(e){return t(r(e))}}var Fe=oa;var sa=Fe(Object.keys,Object),Ve=sa;var ia=Object.prototype,na=ia.hasOwnProperty;function la(t){if(!Re(t))return Ve(t);var r=[];for(var e in Object(t))na.call(t,e)&&e!="constructor"&&r.push(e);return r}var Ke=la;function ua(t){return Ne(t)?Qe(t):Ke(t)}var Je=ua;var da=x(g,"Map"),B=da;var fa=x(g,"DataView"),Y=fa;var ma=x(g,"Promise"),Q=ma;var pa=x(g,"Set"),F=pa;var Xe="[object Map]",ca="[object Object]",ze="[object Promise]",Ze="[object Set]",et="[object WeakMap]",tt="[object DataView]",ba=A(Y),ga=A(B),va=A(Q),ya=A(F),Ea=A(W),w=S;(Y&&w(new Y(new ArrayBuffer(1)))!=tt||B&&w(new B)!=Xe||Q&&w(Q.resolve())!=ze||F&&w(new F)!=Ze||W&&w(new W)!=et)&&(w=function(t){var r=S(t),e=r==ca?t.constructor:void 0,a=e?A(e):"";if(a)switch(a){case ba:return tt;case ga:return Xe;case va:return ze;case ya:return Ze;case Ea:return et}return r});var rt=w;function ha(t){var r=-1,e=Array(t.size);return t.forEach(function(a,o){e[++r]=[o,a]}),e}var at=ha;function xa(t,r){return Te(r,function(e){return[e,t[e]]})}var ot=xa;function Sa(t){var r=-1,e=Array(t.size);return t.forEach(function(a){e[++r]=[a,a]}),e}var st=Sa;var Aa="[object Map]",Ta="[object Set]";function wa(t){return function(r){var e=rt(r);return e==Aa?at(r):e==Ta?st(r):ot(r,t(r))}}var it=wa;var La=it(Je),ie=La;var k=null,C=[],m=class{constructor(){this.killWhenInactive=!0;this.additionalClasses=[];this.globalDropdownOptions=null}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen",...this.additionalClasses),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(r="right",e){let a="cur-none";switch(r){case"left":a="cur-left";break;case"right":a="cur";break;case"fade":a="cur-fade";break}if(m.pushScreenStack(this),document.dispatchEvent(new CustomEvent("screenChanged")),e){this.domRef.setAttribute("data-screen-active",a),this.domRef.setAttribute("data-screen-overlay","true");return}k&&k.setInactive(r),this.domRef.setAttribute("data-screen-active",a),k=this}setInactive(r="right"){let e="prev-none";switch(r){case"left":e="prev-left";break;case"right":e="prev";break;case"fade":e="prev-fade";break}this.domRef.setAttribute("data-screen-active",e),this.killWhenInactive&&this.die(),m.popScreenStack(this),document.dispatchEvent(new CustomEvent("screenChanged"))}die(){k===this&&(k=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(r){return r.setup(),r.render(),r.init(),r}static pushScreenStack(r){m.popScreenStack(r),C.push(r)}static popScreenStack(r){C.includes(r)&&C.splice(C.indexOf(r),1)}static getCurrentScreen(){return C.at(-1)}};var V=class extends m{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["gradient-bg-screen"];this.languagePreferences=["Official","Shortest","English","Japanese","German","Spanish","French"]}init(){this.domRef.querySelector("#settings-close").addEventListener("click",a=>{this.setInactive("fade")});let e=this.domRef.querySelector("form");e.addEventListener("input",a=>{let o=e.elements,i=o.namedItem("anime-title-language").value,f=o.namedItem("secondary-title-language").value,s=o.namedItem("showReverseTimer").checked;y.languagePreference=i,y.secondaryLanguagePreference=f,y.showReverseTimer=s})}setActive(){super.setActive("fade",!0)}template(){return`
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
              <span class="setting-row-entry-label">Title Language Preference</span>
              <select name="anime-title-language">
                ${this.languagePreferences.map(e=>`<option 
                      value="${e}" 
                      ${y.languagePreference===e?"selected":""}>${e}</option>`)}
              </select>
            </div>
          </div>

          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Secondary Language Preference</span>
              <select name="secondary-title-language">
                ${this.languagePreferences.map(e=>`<option 
                      value="${e}" 
                      ${y.secondaryLanguagePreference===e?"selected":""}>${e}</option>`)}
              </select>
            </div>
          </div>

          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Show Reverse Timer when loading next question</span>
              <input type="checkbox" 
                name="showReverseTimer" 
                ${y.showReverseTimer?"checked":""}>
            </div>
          </div>

        </form>
      </div>
    </section>
    
    <div class="bottom-container" data-tab="general">
      <input type="button" class="button button-outline" id="settings-close" value="Back">
    </div>`}};var Ia={volume:1,languagePreference:"Official",secondaryLanguagePreference:"Official",showReverseTimer:!1},lt,Ma=te(te({},Ia),JSON.parse((lt=localStorage.getItem("settings"))!=null?lt:"{}")),y=new Proxy(Ma,{set(t,r,e){t[r]=e;try{localStorage.setItem("settings",JSON.stringify(t))}catch(a){}return document.dispatchEvent(new CustomEvent("globalSettingsChanged",{detail:t})),!0}}),ne=document.querySelector(".settings-overlay"),K=ne.querySelector(".settings-dropdown"),_a=ne.querySelector(".settings-button"),Oa=m.spawnScreen(new V);document.addEventListener("click",t=>{var e;let r=t.target;if(r===_a){K.toggleAttribute("data-active");return}if(K.contains(r)){let a=r.closest("[data-link]");if(!a)return;switch(a.getAttribute("data-link")){case"settings-screen":Oa.setActive();break;case"_additional":let o=parseInt(a.getAttribute("data-link-id")),i=m.getCurrentScreen();i.globalDropdownOptions&&((e=i.globalDropdownOptions[o])==null||e.callback());break}}K.toggleAttribute("data-active",!1)});document.addEventListener("screenChanged",t=>{Na()});function Na(){let t=[],r=m.getCurrentScreen();r.globalDropdownOptions&&t.push(...r.globalDropdownOptions),K.innerHTML=`
  <div class="settings-dropdown-entry settings-dropdown-entry-inverted">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /></svg>
    <input type="range" id="setting-audio-volume" min="1" max="100" value="${y.volume*100}">
  </div>
  <div class="settings-dropdown-entry" data-link="settings-screen">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
    Settings
  </div>
  ${t.map((e,a)=>`
    <div class="settings-dropdown-entry" data-link="_additional" data-link-id="${a}">
      <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${e.svgPath}</svg>
      ${e.title}
    </div>`)}`,ne.querySelector("#setting-audio-volume").addEventListener("input",e=>{y.volume=parseInt(e.target.value)/100})}function J(t,r=!1){var o,i,f,s,d,l,n,b,h,c,G,ue,de,fe;if(typeof t=="string")return t;let e=(i=(o=t.find(v=>v.type==="Default"))==null?void 0:o.title)!=null?i:t.at(0).title,a=y.languagePreference;switch(r&&(a=y.secondaryLanguagePreference),a){case"Official":return e;case"Shortest":return(s=(f=t.filter(v=>["Default","Synonym"].includes(v.type)).sort((v,mt)=>v.title.length-mt.title.length).at(0))==null?void 0:f.title)!=null?s:e;case"English":return(l=(d=t.find(v=>v.type==="English"))==null?void 0:d.title)!=null?l:e;case"Japanese":return(b=(n=t.find(v=>v.type==="Japanese"))==null?void 0:n.title)!=null?b:e;case"German":return(c=(h=t.find(v=>v.type==="German"))==null?void 0:h.title)!=null?c:e;case"Spanish":return(ue=(G=t.find(v=>v.type==="Spanish"))==null?void 0:G.title)!=null?ue:e;case"French":return(fe=(de=t.find(v=>v.type==="French"))==null?void 0:de.title)!=null?fe:e}return e}function dt(t){var e;let r=(e=t==null?void 0:t.data)!=null?e:{};return t.template.map(a=>{let o=r[a];return o?typeof o=="string"?o:J(o):a}).join("")}var ut=document.createElement("canvas").getContext("2d");function ft(t,r="800 22px Fira Sans, sans-serif"){return ut.font=r,Math.ceil(ut.measureText(t).width)}var X=class extends m{constructor(e,a,o){super();this.globalDropdownOptions=[{svgPath:'<path d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z" />',title:"Leave Session",callback:this.leaveGameGuarded.bind(this)}];this.questionId=null;this.ownAnwser=null;this.timerReverse=!1;this.questionDone=!1;this.lobby=e,this.questionId=a,this.question=o,this.timeoutMs=this.question.timeoutMs}init(){this.domRef.addEventListener("click",a=>{let o=a.target.closest("[data-answer]");if(o===null||this.questionDone||this.ownAnwser!==null&&this.lobby.getSetting("allowChangeAnswer")===!1)return;let i=o.getAttribute("data-answer");this.ownAnwser=parseInt(i),u.sendMsg("game.question.answer",{questionId:this.questionId,answer:this.ownAnwser}),this.domRef.querySelectorAll("[data-answer-selected=true]").forEach(f=>{f.removeAttribute("data-answer-selected")}),o.setAttribute("data-answer-selected","true")}),this.resetTimeoutListener=u.on("game.question.reset.timeout",({id:a,timeoutMs:o,reverse:i})=>{this.questionId===a&&(this.timeoutMs=o,this.timerStarted=Date.now(),this.timerReverse=i,console.log("reset timer"))}),this.question.question.audioUrl&&(this.audio=new Audio(this.question.question.audioUrl),this.audio.preload="auto",this.audio.autoplay=!1,this.audio.volume=y.volume,this.globalSettingsChangedListener=this.settingsChanged.bind(this),document.addEventListener("globalSettingsChanged",this.globalSettingsChangedListener)),this.domRef.querySelectorAll(".answers > li").forEach(a=>{let o=a.getBoundingClientRect().width-80,i=ft(a.getAttribute("data-str-val"));a.style.fontSize=`${Math.floor(Math.min(Math.max(22*(o/i),16),22))}px`}),this.timerDOM=this.domRef.querySelector(".question-timer")}setActive(){super.setActive(),this.timerStarted=Date.now(),this.audio&&this.audio.play(),window.requestAnimationFrame(()=>{this.updateTimer()})}settingsChanged(e){this.audio.volume=e.detail.volume}updateTimer(){if(this.questionDone&&!y.showReverseTimer){this.timerDOM.style.transform="scaleX(0)";return}let e=this.timeoutMs-250,a=Math.ceil((this.timerStarted+e-Date.now())/1e3),o=Math.max(1-(Date.now()-this.timerStarted)/e,0);this.timerReverse&&(o=1-o),this.timerDOM.style.transform=`scaleX(${o})`,window.requestAnimationFrame(()=>{this.updateTimer()})}showAnswers(e,a){let{correct:o,wrong:i}=e,f=ie(a);o.forEach(s=>{this.domRef.querySelector(`li[data-answer="${s}"]`).setAttribute("data-answer-correct","true")}),i.includes(this.ownAnwser)&&this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct","false"),this.question.question.image&&this.domRef.querySelector(".question-image").removeAttribute("data-blurred"),f.forEach(([s,d])=>{let l=this.lobby.getPlayerEntryById(s).name,n=this.domRef.querySelector(`li[data-answer="${d}"] > .answer-others-container`),b=document.createElement("div");b.classList.add("answer-others","skewed-tag"),b.innerHTML=`<span>${l}</span>`,n.appendChild(b)}),this.questionDone=!0}leaveGameGuarded(){E("Are you sure?","You cannot join again as long as the game is running.",{actions:[{class:"button-outline",title:"Cancel",value:"cancel"},{class:"button-error",title:"Leave Game",value:"leave"}],callback:e=>{e==="leave"&&u.sendMsg("game.leave")}})}setInactive(e){super.setInactive(e),this.questionDone=!0,this.audio&&(this.audio.pause(),this.audio.remove())}die(){super.die(),document.removeEventListener("globalSettingsChanged",this.globalSettingsChangedListener),u.off("game.question.reset.timeout",this.resetTimeoutListener)}template(){let e=this.question.question,a=this.question.answers,o=!!this.question.question.image,i=!!this.question.question.audioUrl;return`
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId+1}</div>
        ${o?`<div class="question-image-container">
            <img class="question-image" ${e.imageBlurred?"data-blurred=true":""} src="${(0,P.default)(e.image)}">
            </div>`:""}
        <div class="question-title title-h3">${(0,P.default)(dt(e.title))}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${a.map((f,s)=>{let d=(0,P.default)(J(f)),l=(0,P.default)(J(f,!0)),n=l.toLowerCase()===d.toLowerCase();return`<li data-answer="${s}" data-str-val="${d}">
            <div>
              ${d}
              ${n?"":`<span class="secondary-answer">${l}</span>`}
            </div>
            <div class="answer-others-container"></div>
          </li>`}).join("")}
      </ul>
    </div>`}};var z=class extends m{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["gradient-bg-screen"];this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[];this.questions=new Map}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let e=this.domRef.querySelector("#copy-lobby-id");this.lobbySettingsDom=this.domRef.querySelector(".lobby-settings");let a=this.domRef.querySelector("#lobby-back-button");this.keyDownListener=this.keydown.bind(this),this.keyUpListener=this.keyup.bind(this),document.addEventListener("keydown",this.keyDownListener),document.addEventListener("keyup",this.keyUpListener);let o=this.domRef.querySelector(".lobby-playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=u.on("game.status",({id:s,status:d})=>{if(this.lobbyId=s,this.domRef.querySelector("#lobby-id").innerHTML=s,this.currentLobbyStatus&&this.currentLobbyStatus!==d)switch(d){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),E("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=d,this.updateReadyButton()}),this.playerlistListener=u.on("game.playerlist",({playerlist:s,host:d})=>{this.playerlist=s,this.lobbyHost=this.playerlist.find(c=>c.playerId===d);let l=new Array(Math.max(6-this.playerlist.length,0)).fill(!0),n=[...this.playerlist].map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <div class="player-name">
                    <span>${c.name}</span>
                    <div class="player-icons">
                      ${c===this.lobbyHost?'<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>Lobby Host</title><path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z" /></svg>':""}
                    </div>
                  </div>
                  ${c.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
                </div>
                <div class="list-row-entry player-row-more">
                  <div 
                    class="player-more-button" 
                    title="Show options"
                    data-player-id="${c.playerId}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                    </svg>
                  </div>
                </div>
              </li>`).join(""),b=l.map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`).join("");o.innerHTML=n+b,this.scoreboardDom.innerHTML=[...this.playerlist].sort((c,G)=>G.score-c.score).map(c=>`<li class="playerlist-entry">
                ${c.name}
                <div class="skewed-tag ${c.playerId===T.me.id?"skewed-tag-primary":""} tag-score">${c.score}</div>
              </li>`).join("");let h=s.find(c=>c.playerId===T.me.id);this.selfReady=h==null?void 0:h.ready,this.updateReadyButton(),this.updateSaveSettingsButton()}),this.gameSettingsListener=u.on("game.settings",({currentSettings:s,availableQuestions:d})=>{this.currentSettings=s,this.renderSettings(s,d),document.querySelector("#lobby-dd-question-amount").innerHTML=`${s["questionCount"]}`,document.querySelector("#lobby-dd-answer-switching").innerHTML=s["allowChangeAnswer"]?"YES":"NO";let l=s["answerTimeout"],n="";switch(l){case"alwaysTimeout":n="Always wait";break;case"firstAnswer":n="First Answer";break;case"playersOrTimeout":n="Wait for All";break;default:n="???";break}document.querySelector("#lobby-dd-timeout-mode").innerHTML=n,document.querySelector("#lobby-dd-score-penalty").innerHTML=s["wrongAnswerPenalty"]?"YES":"NO"}),this.questionListener=u.on("game.question",({id:s,question:d})=>{let l=m.spawnScreen(new X(this,s,d));this.questions.set(s,l)}),this.questionActiveListener=u.on("game.question.active",({id:s})=>{this.questions.get(s).setActive()}),this.questionAnswersListener=u.on("game.question.answers",({id:s,answers:d,playerAnswers:l})=>{this.questions.get(s).showAnswers(d,l)}),this.selfLeftListener=u.on("me.game.left",({reason:s})=>{this.leaveLobby(),s==="KICKED_INACTIVITY"&&E("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",s=>{this.selfReady=!this.selfReady,u.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),e.addEventListener("click",s=>{s.preventDefault(),navigator.clipboard.writeText(location.href)});let i=this.domRef.querySelectorAll("[data-tab]"),f=this.domRef.querySelector(".tab-menu");f.addEventListener("click",s=>{s.preventDefault();let d=s.target,l=d.getAttribute("data-target-tab");l&&(f.querySelector("[data-active=true]").removeAttribute("data-active"),d.setAttribute("data-active","true"),i.forEach(n=>{n.setAttribute("data-inactive","true"),n.getAttribute("data-tab")===l&&n.removeAttribute("data-inactive")}))}),a.addEventListener("click",s=>{s.preventDefault(),u.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",s=>{s.preventDefault(),this.submitSettings()}),this.settingsSubmitButton=this.domRef.querySelector(".button[name=update-settings]"),this.lobbySettingsDom.addEventListener("input",s=>{if(s.preventDefault(),!this.selfIsHost()){this.lobbySettingsDom.reset();return}this.settingsSubmitButton.setAttribute("data-active","true")}),o.addEventListener("click",s=>{s.preventDefault();let l=s.target.closest(".player-more-button");if(!l)return;let n=l.getAttribute("data-player-id"),b=this.playerlist.find(h=>h.playerId===n);if(!b){console.error("something went terribly wrong, idk how!");return}if(this.lobbyHost.playerId!==T.me.id){E("You're not the host.","Only the host can interact with this.");return}E(b.name,"",{actions:[{title:"Cancel",class:"button-outline",value:"cancel"},{title:"Kick",class:"button-error",value:"kick"},{title:"Make Host",class:"button-primary",value:"makehost"}],callback:h=>{switch(h){case"kick":E("Work in Progress","kekw");break;case"makehost":u.sendMsg("game.change.host",{newHost:b.playerId});break}}})})}renderSettings(e,a){let o=[{label:"No. of Questions",inputs:[{value:e["questionCount"],name:"questionCount",type:"number",min:3,max:50}]},{label:"Allow to Switch Answer",inputs:[{value:e["allowChangeAnswer"],checked:e["allowChangeAnswer"],name:"allowChangeAnswer",type:"checkbox"}]},{label:"Question Timeout Mode",inputs:[{value:e["answerTimeout"],name:"answerTimeout",type:"select",options:[{value:"playersOrTimeout",label:"Normal (Wait for all players)"},{value:"alwaysTimeout",label:"Always wait for timeout"},{value:"firstAnswer",label:"Timeout after first answer"}]}]},{label:"Additional Timeout After Answer",inputs:[{value:e["secAfterAnswer"],name:"secAfterAnswer",type:"number",min:0,max:15}]},{label:"Score Penalty on Wrong Answer",inputs:[{value:e["wrongAnswerPenalty"],checked:e["wrongAnswerPenalty"],name:"wrongAnswerPenalty",type:"checkbox"}]}],i=[{label:"Popularity",inputs:[{value:e["minPopularity"],name:"minPopularity",type:"number",min:-1,max:1e4},{value:e["maxPopularity"],name:"maxPopularity",type:"number",min:-1,max:1e4}]},{label:"Year",inputs:[{value:e["minYear"],name:"minYear",type:"number",min:-1,max:1e4},{value:e["maxYear"],name:"maxYear",type:"number",min:-1,max:1e4}]},{label:"Main Role Only",inputs:[{value:e["mainRoleOnly"],checked:e["mainRoleOnly"],name:"mainRoleOnly",type:"checkbox"}]}],f=o.map(l=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${l.label}</span>
            ${l.inputs.map(n=>{switch(n.type){case"select":return`<select name="${n.name}">
                    ${n.options.map(b=>`<option 
                        value="${b.value}" 
                        ${b.value===n.value?"selected":""}>
                        ${b.label}
                        </option>`)}
                    </select>`;default:return`<input name="${n.name}" type="${n.type}" 
                    ${n.type!=="checkbox"?'style="width:6rem" required':""} 
                    value="${n.value}" 
                    ${n.min?`min="${n.min}"`:""} 
                    ${n.max?`max="${n.max}"`:""} 
                    ${n.checked?"checked":""}>`}}).join(" - ")}
          </div>
        </div>`).join(""),s=i.map(l=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${l.label}</span>
            ${l.inputs.map(n=>`<input name="${n.name}" type="${n.type}" 
                  ${n.type!=="checkbox"?'style="width:6rem" required':""} 
                  value="${n.value}" 
                  ${n.min?`min="${n.min}"`:""} 
                  ${n.max?`max="${n.max}"`:""} 
                  ${n.checked?"checked":""}>`).join(" - ")}
          </div>
        </div>`).join(""),d=a.map(l=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${ve(l)}</span>
            <input type="checkbox" id="q_${l}" 
            name="${"activeQuestions"}" 
            value="${l}" 
            ${e["activeQuestions"].some(n=>l===n)?"checked":""}>
          </div>
        </div>`).join("");this.lobbySettingsDom.innerHTML=`
    <div class="list-row list-row-header">Gameplay</div>
    ${f}

    <div class="list-row list-row-header">Filters</div>
    ${s}
    
    <div class="list-row list-row-header">Questions</div>
    ${d}`,this.settingsSubmitButton.removeAttribute("data-active")}submitSettings(){u.sendMsg("game.settings",{settings:{["questionCount"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"questionCount"}"]`).value),["activeQuestions"]:Array.from(this.lobbySettingsDom.querySelectorAll(`[name="${"activeQuestions"}"]:checked`)).map(e=>e.value),["mainRoleOnly"]:this.lobbySettingsDom.querySelector(`[name="${"mainRoleOnly"}"]`).checked,["minPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minPopularity"}"]`).value),["maxPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxPopularity"}"]`).value),["minYear"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minYear"}"]`).value),["maxYear"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxYear"}"]`).value),["allowChangeAnswer"]:this.lobbySettingsDom.querySelector(`[name="${"allowChangeAnswer"}"]`).checked,["answerTimeout"]:this.lobbySettingsDom.querySelector(`[name="${"answerTimeout"}"]`).value,["secAfterAnswer"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"secAfterAnswer"}"]`).value),["wrongAnswerPenalty"]:this.lobbySettingsDom.querySelector(`[name="${"wrongAnswerPenalty"}"]`).checked}})}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}updateSaveSettingsButton(){let e=this.domRef.querySelector("#update-settings-button");this.selfIsHost()?(e.value="Save",e.disabled=!1):(e.value="Only host can save",e.disabled=!0)}getPlayerEntryById(e){return this.playerlist.find(a=>a.playerId===e)}leaveLobby(){m.spawnScreen(new M).setActive("left"),this.die()}selfIsHost(){return this.lobbyHost&&this.lobbyHost.playerId===T.me.id}getSetting(e){var a,o;return(o=(a=this.currentSettings)==null?void 0:a[e])!=null?o:null}template(){return`
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
              <a id="copy-lobby-id" title="Copy Link to Lobby" class="button button-outline button-icon-inline" style="vertical-align: middle; margin-top: -8px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7Z" fill="currentColor"/>
                </svg>
              </a>
            </span>
          </div>

          <dl>
            <dt>No. of Questions</dt>
            <dd id="lobby-dd-question-amount">20</dd>

            <dt>Can Switch Answer</dt>
            <dd id="lobby-dd-answer-switching">NO</dd>

            <dt>Timeout Mode</dt>
            <dd id="lobby-dd-timeout-mode">Normal</dd>

            <dt>Wrong Answer Penalty</dt>
            <dd id="lobby-dd-score-penalty">NO</dd>
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
    </div>`}keydown(e){if(this.currentLobbyStatus!=="IN_GAME"||e.key!=="Tab"||(e.preventDefault(),e.stopPropagation(),e.repeat))return;this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let a=new Promise(o=>{this.scoreboardCloseCallback=o});E("Scoreboard",void 0,{actions:[],closeDialogPromise:a,alternativeContentDom:this.scoreboardDom})}keyup(e){e.key==="Tab"&&this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}setActive(e,a){super.setActive(e,a),location.hash="#/"+this.lobbyId}setInactive(e){super.setInactive(e),location.hash=""}die(){super.die(),u.off("game.status",this.statusListener),u.off("game.playerlist",this.playerlistListener),u.off("game.settings",this.gameSettingsListener),u.off("game.question",this.questionListener),u.off("game.question.active",this.questionActiveListener),u.off("game.question.answers",this.questionAnswersListener),u.off("me.game.left",this.selfLeftListener),this.questions.forEach(e=>{e.die()}),document.removeEventListener("keydown",this.keyDownListener),document.removeEventListener("keyup",this.keyUpListener)}};var M=class extends m{init(){this.domRef.addEventListener("click",a=>{a.preventDefault();let i=a.target.closest(".join-container");if(!i)return;switch(i.getAttribute("data-action")){case"join":this.showJoinDialog();break;case"create":u.sendMsg("game.create");break}}),this.errListener=u.on("generic.error",({title:a})=>{console.log("called err"),E(a),this.submitDisabled(!1)});let e=m.spawnScreen(new z);this.joinedListener=u.once("game.status",({id:a,status:o})=>{u.off("generic.error",this.errListener),e.setActive()})}setActive(e,a){super.setActive(e,a);let o=location.hash.split("/");if(o.length>1){let i=o[1];u.sendMsg("game.join",{id:i})}}showJoinDialog(){let e=document.createElement("div");e.innerHTML='<input type="text" name="lobby-id" autocomplete="off" required minlength=4 placeholder="XXXX">',E("Join Game","",{alternativeContentDom:e,actions:[{value:"cancel",title:"Cancel",class:"button-outline"},{value:"join",title:"Join",class:"button-primary"}],callback:a=>{switch(a){case"join":let{value:o}=e.querySelector('[name="lobby-id"]');u.sendMsg("game.join",{id:o});break}}})}submitDisabled(e){this.domRef.querySelectorAll("input[type=submit]").forEach(a=>a.disabled=e)}die(){super.die(),u.off("generic.error",this.errListener),u.off("game.status",this.joinedListener)}template(){return`
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
    </section>`}};var Z=class extends m{constructor(){super(...arguments);this.additionalClasses=["gradient-bg-screen"]}init(){this.inputDom=this.domRef.querySelector("input[name=username]"),this.domRef.querySelector("form").addEventListener("submit",a=>be(this,null,function*(){a.preventDefault();let o=a.target.submit;o.disabled=!0;let i=a.target.username.value;u.isOpen()||(yield u.open()),u.sendMsg("me.change_name",{name:i}),m.spawnScreen(new M).setActive();try{localStorage.setItem("username",i)}catch(f){}}));let e=localStorage.getItem("username");e&&(this.inputDom.value=e)}setActive(){super.setActive("none"),this.inputDom.focus({preventScroll:!0}),this.inputDom.select()}template(){return`
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
    </div>`}die(){super.die(),u.off("generic.error",this.errListener)}};window.onbeforeunload=function(t){return t.preventDefault(),"are you sure?"};u.on("me",t=>{T.me.id=t.id,T.me.name=t.name});var ka=m.spawnScreen(new Z);ka.setActive();})();
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
