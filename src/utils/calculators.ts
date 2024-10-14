import accounting from "accounting"

interface PaymentCalculationOptions {
  principal: number,
  amortization: number,
  rate: number
}

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

// TODO: delete this function, and just rely on accounting package directly
export function toDollars(num: number, decimalPlaces = 2): string {
  return accounting.formatMoney(num, {precision: decimalPlaces})
}

// it expects the amortization in months (25 years = 300 months)
export function getMonthlyPayment(values: PaymentCalculationOptions) {
  const denominator = 1 - (1 / (1 + values.rate) ** values.amortization)
  const amount = (values.rate * values.principal) / denominator
  return accounting.formatMoney(amount, {precision: 2})
}