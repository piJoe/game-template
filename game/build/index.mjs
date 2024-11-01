var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// game/index.ts
import { WebSocketServer } from "ws";

// game/server/player.ts
import escapeHTML from "escape-html";

// game/logging.ts
import winston from "winston";
import "winston-daily-rotate-file";
var logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.metadata({
      fillExcept: ["timestamp", "level", "message"]
    }),
    winston.format.json({
      deterministic: false
    })
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      dirname: "/logs",
      filename: "log-%DATE%.log",
      datePattern: "YYYY-MM-DD"
    })
  ]
});

// game/utils/uid.ts
import { times } from "lodash-es";
function generateUniqueId(minLength = 4, { lookupMap = false, prefix = "" } = {}) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  let id = prefix + times(
    minLength,
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  ).join("");
  if (lookupMap) {
    while (lookupMap.has(id)) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
  return id;
}

// game/server/game.ts
var Game = class {
  constructor(session, settings) {
    this.status = 0 /* CREATED */;
    this.endGameNextTick = false;
    this.session = session;
    this.settings = settings;
    this.init();
  }
  init() {
    return __async(this, null, function* () {
      this.status = 1 /* INITIALIZING */;
      this.startGame();
    });
  }
  startGame() {
    return __async(this, null, function* () {
      this.status = 2 /* RUNNING */;
      this.session.resetPlayerLastActivity();
      this.gameLoop();
    });
  }
  endGame() {
    this.status = 3 /* FINISHED */;
    this.session.updateStatus("LOBBY" /* LOBBY */);
    this.session.gameEnded();
  }
  forceEnd() {
    this.endGameNextTick = true;
  }
  gameLoop() {
    return __async(this, null, function* () {
      if (this.endGameNextTick) {
        this.endGame();
        return;
      }
      this.session.kickInactivePlayers();
      this.gameLoop();
    });
  }
  handleGameInteraction(player, type, data) {
    switch (type) {
      case "example.game.interaction" /* EXAMPLE_GAME_INTERACITON */:
        break;
    }
  }
};

// game/server/session.ts
var allSessions = /* @__PURE__ */ new Map();
var GameSession = class {
  constructor() {
    this.id = generateUniqueId(4, { lookupMap: allSessions });
    this.playerStates = /* @__PURE__ */ new Map();
    this.status = "LOBBY" /* LOBBY */;
    this.settings = {
      ["randomSetting" /* RANDOM_SETTING */]: 0
    };
    allSessions.set(this.id, this);
    logger.info("Session created", {
      lobbyId: this.id
    });
  }
  playerJoin(player) {
    if (this.status === "LOBBY" /* LOBBY */) {
      this.playerStates.set(player.id, { player, ready: false });
      this.updateHost();
      this.sendGameStatus();
      this.sendPlayerlist();
      this.sendGameSettings(player);
      logger.info("Player joined", {
        lobbyId: this.id,
        playerId: player.id,
        playerName: player.name
      });
      return true;
    }
    return false;
  }
  playerLeave(player, reason) {
    logger.info("Player left", {
      reason,
      lobbyId: this.id,
      playerId: player.id,
      playerName: player.name
    });
    player.sendMsg("me.game.left" /* ME_LEFT_GAME */, {
      reason
    });
    this.playerStates.delete(player.id);
    this.updateHost();
    this.checkReadyStatus();
    this.sendPlayerlist();
    if (this.playerCount < 1) {
      this.destroy();
    }
  }
  playerReady(player, ready) {
    const playerState = this.playerStates.get(player.id);
    if (!playerState || this.status === "IN_GAME" /* IN_GAME */) {
      return;
    }
    playerState.ready = ready;
    this.sendPlayerlist();
    this.checkReadyStatus();
  }
  updateHost(player) {
    if (player) {
      this.sessionHost = player;
      return;
    }
    if (!this.sessionHost || !this.playerStates.has(this.sessionHost.id)) {
      const newHostState = this.playerStates.values().next().value;
      if (!newHostState) {
        this.sessionHost = void 0;
        return;
      }
      this.sessionHost = newHostState.player;
    }
  }
  tryChangeHost(player, newHostId) {
    if (this.sessionHost !== player) {
      player.sendMsg("generic.error" /* ERROR */, {
        title: "Only the current host can determine the new host."
      });
      return;
    }
    const newHostState = this.playerStates.get(newHostId);
    if (!newHostState) {
      player.sendMsg("generic.error" /* ERROR */, {
        title: `There is no Player with ID ${newHostId} in this Lobby.`
      });
      return;
    }
    this.updateHost(newHostState.player);
    this.sendPlayerlist();
  }
  checkReadyStatus() {
    if ([...this.playerStates.values()].some((s) => !s.ready) || this.playerStates.size < 1) {
      return;
    }
    if (this.game) {
      return;
    }
    this.updateStatus("IN_GAME" /* IN_GAME */);
    this.game = new Game(this, this.settings);
    logger.info("Game created", {
      lobbyId: this.id,
      players: this.playerList.map((e) => e.name)
    });
  }
  updateStatus(status) {
    this.status = status;
    this.sendGameStatus();
  }
  updateGameSettings(player, settings) {
    if (this.sessionHost !== player) {
      player.sendMsg("generic.error" /* ERROR */, {
        title: "Only the host can change settigns."
      });
      return;
    }
    if (this.status === "IN_GAME" /* IN_GAME */) {
      player.sendMsg("generic.error" /* ERROR */, {
        title: "Cannot change settings when in game."
      });
      return;
    }
    if (typeof settings["randomSetting" /* RANDOM_SETTING */] !== "number") {
      console.error("failed to validate settings");
      return;
    }
    this.settings["randomSetting" /* RANDOM_SETTING */] = settings["randomSetting" /* RANDOM_SETTING */];
    this.unreadyAllPlayers();
    this.sendGameSettings();
  }
  unreadyAllPlayers() {
    this.playerStates.forEach((s) => s.ready = false);
    this.sendPlayerlist();
  }
  gameEnded() {
    if (!this.game) {
      return;
    }
    this.game = null;
    this.playerStates.forEach((s) => s.ready = false);
    this.sendPlayerlist();
    logger.info("Game ended", {
      lobbyId: this.id
    });
  }
  kickInactivePlayers() {
    this.playerStates.forEach((pS) => {
      if (pS.player.isInactive) {
        pS.player.leaveSession("KICKED_INACTIVITY" /* KICKED_INACTIVITY */);
      }
    });
  }
  resetPlayerLastActivity() {
    this.playerStates.forEach((pS) => {
      pS.player.updateActivity();
    });
  }
  sendGameStatus() {
    this.sendMsg("game.status" /* GAME_STATUS */, {
      id: this.id,
      status: this.status
    });
  }
  sendPlayerlist() {
    var _a, _b;
    const playerlist = this.playerList;
    const count = this.playerCount;
    this.sendMsg("game.playerlist" /* GAME_PLAYERLIST */, {
      playerlist,
      count,
      host: (_b = (_a = this.sessionHost) == null ? void 0 : _a.id) != null ? _b : ""
    });
  }
  sendGameSettings(player) {
    const data = {
      currentSettings: this.settings
    };
    if (!player) {
      this.sendMsg("game.settings" /* GAME_SETTINGS */, data);
      return;
    }
    player.sendMsg("game.settings" /* GAME_SETTINGS */, data);
  }
  sendMsg(type, data) {
    const msg = JSON.stringify({ type, data });
    this.playerStates.forEach((pS) => {
      pS.player.socket.send(msg);
    });
  }
  get playerCount() {
    return this.playerStates.size;
  }
  get playerList() {
    return [...this.playerStates.values()].map((pS) => {
      return {
        playerId: pS.player.id,
        name: pS.player.name,
        ready: pS.ready
      };
    });
  }
  destroy() {
    logger.info("Session destroyed", {
      lobbyId: this.id
    });
    allSessions.delete(this.id);
    if (this.game) {
      this.game.endGame();
    }
  }
};
function getGameSessionById(gameId) {
  return allSessions.get(gameId.toUpperCase());
}

// game/server/player.ts
var PING_INTERVAL = 1e4;
var PING_TIMEOUT = PING_INTERVAL * 6;
var ACTIVITY_TIMEOUT = 18e4;
var allPlayers = /* @__PURE__ */ new Map();
var Player = class {
  constructor(socket, name = generateUniqueId(5)) {
    this.id = generateUniqueId(6, { lookupMap: allPlayers, prefix: "p_" });
    this.gameSession = null;
    this.socket = socket;
    this.name = name;
    this.socket.once("close", () => {
      this.disconnect();
    });
    allPlayers.set(this.id, this);
    this.sendSelf();
    this.updateActivity();
    this.pingInterval = setInterval(() => {
      if (this.lastPing <= Date.now() - PING_TIMEOUT) {
        logger.info("Player kicked", {
          reason: "inactivity",
          playerId: this.id,
          playerName: this.name
        });
        this.socket.close();
        this.disconnect();
        return;
      }
      this.socket.ping();
    }, PING_INTERVAL);
  }
  handleMessage(type, data) {
    var _a, _b;
    switch (type) {
      case "game.create" /* GAME_CREATE */:
        const game = new GameSession();
        this.joinSession(game.id);
        break;
      case "game.join" /* GAME_JOIN */:
        const { id } = data;
        this.joinSession(id);
        break;
      case "game.leave" /* GAME_LEAVE */:
        this.leaveSession();
        break;
      case "game.settings" /* GAME_SETTINGS */:
        const { settings } = data;
        this.gameSession.updateGameSettings(this, settings);
        break;
      case "game.change.host" /* GAME_CHANGE_HOST */:
        const { newHost } = data;
        this.gameSession.tryChangeHost(this, newHost);
        break;
      case "me.change_name" /* ME_CHANGE_NAME */:
        const { name } = data;
        this.updateName(escapeHTML(name));
        break;
      case "me.ready" /* ME_READY */:
        const { ready } = data;
        this.setReady(ready);
        break;
      case "example.game.interaction" /* EXAMPLE_GAME_INTERACITON */:
        (_b = (_a = this.gameSession) == null ? void 0 : _a.game) == null ? void 0 : _b.handleGameInteraction(this, type, data);
        break;
      default:
        throw Error("Not yet implemented" + type);
    }
    this.updateActivity();
  }
  sendSelf() {
    this.sendMsg("me" /* ME */, { id: this.id, name: this.name });
  }
  sendMsg(type, data) {
    this.socket.send(JSON.stringify({ type, data }));
  }
  sendError(title, msg) {
    this.sendMsg("generic.error" /* ERROR */, { title, msg });
  }
  joinSession(gameId) {
    this.leaveSession();
    const game = getGameSessionById(gameId);
    if (!game) {
      this.sendError(`No session exists with id "${gameId}"`);
      return;
    }
    if (!game.playerJoin(this)) {
      this.sendError(
        `You cannot join the game "${gameId}" right now, because it's already running.`
      );
      return;
    }
    this.gameSession = game;
  }
  leaveSession(reason = "SELF_LEAVE" /* SELF_LEAVE */) {
    if (!this.gameSession) {
      return;
    }
    this.gameSession.playerLeave(this, reason);
    this.gameSession = null;
  }
  updateName(name) {
    if (name.length < 3) {
      this.sendError(`Minlength is 3 chars.`);
      return;
    }
    this.name = name.slice(0, 16);
    this.sendSelf();
    if (this.gameSession)
      this.gameSession.sendPlayerlist();
  }
  setReady(ready) {
    if (!this.gameSession) {
      return;
    }
    this.gameSession.playerReady(this, ready);
  }
  get isInactive() {
    return this.lastActivity <= Date.now() - ACTIVITY_TIMEOUT;
  }
  updateActivity() {
    this.lastActivity = Date.now();
  }
  updateLastPing() {
    this.lastPing = Date.now();
  }
  disconnect() {
    if (this.socket) {
      this.socket.terminate();
    }
    this.destroy();
  }
  destroy() {
    this.leaveSession();
    allPlayers.delete(this.id);
    this.gameSession = null;
    clearInterval(this.pingInterval);
  }
};

// game/index.ts
var wss = new WebSocketServer({ port: 8081 });
wss.on("connection", (ws, req) => {
  const { headers } = req;
  const player = new Player(ws);
  ws.on("pong", () => {
    player.updateLastPing();
  });
  ws.on("message", (d) => {
    const { type, data } = JSON.parse(d.toString());
    player.handleMessage(type, data);
  });
});
