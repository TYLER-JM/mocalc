import accounting from "accounting"
// compoundFreq: Canadian (fixed rate) mortgages compounded semi-annually
export function getEffectiveRate(rate: number, compoundFreq = 2): number {
  const result = (1 + rate / compoundFreq) ** compoundFreq - 1
  return result
}

// freq = 12 to return the MONTHLY rate by default
export function getRateByFrequency(rate: number, freq = 12): number {
  return (1 + rate) ** (1 / freq) - 1
}

export function toPercentage(rate: number, decimalPlaces = 2): string {
  return `${(rate * 100).toFixed(decimalPlaces)} %`
}

export function toDollars(num: number, decimalPlaces = 2): string {
  // 200000 = $200,000.00
  // 1000000 = $1,000,000.00
  // 10000000 = $10,000,000.00
  // 250000000 = $250,000,000.00
  return accounting.formatMoney(num, {precision: decimalPlaces})
}