import { initialize } from "esbuild";

let activeScreen: DOMScreen = null;

export abstract class DOMScreen {
  protected domRef: HTMLElement;
  protected killWhenInactive: boolean = true;
  constructor() {}

  private setup() {
    this.domRef = document.createElement("div");
    this.domRef.classList.add("screen");
    this.domRef.setAttribute("data-screen-active", "next");
  }
  abstract init();

  private render() {
    this.domRef.innerHTML = this.template();
    document.body.querySelector(".screen-container").appendChild(this.domRef);
  }

  template(): string {
    return ``;
  }

  setActive() {
    if (activeScreen) {
      activeScreen.setInactive();
    }
    this.domRef.setAttribute("data-screen-active", "cur");
    activeScreen = this;
  }

  setInactive() {
    this.domRef.setAttribute("data-screen-active", "prev");
    if (this.killWhenInactive) {
      this.die();
    }
  }

  die() {
    window.setTimeout(() => {
      this.domRef.remove();
    }, 1000);
  }

  static spawnScreen(s: DOMScreen) {
    s.setup();
    s.render();
    s.init();
    return s;
  }
}
