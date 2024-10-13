// compoundFreq: Canadian (fixed rate) mortgages compounded semi-annually
export function getEffectiveRate(rate: number, compoundFreq = 2): number {
  const result = (1 + rate / compoundFreq) ** compoundFreq - 1
  return result
}

export function toPercentage(rate: number): string {
  return `${(rate * 100).toFixed(4)} %`
}