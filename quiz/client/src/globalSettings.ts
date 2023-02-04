import { DOMScreen } from "./screens/screen";
import { SettingsScreen } from "./screens/settings";
import { ClientAnimeTitleLanguagePreferences } from "./types/clientSettings";
import { GlobalDropdownOption } from "./types/globalDropdown";

const defaultSettings = {
  volume: 1.0,
  languagePreference: ClientAnimeTitleLanguagePreferences.OFFICIAL,
  secondaryLanguagePreference: ClientAnimeTitleLanguagePreferences.OFFICIAL,
};

const settings = {
  ...defaultSettings,
  ...JSON.parse(localStorage.getItem("settings") ?? "{}"),
};
export const globalSettings = new Proxy<typeof defaultSettings>(settings, {
  set(obj, prop, val) {
    obj[prop] = val;
    try {
      localStorage.setItem("settings", JSON.stringify(obj));
    } catch (_) {}
    document.dispatchEvent(
      new CustomEvent("globalSettingsChanged", {
        detail: obj,
      })
    );
    return true;
  },
});

const settingsDOM = document.querySelector(".settings-overlay");
const dropdown = settingsDOM.querySelector(".settings-dropdown");
const menuButton = settingsDOM.querySelector(".settings-button");
const settingsScreen = DOMScreen.spawnScreen(new SettingsScreen());

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target === menuButton) {
    dropdown.toggleAttribute("data-active");
    return;
  }

  if (dropdown.contains(target)) {
    const link = target.closest("[data-link]");
    if (!link) {
      return;
    }

    switch (link.getAttribute("data-link")) {
      case "settings-screen":
        settingsScreen.setActive();
        break;
      case "_additional":
        const id = parseInt(link.getAttribute("data-link-id"));
        const screen = DOMScreen.getCurrentScreen();
        if (screen.globalDropdownOptions) {
          screen.globalDropdownOptions[id]?.callback();
        }
        break;
    }
  }

  dropdown.toggleAttribute("data-active", false);
});

document.addEventListener("screenChanged", (e: CustomEvent) => {
  renderGlobalSettings();
});

export function renderGlobalSettings() {
  const additionalEntries: GlobalDropdownOption[] = [];

  const screen = DOMScreen.getCurrentScreen();
  if (screen.globalDropdownOptions) {
    additionalEntries.push(...screen.globalDropdownOptions);
  }

  dropdown.innerHTML = `
  <div class="settings-dropdown-entry settings-dropdown-entry-inverted">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /></svg>
    <input type="range" id="setting-audio-volume" min="1" max="100" value="${
      globalSettings.volume * 100
    }">
  </div>
  <div class="settings-dropdown-entry" data-link="settings-screen">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" /></svg>
    Settings
  </div>
  ${additionalEntries.map(
    (e, idx) => `
    <div class="settings-dropdown-entry" data-link="_additional" data-link-id="${idx}">
      <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">${e.svgPath}</svg>
      ${e.title}
    </div>`
  )}`;

  settingsDOM
    .querySelector("#setting-audio-volume")
    .addEventListener("input", (e) => {
      globalSettings.volume =
        parseInt((e.target as HTMLInputElement).value) / 100.0;
    });
}
