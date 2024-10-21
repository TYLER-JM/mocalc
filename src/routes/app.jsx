import { useState } from "react";
import Inputs from "../components/Inputs";
import Input from "../components/Input";
import Output from "../components/Output";

export default function App() {
  const [rate, setRate] = useState(0)
  const [principal, setPrincipal] = useState(0)
  const [amortization, setAmortization] = useState(0)
  const [paymentType, setPaymentType] = useState('monthly')

  return (
    <>
      <section>
        <Inputs 
          setPaymentType={setPaymentType}
        />
        <hr/>
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
        
      </section>
      <section>
        <Output
          rate={rate / 100}
          principal={principal}
          amortization={amortization}
          paymentType={paymentType}
        />
      </section>
    </>
  )
}