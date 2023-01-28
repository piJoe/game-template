const defaultSettings = {
  volume: 1.0,
};

const settings = {
  ...defaultSettings,
  ...JSON.parse(localStorage.getItem("settings") ?? "{}"),
};
export const globalSettings = new Proxy<typeof defaultSettings>(settings, {
  set(obj, prop, val) {
    console.log("GLOBAL STATE CHANGED!");
    obj[prop] = val;
    localStorage.setItem("settings", JSON.stringify(obj));
    document.dispatchEvent(
      new CustomEvent("globalSettingsChanged", {
        detail: obj,
      })
    );
    return true;
  },
});

const settingsDOM = document.querySelector(".settings-overlay");

export function renderGlobalSettings() {
  // TODO: render settings that are available in the active screen!

  const dropdown = settingsDOM.querySelector(".settings-dropdown");

  dropdown.innerHTML = `
  <div class="settings-dropdown-entry settings-dropdown-entry-inverted">
    <svg class="settings-dropdown-entry-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" /></svg>
    <input type="range" id="setting-audio-volume" min="1" max="100" value="${
      globalSettings.volume * 100
    }">
  </div>`;

  settingsDOM
    .querySelector("#setting-audio-volume")
    .addEventListener("input", (e) => {
      globalSettings.volume =
        parseInt((e.target as HTMLInputElement).value) / 100.0;
    });

  settingsDOM
    .querySelector(".settings-button")
    .addEventListener("click", (e) => {
      dropdown.toggleAttribute("data-active");
    });
}

renderGlobalSettings();
