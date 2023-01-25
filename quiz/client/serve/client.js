(()=>{var Fe=Object.create;var ee=Object.defineProperty;var Ke=Object.getOwnPropertyDescriptor;var ze=Object.getOwnPropertyNames;var Xe=Object.getPrototypeOf,Je=Object.prototype.hasOwnProperty;var Ze=(t,r)=>()=>(r||t((r={exports:{}}).exports,r),r.exports);var et=(t,r,e,a)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of ze(r))!Je.call(t,o)&&o!==e&&ee(t,o,{get:()=>r[o],enumerable:!(a=Ke(r,o))||a.enumerable});return t};var tt=(t,r,e)=>(e=t!=null?Fe(Xe(t)):{},et(r||!t||!t.__esModule?ee(e,"default",{value:t,enumerable:!0}):e,t));var L=(t,r,e)=>new Promise((a,o)=>{var l=s=>{try{d(e.next(s))}catch(n){o(n)}},u=s=>{try{d(e.throw(s))}catch(n){o(n)}},d=s=>s.done?a(s.value):Promise.resolve(s.value).then(l,u);d((e=e.apply(t,r)).next())});var oe=Ze((Ia,ae)=>{"use strict";var at=/["'&<>]/;ae.exports=ot;function ot(t){var r=""+t,e=at.exec(r);if(!e)return r;var a,o="",l=0,u=0;for(l=e.index;l<r.length;l++){switch(r.charCodeAt(l)){case 34:a="&quot;";break;case 38:a="&amp;";break;case 39:a="&#39;";break;case 60:a="&lt;";break;case 62:a="&gt;";break;default:continue}u!==l&&(o+=r.substring(u,l)),u=l+1,o+=a}return u!==l?o+r.substring(u,l):o}});var x={me:{id:"",name:""},settings:{volume:.5}};var M=document.querySelector(".overlay-container"),k=new Map,rt=0;M.addEventListener("click",t=>{let r=t.target;if(r.hasAttribute("data-popup-id")){let e=r.getAttribute("data-popup-id"),a=r.getAttribute("data-value");te(e,a)}});function te(t,r){var a;let e=k.get(t);e&&M.removeChild(e.dom),k.delete(t),(a=e.options)!=null&&a.callback&&e.options.callback(r),k.size<1&&M.setAttribute("data-active","false")}function E(t,r,e){let a=(rt++).toString(),o=document.createElement("div");o.classList.add("container","container-fadein");let l=[];e!=null&&e.actions?l.push(...e.actions.map(u=>`<input type="button" data-popup-id="${a}" data-value="${u.value}" class="button ${u.class}" value="${u.title}">`)):l.push(`<input type="button" data-popup-id="${a}" data-value="ok" class="button button-outline" value="OK">`),o.innerHTML=`
    <div class="title-h2">${t}</div>
    <div class="dialog-content">${r&&r.length>0?`${r}`:""}</div>
    <div class="dialog-actions">${l.join("")}</div>`,e!=null&&e.alternativeContentDom&&o.querySelector(".dialog-content").appendChild(e.alternativeContentDom),k.set(a,{dom:o,options:e}),M.setAttribute("data-active","true"),M.appendChild(o),e!=null&&e.closeDialogPromise&&e.closeDialogPromise.then(()=>{te(a)})}var F=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",r=>{let{type:e,data:a}=JSON.parse(r.data);this.handleMessage(e,a)}),this.ws.addEventListener("close",()=>{E("You were disconnected","The session was closed by the server.",{callback:()=>{location.reload()}})}),new Promise(r=>{this.ws.addEventListener("open",()=>{r()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(r,e){this.ws.send(JSON.stringify({type:r,data:e}))}on(r,e,a=!1){this.listener.has(r)||this.listener.set(r,[]);let o=this.listenerId++;return this.listener.get(r).push({callback:e,once:a,id:o}),o}once(r,e){return this.on(r,e,!0)}callListeners(r,e){let a=this.listener.get(r);a&&[...a].forEach((o,l)=>{o.callback(e),o.once&&a.splice(l,1)})}off(r,e){let a=this.listener.get(r);if(!a)return;let o=a.findIndex(l=>l.id===e);o>-1&&a.splice(o,1)}handleMessage(r,e){switch(r){case"me":this.callListeners("me",e);break;case"me.game.left":this.callListeners("me.game.left",e);break;case"game.status":this.callListeners("game.status",e);break;case"game.playerlist":this.callListeners("game.playerlist",e);break;case"game.settings":this.callListeners("game.settings",e);break;case"game.question":this.callListeners("game.question",e);break;case"game.question.active":this.callListeners("game.question.active",e);break;case"game.question.answers":this.callListeners("game.question.answers",e);break;case"generic.error":this.callListeners("generic.error",e);break;default:throw Error("Not yet implemented"+r)}}},i=new F;function re(t){switch(t){case"animeFromChar":return"Guess anime title by character";case"animeGenre":return"Guess the anime's genre";case"animeStudio":return"Guess the anime's studio";case"charByPicture":return"Guess character from picture";case"animeOpening":return"BETA: Guess anime from opening";default:throw Error("Id not recognized: "+t)}}var H=tt(oe(),1);var st=typeof global=="object"&&global&&global.Object===Object&&global,R=st;var it=typeof self=="object"&&self&&self.Object===Object&&self,nt=R||it||Function("return this")(),m=nt;var lt=m.Symbol,S=lt;var se=Object.prototype,ft=se.hasOwnProperty,ut=se.toString,w=S?S.toStringTag:void 0;function dt(t){var r=ft.call(t,w),e=t[w];try{t[w]=void 0;var a=!0}catch{}var o=ut.call(t);return a&&(r?t[w]=e:delete t[w]),o}var ie=dt;var mt=Object.prototype,pt=mt.toString;function ct(t){return pt.call(t)}var ne=ct;var bt="[object Null]",xt="[object Undefined]",le=S?S.toStringTag:void 0;function yt(t){return t==null?t===void 0?xt:bt:le&&le in Object(t)?ie(t):ne(t)}var g=yt;function vt(t){return t!=null&&typeof t=="object"}var T=vt;function gt(t,r){for(var e=-1,a=t==null?0:t.length,o=Array(a);++e<a;)o[e]=r(t[e],e,t);return o}var fe=gt;var ht=Array.isArray,ue=ht;function Et(t){var r=typeof t;return t!=null&&(r=="object"||r=="function")}var P=Et;var At="[object AsyncFunction]",St="[object Function]",Tt="[object GeneratorFunction]",It="[object Proxy]";function Lt(t){if(!P(t))return!1;var r=g(t);return r==St||r==Tt||r==At||r==It}var C=Lt;var Mt=m["__core-js_shared__"],G=Mt;var de=function(){var t=/[^.]+$/.exec(G&&G.keys&&G.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function wt(t){return!!de&&de in t}var me=wt;var _t=Function.prototype,Ot=_t.toString;function kt(t){if(t!=null){try{return Ot.call(t)}catch{}try{return t+""}catch{}}return""}var h=kt;var Nt=/[\\^$.*+?()[\]{}|]/g,Rt=/^\[object .+?Constructor\]$/,Pt=Function.prototype,Ct=Object.prototype,Gt=Pt.toString,qt=Ct.hasOwnProperty,Dt=RegExp("^"+Gt.call(qt).replace(Nt,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function jt(t){if(!P(t)||me(t))return!1;var r=C(t)?Dt:Rt;return r.test(h(t))}var pe=jt;function Ut(t,r){return t?.[r]}var ce=Ut;function Bt(t,r){var e=ce(t,r);return pe(e)?e:void 0}var v=Bt;var $t=v(m,"WeakMap"),q=$t;var Ht=9007199254740991,Qt=/^(?:0|[1-9]\d*)$/;function Wt(t,r){var e=typeof t;return r=r??Ht,!!r&&(e=="number"||e!="symbol"&&Qt.test(t))&&t>-1&&t%1==0&&t<r}var be=Wt;var Vt=9007199254740991;function Yt(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=Vt}var D=Yt;function Ft(t){return t!=null&&D(t.length)&&!C(t)}var xe=Ft;var Kt=Object.prototype;function zt(t){var r=t&&t.constructor,e=typeof r=="function"&&r.prototype||Kt;return t===e}var ye=zt;function Xt(t,r){for(var e=-1,a=Array(t);++e<t;)a[e]=r(e);return a}var ve=Xt;var Jt="[object Arguments]";function Zt(t){return T(t)&&g(t)==Jt}var K=Zt;var ge=Object.prototype,er=ge.hasOwnProperty,tr=ge.propertyIsEnumerable,rr=K(function(){return arguments}())?K:function(t){return T(t)&&er.call(t,"callee")&&!tr.call(t,"callee")},he=rr;function ar(){return!1}var Ee=ar;var Te=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ae=Te&&typeof module=="object"&&module&&!module.nodeType&&module,or=Ae&&Ae.exports===Te,Se=or?m.Buffer:void 0,sr=Se?Se.isBuffer:void 0,ir=sr||Ee,Ie=ir;var nr="[object Arguments]",lr="[object Array]",fr="[object Boolean]",ur="[object Date]",dr="[object Error]",mr="[object Function]",pr="[object Map]",cr="[object Number]",br="[object Object]",xr="[object RegExp]",yr="[object Set]",vr="[object String]",gr="[object WeakMap]",hr="[object ArrayBuffer]",Er="[object DataView]",Ar="[object Float32Array]",Sr="[object Float64Array]",Tr="[object Int8Array]",Ir="[object Int16Array]",Lr="[object Int32Array]",Mr="[object Uint8Array]",wr="[object Uint8ClampedArray]",_r="[object Uint16Array]",Or="[object Uint32Array]",f={};f[Ar]=f[Sr]=f[Tr]=f[Ir]=f[Lr]=f[Mr]=f[wr]=f[_r]=f[Or]=!0;f[nr]=f[lr]=f[hr]=f[fr]=f[Er]=f[ur]=f[dr]=f[mr]=f[pr]=f[cr]=f[br]=f[xr]=f[yr]=f[vr]=f[gr]=!1;function kr(t){return T(t)&&D(t.length)&&!!f[g(t)]}var Le=kr;function Nr(t){return function(r){return t(r)}}var Me=Nr;var we=typeof exports=="object"&&exports&&!exports.nodeType&&exports,_=we&&typeof module=="object"&&module&&!module.nodeType&&module,Rr=_&&_.exports===we,z=Rr&&R.process,Pr=function(){try{var t=_&&_.require&&_.require("util").types;return t||z&&z.binding&&z.binding("util")}catch{}}(),X=Pr;var _e=X&&X.isTypedArray,Cr=_e?Me(_e):Le,Oe=Cr;var Gr=Object.prototype,qr=Gr.hasOwnProperty;function Dr(t,r){var e=ue(t),a=!e&&he(t),o=!e&&!a&&Ie(t),l=!e&&!a&&!o&&Oe(t),u=e||a||o||l,d=u?ve(t.length,String):[],s=d.length;for(var n in t)(r||qr.call(t,n))&&!(u&&(n=="length"||o&&(n=="offset"||n=="parent")||l&&(n=="buffer"||n=="byteLength"||n=="byteOffset")||be(n,s)))&&d.push(n);return d}var ke=Dr;function jr(t,r){return function(e){return t(r(e))}}var Ne=jr;var Ur=Ne(Object.keys,Object),Re=Ur;var Br=Object.prototype,$r=Br.hasOwnProperty;function Hr(t){if(!ye(t))return Re(t);var r=[];for(var e in Object(t))$r.call(t,e)&&e!="constructor"&&r.push(e);return r}var Pe=Hr;function Qr(t){return xe(t)?ke(t):Pe(t)}var Ce=Qr;var Wr=v(m,"Map"),j=Wr;var Vr=v(m,"DataView"),U=Vr;var Yr=v(m,"Promise"),B=Yr;var Fr=v(m,"Set"),$=Fr;var Ge="[object Map]",Kr="[object Object]",qe="[object Promise]",De="[object Set]",je="[object WeakMap]",Ue="[object DataView]",zr=h(U),Xr=h(j),Jr=h(B),Zr=h($),ea=h(q),A=g;(U&&A(new U(new ArrayBuffer(1)))!=Ue||j&&A(new j)!=Ge||B&&A(B.resolve())!=qe||$&&A(new $)!=De||q&&A(new q)!=je)&&(A=function(t){var r=g(t),e=r==Kr?t.constructor:void 0,a=e?h(e):"";if(a)switch(a){case zr:return Ue;case Xr:return Ge;case Jr:return qe;case Zr:return De;case ea:return je}return r});var Be=A;function ta(t){var r=-1,e=Array(t.size);return t.forEach(function(a,o){e[++r]=[o,a]}),e}var $e=ta;function ra(t,r){return fe(r,function(e){return[e,t[e]]})}var He=ra;function aa(t){var r=-1,e=Array(t.size);return t.forEach(function(a){e[++r]=[a,a]}),e}var Qe=aa;var oa="[object Map]",sa="[object Set]";function ia(t){return function(r){var e=Be(r);return e==oa?$e(r):e==sa?Qe(r):He(r,t(r))}}var We=ia;var na=We(Ce),J=na;var O=null,p=class{constructor(){this.killWhenInactive=!0;this.additionalClasses=[]}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen",...this.additionalClasses),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(r="right"){O&&O.setInactive(r);let e="cur-none";switch(r){case"left":e="cur-left";break;case"right":e="cur"}this.domRef.setAttribute("data-screen-active",e),O=this}setInactive(r="right"){let e="prev-none";switch(r){case"left":e="prev-left";break;case"right":e="prev"}this.domRef.setAttribute("data-screen-active",e),this.killWhenInactive&&this.die()}die(){O===this&&(O=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(r){return r.setup(),r.render(),r.init(),r}};var Q=class extends p{constructor(e,a,o){super();this.questionId=null;this.ownAnwser=null;this.questionDone=!1;this.lobby=e,this.questionId=a,this.question=o}init(){if(this.domRef.addEventListener("click",e=>{let a=e.target;if(!a.hasAttribute("data-answer"))return;let o=a.getAttribute("data-answer");this.ownAnwser=parseInt(o),i.sendMsg("game.question.answer",{questionId:this.questionId,answer:this.ownAnwser}),this.domRef.querySelectorAll("[data-answer-selected=true]").forEach(l=>{l.removeAttribute("data-answer-selected")}),a.setAttribute("data-answer-selected","true")}),this.question.question.audioUrl){this.audio=new Audio(this.question.question.audioUrl),this.audio.preload="auto",this.audio.autoplay=!1,this.audio.volume=x.settings.volume;let e=this.domRef.querySelector("#audio-volume");e.addEventListener("input",a=>{let o=parseInt(e.value)/100;x.settings.volume=o,this.audio.volume=x.settings.volume})}this.timerDOM=this.domRef.querySelector(".question-timer")}setActive(){super.setActive(),this.timerStarted=Date.now(),this.audio&&this.audio.play(),window.requestAnimationFrame(()=>{this.updateTimer()})}updateTimer(){let e=this.question.timeoutMs-500,a=Math.ceil((this.timerStarted+e-Date.now())/1e3),o=Math.max(1-(Date.now()-this.timerStarted)/e,0);this.questionDone&&(o=0),this.timerDOM.style.transform=`scaleX(${o})`,(a>0||!this.questionDone)&&window.requestAnimationFrame(()=>{this.updateTimer()})}showAnswers(e,a){let{correct:o,wrong:l}=e,u=J(a);o.forEach(d=>{this.domRef.querySelector(`li[data-answer="${d}"]`).setAttribute("data-answer-correct","true")}),l.includes(this.ownAnwser)&&this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct","false"),this.question.question.image&&this.domRef.querySelector(".question-image").removeAttribute("data-blurred"),u.forEach(([d,s])=>{let n=this.lobby.getPlayerEntryById(d).name,b=this.domRef.querySelector(`li[data-answer="${s}"] > .answer-others-container`),y=document.createElement("div");y.classList.add("answer-others","skewed-tag"),y.innerHTML=`<span>${n}</span>`,b.appendChild(y)}),this.questionDone=!0}setInactive(e){super.setInactive(e),this.audio&&(this.audio.pause(),this.audio.remove())}template(){let e=this.question.question,a=this.question.answers,o=!!this.question.question.image,l=!!this.question.question.audioUrl;return`
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId+1}</div>
        ${o?`<div class="question-image-container">
            <img class="question-image" ${e.imageBlurred?"data-blurred=true":""} src="${(0,H.default)(e.image)}">
            </div>`:""}
        <div class="question-title title-h3">${(0,H.default)(e.title)}</div>
        ${l?`<div class="question-audio-slider"><input type="range" min="1" max="100" value="${x.settings.volume*100}" id="audio-volume"> </div>`:""}
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${a.map((u,d)=>`<li data-answer="${d}">
            ${(0,H.default)(u)}
            <div class="answer-others-container"></div>
          </li>`).join("")}
      </ul>
    </div>`}};var W=class extends p{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["lobby-screen"];this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[];this.questions=new Map}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let e=this.domRef.querySelector("#copy-lobby-id"),a=this.domRef.querySelector(".settings-container");this.lobbySettingsDom=a.querySelector(".lobby-settings");let o=this.domRef.querySelector("#lobby-back-button");document.addEventListener("keydown",this.keydown.bind(this)),document.addEventListener("keyup",this.keyup.bind(this));let l=this.domRef.querySelector(".lobby-playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=i.on("game.status",({id:s,status:n})=>{if(this.lobbyId=s,this.domRef.querySelector("#lobby-id").innerHTML=s,this.currentLobbyStatus&&this.currentLobbyStatus!==n)switch(n){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),E("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=n,this.updateReadyButton()}),this.playerlistListener=i.on("game.playerlist",({playerlist:s})=>{this.playerlist=s;let n=new Array(Math.max(6-this.playerlist.length,0)).fill(!0),b=[...this.playerlist].map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <span class="player-name">${c.name}</span>
                  ${c.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
                </div>
                <div class="list-row-entry player-row-more">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                  </svg>
                </div>
              </li>`).join(""),y=n.map(c=>`<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`).join("");l.innerHTML=b+y,this.scoreboardDom.innerHTML=[...this.playerlist].sort((c,Ye)=>Ye.score-c.score).map(c=>`<li class="playerlist-entry">
                ${c.name}
                <div class="skewed-tag ${c.playerId===x.me.id?"skewed-tag-primary":""} tag-score">${c.score}</div>
              </li>`).join("");let Ve=this.playerlist.filter(c=>c.ready).length;document.querySelector("#lobby-dd-ready").innerHTML=`${Ve}/${this.playerlist.length}`;let Y=s.find(c=>c.playerId===x.me.id);this.selfReady=Y==null?void 0:Y.ready,this.updateReadyButton()}),this.gameSettingsListener=i.on("game.settings",({currentSettings:s,availableQuestions:n})=>{this.renderSettings(s,n),document.querySelector("#lobby-dd-question-amount").innerHTML=`${s["questionCount"]}`}),this.questionListener=i.on("game.question",({id:s,question:n})=>{let b=p.spawnScreen(new Q(this,s,n));this.questions.set(s,b)}),this.questionActiveListener=i.on("game.question.active",({id:s})=>{this.questions.get(s).setActive()}),this.questionAnswersListener=i.on("game.question.answers",({id:s,answers:n,playerAnswers:b})=>{this.questions.get(s).showAnswers(n,b)}),this.selfLeftListener=i.on("me.game.left",({reason:s})=>{this.leaveLobby(),s==="KICKED_INACTIVITY"&&E("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",s=>{this.selfReady=!this.selfReady,i.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),e.addEventListener("click",s=>{s.preventDefault(),navigator.clipboard.writeText(this.lobbyId)});let u=this.domRef.querySelectorAll(".content-wrapper[data-tab]"),d=this.domRef.querySelector(".tab-menu");d.addEventListener("click",s=>{s.preventDefault();let n=s.target,b=n.getAttribute("data-target-tab");console.log(n,b),b&&(d.querySelector("[data-active=true]").removeAttribute("data-active"),n.setAttribute("data-active","true"),u.forEach(y=>{y.setAttribute("data-inactive","true"),y.getAttribute("data-tab")===b&&y.removeAttribute("data-inactive")}))}),o.addEventListener("click",s=>{s.preventDefault(),i.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",s=>{s.preventDefault(),i.sendMsg("game.settings",{settings:{["questionCount"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"questionCount"}"]`).value),["activeQuestions"]:Array.from(this.lobbySettingsDom.querySelectorAll(`[name="${"activeQuestions"}"]:checked`)).map(n=>n.value),["mainRoleOnly"]:this.lobbySettingsDom.querySelector(`[name="${"mainRoleOnly"}"]`).checked,["minPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minPopularity"}"]`).value),["maxPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxPopularity"}"]`).value)}})}),this.lobbySettingsDom.addEventListener("input",s=>{s.preventDefault(),this.lobbySettingsDom.querySelector(".button[name=update-settings]").setAttribute("data-active","true")})}renderSettings(e,a){this.lobbySettingsDom.innerHTML=`
    <div class="lobby-settings-wrapper">
      <div class="lobby-settings-column">
          <div class="game-setting-entry">
            <label class="game-setting-title">No. of Questions:</label> 
            <input type="number" name="${"questionCount"}" autocomplete="off" min=3 max=50 required value="${e["questionCount"]}">
          </div>

          <div class="game-setting-entry">
              <label class="game-setting-title">Popularity:</label> 

              <div class="game-setting-double">
                <input type="number" name="${"minPopularity"}" autocomplete="off" min=-1 max=10000 required value="${e["minPopularity"]}">
              -
                <input type="number" name="${"maxPopularity"}" autocomplete="off" min=-1 max=10000 required value="${e["maxPopularity"]}">
              </div>

              <label class="game-setting-list-option" for="gs_mainOnly">
                  <input type="checkbox" id="gs_mainOnly" name="${"mainRoleOnly"}" ${e["mainRoleOnly"]?"checked":""}> Main characters only
              </label>
            </div>
      </div>

      <div class="lobby-settings-column">
        <div class="game-setting-entry game-setting-list">
          <label class="game-setting-title">Questions:</label> 
          ${a.map(o=>`<label class="game-setting-list-option" for="q_${o}">
              <input type="checkbox" id="q_${o}" name="${"activeQuestions"}" value="${o}" ${e["activeQuestions"].some(l=>o===l)?"checked":""}>
              ${re(o)}
            </label>`).join("")}
        </div>
      </div>  
    </div>
    
    <div class="lobby-settings-actions">
      <input type="submit" class="button button-outline" name="update-settings" value="Save">
    </div>`}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}getPlayerEntryById(e){return this.playerlist.find(a=>a.playerId===e)}leaveLobby(){p.spawnScreen(new I).setActive("left"),this.die()}template(){return`
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
      <div class="container settings-container">
        <div class="title-h2">SETTINGS</div>
        <form class="lobby-settings"></form>
      </div>
    </section>

    <div class="bottom-container">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Leave">
      <input type="button" class="button button-primary" id="lobby-ready" value="Ready!" disabled=true>
    </div>`}keydown(e){if(this.currentLobbyStatus!=="IN_GAME"||e.key!=="Tab"||(e.preventDefault(),e.stopPropagation(),e.repeat))return;this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let a=new Promise(o=>{this.scoreboardCloseCallback=o});E("Scoreboard",void 0,{actions:[],closeDialogPromise:a,alternativeContentDom:this.scoreboardDom})}keyup(e){e.key==="Tab"&&this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}die(){super.die(),i.off("game.status",this.statusListener),i.off("game.playerlist",this.playerlistListener),i.off("game.settings",this.gameSettingsListener),i.off("game.question",this.questionListener),i.off("game.question.active",this.questionActiveListener),i.off("game.question.answers",this.questionAnswersListener),i.off("me.game.left",this.selfLeftListener),this.questions.forEach(e=>{e.die()}),document.removeEventListener("keydown",this.keydown),document.removeEventListener("keyup",this.keyup)}};var I=class extends p{init(){this.domRef.querySelector("form[name=create]").addEventListener("submit",a=>L(this,null,function*(){a.preventDefault(),this.submitDisabled(!0),i.sendMsg("game.create")})),this.domRef.querySelector("form[name=join]").addEventListener("submit",a=>L(this,null,function*(){a.preventDefault(),document.activeElement.blur();let o=a.target["lobby-id"].value;this.submitDisabled(!0),i.sendMsg("game.join",{id:o})})),this.errListener=i.on("generic.error",({title:a})=>{console.log("called err"),E(a),this.submitDisabled(!1)});let e=p.spawnScreen(new W);this.joinedListener=i.once("game.status",({id:a,status:o})=>{i.off("generic.error",this.errListener),e.setActive()})}submitDisabled(e){this.domRef.querySelectorAll("input[type=submit]").forEach(a=>a.disabled=e)}die(){super.die(),i.off("generic.error",this.errListener),i.off("game.status",this.joinedListener)}template(){return`
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
    </section>`}};var V=class extends p{init(){this.domRef.querySelector("form").addEventListener("submit",e=>L(this,null,function*(){e.preventDefault();let a=e.target.submit;a.disabled=!0;let o=e.target.username.value;i.isOpen()||(yield i.open()),i.sendMsg("me.change_name",{name:o}),p.spawnScreen(new I).setActive()}))}setActive(){super.setActive("none"),this.domRef.querySelector("input[name=username]").focus({preventScroll:!0})}template(){return`
    <h1 class="title-h1">otakuquiz.lol</h1>
    <div class="container">
      <div class="title-h2">Choose your username</div>
      <form class="combined-form" name="login">
        <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
        <input type="submit" class="button button-primary" name="submit" value="Connect!">
      </form>
    </div>`}die(){super.die(),i.off("generic.error",this.errListener)}};i.on("me",t=>{x.me.id=t.id,x.me.name=t.name});var la=p.spawnScreen(new V);la.setActive();})();
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
