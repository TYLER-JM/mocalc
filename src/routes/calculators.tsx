import {useState} from "react";
import Calculator from "../components/Calculator.tsx";

import '../styles/calculators.css';


export default function Calculators() {
	const [calculators, setCalculators] = useState<number[]>([]);

	return (
		<>
			<div className="add-calculator">
				<button onClick={() => setCalculators((prev: number[]) => [...prev, prev.length])}>Add Calculator</button>
			</div>
			<section className="calculator-wrapper">
				{calculators.map((calculator) =>
					<Calculator key={calculator} id={calculator} setCalculators={setCalculators} />
				)}
			</section>
		</>
	)
}