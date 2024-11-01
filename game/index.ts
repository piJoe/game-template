import { WebSocketServer } from "ws";
import { Player } from "./server/player";

const wss = new WebSocketServer({ port: 8081 });
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
