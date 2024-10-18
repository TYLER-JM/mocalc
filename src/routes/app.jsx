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
    <section>
      <Inputs 
        setRate={setRate}
        setAmortization={setAmortization}
        setPaymentType={setPaymentType}
      />
      <hr/>
      <Input 
        placeholder="total amount you'll be borrowing"
        setState={setPrincipal}
        label="Mortgage Amount"
        inputName="mortgageAmount"
      />
      <Output
        rate={rate}
        principal={principal}
        amortization={amortization}
        paymentType={paymentType}
      />
    </section>
  )
}