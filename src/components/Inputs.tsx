import React, { useState } from "react"
import { getEffectiveRate, toPercentage } from "../utils/calculators"

interface InputProps {
  setSchedule: (val: string) => number,
  setRate: (val: number) => number,
  rate: number
}

export default function Inputs({
  setSchedule,
  setRate,
  rate
}: InputProps) {

  const [interestRate, setInterestRate] = useState<string>('')

  function handleInerestRateInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInterestRate(e.target.value)

    if (isNaN(parseFloat(e.target.value))) {
      console.log('enter a number')
      return
    }

    setRate(parseInt(e.target.value) / 100)
  }

  return (
    <div>
      <label htmlFor="mortgageAmount">
        Mortgage Amount
        <input type="text" name="mortgageAmount" placeholder="1 billion dollars!"/>
      </label>
      <label htmlFor="interestRate">
        Interest Rate
        <input value={interestRate} type="text" name="interestRate" placeholder="5.5% for example" onChange={handleInerestRateInputChange}/>
        <small>Effective Rate: {toPercentage(getEffectiveRate(rate))}</small>
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