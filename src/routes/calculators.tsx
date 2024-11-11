import {useState} from "react";
import Calculator from "../components/Calculator.tsx";

import '../styles/calculators.css';


export default function Calculators() {
	const [calculators, setCalculators] = useState<number[]>([]);

	function addCalculator() {
		if (calculators.length >= 8) {
			return
		}
		setCalculators((prev: number[]) => [...prev, prev.length])
	}

	return (
		<>
			<button
				className="add-calculator"
				data-calculators={calculators.length <= 0 ? 'empty' : true}
				onClick={() => addCalculator()}
			>
				+
			</button>
			<section className="calculator-wrapper">
				{calculators.map((calculator) =>
					<Calculator key={calculator} id={calculator} setCalculators={setCalculators} />
				)}
			</section>
		</>
	)
}