import { getEffectiveRate, getMonthlyPayment, getRateByFrequency, toDollars, toPercentage } from "../utils/calculators"

interface OutputProps {
  schedule: number,
  rate: number,
  principal: number,
  amortization: number
}

export default function Output({
  schedule,
  rate,
  principal,
  amortization
}: OutputProps) {

  const effectiveRate = getEffectiveRate(rate)
  const monthlyRate = getRateByFrequency(effectiveRate, 12)
  const paymentValues = {
    principal,
    rate: monthlyRate,
    amortization: amortization * 12 // to get the months
  }
  const monthlyPayment = getMonthlyPayment(paymentValues)
  return (
    <div>
      <ul>
        <li>Payment amount: {schedule}</li>
        <li>Effective Rate: {toPercentage(effectiveRate)}</li>
        <li>Monthly Rate: {toPercentage(monthlyRate, 4)}</li>
        <li>Mortgage Amount: {toDollars(principal, 0)}</li>
        <li>Amortization Period, Years: {amortization}</li>
        <li>Amortization Period, Months: {amortization * 12}</li>
        <li>Monthly Payment: {monthlyPayment}</li>
      </ul>
    </div>
  )
}

