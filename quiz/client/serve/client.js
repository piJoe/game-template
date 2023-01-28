(()=>{var rt=Object.create;var K=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var ot=Object.getOwnPropertyNames,se=Object.getOwnPropertySymbols,st=Object.getPrototypeOf,ne=Object.prototype.hasOwnProperty,it=Object.prototype.propertyIsEnumerable;var ie=(t,r,e)=>r in t?K(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,z=(t,r)=>{for(var e in r||={})ne.call(r,e)&&ie(t,e,r[e]);if(se)for(var e of se(r))it.call(r,e)&&ie(t,e,r[e]);return t};var nt=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var lt=(t,r,e,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of ot(r))!ne.call(t,o)&&o!==e&&K(t,o,{get:()=>r[o],enumerable:!(a=at(r,o))||a.enumerable});return t};var ut=(t,r,e)=>(e=t!=null?rt(st(t)):{},lt(r||!t||!t.__esModule?K(e,"default",{value:t,enumerable:!0}):e,t));var L=(t,r,e)=>new Promise((a,o)=>{var l=i=>{try{s(e.next(i))}catch(u){o(u)}},d=i=>{try{s(e.throw(i))}catch(u){o(u)}},s=i=>i.done?a(i.value):Promise.resolve(i.value).then(l,d);s((e=e.apply(t,r)).next())});var de=nt((Ga,fe)=>{"use strict";var dt=/["'&<>]/;fe.exports=mt;function mt(t){var r=""+t,e=dt.exec(r);if(!e)return r;var a,o="",l=0,d=0;for(l=e.index;l<r.length;l++){switch(r.charCodeAt(l)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}d!==l&&(o+=r.substring(d,l)),d=l+1,o+=a}return d!==l?o+r.substring(d,l):o}});var h={me:{id:"",name:""}};var w=document.querySelector(".overlay-container"),k=new Map,ft=0;w.addEventListener("click",t=>{let r=t.target;if(r.hasAttribute("data-popup-id")){let e=r.getAttribute("data-popup-id"),a=r.getAttribute("data-value");le(e,a)}});function le(t,r){var a;let e=k.get(t);e&&w.removeChild(e.dom),k.delete(t),(a=e.options)!=null&&a.callback&&e.options.callback(r),k.size<1&&w.setAttribute("data-active","false")}function v(t,r,e){let a=(ft++).toString(),o=document.createElement("div");o.classList.add("container","container-fadein");let l=[];e!=null&&e.actions?l.push(...e.actions.map(d=>`<input type="button" data-popup-id="${a}" data-value="${d.value}" class="button ${d.class}" value="${d.title}">`)):l.push(`<input type="button" data-popup-id="${a}" data-value="ok" class="button button-outline" value="OK">`),o.innerHTML=`
    <div class="title-h2">${t}</div>
    <div class="dialog-content">${r&&r.length>0?`${r}`:""}</div>
    <div class="dialog-actions">${l.join("")}</div>`,e!=null&&e.alternativeContentDom&&o.querySelector(".dialog-content").appendChild(e.alternativeContentDom),k.set(a,{dom:o,options:e}),w.setAttribute("data-active","true"),w.appendChild(o),e!=null&&e.closeDialogPromise&&e.closeDialogPromise.then(()=>{le(a)})}var J=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",r=>{let{type:e,data:a}=JSON.parse(r.data);this.handleMessage(e,a)}),this.ws.addEventListener("close",()=>{v("You were disconnected","The session was closed by the server.",{callback:()=>{location.reload()}})}),new Promise(r=>{this.ws.addEventListener("open",()=>{r()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(r,e){this.ws.send(JSON.stringify({type:r,data:e}))}on(r,e,a=!1){this.listener.has(r)||this.listener.set(r,[]);let o=this.listenerId++;return this.listener.get(r).push({callback:e,once:a,id:o}),o}once(r,e){return this.on(r,e,!0)}callListeners(r,e){let a=this.listener.get(r);a&&[...a].forEach((o,l)=>{o.callback(e),o.once&&a.splice(l,1)})}off(r,e){let a=this.listener.get(r);if(!a)return;let o=a.findIndex(l=>l.id===e);o>-1&&a.splice(o,1)}handleMessage(r,e){switch(r){case"me":this.callListeners("me",e);break;case"me.game.left":this.callListeners("me.game.left",e);break;case"game.status":this.callListeners("game.status",e);break;case"game.playerlist":this.callListeners("game.playerlist",e);break;case"game.settings":this.callListeners("game.settings",e);break;case"game.question":this.callListeners("game.question",e);break;case"game.question.active":this.callListeners("game.question.active",e);break;case"game.question.answers":this.callListeners("game.question.answers",e);break;case"generic.error":this.callListeners("generic.error",e);break;default:throw Error("Not yet implemented"+r)}}},n=new J;function ue(t){switch(t){case"animeFromChar":return"Guess anime title by character";case"animeGenre":return"Guess the anime's genre";case"animeStudio":return"Guess the anime's studio";case"charByPicture":return"Guess character from picture";case"animeOpening":return"BETA: Guess anime from opening";default:throw Error("Id not recognized: "+t)}}var Q=ut(de(),1);var pt=typeof global=="object"&&global&&global.Object===Object&&global,R=pt;var ct=typeof self=="object"&&self&&self.Object===Object&&self,bt=R||ct||Function("return this")(),m=bt;var yt=m.Symbol,S=yt;var me=Object.prototype,xt=me.hasOwnProperty,gt=me.toString,M=S?S.toStringTag:void 0;function vt(t){var r=xt.call(t,M),e=t[M];try{t[M]=void 0;var a=!0}catch{}var o=gt.call(t);return a&&(r?t[M]=e:delete t[M]),o}var pe=vt;var ht=Object.prototype,Et=ht.toString;function St(t){return Et.call(t)}var ce=St;var At="[object Null]",Tt="[object Undefined]",be=S?S.toStringTag:void 0;function It(t){return t==null?t===void 0?Tt:At:be&&be in Object(t)?pe(t):ce(t)}var y=It;function Lt(t){return t!=null&&typeof t=="object"}var A=Lt;function wt(t,r){for(var e=-1,a=t==null?0:t.length,o=Array(a);++e<a;)o[e]=r(t[e],e,t);return o}var ye=wt;var Mt=Array.isArray,xe=Mt;function Ot(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var P=Ot;var _t="[object AsyncFunction]",kt="[object Function]",Nt="[object GeneratorFunction]",Rt="[object Proxy]";function Pt(t){if(!P(t))return!1;var r=y(t);return r==kt||r==Nt||r==_t||r==Rt}var C=Pt;var Ct=m["__core-js_shared__"],G=Ct;var ge=function(){var t=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Gt(t){return!!ge&&ge in t}var ve=Gt;var qt=Function.prototype,Dt=qt.toString;function jt(t){if(t!=null){try{return Dt.call(t)}catch{}try{return t+""}catch{}}return""}var x=jt;var Ut=/[\\^$.*+?()[\]{}|]/g,Bt=/^\[object .+?Constructor\]$/,Ht=Function.prototype,$t=Object.prototype,Qt=Ht.toString,Yt=$t.hasOwnProperty,Vt=RegExp("^"+Qt.call(Yt).replace(Ut,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Wt(t){if(!P(t)||ve(t))return!1;var r=C(t)?Vt:Bt;return r.test(x(t))}var he=Wt;function Ft(t,r){return t?.[r]}var Ee=Ft;function Kt(t,r){var e=Ee(t,r);return he(e)?e:void 0}var b=Kt;var zt=b(m,"WeakMap"),q=zt;var Jt=9007199254740991,Xt=/^(?:0|[1-9]\d*)$/;function Zt(t,r){var e=typeof t;return r=r??Jt,!!r&&(e=="number"||e!="symbol"&&Xt.test(t))&&t>-1&&t%1==0&&t<r}var Se=Zt;var er=9007199254740991;function tr(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=er}var D=tr;function rr(t){return t!=null&&D(t.length)&&!C(t)}var Ae=rr;var ar=Object.prototype;function or(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||ar;return t===e}var Te=or;function sr(t,r){for(var e=-1,a=Array(t);++e<t;)a[e]=r(e);return a}var Ie=sr;var ir="[object Arguments]";function nr(t){return A(t)&&y(t)==ir}var X=nr;var Le=Object.prototype,lr=Le.hasOwnProperty,ur=Le.propertyIsEnumerable,fr=X(function(){return arguments}())?X:function(t){return A(t)&&lr.call(t,"callee")&&!ur.call(t,"callee")},we=fr;function dr(){return!1}var Me=dr;var ke=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Oe=ke&&typeof module=="object"&&module&&!module.nodeType&&module,mr=Oe&&Oe.exports===ke,_e=mr?m.Buffer:void 0,pr=_e?_e.isBuffer:void 0,cr=pr||Me,Ne=cr;var br="[object Arguments]",yr="[object Array]",xr="[object Boolean]",gr="[object Date]",vr="[object Error]",hr="[object Function]",Er="[object Map]",Sr="[object Number]",Ar="[object Object]",Tr="[object RegExp]",Ir="[object Set]",Lr="[object String]",wr="[object WeakMap]",Mr="[object ArrayBuffer]",Or="[object DataView]",_r="[object Float32Array]",kr="[object Float64Array]",Nr="[object Int8Array]",Rr="[object Int16Array]",Pr="[object Int32Array]",Cr="[object Uint8Array]",Gr="[object Uint8ClampedArray]",qr="[object Uint16Array]",Dr="[object Uint32Array]",f={};f[_r]=f[kr]=f[Nr]=f[Rr]=f[Pr]=f[Cr]=f[Gr]=f[qr]=f[Dr]=!0;f[br]=f[yr]=f[Mr]=f[xr]=f[Or]=f[gr]=f[vr]=f[hr]=f[Er]=f[Sr]=f[Ar]=f[Tr]=f[Ir]=f[Lr]=f[wr]=!1;function jr(t){return A(t)&&D(t.length)&&!!f[y(t)]}var Re=jr;function Ur(t){return function(r){return t(r)}}var Pe=Ur;var Ce=typeof exports=="object"&&exports&&!exports.nodeType&&exports,O=Ce&&typeof module=="object"&&module&&!module.nodeType&&module,Br=O&&O.exports===Ce,Z=Br&&R.process,Hr=function(){try{var t=O&&O.require&&O.require("util").types;return t||Z&&Z.binding&&Z.binding("util")}catch{}}(),ee=Hr;var Ge=ee&&ee.isTypedArray,$r=Ge?Pe(Ge):Re,qe=$r;var Qr=Object.prototype,Yr=Qr.hasOwnProperty;function Vr(t,r){var e=xe(t),a=!e&&we(t),o=!e&&!a&&Ne(t),l=!e&&!a&&!o&&qe(t),d=e||a||o||l,s=d?Ie(t.length,String):[],i=s.length;for(var u in t)(r||Yr.call(t,u))&&!(d&&(u=="length"||o&&(u=="offset"||u=="parent")||l&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||Se(u,i)))&&s.push(u);return s}var De=Vr;function Wr(t,r){return function(e){return t(r(e))}}var je=Wr;var Fr=je(Object.keys,Object),Ue=Fr;var Kr=Object.prototype,zr=Kr.hasOwnProperty;function Jr(t){if(!Te(t))return Ue(t);var r=[];for(var e in Object(t))zr.call(t,e)&&e!="constructor"&&r.push(e);return r}var Be=Jr;function Xr(t){return Ae(t)?De(t):Be(t)}var He=Xr;var Zr=b(m,"Map"),j=Zr;var ea=b(m,"DataView"),U=ea;var ta=b(m,"Promise"),B=ta;var ra=b(m,"Set"),H=ra;var $e="[object Map]",aa="[object Object]",Qe="[object Promise]",Ye="[object Set]",Ve="[object WeakMap]",We="[object DataView]",oa=x(U),sa=x(j),ia=x(B),na=x(H),la=x(q),E=y;(U&&E(new U(new ArrayBuffer(1)))!=We||j&&E(new j)!=$e||B&&E(B.resolve())!=Qe||H&&E(new H)!=Ye||q&&E(new q)!=Ve)&&(E=function(t){var r=y(t),e=r==aa?t.constructor:void 0,a=e?x(e):"";if(a)switch(a){case oa:return We;case sa:return $e;case ia:return Qe;case na:return Ye;case la:return Ve}return r});var Fe=E;function ua(t){var r=-1,e=Array(t.size);return t.forEach(function(a,o){e[++r]=[o,a]}),e}var Ke=ua;function fa(t,r){return ye(r,function(e){return[e,t[e]]})}var ze=fa;function da(t){var r=-1,e=Array(t.size);return t.forEach(function(a){e[++r]=[a,a]}),e}var Je=da;var ma="[object Map]",pa="[object Set]";function ca(t){return function(r){var e=Fe(r);return e==ma?Ke(r):e==pa?Je(r):ze(r,t(r))}}var Xe=ca;var ba=Xe(He),te=ba;var ya={volume:1},Ze,xa=z(z({},ya),JSON.parse((Ze=localStorage.getItem("settings"))!=null?Ze:"{}")),$=new Proxy(xa,{set(t,r,e){return console.log("GLOBAL STATE CHANGED!"),t[r]=e,localStorage.setItem("settings",JSON.stringify(t)),document.dispatchEvent(new CustomEvent("globalSettingsChanged",{detail:t})),!0}}),re=document.querySelector(".settings-overlay");function ga(){let t=re.querySelector(".settings-dropdown");t.innerHTML=`
  <div class="settings-dropdown-entry settings-dropdown-entry-inverted">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /></svg>
    <input type="range" id="setting-audio-volume" min="1" max="100" value="${$.volume*100}">
  </div>`,re.querySelector("#setting-audio-volume").addEventListener("input",e=>{$.volume=parseInt(e.target.value)/100});let r=re.querySelector(".settings-button");document.addEventListener("click",e=>{if(e.target===r){t.toggleAttribute("data-active");return}if(!t.contains(e.target)){t.toggleAttribute("data-active",!1);return}})}ga();var _=null,p=class{constructor(){this.killWhenInactive=!0;this.additionalClasses=[]}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen",...this.additionalClasses),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(r="right"){_&&_.setInactive(r);let e="cur-none";switch(r){case"left":e="cur-left";break;case"right":e="cur"}this.domRef.setAttribute("data-screen-active",e),_=this}setInactive(r="right"){let e="prev-none";switch(r){case"left":e="prev-left";break;case"right":e="prev"}this.domRef.setAttribute("data-screen-active",e),this.killWhenInactive&&this.die()}die(){_===this&&(_=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(r){return r.setup(),r.render(),r.init(),r}};var Y=class extends p{constructor(e,a,o){super();this.questionId=null;this.ownAnwser=null;this.questionDone=!1;this.lobby=e,this.questionId=a,this.question=o}init(){this.domRef.addEventListener("click",e=>{let a=e.target;if(!a.hasAttribute("data-answer"))return;let o=a.getAttribute("data-answer");this.ownAnwser=parseInt(o),n.sendMsg("game.question.answer",{questionId:this.questionId,answer:this.ownAnwser}),this.domRef.querySelectorAll("[data-answer-selected=true]").forEach(l=>{l.removeAttribute("data-answer-selected")}),a.setAttribute("data-answer-selected","true")}),this.question.question.audioUrl&&(this.audio=new Audio(this.question.question.audioUrl),this.audio.preload="auto",this.audio.autoplay=!1,this.audio.volume=$.volume,document.addEventListener("globalSettingsChanged",e=>{this.audio.volume=e.detail.volume})),this.timerDOM=this.domRef.querySelector(".question-timer")}setActive(){super.setActive(),this.timerStarted=Date.now(),this.audio&&this.audio.play(),window.requestAnimationFrame(()=>{this.updateTimer()})}updateTimer(){let e=this.question.timeoutMs-500,a=Math.ceil((this.timerStarted+e-Date.now())/1e3),o=Math.max(1-(Date.now()-this.timerStarted)/e,0);this.questionDone&&(o=0),this.timerDOM.style.transform=`scaleX(${o})`,(a>0||!this.questionDone)&&window.requestAnimationFrame(()=>{this.updateTimer()})}showAnswers(e,a){let{correct:o,wrong:l}=e,d=te(a);o.forEach(s=>{this.domRef.querySelector(`li[data-answer="${s}"]`).setAttribute("data-answer-correct","true")}),l.includes(this.ownAnwser)&&this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct","false"),this.question.question.image&&this.domRef.querySelector(".question-image").removeAttribute("data-blurred"),d.forEach(([s,i])=>{let u=this.lobby.getPlayerEntryById(s).name,g=this.domRef.querySelector(`li[data-answer="${i}"] > .answer-others-container`),I=document.createElement("div");I.classList.add("answer-others","skewed-tag"),I.innerHTML=`<span>${u}</span>`,g.appendChild(I)}),this.questionDone=!0}setInactive(e){super.setInactive(e),this.audio&&(this.audio.pause(),this.audio.remove())}template(){let e=this.question.question,a=this.question.answers,o=!!this.question.question.image,l=!!this.question.question.audioUrl;return`
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId+1}</div>
        ${o?`<div class="question-image-container">
            <img class="question-image" ${e.imageBlurred?"data-blurred=true":""} src="${(0,Q.default)(e.image)}">
            </div>`:""}
        <div class="question-title title-h3">${(0,Q.default)(e.title)}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${a.map((d,s)=>`<li data-answer="${s}">
            ${(0,Q.default)(d)}
            <div class="answer-others-container"></div>
          </li>`).join("")}
      </ul>
    </div>`}};var V=class extends p{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["lobby-screen"];this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[];this.questions=new Map}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let e=this.domRef.querySelector("#copy-lobby-id");this.lobbySettingsDom=this.domRef.querySelector(".lobby-settings");let a=this.domRef.querySelector("#lobby-back-button");document.addEventListener("keydown",this.keydown.bind(this)),document.addEventListener("keyup",this.keyup.bind(this));let o=this.domRef.querySelector(".lobby-playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=n.on("game.status",({id:s,status:i})=>{if(this.lobbyId=s,this.domRef.querySelector("#lobby-id").innerHTML=s,this.currentLobbyStatus&&this.currentLobbyStatus!==i)switch(i){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),v("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=i,this.updateReadyButton()}),this.playerlistListener=n.on("game.playerlist",({playerlist:s,host:i})=>{var oe;this.playerlist=s,this.lobbyHost=this.playerlist.find(c=>c.playerId===i);let u=new Array(Math.max(6-this.playerlist.length,0)).fill(!0),g=[...this.playerlist].map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <span class="player-name">${c.name}</span>
                  ${c.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
                </div>
                <div class="list-row-entry player-row-more">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                  </svg>
                </div>
              </li>`).join(""),I=u.map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`).join("");o.innerHTML=g+I,this.scoreboardDom.innerHTML=[...this.playerlist].sort((c,tt)=>tt.score-c.score).map(c=>`<li class="playerlist-entry">
                ${c.name}
                <div class="skewed-tag ${c.playerId===h.me.id?"skewed-tag-primary":""} tag-score">${c.score}</div>
              </li>`).join("");let et=this.playerlist.filter(c=>c.ready).length;document.querySelector("#lobby-dd-ready").innerHTML=`${et}/${this.playerlist.length}`,document.querySelector("#lobby-dd-host").innerHTML=(oe=this.lobbyHost)==null?void 0:oe.name;let F=s.find(c=>c.playerId===h.me.id);this.selfReady=F==null?void 0:F.ready,this.updateReadyButton(),this.updateSaveSettingsButton()}),this.gameSettingsListener=n.on("game.settings",({currentSettings:s,availableQuestions:i})=>{this.renderSettings(s,i),document.querySelector("#lobby-dd-question-amount").innerHTML=`${s["questionCount"]}`}),this.questionListener=n.on("game.question",({id:s,question:i})=>{let u=p.spawnScreen(new Y(this,s,i));this.questions.set(s,u)}),this.questionActiveListener=n.on("game.question.active",({id:s})=>{this.questions.get(s).setActive()}),this.questionAnswersListener=n.on("game.question.answers",({id:s,answers:i,playerAnswers:u})=>{this.questions.get(s).showAnswers(i,u)}),this.selfLeftListener=n.on("me.game.left",({reason:s})=>{this.leaveLobby(),s==="KICKED_INACTIVITY"&&v("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",s=>{this.selfReady=!this.selfReady,n.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),e.addEventListener("click",s=>{s.preventDefault(),navigator.clipboard.writeText(this.lobbyId)});let l=this.domRef.querySelectorAll("[data-tab]"),d=this.domRef.querySelector(".tab-menu");d.addEventListener("click",s=>{s.preventDefault();let i=s.target,u=i.getAttribute("data-target-tab");console.log(i,u),u&&(d.querySelector("[data-active=true]").removeAttribute("data-active"),i.setAttribute("data-active","true"),l.forEach(g=>{g.setAttribute("data-inactive","true"),g.getAttribute("data-tab")===u&&g.removeAttribute("data-inactive")}))}),a.addEventListener("click",s=>{s.preventDefault(),n.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",s=>{s.preventDefault(),this.submitSettings()}),this.settingsSubmitButton=this.domRef.querySelector(".button[name=update-settings]"),this.lobbySettingsDom.addEventListener("input",s=>{if(s.preventDefault(),!this.selfIsHost()){this.lobbySettingsDom.reset();return}this.settingsSubmitButton.setAttribute("data-active","true")})}renderSettings(e,a){let l=[{label:"No. of Questions",inputs:[{value:e["questionCount"],name:"questionCount",type:"number",min:3,max:50}]},{label:"Popularity",inputs:[{value:e["minPopularity"],name:"minPopularity",type:"number",min:-1,max:1e4},{value:e["maxPopularity"],name:"maxPopularity",type:"number",min:-1,max:1e4}]},{label:"Main Role Only",inputs:[{value:e["mainRoleOnly"],checked:e["mainRoleOnly"],name:"mainRoleOnly",type:"checkbox"}]}].map(s=>`<div class="list-row">
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
            <span class="setting-row-entry-label">${ue(s)}</span>
            <input type="checkbox" id="q_${s}" 
            name="${"activeQuestions"}" 
            value="${s}" 
            ${e["activeQuestions"].some(i=>s===i)?"checked":""}>
          </div>
        </div>`).join("");this.lobbySettingsDom.innerHTML=`<div class="list-row list-row-header">Filters</div>
    ${l}
    
    <div class="list-row list-row-header">Questions</div>
    ${d}`,this.settingsSubmitButton.removeAttribute("data-active")}submitSettings(){n.sendMsg("game.settings",{settings:{["questionCount"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"questionCount"}"]`).value),["activeQuestions"]:Array.from(this.lobbySettingsDom.querySelectorAll(`[name="${"activeQuestions"}"]:checked`)).map(e=>e.value),["mainRoleOnly"]:this.lobbySettingsDom.querySelector(`[name="${"mainRoleOnly"}"]`).checked,["minPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minPopularity"}"]`).value),["maxPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxPopularity"}"]`).value)}})}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}updateSaveSettingsButton(){let e=this.domRef.querySelector("#update-settings-button");this.selfIsHost()?(e.value="Save",e.disabled=!1):(e.value="Only host can save",e.disabled=!0)}getPlayerEntryById(e){return this.playerlist.find(a=>a.playerId===e)}leaveLobby(){p.spawnScreen(new T).setActive("left"),this.die()}selfIsHost(){return this.lobbyHost&&this.lobbyHost.playerId===h.me.id}template(){return`
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
    </div>`}keydown(e){if(this.currentLobbyStatus!=="IN_GAME"||e.key!=="Tab"||(e.preventDefault(),e.stopPropagation(),e.repeat))return;this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let a=new Promise(o=>{this.scoreboardCloseCallback=o});v("Scoreboard",void 0,{actions:[],closeDialogPromise:a,alternativeContentDom:this.scoreboardDom})}keyup(e){e.key==="Tab"&&this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}die(){super.die(),n.off("game.status",this.statusListener),n.off("game.playerlist",this.playerlistListener),n.off("game.settings",this.gameSettingsListener),n.off("game.question",this.questionListener),n.off("game.question.active",this.questionActiveListener),n.off("game.question.answers",this.questionAnswersListener),n.off("me.game.left",this.selfLeftListener),this.questions.forEach(e=>{e.die()}),document.removeEventListener("keydown",this.keydown),document.removeEventListener("keyup",this.keyup)}};var T=class extends p{init(){this.domRef.querySelector("form[name=create]").addEventListener("submit",a=>L(this,null,function*(){a.preventDefault(),this.submitDisabled(!0),n.sendMsg("game.create")})),this.domRef.querySelector("form[name=join]").addEventListener("submit",a=>L(this,null,function*(){a.preventDefault(),document.activeElement.blur();let o=a.target["lobby-id"].value;this.submitDisabled(!0),n.sendMsg("game.join",{id:o})})),this.errListener=n.on("generic.error",({title:a})=>{console.log("called err"),v(a),this.submitDisabled(!1)});let e=p.spawnScreen(new V);this.joinedListener=n.once("game.status",({id:a,status:o})=>{n.off("generic.error",this.errListener),e.setActive()})}submitDisabled(e){this.domRef.querySelectorAll("input[type=submit]").forEach(a=>a.disabled=e)}die(){super.die(),n.off("generic.error",this.errListener),n.off("game.status",this.joinedListener)}template(){return`
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
    </section>`}};var W=class extends p{init(){this.domRef.querySelector("form").addEventListener("submit",e=>L(this,null,function*(){e.preventDefault();let a=e.target.submit;a.disabled=!0;let o=e.target.username.value;n.isOpen()||(yield n.open()),n.sendMsg("me.change_name",{name:o}),p.spawnScreen(new T).setActive()}))}setActive(){super.setActive("none"),this.domRef.querySelector("input[name=username]").focus({preventScroll:!0})}template(){return`
    <h1 class="title-h1">otakuquiz.lol</h1>
    <div class="container">
      <div class="title-h2">Choose your username</div>
      <form class="combined-form" name="login">
        <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
        <input type="submit" class="button button-primary" name="submit" value="Connect!">
      </form>
    </div>`}die(){super.die(),n.off("generic.error",this.errListener)}};n.on("me",t=>{h.me.id=t.id,h.me.name=t.name});var va=p.spawnScreen(new W);va.setActive();})();
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
