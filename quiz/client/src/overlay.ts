const overlay = document.querySelector<HTMLElement>(".overlay-container");

interface DialogAction {
  class: string;
  title: string;
  value: string;
}

interface DialogOptions {
  actions?: DialogAction[];
  callback?: (string) => void;
  closeDialogPromise?: Promise<void>;
  alternativeContentDom?: HTMLElement;
}

interface Dialog {
  dom: Node;
  options?: DialogOptions;
}

const openDialogs = new Map<string, Dialog>();
let dialogId = 0;

overlay.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.hasAttribute("data-popup-id")) {
    const id = target.getAttribute("data-popup-id");
    const value = target.getAttribute("data-value");
    closeDialog(id, value);
  }
});

function closeDialog(id: string, value?: string) {
  const d = openDialogs.get(id);
  if (d) {
    overlay.removeChild(d.dom);
  }
  openDialogs.delete(id);
  if (d.options?.callback) {
    d.options.callback(value);
  }
  if (openDialogs.size < 1) {
    overlay.setAttribute("data-active", "false");
  }
}

export function showDialog(
  title: string,
  msg?: string,
  options?: DialogOptions
) {
  const id = (dialogId++).toString();
  const container = document.createElement("div");
  container.classList.add("container", "container-fadein");
  const actions: string[] = [];
  if (!options?.actions) {
    actions.push(
      `<input type="button" data-popup-id="${id}" data-value="ok" class="button button-outline" value="OK">`
    );
  } else {
    actions.push(
      ...options.actions.map(
        (a) =>
          `<input type="button" data-popup-id="${id}" data-value="${a.value}" class="button ${a.class}" value="${a.title}">`
      )
    );
  }
  container.innerHTML = `
    <div class="title-h2">${title}</div>
    <div class="dialog-content">${msg && msg.length > 0 ? `${msg}` : ""}</div>
    <div class="dialog-actions">${actions.join("")}</div>`;

  if (options?.alternativeContentDom) {
    container
      .querySelector(".dialog-content")
      .appendChild(options.alternativeContentDom);
  }

  openDialogs.set(id, { dom: container, options });

  overlay.setAttribute("data-active", "true");
  overlay.appendChild(container);

  if (options?.closeDialogPromise) {
    options.closeDialogPromise.then(() => {
      closeDialog(id);
    });
  }
}
