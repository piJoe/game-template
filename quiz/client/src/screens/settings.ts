import { globalSettings } from "../globalSettings";
import { ClientAnimeTitleLanguagePreferences } from "../types/clientSettings";
import { DOMScreen } from "./screen";

export class SettingsScreen extends DOMScreen {
  protected killWhenInactive = false;
  protected additionalClasses = ["gradient-bg-screen"];

  constructor() {
    super();
  }

  init() {
    this.domRef
      .querySelector("#settings-close")
      .addEventListener("click", (e) => {
        this.setInactive("fade");
      });

    const form = this.domRef.querySelector("form") as HTMLFormElement;
    form.addEventListener("input", (e) => {
      const elements = form.elements;

      const animeTitleLanguage = (
        elements.namedItem("anime-title-language") as HTMLOptionElement
      ).value as ClientAnimeTitleLanguagePreferences;

      globalSettings.languagePreference = animeTitleLanguage;
    });
  }

  setActive(): void {
    super.setActive("fade", true);
  }

  template() {
    return `
    <div class="title-bar">
      <h1 class="title-h1">SETTINGS</h1>
      <div class="tab-menu">
        <div class="tab-menu-entry" data-active="true" data-target-tab="general">General</div>
        <!--<div class="tab-menu-entry" data-target-tab="audio">Audio</div>-->
      </div>
      <div class="title-bar-spacer"></div>
    </div>

    <section class="content-wrapper" data-tab="general">
      <div class="container-wrapper">
        <form class="list">
          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Anime Title Language</span>
              <select name="anime-title-language">
                ${[
                  ClientAnimeTitleLanguagePreferences.DEFAULT,
                  ClientAnimeTitleLanguagePreferences.SHORTEST,
                  ClientAnimeTitleLanguagePreferences.ENGLISH,
                  ClientAnimeTitleLanguagePreferences.JAPANESE,
                  ClientAnimeTitleLanguagePreferences.GERMAN,
                  ClientAnimeTitleLanguagePreferences.SPANISH,
                  ClientAnimeTitleLanguagePreferences.FRENCH,
                ].map(
                  (l) =>
                    `<option 
                      value="${l}" 
                      ${
                        globalSettings.languagePreference === l
                          ? "selected"
                          : ""
                      }>${l}</option>`
                )}
              </select>
            </div>
          </div>
        </form>
      </div>
    </section>
    
    <div class="bottom-container" data-tab="general">
      <input type="button" class="button button-outline" id="settings-close" value="Back">
    </div>`;
  }
}
