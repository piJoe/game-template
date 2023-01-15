import { WebSocketServer } from "ws";
import { getRandomAnimesWithCharacters } from "./db/animes";
import { getRandomCharacters } from "./db/characters";
import { Player } from "./ws/player";

// console.log(
//   ...(
//     await QuestionCharName.create(10, {
//       mainRoleOnly: true,
//       //   minPopularity: 20,
//       // maxPopularity: 20,
//     })
//   ).map((q) => QuestionCharName.render(0, q))
// );

/*
  TODO:
  - basic index.html, connect auf websocket
    - welcome screen "create lobby, join", alternative mit query-parameter (?join=$id)
    - input für username
    - lobby-screen: alle player sichtbar, ready state, settings
    - play-screen: currentQuestion anzeigen (card Frage + antworten, v2: template vom server übergeben?), timer anzeigen
    - result-screen: punkte pro spieler, sortiert => "BACK TO LOBBY" -> lobby zurücksetzen, lobby-screen zeigen
  - websocket-server
    x playername (cmd: username $name)
    x lobby/group mit id (cmd: connect $id), default random ==> "create"
    - group-settings (all available -> client, client update -> server) ==> jeder kann sie ändern?
      -> IMMER SYNC wenn settings ändern
    x "ready"-state per player
    - wenn alle ready sind wird quiz gestartet
    - send quiz questions: {questionId: number, question: '', answers: [...]}
    - answers lösen websocket-event aus -> 'chooseAnswer $questionID, $answer'
    - server replied mit correct answers nach timeout
    - punkte vergeben an player (richtige antwort: +1)
*/

/*
    GAME:
    - settings -> all available questions, settings per question, etc.
    - questions -> list of questions [question, answers, html]
    - currentQuestion -> index
*/

const wss = new WebSocketServer({ port: 8081 });
wss.on("connection", (ws, req) => {
  const { headers } = req;
  const player = new Player(ws);
  ws.on("ping", () => {
    ws.pong();
    player.updateActivity();
  });
  ws.on("message", (d) => {
    const { type, data } = JSON.parse(d.toString());
    player.handleMessage(type, data);
  });
});
