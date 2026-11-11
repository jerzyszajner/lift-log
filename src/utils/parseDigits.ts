export function parseDigits(value: string): number {
  return Number(value.replace(/\D/g, ""));
}
