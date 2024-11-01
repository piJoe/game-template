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
