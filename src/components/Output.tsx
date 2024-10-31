import accounting from "accounting"
import { getEffectiveRate, getMonthlyPayment, getPaymentByType, getRateByFrequency, toPercentage } from "../utils/calculators"
import { OutputValues, PaymentDetails } from "../types/OutputTypes"
import { PaymentSchedules, STATUS } from "../types/StringTypes"
import MortgageScheduleGrid from "./MortgageScheduleGrid"
import { paymentScheduleFrequencyMap } from "../utils/helpers"
import OutputSummary from "./OutputSummary"
import {useState} from "react";

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

  const [layout, setLayout] = useState<'table' | 'tabs'>('table')

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
    <div>
      {output.status === STATUS.incomplete &&
        <p>pending...</p>
      }
      {output.status === STATUS.complete && 
        <OutputSummary output={output}/>
      }
      <div>
        <button onClick={() => setLayout('table')}>Table</button>
        <button onClick={() => setLayout('tabs')}>Tabs</button>
        <button disabled>Cards</button>
      </div>
      {paymentDetails && <MortgageScheduleGrid paymentDetails={paymentDetails} layout={layout}/>}
    </div>
  )
}

