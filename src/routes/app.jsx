import { useState } from "react";
import Inputs from "../components/Inputs";
import Output from "../components/Output";

//TODO: calculate the monthly payment from a given principal and interest rate
export default function App() {
  const [schedule, setSchedule] = useState(0)
  const [rate, setRate] = useState(0)
  const [principal, setPrincipal] = useState(0)
  const [amortization, setAmortization] = useState(0)

  return (
    <section>
      <Inputs 
        setSchedule={setSchedule}
        setRate={setRate}
        setPrincipal={setPrincipal}
        setAmortization={setAmortization}
      />
      <Output
        schedule={schedule}
        rate={rate}
        principal={principal}
        amortization={amortization}
      />
    </section>
  )
}