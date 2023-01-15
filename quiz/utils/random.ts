export function getRandomEntryInArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
