import accounting from "accounting";
import { useState } from "react";
import { MortgagePayment, PaymentDetails, ScheduledPayment } from "../definitions/OutputTypes";
import { paymentScheduleFrequencyMap } from "../utils/helpers";
import MortgageScheduleYear from "./MortgageScheduleYear";
import MortgageScheduleTabs from "./MortgageScheduleTabs.tsx";
import MortgageScheduleYearSummary from "./MortgageScheduleYearSummary.tsx";

import '../styles/mortgage-schedule.css';

interface MortgagePaymentTableProps {
  paymentDetails: PaymentDetails,
}

export default function MortgageSchedule({
  paymentDetails,
}: MortgagePaymentTableProps) {
  const [layout, setLayout] = useState<'table' | 'tabs'>('table')
  const [activeTab, setActiveTab] = useState<number | undefined>(undefined)
  let remainingBalance = paymentDetails.principal

  function updateLayout(newLayout: 'table' | 'tabs'): void {
    setLayout(newLayout)
    if (newLayout === 'table') {
      setActiveTab(undefined)
    } else {
      setActiveTab(1)
    }
  }

  function getYears() {
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

    return years
  }

  const yearsInTerm = getYears()

  return (
    <>
      <div>
        <button title="view as table layout" onClick={() => updateLayout('table')}>Table</button>
        <button title="view as tabbed layout" onClick={() => updateLayout('tabs')}>Tabs</button>
        {/*<button disabled>Cards</button>*/}
      </div>
      <div className="overflow">
        <div className={`mortgage-schedule mortgage-schedule--${layout}`}>
          {layout === 'tabs' &&
            <MortgageScheduleTabs
              numberOfYears={yearsInTerm.length}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          }
          {layout === 'tabs' &&
            yearsInTerm.map((payments, index) =>
              <MortgageScheduleYearSummary payments={payments} index={index} activeTab={activeTab} key={index} />
            )
          }
          <div className="mortgage-schedule-header sub-grid">
            <span>#</span>
            <span>Starting Balance</span>
            <span>Total Payment</span>
            <span>Interest</span>
            <span>Principal</span>
            <span>Ending Balance</span>
          </div>
          {yearsInTerm.map((payments, index) =>
            <MortgageScheduleYear
              payments={payments}
              index={index}
              key={index}
              layout={layout}
              activeTab={activeTab}
            />)}
        </div>
      </div>
    </>
  )
}