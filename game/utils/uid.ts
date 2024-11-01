import { times } from "lodash-es";

export function generateUniqueId(
  minLength = 4,
  { lookupMap = <Map<string, any> | false>false, prefix = "" } = {}
) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
  let id =
    prefix +
    times(
      minLength,
      () => alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join("");

  if (lookupMap) {
    while (lookupMap.has(id)) {
      id += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
  return id;
}
