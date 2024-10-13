//TODO: define list of inputs needed in order make calculation

export default function Inputs({
  setSchedule
}) {
  return (
    <div>
      <label htmlFor="mortgageAmount">
        Mortgage Amount
        <input type="text" name="mortgageAmount" placeholder="1 billion dollars!"/>
      </label>
      <label htmlFor="interestRate">
        Interest Rate
        <input type="text" name="interestRate" placeholder="5.5% for example"/>
      </label>
      <label htmlFor="amortizationPeriod">
        Amortization Period (years)
        <input type="text" name="amortizationPeriod" placeholder="25"/>
      </label>
      <label htmlFor="amortizationPeriod">
        Payment Schedule
        <select name="paymentSchedule" onChange={(e) => setSchedule(e.target.value)}>
          <option value="1">Accelerated weekly</option>
          <option value="2">Weekly</option>
          <option value="3">Accelerated Bi-weekly</option>
          <option value="4">Bi-weekly (every 2-weeks)</option>
          <option value="5">Semi-monthly (24 payments a year)</option>
          <option value="6">Monthly</option>
        </select>
      </label>
    </div>
  )
}