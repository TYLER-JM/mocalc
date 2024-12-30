import { OutputValues } from "../definitions/OutputTypes"
import "../styles/output-summary.css"
import {convertToTitle} from "../utils/helpers.ts";


interface OutputSummaryProps {
  output: OutputValues
}

export default function OutputSummary({
  output
}: OutputSummaryProps) {
  return (
    <div className="output-summary">
      <div className="principal-wrapper">
        <p className="output summary-header">amount borrowed:</p>
        <p>{output.principal}</p>
      </div>
      <div className="rate-wrapper">
        <p className="output summary-header">interest rate:</p>
        <p>{output.interestRate}</p>
      </div>
      <div className="schedule-wrapper">
        <p className="output summary-header">payment schedule:</p>
        <p>{output.paymentSchedule && convertToTitle(output.paymentSchedule)}</p>
      </div>
      <div className="payment-wrapper">
        <p className="output summary-header">your total payment will be</p>
        <p className="output-summary-payment">{output.payment}</p>
      </div>
    </div>
  )
}