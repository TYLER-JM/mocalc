import Input from "./Input.tsx";
import Output from "./Output.tsx";
import { PaymentSchedules } from "../definitions/StringTypes.ts";
import { CalculatorInputs } from "../definitions/CalculatorDefinitions.ts";

interface CalculatorProps {
  setCalculators: (value: CalculatorInputs[] | ((prevValue: CalculatorInputs[]) => CalculatorInputs[])) => void
  calculator: CalculatorInputs
}

export default function Calculator({
  setCalculators,
  calculator
}: CalculatorProps) {
  function updateCalculators(inputs: CalculatorInputs) {
    setCalculators((prev: CalculatorInputs[]): CalculatorInputs[] => {
      const filtered = prev.filter(calc => calc.id !== inputs.id)
      return [...filtered, inputs]
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

  return (
    <div className="calculator">
      <div>
        <button
          onClick={() => setCalculators((prev) => prev.filter(calc => calc.id !== calculator.id))}
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
          defaultValue={calculator.principal.toString()}
        />
        <Input
          label="Interest Rate"
          inputName="interestRate"
          placeholder="interest rate (in %)"
          setState={setRate}
          defaultValue={calculator.rate.toString()}
        />
        <Input
          label="Amortization period (in years)"
          placeholder="25 years"
          inputName="amortizationPeriod"
          setState={setAmortization}
          defaultValue={calculator.amortization.toString()}
        />
        <label htmlFor="termLength">
          Term Length (in years)
          <select defaultValue={calculator.term} name="termLength" onChange={(e) => setTerm(parseInt(e.target.value))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label htmlFor="paymentSchedule">
          Payment Schedule
          <select defaultValue={calculator.paymentType} name="paymentSchedule" onChange={(e) => setPaymentType(e.target.value as PaymentSchedules)}>
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
        rate={calculator.rate / 100}
        principal={calculator.principal}
        amortization={calculator.amortization}
        paymentType={calculator.paymentType}
        term={calculator.term}
      />
    </div>
  )
}