import React, { useCallback, useState } from "react"
import { debounce } from "../utils/debounce"

interface InputProps {
  setAmortization: (val: number) => number,
  setPaymentType: (val: string) => void,
}

export default function Inputs({
  setAmortization,
  setPaymentType,
}: InputProps) {

  const [amortizationPeriod, setAmortizationPeriod] = useState<string>('')
  const [invalidAmortizationPeriod, setInvalidAmortizationPeriod] = useState<boolean | undefined>(undefined)
  const [amortizationPeriodFeedback, setAmortizationPeriodFeedback] = useState<string>('')

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

  function handleAmortizationPeriodInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value
    setAmortizationPeriod(val)
    debouncedAmortizationUpdate(val)
  }

  return (
    <div>
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