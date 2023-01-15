import {
  ClientPacketType,
  ServerPacketType,
} from "../../../common/types/packets";
import { SESSION_STATUS } from "../../../common/types/session";
import { showDialog } from "../overlay";
import { socket } from "../websocket";
import { LobbyScreen } from "./lobby";
import { DOMScreen } from "./screen";

export class JoinScreen extends DOMScreen {
  private errListener: number;
  private joinedListener: number;

  init() {
    this.domRef
      .querySelector("form[name=create]")
      .addEventListener("submit", async (e: SubmitEvent) => {
        e.preventDefault();
        this.submitDisabled(true);
        socket.sendMsg(ClientPacketType.GAME_CREATE);
      });

    this.domRef
      .querySelector("form[name=join]")
      .addEventListener("submit", async (e: SubmitEvent) => {
        e.preventDefault();
        (document.activeElement as HTMLElement).blur();
        const joinId = e.target["lobby-id"].value as string;
        this.submitDisabled(true);
        socket.sendMsg(ClientPacketType.GAME_JOIN, { id: joinId });
      });

    this.errListener = socket.on(ServerPacketType.ERROR, ({ title }) => {
      console.log("called err");
      showDialog(title);
      this.submitDisabled(false);
    });

    const lobby = DOMScreen.spawnScreen(new LobbyScreen());
    this.joinedListener = socket.once(
      ServerPacketType.GAME_STATUS,
      ({ id, status }) => {
        socket.off(ServerPacketType.ERROR, this.errListener);
        lobby.setActive();
      }
    );
  }

  private submitDisabled(d: boolean) {
    this.domRef
      .querySelectorAll("input[type=submit]")
      .forEach((i: HTMLInputElement) => (i.disabled = d));
  }

  die() {
    super.die();
    socket.off(ServerPacketType.ERROR, this.errListener);
    socket.off(ServerPacketType.GAME_STATUS, this.joinedListener);
  }

  template() {
    return `
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
    </section>`;
  }
}
