import accounting from "accounting"
import { getEffectiveRate, getMonthlyPayment, getPaymentByType, getRateByFrequency, toDollars, toPercentage } from "../utils/calculators"
import { OutputValues, PaymentDetails } from "../types/OutputTypes"
import { ACCELERATED_BIWEEKLY, ACCELERATED_WEEKLY, BIWEEKLY, MONTHLY, PaymentSchedules, SEMIMONTHLY, STATUS, WEEKLY } from "../types/StringTypes"
import MortgageScheduleGrid from "./MortgageScheduleGrid"

interface OutputProps {
  rate: number,
  principal: number,
  amortization: number,
  paymentType: PaymentSchedules,
  term: number
}

    //TODO: move this object to a Type or Class
export const paymentScheduleFrequencyMap = {
  [MONTHLY]: 12,
  [SEMIMONTHLY]: 24,
  [WEEKLY]: 52,
  [BIWEEKLY]: 26,
  [ACCELERATED_WEEKLY]: 52,
  [ACCELERATED_BIWEEKLY]: 26
}

export default function Output({
  rate,
  principal,
  amortization,
  paymentType,
  term
}: OutputProps) {

  const output: OutputValues = {
    status: STATUS.incomplete,
  }

  let paymentDetails: PaymentDetails | undefined = undefined

  const effectiveRate = getEffectiveRate(rate)
  const monthlyRate = getRateByFrequency(effectiveRate, 12)

  const paymentValues = {
    principal,
    rate: monthlyRate,
    amortization: amortization * 12 // to get the months
  }

  if (amortization > 0) {
    let monthlyPayment = getMonthlyPayment(paymentValues)
    let scheduleRate = getRateByFrequency(effectiveRate, paymentScheduleFrequencyMap[paymentType])

    paymentDetails = {
      principal,
      schedule: paymentType,
      scheduleRate,
      monthlyPayment,
      termLength: term
    }
    
    let customPayment = getPaymentByType(monthlyPayment, paymentType)
    let customToString = accounting.formatMoney(customPayment, {precision: 2})
    output.amortizationPeriod = amortization
    output.payment = customToString
    output.paymentSchedule = paymentType
    output.effectiveRate = toPercentage(effectiveRate, 4)
    output.principal = toDollars(principal, 2)
    
    output.status = STATUS.complete
  }
  
  return (
    <div>
      {output.status === STATUS.incomplete &&
        <p>pending...</p>
      }
      {output.status === STATUS.complete && 
        <ul>
          <li>Principal: {output.principal}</li>
          <li>Amortization (Years): {output.amortizationPeriod}</li>
          <li>Payment Schedule: {output.paymentSchedule}</li>
          <li>Payment: {output.payment}</li>
        </ul>
      }
      {paymentDetails && <MortgageScheduleGrid paymentDetails={paymentDetails}/>}
    </div>
  )
}

