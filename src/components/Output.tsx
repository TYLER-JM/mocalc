import accounting from "accounting"
import { getEffectiveRate, getMonthlyPayment, getPaymentByType, getRateByFrequency, toDollars, toPercentage } from "../utils/calculators"
import { OutputValues } from "../types/OutputTypes"
import { PaymentSchedules, STATUSES } from "../types/StringTypes"

interface OutputProps {
  rate: number,
  principal: number,
  amortization: number,
  paymentType: PaymentSchedules
}

export default function Output({
  rate,
  principal,
  amortization,
  paymentType,
}: OutputProps) {

  const output: OutputValues = {
    status: 'incomplete',
  }

  const effectiveRate = getEffectiveRate(rate)
  const monthlyRate = getRateByFrequency(effectiveRate, 12)

  const paymentValues = {
    principal,
    rate: monthlyRate,
    amortization: amortization * 12 // to get the months
  }

  let monthlyPayment = 0
  let customPayment = 0
  let customToString = ''

  if (paymentValues.amortization > 0) {
    let monthlyPayment = getMonthlyPayment(paymentValues)
    let customPayment = getPaymentByType(monthlyPayment, paymentType)
    let customToString = accounting.formatMoney(customPayment, {precision: 2})
    output.status = 'complete'
    output.amortizationPeriod = amortization
    output.payment = customToString
    output.paymentSchedule = paymentType
    output.effectiveRate = toPercentage(effectiveRate, 4)
    output.principal = toDollars(principal, 2)
  }
  
  return (
    <div>
      {output.status === STATUSES.incomplete &&
        <p>pending...</p>
      }
      {output.status === STATUSES.complete && 
        <ul>
          <li>Principal: {output.principal}</li>
          <li>Amortization (Years): {output.amortizationPeriod}</li>
          <li>Payment Schedule: {output.paymentSchedule}</li>
          <li>Payment: {output.payment}</li>
        </ul>
      }
    </div>
  )
}

