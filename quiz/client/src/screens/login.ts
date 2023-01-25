import {
  ClientPacketType,
  ServerPacketType,
} from "../../../common/types/packets";
import { socket } from "../websocket";
import { JoinScreen } from "./join";
import { DOMScreen } from "./screen";

export class LoginScreen extends DOMScreen {
  private errListener: number;
  init() {
    this.domRef
      .querySelector("form")
      .addEventListener("submit", async (e: SubmitEvent) => {
        e.preventDefault();
        const submitButton = e.target["submit"] as HTMLButtonElement;
        submitButton.disabled = true;
        const name = e.target["username"].value as string;

        if (!socket.isOpen()) {
          await socket.open();
        }
        socket.sendMsg(ClientPacketType.ME_CHANGE_NAME, { name });
        DOMScreen.spawnScreen(new JoinScreen()).setActive();
      });

    // this.errListener = socket.on(ServerPacketType.ERROR, ({ title }) => {
    //   popup(title);
    //   (
    //     this.domRef.querySelector('input[type="submit"]') as HTMLInputElement
    //   ).disabled = false;
    // });
  }

  setActive(): void {
    super.setActive("none");
    (
      this.domRef.querySelector("input[name=username]") as HTMLInputElement
    ).focus({ preventScroll: true });
  }

  template() {
    return `
    <h1 class="title-h1">otakuquiz.lol</h1>
    <div class="container">
      <div class="title-h2">Choose your username</div>
      <form class="combined-form" name="login">
        <input type="text" name="username" autocomplete="off" minlength=3 maxlength=12 required placeholder="username">
        <input type="submit" class="button button-primary" name="submit" value="Connect!">
      </form>
    </div>`;
  }

  die() {
    super.die();
    socket.off(ServerPacketType.ERROR, this.errListener);
  }
}
