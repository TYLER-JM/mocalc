import React, { useCallback, useState } from "react"
import { getEffectiveRate, toPercentage } from "../utils/calculators"
import { debounce } from "../utils/debounce"

interface InputProps {
  setRate: (val: number) => number,
  setAmortization: (val: number) => number,
  setPaymentType: (val: string) => void,
}

export default function Inputs({
  setRate,
  setAmortization,
  setPaymentType,
}: InputProps) {

  const [interestRate, setInterestRate] = useState<string>('')
  const [invalidInterest, setInvalidInterest] = useState<boolean | undefined>(undefined)
  const [userFeedback, setUserFeedback] = useState<string>('')

  const [amortizationPeriod, setAmortizationPeriod] = useState<string>('')
  const [invalidAmortizationPeriod, setInvalidAmortizationPeriod] = useState<boolean | undefined>(undefined)
  const [amortizationPeriodFeedback, setAmortizationPeriodFeedback] = useState<string>('')

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

  const debouncedAmortizationUpdate = useCallback(debounce((val: string) => {
    if (!val) {
      setInvalidAmortizationPeriod(undefined)
      setAmortizationPeriodFeedback('')
      return
    }

    const a = parseInt(val)
    if (isNaN(a)) {
      setInvalidAmortizationPeriod(true)
      setAmortizationPeriodFeedback('Please enter a number of years')
      return
    }

    setAmortization(a)
    setInvalidAmortizationPeriod(false)
    setAmortizationPeriodFeedback(`${a} Years`)
  }, 400), [])

  function handleInterestRateInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value
    setInterestRate(val) 
    debouncedRateUpdate(val)
  }

  function handleAmortizationPeriodInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value
    setAmortizationPeriod(val)
    debouncedAmortizationUpdate(val)
  }

  return (
    <div>
      <label htmlFor="interestRate">
        Interest Rate
        <input
          value={interestRate}
          aria-invalid={invalidInterest}
          type="text"
          name="interestRate"
          placeholder="5.5% for example"
          onChange={handleInterestRateInputChange}
        />
        <small>{userFeedback}</small>
      </label>
      <label htmlFor="amortizationPeriod">
        Amortization Period (years)
        <input
          type="text" 
          name="amortizationPeriod" 
          placeholder="25"
          value={amortizationPeriod}
          onChange={handleAmortizationPeriodInputChange}
          aria-invalid={invalidAmortizationPeriod}
        />
        <small>{amortizationPeriodFeedback}</small>
      </label>
      <label htmlFor="amortizationPeriod">
        Payment Schedule
        <select name="paymentSchedule" onChange={(e) => setPaymentType(e.target.value)}>
          <option value="accelerated_weekly">Accelerated weekly</option>
          <option value="weekly">Weekly</option>
          <option value="accelerated_biweekly">Accelerated Bi-weekly</option>
          <option value="biweekly">Bi-weekly (every 2-weeks)</option>
          <option value="semimonthly">Semi-monthly (24 payments a year)</option>
          <option value="monthly">Monthly</option>
        </select>
      </label>
    </div>
  )
}