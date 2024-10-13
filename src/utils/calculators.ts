// compoundFreq: Canadian (fixed rate) Mortgages compounded semi-annually
export function getEffectiveRate(rate: number, compoundFreq = 2) {
  return (1 + rate / compoundFreq) ** compoundFreq - 1
}