import { useState } from "react";
import Inputs from "../components/Inputs";
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
        setPrincipal={setPrincipal}
        setAmortization={setAmortization}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
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