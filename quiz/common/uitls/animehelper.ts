export function chooseBestAnimeTitle(
  title: string,
  alternatives: {
    type: string;
    title: string;
  }
) {}

export function fixCharacterName(name: string): string {
  if (name.split(",").length === 2) {
    return name.split(",").reverse().join(" ").trim();
  }
  return name;
}
