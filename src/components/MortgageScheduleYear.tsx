import {useEffect, useState} from "react"
import { ScheduledPayment } from "../definitions/OutputTypes"
import accounting from "accounting"

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

  useEffect(() => {
    if (activeTab === undefined) {
      setCollapsed(false);
    } else {
      setCollapsed(activeTab !== (index + 1))
    }
  }, [activeTab])

  const totalPayment = payments.reduce((total: number, payment: ScheduledPayment): number => {
    return total + payment.mortgagePayment.totalPayment
  }, 0)
  const totalInterest = payments.reduce((total: number, payment: ScheduledPayment): number => {
    return total + payment.mortgagePayment.interestPortion
  }, 0)
  const totalPrincipal = payments.reduce((total: number, payment: ScheduledPayment): number => {
    return total + payment.mortgagePayment.principalPortion
  }, 0)
  const endingBalance = payments[payments.length - 1].mortgagePayment.endingBalance

  //TODO: improve the method of determining the classes dynamically
  return (
    <>
      {layout === 'table' &&
        <div onClick={() => setCollapsed(prev => !prev)} className="sub-grid yearly-summary-header">
          <span className="yearly-summary-title">
            Year {index + 1} Summary:
          </span>
          <span className="yearly-summary-total">{accounting.formatMoney(totalPayment)}</span>
          <span className="yearly-summary-interest">{accounting.formatMoney(totalInterest)}</span>
          <span className="yearly-summary-principal">{accounting.formatMoney(totalPrincipal)}</span>
          <span className="yearly-summary-balance">{accounting.formatMoney(endingBalance)}</span>
        </div>
      }
      <div className={collapsed ? "sub-grid-wrapper collapsed" : "sub-grid-wrapper"}>
        {payments.map(payment => (
          payment.jsx
        ))}
      </div>
    </>
  )
}