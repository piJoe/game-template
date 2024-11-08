import {
  ClientPacketType,
  ServerPacketType,
} from "../../../common/types/packets";
import { socket } from "../websocket";
import { JoinScreen } from "./join";
import { DOMScreen } from "./screen";

export class LoginScreen extends DOMScreen {
  private errListener: number;
  private inputDom: HTMLInputElement;
  protected additionalClasses = ["gradient-bg-screen"];

  init() {
    this.inputDom = this.domRef.querySelector("input[name=username]");

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

        try {
          localStorage.setItem("username", name);
        } catch (_) {}
      });

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      this.inputDom.value = storedUsername;
    }

    // this.errListener = socket.on(ServerPacketType.ERROR, ({ title }) => {
    //   popup(title);
    //   (
    //     this.domRef.querySelector('input[type="submit"]') as HTMLInputElement
    //   ).disabled = false;
    // });
  }

  setActive(): void {
    super.setActive("none");
    this.inputDom.focus({ preventScroll: true });
    this.inputDom.select();
  }

  template() {
    return `
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
    </div>`;
  }

  die() {
    super.die();
    socket.off(ServerPacketType.ERROR, this.errListener);
  }
}
