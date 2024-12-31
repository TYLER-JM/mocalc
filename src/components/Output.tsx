import { getEffectiveRate, getMonthlyPayment, getRateByFrequency } from "../utils/calculators"
import { PaymentDetails } from "../definitions/OutputTypes"
import { PaymentSchedules, STATUS } from "../definitions/StringTypes"
import MortgageSchedule from "./MortgageSchedule.tsx"
import { paymentScheduleFrequencyMap } from "../utils/helpers"
import OutputSummary from "./OutputSummary"

import '../styles/output.css'
import useOutputValuesFromCalculator from "../hooks/useOutputValuesFromCalculator.ts";

interface OutputProps {
  rate: number,
  principal: number,
  amortization: number,
  paymentType: PaymentSchedules,
  term: number,
  calculatorId: number
}



export default function Output({
  rate,
  principal,
  amortization,
  paymentType,
  term,
  calculatorId
}: OutputProps) {

  const output = useOutputValuesFromCalculator(calculatorId)

  let paymentDetails: PaymentDetails | undefined = undefined

  const effectiveRate = getEffectiveRate(rate)
  const monthlyRate = getRateByFrequency(effectiveRate, 12)

  const paymentValues = {
    principal,
    rate: monthlyRate,
    amortization: amortization * 12 // to get the months
  }

  if (amortization > 0 && rate > 0) {
    let monthlyPayment = getMonthlyPayment(paymentValues)
    let scheduleRate = getRateByFrequency(effectiveRate, paymentScheduleFrequencyMap[paymentType])

    paymentDetails = {
      principal,
      schedule: paymentType,
      scheduleRate,
      monthlyPayment,
      termLength: term
    }
  }
  
  return (
    <div className="calculator-outputs">
      {output.status === STATUS.incomplete &&
        <p className="output-waiting">waiting...</p>
      }
      {output.status === STATUS.complete && 
        <OutputSummary output={output}/>
      }
      {(paymentDetails && paymentDetails.principal > 0) && <MortgageSchedule paymentDetails={paymentDetails}/>}
    </div>
  )
}

