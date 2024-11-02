import { MortgagePayment, PaymentDetails, ScheduledPayment } from "../types/OutputTypes";
import accounting from "accounting";
import MortgageScheduleYear from "./MortgageScheduleYear";

import '../styles/mortgage-schedule.css';
import { paymentScheduleFrequencyMap } from "../utils/helpers";
import { useState } from "react";

interface MortgagePaymentTableProps {
  paymentDetails: PaymentDetails,
}

export default function MortgageSchedule({
  paymentDetails,
}: MortgagePaymentTableProps) {
  const [layout, setLayout] = useState<'table' | 'tabs'>('table')
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
        jsx: <div className="sub-grid mortgage-schedule-row" key={mortgagePayment.startingBalance.toString()}>
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
    <>
      <div>
        <button onClick={() => setLayout('table')}>Table</button>
        <button onClick={() => setLayout('tabs')}>Tabs</button>
        <button disabled>Cards</button>
      </div>
      <div className="overflow">
        <div className={`mortgage-schedule mortgage-schedule--${layout}`}>
          <div className="mortgage-schedule-header t-row sub-grid">
            <span>#</span>
            <span>Starting Balance</span>
            <span>Total Payment</span>
            <span>Interest</span>
            <span>Principal</span>
            <span>Ending Balance</span>
          </div>
          {renderRows()}
        </div>
      </div>
    </>
  )
}