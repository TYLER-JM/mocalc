import { PaymentDetails } from "../definitions/OutputTypes"
import { STATUS } from "../definitions/StringTypes"
import MortgageSchedule from "./MortgageSchedule.tsx"
import OutputSummary from "./OutputSummary"
import getOutputValuesFromCalculator from "../utils/getOutputValuesFromCalculator.ts";
import getPaymentDetailsFromCalculator from "../utils/getPaymentDetailsFromCalculator.ts";
import {CalculatorInputs} from "../definitions/CalculatorDefinitions.ts";
import '../styles/output.css'

interface OutputProps {
  calculator: CalculatorInputs
}
export default function Output({
  calculator
}: OutputProps) {

  const output = getOutputValuesFromCalculator(calculator)
  const paymentDetails: PaymentDetails | undefined = getPaymentDetailsFromCalculator(calculator)
  
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

