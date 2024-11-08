import { globalSettings } from "../globalSettings";
import { ClientAnimeTitleLanguagePreferences } from "../types/clientSettings";
import { DOMScreen } from "./screen";

export class SettingsScreen extends DOMScreen {
  protected killWhenInactive = false;
  protected additionalClasses = ["gradient-bg-screen"];

  private languagePreferences = [
    ClientAnimeTitleLanguagePreferences.OFFICIAL,
    ClientAnimeTitleLanguagePreferences.SHORTEST,
    ClientAnimeTitleLanguagePreferences.ENGLISH,
    ClientAnimeTitleLanguagePreferences.JAPANESE,
    ClientAnimeTitleLanguagePreferences.GERMAN,
    ClientAnimeTitleLanguagePreferences.SPANISH,
    ClientAnimeTitleLanguagePreferences.FRENCH,
  ];

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

      const secondaryLanguage = (
        elements.namedItem("secondary-title-language") as HTMLOptionElement
      ).value as ClientAnimeTitleLanguagePreferences;

      const showReverseTimer = (
        elements.namedItem("showReverseTimer") as HTMLInputElement
      ).checked;

      globalSettings.languagePreference = animeTitleLanguage;
      globalSettings.secondaryLanguagePreference = secondaryLanguage;
      globalSettings.showReverseTimer = showReverseTimer;
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
              <span class="setting-row-entry-label">Title Language Preference</span>
              <select name="anime-title-language">
                ${this.languagePreferences.map(
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

          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Secondary Language Preference</span>
              <select name="secondary-title-language">
                ${this.languagePreferences.map(
                  (l) =>
                    `<option 
                      value="${l}" 
                      ${
                        globalSettings.secondaryLanguagePreference === l
                          ? "selected"
                          : ""
                      }>${l}</option>`
                )}
              </select>
            </div>
          </div>

          <div class="list-row">
            <div class="list-row-entry setting-row-entry">
              <span class="setting-row-entry-label">Show Reverse Timer when loading next question</span>
              <input type="checkbox" 
                name="showReverseTimer" 
                ${globalSettings.showReverseTimer ? "checked" : ""}>
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
