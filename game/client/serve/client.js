(()=>{var w=(o,i,e)=>new Promise((t,s)=>{var n=l=>{try{a(e.next(l))}catch(u){s(u)}},p=l=>{try{a(e.throw(l))}catch(u){s(u)}},a=l=>l.done?t(l.value):Promise.resolve(l.value).then(n,p);a((e=e.apply(o,i)).next())});var y={me:{id:"",name:""}};var E=document.querySelector(".overlay-container"),L=new Map,R=0;E.addEventListener("click",o=>{let i=o.target;if(i.hasAttribute("data-popup-id")){let e=i.getAttribute("data-popup-id"),t=i.getAttribute("data-value");I(e,t)}});function I(o,i){var t;let e=L.get(o);e&&E.removeChild(e.dom),L.delete(o),(t=e.options)!=null&&t.callback&&e.options.callback(i),L.size<1&&E.setAttribute("data-active","false")}function d(o,i,e){let t=(R++).toString(),s=document.createElement("div");s.classList.add("container","container-fadein");let n=[];e!=null&&e.actions?n.push(...e.actions.map(a=>`<input type="button" data-popup-id="${t}" data-value="${a.value}" class="button ${a.class}" value="${a.title}">`)):n.push(`<input type="button" data-popup-id="${t}" data-value="ok" class="button button-outline" value="OK">`),s.innerHTML=`
    <div class="title-h2">${o}</div>
    <div class="dialog-content">${i&&i.length>0?`${i}`:""}</div>
    <div class="dialog-actions">${n.join("")}</div>`,e!=null&&e.alternativeContentDom&&s.querySelector(".dialog-content").appendChild(e.alternativeContentDom),L.set(t,{dom:s,options:e}),E.setAttribute("data-active","true"),E.appendChild(s);let p=s.querySelector("input[type=text]");p&&p.focus({preventScroll:!0}),e!=null&&e.closeDialogPromise&&e.closeDialogPromise.then(()=>{I(t)})}var M=class{constructor(){this.ws=null;this.listener=new Map;this.listenerId=0}open(){if(this.ws)throw new Error("Socket is already open??");return this.ws=new WebSocket(`${location.protocol==="http:"?"ws:":"wss:"}//${location.host}/`),this.ws.addEventListener("message",i=>{let{type:e,data:t}=JSON.parse(i.data);this.handleMessage(e,t)}),this.ws.addEventListener("close",()=>{d("You were disconnected","The session was closed by the server.",{callback:()=>{window.onbeforeunload=null,location.reload()}})}),new Promise(i=>{this.ws.addEventListener("open",()=>{i()},{once:!0})})}isOpen(){return this.ws!==null}sendMsg(i,e){this.ws.send(JSON.stringify({type:i,data:e}))}on(i,e,t=!1){this.listener.has(i)||this.listener.set(i,[]);let s=this.listenerId++;return this.listener.get(i).push({callback:e,once:t,id:s}),s}once(i,e){return this.on(i,e,!0)}callListeners(i,e){let t=this.listener.get(i);t&&[...t].forEach((s,n)=>{s.callback(e),s.once&&t.splice(n,1)})}off(i,e){let t=this.listener.get(i);if(!t)return;let s=t.findIndex(n=>n.id===e);s>-1&&t.splice(s,1)}handleMessage(i,e){switch(i){case"me":this.callListeners("me",e);break;case"me.game.left":this.callListeners("me.game.left",e);break;case"game.status":this.callListeners("game.status",e);break;case"game.playerlist":this.callListeners("game.playerlist",e);break;case"game.settings":this.callListeners("game.settings",e);break;case"generic.error":this.callListeners("generic.error",e);break;default:throw Error("Not yet implemented"+i)}}},r=new M;var f=null,S=[],c=class{constructor(){this.killWhenInactive=!0;this.additionalClasses=[];this.globalDropdownOptions=null}setup(){this.domRef=document.createElement("div"),this.domRef.classList.add("screen",...this.additionalClasses),this.domRef.setAttribute("data-screen-active","next")}render(){this.domRef.innerHTML=this.template(),document.body.querySelector(".screen-container").appendChild(this.domRef)}template(){return""}setActive(i="right",e){let t="cur-none";switch(i){case"left":t="cur-left";break;case"right":t="cur";break;case"fade":t="cur-fade";break}if(c.pushScreenStack(this),document.dispatchEvent(new CustomEvent("screenChanged")),e){this.domRef.setAttribute("data-screen-active",t),this.domRef.setAttribute("data-screen-overlay","true");return}f&&f.setInactive(i),this.domRef.setAttribute("data-screen-active",t),f=this}setInactive(i="right"){let e="prev-none";switch(i){case"left":e="prev-left";break;case"right":e="prev";break;case"fade":e="prev-fade";break}this.domRef.setAttribute("data-screen-active",e),this.killWhenInactive&&this.die(),c.popScreenStack(this),document.dispatchEvent(new CustomEvent("screenChanged"))}die(){f===this&&(f=null),window.setTimeout(()=>{this.domRef.remove()},1e3)}static spawnScreen(i){return i.setup(),i.render(),i.init(),i}static pushScreenStack(i){c.popScreenStack(i),S.push(i)}static popScreenStack(i){S.includes(i)&&S.splice(S.indexOf(i),1)}static getCurrentScreen(){return S.at(-1)}};var A=class extends c{constructor(){super();this.killWhenInactive=!1;this.additionalClasses=["gradient-bg-screen"];this.currentLobbyStatus=null;this.lobbyId="";this.selfReady=!1;this.playerlist=[]}init(){this.readyButton=this.domRef.querySelector("#lobby-ready");let e=this.domRef.querySelector("#copy-lobby-id");this.lobbySettingsDom=this.domRef.querySelector(".lobby-settings");let t=this.domRef.querySelector("#lobby-back-button");this.keyDownListener=this.keydown.bind(this),this.keyUpListener=this.keyup.bind(this),document.addEventListener("keydown",this.keyDownListener),document.addEventListener("keyup",this.keyUpListener);let s=this.domRef.querySelector(".lobby-playerlist");this.scoreboardDom=document.createElement("div"),this.scoreboardDom.classList.add("playerlist","playerlist-scoreboard"),this.statusListener=r.on("game.status",({id:a,status:l})=>{if(this.lobbyId=a,this.domRef.querySelector("#lobby-id").innerHTML=a,this.currentLobbyStatus&&this.currentLobbyStatus!==l)switch(l){case"IN_GAME":break;case"LOBBY":this.scoreboardCloseCallback&&(this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null),d("Final Scoreboard",void 0,{actions:[{title:"Back to Lobby",value:"back",class:"button-outline"}],alternativeContentDom:this.scoreboardDom,callback:()=>{this.setActive()}});break}this.currentLobbyStatus=l,this.updateReadyButton()}),this.playerlistListener=r.on("game.playerlist",({playerlist:a,host:l})=>{this.playerlist=a,this.lobbyHost=this.playerlist.find(m=>m.playerId===l);let u=new Array(Math.max(6-this.playerlist.length,0)).fill(!0),b=[...this.playerlist].map(m=>`<li class="list-row">
                <div class="list-row-entry player-row-entry">
                  <div class="player-name">
                    <span>${m.name}</span>
                    <div class="player-icons">
                      ${m===this.lobbyHost?'<svg class="player-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><title>Lobby Host</title><path d="M12 1L21 5V11C21 16.55 17.16 21.74 12 23C6.84 21.74 3 16.55 3 11V5L12 1M16 14H8V15.5C8 15.77 8.19 15.96 8.47 16L8.57 16H15.43C15.74 16 15.95 15.84 16 15.59L16 15.5V14M17 8L17 8L14.33 10.67L12 8.34L9.67 10.67L7 8L7 8L8 13H16L17 8Z" /></svg>':""}
                    </div>
                  </div>
                  ${m.ready?'<div class="skewed-tag skewed-tag-primary tag-ready">Ready</div>':'<div class="skewed-tag skewed-tag-error tag-ready">Not Ready</div>'}
                </div>
                <div class="list-row-entry player-row-more">
                  <div 
                    class="player-more-button" 
                    title="Show options"
                    data-player-id="${m.playerId}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                    </svg>
                  </div>
                </div>
              </li>`).join(""),g=u.map(m=>`<li class="list-row">
                <div class="list-row-entry player-row-entry player-row-entry-empty">
                  <span class="player-name">Empty</span>
                </div>
                <div class="list-row-entry player-row-more"></div>
              </li>`).join("");s.innerHTML=b+g;let v=a.find(m=>m.playerId===y.me.id);this.selfReady=v==null?void 0:v.ready,this.updateReadyButton(),this.updateSaveSettingsButton()}),this.gameSettingsListener=r.on("game.settings",({currentSettings:a})=>{this.currentSettings=a,this.renderSettings(a)}),this.selfLeftListener=r.on("me.game.left",({reason:a})=>{this.leaveLobby(),a==="KICKED_INACTIVITY"&&d("You were kicked","You were kicked from the game due to inactivity.")}),this.readyButton.addEventListener("click",a=>{this.selfReady=!this.selfReady,r.sendMsg("me.ready",{ready:this.selfReady}),this.updateReadyButton()}),e.addEventListener("click",a=>{a.preventDefault(),navigator.clipboard.writeText(location.href)});let n=this.domRef.querySelectorAll("[data-tab]"),p=this.domRef.querySelector(".tab-menu");p.addEventListener("click",a=>{a.preventDefault();let l=a.target,u=l.getAttribute("data-target-tab");u&&(p.querySelector("[data-active=true]").removeAttribute("data-active"),l.setAttribute("data-active","true"),n.forEach(b=>{b.setAttribute("data-inactive","true"),b.getAttribute("data-tab")===u&&b.removeAttribute("data-inactive")}))}),t.addEventListener("click",a=>{a.preventDefault(),r.sendMsg("game.leave")}),this.lobbySettingsDom.addEventListener("submit",a=>{a.preventDefault(),this.submitSettings()}),this.settingsSubmitButton=this.domRef.querySelector(".button[name=update-settings]"),this.lobbySettingsDom.addEventListener("input",a=>{if(a.preventDefault(),!this.selfIsHost()){this.lobbySettingsDom.reset();return}this.settingsSubmitButton.setAttribute("data-active","true")}),s.addEventListener("click",a=>{a.preventDefault();let u=a.target.closest(".player-more-button");if(!u)return;let b=u.getAttribute("data-player-id"),g=this.playerlist.find(v=>v.playerId===b);if(!g){console.error("something went terribly wrong, idk how!");return}if(this.lobbyHost.playerId!==y.me.id){d("You're not the host.","Only the host can interact with this.");return}d(g.name,"",{actions:[{title:"Cancel",class:"button-outline",value:"cancel"},{title:"Kick",class:"button-error",value:"kick"},{title:"Make Host",class:"button-primary",value:"makehost"}],callback:v=>{switch(v){case"kick":d("Work in Progress","kekw");break;case"makehost":r.sendMsg("game.change.host",{newHost:g.playerId});break}}})})}renderSettings(e){}submitSettings(){r.sendMsg("game.settings",{settings:{["randomSetting"]:0}})}updateReadyButton(){this.readyButton.value=this.currentLobbyStatus==="IN_GAME"?"GAME STARTING":this.selfReady?"NOT Ready":"READY",this.readyButton.setAttribute("data-active",this.selfReady+""),this.readyButton.disabled=this.currentLobbyStatus==="IN_GAME"}updateSaveSettingsButton(){let e=this.domRef.querySelector("#update-settings-button");this.selfIsHost()?(e.value="Save",e.disabled=!1):(e.value="Only host can save",e.disabled=!0)}getPlayerEntryById(e){return this.playerlist.find(t=>t.playerId===e)}leaveLobby(){c.spawnScreen(new h).setActive("left"),this.die()}selfIsHost(){return this.lobbyHost&&this.lobbyHost.playerId===y.me.id}getSetting(e){var t,s;return(s=(t=this.currentSettings)==null?void 0:t[e])!=null?s:null}template(){return`
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
    </div>`}keydown(e){if(this.currentLobbyStatus!=="IN_GAME"||e.key!=="Tab"||(e.preventDefault(),e.stopPropagation(),e.repeat))return;this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null);let t=new Promise(s=>{this.scoreboardCloseCallback=s});d("Scoreboard",void 0,{actions:[],closeDialogPromise:t,alternativeContentDom:this.scoreboardDom})}keyup(e){e.key==="Tab"&&this.scoreboardCloseCallback&&(e.preventDefault(),this.scoreboardCloseCallback(),this.scoreboardCloseCallback=null)}setActive(e,t){super.setActive(e,t),location.hash="#/"+this.lobbyId}setInactive(e){super.setInactive(e),location.hash=""}die(){super.die(),r.off("game.status",this.statusListener),r.off("game.playerlist",this.playerlistListener),r.off("game.settings",this.gameSettingsListener),r.off("me.game.left",this.selfLeftListener),document.removeEventListener("keydown",this.keyDownListener),document.removeEventListener("keyup",this.keyUpListener)}};var h=class extends c{init(){this.domRef.addEventListener("click",t=>{t.preventDefault();let n=t.target.closest(".join-container");if(!n)return;switch(n.getAttribute("data-action")){case"join":this.showJoinDialog();break;case"create":r.sendMsg("game.create");break}}),this.errListener=r.on("generic.error",({title:t})=>{console.log("called err"),d(t),this.submitDisabled(!1)});let e=c.spawnScreen(new A);this.joinedListener=r.once("game.status",({id:t,status:s})=>{r.off("generic.error",this.errListener),e.setActive()})}setActive(e,t){super.setActive(e,t);let s=location.hash.split("/");if(s.length>1){let n=s[1];r.sendMsg("game.join",{id:n})}}showJoinDialog(){let e=document.createElement("div");e.innerHTML='<input type="text" name="lobby-id" autocomplete="off" required minlength=4 placeholder="XXXX">',d("Join Game","",{alternativeContentDom:e,actions:[{value:"cancel",title:"Cancel",class:"button-outline"},{value:"join",title:"Join",class:"button-primary"}],callback:t=>{switch(t){case"join":let{value:s}=e.querySelector('[name="lobby-id"]');r.sendMsg("game.join",{id:s});break}}})}submitDisabled(e){this.domRef.querySelectorAll("input[type=submit]").forEach(t=>t.disabled=e)}die(){super.die(),r.off("generic.error",this.errListener),r.off("game.status",this.joinedListener)}template(){return`
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
    </section>`}};var T=class extends c{constructor(){super(...arguments);this.additionalClasses=["gradient-bg-screen"]}init(){this.inputDom=this.domRef.querySelector("input[name=username]"),this.domRef.querySelector("form").addEventListener("submit",t=>w(this,null,function*(){t.preventDefault();let s=t.target.submit;s.disabled=!0;let n=t.target.username.value;r.isOpen()||(yield r.open()),r.sendMsg("me.change_name",{name:n}),c.spawnScreen(new h).setActive();try{localStorage.setItem("username",n)}catch(p){}}));let e=localStorage.getItem("username");e&&(this.inputDom.value=e)}setActive(){super.setActive("none"),this.inputDom.focus({preventScroll:!0}),this.inputDom.select()}template(){return`
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
    </div>`}die(){super.die(),r.off("generic.error",this.errListener)}};window.onbeforeunload=function(o){return o.preventDefault(),"are you sure?"};r.on("me",o=>{y.me.id=o.id,y.me.name=o.name});var G=c.spawnScreen(new T);G.setActive();})();
