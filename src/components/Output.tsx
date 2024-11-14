import accounting from "accounting"
import { getEffectiveRate, getMonthlyPayment, getPaymentByType, getRateByFrequency, toPercentage } from "../utils/calculators"
import { OutputValues, PaymentDetails } from "../types/OutputTypes"
import { PaymentSchedules, STATUS } from "../types/StringTypes"
import MortgageSchedule from "./MortgageSchedule.tsx"
import { paymentScheduleFrequencyMap } from "../utils/helpers"
import OutputSummary from "./OutputSummary"

import '../styles/output.css'

interface OutputProps {
  rate: number,
  principal: number,
  amortization: number,
  paymentType: PaymentSchedules,
  term: number
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
    output.interestRate = toPercentage(rate, 2)
    output.effectiveRate = toPercentage(effectiveRate, 4)
    output.principal = accounting.formatMoney(principal)
    
    output.status = STATUS.complete
  }
  
  return (
    <div className="calculator-outputs">
      {output.status === STATUS.incomplete &&
        <p className="output-waiting">waiting...</p>
      }
      {output.status === STATUS.complete && 
        <OutputSummary output={output}/>
      }
      {paymentDetails && <MortgageSchedule paymentDetails={paymentDetails}/>}
    </div>
  )
}

