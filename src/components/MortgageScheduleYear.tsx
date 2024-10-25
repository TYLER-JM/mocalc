import { useState } from "react"
import { ScheduledPayment } from "../types/OutputTypes"
import accounting from "accounting"

interface MortgageScheduleYearProps {
  payments: ScheduledPayment[],
  index: number
}
export default function MortgageScheduleYear({
  payments,
  index
}: MortgageScheduleYearProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  //TODO: get total amount of principal paid, 
  //TODO: optional: get total interest paid up to this point
  const totalInterest = payments.reduce((total: number, payment: ScheduledPayment): number => {
    return total += payment.mortgagePayment.interestPortion
  }, 0)
  const totalPrincipal = payments.reduce((total: number, payment: ScheduledPayment): number => {
    return total += payment.mortgagePayment.principalPortion
  }, 0)
  const endingBalance = payments[payments.length - 1].mortgagePayment.endingBalance

  //TODO: improve the method of determining the classes dynamically
  return (
    <>
        <div className="row-header t-row sub-grid yearly-summary-header">
          <div onClick={() => setCollapsed(prev => !prev)} className="row-header sub-grid">
            <div className="sub-grid">
              <span className="col-3">
                Year {index + 1} Summary:
              </span>
              <span>{accounting.formatMoney(totalInterest)}</span>
              <span>{accounting.formatMoney(totalPrincipal)}</span>
              <span>{accounting.formatMoney(endingBalance)}</span>
            </div>
          </div>
        </div>
        <div key={Math.random().toString().split('.')[1]} className={collapsed ? "sub-grid-wrapper collapsed" : "sub-grid-wrapper"}>
          {payments.map(payment => (
            payment.jsx
          ))}
        </div>
      </>
  )
}