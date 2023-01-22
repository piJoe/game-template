(()=>{var He=Object.create;var J=Object.defineProperty;var We=Object.getOwnPropertyDescriptor;var Ve=Object.getOwnPropertyNames;var Ye=Object.getPrototypeOf,Fe=Object.prototype.hasOwnProperty;var Ke=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var ze=(e,r,t,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of Ve(r))!Fe.call(e,a)&&a!==t&&J(e,a,{get:()=>r[a],enumerable:!(o=We(r,a))||o.enumerable});return e};var Xe=(e,r,t)=>(t=e!=null?He(Ye(e)):{},ze(r||!e||!e.__esModule?J(t,"default",{value:e,enumerable:!0}):t,e));var T=(e,r,t)=>new Promise((o,a)=>{var n=f=>{try{s(t.next(f))}catch(l){a(l)}},m=f=>{try{s(t.throw(f))}catch(l){a(l)}},s=f=>f.done?o(f.value):Promise.resolve(f.value).then(n,m);s((t=t.apply(e,r)).next())});var re=Ke((So,te)=>{"use strict";var Ze=/["'&<>]/;te.exports=et;function et(e){var r=""+e,t=Ze.exec(r);if(!t)return r;var o,a="",n=0,m=0;for(n=t.index;n<r.length;n++){switch(r.charCodeAt(n)){case 34:o="&quot;";break;case 38:o="&amp;";break;case 39:o="&#39;";break;case 60:o="&lt;";break;case 62:o="&gt;";break;default:continue}m!==n&&(a+=r.substring(m,n)),m=n+1,a+=o}return m!==n?a+r.substring(m,n):a}});var h={me:{id:"",name:""}};var A=document.querySelector(".overlay-container"),w=new Map,Je=0;A.addEventListener("click",e=>{let r=e.target;if(r.hasAttribute("data-popup-id")){let t=r.getAttribute("data-popup-id"),o=r.getAttribute("data-value");Z(t,o)}});function Z(e,r){var o;let t=w.get(e);t&&A.removeChild(t.dom),w.delete(e),(o=t.options)!=null&&o.callback&&t.options.callback(r),w.size<1&&A.setAttribute("data-active","false")}function y(e,r,t){let o=(Je++).toString(),a=document.createElement("div");a.classList.add("container","container-fadein");let n=[];t!=null&&t.actions?n.push(...t.actions.map(m=>`<input type="button" data-popup-id="${o}" data-value="${m.value}" class="button ${m.class}" value="${m.title}">`)):n.push(`<input type="button" data-popup-id="${o}" data-value="ok" class="button button-outline" value="OK">`),a.innerHTML=`
    <div class="title-h2">${e}</div>
    <div class="dialog-content">${r&&r.length>0?`${r}`:""}</div>
    <div class="dialog-actions">${n.join("")}</div>`,t!=null&&t.alternativeContentDom&&a.querySelector(".dialog-content").appendChild(t.alternativeContentDom),w.set(o,{dom:a,options:t}),A.setAttribute("data-active","true"),A.appendChild(a),t!=null&&t.closeDialogPromise&&t.closeDialogPromise.then(()=>{Z(o)})}var V=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",r=>{let{type:t,data:o}=JSON.parse(r.data);this.handleMessage(t,o)}),this.ws.addEventListener("close",()=>{y("You were disconnected","The session was closed by the server.",{callback:()=>{location.reload()}})}),new Promise(r=>{this.ws.addEventListener("open",()=>{r()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(r,t){this.ws.send(JSON.stringify({type:r,data:t}))}on(r,t,o=!1){this.listener.has(r)||this.listener.set(r,[]);let a=this.listenerId++;return this.listener.get(r).push({callback:t,once:o,id:a}),a}once(r,t){return this.on(r,t,!0)}callListeners(r,t){let o=this.listener.get(r);o&&[...o].forEach((a,n)=>{a.callback(t),a.once&&o.splice(n,1)})}off(r,t){let o=this.listener.get(r);if(!o)return;let a=o.findIndex(n=>n.id===t);a>-1&&o.splice(a,1)}handleMessage(r,t){switch(r){case"me":this.callListeners("me",t);break;case"me.game.left":this.callListeners("me.game.left",t);break;case"game.status":this.callListeners("game.status",t);break;case"game.playerlist":this.callListeners("game.playerlist",t);break;case"game.settings":this.callListeners("game.settings",t);break;case"game.question":this.callListeners("game.question",t);break;case"game.question.active":this.callListeners("game.question.active",t);break;case"game.question.answers":this.callListeners("game.question.answers",t);break;case"generic.error":this.callListeners("generic.error",t);break;default:throw Error("Not yet implemented"+r)}}},i=new V;function ee(e){switch(e){case"animeFromChar":return"Guess anime title by character";case"animeGenre":return"Guess the anime's genre";case"animeStudio":return"Guess the anime's studio";case"charByPicture":return"Guess character from picture";default:throw Error("Id not recognized: "+e)}}var B=Xe(re(),1);var tt=typeof global=="object"&&global&&global.Object===Object&&global,O=tt;var rt=typeof self=="object"&&self&&self.Object===Object&&self,ot=O||rt||Function("return this")(),p=ot;var at=p.Symbol,v=at;var oe=Object.prototype,st=oe.hasOwnProperty,it=oe.toString,I=v?v.toStringTag:void 0;function nt(e){var r=st.call(e,I),t=e[I];try{e[I]=void 0;var o=!0}catch{}var a=it.call(e);return o&&(r?e[I]=t:delete e[I]),a}var ae=nt;var lt=Object.prototype,ft=lt.toString;function ut(e){return ft.call(e)}var se=ut;var mt="[object Null]",pt="[object Undefined]",ie=v?v.toStringTag:void 0;function dt(e){return e==null?e===void 0?pt:mt:ie&&ie in Object(e)?ae(e):se(e)}var b=dt;function ct(e){return e!=null&&typeof e=="object"}var E=ct;function bt(e,r){for(var t=-1,o=e==null?0:e.length,a=Array(o);++t<o;)a[t]=r(e[t],t,e);return a}var ne=bt;var xt=Array.isArray,le=xt;function yt(e){var r=typeof e;return e!=null&&(r=="object"||r=="function")}var C=yt;var gt="[object AsyncFunction]",ht="[object Function]",vt="[object GeneratorFunction]",Et="[object Proxy]";function St(e){if(!C(e))return!1;var r=b(e);return r==ht||r==vt||r==gt||r==Et}var N=St;var Tt=p["__core-js_shared__"],R=Tt;var fe=function(){var e=/[^.]+$/.exec(R&&R.keys&&R.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();function At(e){return!!fe&&fe in e}var ue=At;var It=Function.prototype,Lt=It.toString;function Mt(e){if(e!=null){try{return Lt.call(e)}catch{}try{return e+""}catch{}}return""}var x=Mt;var _t=/[\\^$.*+?()[\]{}|]/g,wt=/^\[object .+?Constructor\]$/,kt=Function.prototype,Ot=Object.prototype,Ct=kt.toString,Nt=Ot.hasOwnProperty,Rt=RegExp("^"+Ct.call(Nt).replace(_t,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function Pt(e){if(!C(e)||ue(e))return!1;var r=N(e)?Rt:wt;return r.test(x(e))}var me=Pt;function Gt(e,r){return e?.[r]}var pe=Gt;function Dt(e,r){var t=pe(e,r);return me(t)?t:void 0}var c=Dt;var jt=c(p,"WeakMap"),P=jt;var qt=9007199254740991,Ut=/^(?:0|[1-9]\d*)$/;function Bt(e,r){var t=typeof e;return r=r??qt,!!r&&(t=="number"||t!="symbol"&&Ut.test(e))&&e>-1&&e%1==0&&e<r}var de=Bt;var Qt=9007199254740991;function $t(e){return typeof e=="number"&&e>-1&&e%1==0&&e<=Qt}var G=$t;function Ht(e){return e!=null&&G(e.length)&&!N(e)}var ce=Ht;var Wt=Object.prototype;function Vt(e){var r=e&&e.constructor,t=typeof r=="function"&&r.prototype||Wt;return e===t}var be=Vt;function Yt(e,r){for(var t=-1,o=Array(e);++t<e;)o[t]=r(t);return o}var xe=Yt;var Ft="[object Arguments]";function Kt(e){return E(e)&&b(e)==Ft}var Y=Kt;var ye=Object.prototype,zt=ye.hasOwnProperty,Xt=ye.propertyIsEnumerable,Jt=Y(function(){return arguments}())?Y:function(e){return E(e)&&zt.call(e,"callee")&&!Xt.call(e,"callee")},ge=Jt;function Zt(){return!1}var he=Zt;var Se=typeof exports=="object"&&exports&&!exports.nodeType&&exports,ve=Se&&typeof module=="object"&&module&&!module.nodeType&&module,er=ve&&ve.exports===Se,Ee=er?p.Buffer:void 0,tr=Ee?Ee.isBuffer:void 0,rr=tr||he,Te=rr;var or="[object Arguments]",ar="[object Array]",sr="[object Boolean]",ir="[object Date]",nr="[object Error]",lr="[object Function]",fr="[object Map]",ur="[object Number]",mr="[object Object]",pr="[object RegExp]",dr="[object Set]",cr="[object String]",br="[object WeakMap]",xr="[object ArrayBuffer]",yr="[object DataView]",gr="[object Float32Array]",hr="[object Float64Array]",vr="[object Int8Array]",Er="[object Int16Array]",Sr="[object Int32Array]",Tr="[object Uint8Array]",Ar="[object Uint8ClampedArray]",Ir="[object Uint16Array]",Lr="[object Uint32Array]",u={};u[gr]=u[hr]=u[vr]=u[Er]=u[Sr]=u[Tr]=u[Ar]=u[Ir]=u[Lr]=!0;u[or]=u[ar]=u[xr]=u[sr]=u[yr]=u[ir]=u[nr]=u[lr]=u[fr]=u[ur]=u[mr]=u[pr]=u[dr]=u[cr]=u[br]=!1;function Mr(e){return E(e)&&G(e.length)&&!!u[b(e)]}var Ae=Mr;function _r(e){return function(r){return e(r)}}var Ie=_r;var Le=typeof exports=="object"&&exports&&!exports.nodeType&&exports,L=Le&&typeof module=="object"&&module&&!module.nodeType&&module,wr=L&&L.exports===Le,F=wr&&O.process,kr=function(){try{var e=L&&L.require&&L.require("util").types;return e||F&&F.binding&&F.binding("util")}catch{}}(),K=kr;var Me=K&&K.isTypedArray,Or=Me?Ie(Me):Ae,_e=Or;var Cr=Object.prototype,Nr=Cr.hasOwnProperty;function Rr(e,r){var t=le(e),o=!t&&ge(e),a=!t&&!o&&Te(e),n=!t&&!o&&!a&&_e(e),m=t||o||a||n,s=m?xe(e.length,String):[],f=s.length;for(var l in e)(r||Nr.call(e,l))&&!(m&&(l=="length"||a&&(l=="offset"||l=="parent")||n&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||de(l,f)))&&s.push(l);return s}var we=Rr;function Pr(e,r){return function(t){return e(r(t))}}var ke=Pr;var Gr=ke(Object.keys,Object),Oe=Gr;var Dr=Object.prototype,jr=Dr.hasOwnProperty;function qr(e){if(!be(e))return Oe(e);var r=[];for(var t in Object(e))jr.call(e,t)&&t!="constructor"&&r.push(t);return r}var Ce=qr;function Ur(e){return ce(e)?we(e):Ce(e)}var Ne=Ur;var Br=c(p,"Map"),D=Br;var Qr=c(p,"DataView"),j=Qr;var $r=c(p,"Promise"),q=$r;var Hr=c(p,"Set"),U=Hr;var Re="[object Map]",Wr="[object Object]",Pe="[object Promise]",Ge="[object Set]",De="[object WeakMap]",je="[object DataView]",Vr=x(j),Yr=x(D),Fr=x(q),Kr=x(U),zr=x(P),g=b;(j&&g(new j(new ArrayBuffer(1)))!=je||D&&g(new D)!=Re||q&&g(q.resolve())!=Pe||U&&g(new U)!=Ge||P&&g(new P)!=De)&&(g=function(e){var r=b(e),t=r==Wr?e.constructor:void 0,o=t?x(t):"";if(o)switch(o){case Vr:return je;case Yr:return Re;case Fr:return Pe;case Kr:return Ge;case zr:return De}return r});var qe=g;function Xr(e){var r=-1,t=Array(e.size);return e.forEach(function(o,a){t[++r]=[a,o]}),t}var Ue=Xr;function Jr(e,r){return ne(r,function(t){return[t,e[t]]})}var Be=Jr;function Zr(e){var r=-1,t=Array(e.size);return e.forEach(function(o){t[++r]=[o,o]}),t}var Qe=Zr;var eo="[object Map]",to="[object Set]";function ro(e){return function(r){var t=qe(r);return t==eo?Ue(r):t==to?Qe(r):Be(r,e(r))}}var $e=ro;var oo=$e(Ne),z=oo;var M=null,d=class{constructor(){this.killWhenInactive=!0}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen"),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(r="right"){M&&M.setInactive(r),this.domRef.setAttribute("data-screen-active",r=="right"?"cur":"cur-left"),M=this}setInactive(r="right"){this.domRef.setAttribute("data-screen-active",r=="right"?"prev":"prev-left"),this.killWhenInactive&&this.die()}die(){M===this&&(M=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(r){return r.setup(),r.render(),r.init(),r}};var Q=class extends d{constructor(t,o,a){super();this.questionId=null;this.ownAnwser=null;this.questionDone=!1;this.lobby=t,this.questionId=o,this.question=a}init(){this.domRef.addEventListener("click",t=>{let o=t.target;if(!o.hasAttribute("data-answer"))return;let a=o.getAttribute("data-answer");this.ownAnwser=parseInt(a),i.sendMsg("game.question.answer",{questionId:this.questionId,answer:this.ownAnwser}),this.domRef.querySelectorAll("[data-answer-selected=true]").forEach(n=>{n.removeAttribute("data-answer-selected")}),o.setAttribute("data-answer-selected","true")}),this.timerDOM=this.domRef.querySelector(".question-timer")}setActive(){super.setActive(),this.timerStarted=Date.now(),window.requestAnimationFrame(()=>{this.updateTimer()})}updateTimer(){let t=Math.ceil((this.timerStarted+this.question.timeoutMs-Date.now())/1e3),o=Math.max(1-(Date.now()-this.timerStarted)/this.question.timeoutMs,0);this.questionDone&&(o=0),this.timerDOM.style.transform=`scaleX(${o})`,(t>0||!this.questionDone)&&window.requestAnimationFrame(()=>{this.updateTimer()})}showAnswers(t,o){let{correct:a,wrong:n}=t,m=z(o);a.forEach(s=>{this.domRef.querySelector(`li[data-answer="${s}"]`).setAttribute("data-answer-correct","true")}),n.includes(this.ownAnwser)&&this.domRef.querySelector(`li[data-answer="${this.ownAnwser}"]`).setAttribute("data-answer-correct","false"),m.forEach(([s,f])=>{let l=this.lobby.getPlayerEntryById(s).name,_=this.domRef.querySelector(`li[data-answer="${f}"] > .answer-others-container`),W=document.createElement("div");W.classList.add("answer-others","skewed-tag"),W.innerHTML=`<span>${l}</span>`,_.appendChild(W)}),this.questionDone=!0}template(){let t=this.question.question,o=this.question.answers,a=!!this.question.question.image;return`
    <div><!-- empty div for spacing --></div>
    <div class="question-wrapper">
      <div class="container question-container">
      <div class="skewed-tag skewed-tag-big tag-question-number">${this.questionId+1}</div>
        ${a?`<img class="question-image" src="${(0,B.default)(t.image)}">`:""}
        <div class="question-title title-h3">${(0,B.default)(t.title)}</div>
        <div class="question-timer"></div>
      </div>
      <ul class="answers">
        ${o.map((n,m)=>`<li data-answer="${m}">
            ${(0,B.default)(n)}
            <div class="answer-others-container"></div>
          </li>`).join("")}
      </ul>
    </div>`}};var $=class extends d{constructor(){super();this.killWhenInactive=!1;this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[];this.questions=new Map}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let t=this.domRef.querySelector("#copy-lobby-id"),o=this.domRef.querySelector("#toggle-lobby-settings"),a=this.domRef.querySelector(".settings-container");this.lobbySettingsDom=a.querySelector(".lobby-settings");let n=this.domRef.querySelector("#lobby-back-button");document.addEventListener("keydown",this.keydown.bind(this)),document.addEventListener("keyup",this.keyup.bind(this));let m=this.domRef.querySelector(".playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=i.on("game.status",({id:s,status:f})=>{if(this.lobbyId=s,this.domRef.querySelector("#lobby-id").innerHTML=s,this.currentLobbyStatus&&this.currentLobbyStatus!==f)switch(f){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),y("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=f,this.updateReadyButton()}),this.playerlistListener=i.on("game.playerlist",({playerlist:s})=>{this.playerlist=s,m.innerHTML=[...this.playerlist].map(l=>`<li class="playerlist-entry">
                ${l.name} <!-- (${l.score}) -->
                ${l.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
              </li>`).join(""),this.scoreboardDom.innerHTML=[...this.playerlist].sort((l,_)=>_.score-l.score).map(l=>`<li class="playerlist-entry">
                ${l.name}
                <div class="skewed-tag ${l.playerId===h.me.id?"skewed-tag-primary":""} tag-score">${l.score}</div>
              </li>`).join("");let f=s.find(l=>l.playerId===h.me.id);this.selfReady=f==null?void 0:f.ready,this.updateReadyButton()}),this.gameSettingsListener=i.on("game.settings",({currentSettings:s,availableQuestions:f})=>{this.renderSettings(s,f)}),this.questionListener=i.on("game.question",({id:s,question:f})=>{let l=d.spawnScreen(new Q(this,s,f));this.questions.set(s,l)}),this.questionActiveListener=i.on("game.question.active",({id:s})=>{this.questions.get(s).setActive()}),this.questionAnswersListener=i.on("game.question.answers",({id:s,answers:f,playerAnswers:l})=>{this.questions.get(s).showAnswers(f,l)}),this.selfLeftListener=i.on("me.game.left",({reason:s})=>{this.leaveLobby(),s==="KICKED_INACTIVITY"&&y("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",s=>{this.selfReady=!this.selfReady,i.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),t.addEventListener("click",s=>{s.preventDefault(),navigator.clipboard.writeText(this.lobbyId)}),o.addEventListener("click",s=>{s.preventDefault(),a.classList.toggle("settings-container--visible")}),n.addEventListener("click",s=>{s.preventDefault(),i.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",s=>{s.preventDefault(),i.sendMsg("game.settings",{settings:{["questionCount"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"questionCount"}"]`).value),["activeQuestions"]:Array.from(this.lobbySettingsDom.querySelectorAll(`[name="${"activeQuestions"}"]:checked`)).map(f=>f.value),["mainRoleOnly"]:this.lobbySettingsDom.querySelector(`[name="${"mainRoleOnly"}"]`).checked,["minPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"minPopularity"}"]`).value),["maxPopularity"]:parseInt(this.lobbySettingsDom.querySelector(`[name="${"maxPopularity"}"]`).value)}})}),this.lobbySettingsDom.addEventListener("input",s=>{s.preventDefault(),this.lobbySettingsDom.querySelector(".button[name=update-settings]").setAttribute("data-active","true")})}renderSettings(t,o){this.lobbySettingsDom.innerHTML=`
    <div class="game-setting-entry">
      <label class="game-setting-title">No. of Questions:</label> 
      <input type="number" name="${"questionCount"}" autocomplete="off" min=3 max=50 required value="${t["questionCount"]}">
    </div>

    <div class="game-setting-entry">
      <label class="game-setting-title">Popularity:</label> 

      <div class="game-setting-double">
        <input type="number" name="${"minPopularity"}" autocomplete="off" min=-1 max=10000 required value="${t["minPopularity"]}">
      -
        <input type="number" name="${"maxPopularity"}" autocomplete="off" min=-1 max=10000 required value="${t["maxPopularity"]}">
      </div>

      <label class="game-setting-list-option" for="gs_mainOnly">
          <input type="checkbox" id="gs_mainOnly" name="${"mainRoleOnly"}" ${t["mainRoleOnly"]?"checked":""}> Main characters only
      </label>
    </div>

          

    <div class="game-setting-entry game-setting-list">
      <label class="game-setting-title">Questions:</label> 
      ${o.map(a=>`<label class="game-setting-list-option" for="q_${a}">
          <input type="checkbox" id="q_${a}" name="${"activeQuestions"}" value="${a}" ${t["activeQuestions"].some(n=>a===n)?"checked":""}>
          ${ee(a)}
        </label>`).join("")}
    </div>
    
    <input type="submit" class="button button-outline" name="update-settings" value="Save">`}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}getPlayerEntryById(t){return this.playerlist.find(o=>o.playerId===t)}leaveLobby(){d.spawnScreen(new S).setActive("left"),this.die()}template(){return`
    <h1 class="title-h1">LOBBY</h1>
    <section class="lobby-wrapper">
      <div class="multiple-container-wrapper">
        <div class="container settings-container">
          <div class="title-h2">SETTINGS</div>
          <form class="lobby-settings"></form>
        </div>

        <div class="container lobby-container">
          <div class="title-h3 lobby-title">
            Lobby Code: <br>
            <span class="title-h2">
            <span id="lobby-id">${this.lobbyId}</span>&nbsp;
              <a id="copy-lobby-id" title="Copy Lobby ID" class="button button-outline button-icon-inline" style="vertical-align: middle; margin-top: -8px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.9 12C3.9 10.29 5.29 8.9 7 8.9H11V7H7C5.67392 7 4.40215 7.52678 3.46447 8.46447C2.52678 9.40215 2 10.6739 2 12C2 13.3261 2.52678 14.5979 3.46447 15.5355C4.40215 16.4732 5.67392 17 7 17H11V15.1H7C5.29 15.1 3.9 13.71 3.9 12ZM8 13H16V11H8V13ZM17 7H13V8.9H17C18.71 8.9 20.1 10.29 20.1 12C20.1 13.71 18.71 15.1 17 15.1H13V17H17C18.3261 17 19.5979 16.4732 20.5355 15.5355C21.4732 14.5979 22 13.3261 22 12C22 10.6739 21.4732 9.40215 20.5355 8.46447C19.5979 7.52678 18.3261 7 17 7Z" fill="currentColor"/>
                </svg>
              </a>
            </span>
          </div>
          <ul class="playerlist"></ul>
        </div>
      </div>
      <div class="lobby-action">
        <a id="toggle-lobby-settings" class="button button-outline button-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.0001 15.5C11.0718 15.5 10.1816 15.1313 9.52521 14.4749C8.86883 13.8185 8.50008 12.9283 8.50008 12C8.50008 11.0717 8.86883 10.1815 9.52521 9.52513C10.1816 8.86875 11.0718 8.5 12.0001 8.5C12.9283 8.5 13.8186 8.86875 14.475 9.52513C15.1313 10.1815 15.5001 11.0717 15.5001 12C15.5001 12.9283 15.1313 13.8185 14.475 14.4749C13.8186 15.1313 12.9283 15.5 12.0001 15.5ZM19.4301 12.97C19.4701 12.65 19.5001 12.33 19.5001 12C19.5001 11.67 19.4701 11.34 19.4301 11L21.5401 9.37C21.7301 9.22 21.7801 8.95 21.6601 8.73L19.6601 5.27C19.5401 5.05 19.2701 4.96 19.0501 5.05L16.5601 6.05C16.0401 5.66 15.5001 5.32 14.8701 5.07L14.5001 2.42C14.4601 2.18 14.2501 2 14.0001 2H10.0001C9.75008 2 9.54008 2.18 9.50008 2.42L9.13008 5.07C8.50008 5.32 7.96008 5.66 7.44008 6.05L4.95008 5.05C4.73008 4.96 4.46008 5.05 4.34008 5.27L2.34008 8.73C2.21008 8.95 2.27008 9.22 2.46008 9.37L4.57008 11C4.53008 11.34 4.50008 11.67 4.50008 12C4.50008 12.33 4.53008 12.65 4.57008 12.97L2.46008 14.63C2.27008 14.78 2.21008 15.05 2.34008 15.27L4.34008 18.73C4.46008 18.95 4.73008 19.03 4.95008 18.95L7.44008 17.94C7.96008 18.34 8.50008 18.68 9.13008 18.93L9.50008 21.58C9.54008 21.82 9.75008 22 10.0001 22H14.0001C14.2501 22 14.4601 21.82 14.5001 21.58L14.8701 18.93C15.5001 18.67 16.0401 18.34 16.5601 17.94L19.0501 18.95C19.2701 19.03 19.5401 18.95 19.6601 18.73L21.6601 15.27C21.7801 15.05 21.7301 14.78 21.5401 14.63L19.4301 12.97Z" fill="currentColor"/>
          </svg>
        </a>
        <input type="button" class="button button-primary" id="lobby-ready" value="Ready!" disabled=true>
      </div>
    </section>
    <div class="bottom-container">
      <input type="button" id="lobby-back-button" class="button button-outline" value="Back">
    </div>`}keydown(t){if(this.currentLobbyStatus!=="IN_GAME"||t.key!=="Tab"||(t.preventDefault(),t.stopPropagation(),t.repeat))return;this.scoreboardCloseCallback&&(t.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let o=new Promise(a=>{this.scoreboardCloseCallback=a});y("Scoreboard",void 0,{actions:[],closeDialogPromise:o,alternativeContentDom:this.scoreboardDom})}keyup(t){t.key==="Tab"&&this.scoreboardCloseCallback&&(t.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}die(){super.die(),i.off("game.status",this.statusListener),i.off("game.playerlist",this.playerlistListener),i.off("game.settings",this.gameSettingsListener),i.off("game.question",this.questionListener),i.off("game.question.active",this.questionActiveListener),i.off("game.question.answers",this.questionAnswersListener),i.off("me.game.left",this.selfLeftListener),this.questions.forEach(t=>{t.die()}),document.removeEventListener("keydown",this.keydown),document.removeEventListener("keyup",this.keyup)}};var S=class extends d{init(){this.domRef.querySelector("form[name=create]").addEventListener("submit",o=>T(this,null,function*(){o.preventDefault(),this.submitDisabled(!0),i.sendMsg("game.create")})),this.domRef.querySelector("form[name=join]").addEventListener("submit",o=>T(this,null,function*(){o.preventDefault(),document.activeElement.blur();let a=o.target["lobby-id"].value;this.submitDisabled(!0),i.sendMsg("game.join",{id:a})})),this.errListener=i.on("generic.error",({title:o})=>{console.log("called err"),y(o),this.submitDisabled(!1)});let t=d.spawnScreen(new $);this.joinedListener=i.once("game.status",({id:o,status:a})=>{i.off("generic.error",this.errListener),t.setActive()})}submitDisabled(t){this.domRef.querySelectorAll("input[type=submit]").forEach(o=>o.disabled=t)}die(){super.die(),i.off("generic.error",this.errListener),i.off("game.status",this.joinedListener)}template(){return`
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
    </section>`}};var H=class extends d{init(){this.domRef.querySelector("form").addEventListener("submit",t=>T(this,null,function*(){t.preventDefault();let o=t.target.submit;o.disabled=!0;let a=t.target.username.value;i.isOpen()||(yield i.open()),i.sendMsg("me.change_name",{name:a}),d.spawnScreen(new S).setActive()}))}setActive(){super.setActive(),this.domRef.querySelector("input[name=username]").focus({preventScroll:!0})}template(){return`
    <h1 class="title-h1">Login</h1>
    <div class="container">
      <div class="title-h2">Choose your username</div>
      <form class="combined-form" name="login">
        <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
        <input type="submit" class="button button-primary" name="submit" value="Connect!">
      </form>
    </div>`}die(){super.die(),i.off("generic.error",this.errListener)}};i.on("me",e=>{h.me.id=e.id,h.me.name=e.name});var ao=d.spawnScreen(new H);ao.setActive();})();
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
