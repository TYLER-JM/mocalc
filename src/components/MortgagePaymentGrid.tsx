import { MortgagePayment, PaymentDetails } from "../types/OutputTypes";
import { paymentScheduleFrequencyMap } from "./Output";
import accounting from "accounting";

interface MortgagePaymentTableProps {
  paymentDetails: PaymentDetails
}

export default function MortgagePaymentGrid({
  paymentDetails
}: MortgagePaymentTableProps) {
  let remainingBalance = paymentDetails.principal

  const renderRows = () => {
    const rows = []

    for (let i = 1; i <= paymentDetails.termLength * paymentScheduleFrequencyMap[paymentDetails.schedule]; i++) {
      const mortgagePayment = new MortgagePayment(
        remainingBalance,
        paymentDetails.scheduleRate,
        paymentDetails.schedule,
        paymentDetails.monthlyPayment
      )
      rows.push(
        
        <div className="sub-grid" key={mortgagePayment.startingBalance.toString()}>
          <span>{i}</span>
          <span>{accounting.formatMoney(mortgagePayment.startingBalance)}</span>
          <span>{accounting.formatMoney(mortgagePayment.totalPayment)}</span>
          <span>{accounting.formatMoney(mortgagePayment.interestPortion)}</span>
          <span>{accounting.formatMoney(mortgagePayment.principalPortion)}</span>
          <span>{accounting.formatMoney(mortgagePayment.endingBalance)}</span>
        </div>
      )
      remainingBalance = mortgagePayment.endingBalance
    }
    return rows
  }

  return (
    <div className="mortgage-table">
      <div className="row-header t-row sub-grid">
        <span>#</span>
        <span>Starting Balance</span>
        <span>Total Payment</span>
        <span>Interest</span>
        <span>Principal</span>
        <span>Ending Balance</span>
      </div>

      <div className="row-header t-row">
        <div className="row-header">Here is some Summary info for Year 1</div>
      </div>
      <div className="sub-grid-wrapper">
        {renderRows()}
      </div>
      
    </div>
  )
}