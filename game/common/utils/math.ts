// simple helper to distribute a total number evenly to splits
export function distributeNumbers(total: number, splits: number): number[] {
  const quotient = Math.floor(total / splits);

  let arr = Array(splits).fill(quotient);

  let remainder = total % splits;
  for (let i = 0; i < remainder; i++) {
    arr[i]++;
  }

  return arr;
}
