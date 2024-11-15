import {NavLink, Outlet, useOutletContext} from 'react-router-dom'
import {useState} from "react";

type ContextType = [
  calculators: number[],
  setCalculators: (value: number[] | ((prevValue: number[]) => number[])) => void
]
export default function Root() {
  const [calculators, setCalculators] = useState<number[]>([]);

  return (
    <>
      <nav>
        <NavLink to="/calculators">Get Started</NavLink>
        <NavLink to="/">About</NavLink>
        <NavLink to="/help">Help</NavLink>
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