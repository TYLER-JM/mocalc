import accounting from "accounting"
import { getEffectiveRate, getMonthlyPayment, getPaymentByType, getRateByFrequency, PaymentTypes, toDollars, toPercentage } from "../utils/calculators"

interface OutputProps {
  rate: number,
  principal: number,
  amortization: number,
  paymentType: PaymentTypes
}

export default function Output({
  rate,
  principal,
  amortization,
  paymentType,
}: OutputProps) {

  const effectiveRate = getEffectiveRate(rate)
  const monthlyRate = getRateByFrequency(effectiveRate, 12)
  const paymentValues = {
    principal,
    rate: monthlyRate,
    amortization: amortization * 12 // to get the months
  }
  const monthlyPayment = getMonthlyPayment(paymentValues)
  const monthlyToString = accounting.formatMoney(monthlyPayment, {precision: 2})
  const customPayment = getPaymentByType(monthlyPayment, paymentType)
  const customToString = accounting.formatMoney(customPayment, {precision: 2})
  return (
    <div>
      <ul>
        <li>Payment Schedule: {paymentType}</li>
        <li>Effective Rate: {toPercentage(effectiveRate)}</li>
        <li>Monthly Rate: {toPercentage(monthlyRate, 4)}</li>
        <li>Mortgage Amount: {toDollars(principal, 0)}</li>
        <li>Amortization Period, Years: {amortization}</li>
        <li>Amortization Period, Months: {amortization * 12}</li>
        <li>Monthly Payment: {monthlyToString}</li>
        <li>Custom Payment: {customToString}</li>
      </ul>
    </div>
  )
}

