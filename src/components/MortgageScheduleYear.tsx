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

  //TODO: improve the method of determining the classes dynamically
  return (
    <>
        <div className="row-header t-row">
          <div onClick={() => setCollapsed(prev => !prev)} className="row-header">
            Here is some Summary info for Year {index + 1}: Interest Paid: {accounting.formatMoney(totalInterest)}
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