import { MortgagePayment, PaymentDetails, ScheduledPayment } from "../types/OutputTypes";
import accounting from "accounting";
import MortgageScheduleYear from "./MortgageScheduleYear";

import '../styles/mortgage-schedule.css';
import { paymentScheduleFrequencyMap } from "../utils/helpers";

interface MortgagePaymentTableProps {
  paymentDetails: PaymentDetails
}

export default function MortgageScheduleGrid({
  paymentDetails
}: MortgagePaymentTableProps) {
  let remainingBalance = paymentDetails.principal

  const renderRows = () => {
    let payments: ScheduledPayment[] = []
    const years = []

    for (let i = 1; i <= paymentDetails.termLength * paymentScheduleFrequencyMap[paymentDetails.schedule]; i++) {
      const mortgagePayment = new MortgagePayment(
        remainingBalance,
        paymentDetails.scheduleRate,
        paymentDetails.schedule,
        paymentDetails.monthlyPayment
      )

      payments.push({
        mortgagePayment,
        jsx: <div className="sub-grid mortgage-table-row" key={mortgagePayment.startingBalance.toString()}>
          <span>{i}</span>
          <span>{accounting.formatMoney(mortgagePayment.startingBalance)}</span>
          <span>{accounting.formatMoney(mortgagePayment.totalPayment)}</span>
          <span>{accounting.formatMoney(mortgagePayment.interestPortion)}</span>
          <span>{accounting.formatMoney(mortgagePayment.principalPortion)}</span>
          <span>{accounting.formatMoney(mortgagePayment.endingBalance)}</span>
        </div>
      })

      remainingBalance = mortgagePayment.endingBalance

      if (i % paymentScheduleFrequencyMap[paymentDetails.schedule] === 0) {
        years.push(payments)
        payments = []
      }
    }

    return years.map((payments, index) => <MortgageScheduleYear payments={payments} index={index} key={index}/>)
  }

  return (
    <div className="mortgage-table">
      <div className="mortgage-table-header t-row sub-grid">
        <span>#</span>
        <span>Starting Balance</span>
        <span>Total Payment</span>
        <span>Interest</span>
        <span>Principal</span>
        <span>Ending Balance</span>
      </div>

      {renderRows()}
      
    </div>
  )
}