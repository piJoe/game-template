import {
  AnimeTitle,
  AnimeTitleType,
  QuestionTitleTemplate,
} from "../../../common/types/question";
import { globalSettings } from "../globalSettings";
import { ClientAnimeTitleLanguagePreferences } from "../types/clientSettings";

// TODO: figure out what would cause a crash. (something `.find`??)

export function renderAnimeTitle(
  titles: string | AnimeTitle[],
  secondary = false
): string {
  if (typeof titles === "string") {
    return titles;
  }

  const defaultTitle =
    titles.find((t) => t.type === AnimeTitleType.DEFAULT)?.title ??
    titles.at(0).title;

  let languageSetting = globalSettings.languagePreference;
  if (secondary) {
    languageSetting = globalSettings.secondaryLanguagePreference;
  }

  switch (languageSetting) {
    case ClientAnimeTitleLanguagePreferences.OFFICIAL:
      return defaultTitle;
      break;
    case ClientAnimeTitleLanguagePreferences.SHORTEST:
      return (
        titles
          .filter((t) =>
            [AnimeTitleType.DEFAULT, AnimeTitleType.SYNONYM].includes(t.type)
          )
          .sort((a, b) => a.title.length - b.title.length)
          .at(0)?.title ?? defaultTitle
      );
      break;
    case ClientAnimeTitleLanguagePreferences.ENGLISH:
      return (
        titles.find((t) => t.type === AnimeTitleType.ENGLISH)?.title ??
        defaultTitle
      );
      break;
    case ClientAnimeTitleLanguagePreferences.JAPANESE:
      return (
        titles.find((t) => t.type === AnimeTitleType.JAPANESE)?.title ??
        defaultTitle
      );
      break;
    case ClientAnimeTitleLanguagePreferences.GERMAN:
      return (
        titles.find((t) => t.type === AnimeTitleType.GERMAN)?.title ??
        defaultTitle
      );
      break;
    case ClientAnimeTitleLanguagePreferences.SPANISH:
      return (
        titles.find((t) => t.type === AnimeTitleType.SPANISH)?.title ??
        defaultTitle
      );
      break;
    case ClientAnimeTitleLanguagePreferences.FRENCH:
      return (
        titles.find((t) => t.type === AnimeTitleType.FRENCH)?.title ??
        defaultTitle
      );
      break;
  }

  return defaultTitle;
}

export function renderTemplate(template: QuestionTitleTemplate): string {
  const data = template?.data ?? {};

  return template.template
    .map((s) => {
      const value = data[s];
      if (!value) {
        return s;
      }

      if (typeof value === "string") {
        return value;
      }

      return renderAnimeTitle(value);
    })
    .join("");
}

const canvasContext = (
  document.createElement("canvas") as HTMLCanvasElement
).getContext("2d");
export function calcStringWidth(
  str: string,
  font: string = "800 22px Fira Sans, sans-serif"
) {
  canvasContext.font = font;
  return Math.ceil(canvasContext.measureText(str).width);
}
