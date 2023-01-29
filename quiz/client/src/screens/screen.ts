import { initialize } from "esbuild";

let activeScreen: DOMScreen = null;

export abstract class DOMScreen {
  protected domRef: HTMLElement;
  protected killWhenInactive: boolean = true;
  protected additionalClasses: string[] = [];
  constructor() {}

  private setup() {
    this.domRef = document.createElement("div");
    this.domRef.classList.add("screen", ...this.additionalClasses);
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

  setActive(
    direction: "left" | "right" | "none" | "fade" = "right",
    asOverlay?: boolean
  ) {
    let transition = "cur-none";
    switch (direction) {
      case "left":
        transition = "cur-left";
        break;
      case "right":
        transition = "cur";
        break;
      case "fade":
        transition = "cur-fade";
        break;
    }

    // if we're displaying the screen as overlay, do not update `activeScreen`
    // and never call `setInactive` on the current screen.
    if (asOverlay) {
      this.domRef.setAttribute("data-screen-active", transition);
      this.domRef.setAttribute("data-screen-overlay", "true");
      return;
    }

    if (activeScreen) {
      activeScreen.setInactive(direction);
    }
    this.domRef.setAttribute("data-screen-active", transition);
    activeScreen = this;
  }

  setInactive(direction: "left" | "right" | "none" | "fade" = "right") {
    let transition = "prev-none";
    switch (direction) {
      case "left":
        transition = "prev-left";
        break;
      case "right":
        transition = "prev";
        break;
      case "fade":
        transition = "prev-fade";
        break;
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
