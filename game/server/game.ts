import { GameSettings, GAME_STATUS } from "../common/types/game";
import {
  ClientPacketKey,
  ClientPackets,
  ClientPacketType,
} from "../common/types/packets";
import { SESSION_STATUS } from "../common/types/session";
import { Player } from "./player";
import { GameSession } from "./session";

export class Game {
  public status: GAME_STATUS = GAME_STATUS.CREATED;
  private settings: GameSettings;
  private session: GameSession;
  private endGameNextTick = false;

  constructor(session: GameSession, settings: GameSettings) {
    this.session = session;
    this.settings = settings;
    this.init();
  }

  async init() {
    this.status = GAME_STATUS.INITIALIZING;

    // do initializing stuff for this game instance here according to your settings or whatever

    this.startGame();
  }

  async startGame() {
    this.status = GAME_STATUS.RUNNING;

    // start game logic goes here
    // some stuff already existing: resetting player timeout (lastactivity)
    this.session.resetPlayerLastActivity();

    // finally start the main game loop
    this.gameLoop();
  }

  endGame() {
    // do any end game cleanup logic, send player back to lobby, etc.
    this.status = GAME_STATUS.FINISHED;

    // finally tell the session this game has ended
    this.session.updateStatus(SESSION_STATUS.LOBBY);
    this.session.gameEnded();
  }

  forceEnd() {
    this.endGameNextTick = true;
  }

  async gameLoop() {
    if (this.endGameNextTick) {
      this.endGame();
      return;
    }

    //check if we need to kick inactive players, maybe your don't want this -> comment it out
    this.session.kickInactivePlayers();

    // do your main game loop logic here, send packages to client according to your state, process inputs, etc.

    this.gameLoop();
  }

  handleGameInteraction<T extends ClientPacketKey>(
    player: Player,
    type: T,
    data: ClientPackets[T]
  ) {
    switch (type) {
      case ClientPacketType.EXAMPLE_GAME_INTERACITON:
        // do something
        break;
    }
  }
}
