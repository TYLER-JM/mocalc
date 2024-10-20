import { MortgagePayment, PaymentDetails } from "../types/OutputTypes";
import { paymentScheduleFrequencyMap } from "./Output";
import accounting from "accounting";

interface MortgagePaymentTableProps {
  paymentDetails: PaymentDetails
}

export default function MortgagePaymentTable({
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
        <tr key={mortgagePayment.startingBalance.toString()}>
          <td>{i}</td>
          <td>{accounting.formatMoney(mortgagePayment.startingBalance)}</td>
          <td>{accounting.formatMoney(mortgagePayment.totalPayment)}</td>
          <td>{accounting.formatMoney(mortgagePayment.interestPortion)}</td>
          <td>{accounting.formatMoney(mortgagePayment.principalPortion)}</td>
          <td>{accounting.formatMoney(mortgagePayment.endingBalance)}</td>
        </tr>
      )
      remainingBalance = mortgagePayment.endingBalance
    }
    return rows
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Starting Balance</th>
          <th>Total Payment</th>
          <th>Interest</th>
          <th>Principal</th>
          <th>Ending Balance</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  )
}