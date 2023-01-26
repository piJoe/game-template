(()=>{var Ve=Object.create;var ee=Object.defineProperty;var Fe=Object.getOwnPropertyDescriptor;var Ke=Object.getOwnPropertyNames;var ze=Object.getPrototypeOf,Xe=Object.prototype.hasOwnProperty;var Je=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var Ze=(t,r,e,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of Ke(r))!Xe.call(t,o)&&o!==e&&ee(t,o,{get:()=>r[o],enumerable:!(a=Fe(r,o))||a.enumerable});return t};var et=(t,r,e)=>(e=t!=null?Ve(ze(t)):{},Ze(r||!t||!t.__esModule?ee(e,"default",{value:t,enumerable:!0}):e,t));var L=(t,r,e)=>new Promise((a,o)=>{var l=i=>{try{s(e.next(i))}catch(f){o(f)}},d=i=>{try{s(e.throw(i))}catch(f){o(f)}},s=i=>i.done?a(i.value):Promise.resolve(i.value).then(l,d);s((e=e.apply(t,r)).next())});var oe=Je((Ta,ae)=>{"use strict";var rt=/["'&<>]/;ae.exports=at;function at(t){var r=""+t,e=rt.exec(r);if(!e)return r;var a,o="",l=0,d=0;for(l=e.index;l<r.length;l++){switch(r.charCodeAt(l)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}d!==l&&(o+=r.substring(d,l)),d=l+1,o+=a}return d!==l?o+r.substring(d,l):o}});var b={me:{id:"",name:""},settings:{volume:.5}};var M=document.querySelector(".overlay-container"),k=new Map,tt=0;M.addEventListener("click",t=>{let r=t.target;if(r.hasAttribute("data-popup-id")){let e=r.getAttribute("data-popup-id"),a=r.getAttribute("data-value");te(e,a)}});function te(t,r){var a;let e=k.get(t);e&&M.removeChild(e.dom),k.delete(t),(a=e.options)!=null&&a.callback&&e.options.callback(r),k.size<1&&M.setAttribute("data-active","false")}function g(t,r,e){let a=(tt++).toString(),o=document.createElement("div");o.classList.add("container","container-fadein");let l=[];e!=null&&e.actions?l.push(...e.actions.map(d=>`<input type="button" data-popup-id="${a}" data-value="${d.value}" class="button ${d.class}" value="${d.title}">`)):l.push(`<input type="button" data-popup-id="${a}" data-value="ok" class="button button-outline" value="OK">`),o.innerHTML=`
    <div class="title-h2">${t}</div>
    <div class="dialog-content">${r&&r.length>0?`${r}`:""}</div>
    <div class="dialog-actions">${l.join("")}</div>`,e!=null&&e.alternativeContentDom&&o.querySelector(".dialog-content").appendChild(e.alternativeContentDom),k.set(a,{dom:o,options:e}),M.setAttribute("data-active","true"),M.appendChild(o),e!=null&&e.closeDialogPromise&&e.closeDialogPromise.then(()=>{te(a)})}var F=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",r=>{let{type:e,data:a}=JSON.parse(r.data);this.handleMessage(e,a)}),this.ws.addEventListener("close",()=>{g("You were disconnected","The session was closed by the server.",{callback:()=>{location.reload()}})}),new Promise(r=>{this.ws.addEventListener("open",()=>{r()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(r,e){this.ws.send(JSON.stringify({type:r,data:e}))}on(r,e,a=!1){this.listener.has(r)||this.listener.set(r,[]);let o=this.listenerId++;return this.listener.get(r).push({callback:e,once:a,id:o}),o}once(r,e){return this.on(r,e,!0)}callListeners(r,e){let a=this.listener.get(r);a&&[...a].forEach((o,l)=>{o.callback(e),o.once&&a.splice(l,1)})}off(r,e){let a=this.listener.get(r);if(!a)return;let o=a.findIndex(l=>l.id===e);o>-1&&a.splice(o,1)}handleMessage(r,e){switch(r){case"me":this.callListeners("me",e);break;case"me.game.left":this.callListeners("me.game.left",e);break;case"game.status":this.callListeners("game.status",e);break;case"game.playerlist":this.callListeners("game.playerlist",e);break;case"game.settings":this.callListeners("game.settings",e);break;case"game.question":this.callListeners("game.question",e);break;case"game.question.active":this.callListeners("game.question.active",e);break;case"game.question.answers":this.callListeners("game.question.answers",e);break;case"generic.error":this.callListeners("generic.error",e);break;default:throw Error("Not yet implemented"+r)}}},n=new F;function re(t){switch(t){case"animeFromChar":return"Guess anime title by character";case"animeGenre":return"Guess the anime's genre";case"animeStudio":return"Guess the anime's studio";case"charByPicture":return"Guess character from picture";case"animeOpening":return"BETA: Guess anime from opening";default:throw Error("Id not recognized: "+t)}}var H=et(oe(),1);var ot=typeof global=="object"&&global&&global.Object===Object&&global,R=ot;var st=typeof self=="object"&&self&&self.Object===Object&&self,it=R||st||Function("return this")(),m=it;var nt=m.Symbol,A=nt;var se=Object.prototype,lt=se.hasOwnProperty,ft=se.toString,w=A?A.toStringTag:void 0;function ut(t){var r=lt.call(t,w),e=t[w];try{t[w]=void 0;var a=!0}catch{}var o=ft.call(t);return a&&(r?t[w]=e:delete t[w]),o}var ie=ut;var dt=Object.prototype,mt=dt.toString;function pt(t){return mt.call(t)}var ne=pt;var ct="[object Null]",bt="[object Undefined]",le=A?A.toStringTag:void 0;function xt(t){return t==null?t===void 0?bt:ct:le&&le in Object(t)?ie(t):ne(t)}var y=xt;function yt(t){return t!=null&&typeof t=="object"}var S=yt;function vt(t,r){for(var e=-1,a=t==null?0:t.length,o=Array(a);++e<a;)o[e]=r(t[e],e,t);return o}var fe=vt;var ht=Array.isArray,ue=ht;function gt(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var P=gt;var Et="[object AsyncFunction]",At="[object Function]",St="[object GeneratorFunction]",Tt="[object Proxy]";function It(t){if(!P(t))return!1;var r=y(t);return r==At||r==St||r==Et||r==Tt}var C=It;var Lt=m["__core-js_shared__"],G=Lt;var de=function(){var t=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function Mt(t){return!!de&&de in t}var me=Mt;var wt=Function.prototype,_t=wt.toString;function Ot(t){if(t!=null){try{return _t.call(t)}catch{}try{return t+""}catch{}}return""}var v=Ot;var kt=/[\\^$.*+?()[\]{}|]/g,Nt=/^\[object .+?Constructor\]$/,Rt=Function.prototype,Pt=Object.prototype,Ct=Rt.toString,Gt=Pt.hasOwnProperty,qt=RegExp("^"+Ct.call(Gt).replace(kt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Dt(t){if(!P(t)||me(t))return!1;var r=C(t)?qt:Nt;return r.test(v(t))}var pe=Dt;function jt(t,r){return t?.[r]}var ce=jt;function Ut(t,r){var e=ce(t,r);return pe(e)?e:void 0}var x=Ut;var Bt=x(m,"WeakMap"),q=Bt;var $t=9007199254740991,Ht=/^(?:0|[1-9]\d*)$/;function Qt(t,r){var e=typeof t;return r=r??$t,!!r&&(e=="number"||e!="symbol"&&Ht.test(t))&&t>-1&&t%1==0&&t<r}var be=Qt;var Wt=9007199254740991;function Yt(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=Wt}var D=Yt;function Vt(t){return t!=null&&D(t.length)&&!C(t)}var xe=Vt;var Ft=Object.prototype;function Kt(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||Ft;return t===e}var ye=Kt;function zt(t,r){for(var e=-1,a=Array(t);++e<t;)a[e]=r(e);return a}var ve=zt;var Xt="[object Arguments]";function Jt(t){return S(t)&&y(t)==Xt}var K=Jt;var he=Object.prototype,Zt=he.hasOwnProperty,er=he.propertyIsEnumerable,tr=K(function(){return arguments}())?K:function(t){return S(t)&&Zt.call(t,"callee")&&!er.call(t,"callee")},ge=tr;function rr(){return!1}var Ee=rr;var Te=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ae=Te&&typeof module=="object"&&module&&!module.nodeType&&module,ar=Ae&&Ae.exports===Te,Se=ar?m.Buffer:void 0,or=Se?Se.isBuffer:void 0,sr=or||Ee,Ie=sr;var ir="[object Arguments]",nr="[object Array]",lr="[object Boolean]",fr="[object Date]",ur="[object Error]",dr="[object Function]",mr="[object Map]",pr="[object Number]",cr="[object Object]",br="[object RegExp]",xr="[object Set]",yr="[object String]",vr="[object WeakMap]",hr="[object ArrayBuffer]",gr="[object DataView]",Er="[object Float32Array]",Ar="[object Float64Array]",Sr="[object Int8Array]",Tr="[object Int16Array]",Ir="[object Int32Array]",Lr="[object Uint8Array]",Mr="[object Uint8ClampedArray]",wr="[object Uint16Array]",_r="[object Uint32Array]",u={};u[Er]=u[Ar]=u[Sr]=u[Tr]=u[Ir]=u[Lr]=u[Mr]=u[wr]=u[_r]=!0;u[ir]=u[nr]=u[hr]=u[lr]=u[gr]=u[fr]=u[ur]=u[dr]=u[mr]=u[pr]=u[cr]=u[br]=u[xr]=u[yr]=u[vr]=!1;function Or(t){return S(t)&&D(t.length)&&!!u[y(t)]}var Le=Or;function kr(t){return function(r){return t(r)}}var Me=kr;var we=typeof exports=="object"&&exports&&!exports.nodeType&&exports,_=we&&typeof module=="object"&&module&&!module.nodeType&&module,Nr=_&&_.exports===we,z=Nr&&R.process,Rr=function(){try{var t=_&&_.require&&_.require("util").types;return t||z&&z.binding&&z.binding("util")}catch{}}(),X=Rr;var _e=X&&X.isTypedArray,Pr=_e?Me(_e):Le,Oe=Pr;var Cr=Object.prototype,Gr=Cr.hasOwnProperty;function qr(t,r){var e=ue(t),a=!e&&ge(t),o=!e&&!a&&Ie(t),l=!e&&!a&&!o&&Oe(t),d=e||a||o||l,s=d?ve(t.length,String):[],i=s.length;for(var f in t)(r||Gr.call(t,f))&&!(d&&(f=="length"||o&&(f=="offset"||f=="parent")||l&&(f=="buffer"||f=="byteLength"||f=="byteOffset")||be(f,i)))&&s.push(f);return s}var ke=qr;function Dr(t,r){return function(e){return t(r(e))}}var Ne=Dr;var jr=Ne(Object.keys,Object),Re=jr;var Ur=Object.prototype,Br=Ur.hasOwnProperty;function $r(t){if(!ye(t))return Re(t);var r=[];for(var e in Object(t))Br.call(t,e)&&e!="constructor"&&r.push(e);return r}var Pe=$r;function Hr(t){return xe(t)?ke(t):Pe(t)}var Ce=Hr;var Qr=x(m,"Map"),j=Qr;var Wr=x(m,"DataView"),U=Wr;var Yr=x(m,"Promise"),B=Yr;var Vr=x(m,"Set"),$=Vr;var Ge="[object Map]",Fr="[object Object]",qe="[object Promise]",De="[object Set]",je="[object WeakMap]",Ue="[object DataView]",Kr=v(U),zr=v(j),Xr=v(B),Jr=v($),Zr=v(q),E=y;(U&&E(new U(new ArrayBuffer(1)))!=Ue||j&&E(new j)!=Ge||B&&E(B.resolve())!=qe||$&&E(new $)!=De||q&&E(new q)!=je)&&(E=function(t){var r=y(t),e=r==Fr?t.constructor:void 0,a=e?v(e):"";if(a)switch(a){case Kr:return Ue;case zr:return Ge;case Xr:return qe;case Jr:return De;case Zr:return je}return r});var Be=E;function ea(t){var r=-1,e=Array(t.size);return t.forEach(function(a,o){e[++r]=[o,a]}),e}var $e=ea;function ta(t,r){return fe(r,function(e){return[e,t[e]]})}var He=ta;function ra(t){var r=-1,e=Array(t.size);return t.forEach(function(a){e[++r]=[a,a]}),e}var Qe=ra;var aa="[object Map]",oa="[object Set]";function sa(t){return function(r){var e=Be(r);return e==aa?$e(r):e==oa?Qe(r):He(r,t(r))}}var We=sa;var ia=We(Ce),J=ia;var O=null,p=class{constructor(){this.killWhenInactive=!0;this.additionalClasses=[]}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen",...this.additionalClasses),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(r="right"){O&&O.setInactive(r);let e="cur-none";switch(r){case"left":e="cur-left";break;case"right":e="cur"}this.domRef.setAttribute("data-screen-active",e),O=this}setInactive(r="right"){let e="prev-none";switch(r){case"left":e="prev-left";break;case"right":e="prev"}this.domRef.setAttribute("data-screen-active",e),this.killWhenInactive&&this.die()}die(){O===this&&(O=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(r){return r.setup(),r.render(),r.init(),r}};var Q=class extends p{constructor(e,a,o){super();this.questionId=null;this.ownAnwser=null;this.questionDone=!1;this.lobby=e,this.questionId=a,this.question=o}init(){if(this.domRef.addEventListener("click",e=>{let a=e.target;if(!a.hasAttribute("data-answer"))return;let o=a.getAttribute("data-answer");this.ownAnwser=parseInt(o),n.sendMsg("game.question.answer",{questionId:this.questionId,answer:this.ownAnwser}),this.domRef.querySelectorAll("[data-answer-selected=true]").forEach(l=>{l.removeAttribute("data-answer-selected")}),a.setAttribute("data-answer-selected","true")}),this.question.question.audioUrl){this.audio=new Audio(this.question.question.audioUrl),this.audio.preload="auto",this.audio.autoplay=!1,this.audio.volume=b.settings.volume;let e=this.domRef.querySelector("#audio-volume");e.addEventListener("input",a=>{let o=parseInt(e.value)/100;b.settings.volume=o,this.audio.volume=b.settings.volume})}this.timerDOM=this.domRef.querySelector(".question-timer")}setActive(){super.setActive(),this.timerStarted=Date.now(),this.audio&&this.audio.play(),window.requestAnimationFrame(()=>{this.updateTimer()})}updateTimer(){let e=this.question.timeoutMs-500,a=Math.ceil((this.timerStarted+e-Date.now())/1e3),o=Math.max(1-(Date.now()-this.timerStarted)/e,0);this.questionDone&&(o=0),this.timerDOM.style.transform=`scaleX(${o})`,(a>0||!this.questionDone)&&window.requestAnimationFrame(()=>{this.updateTimer()})}showAnswers(e,a){let{correct:o,wrong:l}=e,d=J(a);o.forEach(s=>{this.domRef.querySelector(`li[data-answer="${s}"]`).setAttribute("data-answer-correct","true")}),l.includes(this.ownAnwser)&&this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct","false"),this.question.question.image&&this.domRef.querySelector(".question-image").removeAttribute("data-blurred"),d.forEach(([s,i])=>{let f=this.lobby.getPlayerEntryById(s).name,h=this.domRef.querySelector(`li[data-answer="${i}"] > .answer-others-container`),I=document.createElement("div");I.classList.add("answer-others","skewed-tag"),I.innerHTML=`<span>${f}</span>`,h.appendChild(I)}),this.questionDone=!0}setInactive(e){super.setInactive(e),this.audio&&(this.audio.pause(),this.audio.remove())}template(){let e=this.question.question,a=this.question.answers,o=!!this.question.question.image,l=!!this.question.question.audioUrl;return`
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId+1}</div>
        ${o?`<div class="question-image-container">
            <img class="question-image" ${e.imageBlurred?"data-blurred=true":""} src="${(0,H.default)(e.image)}">
            </div>`:""}
        <div class="question-title title-h3">${(0,H.default)(e.title)}</div>
        ${l?`<div class="question-audio-slider"><input type="range" min="1" max="100" value="${b.settings.volume*100}" id="audio-volume"> </div>`:""}
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${a.map((d,s)=>`<li data-answer="${s}">
            ${(0,H.default)(d)}
            <div class="answer-others-container"></div>
          </li>`).join("")}
      </ul>
    </div>`}};var W=class extends p{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["lobby-screen"];this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[];this.questions=new Map}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let e=this.domRef.querySelector("#copy-lobby-id");this.lobbySettingsDom=this.domRef.querySelector(".lobby-settings");let a=this.domRef.querySelector("#lobby-back-button");document.addEventListener("keydown",this.keydown.bind(this)),document.addEventListener("keyup",this.keyup.bind(this));let o=this.domRef.querySelector(".lobby-playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=n.on("game.status",({id:s,status:i})=>{if(this.lobbyId=s,this.domRef.querySelector("#lobby-id").innerHTML=s,this.currentLobbyStatus&&this.currentLobbyStatus!==i)switch(i){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),g("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=i,this.updateReadyButton()}),this.playerlistListener=n.on("game.playerlist",({playerlist:s})=>{this.playerlist=s;let i=new Array(Math.max(6-this.playerlist.length,0)).fill(!0),f=[...this.playerlist].map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <span class="player-name">${c.name}</span>
                  ${c.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
                </div>
                <div class="list-row-entry player-row-more">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                  </svg>
                </div>
              </li>`).join(""),h=i.map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`).join("");o.innerHTML=f+h,this.scoreboardDom.innerHTML=[...this.playerlist].sort((c,Ye)=>Ye.score-c.score).map(c=>`<li class="playerlist-entry">
                ${c.name}
                <div class="skewed-tag ${c.playerId===b.me.id?"skewed-tag-primary":""} tag-score">${c.score}</div>
              </li>`).join("");let I=this.playerlist.filter(c=>c.ready).length;document.querySelector("#lobby-dd-ready").innerHTML=`${I}/${this.playerlist.length}`;let V=s.find(c=>c.playerId===b.me.id);this.selfReady=V==null?void 0:V.ready,this.updateReadyButton()}),this.gameSettingsListener=n.on("game.settings",({currentSettings:s,availableQuestions:i})=>{this.renderSettings(s,i),document.querySelector("#lobby-dd-question-amount").innerHTML=`${s["questionCount"]}`}),this.questionListener=n.on("game.question",({id:s,question:i})=>{let f=p.spawnScreen(new Q(this,s,i));this.questions.set(s,f)}),this.questionActiveListener=n.on("game.question.active",({id:s})=>{this.questions.get(s).setActive()}),this.questionAnswersListener=n.on("game.question.answers",({id:s,answers:i,playerAnswers:f})=>{this.questions.get(s).showAnswers(i,f)}),this.selfLeftListener=n.on("me.game.left",({reason:s})=>{this.leaveLobby(),s==="KICKED_INACTIVITY"&&g("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",s=>{this.selfReady=!this.selfReady,n.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),e.addEventListener("click",s=>{s.preventDefault(),navigator.clipboard.writeText(this.lobbyId)});let l=this.domRef.querySelectorAll("[data-tab]"),d=this.domRef.querySelector(".tab-menu");d.addEventListener("click",s=>{s.preventDefault();let i=s.target,f=i.getAttribute("data-target-tab");console.log(i,f),f&&(d.querySelector("[data-active=true]").removeAttribute("data-active"),i.setAttribute("data-active","true"),l.forEach(h=>{h.setAttribute("data-inactive","true"),h.getAttribute("data-tab")===f&&h.removeAttribute("data-inactive")}))}),a.addEventListener("click",s=>{s.preventDefault(),n.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",s=>{s.preventDefault(),this.submitSettings()}),this.settingsSubmitButton=this.domRef.querySelector(".button[name=update-settings]"),this.lobbySettingsDom.addEventListener("input",s=>{s.preventDefault(),this.settingsSubmitButton.setAttribute("data-active","true")})}renderSettings(e,a){let l=[{label:"No. of Questions",inputs:[{value:e["questionCount"],name:"questionCount",type:"number",min:3,max:50}]},{label:"Popularity",inputs:[{value:e["minPopularity"],name:"minPopularity",type:"number",min:-1,max:1e4},{value:e["maxPopularity"],name:"maxPopularity",type:"number",min:-1,max:1e4}]},{label:"Main Role Only",inputs:[{value:e["mainRoleOnly"],checked:e["mainRoleOnly"],name:"mainRoleOnly",type:"checkbox"}]}].map(s=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${s.label}</span>
            ${s.inputs.map(i=>`<input name="${i.name}" type="${i.type}" ${i.type!=="checkbox"?'style="width:6rem"':""} value="${i.value}" ${i.min?`min="${i.min}"`:""} ${i.max?`max="${i.max}"`:""} ${i.checked?"checked":""}>`).join(" - ")}
          </div>
        </div>`).join(""),d=a.map(s=>`<div class="list-row">
          <div class="list-row-entry setting-row-entry">
            <span class="setting-row-entry-label">${re(s)}</span>
            <input type="checkbox" id="q_${s}" name="${"activeQuestions"}" value="${s}" ${e["activeQuestions"].some(i=>s===i)?"checked":""}>
          </div>
        </div>`).join("");this.lobbySettingsDom.innerHTML=`<div class="list-row list-row-header">Filters</div>
    ${l}
    
    <div class="list-row list-row-header">Questions</div>
    ${d}`,this.settingsSubmitButton.removeAttribute("data-active")}submitSettings(){n.sendMsg("game.settings",{settings:{["questionCount"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"questionCount"}"]`).value),["activeQuestions"]:Array.from(this.lobbySettingsDom.querySelectorAll(`[name="${"activeQuestions"}"]:checked`)).map(e=>e.value),["mainRoleOnly"]:this.lobbySettingsDom.querySelector(`[name="${"mainRoleOnly"}"]`).checked,["minPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minPopularity"}"]`).value),["maxPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxPopularity"}"]`).value)}})}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}getPlayerEntryById(e){return this.playerlist.find(a=>a.playerId===e)}leaveLobby(){p.spawnScreen(new T).setActive("left"),this.die()}template(){return`
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
      <input type="submit" class="button button-outline" name="update-settings" form="lobby-settings" value="Save">
    </div>`}keydown(e){if(this.currentLobbyStatus!=="IN_GAME"||e.key!=="Tab"||(e.preventDefault(),e.stopPropagation(),e.repeat))return;this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let a=new Promise(o=>{this.scoreboardCloseCallback=o});g("Scoreboard",void 0,{actions:[],closeDialogPromise:a,alternativeContentDom:this.scoreboardDom})}keyup(e){e.key==="Tab"&&this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}die(){super.die(),n.off("game.status",this.statusListener),n.off("game.playerlist",this.playerlistListener),n.off("game.settings",this.gameSettingsListener),n.off("game.question",this.questionListener),n.off("game.question.active",this.questionActiveListener),n.off("game.question.answers",this.questionAnswersListener),n.off("me.game.left",this.selfLeftListener),this.questions.forEach(e=>{e.die()}),document.removeEventListener("keydown",this.keydown),document.removeEventListener("keyup",this.keyup)}};var T=class extends p{init(){this.domRef.querySelector("form[name=create]").addEventListener("submit",a=>L(this,null,function*(){a.preventDefault(),this.submitDisabled(!0),n.sendMsg("game.create")})),this.domRef.querySelector("form[name=join]").addEventListener("submit",a=>L(this,null,function*(){a.preventDefault(),document.activeElement.blur();let o=a.target["lobby-id"].value;this.submitDisabled(!0),n.sendMsg("game.join",{id:o})})),this.errListener=n.on("generic.error",({title:a})=>{console.log("called err"),g(a),this.submitDisabled(!1)});let e=p.spawnScreen(new W);this.joinedListener=n.once("game.status",({id:a,status:o})=>{n.off("generic.error",this.errListener),e.setActive()})}submitDisabled(e){this.domRef.querySelectorAll("input[type=submit]").forEach(a=>a.disabled=e)}die(){super.die(),n.off("generic.error",this.errListener),n.off("game.status",this.joinedListener)}template(){return`
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
    </section>`}};var Y=class extends p{init(){this.domRef.querySelector("form").addEventListener("submit",e=>L(this,null,function*(){e.preventDefault();let a=e.target.submit;a.disabled=!0;let o=e.target.username.value;n.isOpen()||(yield n.open()),n.sendMsg("me.change_name",{name:o}),p.spawnScreen(new T).setActive()}))}setActive(){super.setActive("none"),this.domRef.querySelector("input[name=username]").focus({preventScroll:!0})}template(){return`
    <h1 class="title-h1">otakuquiz.lol</h1>
    <div class="container">
      <div class="title-h2">Choose your username</div>
      <form class="combined-form" name="login">
        <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
        <input type="submit" class="button button-primary" name="submit" value="Connect!">
      </form>
    </div>`}die(){super.die(),n.off("generic.error",this.errListener)}};n.on("me",t=>{b.me.id=t.id,b.me.name=t.name});var na=p.spawnScreen(new Y);na.setActive();})();
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
