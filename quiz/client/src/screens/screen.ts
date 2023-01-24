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

  setActive(direction: "left" | "right" | "none" = "right") {
    if (activeScreen) {
      activeScreen.setInactive(direction);
    }
    let transition = "cur-none";
    switch (direction) {
      case "left":
        transition = "cur-left";
        break;
      case "right":
        transition = "cur";
    }
    this.domRef.setAttribute("data-screen-active", transition);
    activeScreen = this;
  }

  setInactive(direction: "left" | "right" | "none" = "right") {
    let transition = "prev-none";
    switch (direction) {
      case "left":
        transition = "prev-left";
        break;
      case "right":
        transition = "prev";
    }
    this.domRef.setAttribute("data-screen-active", transition);
    if (this.killWhenInactive) {
      this.die();
    }
  }

  die() {
    if (activeScreen === this) {
      activeScreen = null;
    }
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
