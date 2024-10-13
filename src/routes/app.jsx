import { useState } from "react";
import Inputs from "../components/Inputs";
import Output from "../components/Output";

//TODO: define first iteration of output. For example, a monthly mortgage payment
export default function App() {
  const [schedule, setSchedule] = useState(0)
  return (
    <section>
      <Inputs 
        setSchedule={setSchedule}
      />
      <Output
        schedule={schedule}
      />
    </section>
  )
}