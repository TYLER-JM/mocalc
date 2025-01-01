import {useEffect, useState} from "react"
import { ScheduledPayment } from "../definitions/OutputTypes"
import accounting from "accounting"
import {YearSummary} from "../definitions/CalculatorDefinitions.ts";

interface MortgageScheduleYearProps {
  payments: ScheduledPayment[],
  index: number,
  layout: string,
  activeTab: number | undefined,
}
export default function MortgageScheduleYear({
  payments,
  index,
  layout,
  activeTab
}: MortgageScheduleYearProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const yearSummary = new YearSummary(payments)

  useEffect(() => {
    if (activeTab === undefined) {
      setCollapsed(false);
    } else {
      setCollapsed(activeTab !== (index + 1))
    }
  }, [activeTab])

  //TODO: improve the method of determining the classes dynamically
  return (
    <>
    {layout === 'table' &&
      <div onClick={() => setCollapsed(prev => !prev)} className="sub-grid yearly-summary-header">
          <span className="yearly-summary-title" title={`Click to ${collapsed ? 'expand' : 'collapse'}`}>
            Year {index + 1} Summary:
          </span>
        <span className="yearly-summary-total">{accounting.formatMoney(yearSummary.totalPayment)}</span>
        <span className="yearly-summary-interest">{accounting.formatMoney(yearSummary.totalInterest)}</span>
        <span className="yearly-summary-principal">{accounting.formatMoney(yearSummary.totalPrincipal)}</span>
        <span className="yearly-summary-balance">{accounting.formatMoney(yearSummary.endingBalance)}</span>
      </div>
    }
    <div className={collapsed ? "sub-grid-wrapper collapsed" : "sub-grid-wrapper"}>
      {payments.map(payment => (
        <div className="sub-grid mortgage-schedule-row" key={Math.random().toString()}>
          <span>{payment.year}</span>
          <span>{accounting.formatMoney(payment.mortgagePayment.startingBalance)}</span>
          <span>{accounting.formatMoney(payment.mortgagePayment.totalPayment)}</span>
          <span>{accounting.formatMoney(payment.mortgagePayment.interestPortion)}</span>
          <span>{accounting.formatMoney(payment.mortgagePayment.principalPortion)}</span>
          <span>{accounting.formatMoney(payment.mortgagePayment.endingBalance)}</span>
        </div>
      ))}
</div>
</>
)
}