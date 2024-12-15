import Input from "./Input.tsx";
import Output from "./Output.tsx";
import {
  ACCELERATED_BIWEEKLY,
  ACCELERATED_WEEKLY,
  BIWEEKLY,
  MONTHLY,
  SEMIMONTHLY,
  WEEKLY,
  PaymentSchedules
} from "../definitions/StringTypes.ts";
import { CalculatorInputs } from "../definitions/CalculatorDefinitions.ts";
import { currencyFormatter } from "../utils/helpers.ts";
import { useState } from "react";

interface CalculatorProps {
  setCalculators: (value: CalculatorInputs[] | ((prevValue: CalculatorInputs[]) => CalculatorInputs[])) => void
  calculator: CalculatorInputs
}

export default function Calculator({
  setCalculators,
  calculator
}: CalculatorProps) {

  const [resetKey, setResetKey] = useState<number>(0)

  function updateCalculators(inputs: CalculatorInputs) {
    setCalculators((prev: CalculatorInputs[]): CalculatorInputs[] => {
      return prev.map(calc => {
        return calc.id === inputs.id ? inputs : calc
      })
    })
  }
  function setPrincipal(val: number): void {
    const updatedInputs = calculator
    updatedInputs.principal = val
    updateCalculators(updatedInputs)
  }
  function setRate(val: number): void {
    const updatedInputs = calculator
    updatedInputs.rate = val
    updateCalculators(updatedInputs)
  }
  function setAmortization(val: number): void {
    const updatedInputs = calculator
    updatedInputs.amortization = val
    updateCalculators(updatedInputs)
  }
  function setTerm(val: number): void {
    const updatedInputs = calculator
    updatedInputs.term = val
    updateCalculators(updatedInputs)
  }
  function setPaymentType(val: PaymentSchedules): void {
    const updatedInputs = calculator
    updatedInputs.paymentType = val
    updateCalculators(updatedInputs)
  }

  function resetCalculator() {
    const updatedInputs: CalculatorInputs = {
      id: calculator.id,
      rate: 0,
      term: 5,
      paymentType: MONTHLY,
      principal: 0,
      amortization: 0,
    }
    updateCalculators(updatedInputs)
    setResetKey(prev => prev + 1)
  }

  return (
    <div className="calculator">
      <div className="calculator-inputs">

        <div className="calculator-remove btn-group">
          <button
            className="btn"
            onClick={
              () => setCalculators(
                (prev) => prev.filter(
                  calc => calc.id !== calculator.id
                )
              )
            }
          >
            Remove
          </button>
          <button className="btn" onClick={resetCalculator}>Reset</button>
        </div>

        <Input
          key={`amount-${resetKey}`}
          placeholder="total amount you'll be borrowing"
          setState={setPrincipal}
          label="Mortgage Amount"
          inputName="mortgageAmount"
          { ...(calculator.principal === 0 ? {} : {defaultValue: calculator.principal.toString()}) }
          formatter={currencyFormatter}
          icon={{name: 'icon-dollar-sign', placement: 'start'}}
        />
        <Input
          key={`interest-${resetKey}`}
          label="Interest Rate (%)"
          inputName="interestRate"
          placeholder="interest rate (in %)"
          setState={setRate}
          { ...(calculator.rate === 0 ? {} : {defaultValue: calculator.rate.toString()}) }
          icon={{name: 'icon-percent', placement: 'end'}}
        />
        <Input
          key={`amortization-${resetKey}`}
          label="Amortization period (in years)"
          placeholder="25 years"
          inputName="amortizationPeriod"
          setState={setAmortization}
          { ...(calculator.amortization === 0 ? {} : {defaultValue: calculator.amortization.toString()}) }
        />
        <label htmlFor="termLength">
          <span>Term Length (in years)</span>
          <select
            className="form-input"
            defaultValue={calculator.term}
            name="termLength"
            onChange={(e) => setTerm(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label htmlFor="paymentSchedule">
          <span>Payment Schedule</span>
          <select
            className="form-input"
            defaultValue={calculator.paymentType}
            name="paymentSchedule"
            onChange={(e) => setPaymentType(e.target.value as PaymentSchedules)}
          >
            <option value={WEEKLY}>Weekly</option>
            <option value={BIWEEKLY}>Bi-weekly (every 2-weeks)</option>
            <option value={SEMIMONTHLY}>Semi-monthly (Twice a month)</option>
            <option value={MONTHLY}>Monthly</option>
            <option value={ACCELERATED_WEEKLY}>Accelerated weekly</option>
            <option value={ACCELERATED_BIWEEKLY}>Accelerated Bi-weekly</option>
          </select>
        </label>

      </div>

      <Output
        rate={calculator.rate / 100}
        principal={calculator.principal}
        amortization={calculator.amortization}
        paymentType={calculator.paymentType}
        term={calculator.term}
      />

    </div>
  )
}