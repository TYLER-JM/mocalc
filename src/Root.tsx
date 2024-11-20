import {NavLink, Outlet, useOutletContext} from 'react-router-dom'
import {useState} from "react";
import {CalculatorInputs} from "./definitions/CalculatorDefinitions.ts";

type ContextType = [
  calculators: CalculatorInputs[],
  setCalculators: (value: CalculatorInputs[] | ((prevValue: CalculatorInputs[]) => CalculatorInputs[])) => void
]
export default function Root() {
  const [calculators, setCalculators] = useState<CalculatorInputs[]>([]);

  return (
    <>
      <nav>
        <NavLink to="/calculators">Calculators</NavLink>
        <NavLink to="/">About</NavLink>
        {/*<NavLink to="/help">Help</NavLink>*/}
      </nav>
      <main>
        <Outlet context={[calculators, setCalculators] satisfies ContextType} />
      </main>
      <footer>&#169; 2024</footer>
    </>
  )
}

export function useCalculators() {
  return useOutletContext<ContextType>()
}