import { useState } from "react";
import Input from "./Input.tsx";
import Output from "./Output.tsx";
import { PaymentSchedules } from "../types/StringTypes.ts";

interface CalculatorProps {
  setCalculators: (value: number[] | ((prevValue: number[]) => number[])) => void
  id: number
}

export default function Calculator({
  setCalculators,
  id
}: CalculatorProps) {
  const [rate, setRate] = useState(0)
  const [principal, setPrincipal] = useState(0)
  const [amortization, setAmortization] = useState(0)
  const [paymentType, setPaymentType] = useState<PaymentSchedules>('monthly')
  const [term, setTerm] = useState<number>(5)

  return (
    <div className="calculator">
      <div>
        <button
          onClick={() => setCalculators((prev) => prev.filter(calcId => calcId !== id))}
        >
          Remove this calculator
        </button>
      </div>
      <div className="calculator-inputs">
        <Input
          placeholder="total amount you'll be borrowing"
          setState={setPrincipal}
          label="Mortgage Amount"
          inputName="mortgageAmount"
        />
        <Input
          label="Interest Rate"
          inputName="interestRate"
          placeholder="interest rate (in %)"
          setState={setRate}
        />
        <Input
          label="Amortization period (in years)"
          placeholder="25 years"
          inputName="amortizationPeriod"
          setState={setAmortization}
        />
        <label htmlFor="termLength">
          Term Length (in years)
          <select defaultValue={term} name="termLength" onChange={(e) => setTerm(parseInt(e.target.value))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label htmlFor="paymentSchedule">
          Payment Schedule
          <select name="paymentSchedule" onChange={(e) => setPaymentType(e.target.value as PaymentSchedules)}>
            <option value="monthly">Monthly</option>
            <option value="accelerated_weekly">Accelerated weekly</option>
            <option value="weekly">Weekly</option>
            <option value="accelerated_biweekly">Accelerated Bi-weekly</option>
            <option value="biweekly">Bi-weekly (every 2-weeks)</option>
            <option value="semimonthly">Semi-monthly (24 payments a year)</option>
          </select>
        </label>
      </div>
      <Output
        rate={rate / 100}
        principal={principal}
        amortization={amortization}
        paymentType={paymentType}
        term={term}
      />
    </div>
  )
}