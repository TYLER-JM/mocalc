import accounting from "accounting"
import {ACCELERATED_BIWEEKLY, BIWEEKLY, PaymentSchedules, SEMIMONTHLY} from "../definitions/StringTypes"

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

// it expects the amortization in months (25 years = 300 months)
export function getMonthlyPayment(values: PaymentCalculationOptions) {
  const denominator = 1 - (1 / (1 + values.rate) ** values.amortization)
  return (values.rate * values.principal) / denominator
}

export function getPaymentByType(monthlyPayment: number, type: PaymentSchedules): number {
  let p;
  switch (type) {
    case SEMIMONTHLY :
    case ACCELERATED_BIWEEKLY:
      p = monthlyPayment / 2
      break;
    case BIWEEKLY:
      p = (monthlyPayment * 12) / 26
      break;
    case 'weekly':
      p = accounting.formatMoney((monthlyPayment * 12) / 52, {precision: 2})
      p = (monthlyPayment * 12) / 52
      break;
    case 'accelerated_weekly':
      p = monthlyPayment / 4
      break;
    default:
      p = monthlyPayment
      break;
  }

  return p
}