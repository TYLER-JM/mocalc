import { useState } from "react";
import Inputs from "../components/Inputs";
import Input from "../components/Input";
import Output from "../components/Output";
import { PaymentSchedules } from "../types/StringTypes";

import '../styles/calculator.css';

export default function Calculator() {
  const [rate, setRate] = useState(0)
  const [principal, setPrincipal] = useState(0)
  const [amortization, setAmortization] = useState(0)
  const [paymentType, setPaymentType] = useState<PaymentSchedules>('monthly')
  const [term, setTerm] = useState<number>(5)

  return (
    <section className="calculator-wrapper">
      <div>
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
        <div>
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
        </div>
        <Inputs 
          setPaymentType={setPaymentType}
        />
      </div>
      <div>
        <Output
          rate={rate / 100}
          principal={principal}
          amortization={amortization}
          paymentType={paymentType}
          term={term}
        />
      </div>
    </section>
  )
}