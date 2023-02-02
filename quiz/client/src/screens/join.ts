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
    // this.domRef
    //   .querySelector("form[name=create]")
    //   .addEventListener("submit", async (e: SubmitEvent) => {
    //     e.preventDefault();
    //     this.submitDisabled(true);
    //     socket.sendMsg(ClientPacketType.GAME_CREATE);
    //   });

    // this.domRef
    //   .querySelector("form[name=join]")
    //   .addEventListener("submit", async (e: SubmitEvent) => {
    //     e.preventDefault();
    //     (document.activeElement as HTMLElement).blur();
    //     const joinId = e.target["lobby-id"].value as string;
    //     this.submitDisabled(true);
    //     socket.sendMsg(ClientPacketType.GAME_JOIN, { id: joinId });
    //   });

    this.domRef.addEventListener("click", (e) => {
      e.preventDefault();

      const target = e.target as HTMLElement;
      const container = target.closest(".join-container");
      if (!container) {
        return;
      }

      const action = container.getAttribute("data-action");
      switch (action) {
        case "join":
          // show join game dialog
          this.showJoinDialog();
          break;
        case "create":
          socket.sendMsg(ClientPacketType.GAME_CREATE);
          break;
      }
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

  private showJoinDialog() {
    const joinDom = document.createElement("div");
    joinDom.innerHTML = `<input type="text" name="lobby-id" autocomplete="off" required minlength=4 placeholder="XXXX">`;

    showDialog("Join Game", "", {
      alternativeContentDom: joinDom,
      actions: [
        {
          value: "cancel",
          title: "Cancel",
          class: "button-outline",
        },
        {
          value: "join",
          title: "Join",
          class: "button-primary",
        },
      ],
      callback: (v) => {
        switch (v) {
          case "join":
            const { value: joinId } = joinDom.querySelector(
              '[name="lobby-id"]'
            ) as HTMLInputElement;

            socket.sendMsg(ClientPacketType.GAME_JOIN, { id: joinId });
            break;
        }
      },
    });
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
    </section>`;
  }
}
