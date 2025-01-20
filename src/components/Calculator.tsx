import Input from "./Input.tsx";
import Output from "./Output.tsx";
import {
  ACCELERATED_BIWEEKLY,
  ACCELERATED_WEEKLY,
  BIWEEKLY,
  MONTHLY,
  SEMIMONTHLY,
  WEEKLY,
  PaymentSchedules, PrepaymentFrequencyOptions
} from "../definitions/StringTypes.ts";
import {CalculatorInputs, PrepaymentOptions} from "../definitions/CalculatorDefinitions.ts";
import { currencyFormatter } from "../utils/helpers.ts";
import { useRef, useState } from "react";
import PrepaymentInputs from "./PrepaymentInputs.tsx";

interface CalculatorProps {
  setCalculators: (value: CalculatorInputs[] | ((prevValue: CalculatorInputs[]) => CalculatorInputs[])) => void
  calculator: CalculatorInputs
}

export default function Calculator({
  setCalculators,
  calculator
}: CalculatorProps) {
  const termLengthSelectRef = useRef<HTMLSelectElement>(null)
  const paymentScheduleSelectRef = useRef<HTMLSelectElement>(null)
  const prepaymentFrequencyRef = useRef<HTMLSelectElement>(null)
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

  function setPrepaymentAmount(val: number): void {
    const updatedInputs = calculator
    updatedInputs.prepaymentOptions.amount = val
    updateCalculators(updatedInputs)
  }
  function setPrepaymentFrequency(val: PrepaymentFrequencyOptions): void {
    const updatedInputs = calculator
    updatedInputs.prepaymentOptions.frequency = val
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
      prepaymentOptions: new PrepaymentOptions()
    }
    updateCalculators(updatedInputs)
    setResetKey(prev => prev + 1)
    if (termLengthSelectRef.current) {
      termLengthSelectRef.current.value = "5"
    }
    if (paymentScheduleSelectRef.current) {
      paymentScheduleSelectRef.current.value = MONTHLY
    }
    if (prepaymentFrequencyRef.current) {
      prepaymentFrequencyRef.current.value = ""
    }
  }

  return (
    <div className="calculator">
      <div className="calculator-inputs">

        <div className="calculator-inputs--group">
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
            label="Mortgage Amount"
            placeholder="Amount to be borrowed"
            inputName="mortgageAmount"
            formatter={currencyFormatter}
            setState={setPrincipal}
            icon={{name: 'icon-dollar-sign', placement: 'start'}}
            { ...(calculator.principal === 0 ? {} : {defaultValue: calculator.principal.toString()}) }
          />
          <Input
            key={`interest-${resetKey}`}
            label="Interest Rate"
            placeholder="3.4"
            inputName="interestRate"
            setState={setRate}
            icon={{name: 'icon-percent', placement: 'end'}}
            { ...(calculator.rate === 0 ? {} : {defaultValue: calculator.rate.toString()}) }
          />
          <Input
            key={`amortization-${resetKey}`}
            label="Amortization period"
            placeholder="25"
            inputName="amortizationPeriod"
            formatter={currencyFormatter}
            setState={setAmortization}
            { ...(calculator.amortization === 0 ? {} : {defaultValue: calculator.amortization.toString()}) }
          />
          <label htmlFor="termLength" className="form-label">
            <span>Term Length (in years)</span>
            <select
              ref={termLengthSelectRef}
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
          <label htmlFor="paymentSchedule" className="form-label">
            <span>Payment Schedule</span>
            <select
              ref={paymentScheduleSelectRef}
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

        <PrepaymentInputs
          setPrepaymentAmount={setPrepaymentAmount}
          setPrepaymentFrequency={setPrepaymentFrequency}
          prepaymentFrequencyRef={prepaymentFrequencyRef}
          resetKey={resetKey}
          calculator={calculator}
        />

      </div>

      <Output
        calculator={calculator}
      />

    </div>
  )
}