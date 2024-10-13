import React, { useCallback, useState } from "react"
import { getEffectiveRate, toPercentage } from "../utils/calculators"
import { debounce } from "../utils/debounce"

interface InputProps {
  setSchedule: (val: string) => number,
  setRate: (val: number) => number,
}

export default function Inputs({
  setSchedule,
  setRate
}: InputProps) {

  const [interestRate, setInterestRate] = useState<string>('')
  const [invalidInterest, setInvalidInterest] = useState<boolean | undefined>(undefined)
  const [userFeedback, setUserFeedback] = useState<string>('')

  const debouncedRateUpdate = useCallback(debounce((val: string) => {
    if (!val) {
      setUserFeedback('')
      setInvalidInterest(undefined)
      return
    }

    if (isNaN(parseFloat(val))) {
      setInvalidInterest(true)
      setUserFeedback('Please enter a valid percentage')
      return
    }

/*
  calculating the Effective rate is not required here.
  I've printed the value here for testing purposes only.
  -- I really only need to use setRate() to update 'rate' here
*/
    const r = parseFloat(val) / 100
    setRate(r)
    const effectiveRate = toPercentage(getEffectiveRate(r))
    setInvalidInterest(false)
    setUserFeedback(`Effective Rate: ${effectiveRate}`)
  }, 400), [])

  function handleInerestRateInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value
    setInterestRate(val) 
    debouncedRateUpdate(val)
  }

  return (
    <div>
      <label htmlFor="mortgageAmount">
        Mortgage Amount
        <input type="text" name="mortgageAmount" placeholder="1 billion dollars!"/>
      </label>
      <label htmlFor="interestRate">
        Interest Rate
        <input
          value={interestRate}
          aria-invalid={invalidInterest}
          type="text"
          name="interestRate"
          placeholder="5.5% for example"
          onChange={handleInerestRateInputChange}
        />
        <small>{userFeedback}</small>
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