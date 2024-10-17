import accounting from "accounting"

interface PaymentCalculationOptions {
  principal: number,
  amortization: number,
  rate: number
}
export type PaymentTypes = 'monthly' | 'semimonthly' | 'biweekly' | 'weekly' | 'accelerated_biweekly' | 'accelerated_weekly'

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
  return (values.rate * values.principal) / denominator
}

export function getPaymentByType(monthlyPayment: number, type: PaymentTypes) {
  let p;
  switch (type) {
    case 'semimonthly':
    case 'accelerated_biweekly':
      p = accounting.formatMoney(monthlyPayment / 2, {precision: 2})
      break;
    case 'biweekly':
      p = accounting.formatMoney((monthlyPayment * 12) / 26, {precision: 2})
      break;
    case 'weekly':
      p = accounting.formatMoney((monthlyPayment * 12) / 52, {precision: 2})
      break;
    case 'accelerated_weekly':
      p = accounting.formatMoney(monthlyPayment / 4, {precision: 2})
      break;
    default:
      p = monthlyPayment
      break;
  }

  return p
}