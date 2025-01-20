import { OutputValues } from "../definitions/OutputTypes"
import "../styles/output-summary.css"
import {convertToTitle} from "../utils/helpers.ts";
import {REGULAR, YEARLY} from "../definitions/StringTypes.ts";
import accounting from "accounting";


interface OutputSummaryProps {
  output: OutputValues
}

export default function OutputSummary({
  output
}: OutputSummaryProps) {

  return (
    <div className="output-summary">
      <div className="principal-wrapper">
        <p className="text-xs text-dark">amount borrowed:</p>
        <p>{output.principal}</p>
      </div>
      <div className="rate-wrapper">
        <p className="text-xs text-dark">interest rate:</p>
        <p>{output.interestRate}</p>
      </div>
      <div className="schedule-wrapper">
        <p className="text-xs text-dark">payment schedule:</p>
        <p>{output.paymentSchedule && convertToTitle(output.paymentSchedule)}</p>
      </div>
      <div className="payment-wrapper">
        <p className="font-bold text-sm text-primary">your regular payment will be</p>
        {
          (output.prepaymentOptions?.isValid() && output.prepaymentOptions?.frequency === REGULAR)
            ? <p className="summary-payment">
                {accounting.formatMoney((output.prepaymentOptions.amount || 0) + (output.paymentRaw || 0))}
            </p>
            : <p className="summary-payment">{output.payment}</p>
        }

      </div>
      {
        (output.prepaymentOptions?.isValid() && output.prepaymentOptions?.frequency === YEARLY) &&
        <div className="prepayment-wrapper">
          <p className="font-bold text-sm text-primary">the last payment of every year will be</p>
          <p className="summary-payment">
            {accounting.formatMoney((output.prepaymentOptions.amount || 0) + (output.paymentRaw || 0))}
          </p>
        </div>
      }
    </div>
  )
}