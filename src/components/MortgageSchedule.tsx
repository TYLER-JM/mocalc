import { useState } from "react";
import { PaymentDetails } from "../definitions/OutputTypes";
import MortgageScheduleYear from "./MortgageScheduleYear";
import MortgageScheduleTabs from "./MortgageScheduleTabs.tsx";
import MortgageScheduleYearSummary from "./MortgageScheduleYearSummary.tsx";

import '../styles/mortgage-schedule.css';
import getYearlySummariesFromPaymentDetails from "../utils/getYearlySummariesFromPaymentDetails.ts";

interface MortgagePaymentTableProps {
  paymentDetails: PaymentDetails,
}

export default function MortgageSchedule({
  paymentDetails,
}: MortgagePaymentTableProps) {
  const [layout, setLayout] = useState<'table' | 'tabs'>('table')
  const [activeTab, setActiveTab] = useState<number | undefined>(undefined)

  function updateLayout(newLayout: 'table' | 'tabs'): void {
    setLayout(newLayout)
    if (newLayout === 'table') {
      setActiveTab(undefined)
    } else {
      setActiveTab(1)
    }
  }

  const yearsInTerm = getYearlySummariesFromPaymentDetails(paymentDetails)

  return (
    <>
      <div className="btn-group">
        <button className="btn" title="view as table layout" onClick={() => updateLayout('table')}>Table</button>
        <button className="btn" title="view as tabbed layout" onClick={() => updateLayout('tabs')}>Tabs</button>
        {/*<button disabled>Cards</button>*/}
      </div>
      {layout === 'tabs' &&
        <MortgageScheduleTabs
          numberOfYears={yearsInTerm.length}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      }
      <div className="overflow">
        <div className={`mortgage-schedule mortgage-schedule--${layout}`}>
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